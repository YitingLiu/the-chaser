function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  textSize(30);
  text("z:" + nfc(rotationZ,3), 10, 30)
  text("x:" + nfc(rotationX,3), 10, 60)
  text("y:" + nfc(rotationY,3), 10, 90)
}