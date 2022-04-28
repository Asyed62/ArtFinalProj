// Passing Time
// by Areesha Syed
// created in April, 2022

let moon;
let window1;
let window2;
let chair;
let desk;
let paper;
let books;
let books2;
let lamp;
let clock;
let outside;
let sound;

let min = 0;
let hrs = 6;

let wallColor;
let wallColor2;
let morning;
let night;
let clockFont;

let sunX;
let sunY;
let moonX;
let moonY;

let showStatement = false;

var radius = 150;
var angle = 1;
var speed = 0.1;

function preload() {
  moon = loadImage("moon.png");
  window1 = loadImage("window.png");
  window2 = loadImage("window2.png");
  chair = loadImage("chair.png");
  desk = loadImage("desk.webp");
  paper = loadImage("paper.png");
  books = loadImage("books.png");
  lamp = loadImage("lamp.png");
  clock = loadImage("clock.png")
  books2 = loadImage("bookstack.png");
  sound = loadSound("song.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  wallColor = color("#fffaf0");
  wallColor2 = color("#2F445F");
  morning = color("#82CAFF");
  night = color("#2b2f77");
  sunX = width/2 + radius * cos(angle);
  sunY = height/2 + radius * sin(angle);
  moonX = width/2 + radius * cos(angle + 180);
  moonY = height/2 + radius * sin(angle + 180);
  outside = createGraphics(370, 220);
  clockFont = loadFont("alarm clock.ttf");
}

function draw() {
  let x = map(sunY, 60, 360, 0, 1);
  let wallCol = lerpColor(wallColor, wallColor2, x);
  background(wallCol);
  let outsideCol = lerpColor(morning, night, x);
  
  if (sound.isPlaying() == false) {
    sound.play();
    sound.loop();
  }
  
  drawWalls();
  
  outside.background(outsideCol);
  outside.noStroke();
  
  drawSun();
  drawMoon();
  image(outside, width/2 - 135, height/2 - 180);

  let r = map(sunY, 60, 360, 255, 0);
  let g = map(sunY, 60, 360, 255, 120);
  let b = map(sunY, 60, 360, 255, 190);
  tint(r, g, b);
  
  drawWindow();
  drawClock();
  image(desk, width/2 - 300, height/2 + 60);
  image(chair, width/2 - 100, height/2 + 30, 210, 310);
  drawPaper();
  image(books, width/2 - 160, height/2, 85, 85);
  image(lamp, width/2 - 250, height/2 + 5, 130, 110);
  image(books2, width/2 + 130, height/2 + 160, 140, 120);
  noTint();
  
  if (showStatement) {
    drawStatement();
  }
  
  sunX = 180 + radius * cos(angle);
  sunY = outside.height/2 + 100 + radius * sin(angle);
  
  moonX = 110 + radius * cos(angle + 180);
  moonY = outside.height/2 + 60 + radius * sin(angle + 180);

  angle += speed;
}

function drawWindow() {
  image(window1, width/2 - 150, height/2 - 220, 400, 300);
}

function drawSun() {
  outside.fill("#FFF2AD");
  outside.drawingContext.shadowBlur = 100;
  outside.drawingContext.shadowColor = color("#FFF2AD");
  outside.circle(sunX, sunY, 80);
  outside.drawingContext.shadowBlur = 0;
}

function drawMoon() {
  outside.noStroke();
  outside.fill("#FEFCD7");
  outside.drawingContext.shadowBlur = 100;
  outside.drawingContext.shadowColor = color("#FEFCD7");
  outside.image(moon, moonX, moonY, 130, 100);
  outside.drawingContext.shadowBlur = 0;
}

function drawWalls() {
  stroke(0);
  line(300, height-200, width-200, height-200);
  line(300, 0, 300, height-200);
  line(300, height-200, 0,height);
  
  line(width-200, 0, width-200, height-200);
  line(width-200, height-200, width,height);
}

function drawClock() {
  let c = map(sunY, 60, 360, 175, 250);
  stroke(c);
  noFill();
  rect(340, 60, 170, 50);
  
  if (min<59) {
    min+=0.4;
  } else {
    hrs++;
    min = 0;
  }
  hrs = hrs % 24;
  var mer = hrs + 1 < 12 ? "PM":"AM";
  displayMin = format(min);
  fill(c);
  textSize(40);
  textFont(clockFont);
  textAlign(CENTER);
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = color("white");
  text(hrs%12 + 1 + ":" + displayMin + " " + mer, 420, 100);
  drawingContext.shadowBlur = 0;
}

function format(num) {
  if(int(num) < 10) {
    return "0" + int(num);
  }
  return int(num);
}

function drawPaper() {
  image(paper, width/2 + 240, height/2 + 230, 130, 100);
  stroke("black");
  line(width/2+260, height/2+270, width/2+280, height/2+245);
  line(width/2+265, height/2+275, width/2+285, height/2+250);
  line(width/2+275, height/2+278, width/2+295, height/2+253);
  line(width/2+285, height/2+278, width/2+305, height/2+253);
  line(width/2+293, height/2+279, width/2+313, height/2+254);
}

function mousePressed() {
  if (mouseX>(width/2 + 240) && mouseX < (width/2+370) && mouseY < (height/2+330) && mouseY > (height/2+230) && !showStatement) {
    showStatement = true;
  }
  if (mouseX > 985 && mouseX < 1030 && mouseY > 35 && mouseY < 65 && showStatement) {
    showStatement = false;
  }
}

function drawStatement() {
  fill("white");
  stroke("black");
  rect(400, 30, width/2-60, height/2+290);
  textSize(25);
  textAlign(CENTER);
  textFont('Georgia');
  fill("black");
  text("Passing Time\n", 720, 95);
  stroke("red");
  fill("red");
  text("X", 1000, 65);
  fill("black");
  stroke("black");
  textSize(20);
  text("I've chosen to name this piece 'Passing Time'.\n", 720, 150);
  text("I wanted to try and capture a familiar feeling/experience\n", 720, 190);
  text("that I'm sure everyone, including myself, has gone through\n", 720, 230);
  text("which is sitting in your room all day watching time pass by \n", 720, 270);
  text("without even realizing how fast the day has gone by.", 720, 310);
  text("I portrayed this by using images/shapes to draw a room", 720, 350);
  text("and a window in which the sun and moon repeatedly rotate.", 720, 390);
  text("I also drew a digital clock to further emphasize the way", 720, 430);
  text("in which time flies without us realizing it.", 720, 470);
  text("I primarily drew inspiration  from the thumbnails", 720, 510);
  text("of the 'lofi hip hop' videos on youtube,", 720, 550);
  text("as well as 'study room day' by Ana Rocha.", 720, 590);
  text("- Areesha Syed (2022)", 720, 640);   
}


