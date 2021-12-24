class BoidsView {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        createCanvas(width, height);
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
}