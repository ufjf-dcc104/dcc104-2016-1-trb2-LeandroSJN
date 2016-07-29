function GameObject()
{
    this.x = 110;
    this.y = 115;
    this.ratio = 16;
    this.vx = 0;
    this.ax = 0;
    this.vy = 0;
    this.ay = 0;
    this.cor = 'lightgrey';

    GameObject.prototype.Move = function()
    {
        this.vx = this.vx + this.ax*dt;
        this.x = this.x + this.vx*dt;
        this.vy = this.vy + this.ay*dt;
        this.y = this.y + this.vy*dt;
    }

    GameObject.prototype.Draw = function()
    {
        ctx.fillStyle = this.cor;
        ctx.strokeStyle = "rgb(150, 50, 50)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ratio, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    GameObject.prototype.WallCollision = function()
    {
        if(this.x < this.ratio)
        {
            this.x = this.ratio;
            this.vx = 0;
            this.ax = 0;
        }
        if(this.x > screen.width-this.ratio)
        {
            this.x = screen.width-this.ratio;
            this.vx = 0;
            this.ax = 0;
        }
        if(this.y < this.ratio)
        {
            this.y = this.ratio;
            this.vy = 0;
            this.ay = 0;
        }
        if(this.y > screen.height-this.ratio)
        {
            this.y = screen.height-this.ratio;
            this.vy = 0;
            this.ay = 0;
        }
    }

    GameObject.prototype.CircularCollision = function(object)
    {
        var distance = Math.sqrt(Math.pow(object.x - this.x, 2) + Math.pow(object.y - this.y, 2));
        return distance<(object.ratio+this.ratio);
    }
    
    GameObject.prototype.RectangularCollision = function(object)
    {
        if((this.y + 2*this.ratio) < (object.y))
        {
            return false;
        }
        if((this.y) > (object.y + 2*object.ratio))
        {
            return false;
        }
        if((this.x + 2*this.ratio) < (object.x))
        {
            return false;
        }
        if((this.x) > (object.x + 2*object.ratio))
        {
            return false;
        }
        return true;
    }
}
