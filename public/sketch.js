let x =200
let y = 200;


function setup() {
  createCanvas(700, 700);
  angleMode(DEGREES);
  background(0);
  noLoop();
  
}

function draw() {
  

  
  background(80,130,200);

  
  
  //trails
  translate(width/2,height/2+300);
  branch(100);
  
 
}

function branch(len){
 
  push();
  if(len>10){
    strokeWeight(map(len,10,100,1,15));
    stroke(80,40,30);
    line(0,0,0,-len);
    translate(0,-len);
    rotate(random(-20,-30));
    branch(len*random(0.7,0.9));
    rotate(random(50,60));
    branch(len*random(0.7,0.9));
  }else{
    var r = 220 + random(-20,20);
    var g = 120 + random(-20,20);
    var b = 80 + random(-20,20);
    fill(r,g,b,150);
    noStroke();
   
    
  //create leaves and need loop
    beginShape();
    for(var i =45; i<135; i++){
    var rad =15;
    var x = rad*cos(i)
    var y = rad*sin(i);
    vertex(x,y);
  } // half opposite direction
    for(var i = 135; i>40; i--) {
    var rad =15;
    var x = rad*cos(i);
    var y = rad*sin(-i)+20;
    vertex(x,y);
  }
  endShape(CLOSE);
  }
  
  pop();


  
 

}

  
 

