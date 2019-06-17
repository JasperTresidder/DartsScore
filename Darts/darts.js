P1 = 'Jasper';
P2 = 'Titus';

i = 0;
j = 0;
P1Leg = [];
P2Leg = [];

lastWin = null;

Turn = true;
legTurn = true;

P1allShots = [];
P2allShots = [];

P1Curr = 501;
P2Curr = 501;

var P1Score = 0;
var P2Score = 0;

const w = 500;
const h = 600;

function setup() {
  P1av = float(0.0);
  P2av = float(0.0);
  createCanvas(w, h);
  background(153, 153, 255);
  drawGrid();
  updateScore();
  textAlign(CENTER);
  input = createInput();
  input.position(w / 2 - 66, h / 40);
  button = createButton('Undo');
  button.position(9 * w / 10, h / 40);
  button.mousePressed(Undo);

  button1 = createButton('Change Turn');
  button1.position(w / 2 - 59 + w / 32, 5 * h / 80);
  button1.mousePressed(changePlayer);


}

function draw() {
  fill(255, 165, 0);
  if (Turn == true) {
    ellipse(w / 4, h / 6, 7, 7, 0);
  } else {
    ellipse(3 * w / 4, h / 6, 7, 7, 0);
  }
}

function drawGrid() {
  background(153, 153, 255);
  stroke(0);
  strokeWeight(4);
  line(w / 2, h / 10, w / 2, h);
  line(0, 2 * h / 10, w, 2 * h / 10);

  textSize(w / 20);
  textAlign(CENTER);
  fill(0);
  noStroke();

  // NAMES:
  text(P1, w / 4, 3 * h / 20);
  text(P2, 3 * w / 4, 3 * h / 20);

  textSize(w / 20);
  text('501', 3 * w / 4 - w / 8, 5 * h / 20);
  text('501', w / 4 - w / 8, 5 * h / 20);

}

function updateScore() {
  textSize(w / 20);
  textAlign(CENTER);
  fill(255, 0, 0);
  text(str(P1Score), w / 4, 3 * h / 40);
  text(str(P2Score), 3 * w / 4, 3 * h / 40);
  fill(10, 0, 145);
  if (lastWin == true) {
    text(str(P2av), w / 8 + w / 2 - w / 32, 3 * h / 20);
  } else if (lastWin == false) {
    text(str(P1av), w / 8 - w / 32, 3 * h / 20);
  } else {
    if (isNaN(P1av) == true) {
      text('0', w / 8 - w / 32, 3 * h / 20);
    } else {
      text(str(P1av), w / 8 - w / 32, 3 * h / 20);
    }
    if (isNaN(P2av) == true) {
      text('0', w / 8 + w / 2 - w / 32, 3 * h / 20);
    } else {
      text(str(P2av), w / 8 + w / 2 - w / 32, 3 * h / 20);
    }
  }
  lastWin = null;
  fill(0);
}

function Score() {
  drawGrid();
  strokeWeight(4);
  fill(0);
  var value = input.value();
  input.value('');
  textSize(w / 20);
  textAlign(CENTER);
  fill(0);

  if (Turn == true) {
    P1Curr = P1Curr - value;
    P1Leg.push(P1Curr);
    P1allShots.push(value);
  } else {
    P2Curr = P2Curr - value;
    P2Leg.push(P2Curr);
    P2allShots.push(value);
  }
  drawScore()
  Turn = !Turn;
  if (P1Curr == 0) {
    P1Score = P1Score + 1;
    lastWin = true;
    redo();
  }
  if (P2Curr == 0) {
    P2Score = P2Score + 1;
    lastWin = false;
    redo();
  }
  var temp = 0;
  for (var k = 0; k < P1allShots.length; k++) {
    temp = temp + int(P1allShots[k]);
  }
  P1av = float(temp / P1allShots.length);

  P1av = round(P1av * 100);
  P1av = P1av / 100;

  temp = 0;
  for (k = 0; k < P2allShots.length; k++) {
    temp = temp + int(P2allShots[k]);
  }
  P2av = float(temp / P2allShots.length);

  P2av = round(100 * P2av);
  P2av = P2av / 100;
  updateScore();
}

function redo() {
  i = 0;
  j = 0;
  legTurn = !legTurn;
  Turn = legTurn;
  P1Leg = [];
  P2Leg = [];
  P1Curr = 501;
  P2Curr = 501;
  drawGrid();
  updateScore();
}

function keyTyped() {
  if (key === ' ' & int(input.value()) < 181 & int(input.value()) > -1 & isNaN(input.value()) == false) {
    if (Turn == true & int(input.value()) < P1Curr + 1) {
      Score();
    }
    if (Turn == false & int(input.value()) < P2Curr + 1) {
      Score();
    }
  }
}

function Undo() {
  if (Turn == true) {
    if (P2Leg.length != 0) {
      if (P2Leg.length == 1) {
        P2Curr = 501;
      } else {
        P2Curr = P2Leg[P2Leg.length - 2];
      }
      P2allShots.pop();
      P2Leg.pop();
      Turn = !Turn;
      drawGrid();
      fill(0);
      drawScore();


      var temp = 0;
      for (var k = 0; k < P1allShots.length; k++) {
        temp = temp + int(P1allShots[k]);
      }
      P1av = float(temp / P1allShots.length);

      P1av = round(P1av * 100);
      P1av = P1av / 100;

      temp = 0;
      for (k = 0; k < P2allShots.length; k++) {
        temp = temp + int(P2allShots[k]);
      }
      P2av = float(temp / P2allShots.length);

      P2av = round(100 * P2av);
      P2av = P2av / 100;
      updateScore();
    }
  } else {
    if (P1Leg.length != 0) {
      if (P1Leg.length == 1) {
        P1Curr = 501;
      } else {
        P1Curr = P1Leg[P1Leg.length - 2];
      }
      P1allShots.pop();
      P1Leg.pop();
      Turn = !Turn;
      drawGrid();
      fill(0);
      drawScore();

      var temp = 0;
      for (var k = 0; k < P1allShots.length; k++) {
        temp = temp + int(P1allShots[k]);
      }
      P1av = float(temp / P1allShots.length);

      P1av = round(P1av * 100);
      P1av = P1av / 100;

      temp = 0;
      for (k = 0; k < P2allShots.length; k++) {
        temp = temp + int(P2allShots[k]);
      }
      P2av = float(temp / P2allShots.length);

      P2av = round(100 * P2av);
      P2av = P2av / 100;
      updateScore();
    }
  }
}

function changePlayer() {
  Turn = !Turn;
  drawGrid();
  updateScore();
  drawScore();
}

function drawScore() {
  for (var i = 0; i < P1Leg.length; i++) {
    if (i < 14) {
      text(str(P1Leg[i]), w / 4 - w / 8, 6 * h / 20 + i * h / 20);
    } else {
      text(str(P1Leg[i]), w / 4 + w / 8, 6 * h / 20 + (i - 15) * h / 20);
    }
  }
  for (var j = 0; j < P2Leg.length; j++) {
    if (j < 14) {
      text(str(P2Leg[j]), 3 * w / 4 - w / 8, 6 * h / 20 + j * h / 20);
    } else {
      text(str(P2Leg[j]), 3 * w / 4 + w / 8, 6 * h / 20 + (j - 15) * h / 20);
    }
  }

}