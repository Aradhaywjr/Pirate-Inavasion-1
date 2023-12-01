

class Cannon{
    constructor(x,y,width,height,angle){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.angle = angle
        this.cannonImage = loadImage("canon.png")
        this.cannonBaseImage = loadImage("cannonBase.png");
    }
    display(){
        if (keyIsDown(RIGHT_ARROW) && this.angle < 70){
            this.angle += 1
        }
        if (keyIsDown(LEFT_ARROW) && this.angle > -30){
            this.angle -= 1
        }
        push ()
        translate (this.x,this.y)
        rotate (this.angle)
        imageMode(CENTER)
        image(this.cannonImage,0,0,this.width,this.height)
        pop()
        image(this.cannonBaseImage,70,20,200,200)
    }
    remove(index){
        Matter.Body.setVelocity(this.body,{x:0, y:0})
        setTimeout(() =>{
            Matter.World.remove(world, this.body)
            delete balls[index]
        },1000)
    }
}