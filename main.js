function setup() {
    WIDTH = windowWidth;
    HEIGHT = windowHeight;
    view = new BoidsView();
    boidModel = new BoidsModel(WIDTH, HEIGHT, 50);
    controller = new BoidsController(boidModel, view);
    frameRate(20);
    createCanvas(WIDTH, HEIGHT);
}
  
function draw() {
    background(220);
    controller.tick();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    boidModel.updateSize(windowWidth, windowHeight);
}