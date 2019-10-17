var img;
function preload() {
img = loadImage("image.png");
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(204);
  
  fill(0, 255, 0, 75);
  ellipse(250,250,250,250);
  
  fill(255, 0, 0, 100);
  rect(160,30,260,20);
  
  image(img, 0, 0);
}