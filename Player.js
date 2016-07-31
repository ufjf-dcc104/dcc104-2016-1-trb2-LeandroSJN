class Player
{
    constructor(id)
    {
        this.w = screen.height/7;
        this.h = screen.height/7;
        this.x = screen.width/2;
        this.y = 6*screen.height/7 - screen.height/14 - 1;
        this.xi = 0;
        this.yi = 0;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.jumping = false;
        this.shots = [];
        this.speedX = 0.5*screen.height;
        this.speedY = 0.7*screen.height;
    }
    
    Move(dt, mapa)
    {
        this.vx = this.vx + this.ax * dt;
        this.x = this.x + this.vx * dt;
        this.vy = this.vy + this.ay * dt + G * dt;

        this.xi = Math.floor(layers[activeLayer].relativeX / layers[activeLayer].TS);
        this.yi = Math.floor(this.y / layers[activeLayer].TS);
        
        if(mapa[this.yi + 1][this.xi])
        {
            var foot = this.y + this.h / 2;
            var top = (this.yi + 1) * layers[activeLayer].TS;
            this.vy = Math.min(this.vy, Math.abs((top - foot)) / dt);
            if(this.vy == 0)
            {
                this.jumping = false;
            }
        }
        this.y = this.y + this.vy * dt;
    }
    
    Draw()
    {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

        imgLib.drawCentered(ctx, "stoped", this.x, this.y, this.w, this.h);

        ctx.strokeStyle = "red";
        ctx.strokeRect(this.xi * layers[activeLayer].TS + layers[activeLayer].mapaX, this.yi * layers[activeLayer].TS, layers[activeLayer].TS, layers[activeLayer].TS);

        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x - 5, this.y - 5, 10, 10);
    }
};