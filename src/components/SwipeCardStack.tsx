import { useCounter, useDisclosure, useHotkeys, useTimeout } from "@mantine/hooks";
import ActivityCard from "./ActivityCard";
import classes from "./SwipeCardStack.module.css"
import { useEffect, useRef, useState } from "react";
import { animateBoxToCenterFromVoid, animateBoxAway as animateOldBoxAway, determineSwipeAction, returnToCenter as returnBoxToCenter, setBoxTransformBasedOnFingerPosition } from "../card-handlers/animate-card";
import { activities } from "../data/activities";
import ActivityCardSwipeEnd from "./ActivityCardSwipeEnd";
import SwipeCardActionButtons from "./SwipeCardActionButtons";
import { handleTheWheelEvent } from "../card-handlers/trackpad-handler";
import { useDrag, useWheel } from "@use-gesture/react";
import ActivityDetailsDrawer from "./ActivityDetailsDrawer";
import SearchFilterDrawer from "./SearchFilterDrawer";
import type {Activity} from "../types/activity.ts";


const doubleClickThreshold = 300
let lastClickTimestamp: Date|null = null;

function performActionAndAnimation(
	element: HTMLDivElement,
	action: string|null,
	addNewBoxToStack: () => void,
	animationEndRemoveBox: () => void,
	animationEndAddBox: (cardId: number) => void,
	setRecentlyPressed: (action: any) => void,
	openInfoDrawer: () => void,
	openFilterDrawer: () => void,
) {
	// Detect double clicks
	if(action === null) {
		if(lastClickTimestamp && ((Date.now() - lastClickTimestamp.getTime()) < doubleClickThreshold)) {
			action = "star";
		}
		lastClickTimestamp = new Date();
	}

	console.log("Perform action: ", action)
	// only "filter" and "undo" are allowed for the <ActivityCardSwipeEnd /> Element
	if(!element.hasAttribute("data-id") && action !== "filter" && action !== "undo") return;

	const cardId = Number(element.dataset.id);
	console.log(cardId)
	// if (!cardId) {return;}

	if(action !== "like" && action !== "dislike") returnBoxToCenter(element);

	setRecentlyPressed(action)

	if(action === "filter") {
		openFilterDrawer()
	}

	if(action === "undo") {
		const currentIds: number[] = JSON.parse(window.localStorage.getItem("swiped-away") || '[]');
		if(currentIds.length) {
			const newCardId = currentIds[currentIds.length - 1];
			handleLocalStorageActivityList("remove", newCardId, "swiped-away");
			animationEndAddBox(newCardId)
		}
	}

	if(action === "info") {
		openInfoDrawer()
	}

	if(action === "star") {
		// TODO
		// Wird anscheinend schon wonaders verarbeited (nur für die konntrolls unten nicht für doppel klick)
	}

	if(action === "like") {
		addNewBoxToStack()
		animateOldBoxAway(element, Math.max(window.innerWidth, window.innerHeight), 0, animationEndRemoveBox)
		handleLocalStorageActivityList("add", cardId, "like-list");
		handleLocalStorageActivityList("add", cardId, "swiped-away");
	}

	if(action === "dislike") {
		addNewBoxToStack()
		animateOldBoxAway(element, -Math.max(window.innerWidth, window.innerHeight), 0, animationEndRemoveBox)
		handleLocalStorageActivityList("remove", cardId, "like-list");
		handleLocalStorageActivityList("add",    cardId, "swiped-away");
	}
}

function handleLocalStorageActivityList(action: "add"|"remove"|"toggle", activityId: number, list: string) {
	const currentIds: number[] = JSON.parse(window.localStorage.getItem(list) || '[]');
	const containsActivity = currentIds.includes(activityId);
	if(action === "toggle") {
		action = containsActivity ? "remove" : "add"
	}

	const newIds = [...currentIds];
	if(action === "add" && !containsActivity) {
		newIds.push(activityId)
	}

	if(action === "remove" && containsActivity) {
		newIds.splice(newIds.indexOf(activityId), 1);
	}

	const newListString = JSON.stringify(newIds);
	window.localStorage.setItem(list, newListString);

	// Dispatch a storage event so listeners in the same tab also receive the update
	try {
		const storageEvent = new StorageEvent('storage', {
			key: list,
			newValue: newListString,
			storageArea: window.localStorage
		} as any);
		window.dispatchEvent(storageEvent);
	} catch (e) {}
}

const virtualBoxCount = 2

function doNotShowSwipedAwayActivities(activities: Activity[]) {
	const currentIds: number[] = JSON.parse(window.localStorage.getItem("swiped-away") || '[]');
	return activities.filter((activity) => !currentIds.includes(activity.id))
}

