function setup() {
    WIDTH = windowWidth;
    HEIGHT = windowHeight;
    canvas = createCanvas(WIDTH, HEIGHT);
    canvas.id("canvas");
    div = createDiv();
    div.id("container");
    canvas.parent(div);
    view = new BoidsView();
    boidModel = new BoidsModel(WIDTH, HEIGHT, 50);
    controller = new BoidsController(boidModel);
    controller.setView(view);
    frameRate(20);
    
}
  
function draw() {
    background(220);
    controller.tick();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    boidModel.updateSize(windowWidth, windowHeight);
}