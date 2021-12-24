class BoidsModel {
    /**
     * @param {number} width 
     * @param {number} height 
     * @param {number} boidCount 
     */
    constructor(width, height, boidCount) {
        this.SPEED = 10;
        this.DISCOVER_RANGE = 175;
        this.SEPERATION_PERCENTAGE = .7;
        this.ALIGNMENT_PERCENTAGE = .075;
        this.COHESION_PERCENTAGE = .045;
        this.width = width;
        this.height = height;
        this.boidCount = boidCount;
        this.boids = this.generateBoids();
    }

    /**
     * @returns {Boid}
     */
    generateBoids() {
        var boids = []
        for (var i = 0; i < this.boidCount; i++) {
            let x = Math.random() * this.width;
            let y = Math.random() * this.height;
            boids[i] = new Boid(x, y, this.SPEED, this.width, this.height);
        }
        return boids;
    }

    /**
     * @param {Boid} boid 
     */
    seperation(boid, nearbyBoids) {
        var nearbyBoidsInvertedDistance = createVector(0, 0);
        nearbyBoids.forEach(otherBoid => {
            let boidPosition = createVector(boid.position.x, boid.position.y);
            let directionOtherBoidToBoid = boidPosition.sub(otherBoid.position);
            let magnitude = 80 / (8 + directionOtherBoidToBoid.mag());
            directionOtherBoidToBoid.setMag(magnitude);
            nearbyBoidsInvertedDistance.add(directionOtherBoidToBoid);
        });
        nearbyBoidsInvertedDistance.mult(this.SEPERATION_PERCENTAGE);
        boid.position.add(nearbyBoidsInvertedDistance);
    }
    
    /**
     * @param {Boid} boid 
     */
    allignBoids(boid, nearbyBoids) {
        var nearbyBoidsVelocity = createVector(0, 0);
        nearbyBoids.forEach(otherBoid => {
            nearbyBoidsVelocity.add(otherBoid.velocity);
        })
        let angleBetween = boid.velocity.angleBetween(nearbyBoidsVelocity);
        boid.velocity.setHeading(this.ALIGNMENT_PERCENTAGE * angleBetween +
             boid.velocity.heading());
    }

    /**
     * @param {Boid} boid 
     */
    cohesion(boid, nearbyBoids) {
        var nearbyBoidsPosition = createVector(0, 0);
        nearbyBoids.forEach(otherBoid => {
            nearbyBoidsPosition.add(otherBoid.position);
        })
        nearbyBoidsPosition.div(nearbyBoids.length);
        nearbyBoidsPosition.sub(boid.position)
        let angleBetween = boid.velocity.angleBetween(nearbyBoidsPosition);
        boid.velocity.setHeading(this.COHESION_PERCENTAGE * angleBetween +
             boid.velocity.heading());
    }

    /**
     * @param {Boid} boid 
     * @param {number} angle 
     * @returns {Array<Boid>}
     */
    getBoidsNearby(boid) {
        var nearbyBoids = []
        this.boids.forEach(otherBoid => {
            if (boid.lengthToBoid(otherBoid) < this.DISCOVER_RANGE && otherBoid != boid) {
                nearbyBoids.push(otherBoid);
            }
        });
        return nearbyBoids;
    }

    tick() {
        // console.log(this.getBoidsNearby(this.boids[0], 100))
        this.boids.forEach(boid => {
            boid.move();
            let nearbyBoids = this.getBoidsNearby(boid);
            if (nearbyBoids.length == 0) return;
            this.seperation(boid, nearbyBoids);
            this.allignBoids(boid, nearbyBoids);
            this.cohesion(boid, nearbyBoids);
        });
    }

    /**
     * @returns {Array<Boid>}
     */
    getBoids() {
        return this.boids;
    }

    updateSize(width, height) {
        this.width = width;
        this.height = height;
        this.boids.forEach(boid => {
            boid.updateSize(width, height);
        })
    }
}