let classifier;
let video;
let resultsP;

function setup() {
  noCanvas();
  // Create a camera input
  video = createCapture(VIDEO);
  video.parent('sketch_week1');
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models@master/models/darknetclassifier/darknettiny/model.json', video, modelReady);
  resultsP = createP('Loading model and video...');
  resultsP.parent('sketch_week1');
}

function modelReady() {
  console.log('Model Ready');
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by confidence.
  resultsP.html(results[0].label + ' ' + nf(results[0].confidence, 0, 2));
  console.log(results);
  classifyVideo();
}