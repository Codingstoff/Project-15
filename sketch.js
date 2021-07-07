var PLAY = 1;
var END = 0;
var gamestate = 1;
var background;
var swordimage1;
var alienimage1, alienimage2;
var fruit1, fruit2, fruit3, fruit4;
var gameoverimage;
var gameoverSound, swordSound;
var score = 0;


var fruitGroup, alienGroup;




function preload() {

  swordimage1 = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  alienimage1 = loadAnimation("alien1.png", "alien2.png");
  gameoverimage = loadImage("gameover.png");
  gameoverSound = loadSound("gameover.mp3");
  swordSound = loadSound("knifeSwooshSound.mp3");


}

function setup() {
  createCanvas(600, 600);

  sword = createSprite(40, 200, 20, 20);

  sword.addImage(swordimage1);
  sword.scale = 0.7

  fruitGroup = new Group();
  alienGroup = new Group();
}

function draw() {
  background("lightblue");

  text("Score: " + score, 500, 50);

  if (gamestate === PLAY) {
    
    

    sword.y = mouseY;
    sword.x = mouseX;

    spawnfruits();
    enemy();

    if (fruitGroup.isTouching(sword)) {
      swordSound.play();
      fruitGroup.destroyEach();
      score = score + 2;
    }

    if (sword.isTouching(alienGroup)) {
      gamestate = END;
      gameoverSound.play();
    }







  } else if (gamestate === END) {

    sword.addImage(gameoverimage);
    sword.x = 200;
    sword.y = 200;
    fruitGroup.destroyEach();
    alienGroup.destroyEach();
    fruitGroup.setLifetime = -1;



  }























  drawSprites();
}

function spawnfruits() 
{
  if (World.frameCount % 80 === 0) 
  {
    fruit = createSprite(400, 200, 50, 50);
    fruit.scale = 0.2;

    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 340));

    fruit.lifetime = 100;

    fruitGroup.add(fruit);
    position = Math.round(random(1, 2));

    if (position == 1) {
      fruit.x = 600;
      fruit.velocityX = -7;
      if (score > 4 )
      {
        fruit.velocityX = -(7 + (score / 4));
      }

    } else 
      
    {

      if (position == 2) 
      {
        fruit.x = 0
        fruit.velocityX = 7;
        
         if (score > 4 )
         {
        fruit.velocityX = (7 + (score / 4));
         
         }

    }



  }


}
}

function enemy() 
{
  
  if (World.frameCount % 200 === 0) 
  {
    alien = createSprite(600, 200, 50, 50);
    alien.addAnimation("moving", alienimage1);
    alien.y = Math.round(random(100, 300));
    alien.velocityX = -8;
    if (score > 10)
    {
      alien.velocityX = -(8 +(score / 10));
    }
    
    alien.lifetime = 50;

    alienGroup.add(alien);
  }

}