export default function SwipeCardStack() {
	const [lastBox, setLastBox] = useState<HTMLDivElement | null>(null)
	const [remaining, setRemaining] = useState(doNotShowSwipedAwayActivities(activities))
	const [filteredActivities, setFilteredActivities] = useState<Activity[] | null>(null);
	const [boxCount, boxCountHandlers] = useCounter(virtualBoxCount, { min: 0 });
	const [recentlyPressed, setRecentlyPressed] = useState(null);
	const {start: startRecentlyPressedTimeout, clear: clearRecentlyPressedTimeout} = useTimeout(() => setRecentlyPressed(null), 500, { autoInvoke: false });
	// const wheelRef = useEventListener('wheel', useWheelEvent(lastBox), {passive: false});
	const wheelRef = useRef(null)
	const cardContainer = useRef<HTMLDivElement>(null);
	const [infoOpened, { open: openInfoDrawer, close: closeInfoDrawer }] = useDisclosure(false);
	const [filterOpened, { open: openFilterDrawer, close: closeFilterDrawer }] = useDisclosure(false);
	const [_countOfReAddedBoxes, setCountOfReAddedBoxes] = useState(0);


	const undoButtonOnMountOfNewCard = () => {
		if(_countOfReAddedBoxes <= 0 || !lastBox?.nextElementSibling) return;

		const newLastBox = lastBox?.nextElementSibling as HTMLDivElement;
		if(newLastBox.classList.contains("animate-in-added")) return;

		newLastBox.classList.add("animate-in-added")
		setLastBox(newLastBox);
		animateBoxToCenterFromVoid(newLastBox, () => {
			boxCountHandlers.decrement()
		});
		setCountOfReAddedBoxes(c => c - 1);
	}
	const animationEndAddBox = (boxId: number) => {
		console.log("add again")
		if(remaining.filter(a => a.id === boxId) && lastBox?.nextElementSibling) {
			// The activity is still on the screen

			boxCountHandlers.decrement()
			returnBoxToCenter(lastBox?.nextElementSibling as any)
			setLastBox((lastBox) => lastBox?.nextElementSibling as any)
			return;
		}

		const newActivity = activities.find(a => a.id === boxId)
		if(!newActivity) return;
		boxCountHandlers.increment()
		setCountOfReAddedBoxes(a => 1 + a)
		setRemaining(remaining => [...remaining, newActivity]);
		handleLocalStorageActivityList("remove", boxId, "swiped-away")
	}

	const swipeGestures = useDrag((event) => {
		if(!lastBox) return;

		if(event.first) {
			lastBox.style.transition = ""
		}

		if(event.last) {
			(doAction(determineSwipeAction(lastBox, event)))()
			return;
		}

		setBoxTransformBasedOnFingerPosition(lastBox, event.delta[0], event.delta[1])
	})

	useWheel((event) => handleTheWheelEvent(event, lastBox, doAction), {
		target: wheelRef,
		eventOptions: { passive: false }
	})

	const doAction = (action: string|null) => () => {
		const addNewBox = () => {
			boxCountHandlers.increment()
			if(lastBox && lastBox.previousElementSibling) {
				setLastBox(lastBox.previousElementSibling as any);
			} else {
				setLastBox(null)
			}
		}
		const animationEndRemoveBox = () => {
			if(!lastBox?.style?.transform) return;
			boxCountHandlers.decrement()
			setRemaining(remaining => remaining.slice(0, remaining.length-1));
		}
		if(!cardContainer.current || !lastBox || infoOpened || filterOpened) return;

		const newActionPerformed = (action: any) => {
			setRecentlyPressed(action);
			clearRecentlyPressedTimeout();
			startRecentlyPressedTimeout();
		}

		performActionAndAnimation(lastBox, action, addNewBox, animationEndRemoveBox, animationEndAddBox, newActionPerformed, openInfoDrawer, openFilterDrawer);
	}

	useEffect(() => {
		if(cardContainer.current !== null) setLastBox(cardContainer.current.lastElementChild as any);
	}, [cardContainer]);

	useEffect(() => {
		if (!filterOpened && filteredActivities) {
			// Reset the card stack with new filtered activities
			setRemaining(filteredActivities);
			setFilteredActivities(null);
			// Reset the card references
			if (cardContainer.current) {
				setTimeout(() => {
					if(cardContainer != null && cardContainer.current != null) {
						setLastBox(cardContainer.current.lastElementChild as any);
					}
				}, 0);
			}
		}
	}, [filterOpened, filteredActivities]);
	// console.log("showing ", remaining.slice(remaining.length - boxCount).map((activity) => activity.id))

	useHotkeys([
		['ArrowLeft',  doAction('dislike')],
		['ArrowRight', doAction('like')],
		['ArrowUp',    doAction('info')],
	], []);

	const currentCardIndex = remaining.length + virtualBoxCount - 1 - boxCount
	return (
		<div className={classes.container} ref={wheelRef}>
			<div className={classes.stack} ref={cardContainer} {...swipeGestures()}>
				<ActivityCardSwipeEnd />
				{remaining.slice(Math.max(remaining.length - boxCount, 0)).map((activity: Activity) => (
					<ActivityCard 
						key={activity.id} 
						data={activity} 
						onClick={() => doAction("info")()}
						onDoubleClick={() => doAction("star")()} 
						onMount={undoButtonOnMountOfNewCard}
					/>
				))}
			</div>
			<SwipeCardActionButtons highlight={recentlyPressed} activityCount={currentCardIndex + 1} doAction={doAction} currentId={(currentCardIndex < 0) ? null : remaining[currentCardIndex].id}/>
			<ActivityDetailsDrawer
				data={(currentCardIndex < 0) ? null : remaining[currentCardIndex]}
				opened={infoOpened}
				onClose={closeInfoDrawer} />
			<SearchFilterDrawer
				opened={filterOpened}
				onClose={closeFilterDrawer}
				onApplyFilteredActivities={(filtered) => {
					console.log("Filtered activities:", filtered);
					localStorage.removeItem("swiped-away")
					setFilteredActivities(filtered);
					closeFilterDrawer();
				}}
			/>
		</div>
	);
}