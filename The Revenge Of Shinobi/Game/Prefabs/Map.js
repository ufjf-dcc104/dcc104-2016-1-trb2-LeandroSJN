/**
    * @desc Classe para controle de um map.
*/
class Map extends GameObject
{
    // Construtor.
    constructor(activeLayer, vx, map, size, color, drawOrder)
    {
        super();
        
        this.type = "Map";
        this.drawOrder = drawOrder;
        this.screenCenterIndex = 0;
        this.color = color;
        this.visible = true;
        
        // Map com a informação de cada tile.
        this.mapa = map;
        
        // Tamanho de um tile.
        this.TS = system.globalTileSize;
        
        // Boleano para saber se e o activeLayer.
        this.activeLayer = activeLayer;

        this.AddComponent(new Rigidbody(this, 0, 0, 0, 0, 0, 0));
        this.rigidbody.ignoreGravity = true;
        this.rigidbody.ignoreCollision = true;
    }
    
    
    //--------------------------------------------------------------------
    // Funções do loop principal.
    //--------------------------------------------------------------------
    
    // Inicializa os parametros.
    Start()
    {
        
    }
    
    
    // Chamado a cada frame. Faz as modificações no objeto.
    Update()
    {
        this.screenCenterIndex = Math.floor((system.screenWidth/2 - this.transform.possition.x)/system.GetObjectBySpecialIndex("ActiveLayer").TS);
    }
    
    
    // Desenha o mapa de acordo com a informação de cada tile.
    Draw()
    {
        for(var i = 0; i < 7; i++)
        {
            for(var j = this.screenCenterIndex - 10; j < this.screenCenterIndex + 10; j++)
            {
                switch(this.mapa[i][j])
                {
                    
                    case 1:
                        system.imgLib.DrawCentered(ctx, "ground", this.transform.possition.x + (this.TS * j) + this.TS/2, this.transform.possition.y + this.TS * i  + this.TS/2 - 0.01 * screen.height, this.TS, this.TS + 0.03 * screen.height);
                    break;
                    case 2:
                        system.imgLib.DrawCentered(ctx, "wall", this.transform.possition.x + (this.TS * j) + this.TS/2, this.transform.possition.y + this.TS * i  + 2*this.TS/2, this.TS, 2*this.TS);
                    break;
                    case 3:
                        system.imgLib.DrawCentered(ctx, "bamboo", this.transform.possition.x + (this.TS * j) + this.TS/2, this.transform.possition.y + this.TS * i  + this.TS/2, this.TS, this.TS);
                    break;
                    case 4:
                        system.imgLib.DrawCentered(ctx, "bamboo2", this.transform.possition.x + (this.TS * j) + this.TS/2, this.transform.possition.y + this.TS * i  + this.TS/2, this.TS, this.TS);
                    break;
                    case 5:
                        system.imgLib.DrawCentered(ctx, "wall2", this.transform.possition.x + (this.TS * j) + this.TS/2, this.transform.possition.y + this.TS * i  + 2*this.TS/2, this.TS, 2*this.TS);
                    break;
                    case 6:
                        system.imgLib.DrawCentered(ctx, "wall3", this.transform.possition.x + (this.TS * j) + this.TS/2, this.transform.possition.y + this.TS * i  + 2*this.TS/2, this.TS, 2*this.TS);
                    break;
                }
            }
        }
    }
}