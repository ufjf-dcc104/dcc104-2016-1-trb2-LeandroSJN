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
        this.state = 1; //1-stopped, 2-juming, 3-shoting, 4-jumping shoting
        this.active = true;
        this.onPlatform = true;
        this.shots = [];
        this.shotTime = 0;
        this.shotAnimation = 0.3;
        this.collider = new BoxCollider(this.x, this.y, this.w/8, this.h);
    }
    
    Move()
    {
        this.x = this.x + (this.vx + layers[activeLayer].mapaVx) * dt;
        this.vy = this.vy + this.ay * dt + G * dt;

        this.xi = Math.floor((this.x -layers[activeLayer].mapaX) / layers[activeLayer].TS);
        this.yi = Math.floor(this.y / layers[activeLayer].TS);
        
        if(layers[activeLayer].mapa[this.yi + 1][this.xi] == 2 || layers[activeLayer].mapa[this.yi + 1][this.xi] == 1)
        {
            var foot = this.y + this.h / 2;
            var top = (this.yi + 1) * layers[activeLayer].TS;
            this.vy = Math.min(this.vy, Math.abs((top - foot)) / dt);
            if(this.vy == 0)
            {
                this.onPlatform = true;
                if(this.state == 2 || this.state == 5)
                {
                    audioLib.play("landing");
                }
            }
        }
        this.y = this.y + this.vy * dt;
        
        this.collider.Move(this.x, this.y);
    }
    
    Draw()
    {
        ctx.save();
            var scale = 1;    
            if(player.x < this.x)
            {
                scale = -1;
            }
            ctx.scale(scale,1);
            switch(this.state)
            {
                case 1:
                    imgLib.drawCentered(ctx, "enemyStopped", scale*this.x, this.y, this.w, this.h);
                break;
                case 2:
                    imgLib.drawCentered(ctx, "enemyJumping", scale*this.x, this.y, this.w, this.h);
                break;
                case 3:
                    imgLib.drawCentered(ctx, "enemyShoting", scale*this.x, this.y, this.w, this.h);
                break;
                case 4:
                    imgLib.drawCentered(ctx, "enemyJumpingShoting", scale*this.x, this.y, this.w, this.h);
                break;
            }
        ctx.restore();

        //ctx.strokeStyle = "red";
        //ctx.strokeRect(this.xi * layers[activeLayer].TS + layers[activeLayer].mapaX, this.yi * layers[activeLayer].TS, layers[activeLayer].TS, layers[activeLayer].TS);

        //ctx.fillStyle = "yellow";
        //ctx.fillRect(this.x - 5, this.y - 5, 10, 10);
        
        //this.collider.Draw();
    }
}