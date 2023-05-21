let img;
let a = 0;
let radius;
let index = 0;
let a2 = 30;
let col = [];

let isMousePressed = false;
let scaleFactor = 0.5; // 缩放因子

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("img.jpg");
  radius = min(width, height) * 0.35 * scaleFactor; // 调整半径大小
  let col1 = color(255, 242, 197);
  let col2 = color(252, 232, 225);
  let col3 = color(197, 210, 23, 50);
  col = [col1, col2, col3];
  angleMode(DEGREES);
}

function draw() {
  if (isMousePressed) {
    a -= 0.4; // 逆时针旋转
  } else {
    a += 0.4; // 顺时针旋转
  }

  a2 += map(mouseX, 0, width, 0.2, 1);

  let centerX = width / 2;
  let centerY = height / 2;

  if (a % 30 === 0) {
    index += 1;
  }

  let ctx = drawingContext;
  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    20,
    centerX,
    centerY,
    radius
  );
  gradient.addColorStop(0, "#B9BEDE");
  gradient.addColorStop(0.5 * noise(frameCount * 0.004), "white");
  gradient.addColorStop(0.56 * noise(frameCount * 0.007), "#F2E3E4");
  gradient.addColorStop(0.7 * noise(frameCount * 0.009), "#E3D2D4");
  gradient.addColorStop(0.8, "#E0C3C3");
  gradient.addColorStop(0.9 * noise(frameCount * 0.008), "#D8E2F1");
  gradient.addColorStop(0.9 * noise(frameCount * 0.01), "#FFE364");
  gradient.addColorStop(0.9, "#E2D1E2");
  gradient.addColorStop(1, "#F8F6F4");

  push(); // 保存当前绘图环境

  translate(width / 2, height / 2); // 将坐标原点移到屏幕中心
  scale(scaleFactor); // 缩放图形

  for (let i = 0; i < radius * 1; i += 0.1) {
    let x = int(centerX + i * cos(a2));
    let y = int(centerY + i * sin(a2));

    ctx.fillStyle = gradient;
    noStroke();
    circle(x, y, 2);
  }

  if (random() < 0.01) {
    index += 1;
  }

  for (let i = 0; i < radius * 0.5; i += 0.01) {
    let x = int(centerX + i * cos(a));
    let y = int(centerY + i * sin(a));

    if (i < 15) {
      stroke(col[index % 3]);
    } else if (i < 30) {
      stroke(col[(index + 1) % 3]);
    } else if (i < 45) {
      stroke(col[(index + 2) % 3]);
    } else if (i < 70) {
      stroke(col[(index + 4) % 3]);
    }

    point(x, y);
  }

  for (let i = radius * 0.5; i < radius * 0.8; i += 0.2) {
    let x = int(centerX + i * cos(a));
    let y = int(centerY + i * sin(a));
    let colorStart = color(224, 195, 195, 80);
    let colorEnd = color(247, 236, 240);
    let t = map(i, radius * 0.7, radius * 0.3, 0, 1);
    let lerpedColor = lerpColor(
      colorStart,
      colorEnd,
      t + 0.3 * noise(frameCount * 0.001)
    );
    strokeWeight(2);
    stroke(lerpedColor);
    point(x, y);
  }

  for (let i = radius * 0.8; i <= radius; i++) {
    let x = int(centerX + i * cos(a));
    let y = int(centerY + i * sin(a));
    let pixelColor = img.get(x, y);
    stroke(pixelColor);
    point(x, y);
  }

  pop(); // 恢复之前保存的绘图环境
}

function mousePressed() {
  isMousePressed = true;
}

function mouseReleased() {
  isMousePressed = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  radius = min(width, height) * 0.35 * scaleFactor; // 调整半径大小
}