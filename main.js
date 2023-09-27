const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

let screenWidth = (canvas.width = innerWidth);
let screenHeight = (canvas.height = innerHeight);

const particles = [];
const properties = {
    bgColor: "rgb(0,0,0)",
    particlesColor: "red",
    particlesRadius: 2,
    particlesCount: 150,
    particleSpeed: 0.5,
    lineLenght: 200,
    lineWidth: 2,
    particleLife: 6,
};

document.querySelector("body").appendChild(canvas);

window.onresize = () => {
    screenWidth = canvas.width = innerWidth;
    screenHeight = canvas.height = innerHeight;
};

function drawLines() {
    let x1, y1, x2, y2, length, opacity;
    for (const i in particles) {
        for (const j in particles) {
            x1 = particles[i].x;
            y1 = particles[i].y;
            x2 = particles[j].x;
            y2 = particles[j].y;
            length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            if (length < properties.lineLenght) {
                opacity = 1 - length / properties.lineLenght;
                context.strokeStyle = `rgba(255,0,0,${opacity})`;
                context.lineWidth = properties.lineWidth;
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.closePath();
                context.stroke();
            }
        }
    }
}

function drawParticles() {
    for (const i in particles) {
        particles[i].move();
        particles[i].checkLife();
        particles[i].reDraw();
    }
}

function drawBg() {
    context.fillStyle = properties.bgColor;
    context.fillRect(0, 0, screenWidth, screenHeight);
}

function loop() {
    drawBg();
    drawParticles();
    drawLines();
    requestAnimationFrame(loop);
}

function init() {
    for (let i = 0; i < properties.particlesCount; i++) {
        particles.push(
            new Particle(screenWidth, screenHeight, properties, context)
        );
    }
    loop();
}

init();
