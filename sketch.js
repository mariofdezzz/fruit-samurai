var landmarks;
let capture;
let stepsPerTarget = 20;
let steps = stepsPerTarget;
let targets = [];
let bombs = [];
let puntuation = 0;
let highScore = 0;
let lives = 3;
let pauseButton;
let playButton;
let resetButton;
let madera;
let asianFont;

let songIndex = 0;
const sounds = 8;
let song = [];
let bombSound;

// menu inicial -> 0; juego -> 1; pausa ->2; fin juego -> 3;
let mode = 0;

let fruitSample, bombExample;

function preload() {
  img = loadImage('public/logo.png');
  madera = loadImage('assets/madera.jpg');
  asianFont = loadFont('assets/go3v2.ttf');
  soundFormats('mp3');
  for (let i = 0; i <= sounds; i++) {
    song[i] = loadSound('assets/sounds/sonido-espada-' + i + '.mp3');
  }
  bombSound = loadSound('assets/bakuhatu01.wav');
}

function setup() {
  textFont(asianFont);
  createCanvas(1280, 720);
  fill(255, 0, 0);
  preload()
  capture = createCapture(VIDEO);
  capture.size(width, height);

  fruitSample = createImg('assets/cereza.gif', 'Cereza');
  fruitSample.position(width/4, height/2 + 25, 70, 70);
  fruitSample.size(150, 150);

  bombExample = createImg('assets/bomba.gif');
  bombExample.position(3*width/5, height/2 + 50, 70, 70);
  bombExample.size(100, 100);

  mediaPipe();
  pauseButton = new PauseButton(20, 20, 50, 50);
  playButton = new PlayButton(width / 2, height / 2, 400, 50);
  resetButton = new ResetButton(200, 300, 400, 50);
}

function draw() {
  switch (mode) {
    case 0:
      background(0);
      push();
      translate(width, 0);
      scale(-1, 1);
      image(capture, 0, 0, width, height);
      pop();

      textSize(100);
      fill(0);
      image(madera, 0, 0, width, height / 5);

      fill(225);

      text("fruit samurai", width / 2, 50);
      playButton.move((width / 2) - playButton.width / 2, (height / 2) - playButton.height / 2);
      playButton.display();
      paintFingers();

      fill(255);
      textSize(25);
      text("Corta las frutas", width/3 - 25, 2*height/3 + 50);

      text("Esquiva las bombas", 2*width/3 - 25, 2*height/3 + 50);

      break;
    case 1:
      background(0);

      push();
      translate(width, 0);
      scale(-1, 1);
      image(capture, 0, 0, width, height);
      pop();

      if (steps <= 0) {
        targets.push(TargetFactory.getNewTarget());

        stepsPerTarget = random(10, 50);

        steps = stepsPerTarget;
      }

      paintGame();

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

      playButton.move(width / 2 - resetButton.width / 2, height / 3);
      resetButton.move(width / 2 - resetButton.width / 2, height / 3 + 100);

      playButton.display();
      resetButton.display();
      paintFingers();

      break;
    case 3:
      background(0);
      push();
      translate(width, 0);
      scale(-1, 1);
      image(capture, 0, 0, width, height);
      pop();

      fill(0);
      //rect(width/4, height/4,width/2, height/3)
      image(madera, width / 4, height / 4, width / 2, height / 3);

      textSize(60);
      fill(255);
      textAlign(CENTER, CENTER);
      text("Has perdido", width / 2, height / 3);
      textSize(30);
      text("Puntuación: " + puntuation + "    HighScore: " + highScore, width / 2, height / 3 + 60);

      resetButton.move(width / 2 - resetButton.width / 2, height / 3 + 100);

      resetButton.display();
      paintFingers();
  }
}

function paintGame() {
  for (var i = 0; i < targets.length; i++) {
    if (mode == 1) targets[i].move();
    targets[i].display();

    if (mode == 1) {
      // Se borran si salen de pantalla
      if (targets[i].x > width || targets[i].y < -1) {
        targets[i].remove();
        targets.splice(i, 1);

      } else if (landmarks) {
        if (targets[i].checkCollition(landmarks[8])) {
          
          if(targets[i] instanceof Bomb){
            bombSound.play();
          } else {
            if (!song[songIndex].isPlaying()) {

              song[songIndex].play();
  
            } else {
              songIndex = round(random(0, sounds));
            }
          }

          targets[i].modPuntuation();
          targets[i].remove();
          targets.splice(i, 1);
        }
      }
    }
  }

  if (lives < 1) endGame();

  fill(0);
  //rect(0,0,width,80);
  image(madera, 0, 0, width, 80);
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
    //circle(landmarks[8].x * width, landmarks[8].y * height, 40);
    paintKnife(landmarks[8].x * width, landmarks[8].y * height, 40);
    if (!pauseButton.hide) pauseButton.checkPress(landmarks[8]);
    if (!playButton.hide) playButton.checkPress(landmarks[8]);
    if (!resetButton.hide) resetButton.checkPress(landmarks[8]);
  }
}

function paintKnife(x, y, size) {
  image(img, x - size / 2, y - size / 2, size, size);
}

function changeHide() {
  switch (mode) {
    case 0: //menu
      pauseButton.hide = true;
      playButton.hide = false;
      resetButton.hide = true;
      break;
    case 1: //juego
      pauseButton.hide = false;
      playButton.hide = true;
      resetButton.hide = true;
      break;
    case 2: //pausa
      pauseButton.hide = true;
      playButton.hide = false;
      resetButton.hide = false;
      break;
    case 3: //fin
      pauseButton.hide = true;
      playButton.hide = true;
      resetButton.hide = false;
  }
}

function resetGame() {
  puntuation = 0;
  lives = 3;
  mode = 1;
  targets.forEach(t => t.remove())
  targets = [];
}

function endGame() {
  if (puntuation > highScore) highScore = puntuation;
  mode = 3;
  changeHide();
}
