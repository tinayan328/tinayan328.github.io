function Board(cRow, cColumn) {
	var cubeSize = 20;
	var marginSize = 2;
	
	var height = cRow * (cubeSize + marginSize) + marginSize;
	var width = cColumn * (cubeSize + marginSize) + marginSize;

	var boardRecd = [];

	var board = $(".board");
	board.empty();
	board.css("width", width + "px")
			 .css("height", height + "px")

	for(var i = 0; i < cRow; ++i) {
		boardRecd[i] = [];
		for(var j = 0; j < cColumn; ++j) {
			var cube = $('<div class="cube"></div>')
							.css("width", cubeSize + "px")
							.css("height", cubeSize + "px")
							.offset({top: i * (cubeSize + marginSize) + marginSize,
											 left: j * (cubeSize + marginSize) + marginSize})
							.hide();
			board.append(cube);
			boardRecd[i][j] = cube;
		}
	}

	function gameOver() {
		var game = [
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,1,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,0,0,0,0],
		[1,1,0,1,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[1,0,1,0,1],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1]]

		var over = [
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,1,1,0],
		[0,0,0,0,0],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[0,1,0,1,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,1,1,1,1],
		[0,0,0,0,0],
		[1,1,1,1,0],
		[1,0,0,0,1],
		[1,1,1,1,0],
		[1,0,1,0,0],
		[1,0,0,1,0],
		[1,0,0,0,1]]

		var gameOverMap = [];

		for(var i = 0; i < cRow; ++i) {
			gameOverMap[i] = []
			for(var j = 0; j < cColumn; ++j) {
				gameOverMap[i][j] = false;
			}
		}

		var gameOrigin = [0,0];
		for(var i = 0; i < game.length; ++i) {
			for(var j = 0; j < 5; ++j) {
				gameOverMap[gameOrigin[0] + i][gameOrigin[1] + j] = game[i][j] == 1;
			}
		}

		var overOrigin = [cRow - over.length, cColumn - 5];
		for(var i = 0; i < over.length; ++i) {
			for(var j = 0; j < 5; ++j) {
				gameOverMap[overOrigin[0] + i][overOrigin[1] + j] = over[i][j] == 1;
			}
		}

		renderBoard(gameOverMap, true)

	}

	function renderBoard(map, fHide) {
		for(var i = 0; i < cRow; ++i) {
			for(var j = 0; j < cColumn; ++j) {
				if(map[i][j])
					boardRecd[i][j].show();
				else if (fHide)
					boardRecd[i][j].hide();
			}
		}
	}

	function show(v) {
		boardRecd[v[0]][v[1]].show()
	}

	function hide(v) {
		boardRecd[v[0]][v[1]].hide()
	}

	return {
		renderBoard: renderBoard,
		gameOver: gameOver,
		show: show,
		hide: hide
	}
}