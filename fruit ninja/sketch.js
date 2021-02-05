var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;

var enemyGroup;
var fruitGroup;

function preload(){
  
  swordImage = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  
  alien1= loadAnimation("alien1.png","alien2.png");
 
  gameover = loadImage("gameover.png");
  
  swordSound = loadSound("knifeSwooshSound.mp3");
  
  fruitSmash = loadSound("fruit ninja.mp3");
  
  f = loadSound("f.mp3");
  
  gameOverSound = loadSound("gameover.mp3");
 
}

function setup(){
  
  createCanvas(600,600);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  enemyGroup = createGroup();
  fruitGroup = createGroup();
  
  score = 0;
  
}

function draw(){

  background("lightblue")

  textSize(16);
  textStyle(BOLD);
  text("Score: " + score,300,25);
  
  if(gameState === PLAY)
    {
      
      sword.y=World.mouseY;
      sword.x=World.mouseX;
      
      if(fruitGroup.isTouching(sword))
        {
          fruitGroup.destroyEach();
          
          f.play();
          score=score+2;
        }
      
      if(enemyGroup.isTouching(sword))
        {
          gameState=END;
          gameOverSound.play();
        }
      
        Enemy();
        fruits();
    }
  
  if(gameState === END)
    {
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.velocityX=0;
      enemyGroup.velocityX=0;
      sword.addImage(gameover);
      sword.x=300;
      sword.y=300;
    }
  
  

  
  drawSprites();
}

function fruits(){
  
  if(World.frameCount%80===0)
    {
      position=Math.round(random(1,2))
      fruit=createSprite(500,200,20,20);
      fruit.scale=0.2;

      r=Math.round(random(1,4));
      if (r == 1) {
          fruitSmash.play();
          fruit.addImage(fruit1);
        }else if(r == 2){
          fruitSmash.play();
          fruit.addImage(fruit2);
        }else if(r == 3){
          fruitSmash.play();
          fruit.addImage(fruit3);
        }else{
          fruitSmash.play();
          fruit.addImage(fruit4);
        }
      
      if(position == 1)
        {
          fruit.x=400;
          fruit.velocityX=-(7+(score/4));
        }else{
          
          if(position == 2)
            {
              fruit.x=200;
              
              fruit.velocityX=(7+(score/4));
            }
        }
      
      fruit.y=Math.round(random(50,340));
      fruit.velocityX=-7;
      fruit.setLifetime=100;
      
      
  
      fruitGroup.add(fruit);
    }
}

function Enemy(){
  
  if(World.frameCount%200===0)
    {
      monster=createSprite(400,200,20,20);
      monster.addAnimation("moving", alien1);
      monster.y=Math.round(random(100,300));
      monster.velocityX=-(8+(score/10));
      monster.setLifetime=50;
      
      enemyGroup.add(monster);
    }
  
}
