var game;
var tempX = 0;
var tempX2;
var level = 1;
var tSpacer = 0;
var option = 1;
var menuY;
var instructions = false;
var startGame = false;
var go1 = false;
var g1x;
var g1y;
var timer = 0;
var nw;
var nh;
var speed = 3;
var speed2 = 3;
var angle = 0;
var highScore = 0;
var playerSpeed = 3;
var showInstructions = false;
var instructions = true;
var gif_loadImg, gif_createImg;
var question = 1;
var game2score = 0;
var whaleX;
let lines = [];
let lines2 = [];
let enemies = [];
let enemiesX = [];
let enemiesLength;
let linesLength;
let g1Player;
let mySound;


var g2x, g2y;

function preload() {
  game = loadFont('fonts/Bloomer Regular.otf')
  mySound = loadSound('audio/Komiku_-_06_-_School.mp3');
  game3sound = loadSound('audio/schematist.mp3');
  game2sound = loadSound('audio/lumena.wav');
  game1sound = loadSound('audio/raindrop.mp3');
  beep = loadSound('audio/buzzer.mp3')
  apple = loadImage("images/apple.png");
  banana = loadImage("images/banana.png");
  strawberry = loadImage("images/strawberry.gif");
  hotdog = loadImage("images/hotdog.png");
  pizza = loadImage("images/pizza.png");
  burger = loadImage("images/burger.png");
  spaghetti = loadImage("images/spaghetti.png");
  pancake = loadImage("images/pancake.png");
  rollcake = loadImage("images/rollcake.png");
  cake = loadImage("images/cake.png");
  tart = loadImage("images/tart.png");
  tea = loadImage("images/tea.png");
  milkshake = loadImage("images/milkshake.png");
  juice = loadImage("images/juice.png");
  chocolate = loadImage("images/chocolate.png");
  icecream = loadImage("images/icecream.png");
  macaroon = loadImage("images/macaroon.png");
  mug = loadImage("images/mug.png");
  cake2 = loadImage("images/strawCake.png");
  mcDonalds = loadImage("images/mcDonalds.png");
  sushi = loadImage("images/sushi.png");
  ramen = loadImage("images/ramen.png");
  map = loadImage("images/map.png");
  mark = loadImage("images/mark.jpg");
  whale = loadImage("images/whale.png");

}

function setup() {
  g2x = (windowWidth/2)-350+700;
  g2y = (windowHeight/2)-225+500;

  whaleX = g2x-20;

  mySound.setVolume(0.1);
  mySound.play();
  mySound.loop();

  nw = (windowWidth/2)-350;
  nh = (windowHeight/2)-225;
  menuY = windowHeight/2;
  tempX2 = windowWidth;
  createCanvas(windowWidth,windowHeight);
  background(153, 230, 230);
  linesLength = windowWidth/20;

  g1x = (((windowWidth/2)-350)+700)/2+150;
  g1y = (((windowHeight/2)-225)+500)/2+50;

  //fills line array with line objects
  for (let i = 0; i < linesLength; i++) {
    lines.push(new Line(tempX));
    tempX += 40;
  }

  //fills line2 array with line objects
  for (let i = 0; i < linesLength; i++) {
    lines2.push(new Line2(tempX2));
    tempX2 -= 40;
  }

  enemiesLength = 10;

  for (let i = 0; i < enemiesLength; i++) {
    enemies.push(new enemy(nw,nh));
  }

  for (let i = 0; i < enemiesLength; i++) {
    enemiesX.push(new enemyX(nw,nh));
  }

  angleMode(DEGREES);


}

function draw() {

  background(153, 230, 230);
  if(level == 1){
    noCursor();
    menu();
  }
  if(level == 2){
    cursor(CROSS);
    game1();
  }
  if(level == 3){
    cursor();
    game2();
  }
  if(level == 4){
    cursor();
    game3();
  }

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  background(153, 230, 230);
}

