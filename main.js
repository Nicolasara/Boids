function setup() {
    WIDTH = 1000;
    HEIGHT = 800;
    view = new BoidsView(WIDTH, HEIGHT);
    boidModel = new BoidsModel(WIDTH, HEIGHT, 50);
    controller = new BoidsController(boidModel, view, HEIGHT, WIDTH);
    frameRate(20);
}
  
function draw() {
    background(220);
    controller.tick();
}