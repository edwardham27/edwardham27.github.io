var particles = [];
var particleCount = 1;
var canvas;


function Particle(x, y) {
  this.pos = new p5.Vector(x, y);
  this.vel = p5.Vector.random2D();
  this.vel.mult(10);
  this.acc = new p5.Vector(0, 0);
  this.target = new p5.Vector(0, 0);
  this.history = [];
  
  this.baseHue = 200;
  
  this.variation = (20);
  this.speed = (20);
  this.maxSpeed = (20);
  
  this.move = function() {
    this.target.x = mouseX;
    this.target.y = mouseY;
    
    var steer = new p5.Vector(this.target.x, this.target.y);
    steer.sub(this.pos);
    steer.sub(this.vel); // Makes it come to a stop.
    steer.normalize();
    steer.mult(this.speed*this.variation);
    this.acc.add(steer);
    
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    this.history.splice(0, 0, new p5.Vector(this.pos.x, this.pos.y));
    
    var maxHistoryCount = 50;
    if (this.history.length > maxHistoryCount) {
      this.history.splice(maxHistoryCount, 1);
    }
  }
  
  this.display = function() {
    var maxSize = 8;
    
    var hueDif = 50;
    
    for (var i = this.history.length-1; i > 0; i--) {
      strokeWeight(map(i, 0, this.history.length, maxSize, 0));
      var h = map(i, 0, this.history.length, this.baseHue, this.baseHue+hueDif);
      stroke(h, 360, 360);
      
      // Using points performs faster, but lines give a more 'crisp' look.
      line(this.history[i].x, this.history[i].y, this.history[i-1].x, this.history[i-1].y);
    }
    
   
    }
}

function resizeWindowed() {
  resizeCanvas(windowWidth,windowHeight);
}

function setup() {
canvas = createCanvas(windowWidth, windowHeight); 
 canvas.position(0,0);
 canvas.style('z-index', '-2')
  colorMode(HSB, 360);
  
  for (var i = 0; i < particleCount; i++) {
    particles.push(new Particle(random(width/4, width-width/4), 
                                random(height/4, height-height/4)));
  }
  
  // Set default target to the center.
  mouseX = width;
  mouseY = height;
} 



function draw() {
  background(19,48,56);
  
  for (var i = 0; i < particles.length; i++) {
    particles[i].move();
    particles[i].display();
  }
}

