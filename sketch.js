var gif_createImg;

function setup() {
	createCanvas(500, 700);
	background(0);
	gif_createImg = createImg("assets/platano.gif");
}

function draw() {
	gif_createImg.position(50, 50);

}

window.setup = setup
window.draw = draw