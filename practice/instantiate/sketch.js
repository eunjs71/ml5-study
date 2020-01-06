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
  let txt_barSize;
  let txt_sticker;

  let btn_title;
  let title_on = false;
  let img_title;

  let btn_leg;
  let leg_on = false;
  let img_leg;
  
  let btn_happy;
  let happy_on = false;
  let img_happy;

  let mv_imgs=[];
  let mv_img;
  let img_edge;

  let poseNet;
	let poses = [];

	let btn_change_img;

  p.preload = function(){
	let sampleNum = parseInt(p.random(7));
  	mv_img = p.loadImage('mv_sample' + sampleNum + '.jpg', imageReady);
  	img_edge = p.loadImage('edge.png');
  	img_title = p.loadImage('parasite_title.png');
  	img_leg = p.loadImage('leg.png');
  }

	function imageReady(){
	    let options = {
	        imageScaleFactor: 1,
	        minConfidence: 0.1
	    }
	    poseNet = ml5.poseNet(modelReady, options);
	    poseNet.on('pose', function (results) {
	        poses = results;
	    });
	}

	function modelReady() {
	    poseNet.multiPose(mv_img)
	    console.log("Model Ready.")
	}

	function sampleImageChange(){
		poses = [];
		let sampleNum = parseInt(p.random(7));
  	mv_img = p.loadImage('mv_sample' + sampleNum + '.jpg', imageReady);
  }



  p.setup = function() {
    cnv = p.createCanvas(640, 360);
    cnv.parent("sketch2");
    //sliderBarSize = p.createSlider(300, 400, 300);
    sliderBarSize = p.createSlider(18, 40, 18);
    sliderBarSize.position(cnv.position().x + 375, cnv.position().y + 32);
  	sliderBarSize.style('width', '200px');

  	//fontGotham = p.loadFont('Gotham-Light.otf');
  	//p.textFont(fontGotham)
  	txt_barSize = p.createP('BAR SIZE: ' + barSize);
  	txt_barSize.position(cnv.position().x + 375, cnv.position().y + 30);
  	txt_sticker = p.createP('STICKERS');
  	txt_sticker.position(cnv.position().x + 375, cnv.position().y + 70);

  	btn_title = p.createButton('TITLE');
  	btn_title.position(cnv.position().x + 375, cnv.position().y + 70);
  	btn_title.style('boader', '1px white');
  	btn_title.style('background-color', 'black');
  	btn_title.mousePressed(btnTitleSticker);

  	btn_leg = p.createButton('LEG');
  	btn_leg.position(cnv.position().x + 440, cnv.position().y + 70);
  	btn_leg.style('boader', '1px white');
  	btn_leg.style('background-color', 'black');
  	btn_leg.mousePressed(btnLegSticker);

  	btn_happy = p.createButton('HAPPY');
  	btn_happy.position(cnv.position().x + 492, cnv.position().y + 70);
  	btn_happy.style('boader', '1px white');
  	btn_happy.style('background-color', 'black');
  	btn_happy.mousePressed(btnHappySticker);

  	btn_change_img = p.createButton('CHANGE SAMPLE');
  	btn_change_img.position(cnv.position().x + 492, cnv.position().y + 70);
  	btn_change_img.style('boader', '1px white');
  	btn_change_img.style('background-color', 'black');
  	btn_change_img.mousePressed(sampleImageChange);


  };

  p.draw = function() {
    p.background(0);
    p.fill(0);
    p.stroke(255);
    p.rect(0, 0, p.width, p.height, 6);

    //p.rect(30, 30, 360, 300, 6);
    p.image(mv_img, 30, 30, 360, 300);
    

    barSize = sliderBarSize.value();
    sliderBarSize.position(cnv.position().x + 375+40, cnv.position().y + 240);
    
    txt_barSize.html('BAR SIZE: ' + barSize);
    txt_barSize.position(cnv.position().x + 375+40, cnv.position().y + 210);

    txt_sticker.position(cnv.position().x + 375+40, cnv.position().y + 270);
	
	btn_title.position(cnv.position().x + 375+40, cnv.position().y + 300);
	btn_leg.position(cnv.position().x + 440+40, cnv.position().y + 300);
	btn_happy.position(cnv.position().x + 492+40, cnv.position().y + 300);

  	btn_change_img.position(cnv.position().x + 375 + 40, cnv.position().y + 170);



	  if (poses.length > 0) {
	  	//console.log(poses.length);
	  	for(let i=0; i<poses.length; i++){
	  		let pose = poses[i].pose;
	  		let rightEye = pose['rightEye'];
		    //image(rightEyeImage, rightEye.x, rightEye.y, 60, 60);
		    let x1 = rightEye.x + 30;
		    let y1 = rightEye.y + 30;

		    let leftEye = pose['leftEye'];
		    //image(leftEyeImage, leftEye.x, leftEye.y, 60, 60);
		    let x2 = leftEye.x + 30;
		    let y2 = leftEye.y + 30;

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
		    p.fill(255);
		    p.textAlign(p.CENTER, p.CENTER);
		    p.textSize(distance/4);
		    p.text('SAMPLE', 0, 0);
		    p.pop();
	  	}
	  }

	  if(leg_on){
	  	p.image(img_leg, 0 + 30, 230 + 30, 98, 43);
	  }


	  if(title_on){
	  	p.image(img_title, 39 + 30, 180 + 30, 282, 60);
	  }

	  p.image(img_edge, 30, 30, 360, 300);


  };

  function btnTitleSticker(){
  	title_on = !title_on;
  	if(title_on){
  		btn_title.style('boader', '1px black');
  		btn_title.style('background-color', 'white');
  		btn_title.style('color', 'black');
  	}else{
  		btn_title.style('boader', '1px white');
  		btn_title.style('background-color', 'black');
  		btn_title.style('color', 'white');
  	}
  }

  function btnLegSticker(){
  	leg_on = !leg_on;
  	if(leg_on){
  		btn_leg.style('boader', '1px black');
  		btn_leg.style('background-color', 'white');
  		btn_leg.style('color', 'black');
  	}else{
  		btn_leg.style('boader', '1px white');
  		btn_leg.style('background-color', 'black');
  		btn_leg.style('color', 'white');
  	}
  }

  function btnHappySticker(){
  	happy_on = !happy_on;
  	if(happy_on){
  		btn_happy.style('boader', '1px black');
  		btn_happy.style('background-color', 'white');
  		btn_happy.style('color', 'black');
  	}else{
  		btn_happy.style('boader', '1px white');
  		btn_happy.style('background-color', 'black');
  		btn_happy.style('color', 'white');
  	}
  }

};


