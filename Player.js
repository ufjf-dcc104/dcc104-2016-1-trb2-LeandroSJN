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
        this.state = 1; //1-stoped, 2-jumping, 3-walking, 4-shoting, 5-jumping shoting
        this.active = true;
        this.hp = 100;
        this.ammo = 100;
        this.maxAmmo = 100;
        this.shots = [];
        this.speedX = 0.3*screen.height;
        this.speedY = 0.9*screen.height;
        this.collider = new BoxCollider(this.x, this.y, this.w/2, this.h);
        this.shotAnimation = 0.3;
        this.shotTime = this.shotAnimation;
    }
    
    Move(dt, mapa)
    {
        this.vx = this.vx + this.ax * dt;
        this.x = this.x + this.vx * dt;
        this.vy = this.vy + this.ay * dt + G * dt;

        this.xi = Math.floor((layers[activeLayer].relativeX + this.x - screen.width/2) / layers[activeLayer].TS);
        this.yi = Math.floor(this.y / layers[activeLayer].TS);
        
        if(layers[activeLayer].mapa[this.yi + 1][this.xi] == 2 || layers[activeLayer].mapa[this.yi + 1][this.xi] == 1)
        {
            var foot = this.y + this.h / 2;
            var top = (this.yi + 1) * layers[activeLayer].TS;
            this.vy = Math.min(this.vy, Math.abs((top - foot)) / dt);
            if(this.vy == 0 && this.state == 2)
            {
                this.state = 1;
            }
        }
        this.y = this.y + this.vy * dt;
        
        this.collider.Move(this.x, this.y);
    }
    
    Draw()
    {
        switch(this.state)
        {
            case 1:
                imgLib.drawCentered(ctx, "stoped", this.x, this.y, this.w, this.h);
            break;
            case 2:
                imgLib.drawCentered(ctx, "jumping", this.x, this.y, this.w, this.h);
            break;
            case 3:
                imgLib.drawCentered(ctx, "walking", this.x, this.y, this.w, this.h);
            break;
            case 4:
                imgLib.drawCentered(ctx, "shoting", this.x, this.y, this.w, this.h);
            break;
            case 5:
                imgLib.drawCentered(ctx, "jumpingShoting", this.x, this.y, this.w, this.h);
            break;
        }

        ctx.strokeStyle = "red";
        ctx.strokeRect(this.xi * layers[activeLayer].TS + layers[activeLayer].mapaX, this.yi * layers[activeLayer].TS, layers[activeLayer].TS, layers[activeLayer].TS);

        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x - 5, this.y - 5, 10, 10);
        
        this.collider.Draw();
    }
};