// Your code will go here
// open up your console - if everything loaded properly you should see 0.3.0
console.log('ml5 version:', ml5.version);

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;
// A variable to hold the image we want to classify
//let img;
let video;
let resultsP;

function setup(){
    //createCanvas(400, 400);
    noCanvas();
    video = createCapture(VIDEO);
    video.parent('sketch_week1');

    resultsP = createP('Loading model and video...');
    resultsP.parent('sketch_week1');

    classifier = ml5.imageClassifier('MobileNet', video, modelReady);
  
    //classifier.classify(img, gotResult);
    //image(img, 0, 0, 400, 400);
}

function modelReady() {
  console.log('Model Ready');
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(gotResult);
}

function gotResult(err, results) {
  // The results are in an array ordered by confidence.
  resultsP.html(results[0].label + ' ' + nf(results[0].confidence, 0, 2));
  console.log(results);
  classifyVideo();
}