let img;
let g;
let a = 0;
let radius; // 圆的半径
let index = 0;
let a2 = 30;
let col;

function setup() {
  createCanvas(500, 500);
  img = loadImage("img.jpg");
  radius = width * 0.3;
  let col1 =color(248, 246, 244) ;
  let col2 = color(227, 244, 244);
  let col3 = color(20, 201, 70);
  col = [col1, col2, col3];
  angleMode(DEGREES);

  // g = createGraphics(500, 500);

  // console.log(img.width,img.height)
}

function draw() {
  // background(220);
  a += 0.4;
  a2 += map(mouseX,0,width,0.2,1);
  // g.image(img, 0, 0, 500, 500);
  // let d = g.pixelDensity();
  // let halfImage = 4 * (g.width * d) * (g.height * d);
  // loadPixels();
  let centerX = width / 2; // 图片中心点的x坐标
  let centerY = height / 2; // 图片中心点的y坐标
  if (a % 30 == 0) {
    index += 1;
  }
     let ctx = drawingContext;
const gradient = ctx.createRadialGradient(width/2, height/2,20,width/2, height/2,radius);

// Add five color stops
  gradient.addColorStop(0, "pink");
gradient.addColorStop(0.5*noise(frameCount*0.004), "white");
  gradient.addColorStop(0.7*noise(frameCount*0.007), "lightgray");
   gradient.addColorStop(0.8, "lightyellow");
  gradient.addColorStop(0.9*noise(frameCount*0.007), "white");
gradient.addColorStop(1, "lightblue");

  for (let i = 0; i < radius*1; i+=0.1) {
    let x = int(centerX + i * cos(a2));
    let y = int(centerY + i * sin(a2));
    // let colorStart = color(255*noise(i*0.5+frameCount*0.1), 100, 220); // 计算当前像素在渐变中的位置
    // let colorEnd = color(255*(1-noise(i*0.5+frameCount*0.1*noise(frameCount*0.1))), 200, 150);
    // let t = map(i, 0, radius, 0, 1);

      ctx.fillStyle = gradient;

noStroke()
    circle(x,y,2)
  }
  if(random()<0.01){
    index+=1
    
  }
  for (let i = 0; i < radius * 0.5; i += 0.01) {
    let x = int(centerX + i * cos(a));
    let y = int(centerY + i * sin(a));
    // console.log(i)
  
    if (i<15) {
       stroke(col[index%3]);
    }else if(i<30){
      stroke(col[(index+1)%3]);
    }else if (i<45){
      stroke(col[(index+2)%3]);
    }else if (i<70){
       stroke(col[(index+4)%3]);
    }
    // console.log(index)
    
    
    point(x, y);
  }
  for (let i = radius * 0.5; i < radius * 0.8; i += 0.2) {
    let x = int(centerX + i * cos(a));
    let y = int(centerY + i * sin(a));
    let colorStart = color(249, 251, 231); // 计算当前像素在渐变中的位置
    let colorEnd = color(254, 161, 161);
    let t = map(i, radius * 0.4, radius * 0.6, 0, 1);
    let lerpedColor = lerpColor(
      colorStart,
      colorEnd,
      t + 0.3 * noise(frameCount * 0.01)
    ); // 生成渐变色
    // let radColor = color(100,220,(frameCount*0.1+i*4+12*noise(0.1*frameCount))%255)
    strokeWeight(2)
    stroke(lerpedColor);
    point(x, y);
  }
  for (let i = radius * 0.8; i <= radius; i++) {
    let x = int(centerX + i * cos(a));
    let y = int(centerY + i * sin(a));
    let pixelColor = img.get(x, y); // 获取当前像素的颜色
    // print(pixelColor)
    stroke(pixelColor);
    point(x, y);
  }
  

}

  
 