function menu(){
  //top border lines
  for (let i = 0; i < lines.length; i++) {
    lines[i].move();
    lines[i].display();
  }
  //bottom border lines
  for (let i = 0; i < lines2.length; i++) {
    lines2[i].move();
    lines2[i].display();
  }

  //title
  fill(179, 0, 0);
  textSize(90);
  textFont(game);
  text('Johns GameHub', (windowWidth/2)-305, (windowHeight/2)-100);


  noStroke();
  //Instructions
  fill(179, 0, 0);
  textSize(45);
  text('Select a game',(windowWidth/2)-150, (windowHeight/2)-20)

  //option box
  fill(255,255,255);
  rect((windowWidth/2)-74, menuY, 85, 30, 10);

  //game options
  noStroke();
  fill(179, 0, 0);
  textSize(30);
  text('Game1', (windowWidth/2)-70, (windowHeight/2)+25);
  text('Game2', (windowWidth/2)-70, (windowHeight/2)+55);
  text('Game3', (windowWidth/2)-70, (windowHeight/2)+85);

  //cursor
  var tW = (windowWidth/2)-100;
  var tH = (windowHeight/2)+3;

  if (keyIsDown(87)) {
    if(tSpacer <= 0){
      tSpacer = 65;
    }
    else{
      tSpacer-=2;
    }
  }

  if (keyIsDown(83)) {
    if(tSpacer >= 65){
      tSpacer = 0;
    }
    else{
      tSpacer+=2;
    }
  }

  //selection for draw

  if(tSpacer < 22){
    menuY = windowHeight/2;
    if(keyIsDown(13)){
      level = 3;
      question = 1;
      game2score = 0;
      mySound.stop();
      game1sound.setVolume(0.1);
      game1sound.play();
      game1sound.loop();
    }
  }
  else if(tSpacer < 44){
    menuY = (windowHeight/2)+30;
    if(keyIsDown(13)){
      level = 2;
      mySound.stop();
      game2sound.setVolume(0.1);
      game2sound.play();
      game2sound.loop();
    }
  }
  else{
    menuY = (windowHeight/2)+60;
    if(keyIsDown(13)){
      level = 4;
      mySound.stop();
      game3sound.setVolume(0.1);
      game3sound.play();
      game3sound.loop();
    }
  }

  stroke(179, 0, 0);
  strokeWeight(2);
  fill(255, 255, 255);
  triangle(tW, (tH)+tSpacer, tW+20, (tH+10)+tSpacer, tW, (tH+20)+tSpacer)

  noStroke();

}

function game1(){
  var g1w = ((windowWidth/2)-350)+700;
  var g1h = ((windowHeight/2)-225)+500;

  background(153, 230, 210);

  fill(255,255,255);
  stroke(40, 40, 40);
  rect(15,15,150,50,10);

  if((mouseX > 15) && (mouseX < 165)){
    if((mouseY > 15) && (mouseY < 65)){
      fill(33, 34, 35);
      rect(15,15,150,50,10);
      if(mouseIsPressed){
        game2sound.stop();
        mySound.play();
        level = 1;
      }
    }
  }

  noStroke();
  textSize(40);
  fill(201, 160, 14);
  text('back', 50, 55);

  stroke(40, 40, 40);
  strokeWeight(2);
  if(startGame == false){
    fill(45, 81, 89);
  }
  else{
    fill(255,255,255);
  }
  rect((windowWidth/2)-350,(windowHeight/2)-225,700,500);

  fill(45, 81, 89);
  textSize(70);
  text('Threader', (windowWidth/2)-130, 70);

  stroke(40, 40, 40);
  fill(255,255,255);
  if(startGame == false){
    rect(g2x-425,g2y-325,150,50,10);
    rect(g2x-425,g2y-250,150,50,10);
  }
  //hover over start button
  if((mouseX > g2x-425) && (mouseX < g2x-425+150)){
    if((mouseY > g2y-325) && (mouseY < g2y-325+50)){
      fill(33, 34, 35);
      if(mouseIsPressed){
        showInstructions = false;
        startGame = true;
        for (let i = 0; i < enemies.length; i++) {
          enemies[i].resetX();
          enemies[i].resetY();
        }
        for (let i = 0; i < enemiesX.length; i++) {
          enemiesX[i].resetX();
          enemiesX[i].resetY();
        }
      }
      if(startGame == false){
        rect(g2x-425,g2y-325,150,50,10);
      }
    }
  }

  //hover over instructions
  if((mouseX > g2x-425) && (mouseX < g2x-425+150)){
    if((mouseY > g2y-250) && (mouseY < g2y-250+150)){
      fill(33, 34, 35);
      if(mouseIsPressed){
        if(instructions == true){
          showInstructions = true;
        }
      }
      if(startGame == false){
        rect(g2x-425,g2y-250,150,50,10);      }
    }
  }

  noStroke();
  textSize(40);
  fill(201, 160, 14);

  if(showInstructions == true){
    threaderInstructions(g1w,g1h);
  }

  if(showInstructions == false){
    if(go1 == false){
      if(startGame == false){
        text('start', g2x-396,g2y-287);
        textSize(24);
        text('instructions', g2x-413,g2y-217);
      }
      else if(startGame == true){
        stroke(40, 40, 40);
        strokeWeight(1);
        threader(g1w,g1h);
      }
    }
    else if (go1 == true){
      gameOverThreader(g1w,g1h);
    }
  }


}

