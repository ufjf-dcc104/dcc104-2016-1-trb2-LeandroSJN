//////////////////////////////////////////////////////////////////////////
// Autor: Igor Knop
// Criado: 2015
// Modificado: 14/07/2017 - Leandro Dornela Ribeiro:
//                          Documentação.
//                          Alteração de padão.
//////////////////////////////////////////////////////////////////////////


/**
 * @desc Biblioteca de imagens.
 */
class ImageResources
{
    // Construtor
    constructor()
    {
        this.resourcesCount = 0;
        this.resourcesLoaded = 0;
        this.images = {};
        this.loaded = (function(that)
        {
            return function(){
            console.log("Imagem carregada!");
            that.resourcesLoaded++;
            };
        })(this);
    }
    
    
    // Carrega e adiciona uma imagem.
    AddImage(key, url)
    {
        this.resourcesCount++;
        var img =  new Image();
        img.onload = this.loaded;
        img.src = url;
        this.images[key] = img;
    }
    
    
    // Verifica se todas as imagens foram carregadas.
    IsReady()
    {
        return (this.resourcesCount === this.resourcesLoaded);
    }
    
    
    // Desenha uma imagem de forma simples.
    Draw(ctx, key, x, y)
    {
        ctx.drawImage(this.images[key], x, y);
    }
    
    
    // Desenha um sprite animado.
    DrawAnimatedSprite(ctx, key, scale, x, y, w, h, tileSizeX, tileSizeY, tilePosX, tilePosY)
    {   
        ctx.save();
        ctx.scale(scale.x, scale.y);
        ctx.translate(x, y);
        ctx.drawImage(this.images[key],
                      Math.floor(tilePosX)*tileSizeX,
                      Math.floor(tilePosY)*tileSizeY,
                      tileSizeX,
                      tileSizeY,
                      -w/2,
                      -h/2,
                      w,
                      h
        );
        ctx.restore();
    }
    
    
    // Desenha uma imagem centralizada.
    DrawCentered(ctx, key, x, y, w, h)
    {
        ctx.save();
        ctx.translate(x, y);
        ctx.drawImage(this.images[key], -w/2, -h/2, w, h);
        ctx.restore();
    }
    
    
    // Desenha uma imagem rotacionada.
    DrawRotated(ctx, key, x, y, w, h, angle)
    {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.drawImage(this.images[key], -w/2, -h/2);
        ctx.restore();
    }
    
    
    // Desenha uma imagem rotacionada e escalada.
    DrawRotatedScale(ctx, key, x, y, w, h, angle, scale)
    {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.scale(scale, scale);
        ctx.drawImage(this.images[key], -w/2, -h/2);
        ctx.restore();
    }
}
