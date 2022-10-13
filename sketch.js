var bird , birdImg;;
var bgImg;
var pipe1 , pipe2;
var pipe
var gameOverImg , gameOver;
var retry , retryImg;;

var notTouching = 1; 
var touching = 0;
var gameState = notTouching;

var score = 0;


function preload(){
    bgImg = loadImage("bg.png");
    pipe1 = loadImage("pipe.png");
    pipe2 = loadImage("pipeFlip.png");
    birdImg = loadImage("vishwanksbird.png");
    gameOverImg = loadImage("gameOver.png");
    retryImg = loadImage("retryboissimvshwnk.png");

}

function setup(){
    createCanvas(windowWidth,windowHeight);

    bird = createSprite(200,100,20,20);
    bird.addImage(birdImg);
    bird.scale = 0.04;

    gameOver = createSprite(windowWidth/2,windowHeight/2,30,30);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.3;
    gameOver.visible = false;

    retry = createSprite(90,110,20,30);
    retry.visible = false;
    retry.addImage(retryImg);
    retry.scale = 0.4;

    pipe1Group = new Group();
    pipe2Group = new Group();
}

function draw(){
    background(bgImg);

    bird.debug = true;

    if (mousePressedOver(retry)){
        reset();
    }

    if (gameState === notTouching){
        spawnPipe1();
        spawnPipe2();
        
        score = score+Math.round(getFrameRate()/50) ;
        
        if (keyDown("space")){
            bird.velocityY = -10;
        }

        bird.velocityY = bird.velocityY+0.5;

        if (pipe2Group.isTouching(bird) || pipe1Group.isTouching(bird) || bird.y>windowHeight){
            gameState = touching
        }

    }

    else if(gameState === touching){
            bird.velocityY = 0;

            pipe1Group.setVelocityXEach(0);
            pipe2Group.setVelocityXEach(0);
            gameOver.visible = true;   
            retry.visible = true;
        }

    drawSprites();
   fill("red")
    textSize(25)
    text("Score : "+score ,40 ,50 );
}


function reset(){
    gameOver.visible = false;
    retry.visible = false;
    gameState = notTouching;
    pipe1Group.destroyEach();
    pipe2Group.destroyEach();
    bird.x = 200;
    bird.y = 100;
    score = 0;
}



function spawnPipe1(){
    if (frameCount % 50=== 0){
 var pipe = createSprite(windowWidth,random(-90 , 90) , 20 , random(100,600));
pipe.velocityX = -8;
 pipe.addImage(pipe1);
 image(pipe1 , pipe.x , pipe.y , pipe1.width , random(100,500));
       
 pipe.scale = 0.7
        
 pipe1Group.add(pipe);
       
    }
}

function spawnPipe2(){
if (frameCount % 50=== 0){
 var pipe = createSprite(windowWidth,random(650 ,550) , 20 , random(100,600));
pipe.velocityX = -8; 
 pipe.addImage(pipe2);
image(pipe1 , pipe.x , pipe.y , pipe2.width , random(100,500));
  pipe.scale = 0.7;
  pipe2Group.add(pipe);
        
    }
}