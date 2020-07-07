//Global Variables
var monkey, monkey_running, ground,groundimg,banana,bananaimg,obstacle, stoneimg, bananasGroup, obstaclesGroup, restart, restartimg, gameover, goimg, jungleimg, jungle, score,rand, invisiground;


function preload(){
  monkey_running =loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  groundimg=loadImage("ground.jpg");
  bananaimg=loadImage("Banana.png");
  stoneimg=loadImage("stone.png");
 /* restartimg=loadImage("restart.png");
  goimg=loadImage("gameOver.png");*/
  jungleimg=loadImage("jungle.jpg");
}

function setup() {
  createCanvas(600,300);
  
  monkey=createSprite(100,230,400,10);
  monkey.addAnimation("monkey",monkey_running);
  
   jungle = createSprite(50,250,600,20);
  jungle.addImage("jungle",jungleimg);
jungle.scale=1;
  jungle.velocityX=-5;
  
  ground=createSprite(300,280,400,10);
  ground.addImage("ground", groundimg);
  ground.scale=0.4;
  ground.velocityX=-5;
  
  invisiground=createSprite(200,280,600,10);
  invisiground.visible=false;
  bananasGroup=createGroup();
  obstaclesGroup=createGroup();
  
  score=0;
}


function draw(){
 background(255); 
  text("Score: ", score, 580,20);
  monkey.scale=0.15;
  monkey.depth=jungle.depth+1;
  monkey.depth=ground.depth+1;
  ground.depth=jungle.depth+1;
   
  if(keyDown("space")&& monkey.y>229) {
    monkey.velocityY = -17;
  }
  monkey.collide(invisiground);
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (monkey.isTouching(bananasGroup))
      {
        score=score+2;
        monkey.scale=monkey.scale+0.1;
      }

  if (monkey.isTouching(obstaclesGroup))
      {
        monkey.scale=monkey.scale-0.1
      }
  
  if (jungle.x<0)
  {
     jungle.x = jungle.width/2;
  }
  
  if (ground.x<0)
  {
    ground.x=ground.width/5;
  }

  spawnBananas();
  spawnObstacles();
  drawSprites();
}

function spawnBananas()
{
  if (frameCount%140===0)
  {
  banana = createSprite(600,100,10,10);
    banana.addImage("banana",bananaimg);
    banana.velocityX=-4;
    banana.scale=0.05
    rand=random(50,200);
    banana.y=rand;
    monkey.depth=banana.depth+1;
    banana.setLifetime=300;
    bananasGroup.add(banana);
  }
}

function spawnObstacles()
{
   if (frameCount%200===0)
  {
    obstacle = createSprite(600,290,10,10);
    obstacle.addImage("ob",stoneimg);
    obstacle.velocityX=-4;
    obstacle.scale=0.2
    obstacle.setLifetime=300;
    obstaclesGroup.add(obstacle);
  }
}