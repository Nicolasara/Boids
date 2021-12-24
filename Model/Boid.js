class Boid {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} speed 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(x, y, speed, width, height) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D().setMag(speed);
        this.width = width;
        this.height = height;
    }

    accelerate(force) {
        this.velocity.add(force)
    }

    move() {
        this.position.add(this.velocity);
        this.checkPosition();
    }

    checkPosition() {
        var x = this.position.x;
        var y = this.position.y;
        if (0 > x) {
            x += this.width;
        } else if (this.width < x) {
            x -= this.width;
        }

        if (0 > y) {
            y += this.height;
        } else if (this.height < y) {
            y -= this.height;
        }

        this.position = createVector(x, y);
    }

    /**
     * @param {Boid} other 
     */
    lengthToBoid(other) {
        return this.position.dist(other.position)
    }
}