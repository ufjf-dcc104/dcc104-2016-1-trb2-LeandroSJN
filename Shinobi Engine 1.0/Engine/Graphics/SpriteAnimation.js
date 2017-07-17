//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
// Modificado: 14/07/2017 - Documentação
//////////////////////////////////////////////////////////////////////////


/**
    * @desc Classe para desenhar um sprite animado.
*/
class SpriteAnimation
{
    // Construtor.
    constructor(sprite, tileWidth, tileHeight, scaleW, scaleH, deslocX, deslocY, framesX, framesY, FPS)
    {
        this.sprite = sprite; // Nome do sprite.
        this.tileWidth = tileWidth; // Largura do sprite.
        this.tileHeight = tileHeight; // Altura do sprite.
        this.scaleW = scaleW; // Escala da largura.
        this.scaleH = scaleH; // Escala da altura.
        this.deslocX = deslocX; // Deslocamento x do centro.
        this.deslocY = deslocY; // Deslocamento y do centro.
        this.framesX = framesX; // Quantidade de quandros em linhas.
        this.framesY = framesY; // Quantidade de quadros em colunas.
        this.FPS = FPS; // Quadros por segundo.
        this.tilePosX = 0; // Coluna onde está o frame atual.
        this.tilePosY = 0; // Linha onde está o frame atual.
        this.tickCount = 0; // Contador de relogio.
    }
    
    
    // Controla qual quadro será desenhado e o desenha usando a função da system.imgLib.
    Draw(scale, holder)
    {
        if(holder.type == "Transform")
        {
            system.imgLib.DrawAnimatedSprite(ctx, this.sprite, scale, scale.x * holder.possitionX, holder.possitionY, this.scaleW*holder.width, this.scaleH*holder.height, this.tileWidth, this.tileHeight, this.tilePosX, this.tilePosY);
        
            this.tickCount += 1;

            if (this.tickCount > this.FPS)
            {
                this.tickCount = 0;

                if (this.tilePosX <  this.framesX - 1) this.tilePosX += 1;
                else
                {
                    this.tilePosX = 0;
                
                    if (this.tilePosY <  this.framesY - 1) this.tilePosY += 1;
                    else this.tilePosY = 0;
                }
            }
            
            //ctx.fillStyle = "yellow";
            //ctx.fillRect(holder.possitionX - 5, holder.possitionY - 5, 10, 10);
        }
        else
        {
            system.imgLib.DrawAnimatedSprite(ctx, this.sprite, scale, scale.x * holder.transform.possition.x, holder.transform.possition.y, this.scaleW*holder.transform.width, this.scaleH*holder.transform.height, this.tileWidth, this.tileHeight, this.tilePosX, this.tilePosY);
        
            this.tickCount += 1;

            if (this.tickCount > this.FPS)
            {
                this.tickCount = 0;

                if (this.tilePosX <  this.framesX - 1) this.tilePosX += 1;
                else
                {
                    this.tilePosX = 0;
                
                    if (this.tilePosY <  this.framesY - 1) this.tilePosY += 1;
                    else this.tilePosY = 0;
                }
            }
            
            //ctx.fillStyle = "yellow";
            //ctx.fillRect(holder.transform.possition.x - 5, holder.transform.possition.y - 5, 10, 10);
        }
    }
}