let barSize = 18;

let sketch1 = function(p) {
  let cnv;
  let faceImg;
  let fontSample;

  p.preload = function() {
  	faceImg = p.loadImage('face.jpg');
  	fontSample = p.loadFont('Gotham-Medium.otf');
  }

  p.setup = function() {
    cnv = p.createCanvas(640, 360);
    cnv.parent("sketch1")
  };

  p.draw = function() {
    p.background(255);
    p.imageMode(p.CENTER);
    p.image(faceImg, p.width/2, p.height/2, 360, 360);
    p.fill(0);
    p.rectMode(p.CENTER);
    p.rect(p.width/2, 140, barSize*300/18, 50);
    p.fill(255);
    p.textSize(40);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('SAMPLE', p.width/2, 145);
  };
};

let sketch2 = function(p) {
  let cnv;
  let sliderBarSize;
  p.setup = function() {
    cnv = p.createCanvas(640, 50);
    cnv.parent("sketch2");
    //sliderBarSize = p.createSlider(300, 400, 300);
    sliderBarSize = p.createSlider(18, 40, 18);
    sliderBarSize.position(cnv.position().x + 100, cnv.position().y + 10);
  	sliderBarSize.style('width', '400px');
  };

  p.draw = function() {
    p.background(255);
    barSize = sliderBarSize.value();
    sliderBarSize.position(cnv.position().x + 100, cnv.position().y + 10);

  };
};


let sketch3 = function(p) {
  let cnv;
  let video;
	let poseNet;
	let poses = [];

  p.setup = function() {
    cnv = p.createCanvas(640, 480);
    cnv.parent("sketch3")
    p.background(255);
    p.fill(0);
    p.textAlign(p.CENTER, p.CENTER);
    p.text("Loading...", p.width/2, p.height/2);

    video = p.createCapture(p.VIDEO);
	  video.size(p.width, p.height);

	  // Create a new poseNet method with a single detection
	  poseNet = ml5.poseNet(video, modelReady);
	  // This sets up an event that fills the global variable "poses"
	  // with an array every time new poses are detected
	  poseNet.on('pose', function(results) {
	    poses = results;
	  });
	  // Hide the video element, and just show the canvas
	  video.hide();
  };

	function modelReady() {
	  //select('#status').html('Model Loaded');
	}

  p.draw = function() {
    p.imageMode(p.CORNER);
	  p.image(video, 0, 0, p.width, p.height);

	  p.imageMode(p.CENTER);

	  if (poses.length > 0) {
	  	console.log(poses.length);
	  	for(let i=0; i<poses.length; i++){
	  		let pose = poses[i].pose;
	  		let rightEye = pose['rightEye'];
		    //image(rightEyeImage, rightEye.x, rightEye.y, 60, 60);
		    let x1 = rightEye.x;
		    let y1 = rightEye.y;

		    let leftEye = pose['leftEye'];
		    //image(leftEyeImage, leftEye.x, leftEye.y, 60, 60);
		    let x2 = leftEye.x;
		    let y2 = leftEye.y;

		    let xc = (x1 + x2)/2;
		    let yc = (y1 + y2)/2;

		    let theta = p.atan2(y2-y1, x2 - x1);
		    let distance = p.dist(x1, y1, x2, y2);
		    let rmin = 1.8;
		    let rmax = 4;

		    let r = barSize/10

		    //p.stroke(255, 0, 0);
		    p.push();
		    p.translate(xc, yc);
		    p.rotate(theta);
		    p.fill(0);
		    p.noStroke();
		    p.rectMode(p.CENTER);
		    p.rect(0, 0, distance*r, distance/2.5);
		    p.pop();
	  	}

	    



	    //p.line(rightEye.x, rightEye.y, leftEye.x, leftEye.y)

	    
	  }
  };
};


let myp5_skch1 = new p5(sketch1);
let myp5_skch2 = new p5(sketch2);
let myp5_skch3 = new p5(sketch3);