let button,button2,button3;
var scaleX = 500;
var value2;

function game2(){

  var col = color(255,255,255);
  var col2 = color(255, 122, 122);

  if(!button){
    button = createButton('A');
  }
  button.position(g2x-600,g2y-277);
  button.style('background-color', col2);
  button.style('color', col);
  button.style("font-family","Comic Sans MS");

  if(!button2){
    button2 = createButton('B');
  }
  button2.position(g2x-365,g2y-277);
  button2.style('background-color', col2);
  button2.style('color', col);
  button2.style("font-family","Comic Sans MS");

  if(!button3){
  button3 = createButton('C');
  }
  button3.position(g2x-130,g2y-277);
  button3.style('background-color', col2);
  button3.style('color', col);
  button3.style("font-family","Comic Sans MS");

  if(question == 0){
    button.hide();
    button2.hide();
    button3.hide();
  }

  if(question == 1){
    button.show();
    button2.show();
    button3.show();
    button.mousePressed(addScore);
    button2.mousePressed(q2);
    button3.mousePressed(q2);
  }
  else if(question == 2){
    button.mousePressed(q3);
    button2.mousePressed(q3);
    button3.mousePressed(addScore);
  }
  else if(question == 3){
    button.mousePressed(q4);
    button2.mousePressed(addScore);
    button3.mousePressed(q4);
  }
  else if(question == 4){
    button.mousePressed(q5);
    button2.mousePressed(addScore);
    button3.mousePressed(q5);
  }
  else if(question == 5){
    button.mousePressed(q6);
    button2.mousePressed(addScore);
    button3.mousePressed(q6);
  }
  else if(question == 6){
    button.mousePressed(addScore);
    button2.mousePressed(q7);
    button3.mousePressed(q7);
  }
  else if(question == 7){
    button.mousePressed(q8);
    button2.mousePressed(q8);
    button3.mousePressed(addScore);
  }
  else if(question == 8){
    button.mousePressed(q9);
    button2.mousePressed(q9);
    button3.mousePressed(addScore);
  }
  else if(question == 9){
    button.mousePressed(q10);
    button2.mousePressed(addScore);
    button3.mousePressed(q10);
  }
  else if(question == 10){
    button.mousePressed(addScore);
    button2.mousePressed(over);
    button3.mousePressed(over);
  }

  stroke(255, 122, 122);
  strokeWeight(2);
  fill(255,255,255);
  rect((windowWidth/2)-350,(windowHeight/2)-225,700,500);
  fill(255, 122, 122);
  noStroke();
  textSize(70);
  text('Calorie Guesser',(windowWidth/2)-230,82);

  if(question == 0){
    textSize(50);
    text('Good job. You scored '+game2score+'/10', g2x-610,g2y-400);

    fill(255, 122, 122);
    rect(g2x-500,g2y-300,300,150,10);

    fill(255,255,255);
    textSize(105);
    text('retry',g2x-480,g2y-190);
    if((mouseX > g2x-500) && (mouseX < g2x-500+300)){
      if((mouseY > g2y-300) && (mouseY < g2y-300+150)){
        if(mouseIsPressed){
          game2score = 0;
          question = 1;
        }
      }
    }
  }
  else if(question == 1){
    q1();
  }
  else if(question == 2){
    q2();
  }
  else if(question == 3){
    q3();
  }
  else if(question == 4){
    q4();
  }
  else if(question == 5){
    q5();
  }
  else if(question == 6){
    q6();
  }
  else if(question == 7){
    q7();
  }
  else if(question == 8){
    q8();
  }
  else if(question == 9){
    q9();
  }
  else if(question == 10){
    q10();
  }

  fill(255,255,255);
  stroke(255, 122, 122);
  rect(15,15,150,50,10);


  if((mouseX > 15) && (mouseX < 165)){
    if((mouseY > 15) && (mouseY < 65)){
      if(mouseIsPressed){
        level = 1;
        game1sound.stop();
        mySound.play();
        button.hide();
        button2.hide();
        button3.hide();
      }
    }
  }

  noStroke();
  textSize(40);
  fill(255, 122, 122);
  text('back', 50, 55);


}

