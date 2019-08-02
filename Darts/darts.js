let scaleval = 1.4;
P1 = 'Player1';
P2 = 'Player2';

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

let score = 0;
let throws = 0;

let r = 150;
let numb = [20,1,18,4,13,6,10,15,2,17,3,19,7,16,8,11,14,9,12,5];

const w = 500;
const h = 600;



function setup() {
  P1av = float(0.0);
  P2av = float(0.0);
  //createCanvas(w+400, h);
  createCanvas(windowWidth, windowHeight);
  fullscreen(true);
  scale(scaleval);
  background(153, 153, 255);
  drawGrid();
  updateScore();
  textAlign(CENTER);
  input = createInput();
  input.position((w / 2 - 66)*scaleval, (h / 40)*scaleval);
  button = createButton('Undo');
  button.position((9 * w / 10)*scaleval, scaleval*h / 40);
  button.mousePressed(Undo);

  button1 = createButton('Change Turn');
  button1.position((w / 2 - 59 + w / 32)*scaleval, scaleval*5 * h / 80);
  button1.mousePressed(changePlayer);
  
  
  buttonx = createButton('Reset');
  buttonx.position((500+(r)*2)*scaleval, scaleval*19);
  buttonx.mousePressed(ResetScore);
  
  buttony = createButton('Merge');
  buttony.position(scaleval*680,scaleval*420);
  buttony.mousePressed(Merge);
  
  
  DrawBoard();
  DrawNumbers();


}


function ResetScore(){
  score = 0;
  throws = 0;
  DrawBoard();
  DrawNumbers();
  //console.log('ok');
}

function DrawBoard(){
  stroke(0);
  strokeWeight(1);
  push();
  translate(700,200);
  r = r/2;
  angleMode(DEGREES);
  fill(51);
  //outerboard
  //console.log(r);
  circle(0,0,(r+r/4)*2);
  fill(255,0,0);
  //doubles
  circle(0,0,r*2);
  fill(255,255,210);
  circle(0,0,r*2 - r/10);
  fill(0,255,0);
  //triples
  circle(0,0,r + r/5);
  fill(255,255,210);
  circle(0,0,r + r/10);
  fill(0,255,0);
  //middle
  circle(0,0,r/5);
  fill(255,0,0);
  circle(0,0,r/10);
  let a = 360/40;
  for(let i = 0; i < 20 ; i++){
    let x = 2*r*cos(a);
    let y = 2*r*sin(a);
    line(r*cos(a)/5,r*sin(a)/5,x,y);
    a += 360/20; 
  }
  pop();
  strokeWeight(0);
  noStroke();
}

function DrawNumbers(){
  push();
  r = r*2;
  translate(700,200);
  textSize(16);
  fill(255);
  let a = 18;
  //
  for(let i = 0; i < 20 ; i++){
    if(i>5 && i<15){
      push();
      translate(0,-r - 20);
      rotate(180);
      text(str(numb[i]),0,0);
      pop();
    }else{
      text(str(numb[i]),0,-r - 10);
    }
    rotate(a);
  }
  //
  textSize(30);
  fill(0);
  text(score,-160,-160);
  pop();
}

function mouseClicked(){
  if(throws == 3){
    score = 0;
    throws = 0;
  }
  
  //console.log(mouseX-200,mouseY-200);
  let x = mouseX-(700*scaleval);
  let y = mouseY-(200*scaleval);
  let a = atan(y/x);
  let rad = dist((700*scaleval),(200*scaleval),mouseX,mouseY);
  //console.log(abs(a));
  let index = 0;
  
  //Find Index
  
  a = abs(a);
  
  //Top Left
  if(x<=0 && y<=0){
    if(a < 9){
      index = 15;
    }
    if(a>9 && a<27){
      index = 16;
    }
    if(a>27 && a<45){
      index = 17;
    }
    if(a>45 && a<63){
      index = 18;
    }
    if(a>63 && a<81){
      index = 19;
    }
    if(a > 81){
      index = 0;
    }
  }
  
  if(x>=0 && y<=0){
    if(a < 9){
      index = 5;
    }
    if(a>9 && a<27){
      index = 4;
    }
    if(a>27 && a<45){
      index = 3;
    }
    if(a>45 && a<63){
      index = 2;
    }
    if(a>63 && a<81){
      index = 1;
    }
    if(a > 81){
      index = 0;
    }
  }
  if(x>=0 && y>=0){
    if(a < 9){
      index = 5;
    }
    if(a>9 && a<27){
      index = 6;
    }
    if(a>27 && a<45){
      index = 7;
    }
    if(a>45 && a<63){
      index = 8;
    }
    if(a>63 && a<81){
      index = 9;
    }
    if(a > 81){
      index = 10;
    }
  }
  
  if(x<=0 && y>=0){
    if(a < 9){
      index = 15;
    }
    if(a>9 && a<27){
      index = 14;
    }
    if(a>27 && a<45){
      index = 13;
    }
    if(a>45 && a<63){
      index = 12;
    }
    if(a>63 && a<81){
      index = 11;
    }
    if(a > 81){
      index = 10;
    }
  }
  r = 150*scaleval;
  
  //console.log(index);
  if(rad < (r + r/5)/2 && rad > (r + r/10)/2){
    score += 3*numb[index];
    throws ++;
  }else if(rad < (r*2)/2 && rad > (r*2 - r/10)/2){
    score += 2*numb[index];
    throws ++;
  }else if(rad < (r*2 - r/10)/2 && rad > (r/5)/2){
    score += numb[index];
    throws ++;
  }else if(rad < (r/5)/2 && rad > (r/10)/2){
    score += 25;
    throws ++;
  }else if(rad < (r/10)/2){
    score += 50;
    throws ++;
  }else if(rad < (r+r/4)){
    score += 0;
    throws ++;
  }
  r = 150;
  drawGrid();
  updateScore();
  drawScore();
  DrawBoard();
  DrawNumbers();
}


function draw() {
  scale(scaleval);
  fill(255, 165, 0);
  if (Turn == true) {
    ellipse(w / 4, h / 6, 7, 7, 0);
  } else {
    ellipse(3 * w / 4, h / 6, 7, 7, 0);
  }
  if(P1Curr < 0 || P2Curr < 0 ){
    Undo();
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

function Merge(){
  drawGrid();
  DrawBoard();
  DrawNumbers();
  strokeWeight(4);
  fill(0);
  textSize(w / 20);
  textAlign(CENTER);
  fill(0);

  if (Turn == true) {
    P1Curr = P1Curr - score;
    P1Leg.push(P1Curr);
    P1allShots.push(score);
  } else {
    P2Curr = P2Curr - score;
    P2Leg.push(P2Curr);
    P2allShots.push(score);
  }
  drawScore();
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
  ResetScore();
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
  DrawBoard();
  DrawNumbers();
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
  drawScore();
  //DrawBoard();
  //DrawNumbers();
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
  DrawBoard();
  DrawNumbers();
}

function keyTyped() {
  if ((keyCode == ENTER || key == ' ')& int(input.value()) < 181 & int(input.value()) > -1 & isNaN(input.value()) == false) {
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
      DrawBoard();
      DrawNumbers();


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
      DrawBoard();
      DrawNumbers();

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
  DrawBoard();
  DrawNumbers();
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
