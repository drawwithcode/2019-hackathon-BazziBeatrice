var song;
var img;
var analyzer;

var spiral;

//spirale
var angle = 0;
var r = 10;
var spin = 0.1;
var grow = spin * 5;

function preload(){
  song = loadSound("/assets/TG1_bumper.mp3");
  img = loadImage("./assets/tg1.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight)

  background(0);
  //song
  analyzer = new p5.Amplitude();
  analyzer.setInput(song);

  // funzione 1 da webcam
spiral = new Spiral(300, 150, 150);
}

function draw() {


  // variable containing the loaded image, x, y, [width, height]
  // img(image, 0, 0, windowWidth, windowHeight);

  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height);
  console.log("amplitude:" + analyzer.getLevel());
  console.log("var volume:" + volume);


  //funzione webcam
  spiral.move();
  spiral.display();
  for (var i = 0; i < windowWidth; i++) {
  spiralTre = new Spiral(i, 640, 480);
  }
}


  // ellipse(width / 2, height / 2, volume);
  function Spiral(_x, _y, _diameter) {
    this.x = _x;
    this.y = _y;
    this.size = _diameter;
    // this.color = 'blue';

    this.start = 10;
    this.angle = 90;
    this.speed = 0.1;
    this.distance = this.speed * 2;

    this.move = function() {
      this.x = cos(-this.angle) * this.start; //crea una spirale - tunnel
      this.y = sin(-this.angle) * this.start;
      this.angle -= this.speed;
      // this.angle -= this.speed * volume;
      this.start = this.start - this.distance;
    }

    this.display = function() {

      // translate(width / 2, (height / 2) + volume/10);
      translate(width / 2, (height / 2));
      imageMode(CENTER);
      rotate((frameCount) * (volume/10));
      // rotate((frameCount)/5 );

      if (keyIsPressed === true) {
        this.angle -= this.speed / 100
        this.start = random(-100, 100) /volume;
      } else {
        this.angle -= this.speed;
        this.start = this.start - this.distance;
      }
      image(img, this.x, this.y, img.width/7, img.height/7);
    }
  }



function touchStarted() {
  getAudioContext().resume()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


//mouse imput song riparte-- DA FARE

// song
console.log("ok");
function mousePressed() {
  if (!song.isPlaying()) {
    song.play();
  } else {
    song.pause();
  }}