var input;
var fact = 1;
var lives = 3;
function game3(){

  for (let i = 0; i < 200; i++) {
    push();
    fill(random(255), 255, 255);
    translate(random(width), random(height));
    rotate(random(2 * PI));
    text('?', 0, 0);
    pop();
  }

  fill(40, 40, 40);
  stroke(255,255,255);
  rect((windowWidth/2)-350,(windowHeight/2)-225,700,500);
  textSize(70);
  text('trivia',(windowWidth/2)-90,82);

  strokeWeight(2);
  rect(15,15,150,50,10);

  noStroke();
  textSize(40);
  fill(255,255,255);
  text('back', 50, 55);

  var col2 = color(40,40,40);

  if(!input){
    input = createInput();
  }
  input.position(g2x-474,g2y-150);
  input.changed(evaluate);
  input.style('font-size', '20px');
  input.style("font-family","Comic Sans MS");
  input.style('color',col2)
  input.style("font-weight","bold");

  if(fact == 1){
    input.show();
    textSize(60);
    text('   What is the \nlargest animal\n on the planet?', g2x-545,g2y-355);
    if(frameCount > 600){
      whaleX--;
      g1yy = g2y-80;
      g1yy += random(-1, 1);
      image(whale,whaleX,g1yy,30,30);
      if(whaleX <= g2x-700){
        whaleX = g2x-20;
      }
    }
  }
  else if(fact == 2){
    textSize(60);
    text('What is a green \n and red fruit?', g2x-545,g2y-335);
  }
  else if(fact == 3){
    stroke(255,255,255);
    strokeWeight(3);
    rect(g2x-500,g2y-420,300,200);
    image(map,g2x-500,g2y-420,300,200);
  }
  else if(fact == 4){
    stroke(255,255,255);
    strokeWeight(3);
    rect(g2x-500,g2y-420,300,200);
    image(mark,g2x-500,g2y-420,300,200);
  }
  else if(fact == 5){
    textSize(80);
    text('is cereal soup?', g2x-595,g2y-280);
  }
  else if(fact == 6){
    input.hide();
    textSize(70);
    g1xx = g2x-630;
    g1yy = g2y-360;
    g1xx  += random(-2, 2);
    g1yy += random(-2, 2);
    fill(random(255),random(255),random(255));
    text('        You won!\n    you have vast\n       amounts of\nrandom knowledge', g1xx,g1yy);
  }
  else if (fact == 0){
    g1xx = g2x-620;
    g1yy = g2y-320;
    g1xx  += random(-1, 1);
    g1yy += random(-1, 1);
    textSize(120);
    fill(160, 16, 18);
    text('game over!', g1xx,g1yy);

    textSize(60);
    text('retry?', g2x-440,g2y-140);
  }

  noStroke();
  textSize(40);
  if(lives == 3){
    fill(255,255,255);
  }
  else if(lives == 2){
    fill(168, 112, 1);
  }
  else if(lives == 1){
    fill(160, 16, 18);
  }
  else{
    input.hide();
    fact = 0;
  }

  if(lives!=0 && fact!= 6){
    text('Lives: '+lives,g2x-690,g2y-10)
  }


  input.changed(evaluate);

  if((mouseX > 15) && (mouseX < 165)){
    if((mouseY > 15) && (mouseY < 65)){
      if(mouseIsPressed){
        game3sound.stop();
        mySound.play();
        level = 1;
        lives = 3;
        fact = 1;
        input.hide();
      }
    }
  }

}

function evaluate(){

  if(input.value() == 'blue whale' || input.value() == 'whale'){
    fact = 2;
  }
  else if(input.value() == 'watermelon' && fact == 2){
    fact = 3;
  }
  else if(input.value() == 'washington' && fact == 3){
    fact = 4;
  }
  else if((input.value() == 'mark zuckerberg' || input.value() == 'mark' || input.value() == 'zuck') && fact == 4){
    fact = 5;
  }
  else if(input.value() == 'no' && fact == 5){
    fact = 6;
  }
  else{
    beep.setVolume(0.2);
    beep.play();
    lives--;
  }
}

