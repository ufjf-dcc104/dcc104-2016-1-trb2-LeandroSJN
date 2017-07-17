/**
    * @desc Classe para o disparo.
*/
class Shot extends GameObject
{
    // Construtor.
    constructor(x, y)
    {
        super();
        
        this.type = "Shot";
        this.drawOrder = 5;

        this.transform.possition.x = x;
        this.transform.possition.y = y;
        this.transform.width = system.GetObjectsByType("Player").transform.height/6;
        this.transform.height = system.GetObjectsByType("Player").transform.height/24;

        this.AddComponent(new Rigidbody(this, 5*system.GetObjectsByType("Player").rigidbody.defaultSpeed.x, 5*system.GetObjectsByType("Player").rigidbody.defaultSpeed.x, 0, 0, 0, 0));
        this.AddComponent(new BoxCollider(this, 0, 0, 10, 10, 0));
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
        if(this.onPlatform) this.rigidbody.speed.x = 0;
        if(this.CollideWith("Player") || this.CollideWith("PlayerShot"))
        {
            //this.active = false;
        }
    }
    
    
    // Desenha o objeto.
    Draw()
    {
        ctx.save();    
            // Posiciona e rotaciona o canvas para desenhar o objeto.
            ctx.translate(this.transform.possition.x, this.transform.possition.y);
            ctx.rotate(this.transform.angle);
            
            // Desenha o centro.
            //ctx.fillStyle = "yellow";
            //ctx.fillRect(-this.transform.width/2, -this.transform.height/2, this.transform.width, this.transform.height);
            
            // Desenha o sprite.
            system.imgLib.DrawCentered(ctx, "kunai", -this.transform.width/2, -this.transform.height/4, this.transform.width, this.transform.height);
        ctx.restore();
        
        //ctx.fillStyle = "red";
        //ctx.fillRect(this.transform.possition.x, this.transform.possition.y, 1, 1);
    }
}