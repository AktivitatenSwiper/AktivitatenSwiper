import type { FullGestureState } from "@use-gesture/react";

export function animateBoxAway(box: HTMLDivElement, destionationX: number, destinationY: number, animationEnd: () => void) {
	setBoxTransformBasedOnFingerPosition(box, destionationX, destinationY)
	box.style.pointerEvents = "none"
	box.style.transition = "transform .5s ease"
	box.addEventListener('transitionend', () => {
		animationEnd()
	});
}

export function returnToCenter(box: HTMLDivElement) {
	box.style.transition = "transform .3s ease"
	box.style.transform = ""
}

export function setBoxTransformBasedOnFingerPosition(box: HTMLDivElement, deltaX: number, deltaY: number) {
	const matrix = new DOMMatrixReadOnly(window.getComputedStyle(box).transform);
	const translateX = matrix.m41 + deltaX;
	const translateY = matrix.m42 + deltaY;
	const degrees = 20 * translateX / window.innerWidth
	box.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${degrees}deg)`
}
export function determineSwipeAction(box: HTMLDivElement, event: Omit<FullGestureState<"drag"|"wheel">, "event">) {
	const style = window.getComputedStyle(box);
	const matrix = new DOMMatrixReadOnly(style.transform);
	const displacementX = matrix.m41; // horizontal displacement
	const displacementY = matrix.m42; // vertical displacement
	const thresholdX = box.offsetWidth * 0.4;
	const thresholdY = box.offsetHeight * 0.3;
	const boxIsMovedFarEnoughX = Math.abs(displacementX) >= thresholdX;
	const boxIsMovedFarEnoughY = Math.abs(displacementY) >= thresholdY;

	if(boxIsMovedFarEnoughX && displacementX > 0) return "like"
	if(boxIsMovedFarEnoughX && displacementX < 0) return "dislike"
	if(boxIsMovedFarEnoughY && displacementY < 0) return "info"

	if (!('swipe' in event)) return null;
	const dragEvent = event as Omit<FullGestureState<"drag">, "event">
	if(dragEvent.swipe[0] === 1)  return "like"
	if(dragEvent.swipe[0] === -1) return "dislike"
	if(dragEvent.swipe[1] === -1) return "info"

	return null;
}