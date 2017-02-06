function TetrisController() {

	var cRow = 25;
	var cColumn = 12;
	var map = [];
	var board = new Board(cRow, cColumn);

	var lose = false;

	var curOrigin = [0, cColumn / 2];
	var curObj = [];

	var LineShape = [
		//horizontal
		[[0,0], [0,1], [0,2], [0,3]],
		//vertical
		[[0,0], [1,0], [2,0], [3,0]]
	]

	var LRShape = [
		[[0,0], [0,1], [1,0], [2,0]],
		[[0,0], [0,1], [0,2], [1,2]],
		[[0,0], [1,0], [2,0], [2, -1]],
		[[0,0], [1,0], [1,-1], [1, -2]]
	]

	var SRShape = [
	  //vertical
		[[0,0], [1,0], [1, -1], [2, -1]],
		//horizontal
		[[0,0], [0,1], [1,1], [1,2]]
	]

	var LLShape = [
		[[0,0], [0,1], [1,1], [2,1]],
		[[0,0], [1,0], [1, -1], [1, -2]],
		[[0,0], [1,0], [2,0], [2,1]],
		[[0,0], [0,1], [0,2], [1,0]]
	]

	var SLShape = [
		//vertical
		[[0,0], [1,0], [1,1], [2,1]],
		//horizontal
		[[0,0], [0,-1], [1,-1], [1, -2]]
	]

	var SquareShape = [
		[[0,0], [0,1], [1,0], [1,1]]
	]

	var TShape = [
		//up
		[[0,0], [1,-1], [1,0], [1,1]],
		//right
		[[0,0], [1,0], [2,0], [1,1]],
		//down
		[[0, -1], [0,0], [0,1],[1,0]],
		//left
		[[0,0], [1,0], [2,0], [1,-1]]
	]

	var ListShape = [
		LLShape, SLShape, LRShape, SRShape, LineShape, SquareShape, TShape
	]

	function initializeMap() {
		for(var i = 0; i < cRow; ++i) {
			map[i] = [];
			for(var j = 0; j < cColumn; ++j) {
				map[i][j] = false;
			}
		}
		board.initializeBoard();
		nextObj();
	}

	function leftPress() {
		var nextOrigin = [curOrigin[0], curOrigin[1] - 1];
		var listPoint = ListShape[curObj[0]][curObj[1]];
		if(checkEmpty(listPoint, nextOrigin)) {
			renderObj(nextOrigin, listPoint, listPoint)
			curOrigin = nextOrigin;
		}
	}

	function rightPress() {
		var nextOrigin = [curOrigin[0], curOrigin[1] + 1];
		var listPoint = ListShape[curObj[0]][curObj[1]];
		if(checkEmpty(listPoint, nextOrigin)) {
			renderObj(nextOrigin, listPoint, listPoint)
			curOrigin = nextOrigin;
		}
	}

	function upPress() {
		var iRotation = (curObj[1] + 1) % (ListShape[curObj[0]].length)
		if(checkEmpty(ListShape[curObj[0]][iRotation], curOrigin)) {
			renderObj(curOrigin, ListShape[curObj[0]][curObj[1]], ListShape[curObj[0]][iRotation])
			curObj[1] = iRotation;
		}
	}

	function downPress() {
		var nextOrigin = [curOrigin[0] + 1, curOrigin[1]];
		var listPoint = ListShape[curObj[0]][curObj[1]];
		if(checkEmpty(listPoint, nextOrigin)) {
			renderObj(nextOrigin, listPoint, listPoint)
			curOrigin = nextOrigin;
		}
	}

	function renderObj(nextOrigin, curListPoint, nextListPoint) {
		for(var i = 0; i < curListPoint.length; ++i)
			board.hide([curOrigin[0] + curListPoint[i][0], curOrigin[1] + curListPoint[i][1]])

		for(var i = 0; i < nextListPoint.length; ++i)
			board.show([nextOrigin[0] + nextListPoint[i][0], nextOrigin[1] + nextListPoint[i][1]])
	}

	function checkMoveDown() {
		var listPoint = ListShape[curObj[0]][curObj[1]];
		var nextOrigin = [curOrigin[0] + 1, curOrigin[1]];
		return checkEmpty(listPoint, nextOrigin)
	}

	function checkEmpty(listPoint, origin) {
		for(var i = 0; i < 4; ++i) {
			var r = listPoint[i][0] + origin[0];
			if(r < 0 || r >= cRow)
				return false;

			var c = listPoint[i][1] + origin[1];
			if(c < 0 || c >= cColumn)
				return false;

			if(map[r][c])
				return false;
		}
		return true;
	}

	function firmMap() {
		var listPoint = ListShape[curObj[0]][curObj[1]];
		for(var i = 0; i < 4; ++i) {
			var r = listPoint[i][0] + curOrigin[0];
			var c = listPoint[i][1] + curOrigin[1];
			map[r][c] = true;
		}
	}

	function nextObj() {
		curOrigin = [0, cColumn / 2]
		var iShape = Math.floor(Math.random() * ListShape.length);
		curObj[0] = iShape;
		var iRotation = Math.floor(Math.random() * ListShape[iShape].length)
		curObj[1] = iRotation
		listPoint = ListShape[iShape][iRotation]

		for(var i = 0; i < listPoint.length; ++i)
			board.show([curOrigin[0] + listPoint[i][0], curOrigin[1] + listPoint[i][1]])
	}

	function DisplayMap() {
		board.renderBoard(map, true);
	}

	function checkClear() {
		map = map.filter(
			function(row) {
				for(var i = 0; i < cColumn; ++i)
					if(!row[i])
						return true;

				return false;
			}
		)

		if(map.length < cRow) {
			var emptyRow = []
			for(var i = 0; i < cColumn; ++i)
				emptyRow[i] = false;

			while(map.length < cRow) {
				map.unshift(emptyRow);
			}
			DisplayMap();
		}
	}

  function checkLose() {
  	for(var i = 0; i < cColumn; ++i) 
  		if(map[0][i])
  			lose = true

  	return lose;
  }

	function nextFrame() {
		if(!lose) {
			if(checkMoveDown())
				downPress();
			else {
				firmMap();
				checkClear();
				nextObj();
			}
			if(checkLose())
				board.gameOver();
		}
	}

	return {
		leftPress: leftPress,
		rightPress: rightPress,
		upPress: upPress,
		downPress: downPress,
		initializeMap: initializeMap,
		nextFrame: nextFrame
	}
}