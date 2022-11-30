var castle, castleImg;
var knight, knightImg;
var knightWalk1, knightWalk1Img,knightWalk2, knightWalk2Img;
var knightAttack1, knightAttack1Img;
var knightAttack2, knightAttack2Img;
var knightDead, knightDeadImg;
var ground;
var enemyIdle, enemyIdleImg;
var enemyTeleport, enemyTeleportImg;
var enemyFly, enemyFlyImg;
var enemyLeftIdle, enemyLeftIdleImg;
var enemyLeftTeleport, enemyLeftTeleportImg;
var edges;
var enemyLife = 200;
var knightLife = 250;





function preload(){
castleImg = loadImage("assets/castelo.jpg");
enemyIdleImg = loadImage("assets/enemyIdle.png");
knightImg = loadImage("assets/rightIdle1.png");
knightWalk1Img = loadAnimation("assets/rightWalk1.png","assets/rightWalk2.png");
knightAttack1Img = loadAnimation("assets/swordAttack1.png","assets/swordAttack2.png","assets/swordAttack3.png","assets/swordAttack4.png","assets/swordAttack5.png","assets/swordAttack6.png");
knightWalk2Img = loadAnimation("assets/leftWalk1.png","assets/leftWalk2.png");
knightAttack2Img = loadAnimation("assets/swordAttack7.png","assets/swordAttack8.png","assets/swordAttack9.png","assets/swordAttack10.png","assets/swordAttack11.png","assets/swordAttack12.png");
knightDeadImg = loadAnimation("assets/die.png");
enemyTeleportImg = loadAnimation("assets/enemyTeleport1.png","assets/enemyTeleport2.png","assets/enemyIdle1.png");
enemyFlyImg = loadAnimation("assets/enemyFly.png");
enemyLeftIdleImg = loadAnimation("assets/enemyLeftIdle.png"); 
enemyLeftTeleportImg = loadAnimation("assets/enemyLeftTeleport.png","assets/enemyLeftTeleport1.png");

enemyTeleportImg.playing = true;
enemyTeleportImg.looping = false
}



function setup(){
createCanvas(1300,650);

knight = createSprite(650,600);
knight.addAnimation("idle",knightImg);
//knightWalk1 = createSprite(650,600);
knight.addAnimation("walking",knightWalk1Img);
knight.addAnimation("attacking",knightAttack1Img);
knight.addAnimation("walk", knightWalk2Img);
knight.addAnimation("attack",knightAttack2Img);
knight.addAnimation("dead",knightDeadImg);

enemyIdle = createSprite (200,500);
enemyIdle.addAnimation("idle",enemyIdleImg);
enemyIdle.addAnimation("tp", enemyTeleportImg);
enemyTeleportImg.frameDelay = 20;
enemyIdle.addAnimation("fly", enemyFlyImg);
enemyIdle.addAnimation("left", enemyLeftIdleImg);
enemyIdle.addAnimation("leftTp", enemyLeftTeleportImg);
enemyLeftTeleportImg.frameDelay = 20;

edges = createEdgeSprites();
ground = createSprite(1300,599);
ground.visible = false;
}

//knight.collide(enemyIdle);
//enemyIdle.collide(knight);

function draw(){
background(castleImg);



if(keyDown(RIGHT_ARROW)){
knight.changeAnimation("idle");
}
else if(keyDown("d")){
    knight.changeAnimation("walking");
    knight.velocityX = +3

    if(knight.collide(enemyIdle)){
        knightLife = knightLife -1;
            }
}
else if(keyDown("space")){
  
    
    knight.velocityY -= 5
    
   
    }
 else if(keyDown("a")){
    knight.changeAnimation("walk");
    knight.velocityX = -3
    if(knight.collide(enemyIdle)){
        knightLife = knightLife -1;
            }
    }
    
 
else if(keyIsDown(UP_ARROW)){
    knight.changeAnimation("attacking");
    knight.velocityX += 0.5;
    if(knight.collide(enemyIdle)){
enemyLife = enemyLife -1;
    }
}
else if(keyIsDown(DOWN_ARROW)){
    knight.changeAnimation("attack");
    knight.velocityX -= 0.5;
    if(knight.collide(enemyIdle)){
        enemyLife = enemyLife -1;
            }
}
else {
knight.changeAnimation("idle");
knight.velocityX = 0
knight.velocityY = +4
}


if (enemyLife === 100){
    //enemyIdle.changeAnimation("tp");
    
    
    enemyIdle.position.x = 1200;
enemyIdle.changeAnimation("left");
    
}



if (enemyLife <= 50){
    
    //enemyIdle.changeAnimation("leftTp");
    
    enemyIdle.position.y = 10
    enemyIdle.position.x = 650
    enemyIdle.changeAnimation("fly");
    enemyIdle.scale = 0.75
}


if (enemyLife <=0){
enemyIdle.destroy();
}
if(knightLife <= 0){
knight.changeAnimation("dead");
}

   
//knight.collide(edges[2]);
//knight.collide(edges[3]);
knight.collide(edges);
enemyIdle.collide(edges);

knight.collide(ground);



   


console.log(knightLife);
//console.log(knightLife);

drawSprites();
}
