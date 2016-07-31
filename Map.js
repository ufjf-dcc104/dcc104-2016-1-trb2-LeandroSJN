class Map
{
    constructor(id, vx, map, size, color)
    {
        this.id = id;
        this.TS = screen.height/7;          
        this.mapaX = 0;
        this.mapaVx = vx;
        this.mapaAx = 0;
        this.size = size;
        this.mapa = map;
        this.visible = true;
        this.color = color;
        this.relativeX = screen.width/2;
        this.relativeY = 6*screen.height/7 - screen.height/14 - 1;
        this.xi = 0;
        this.visibleTiles = screen.width/this.TS;
    }
    
    MoveMap(dt)
    {
        if(this.mapaX <= 0)
        {
            if(this.id == activeLayer)
            {
                this.mapaVx = this.mapaVx + this.mapaAx * dt;
                this.mapaX = this.mapaX + this.mapaVx * dt;
                this.relativeX = this.relativeX - this.mapaVx * dt;
                this.xi = Math.floor(this.relativeX / layers[activeLayer].TS);
            }
            else
            {
                this.mapaVx = (this.size/layers[activeLayer].size) * layers[activeLayer].mapaVx;
                this.mapaX = this.mapaX + this.mapaVx * dt;
                this.relativeX = this.relativeX - this.mapaVx * dt;
                this.xi = Math.floor(this.relativeX / layers[activeLayer].TS);
            }
        }
        else
        {
            this.relativeX = screen.width/2;
            this.mapaX = 0;
        }
    }
    
    DrawMap()
    {
        for(var i = 0; i < 7; i++)
        {
            for(var j = this.xi - 10; j < this.xi + 10; j++)
            {
                if(this.mapa[i][j] == 1)
                {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(this.mapaX + (this.TS * j), this.TS * i, this.TS+1, this.TS+1);
                }
            }
        }
    }
}