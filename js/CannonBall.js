class CannonBall{
    constructor(x,y){
        var options = {
            isStatic: true
        }
        this.x = x
        this.y = y
        this.r = 62
        this.tranjictory = []
        this.body = Bodies.circle(x,y,this.r,options)
        this.image = loadImage("cannon.png")
        World.add(world, this.body)
    }
    display(){
        push()
        imageMode(CENTER)
        image(this.image,this.body.position.x,this.body.position.y,this.r,this.r)
        pop()
        if (this.body.velocity.x > 0 && this.body.position.x > 10){
            var position = [this.body.position.x,this.body.position.y]
            this.tranjictory.push(position)
        }
        for(var i = 0; i < this.tranjictory.length; i++){
            image (this.image,this.tranjictory[i][0],this.tranjictory[i][1],10,10)
        }
    }
    shoot(){
        var newAngle = cannon.angle-20
        newAngle = newAngle * (3.14/180)
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5)
        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body,{
            x:velocity.x * (180/3.14),
            y:velocity.y * (180/3.14)
        })
    }
}