function q1(){
  fill(255, 130, 130);

  textSize(60);
  text('1. Which item contains\n       95 calories?', g2x-610,g2y-400);

  //A
  rect(g2x-682,g2y-250,200,220,10);
  image(apple,g2x-662,g2y-220,150,150);

  //B
  rect(g2x-449,g2y-250,200,220,10);
  image(banana,g2x-429,g2y-220,150,150);

  //C
  rect(g2x-216,g2y-250,200,220,10);
  image(strawberry,g2x-191,g2y-220,150,150);

}

function q2(){
  question = 2;
  fill(255, 130, 130);

  textSize(60);
  text('2. Which item contains\n      300 calories?', g2x-610,g2y-400);

  //A
  rect(g2x-682,g2y-250,200,220,10);
  image(burger,g2x-662,g2y-220,150,150);

  //B
  rect(g2x-449,g2y-250,200,220,10);
  image(pizza,g2x-429,g2y-220,150,150);

  //C
  rect(g2x-216,g2y-250,200,220,10);
  image(hotdog,g2x-191,g2y-220,150,150);

}

function q3(){
  question = 3;
  fill(255, 130, 130);

  textSize(60);
  text('3. Which item contains\n      250 calories?', g2x-610,g2y-400);

  //A
  rect(g2x-682,g2y-250,200,220,10);
  image(tart,g2x-642,g2y-200,125,100);

  //B
  rect(g2x-449,g2y-250,200,220,10);
  image(pancake,g2x-429,g2y-210,150,115);

  //C
  rect(g2x-216,g2y-250,200,220,10);
  image(rollcake,g2x-191,g2y-220,150,150);

}

function q4(){
  question = 4;
  fill(255, 130, 130);

  textSize(60);
  text('4. Which item contains\n      750 calories?', g2x-610,g2y-400);

  //A
  rect(g2x-682,g2y-250,200,220,10);
  image(tea,g2x-662,g2y-220,150,150);

  //B
  rect(g2x-449,g2y-250,200,220,10);
  image(milkshake,g2x-429,g2y-220,150,150);

  //C
  rect(g2x-216,g2y-250,200,220,10);
  image(juice,g2x-191,g2y-190,150,100);

}

function q5(){
  question = 5;
  fill(255, 130, 130);

  textSize(60);
  text('5. Which item contains\n      200 calories?', g2x-610,g2y-400);

  //A
  rect(g2x-682,g2y-250,200,220,10);
  image(cake2,g2x-640,g2y-210,125,125);

  //B
  rect(g2x-449,g2y-250,200,220,10);
  image(icecream,g2x-429,g2y-220,150,150);

  //C
  rect(g2x-216,g2y-250,200,220,10);
  image(macaroon,g2x-191,g2y-220,150,150);

}

function q6(){
  question = 6;

  fill(255, 130, 130);

  textSize(60);
  text('6. Which item contains\n       220 calories?', g2x-610,g2y-400);

  //A
  rect(g2x-682,g2y-250,200,220,10);
  image(spaghetti,g2x-662,g2y-220,150,150);

  //B
  rect(g2x-449,g2y-250,200,220,10);
  image(pizza,g2x-429,g2y-220,150,150);

  //C
  rect(g2x-216,g2y-250,200,220,10);
  image(hotdog,g2x-191,g2y-220,150,150);
}

function q7(){
  question = 7;

  fill(255, 130, 130);

  textSize(60);
  text('7. Which item contains\n       400 calories?', g2x-610,g2y-400);

  //A
  rect(g2x-682,g2y-250,200,220,10);
  image(burger,g2x-662,g2y-220,150,150);

  //B
  rect(g2x-449,g2y-250,200,220,10);
  image(sushi,g2x-429,g2y-220,150,150);

  //C
  rect(g2x-216,g2y-250,200,220,10);
  image(chocolate,g2x-191,g2y-220,150,150);
}

