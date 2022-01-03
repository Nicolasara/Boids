class BoidsController {
    constructor(model) {
        this.model = model;
    }

    tick() {
        this.view.drawBoids(this.model.getBoids());
        this.model.tick();
    }
    
    setView(view) {
        this.view = view;
        view.setParameters(this);
    }

    setSpeed(speed) { this.model.setSpeed(speed); }

    setRange(range) { this.model.setRange(range); }

    setCohesionPer(cohesionPer) { this.model.setCohesionPer(cohesionPer); }

    setSeperationPer(seperationPer) { this.model.setSeperationPer(seperationPer); }

    setAlignmentPer(alignmentPer) {this.model.setAlignmentPer(alignmentPer); }
}