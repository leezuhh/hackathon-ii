var player;
var bullets = [];
var enemies = [];
var img;
var lives = 5;
var enemySpeed = 0.3;
var tester;

function preload() {
  img = loadImage('spaceship.png');
  bg = loadImage('bg.jpeg');
}

function setup() {
  createCanvas(windowWidth-50, 600);
  stroke(255);
  background(bg);
  fill(50);
  player = new Character(290, 530, img)
  generateEnemies(20);
  noLoop();
}

function draw() {
  background(bg);
  image(img, player.x, player.y, 60, 60);
  line(3000, 500, 0, 500);

  for (var i = 0; i < bullets.length; i++) {
    circle(bullets[i].x, bullets[i].y, 5);
    bullets[i].y -= 1.9;
    bullets[i].checkY(i);
  }
  if (keyIsDown(LEFT_ARROW)) {
    player.moveLeft();
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.moveRight();
  }

  for (var i = 0; i < enemies.length; i++) {
    fill(0);
    square(enemies[i].x, enemies[i].y, 20);
    //check if bullets are touching enemies
    enemies[i].check(i);
    if (!enemies[i].hit){
      enemies[i].y += enemySpeed;
    }
    else {
      enemies[i].y -= 5;
    }
  }
  checkPosition();

    for(var i= 0; i<lives; i++){
      
      let c = color(255, 0, 0);
      fill(c);
      circle(40+30*i, 570, 20);
    } 

}

class Character {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
  }
  shoot() {
    bullets.push(new Bullet(this.x + 25));
  }

  moveLeft() {
    if (this.x >= 0){
      this.x -= 5;
    }
  }
  moveRight() {
    if (this.x <= displayWidth-110){
      this.x += 5;
    }
  }
}

class Bullet {
  constructor(posX) {
    this.x = posX;
    this.y = player.y;
  }

  checkY(n){
    if (this.y < 0){
      if (bullets.length == 1){
        bullets = [];
      }
      else {
        bullets = bullets.slice(1, bullets.length);
      }
    }
  }
}

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.hit = false;
    this.win = false;
  }

  check(ind) {
    for (var i = 0; i < bullets.length; i++) {

      if (bullets[i].x < this.x+20 && bullets[i].x > this.x-20 && bullets[i].y < this.y+20 && bullets[i].y > this.y-20) {
        console.log("Enemy hit!");
        this.hit = true;
      }
    }
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    player.shoot();
  }
}

function generateEnemies(n) {
  for (var i = 0; i < n; i++) {
    var enemyX = (Math.random() *(displayWidth-75)  + 5);
    var enemyY = (Math.random() * 50 + 5);
    enemies.push(new Enemy(enemyX, enemyY));
  }
}

function checkPosition(){
  var allOut = true;
  var numWins = 0;
  document.getElementById("numWins")
.innerHTML = numWins;

  var numLosses = 0;
  for (var i=0; i<enemies.length; i++){
    var enemyY = enemies[i].y;
    if (enemyY >= 480 && !enemies[i].win){
      console.log("You've been hit!");
      lives--;
      enemies[i].win = true;
    }
    if (enemyY > 0 && !enemies[i].win){
      allOut = false;
    }
  }

  if (allOut){
    strokeWeight(5);
    textSize(100);
    text("YOU WIN!", displayWidth/2-250, 350);
    textSize(20);
    text("Lives left: " + lives, displayWidth/2-35, 450);
    noLoop();
    document.getElementById("reset").style.display = "block";
    numWins += 1;
  }
  if (lives <= 0){
    strokeWeight(5);
    textSize(100);
    text("YOU LOSE!", displayWidth/2-250, 350);
    noLoop();
    document.getElementById("reset").style.display = "block";
       numLosses += 1;
  }
}

function start(){
  loop();
  document.getElementById("start").style.display = "none";
  document.getElementById("slider").style.display = "none";
}

function reset(){
  console.log("Reset successful");
  clear();
  loop();
  lives = 5;
  enemies = [];
  bullets = [];
  generateEnemies(20);
  strokeWeight(1);
}

function changeDifficulty(speed){
  enemySpeed = speed;
}