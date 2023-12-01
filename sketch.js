const Bodies = Matter.Bodies
const World = Matter.World
const Engine = Matter.Engine


let engine;
let world;
let ground
let boat;
let tower
let cannon
let angle 
let cannonBall
let boatAnimation = []
let boatSpriteData
let boatSpriteSheet

let bgImg;

let towerImg;

let canvas;

var balls = []

var boats = []

var numbers = [2023,2020,2017,2016]
console.log(numbers)
numbers.push(1985)
console.log(numbers)
numbers.pop()
console.log(numbers)

function preload() {
    bgImg = loadImage("background.gif");
    towerImg = loadImage("tower.png");
    boatSpriteSheet = loadImage("Assets/ship-sailing.png")
    boatSpriteData = loadJSON("Assets/ship-sailing.json")
}

function setup(){
    canvas = createCanvas(1200,600)
    engine = Engine.create();
    world = engine.world;

    angleMode(DEGREES)
    angle = 15

    options = {
        isStatic: true
    }

    ground = Bodies.rectangle(0,height - 1,2600,1,options);
    World.add(world, ground);


    tower = Bodies.rectangle(160,350,160,310,options);
    World.add(world, tower);

    cannon = new Cannon(180,110,130,100,angle)

    let boatFrames = boatSpriteData.frames;

    for(i = 0; i < boatFrames.length; i++){
        var pos = boatFrames[i].position
        var img = boatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h)
        boatAnimation.push(img)
    }
    
}

function draw(){
    image(bgImg,0,0,width,height)
    Engine.update(engine);
    rect(ground.position.x,ground.position.y,2600,1);
    push ()
    imageMode(CENTER);
    image(towerImg,tower.position.x,tower.position.y,160,310);
    pop ()
    cannon.display();

    showBoats()

    for(var i = 0; i < balls.length; i++){
        showCannonBalls(balls[i]);
        collision_with_boat(i);
    }
    
}

function showCannonBalls(ball) {
    if (ball){
        ball.display()
    }
}

function showBoats(){
    if(boats.length > 0){
        if(boats[boats.length - 1] === undefined || boats[boats.length - 1].body.position.x < width - 300){
        var positions = [-40,-60,-70,-20]
        var position = random(positions)
        var boat = new Boat(width,height -100,170,170,position,boatAnimation)
        boats.push(boat)
        }
        for(var i = 0; i < boats.length; i++){
            if(boats[i]){
                Matter.Body.setVelocity(boats[i].body,{x: -1.2, y:0})
                boats[i].display();
                boats[i].animate();
            }
        }
    }
    else{
        var boat = new Boat(width,height -100,170,170,-60,boatAnimation)
        boats.push(boat)
    }
}

function keyReleased(){
    if (keyCode === DOWN_ARROW){

        balls[balls.length-1].shoot();
    }
}

function keyPressed() {
    if (keyCode === DOWN_ARROW){
        cannonBall = new CannonBall(cannon.x,cannon.y)
        
        balls.push(cannonBall)

    }
}

function collision_with_boat(index){
    for(var i = 0; i < boats.length; i++)
    {
        if(balls[index] !== undefined && boats[i] !== undefined ){
            var collision = Matter.SAT.collides(balls[index].body,boats[i].body)
            if(collision.collided){
                boats[i].remove(i)
                Matter.World.remove(world, balls[index].body)
                delete balls[index]
            }
        }
    }
}