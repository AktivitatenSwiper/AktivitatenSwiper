// import React from "react";
import type { FullGestureState } from "@use-gesture/react";
import { determineSwipeAction, returnToCenter, setBoxTransformBasedOnFingerPosition } from "./animate-card";

export function resetInertiaScrolling() {
	inertiaScrollIgnore.active = false
	inertiaScrollIgnore.forceIgnore = false
	inertiaScrollIgnore.lastEventTime = 0
}

const inertiaScrollIgnore = {
	active: false,
	distanceHistory: [] as number[],
	inactivityTimeout: 0,
	lastEventTime: 0,
	fastEnoughCounter: 0,
	forceIgnore: false
}

function restartInactivityTimeout(box: HTMLDivElement|null) {
	clearTimeout(inertiaScrollIgnore.inactivityTimeout);
	inertiaScrollIgnore.inactivityTimeout = setTimeout(() => {
		console.log("[Trackpad/Mausrad] No action for 500ms -> Any scroll will now be accepted")
		inertiaScrollIgnore.active = false
		inertiaScrollIgnore.distanceHistory = []

		box && returnToCenter(box)
	}, 500) as unknown as number
}

export function handleTheWheelEvent(event: Omit<FullGestureState<"wheel">, "event">& {
    event: WheelEvent;
}, box: HTMLDivElement|null, doAction: (action: string) => () => void) {
		if(!box || event.ctrlKey) return;
		if(!event.delta[0] && !event.delta[1]) return;
		event.event.preventDefault()
		if(event.last) return;

		restartInactivityTimeout(box)

		if(inertiaScrollIgnore.active) {
			const now = (new Date()).getTime();
			const distance = Math.sqrt(event.delta[0] * event.delta[0] + event.delta[1] * event.delta[1]) / (now - inertiaScrollIgnore.lastEventTime)

			inertiaScrollIgnore.distanceHistory.push(distance)

			if(inertiaScrollIgnore.lastEventTime != now)
				inertiaScrollIgnore.lastEventTime = now


			const ignoreIfSlowerThan = average(inertiaScrollIgnore.distanceHistory) + 3
			const tooSlow = distance <= ignoreIfSlowerThan

			if(inertiaScrollIgnore.distanceHistory.length > 5)
				inertiaScrollIgnore.distanceHistory.shift()

			if(tooSlow || inertiaScrollIgnore.forceIgnore) {
				inertiaScrollIgnore.fastEnoughCounter = 0;
				console.log("[Trackpad/Mausrad] The scroll event was ignored, as it was too slow", Math.round(distance), " <= ", Math.round(ignoreIfSlowerThan))
				return;
			}


			inertiaScrollIgnore.fastEnoughCounter++;
			if(inertiaScrollIgnore.fastEnoughCounter<2) {
				inertiaScrollIgnore.distanceHistory.pop()
				console.log("[Trackpad/Mausrad] The scroll event was ignored, even though it was fast enough (likely a stutter)", Math.round(distance), " > ", Math.round(ignoreIfSlowerThan))
				return
			}

			inertiaScrollIgnore.active = false
			console.log("[Trackpad/Mausrad] The scroll event was not ignored, as it was fast enough", Math.round(distance), " > ", Math.round(ignoreIfSlowerThan))
		}

		box.style.transition = "transform .05s ease"
		setBoxTransformBasedOnFingerPosition(box, -event.delta[0], -event.delta[1])

		const action = determineSwipeAction(box, event)
		if(action)  {
			console.log("[Trackpad/Mausrad] Eine Swipe-Aktion wurde erkannt: ", action)
			inertiaScrollIgnore.active = true;
			inertiaScrollIgnore.distanceHistory = [];
			inertiaScrollIgnore.fastEnoughCounter = 0;
			inertiaScrollIgnore.forceIgnore = true;
			setTimeout(() => inertiaScrollIgnore.forceIgnore = false, 400);
			(doAction(action))();
		}
}


const average = (array: number[]) => array.reduce((a, b) => a + b) / array.length;