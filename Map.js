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
        this.relativeX = screen.width/2; //indica a posição do centro da camera em relação ao layer
        this.relativeY = 6*screen.height/7 - screen.height/14 - 1;
        this.xi = 0;
        this.visibleTiles = screen.width/this.TS;
    }
    
    MoveMap(dt)
    {
        if(this.id == activeLayer)
        {
            this.mapaVx = this.mapaVx + this.mapaAx * dt;
            this.mapaX = this.mapaX + this.mapaVx * dt;
            this.relativeX = this.relativeX - (this.mapaVx) * dt;
            this.xi = Math.floor(this.relativeX / layers[activeLayer].TS);
        }
        else
        {
            this.mapaVx = (this.size/layers[activeLayer].size) * layers[activeLayer].mapaVx;
            this.mapaX = this.mapaX + this.mapaVx * dt;
            this.relativeX = this.relativeX - (this.mapaVx) * dt;
            this.xi = Math.floor(this.relativeX / layers[activeLayer].TS);
        }
    }
    
    DrawMap()
    {
        for(var i = 0; i < 7; i++)
        {
            for(var j = this.xi - 10; j < this.xi + 10; j++)
            {
                switch(this.mapa[i][j])
                {
                    
                    case 1:
                        imgLib.drawCentered(ctx, "ground", this.mapaX + (this.TS * j) + this.TS/2, this.TS * i  + this.TS/2 - 5, this.TS, this.TS + 10);
                        //ctx.fillStyle = this.color;
                        //ctx.fillRect(this.mapaX + (this.TS * j), this.TS * i, this.TS+1, this.TS+1);
                    break;
                    case 2:
                        imgLib.drawCentered(ctx, "wall", this.mapaX + (this.TS * j) + this.TS/2, this.TS * i  + 2*this.TS/2, this.TS, 2*this.TS);
                    break;
                    case 3:
                        imgLib.drawCentered(ctx, "bamboo", this.mapaX + (this.TS * j) + this.TS/2, this.TS * i  + this.TS/2, this.TS, this.TS);
                    break;
                    case 4:
                        imgLib.drawCentered(ctx, "bamboo2", this.mapaX + (this.TS * j) + this.TS/2, this.TS * i  + this.TS/2, this.TS, this.TS);
                    break;
                    case 5:
                        imgLib.drawCentered(ctx, "wall2", this.mapaX + (this.TS * j) + this.TS/2, this.TS * i  + 2*this.TS/2, this.TS, 2*this.TS);
                    break;
                    case 6:
                        imgLib.drawCentered(ctx, "wall3", this.mapaX + (this.TS * j) + this.TS/2, this.TS * i  + 2*this.TS/2, this.TS, 2*this.TS);
                    break;
                }
            }
        }
    }
}