function q8(){
  question = 8;

  fill(255, 130, 130);

  textSize(60);
  text('8. Which item contains\n       750 calories?', g2x-610,g2y-400);

  //A
  rect(g2x-682,g2y-250,200,220,10);
  image(pancake,g2x-662,g2y-220,150,150);

  //B
  rect(g2x-449,g2y-250,200,220,10);
  image(banana,g2x-429,g2y-220,150,150);

  //C
  rect(g2x-216,g2y-250,200,220,10);
  image(mcDonalds,g2x-191,g2y-220,150,150);
}

function q9(){
  question = 9;

  fill(255, 130, 130);

  textSize(60);
  text('9. Which item contains\n       20 calories?', g2x-610,g2y-400);

  //A
  rect(g2x-682,g2y-250,200,220,10);
  image(macaroon,g2x-662,g2y-220,150,150);

  //B
  rect(g2x-449,g2y-250,200,220,10);
  image(tea,g2x-429,g2y-220,150,150);

  //C
  rect(g2x-216,g2y-250,200,220,10);
  image(tart,g2x-191,g2y-220,150,150);
}

function q10(){
  question = 10;

  fill(255, 130, 130);

  textSize(60);
  text('10. Which item contains\n         95 calories?', g2x-630,g2y-400);

  //A
  rect(g2x-682,g2y-250,200,220,10);
  image(tart,g2x-662,g2y-220,150,150);

  //B
  rect(g2x-449,g2y-250,200,220,10);
  image(cake,g2x-429,g2y-220,150,150);

  //C
  rect(g2x-216,g2y-250,200,220,10);
  image(mcDonalds,g2x-191,g2y-220,150,150);
}

function over(){
  question = 0;
}

function addScore(){
  game2score++;
  if(question == 1){
    q2();
  }
  else if(question == 2){
    q3();
  }
  else if(question == 3){
    q4();
  }
  else if(question == 4){
    q5();
  }
  else if(question == 5){
    q6();
  }
  else if(question == 6){
    q7();
  }
  else if(question == 7){
    q8();
  }
  else if(question == 8){
    q9();
  }
  else if(question == 9){
    q10();
  }
  else if(question == 10){
    over();
  }
}

function threader(g1w,g1h){
  playerSpeed = 3;
  instructions = false;
  fill(45, 81, 89);
  circle(g1x,g1y,15);
  rect(g1w-700,g1h-500,699,50);

  fill(201, 160, 14);
  text('Score:',g1w-690,g1h-460);
  text(timer,g1w-585,g1h-460);

  var spawnXenemies = false;


  if (frameCount % 60 == 0) {
    timer+=10;
    speed+= 0.1;
    if(spawnXenemies){
      speed2+=0.1;
    }
  }

  if(timer >= 100){
    spawnXenemies = true;
  }

  if(timer >= 200){
    playerSpeed = 6;
  }

  movePlayer();

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].move();
    enemies[i].display();
    if(enemies[i].collision(g1x,g1y)){
      if(timer > highScore){
        highScore = timer;
      }
      go1 = true;
      timer = 0;
      speed = 3;
    }
  }

  if(spawnXenemies){
    for (let i = 0; i < enemiesX.length; i++) {
      enemiesX[i].move();
      enemiesX[i].display();
      if(enemiesX[i].collision(g1x,g1y)){
        if(timer > highScore){
          highScore = timer;
        }
        go1 = true;
        timer = 0;
        speed2 = 3;
      }
    }
  }


  if(g1x >= g1w){
    g1x = g1w-690;
  }
  if(g1x <= g1w-700){
    g1x = g1w-10;
  }
  if(g1y >= g1h){
    g1y = g1h-440;
  }
  if(g1y <= g1h-450){
    g1y = g1h-10;
  }

}

function threaderInstructions(g1w,g1h){
  fill(40,40,40);
  rect((windowWidth/2)-350,(windowHeight/2)-225,700,500);
  textSize(50);
  fill(201, 160, 14);
  text('Controls: W A S D',g1w-520,g1h-350);
  textSize(30);
  text('Objective: avoid collision \n with incoming dots.\n Points are accumulated \n automatically overtime.',g1w-500,g1h-250)

  fill(255,255,255);
  rect(g1w-680,g1h-480,80,35,10);

  fill(201, 160, 14);
  text('menu',g1w-672,g1h-450);

  if((mouseX > (g1w-680)) && (mouseX < (g1w-680)+80)){
    if((mouseY > (g1h-480)) && (mouseY < (g1h-480)+35)){
      if(mouseIsPressed){
        showInstructions = false;
      }
    }
  }



}

