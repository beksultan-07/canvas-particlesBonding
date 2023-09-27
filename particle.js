class Particle {
    constructor(screenWidth, screenHeight, properties, context) {
        this.context = context;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.properties = properties;

        this.x = Math.random() * screenWidth;
        this.y = Math.random() * screenHeight;

        this.nextX =
            Math.random() * (properties.particleSpeed * 2) -
            properties.particleSpeed;
        this.nextY =
            Math.random() * (properties.particleSpeed * 2) -
            properties.particleSpeed;

        this.life = Math.random() * this.properties.particleLife * 60;
    }

    move() {
        if (this.x + this.nextX > this.screenWidth || this.x + this.nextX < 0) {
            this.nextX *= -1;
        }
        if (
            this.y + this.nextY > this.screenHeight ||
            this.y + this.nextY < 0
        ) {
            this.nextY *= -1;
        }
        this.x += this.nextX;
        this.y += this.nextY;
    }

    reDraw() {
        this.context.beginPath();
        this.context.arc(
            this.x,
            this.y,
            this.properties.particlesRadius,
            0,
            Math.PI * 2
        );
        this.context.fill();
        this.context.fillStyle = this.properties.particlesColor;
        this.context.closePath();
    }

    checkLife() {
        if (this.life <= 0) {
            this.x = Math.random() * this.screenWidth;
            this.y = Math.random() * this.screenHeight;
            this.nextX =
                Math.random() * (this.properties.particleSpeed * 2) -
                this.properties.particleSpeed;
            this.nextY =
                Math.random() * (this.properties.particleSpeed * 2) -
                this.properties.particleSpeed;
            this.life = Math.random() * this.properties.particleLife * 60;
        }
        this.life--;
    }
}
