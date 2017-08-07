//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 26/07/2017
//////////////////////////////////////////////////////////////////////////

class Cursor
{
    constructor(width, height, sprite)
    {
        this.type = "Cursor";
        this.transform = new Transform(this, 0, 0, 0, width, height); // Componente transform.
        this.sprite = sprite;
        this.showCursor;
    }
    
    // Inicializa os parametros.
    Start()
    {
        
    }
    
    
    // Chamado a cada frame. Faz as modificações no objeto.
    Update()
    {
        this.transform.possition.x = system.mousePos.x;
        this.transform.possition.y = system.mousePos.y;
    }
    
    
    // Desenha o objeto.
    Draw()
    {
        //var direction = directionalVector(this, system.GetObjectsByType("Player"));
        //this.rigidbody.speed.x = 1*direction.x;
        //this.rigidbody.speed.y = 1*direction.y;
        //this.transform.angle = angle(this);
        if(this.sprite != "original")
        {
            ctx.save();
                ctx.translate(this.transform.possition.x, this.transform.possition.y);
                ctx.scale(-1, -1);
                ctx.rotate(this.transform.angle);
                system.imgLib.DrawCentered(ctx, this.sprite, this.transform.width/2, this.transform.height/4, this.transform.width, this.transform.height);
            ctx.restore();
        }

        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fillRect(this.transform.possition.x - 2.5, this.transform.possition.y - 2.5, 5, 5);
    }
}