function gameOverThreader(g1w,g1h){
  instructions = false;
  stroke(40, 40, 40);
  strokeWeight(2);
  fill(45, 81, 89);
  rect((windowWidth/2)-350,(windowHeight/2)-225,700,500);

  stroke(40, 40, 40);
  fill(255,255,255);
  rect(g2x-425,g2y-275,150,50,10);
  rect(g2x-425,g2y-200,150,50,10);


  strokeWeight(0.5);
  fill(201, 160, 14);
  textSize(60);
  text('High Score: ' + highScore, g2x-510,g2y-330);
  noStroke();

  //hover over menu button
  if((mouseX > g2x-425) && (mouseX < g2x-425+150)){
    if((mouseY > g2y-275) && (mouseY < g2y-275+50)){
      fill(33, 34, 35);
      if(mouseIsPressed){
        startGame = false;
        go1 = false;
      }
      rect(g2x-425,g2y-275,150,50,10);
    }
  }

  //hover over restart button
  if((mouseX > g2x-425) && (mouseX < g2x-425+150)){
    if((mouseY > g2y-200) && (mouseY < g2y-200+50)){
      fill(33, 34, 35);
      if(mouseIsPressed){
        startGame = true;
        for (let i = 0; i < enemies.length; i++) {
          enemies[i].resetX();
          enemies[i].resetY();
        }
        for (let i = 0; i < enemies.length; i++) {
          enemiesX[i].resetX();
          enemiesX[i].resetY();
        }
        go1 = false;

      }
      rect(g2x-425,g2y-200,150,50,10);
    }
  }

  textSize(40);
  fill(201, 160, 14);
  text('Menu', g2x-392,g2y-236);
  textSize(35);
  text('Restart', g2x-407,g2y-163);
}

class Line {
  constructor(tempX) {
    this.x = tempX;
  }

  move() {
    this.x += 1;
    if(this.x >= windowWidth){
      this.x = 0;
    }
  }

  display() {
    noStroke();
    fill(179, 0, 0);
    rect(this.x,windowHeight-50,20,10)
  }
}

class Line2 {
  constructor(tempX) {
    this.x = tempX;
  }

  move() {
    this.x -= 1;
    if(this.x <= 0){
      this.x = windowWidth;
    }
  }

  display() {
    noStroke();
    fill(179, 0, 0);
    rect(this.x,40,20,10)
  }
}

function movePlayer(){
  if (keyIsDown(87)) {
    g1y -= playerSpeed;
  }

  if (keyIsDown(65)) {
    g1x -= playerSpeed;
  }

  if (keyIsDown(68)) {
    g1x += playerSpeed;
  }

  if (keyIsDown(83)) {
    g1y += playerSpeed;
  }
}

class enemy {
  constructor(nw,nh,speed) {
    this.x = random(nw,nw+690);
    this.y = nh+51;
    this.h = nh;
  }

  move() {
    this.y+=speed;
    if(this.y >= this.h+490){
      this.y = this.h + 51;
      this.x = random(nw,nw+690);
    }
  }

  resetX(){
    this.x = random(nw,nw+690);
  }

  resetY(){
    this.y = nh + 51;
  }

  collision(x,y){
    if(x >= this.x-15 && x <= this.x+15){
      if(y >= this.y-15 && y <= this.y+15){
        return true;
      }
    }
  }

  display() {
    noStroke();
    fill(179, 0, 0);
    rect(this.x,this.y,10,10)
  }
}

class enemyX {
  constructor(nw,nh,speed2) {
    this.x = nw;
    this.y = random(nh+51, nh+490);
    this.w = nw;
  }

  move() {
    this.x+=speed2;
    if(this.x >= this.w+700){
      this.x = nw;
      this.y = random(nh+51, nh+490);
    }
  }

  resetX(){
    this.x = nw;
  }

  resetY(){
    this.y = random(nh+51, nh+490);
  }

  collision(x,y){
    if(x >= this.x-15 && x <= this.x+15){
      if(y >= this.y-15 && y <= this.y+15){
        return true;
      }
    }
  }

  display() {
    noStroke();
    fill(179, 0, 0);
    rect(this.x,this.y,10,10)
  }
}
