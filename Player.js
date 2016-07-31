class Player
{
    constructor(id)
    {
        this.w = screen.height/7;
        this.h = screen.height/7;
        this.x = screen.width/2;
        this.y = 6*screen.height/7 - screen.height/14 - 1;
        this.relativeX = this.x;
        this.relativeY = this.y;
        this.xi = 0;
        this.yi = 0;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.jumping = false;
    }
    
    Move(dt, mapa)
    {
        this.vx = this.vx + this.ax * dt;
        this.x = this.x + this.vx * dt;
        this.vy = this.vy + this.ay * dt + G * dt;

        this.xi = Math.floor(this.relativeX / layers[0].TS);
        this.yi = Math.floor(this.y / layers[0].TS);
        
        if(mapa[this.yi + 1][this.xi])
        {
            var foot = this.y + this.h / 2;
            var top = (this.yi + 1) * layers[0].TS;
            this.vy = Math.min(this.vy, Math.abs((top - foot)) / dt);
            if(this.vy == 0)
            {
                this.jumping = false;
            }
        }
        console.log(this.jumping);
        this.y = this.y + this.vy * dt;
    }
    
    Draw()
    {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

        imgLib.drawCentered(ctx, "stoped", this.x, this.y, this.w, this.h);

        ctx.strokeStyle = "red";
        ctx.strokeRect(this.xi * layers[0].TS + layers[0].mapaX, this.yi * layers[0].TS, layers[0].TS, layers[0].TS);

        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x - 5, this.y - 5, 10, 10);
    }
};