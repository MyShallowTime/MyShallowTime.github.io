// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function randomColor() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        // balls[j].color = this.color = randomColor();
        balls[j].velX = -(balls[j].velX);
        balls[j].velY = -(balls[j].velY);
        this.velX = -(this.velX);
        this.velY = -(this.velY);
      }
    }
  }
}

let testBall = new Ball(50, 100, 4, 4, 'blue', 10);
testBall.draw();


let balls = [];
while(balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size
  );
  balls.push(ball);
}

const radius = 50;
const evilCircle = new Ball(
  random(0 + radius, width - radius),
  random(0 + radius, height - radius),
  0,
  0,
  'rgba(255, 255, 255, 1)',
  radius
);
evilCircle.collisionDetect = () => {
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls.slice(j, 1);
        const h2 = document.querySelector('h2');
        h2.innerText = `剩余彩球数: ${balls.length}`;
      }
    }
  }
}

evilCircle.draw();

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  balls.forEach(ball => {
    ball.draw();
    ball.update();
    ball.collisionDetect();
    evilCircle.collisionDetect();
  });

  requestAnimationFrame(loop);
}

loop();
