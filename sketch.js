const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, boy1,boy3;
var backgroundImg,platform;
var boy2, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    boy1 = new Boy1(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    boy3 = new Boy1(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    boy2 = new Boy2(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(boy2.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35);
        fill("white");
        text("Score  " + score, width-300, 50);
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    boy1.display();
    boy1.score();
    log1.display();

    box3.display();
    box4.display();
    boy3.display();
    boy3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    boy2.display();
    platform.display();
    //log6.display();
    slingshot.display();    
    if(gameState=="launched"){
        stroke("white")
        text("press space key to reset",300,25);
    }
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(boy2.body, {x: mouseX , y: mouseY});
}
}
  

function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && boy2.body.speed > 1 || boy2.body.speed > 0.2 ){
      slingshot.attach(boy2.body);  
        Matter.Body.setPosition(boy2.body, {x: 200 , y: 50});
        boy2.trajectory=[];
        gameState="onSling";
    }
   

}


async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Europe/London");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    //if(hour>=0600 && hour<=1900){
        //bg = "sprites/bg1.png";
    //}
    //else{
        //bg = "sprites/bg2.jpg";
    //}
    bg="sprites/bg1.png";

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}