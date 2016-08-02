class Enemy
{
    constructor(x, y)
    {
        this.w = screen.height/7;
        this.h = screen.height/7;
        this.x = x;
        this.y = 6*screen.height/7 - screen.height/14 - 1;
        this.xi = 0;
        this.yi = 0;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.state = 2;
        this.active = true;
        this.shots = [];
        this.shotTime = 0;
        this.collider = new BoxCollider(this.x, this.y, this.w/2, this.h);
    }
    
    Move()
    {
        this.x = this.x + (this.vx + layers[activeLayer].mapaVx) * dt;
        this.vy = this.vy + this.ay * dt + G * dt;

        this.xi = Math.floor((this.x -layers[activeLayer].mapaX) / layers[activeLayer].TS);
        this.yi = Math.floor(this.y / layers[activeLayer].TS);
        
        if(layers[activeLayer].mapa[this.yi + 1][this.xi])
        {
            var foot = this.y + this.h / 2;
            var top = (this.yi + 1) * layers[activeLayer].TS;
            this.vy = Math.min(this.vy, Math.abs((top - foot)) / dt);
            if(this.vy == 0)
            {
                this.state = 1;
            }
        }
        this.y = this.y + this.vy * dt;
        
        this.collider.Move(this.x, this.y);
    }
    
    Draw()
    {
        ctx.fillStyle = "rgb(127, 127, 127)";
        //ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

        //imgLib.drawCentered(ctx, "stoped", this.x, this.y, this.w, this.h);

        ctx.strokeStyle = "red";
        ctx.strokeRect(this.xi * layers[activeLayer].TS + layers[activeLayer].mapaX, this.yi * layers[activeLayer].TS, layers[activeLayer].TS, layers[activeLayer].TS);

        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x - 5, this.y - 5, 10, 10);
        
        this.collider.Draw();
    }
}