var cRow = 25;
var cColumn = 13;

var Controller = new MainController(cRow, cColumn);

function MainController() {
	var num = 0;
	var board = new Board(cRow, cColumn);
	var offsetY = Math.floor((cRow - 17) / 2);
	var offsetX = Math.floor((cColumn - 5) / 2);

	var upArrow = [
		[0,0,1,0,0],
		[0,1,1,1,0],
		[1,1,1,1,1]
	]

	var downArrow = [
		[1,1,1,1,1],
		[0,1,1,1,0],
		[0,0,1,0,0]
	]

	var space = [
		[1,0,0,0,1],
		[1,1,1,1,1]
	]

	var numList = [
		[[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,0,1,0,0]],

		[[1,1,1,1,1],
		[0,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1]],

		[[1,1,1,1,1],
		[0,0,0,0,1],
		[1,1,1,1,1],
		[0,0,0,0,1],
		[1,1,1,1,1]],

		[[1,0,1,0,0],
		[1,0,1,0,0],
		[1,1,1,1,1],
		[0,0,1,0,0],
		[0,0,1,0,0]],

		[[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,1],
		[1,1,1,1,1]],

		[[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,1,1,1,1]],

		[[1,1,1,1,1],
		[0,0,0,0,1],
		[0,0,0,1,0],
		[0,0,1,0,0],
		[0,0,1,0,0]],

		[[1,1,1,1,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,1,1,1,1]],

		[[1,1,1,1,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[0,0,0,0,1],
		[1,1,1,1,1]]]

		function display(data, x, y) {
			for(var i = 0; i < data.length; ++i) {
				for(var j = 0; j < data[i].length; ++j) {
					if(data[i][j] == 0)
						board.hide([y+i,x+j])
					else
						board.show([y+i,x+j])
				}
			}
		}

		display(upArrow, offsetX, offsetY);
		display(numList[num], offsetX, offsetY + 4);
		display(downArrow, offsetX, offsetY + 10);
		display(space, offsetX, offsetY + 15);

		function upPress() {
			num = (num + 1) % numList.length
			display(numList[num], offsetX, offsetY + 4);
		}

		function downPress() {
			num = (num + numList.length - 1) % numList.length
			display(numList[num], offsetX, offsetY + 4);
		}

		function spacePress() {
				Controller = new TetrisController(cRow, cColumn)
		}

		return {
			upPress: upPress,
			downPress: downPress,
			spacePress: spacePress
		}
}

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
		} else if (e.keyCode == '32') {
			Controller.spacePress();
		}
	}

	document.onkeydown = checkKey;

	function nextFrame() {
		if(Controller.nextFrame)
			Controller.nextFrame()
		setTimeout(nextFrame, 500);
	}

	nextFrame();
}