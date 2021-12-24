class BoidsController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    
    tick() {
        this.view.drawBoids(this.model.getBoids());
        this.model.tick();
    }
}