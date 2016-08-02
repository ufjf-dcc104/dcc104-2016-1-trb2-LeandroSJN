class Shot
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.vx = 3*player.speedX;
        this.vy = 3*player.speedX;
        this.ax = 0;
        this.ay = 0;
        this.w = player.h/6;
        this.h = player.h/24;
        this.ang = 0;
        this.active = true;
        this.collider = new BoxCollider(this.x, this.y, this.w/4, this.h);
    }
    
    Move()
    {
        if(this.active)
        {
            if(this.y < 6*screen.height/7)
            {
                this.x = this.x + (this.vx + layers[activeLayer].mapaVx) * dt;
                this.y = this.y + this.vy * dt;
            }
            else
            {
                this.active = false;
            }
        }
        else
        {
            this.x = this.x + layers[activeLayer].mapaVx * dt;
        }
        
        this.collider.Move(this.x, this.y);
    }
    
    Draw()
    {
        ctx.save();    
            ctx.translate(this.x, this.y);
            ctx.rotate(this.ang);
            //ctx.fillStyle = "yellow";
            //ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
            imgLib.drawCentered(ctx, "kunai", -this.w/2, -this.h/4, this.w, this.h);
        ctx.restore();
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, 1, 1);
        
        this.collider.Draw();
    }
}