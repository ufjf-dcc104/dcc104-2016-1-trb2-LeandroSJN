/**
    * @desc Classe para a mira do jogador.
*/
class Aim extends GameObject
{
    // Construtor.
    constructor()
    {
        super();

        this.type = "Aim";
        this.transform.width = 32;
        this.transform.height = 8;
        this.drawOrder = 100;

        this.AddComponent(new Rigidbody(this, 0, 0, 0, 0, 0, 0));
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
        this.transform.MoveInstant(system.mousePos.x, system.mousePos.y);
    }
    
    
    // Desenha o objeto.
    Draw()
    {
        //var direction = directionalVector(this, system.GetObjectsByType("Player"));
        //this.rigidbody.speed.x = 1*direction.x;
        //this.rigidbody.speed.y = 1*direction.y;
        this.transform.angle = angle(this);
        ctx.save();
            ctx.translate(this.transform.possition.x, this.transform.possition.y);
            ctx.scale(-1, -1);
            ctx.rotate(this.transform.angle);
            system.imgLib.DrawCentered(ctx, "kunai", this.transform.width/2, this.transform.height/4, this.transform.width, this.transform.height);
        ctx.restore();
    }
}