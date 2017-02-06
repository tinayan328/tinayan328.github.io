
<!-- 
/************************************************
	Don't read my js file, I'm trying to make the website a little bit interesting, 
	but you may find clues in js file ( I hope the browser can secure the js file :\). 
	Or maybe I need a back end.
************************************************/
-->
(function() {
	var index = 0, round = 0, group = 0;
	var prev = "";
	var decision = false;
	var messagePool = [["Hi, I'm Tina, it is nice to meet you.",
	"Uhh, it is a little bit weird to say nice to meet you",
	"Since I don't really know who is looking at this page",
	"Anyway, enjoy your day (and probably have some fun :P )"],
	["Are you getting bored? Or have nothing else to do?",
	"You have already read through the messages for so many times",
	"Maybe I can find something interesting, just maybe",
	"Don't really expect it is interesting",
	"Do you still want to see it?",
	"Thanks. As you see I'm a big <strong> baka </strong> who do <strong> stupid </strong> in her personal website~"]]

	var nextMessage = function(enter) {
		if(decision) {
			$("#welcomeMessage").html(messagePool[group][index]).removeClass("typing")
			if (prev.toLowerCase().endsWith("yes")) {
				index++;
				prev = "";
			} else if (prev.toLowerCase().endsWith("no")) {
				index = 0;
				group = 0;
				round = 0;
				prev = "";
			} else if (enter) {
				$("#welcomeMessage").attr("hidden", true)
				setTimeout(
    				function(){$('#welcomeMessage').addClass('typing').attr("hidden", false)}
	    		, 10);
				return;
			} else {
				return;
			}
		}

		$("#welcomeMessage").html(messagePool[group][index]);

		index++;
		if(index == messagePool[group].length) {
			index = 0;
			round++;
		}
//		if(group == 0 && round == 4) {
//			group = 1;
//			round = 0;
//		} else if (group == 1 && round == 1) {
//			group = 0;
//			round = 0;
//		}

		decision = messagePool[group][index] === "Do you still want to see it?";
	}

	$(document).on("keypress", function(e) {
		switch (e.which) {
			case 13:
				nextMessage(true);
				break;
			default:
				if(decision) {
					prev += String.fromCharCode(e.which)
					prev = prev.substring(prev.length - 5)
					nextMessage()
				} else {
					prev = "";
				}
		}
	})

	$(document).click(nextMessage);

	nextMessage()
})()