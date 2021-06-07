class Target {
    constructor(vo, theta, h, x, size) {
        this.vo = vo;
        this.theta = theta * PI / 180;
        this.h = h;
        this.x_inicial = x;
        this.x = 0;
        this.y = 0;
        this.g = 9.8;
        this.t = 0;
        this.size = size;
    }

    move() {
        this.x = (this.vo * cos(this.theta) * this.t) + this.x_inicial;
        this.y = this.h + (this.vo * sin(this.theta)) * this.t - (0.5 * this.g) * (this.t * this.t);
        this.t += 1 / 6;
    }

    display() {
        fill(this.color);
        // texture(img);
        image(img, this.x, height - this.y, this.size, this.size);

        // circle(this.x, height - this.y, this.size);
    }

    checkCollition(landmark) {
        return (dist(this.x, height - this.y, landmark.x * width, landmark.y * height) <= this.size);
    }
}

class TargetFactory {

    static bombP = 0.4;

    static getNewTarget(){
        if( random(1) < this.bombP) {
            //bombs.push(new Bomb(random(width),random(height),100));
            console.log("Bomba");
            return new Bomb(random(80,125), random(60,120),-1, random(width/2), random(50,120));
        } else {
            return new Fruit(random(80,125), random(60,80),-1, random(width/2), random(50,120));
        }
    }
}