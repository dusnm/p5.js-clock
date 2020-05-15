let clockFace = null;

function setup() {
  createCanvas(600, 600);
  // Color the background a lovely shade of pink
  background(255, 199, 199);
  clockFace = new ClockFace(width / 2, height / 2, 500);
}

function draw() {
  clockFace.show();
}
