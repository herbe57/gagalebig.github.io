// test
var perso;
var perso_walk;
var perso_wait;
var mur = [];
var test = 10;

function preload() {
  perso_sprite_sheet_walk = loadSpriteSheet('asset/sonic_1.png', 48, 48, 6);
  perso_sprite_sheet_wait = loadSpriteSheet('asset/sonic_2.png', 48, 48, 4);
}

function setup() {
  X = 1346; // window.innerWidth-20;
  Y = 605; // window.innerHeight-20;
  x = X/2;
  y = Y/2;
  createCanvas(X,Y);

  perso=createSprite(2*X/3,y,48,48);
  perso.velocity.y = -1;
  perso.jump = 0;
  perso.prevjump = millis();
  perso.prevattack = -1000;
  perso.orientation = 1;

  perso2=createSprite(X/3,y,48,48);
  perso2.velocity.y = -1;
  perso2.jump = 0;
  perso2.prevjump = millis();


  attack = createSprite(perso.position.x,perso.position.y,100,5);

  murGauche = createSprite(-5,Y/2,10+test,Y);
  murDroite = createSprite(X+5,Y/2,10+test,Y);
  murHaut = createSprite(X/2,-5,X,10+test);
  murBas = createSprite(X/2,Y+5,X,10+test);
  murGauche.touche = false;
  murDroite.touche = false;
  murHaut.touche = false;
  murBas.touche = false;
  murGauche.immovable = true;
  murDroite.immovable = true;
  murHaut.immovable = true;
  murBas.immovable = true;
  
  perso_walk=loadAnimation(perso_sprite_sheet_walk);
  perso_wait=loadAnimation(perso_sprite_sheet_wait);
  perso_walk.frameDelay=4;
  perso_wait.frameDelay=4;
  perso.addAnimation("walk",perso_walk);
  perso.addAnimation("wait",perso_wait);
  perso.changeAnimation("wait");

  perso2_walk=loadAnimation(perso_sprite_sheet_walk);
  perso2_wait=loadAnimation(perso_sprite_sheet_wait);
  perso2_walk.frameDelay=4;
  perso2_wait.frameDelay=4;
  perso2.addAnimation("walk",perso_walk);
  perso2.addAnimation("wait",perso_wait);
  perso2.changeAnimation("wait");

}
function draw() {
  background(240);
  perso.addSpeed(0.2, 90);
  perso2.addSpeed(0.2, 90);
  collisions();

  

  if (perso.prevattack+150 < millis()){
    // attack.remove();
  }

  if(keyIsDown(37) && perso.position.x >= -5+30+test/2) {perso.position.x-=3; perso.mirrorX(-1); perso.orientation=-1;}
  if(keyIsDown(39) && perso.position.x <= X+5-30-test/2) {perso.position.x+=3; perso.mirrorX(1); perso.orientation=1;}
  if(keyIsDown(40)) {y-=0}
  if(keyIsDown(38) && perso.jump < 2 && perso.prevjump+250 < millis()) {
    perso.velocity.y = 0;
    perso.addSpeed(7,270); 
    perso.jump ++; 
    perso.prevjump = millis();
  }
  if(keyIsDown(37) ^ keyIsDown(39)) {perso.changeAnimation("walk");}
  if(! (keyIsDown(37) || keyIsDown(39) || keyIsDown(38) || keyIsDown(40))){
    perso.changeAnimation("wait");
  }

  if(keyIsDown(223)){
    perso.prevattack = millis();
  }

  if(perso.prevattack+10 > millis()){
    attack.position.x = perso.position.x + 80*perso.orientation;
    attack.position.y = perso.position.y;
  } else {
    attack.position.x = -500;
    attack.position.y = -500;
  }

  if(keyIsDown(81) && perso2.position.x >= -5+30+test/2) {perso2.position.x-=3; perso2.mirrorX(-1);}
  if(keyIsDown(68) && perso2.position.x <= X+5-30-test/2) {perso2.position.x+=3; perso2.mirrorX(1);}
  if(keyIsDown(83)) {y-=0}
  if(keyIsDown(90) && perso2.jump < 2 && perso2.prevjump+250 < millis()) {
    perso2.velocity.y = 0;
    perso2.addSpeed(7,270); 
    perso2.jump ++; 
    perso2.prevjump = millis();
  }
  if(keyIsDown(81) ^ keyIsDown(68)) {perso2.changeAnimation("walk");}
  if(! (keyIsDown(81) || keyIsDown(68) || keyIsDown(90) || keyIsDown(83))){
    perso2.changeAnimation("wait");
  }


  drawSprites();
  dev();
}


function collisions(){
  murGauche.touchej1 = false;
  murDroite.touchej1 = false;
  murHaut.touchej1 = false;
  murBas.touchej1 = false;
  murGauche.touchej2 = false;
  murDroite.touchej2 = false;
  murHaut.touchej2 = false;
  murBas.touchej2 = false;
  perso.bounce(murGauche,toucherGauchej1);
  perso.bounce(murDroite,toucherDroitej1);
  perso.bounce(murHaut,toucherHautj1);
  perso.bounce(murBas,toucherBasj1);
  perso2.bounce(murGauche,toucherGauchej2);
  perso2.bounce(murDroite,toucherDroitej2);
  perso2.bounce(murHaut,toucherHautj2);
  perso2.bounce(murBas,toucherBasj2);
  perso2.overlap(attack,toucherAttack)
}

//--------------------- Perso 1 ---------------------

function toucherBasj1(){
  murBas.touchej1 = true;
  perso.velocity.y = 0;
  perso.jump = 0;
}
function toucherHautj1(){
  murHaut.touchej1 = true;
}
function toucherDroitej1(){
  murDroite.touchej1 = true;
}
function toucherGauchej1(){
  murGauche.touchej1 = true;
}

//--------------------- Perso 2 ---------------------

function toucherBasj2(){
  murBas.touchej2 = true;
  perso2.velocity.y = 0;
  perso2.jump = 0;
}
function toucherHautj2(){
  murHaut.touchej2 = true;
}
function toucherDroitej2(){
  murDroite.touchej2 = true;
}
function toucherGauchej2(){
  murGauche.touchej2 = true;
;
}
function toucherAttack(){
  perso2.jump = 1;
  perso2.velocity.x = 0;
  perso2.velocity.y = 0;
  perso2.addSpeed(10,270);

}


//---------------------------------------------------

function dev() {
  text(mouseX +" "+ mouseY,mouseX,mouseY);
  text("x: "+floor(perso.position.x) +"\ny: "+ floor(perso.position.y),perso.position.x-20,perso.position.y);
  text("x: "+floor(perso2.position.x) +"\ny: "+ floor(perso2.position.y),perso2.position.x-20,perso2.position.y);
  text("prevjump: "+floor(perso.prevjump)
      +"\nmillis: "+floor(millis())
      +"\njump: "+perso.jump
      +"\nattack.x: "+floor(attack.position.x)

    ,test,test+10)
}