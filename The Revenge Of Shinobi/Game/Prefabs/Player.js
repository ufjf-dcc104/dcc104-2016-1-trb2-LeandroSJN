/**
    * @desc Classe do player, possui os atributos do jogador,
    * controla suas animações, estados e movimentos.
*/
class Player extends GameObject
{
    // Construtor.
    constructor(drawOrder)
    {   
        super();

        this.type = "Player";
        this.onPlatform = true;
        this.moveWithCamera = true;
        this.active = true;
        this.drawOrder = drawOrder;
        
        // Componentes.
        this.transform.possition.x = screen.width/2;
        this.transform.possition.y = screen.height/2;
        this.transform.width = system.globalTileSize;
        this.transform.height = system.globalTileSize;
        
        this.AddComponent(new Health(99999999));
        this.AddComponent(new RangedAttack(10, 9999999, 9999999999, 0.2));
        this.AddComponent(new BoxCollider(this, 0, 0, this.transform.width/8, this.transform.height, angle));
        this.AddComponent(new Rigidbody(this, 0, 0, 0.2*screen.height, 0.9*screen.height, 0, 0));

        this.AddAnimationController();
        this.animation.AddState("parado");
        this.animation.AddState("andando");
        this.animation.AddState("pulando");
        this.animation.SetInitialState("parado");
        this.animation.AddTransition("parado", "andando", ["speed.x"], ['!='], [0]);
        this.animation.AddTransition("andando", "parado", ["speed.x"], ['=='], [0]);
        this.animation.AddTransition("andando", "pulando", ["speed.y"], ['!='], [0]);
        this.animation.AddTransition("parado", "pulando", ["speed.y"], ['!='], [0]);
        this.animation.AddTransition("pulando", "parado", ["speed.y", "speed.x"], ['==', '=='], [0, 0]);
        this.animation.AddTransition("pulando", "andando", ["speed.y", "speed.x"], ['==', '!='], [0, 0]);

        //this.AddRenderComponent("parado", new SpriteAnimation("stopped", 256, 256, 2, 2, 0, 0, 0, 0, 0));
        //this.AddRenderComponent("andando", new SpriteAnimation("walking", 128, 128, 2, 2, 0, 0, 4, 0, 10));
        //this.AddRenderComponent("pulando", new SpriteAnimation("walking", 128, 128, 2, 2, 0, 0, 4, 0, 10));

        this.rigidbody.ignoreGravity = false;

        this.Start();
    }
    
    
    //--------------------------------------------------------------------
    // Funções do loop principal.
    //--------------------------------------------------------------------
    
    // TODO: Inicializar variaveis aqui.
    // Inicializa o player.
    Start()
    {
        var particle = new Particle(this,"exp",256,256,1,1,0,0,8,4,3.75,// Sprite.
                                     0,0,0,256,256, true, // Transform.
                                     1000,0.1,100.71,2.0,100,100, 0,
                                     true, 100, 100, 3*Math.PI/2 - 0.5, 3*Math.PI/2);// Particle.
        
        //system.AddGameObject(particle);// Nao sera destruida com o player.
        //this.AddComponent(particle);// Sera destruida com o player.
    }
    

    // Atualiza os parametros do player.
    Update()
    {
        this.CollisionTreatment();
        //this.transform.scale.x = side(system.GetObjectsByType("Aim"), this);
    }
    
    
    //--------------------------------------------------------------------
    // Funções Secundarias.
    //--------------------------------------------------------------------
    
    
    // Determina oque acontece quando o objeto colide com outro especifico.
    CollisionTreatment()
    {
        if(this.CollideWith("PlayerShot"))
        {
            console.log("player hit");
        }
    }
    
    
    //--------------------------------------------------------------------
    // Controles.
    //--------------------------------------------------------------------
    
    
    // Ações para quando uma tecla é precionada.
    KeyDown(key)
    {
        //if(!this.damaged)
        {
            switch(key)
            {
                case 65:
                    this.rigidbody.speed.x = -this.rigidbody.defaultSpeed.x;
                break;
                case 68:
                    this.rigidbody.speed.x = this.rigidbody.defaultSpeed.x;
                break;
                case 87:
                    this.rigidbody.speed.y = -this.rigidbody.defaultSpeed.y;
                break;
                case 83:
                    this.rigidbody.speed.y = this.rigidbody.defaultSpeed.y;
                break;
                case 32:
                    system.AddGameObject(this.GetComponentByType("RangedAttack").CreatePlayerShot(this));
                break;
            }
        }
    }
    
    
    // Ações para quando uma tecla é solta.
    KeyUp(key)
    {
        //if(!this.damaged)
        {
            switch(key)
            {
                case 65:
                    // Tecla solta, o player para.
                    this.rigidbody.acceleration.x = 0;
                    this.rigidbody.speed.x = 0;
                break;
                case 68:
                    // Tecla solta, o player para.
                    this.rigidbody.acceleration.x = 0;
                    this.rigidbody.speed.x = 0;
                break;
                case 38:
                break;
            }
        }
    }
    
    
    // Ações para click esquerdo do mouse.
    MouseClick(key)
    {
        //if(this.GetComponentByType("RangedAttack").atualTime >= this.GetComponentByType("RangedAttack").refresh && !this.damaged)
        {
            system.AddGameObject(this.GetComponentByType("RangedAttack").CreatePlayerShot(this));
        }
    }
};