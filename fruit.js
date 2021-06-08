class Fruit extends Target {
    constructor(vo, theta, h, x, y, size, texture) {
        super(vo, theta, h, x, y, size, texture);
        this.points = 10;

        this.color = color(random(0, 225), random(0, 225), random(0, 225));
    }

    modPuntuation() {
        puntuation += this.points;
    }
}