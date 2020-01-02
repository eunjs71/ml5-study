// Your code will go here
// open up your console - if everything loaded properly you should see 0.3.0
console.log('ml5 version:', ml5.version);

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;
// A variable to hold the image we want to classify
let img;

function preload(){
	classifier = ml5.imageClassifier('MobileNet');
  	img = loadImage('images/bird.jpg');
  	classifier.classify(img, gotResult);
  	image(img, 0, 0);
}

function setup(){
    let cnv = createCanvas(400, 400);
    cnv.parent('sketch_week1')
}

function draw(){
    background(200);
    fill(255, 0, 0);
    noStroke();
    ellipse(mouseX, mouseY, 50, 50);
    
}