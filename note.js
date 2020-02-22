/*
Manvir Singh
Guess the Note Game
9/16/13
 */

"use strict";

(function() {
	var wkCount = 11;
	var synth;
	var currentKey;
	var playB;
	var score = 500;
	var round = 1;
	var context = new AudioContext();

	window.onload = function() {
		document.body.innnerHTML = "";
		synth = new Array();
		var container = document.createElement("div");
		container.id = "container";
		document.body.appendChild(container);

		createPiano();
		createGamePanel();
	}

	function createPiano() {
		var piano = document.createElement("div");
		piano.id = "piano";
		document.getElementById("container").appendChild(piano);

		var bkey = false;
		var count = 0;
		var kWidth = parseInt(window.getComputedStyle(piano).getPropertyValue("width")) / wkCount - 4;

		for (var i = 0; i < wkCount; i++) {
			if (count == 10000) {
				alert("infinite loop for keys");
				break;
			}
			var key = document.createElement("div");
			key.classList.add("key");
			key.style.width = kWidth + "px";
			key.id = Math.pow(2, ((45 + count) - 49) / 12) * 440;
			var oscillator = context.createOscillator();
			oscillator.frequency.value = key.id;
			oscillator.start(0);
			synth[key.id] = oscillator;
			key.onclick = play;
			piano.appendChild(key);
			key.style.left = i * kWidth + "px";
			if (count) {
			 	key.style.left = i * (kWidth + 4) + "px";
			}

			if ((i % 7 == 1 || i % 7 == 2 || i % 7 == 3 || i % 7 == 5 || i % 7 == 6)
					&& bkey) {
				key.style.width = kWidth * 2 / 3 + "px";
				key.style.left = i * (kWidth + 4) - (kWidth / 3 + 2) + "px";
				key.classList.add("bkey");
				bkey = false;
				i--;
			} else {
				bkey = true;
			}
			count++;
		}
	}

	function createGamePanel() {
		var gamePanel = document.createElement("div");
		gamePanel.id = "gamePanel";
		document.getElementById("container").appendChild(gamePanel);

		playB = document.createElement("div");
		playB.classList.add("button");
		gamePanel.appendChild(playB);
		playB.innerHTML = "<p>Play</p>";
		playB.style.left = "5px";

		var keys = document.querySelectorAll(".key");
		playB.id = keys[Math.round(Math.random() * (keys.length - 1))].id;
		playB.onclick = play;

		var chooseB = document.createElement("div");
		chooseB.classList.add("button");
		gamePanel.appendChild(chooseB);
		chooseB.innerHTML = "<p>Choose</p>";
		chooseB.style.left = 10 + parseInt(window.getComputedStyle(playB).getPropertyValue("width")) + "px";

		chooseB.onclick = check;

		var scoreD = document.createElement("div");
		scoreD.classList.add("display");
		scoreD.id = "scoreD";
		gamePanel.appendChild(scoreD);
		scoreD.innerHTML = "<p>Score: " + score + "</p>";
		scoreD.style.left = parseInt(window.getComputedStyle(gamePanel).getPropertyValue("width")) - 250 + "px";

		var roundD = document.createElement("div");
		roundD.classList.add("display");
		roundD.id = "roundD";
		gamePanel.appendChild(roundD);
		roundD.innerHTML = "<p>Round: " + round + "/10</p>";
		roundD.style.left = parseInt(window.getComputedStyle(gamePanel).getPropertyValue("width")) - 500 + "px";
	}

	function play() {
  context.resume()
		synth[this.id].connect(context.destination);
		var id = this.id
		setTimeout(function() { synth[id].disconnect(); }, 750);
		score -= 10;
		currentKey = this;
		document.getElementById("scoreD").innerHTML = "<p>Score: " + score + "</p>";
	}

	function stop() {
		synth[this.id].disconnect();
	}

	function check() {
		if (playB.id == currentKey.id) {
			score += 500;
			alert("Right!!!!!");
		} else {
			score -= 50;
			alert("Wrong :(");
		}
		round++;
		if (round > 10) {
			document.getElementById("scoreD").innerHTML = "<p>Score: " + score + "</p>";
			alert("FINAL SCORE: " + score);
			score = 500;
			round = 1;
		}
		document.getElementById("scoreD").innerHTML = "<p>Score: " + score + "</p>";
		document.getElementById("roundD").innerHTML = "<p>Round: " + round + "/10</p>";
		var keys = document.querySelectorAll(".key");
		playB.id = keys[Math.round(Math.random() * (keys.length - 1))].id;
	}

})();
