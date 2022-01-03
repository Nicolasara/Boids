class BoidsModel {
    /**
     * @param {number} width 
     * @param {number} height 
     * @param {number} boidCount 
     */
    constructor(width, height, boidCount) {
        this.width = width;
        this.height = height;
        this.boidCount = boidCount;
        this.boids = this.generateBoids();
        this.speed = 0;
        this.range = 0;
        this.seperationPer = 0;
        this.alginmentPer = 0;
        this.cohesionPer = 0;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    setRange(range) {
        this.range = range;
    }

    setSeperationPer(seperationPer) {
        this.seperationPer = seperationPer;
    }

    setAlignmentPer(alginmentPer) {
        this.alginmentPer = alginmentPer;
    }

    setCohesionPer(cohesionPer) {
        this.cohesionPer = cohesionPer;
    }


    /**
     * @returns {Boid}
     */
    generateBoids() {
        var boids = []
        for (var i = 0; i < this.boidCount; i++) {
            let x = Math.random() * this.width;
            let y = Math.random() * this.height;
            boids[i] = new Boid(x, y, 1, this.width, this.height);
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
        nearbyBoidsInvertedDistance.mult(this.seperationPer / 100);
        boid.position.add(nearbyBoidsInvertedDistance);
    }
    
    /**
     * @param {Boid} boid 
     */
    alignBoids(boid, nearbyBoids) {
        var nearbyBoidsVelocity = createVector(0, 0);
        nearbyBoids.forEach(otherBoid => {
            nearbyBoidsVelocity.add(otherBoid.velocity);
        })
        let angleBetween = boid.velocity.angleBetween(nearbyBoidsVelocity);
        boid.velocity.setHeading(this.alginmentPer / 100 * angleBetween +
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
        boid.velocity.setHeading(this.cohesionPer / 100 * angleBetween +
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
            if (boid.lengthToBoid(otherBoid) < this.range && otherBoid != boid) {
                nearbyBoids.push(otherBoid);
            }
        });
        return nearbyBoids;
    }

    tick() {
        // console.log(this.getBoidsNearby(this.boids[0], 100))
        this.boids.forEach(boid => {
            boid.move();
            boid.velocity.setMag(this.speed);
            let nearbyBoids = this.getBoidsNearby(boid);
            if (nearbyBoids.length == 0) return;
            this.seperation(boid, nearbyBoids);
            this.alignBoids(boid, nearbyBoids);
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