class BoidsController {
    constructor(model, view, height, width) {
        this.model = model;
        this.view = view;
        // this.height = height;
        // this.width = width;
    }
    
    tick() {
        this.view.drawBoids(this.model.getBoids());
        this.model.tick();
    }
}