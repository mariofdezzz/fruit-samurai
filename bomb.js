class Bomb extends Target {
    constructor(vo, theta, h, x, y, size, texture) {
        super(vo, theta, h, x, y, size, texture);

        this.color = 0;
    }

    modPuntuation() {
        lives -= 1;
        if (lives == 0) mode = 3;
    }
}