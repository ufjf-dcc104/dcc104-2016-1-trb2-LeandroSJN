class BoxCollider
{
    constructor(x, y, w, h)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    
    Move(x, y)
    {
        this.x = x - this.w/2;
        this.y = y - this.h/2;
    }
    
    Draw()
    {
        ctx.strokeStyle = "rgb(0, 255, 0)";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
}