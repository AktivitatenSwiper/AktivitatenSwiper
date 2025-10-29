import { useCounter, useDisclosure, useHotkeys, useTimeout } from "@mantine/hooks";
import ActivityCard from "./ActivityCard";
import classes from "./SwipeCardStack.module.css"
import { useEffect, useRef, useState } from "react";
import { animateBoxAway as animateOldBoxAway, determineSwipeAction, returnToCenter as returnBoxToCenter, setBoxTransformBasedOnFingerPosition } from "../card-handlers/animate-card";
import { activities } from "../data/activities";
import ActivityCardSwipeEnd from "./ActivityCardSwipeEnd";
import SwipeCardActionButtons from "./SwipeCardActionButtons";
import { handleTheWheelEvent } from "../card-handlers/trackpad-handler";
import { useDrag, useWheel } from "@use-gesture/react";
import ActivityDetailsDrawer from "./ActivityDetailsDrawer";
import SearchFilterDrawer from "./SearchFilterDrawer";


function performActionAndAnimation(
	element: HTMLDivElement,
	action: string|null,
	addNewBoxToStack: () => void,
	animationEnd: () => void,
	setRecentlyPressed: (action: any) => void,
	openInfoDrawer: () => void,
	openFilterDrawer: () => void,
) {
	console.log("Perform action: ", action)
	// only "filter" and "undo" are allowed for the <ActivityCardSwipeEnd /> Element
	if(!element.hasAttribute("data-id") && action !== "filter" && action !== "undo") return;

	const cardId = element.dataset.id;
	console.log(cardId)
	if (!cardId) {return;}

	if(action !== "like" && action !== "dislike") returnBoxToCenter(element);

	setRecentlyPressed(action)

	if(action === "filter") {
		openFilterDrawer()
	}

	if(action === "undo") {
		// TODO
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
		animateOldBoxAway(element, Math.max(window.innerWidth, window.innerHeight), 0, animationEnd)
		updateLikeLocalStorageArray(Number(cardId))
	}

	if(action === "dislike") {
		addNewBoxToStack()
		animateOldBoxAway(element, -Math.max(window.innerWidth, window.innerHeight), 0, animationEnd)
	}
}

function updateLikeLocalStorageArray(curCardId: number) {
	const CardIds:(number[]) = JSON.parse(window.localStorage.getItem('like-list') || '[]');
	let newSavedIds: number[] = []
	if(CardIds.includes(curCardId)){
		//newSavedIds = CardIds.filter((cur) => cur !== curCardId)
		//like soll like bleiben sonnst sinlos
	}else{
		newSavedIds = [...CardIds, curCardId]

	}
	window.localStorage.setItem('like-list',"["+ newSavedIds.toString()+"]");

}


const virtualBoxCount = 2

export default function SwipeCardStack() {
	const [lastBox, setLastBox] = useState<HTMLDivElement | null>(null)
	const [remaining, setRemaining] = useState(activities)
	const [boxCount, boxCountHandlers] = useCounter(virtualBoxCount, { min: 0 });
	const [recentlyPressed, setRecentlyPressed] = useState(null);
	const {start: startRecentlyPressedTimeout, clear: clearRecentlyPressedTimeout} = useTimeout(() => setRecentlyPressed(null), 500, { autoInvoke: false });
	// const wheelRef = useEventListener('wheel', useWheelEvent(lastBox), {passive: false});
	const wheelRef = useRef(null)
	const cardContainer = useRef<HTMLDivElement>(null);
	const [infoOpened, { open: openInfoDrawer, close: closeInfoDrawer }] = useDisclosure(false);
	const [filterOpened, { open: openFilterDrawer, close: closeFilterDrawer }] = useDisclosure(false);

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
			if(lastBox && lastBox.previousElementSibling?.hasAttribute?.("data-id")) {
				setLastBox(lastBox.previousElementSibling as any);
			} else {
				setLastBox(null)
			}
		}
		const animationEnd = () => {
			boxCountHandlers.decrement()
			setRemaining(remaining => remaining.slice(0, remaining.length-1));
		}
		if(!cardContainer.current || !lastBox) return;

		const newActionPerformed = (action: any) => {
			setRecentlyPressed(action);
			clearRecentlyPressedTimeout();
			startRecentlyPressedTimeout();
		}

		performActionAndAnimation(lastBox, action, addNewBox, animationEnd, newActionPerformed, openInfoDrawer, openFilterDrawer);
	}

	useEffect(() => {
		if(cardContainer.current !== null) setLastBox(cardContainer.current.lastElementChild as any);
	}, [cardContainer]);

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
				{remaining.slice(Math.max(remaining.length - boxCount, 0)).map((activity) => (
					<ActivityCard 
						key={activity.id} 
						data={activity} 
						onClick={() => doAction("info")()}
						onDoubleClick={() => doAction("star")()} 
					/>
				))}
			</div>
			<SwipeCardActionButtons highlight={recentlyPressed} activityCount={currentCardIndex + 1} doAction={doAction} currentId={(currentCardIndex < 0) ? null : remaining[currentCardIndex].id}/>
			<ActivityDetailsDrawer
				data={(currentCardIndex < 0) ? null : remaining[currentCardIndex]}
				opened={infoOpened}
				onClose={closeInfoDrawer} />
			<SearchFilterDrawer opened={filterOpened} onClose={closeFilterDrawer} />
		</div>
	);
}