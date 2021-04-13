img = "";
objects = [""];
status = "";
song = "";

function preload(){
  img = loadImage('aibabyimg.jpg');
  song = loadSound('alarm_tone.mp3');
}


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(img, 0, 0, 380, 380);
  if (status = "") {
      song.play();
  }
  else {
      song.stop();
    objectDetector.detect(img, gotResult);

    for(i=0;i<objects.length;i++) {
        document.getElementById("displaystatus").innerHTML = "Status : Object Detected"
        r = random(255);
        g = random(255);
        b = random(255);
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x , objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].height,objects[i].width);
        document.getElementById("status").innerHTML = objects.length;
    }
}
}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}

function stop()
{
	song.stop();
	song.setVolume(1);
	song.rate(1);
}