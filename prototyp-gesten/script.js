const colors = [ "#606c38", "#283618", "#dda15e", "#bc6c25", "#c1121f", "#669bbc", "#0077b6", "#00b4d8", "#90e0ef", "#8ecae6", "#219ebc", "#ffb703", "#fb8500", "#ccd5ae", "#d4a373", "#cdb4db", "#ffafcc", "#a2d2ff", "#edafb8", "#b0c4b1", "#4a5759", "#5f0f40", "#9a031e", "#fb8b24", "#e36414", "#0f4c5c", "#ffc2d1", "#ffb3c6", "#ff8fab", "#fb6f92", "#e07a5f", "#3d405b", "#81b29a", "#f2cc8f", "#415a77", "#778da9", "#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c", "#d6ccc2", "#d5bdaf", "#ffa5ab", "#da627d", "#a53860", "#386641", "#6a994e", "#a7c957", "#bc4749", "#dad7cd", "#a3b18a", "#588157", "#3a5a40", "#344e41", "#023e8a", "#0077b6", "#0096c7", "#00b4d8", "#48cae4", "#90e0ef", "#fca311", "#6f1d1b", "#bb9457", "#432818", "#99582a", "#e63946", "#a8dadc", "#457b9d", "#1d3557", "#cb997e", "#ddbea9", "#b7b7a4", "#a5a58d", "#6b705c", "#5e548e", "#9f86c0", "#be95c4", "#e0b1cb", "#f4acb7", "#9d8189", "#adc178", "#a98467", "#6c584c", "#006d77", "#83c5be", "#e29578", "#70d6ff", "#ff70a6", "#ff9770", "#ffd670", "#62b6cb", "#1b4965", "#5fa8d3", "#fec5bb", "#fec89a", "#2b2d42", "#8d99ae", "#ef233c", "#d90429", "#005f73", "#0a9396", "#94d2bd", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226", "#d62828", "#f77f00", "#fcbf49", "#ccc5b9", "#403d39", "#eb5e28", "#124559", "#598392", "#aec3b0", "#cad2c5", "#84a98c", "#52796f", "#354f52", "#2f3e46", "#5a189a", "#7b2cbf", "#9d4edd", "#c77dff", "#e0aaff", "#ff9f1c", "#ffbf69", "#2ec4b6", "#335c67", "#e09f3e", "#9e2a2b", "#9d0208", "#d00000", "#dc2f02", "#e85d04", "#f48c06", "#faa307", "#ffba08", "#f08080", "#f4978e", "#f8ad9d", "#fbc4ab", "#274c77", "#6096ba", "#a3cef1", "#8b8c89", "#003566", "#ffc300", "#ffd60a", "#31572c", "#4f772d", "#90a955", "#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51", "#b7e4c7", "#95d5b2", "#74c69d", "#52b788", "#40916c", "#2d6a4f", "#1b4332", "#4a4e69", "#9a8c98", "#c9ada7", "#800f2f", "#a4133c", "#c9184a", "#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1", "#ced4da", "#adb5bd", "#6c757d", "#495057", "#343a40", "#8cb369", "#f4a259", "#5b8e7d", "#bc4b51" ];

const boxList = document.getElementById("box-list")

function randomColorBox() {
	const randomColor = colors[Math.floor(Math.random() * colors.length)]

	const newBox = document.createElement("div")
	newBox.classList.add("box")
	newBox.style.backgroundColor = randomColor;
	return newBox
}

let lastBox = null
function fillUpBoxes() {
	// Add boxes until there are five
	do {
		const newBox = randomColorBox();
		boxList.insertBefore(newBox, boxList.firstChild)
		registerGestures(newBox)
		if(!lastBox) lastBox = newBox
	} while(boxList.childElementCount < 4);
}

function returnToCenter(box) {
	box.style.transform = ""
}

function animateBoxAway(box, gesture) {
	lastBox = lastBox?.previousElementSibling
	setBoxTransformBasedOnFingerPosition(box, gesture)
	fillUpBoxes();
	box.style.pointerEvents = "none"
	box.addEventListener('transitionend', () => {
		box.remove();
	});
}

function setBoxTransformBasedOnFingerPosition(box, gesture) {
	translateX = gesture.x - gesture.startX + (box.offsetX || 0)
	translateY = gesture.y - gesture.startY + (box.offsetY || 0)
	degrees = 20 * translateX / window.innerWidth

	box.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${degrees}deg)`
}


const swipeDirectionActions = {
	right: (box, gesture) => {
		gesture.x += Math.max(window.innerWidth, window.innerHeight);
		animateBoxAway(box, gesture)
	},
	left: (box, gesture) => {
		gesture.x -= Math.max(window.innerWidth, window.innerHeight);
		animateBoxAway(box, gesture)
	},
	top: (box, gesture) => {
		alert("Zeige mehr Informationen"),
		returnToCenter(box)
	}
}

function boxIsMovedFar(box) {
	const style = window.getComputedStyle(box);
	const matrix = new DOMMatrixReadOnly(style.transform);
	const displacement = Math.abs(matrix.m41); // horizontal displacement
	const threshold = box.offsetWidth * 0.5;
	return displacement >= threshold;
}

function handleFinishedGesture(box, gesture) {
	const isFlick = gesture.flick || boxIsMovedFar(box)
	if(isFlick && swipeDirectionActions[gesture.final_direction]) {
		// Perform the action for the gesture
		(swipeDirectionActions[gesture.final_direction])(box, gesture)
	} else {
		// If the gesture is too slow, we treat it as canceled
		returnToCenter(box);
	}
}

function registerGestures(box) {
	// const fingers = new Fingers(box);
	// fingers.addGesture(Fingers.gesture.Drag).addHandler((eventType, data, fingerList) => {
	// 	console.log(fingerList[0])
	// });

	// const listener = SwipeListener(box);
  // box.addEventListener('swipe', function (e) {
  //   console.log(e.detail);
  // });


	const finger = new TheFinger(box);

	finger.track('drag', (gesture) => {
		// console.log(gesture)
		if(box.classList.contains("box-animate-out")) {
			// 1. get the actual transformation based on the current transition animation state
			const style = window.getComputedStyle(box);
			const matrix = new DOMMatrixReadOnly(style.transform);
			const currentX = matrix.m41;
			const currentY = matrix.m42;

			// 2. compare this to the expected position at the end of the animation
			const expectedX = gesture.x - gesture.startX;
			const expectedY = gesture.y - gesture.startY;

			box.offsetX = currentX - expectedX
			box.offsetY = currentY - expectedY
		}

		const gesture_ended = gesture.hasOwnProperty("final_direction")
		box.classList.toggle("box-animate-out", gesture_ended)
		if(gesture_ended) {
			handleFinishedGesture(box, gesture)
		} else {
			setBoxTransformBasedOnFingerPosition(box, gesture)
		}
	});
}


fillUpBoxes();


document.addEventListener("keydown", (event) => {
	if (!lastBox) return;
	let gesture = {
		x: 0,
		y: 0,
		startX: 0,
		startY: 0,
		flick: true
	};
	lastBox.classList.add("box-animate-out")
	if (event.key === "ArrowRight") {
		gesture.final_direction = "right";
		handleFinishedGesture(lastBox, gesture);
	} else if (event.key === "ArrowLeft") {
		gesture.final_direction = "left";
		handleFinishedGesture(lastBox, gesture);
	} else if (event.key === "ArrowUp") {
		gesture.final_direction = "top";
		handleFinishedGesture(lastBox, gesture);
	}
});







const virtualMousePointer = {
	x: 0,
	y: 0,
	timeout: null,
	start: (event) => {
		// simulate a pointerdown event on the first ".box" element in the dom
		const downEvent = new PointerEvent("pointerdown", {
			clientX: lastBox.getBoundingClientRect().left + lastBox.offsetWidth / 2,
			clientY: lastBox.getBoundingClientRect().top + lastBox.offsetHeight / 2,
			bubbles: true
		});
		lastBox.dispatchEvent(downEvent);
		virtualMousePointer.x = downEvent.clientX;
		virtualMousePointer.y = downEvent.clientY;
	},
	move: (event) => {
		let deltaX = event.deltaX;
		let deltaY = event.deltaY;
		if (event.shiftKey) {
			deltaX = deltaY;
			deltaY = 0;
		}

		// simulate a pointermove event based on deltaX and deltaY
		virtualMousePointer.x -= deltaX;
		virtualMousePointer.y -= deltaY;

		const moveEvent = new PointerEvent("pointermove", {
			clientX: virtualMousePointer.x,
			clientY: virtualMousePointer.y,
			buttons: 1,
			bubbles: true
		});
		lastBox.dispatchEvent(moveEvent);
	},
	end: (event) => {
		// send a virtual pointerup event
		const upEvent = new PointerEvent("pointerup", {
			clientX: virtualMousePointer.x,
			clientY: virtualMousePointer.y,
			bubbles: true
		});
		lastBox.dispatchEvent(upEvent);

		virtualMousePointer.x = 0;
		virtualMousePointer.y = 0;
		virtualMousePointer.timeout = null;
	},
	ignoreIfSlowerThan: 0,
	tooSlowTimeout: null,
	timeOfPreviousWheelEvent: 0,
	handleIgnoreIfTooSlow: () => {
		if(!virtualMousePointer.ignoreIfSlowerThan) return;
		clearTimeout(virtualMousePointer.tooSlowTimeout);
		virtualMousePointer.tooSlowTimeout = setTimeout(() => {
			// console.log("reste")
			// virtualMousePointer.ignoreIfSlowerThan = 0;
			virtualMousePointer.lastDistances = null
			console.log("stop")
		}, 500)
	},
	lastDistances: null
}

const average = array => array.reduce((a, b) => a + b) / array.length;

document.addEventListener("wheel", (event) => {
	if(event.ctrlKey) return

	if(!event.deltaX && !event.deltaY) return;
	event.preventDefault();

	if(virtualMousePointer.lastDistances !== null) {
		// / timeSincePreviousEvent
		// const timeSincePreviousEvent = Math.max(event.timeStamp - virtualMousePointer.timeOfPreviousWheelEvent, 100)
		// const tooSlow = virtualMousePointer.ignoreIfSlowerThan && (distance <= (virtualMousePointer.ignoreIfSlowerThan + 1))
		const distance = Math.sqrt(event.deltaX * event.deltaX + event.deltaY * event.deltaY)
		virtualMousePointer.lastDistances.push(distance)
		virtualMousePointer.handleIgnoreIfTooSlow()

		const ignoreIfSlowerThan = average(virtualMousePointer.lastDistances) + 10
		const tooSlow = distance <= ignoreIfSlowerThan
		// if(!tooSlow)
		// console.log(tooSlow, distance, tooSlow ? " " : "!!")


		if(virtualMousePointer.lastDistances.length > 5) virtualMousePointer.lastDistances.shift()

		console.log(tooSlow)
		if(tooSlow) return;
	}


	if (!lastBox) return;

	if (virtualMousePointer.timeout === null) {
		virtualMousePointer.start(event);
	} else {
		clearTimeout(virtualMousePointer.timeout);
	}

	// If shift is pressed, convert up/down (deltaY) to left/right (deltaX)
	virtualMousePointer.move(event);

	if(boxIsMovedFar(lastBox)) {
		virtualMousePointer.end(event);
		// virtualMousePointer.ignoreIfSlowerThan = 999999
		console.log("start")
		virtualMousePointer.lastDistances = [];
		virtualMousePointer.handleIgnoreIfTooSlow()
		return;
	}

	virtualMousePointer.timeout = setTimeout(() => virtualMousePointer.end(event), 500);
}, { passive: false });
