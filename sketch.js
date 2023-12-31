let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

let engine;

let colliders = [];
let rectangles = [];

let selectionX, selectionY, selectionWIDTH, selectionHEIGHT;
let realmouseX, realmouseY;

let canvas;
let containersize;

let background;
let BGswitch = true;

function preload() {
  background = loadImage("construction.jpg");
}

function setup() {
  containersize = document.getElementById("sketch-container").clientWidth;
  let canvaswindow = createCanvas(containersize, containersize);
  canvaswindow.parent("sketch-container");

  canvas = createGraphics(800, 800);
  canvas.noFill();

  let input = createFileInput(handleFile);
  input.id("input-file");
  input.parent("upload");

  //matter.js
  engine = Engine.create();

  colliders.push(new Collider(canvas.width / 2, canvas.height + 25, canvas.width, 50));
  colliders.push(new Collider(canvas.width / 2, -25, canvas.width, 50));
  colliders.push(new Collider(-25, canvas.height / 2, 50, canvas.height));
  colliders.push(new Collider(canvas.width + 25, canvas.height / 2, 50, canvas.height));

  Runner.run(engine);
}

function draw() {
  switch (BGswitch) {
    case true:
      canvas.image(background, 0, 0, 800, 800);
      break;
    case false:
      canvas.background(document.getElementById("input-color").value);
      break;
  }
  for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].display();
  }
  canvas.rect(selectionX, selectionY, selectionWIDTH, selectionHEIGHT);
  image(canvas, 0, 0, width, height);
}

function mousePressed() {
  if (mouseInScreen()) {
    realmouseX = map(mouseX, 0, containersize, 0, canvas.width);
    realmouseY = map(mouseY, 0, containersize, 0, canvas.height);

    selectionX = realmouseX;
    selectionY = realmouseY;
  }
}

function mouseDragged() {
  if (mouseInScreen()) {
    realmouseX = map(mouseX, 0, containersize, 0, canvas.width);
    realmouseY = map(mouseY, 0, containersize, 0, canvas.height);
    selectionWIDTH = realmouseX - selectionX;
    selectionHEIGHT = realmouseY - selectionY;
  }
}

function mouseReleased() {
  if (mouseInScreen()) {
    if (selectionWIDTH < 0) {
      selectionWIDTH = selectionWIDTH * -1;
      selectionX = realmouseX;
    }
    if (selectionHEIGHT < 0) {
      selectionHEIGHT = selectionHEIGHT * -1;
      selectionY = realmouseY
    }

    selectionX = Math.round(selectionX);
    selectionY = Math.round(selectionY);
    selectionWIDTH = Math.round(selectionWIDTH);
    selectionHEIGHT = Math.round(selectionHEIGHT);

    let selection = createImage(selectionWIDTH, selectionHEIGHT);
    selection.copy(canvas, selectionX + 1, selectionY + 1, selectionWIDTH - 2, selectionHEIGHT - 2, 0, 0, selectionWIDTH, selectionHEIGHT);
    rectangles.push(new Rectangle(selectionX, selectionY, selectionWIDTH, selectionHEIGHT, selection));
    selectionX = 0;
    selectionY = 0;
    selectionWIDTH = 0;
    selectionHEIGHT = 0;
  }
}

function windowResized() {
  containersize = document.getElementById("sketch-container").clientWidth;
  resizeCanvas(containersize, containersize);
}

function handleFile(file) {
  if (file.type === "image") {
    background = loadImage(file.data);
  }
}

function saveResult() {
  saveCanvas();
}

function mouseInScreen() {
  if (mouseX > 0 && mouseX < width) {
    if (mouseY > 0 && mouseY < height) {
      return true;
    }
  }
}

function clearOBJ() {
  Composite.clear(engine.world, true);
  rectangles = [];
}

function changeBG() {
  if (BGswitch) {
    BGswitch = false;
    document.getElementById("setting-image").style.display = "none";
    document.getElementById("setting-background").style.display = "inline";
    document.getElementById("input-color").style.display = "inline";
  } else {
    BGswitch = true;
    document.getElementById("setting-image").style.display = "inline";
    document.getElementById("setting-background").style.display = "none";
    document.getElementById("input-color").style.display = "none";
  }
}

function clickInput(id) {
  document.getElementById(id).click();
}