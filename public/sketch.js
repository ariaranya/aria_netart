document.body.style.margin   = 0
document.body.style.overflow = `hidden`



let img; // Variable to store an image
let img2; // Variable to store an image
let a = 0; // Angle variable
let radius; // Variable to store the radius of the gradient
let index = 0; // Index variable
let a2 = 30; // Angle variable
let col = []; // Array to store colors

let isMousePressed = false; // Boolean variable to track mouse press
let bgMusic; // Variable to store background music
let isMusicPlaying = false; // Boolean variable to track if music is playing

function preload() {
  bgMusic = loadSound("bg_music.mp3"); // Preload the background music
}

// loops, after setup has run
function setup() {
  createCanvas(600, 600); // Creates a canvas with a size of 600x600 pixels
  img = loadImage("img.jpg"); // Load an image

  radius = width * 0.35; // Set the radius based on canvas width

  // Define colors
  let col1 = color(255, 242, 197);
  let col2 = color(252, 232, 225);
  let col3 = color(197, 210, 23, 50);
  col = [col1, col2, col3]; // Store colors in an array

  angleMode(DEGREES); // Set angle mode to degrees

  // Play background music
  bgMusic.loop();
  bgMusic.stop(); // Stop the music initially
}

// loops, after setup has run
function draw() {
  if (isMousePressed) {
    a -= 0.4; // Decrease angle by 0.4 if mouse is pressed
              // a = a-0.4

    if (isMusicPlaying) {
      bgMusic.pause(); // Pause the music if mouse is pressed
      isMusicPlaying = false;
    }
  } else {
    a += 0.4; // Increase angle by 0.4 if mouse is not pressed
              // a = a+0.4

    if (!isMusicPlaying) {
      bgMusic.loop(); // Continue playing the music if not already playing
      isMusicPlaying = true;
    }
  }

  a2 += map(mouseX, 0, width, 0.2, 1); // Map mouse position to change a2 angle

  let centerX = width / 2; // Calculate center X coordinate
  let centerY = height / 2; // Calculate center Y coordinate
  

  // The if statement checks if the value of a is divisible by 30 without a remainder (a % 30 === 0).
  if (a % 30 === 0) {
    index += 1; // Increment index every 30 degrees
                // index = index + 1
  }

  let ctx = drawingContext; // Get the drawing context of the canvas
  const gradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    20,
    width / 2,
    height / 2,
    radius
  ); // Create a radial gradient

  // Define gradient colors using noise and mathematical expressions
  gradient.addColorStop(0, "#B9BEDE");
  gradient.addColorStop(0.5 * noise(frameCount * 0.004), "white");
  gradient.addColorStop(0.56 * noise(frameCount * 0.007), "#F2E3E4");
  gradient.addColorStop(0.7 * noise(frameCount * 0.009), "#E3D2D4");
  gradient.addColorStop(0.8, "#E0C3C3");
  gradient.addColorStop(0.9 * noise(frameCount * 0.008), "#D8E2F1");
  gradient.addColorStop(0.9 * noise(frameCount * 0.01), "#FFE364");
  gradient.addColorStop(0.9, "#E2D1E2");
  gradient.addColorStop(1, "#F8F6F4");


  // The for loop 
  for (let i = 0; i < radius * 1; i += 0.1) {
    let x = int(centerX + i * cos(a2)); // Calculate X coordinate based on angle and radius
    let y = int(centerY + i * sin(a2)); // Calculate Y coordinate based on angle and radius

    ctx.fillStyle = gradient; // Set fill style to the defined gradient
    noStroke(); // Disable stroke
    circle(x, y, 2); // Draw a small circle at (x, y) with a diameter of 2
  }

  if (random() < 0.01) {
    index += 1; // Increment index randomly
  }

  for (let i = 0; i < radius * 0.5; i += 0.01) {
    let x = int(centerX + i * cos(a)); // Calculate X coordinate based on angle and radius
    let y = int(centerY + i * sin(a)); // Calculate Y coordinate based on angle and radius

    if (i < 15) {
      stroke(col[index % 3]); // Set stroke color based on index
    } else if (i < 30) {
      stroke(col[(index + 1) % 3]); // Set stroke color based on index
    } else if (i < 45) {
      stroke(col[(index + 2) % 3]); // Set stroke color based on index
    } else if (i < 70) {
      stroke(col[(index + 4) % 3]); // Set stroke color based on index
    }

    point(x, y); // Draw a point at (x, y)
  }


  //The for loop 
  for (let i = radius * 0.5; i < radius * 0.8; i += 0.2) {
    let x = int(centerX + i * cos(a)); // Calculate X coordinate based on angle and radius
    let y = int(centerY + i * sin(a)); // Calculate Y coordinate based on angle and radius
    let colorStart = color(224, 195, 195, 80); // Define start color
    let colorEnd = color(247, 236, 240); // Define end color
    let t = map(i, radius * 0.7, radius * 0.3, 0, 1); // Map t value based on radius

    // Generate a lerped color with noise and mathematical expressions
    let lerpedColor = lerpColor(
      colorStart,
      colorEnd,
      t + 0.3 * noise(frameCount * 0.001)
    );

    strokeWeight(2); // Set stroke weight to 2 pixels
    stroke(lerpedColor); // Set stroke color to the lerped color
    point(x, y); // Draw a point at (x, y)
  }


  // The for loop 
  for (let i = radius * 0.8; i <= radius; i++) {
    let x = int(centerX + i * cos(a)); // Calculate X coordinate based on angle and radius
    let y = int(centerY + i * sin(a)); // Calculate Y coordinate based on angle and radius
    let pixelColor = img.get(x, y); // Get the color of the pixel from the image
    stroke(pixelColor); // Set stroke color to the pixel color
    point(x, y); // Draw a point at (x, y)
  }
}

function mousePressed() {
  isMousePressed = true; // Set isMousePressed to true when the mouse is pressed
}

function mouseReleased() {
  isMousePressed = false; // Set isMousePressed to false when the mouse is released
}
