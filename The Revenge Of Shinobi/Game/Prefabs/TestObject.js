class TestObject extends GameObject
{
    constructor(possitionX, possitionY, scaleX, scaleY)
    {
        super();
        this.type = "TestObject";
        this.active = true;
        this.drawOrder = 100;
        
        // Componentes.
        this.transform.possition.x = possitionX;
        this.transform.possition.y = possitionY;
        this.transform.width = scaleX*system.globalTileSize;
        this.transform.height = scaleY*system.globalTileSize;
        
        this.AddComponent(new BoxCollider(this, 0, 0, this.transform.width, this.transform.height, angle));
        this.AddComponent(new Rigidbody(this, 0, 0, 0.2*screen.height, 0.9*screen.height, 0, 0));

        this.rigidbody.ignoreGravity = true;
    }

    Draw()
    {   
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.transform.possition.x - 5, this.transform.possition.y - 5, 10, 10);
    }
}