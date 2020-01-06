// Your code will go here
// open up your console - if everything loaded properly you should see 0.3.0
console.log('ml5 version:', ml5.version);

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;
// A variable to hold the image we want to classify
let img;

function preload(){
    //model
    classifier = ml5.imageClassifier('MobileNet');
    //image
    img = loadImage('image.jpg');
}

function setup(){
    createCanvas(400, 400);
    classifier.classify(img, gotResult);
    image(img, 0, 0, 400, 400);
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  createDiv("Label:" + results[0].label);
  createDiv("Confidence: " + nf(results[0].confidence, 0, 2));
}
