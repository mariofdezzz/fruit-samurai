class Buttom {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.pressed = false;
        this.hide = false;
    }

    checkPress(landmark) {
        if (landmark.y * height > this.y && landmark.y * height <= this.y + this.height) {
            if (landmark.x * width > this.x && landmark.x * width <= this.x + this.width) {
                this.pressed = true;
                this.press();
            }
        } else {
            this.pressed = false;
        }
    }

    display() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }

    press() {

    }
}

class PauseButton extends Buttom {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    display() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
        fill(0);
        rect(this.x + (this.width / 2) - 8, this.y + this.height / 4, 6, this.height / 2)
        rect(this.x + (this.width / 2) + 2, this.y + this.height / 4, 6, this.height / 2)
    }

    press() {
        //paused = !paused;
        mode = 2;
        playButton.hide = false;
        this.hide = true;
    }
}

class PlayButton extends Buttom {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    display() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
        fill(0);
        //textAlign(CENTER);
        textAlign(CENTER, CENTER);
        textSize(40);
        text('Play', this.x + this.width / 2, this.y + this.height / 2)
    }
    press() {
        mode = 1;
        this.hide = true;
        pauseButton.hide = false;
    }
}

class ResetButton extends Buttom {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    display() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
        fill(0);
        //textAlign(CENTER);
        textAlign(CENTER, CENTER);
        textSize(40);
        text('Reset', this.x + this.width / 2, this.y + this.height / 2)
    }

    press() {
        mode = 1;
        this.hide = true;
        pauseButton.hide = false;
    }
}