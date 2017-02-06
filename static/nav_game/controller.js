var Controller = new TetrisController();

function setUp() {

	function checkKey(e) {
		e = e || windows.event;

		if(e.keyCode == '38') {
			Controller.upPress();
		} else if (e.keyCode == '40') {
			Controller.downPress();
		} else if (e.keyCode == '37') {
			Controller.leftPress();
		} else if (e.keyCode == '39') {
			Controller.rightPress();
		}
	}

	document.onkeydown = checkKey;
	Controller.initializeMap();

	function nextFrame() {
		Controller.nextFrame();
		setTimeout(nextFrame, 500);
	}

	nextFrame();
}