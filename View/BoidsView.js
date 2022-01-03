class BoidsView {
    constructor() {
        let slidersContainer = createDiv();
        slidersContainer.id("sliders");
        slidersContainer.parent("container")
        let centeredSlidersContainer = createDiv();
        centeredSlidersContainer.id("centered-slider");
        centeredSlidersContainer.parent("sliders")
    }
    
    /**
     * draws each boid
     * 
     * @param {Array<Boid>} boids 
     */
    drawBoids(boids) {
        let firstBoid = boids[0];
        fill(255,0,0);
        circle(firstBoid.position.x, firstBoid.position.y, 30);
        fill(255,255,255);
        boids.slice(1,100).forEach(boid => {
            this.drawBoid(boid.position.x, boid.position.y, boid.velocity.heading())
        });
    }

    // draws a isosceles triangle given its center of mass position and angle in radians
    drawBoid(x, y, angle) {
        const SIZE = 30; // the height of the triangle 10
        // triangle(x + (8 * SIZE / 3) * Math.cos(angle), 
        //          y - (8 * SIZE / 3) * Math.sin(angle),
        //          x + (2 * SIZE / Math.sqrt(3)) * Math.cos(angle - Math.PI * 2 / 3), 
        //          y - (2 * SIZE / Math.sqrt(3)) * Math.sin(angle - Math.PI * 2 / 3),
        //          x + (2 * SIZE / Math.sqrt(3)) * Math.cos(angle + Math.PI * 2 / 3), 
        //          y - (2 * SIZE / Math.sqrt(3)) * Math.sin(angle + Math.PI * 2 / 3));
        circle(x, y, SIZE)
    }

    setParameters(controller) {
        let sliders = [];
        sliders.push(new Slider(1, 20, 10, "speed", 
            (speed) => controller.setSpeed(speed)));
        sliders.push(new Slider(0, 300, 175, "range", 
            (range) => controller.setRange(range)));
        sliders.push(new Slider(0, 100, 75, "seperation", 
            (seperationPer) => controller.setSeperationPer(seperationPer)));
        sliders.push(new Slider(0, 100, 5, "alignment", 
            (alignmentPer) => controller.setAlignmentPer(alignmentPer)));
        sliders.push(new Slider(0, 100, 10, "cohesion", 
            (cohesionPer) => controller.setCohesionPer(cohesionPer)));
        sliders.forEach(slider => {
            let sliderContainer = createDiv();
            sliderContainer.class("slider-container");
            sliderContainer.parent("centered-slider")
            slider.create(sliderContainer);
            slider.updateParameter();
        });
    }
}