class Shot
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.vx = 2*player.speedX;
        this.vy = 2*player.speedX;
        this.ax = 0;
        this.ay = 0;
        this.w = 10;
        this.h = 10;
    }
    
    Move()
    {
        if(this.y < 6*screen.height/7)
        {
            this.x = this.x + (this.vx + layers[activeLayer].mapaVx) * dt;
            this.y = this.y + this.vy * dt;
        }
        else
        {
            this.x = this.x + layers[activeLayer].mapaVx * dt;
        }
    }
    
    Draw()
    {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}