let sketch3 = function(p) {
  let cnv;
  let video;
	let poseNet;
	let poses = [];

	let img_edge;

	p.preload = function(){
		img_edge = p.loadImage('edge.png');
	}

  p.setup = function() {
    cnv = p.createCanvas(640, 800);
    cnv.parent("sketch3")
    p.background(0);
    p.fill(200);
    p.textAlign(p.CENTER, p.CENTER);
    p.text("LOADING...", p.width/2, p.height/2);

    video = p.createCapture(p.VIDEO);
    	let vHeight = p.height;
    	let vWidth = video.width / video.height * p.height;
	  video.size(vWidth, p.height);
	  //video.size(vWidth, vHeight);

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
    p.imageMode(p.CENTER);
    	//console.log(video.width);
    	//console.log(video.height);
    	//let vWidth = video.width / video.height * p.height;
    	let vWidth = video.width;
	  p.image(video, p.width/2, p.height/2, vWidth, p.height);
	  //p.image(video, p.width/2, p.height/2);

	  p.imageMode(p.CENTER);

	  if (poses.length > 0) {
	  	console.log(poses.length);
	  	for(let i=0; i<poses.length; i++){
	  		let pose = poses[i].pose;
	  		let rightEye = pose['rightEye'];
		    //image(rightEyeImage, rightEye.x, rightEye.y, 60, 60);
		    //let x1 = rightEye.x;
		    let x1 = rightEye.x - (vWidth-p.width)/2;
		    let y1 = rightEye.y;

		    let leftEye = pose['leftEye'];
		    //image(leftEyeImage, leftEye.x, leftEye.y, 60, 60);
		    //let x2 = leftEye.x;
		    let x2 = leftEye.x - (vWidth-p.width)/2;
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

	    
	  }
	  p.imageMode(CORNER);
	  p.image(img_edge, 0, 0, p.width, p.height);
  };
};


//let myp5_skch1 = new p5(sketch1);
let myp5_skch2 = new p5(sketch2);
let myp5_skch3 = new p5(sketch3);
