class Aim
{
    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.w = 10;
        this.h = 10;
    }
    
    Move(x, y)
    {
        this.x = x;
        this.y = y;
    }
    
    Draw()
    {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}