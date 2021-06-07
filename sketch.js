var landmarks;
let capture;
let stepsPerTarget = 20;
let steps = stepsPerTarget;
let bombP = 40;
let targets = [];
let bombs = [];
let puntuation = 0;
let lives = 3;
let paused = false;
let pauseButton;
let playButton;
let resetButton;
let img;

// menu inicial -> 0; juego -> 1; pausa ->2; fin juego -> 3;
let mode = 0;

function preload() {
	img = loadImage('assets/platano.gif');
}

window.setup = function () {
	createCanvas(1280, 720);
	fill(255, 0, 0);
	preload()
	capture = createCapture(VIDEO);
	capture.size(width, height);

	mediaPipe();
	pauseButton = new PauseButton(20, 20, 50, 50);
	playButton = new PlayButton(200, 200, 400, 50);
	resetButton = new ResetButton(200, 200, 400, 50);
}

window.draw = function () {

	switch (mode) {
		case 0:
			background(0);
			push();
			translate(width, 0);
			scale(-1, 1);
			image(capture, 0, 0, width, height);
			pop();

			playButton.display();
			paintFingers();

			break;
		case 1:
			background(0);

			push();
			translate(width, 0);
			scale(-1, 1);
			image(capture, 0, 0, width, height);
			pop();

			if (!paused) {

				if (steps <= 0) {
					targets.push(new Fruit(random(50, 100), random(60, 80), random(60, height), random(width / 2), random(height), random(50, 120)));

					stepsPerTarget = random(10, 50);
					if (random(1) < bombP / 100) {
						//bombs.push(new Bomb(random(width),random(height),100));
						targets.push(new Bomb(random(50, 100), random(60, 80), random(60, height), random(width / 2), random(height), random(50, 120)));
					}
					steps = stepsPerTarget;
				}

				paintGame();
			}

			paintFingers();

			steps--;
			break;
		case 2:
			background(0);
			push();
			translate(width, 0);
			scale(-1, 1);
			image(capture, 0, 0, width, height);
			pop();

			paintGame();
			playButton.display();
			paintFingers();

			break;
		case 3:
			background(0);
			textSize(60);
			fill(255);
			textAlign(CENTER, CENTER);
			text("Has perdido", width / 2, height / 3);
			textSize(30);
			text("Puntuación: " + puntuation, width / 2, height / 3 + 60);

	}
}

function paintGame() {
	for (var i = 0; i < targets.length; i++) {
		if (mode == 1) targets[i].move();
		targets[i].display();

		if (mode == 1) {
			if (landmarks) {
				if (targets[i].checkCollition(landmarks[8])) {
					targets[i].modPuntuation();
					targets.splice(i, 1);
				}
			}
		}
	}

	fill(0);
	rect(0, 0, width, 80);
	fill(225);
	textAlign(LEFT);
	textSize(30);
	text("Puntuación: " + puntuation, pauseButton.x + pauseButton.width + 20, 50);
	text("Vidas: " + lives, pauseButton.x + pauseButton.width + 300, 50);

	//dibujar botón pausa
	pauseButton.display();
}

function paintFingers() {
	if (landmarks) {
		fill(255);
		circle(landmarks[8].x * width, landmarks[8].y * height, 40);
		if (!pauseButton.hide) pauseButton.checkPress(landmarks[8]);
		if (!playButton.hide) playButton.checkPress(landmarks[8]);

	}
}

function ChangeHide() {
	switch (mode) {
		case 0:
			pauseButton = true;
			playButton = false;
			resetButton = true;
			break;
		case 1:
			pauseButton = false;
			playButton = true;
			resetButton = true;
			break;
		case 2:
			pauseButton = false;
			playButton = true;
			resetButton = true;
			break;
	}
}