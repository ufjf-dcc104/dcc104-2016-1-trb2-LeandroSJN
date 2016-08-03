class Aim
{
    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.w = 32;
        this.h = 8;
        this.ang = 0;
    }
    
    Move(x, y)
    {
        this.x = x;
        this.y = y;
    }
    
    Draw()
    {
        var direction = directionalVector(this, player);
        this.vx = 1*direction[0];
        this.vy = 1*direction[1];
        this.ang = angle(this);
        ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(-1, -1);
            ctx.rotate(this.ang);
            imgLib.drawCentered(ctx, "kunai", this.w/2, this.h/4, this.w, this.h);
        ctx.restore();
    }
}