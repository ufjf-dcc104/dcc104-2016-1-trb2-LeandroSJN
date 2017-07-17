//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
// Modificado: 14/07/2017 - Documentação
//////////////////////////////////////////////////////////////////////////


/**
    * @desc Classe para um elemento que compoe um sistema de partculas.
*/
class ParticleElement extends GameObject
{
    // Construtor.
    constructor(particleSistem)
    {
        super(); // Construtor da classe mãe.
        this.type = "ParticleElement"; // Tipo do objeto.
        this.particleSistem = particleSistem; // Sistema de particulas ao qual a particula pertence.
        this.drawOrder = this.particleSistem.drawOrder + this.particleSistem.particlesCount; // Ordem de desenho da particula.
        this.duration = particleSistem.particleDuration; // Duração da particula.
        this.time = 0; // Tempo atual.
        this.size = 1; // Escala da particula.

        // Animação da particula.
        this.AddAnimationController();
        this.animation.AddState("idle");
        this.animation.SetInitialState("idle");
        this.AddRenderComponent("idle", new SpriteAnimation(this.particleSistem.sprite, this.particleSistem.frameWidth, this.particleSistem.frameHeight,
                                                            this.particleSistem.scaleW, this.particleSistem.scaleH, this.particleSistem.deslocX, this.particleSistem.deslocY,
                                                            this.particleSistem.framesX, this.particleSistem.framesY, this.particleSistem.fps));

        this.Start();
    }
    
    //--------------------------------------------------------------------
    // Loop principal.
    //--------------------------------------------------------------------
    
    
    // Inicializa a particula.
    Start()
    {
        // Se for randomizado gera parametros iniciais aleatorios.
        if(this.particleSistem.randomized)
        {
            var angle = RandomAngle(this.particleSistem.angleMin, this.particleSistem.angleMax);
            var direction = AngleToDirection(angle);
            var possition = RandomInQuad(this.particleSistem.transform.possition, this.particleSistem.randomSpaceX, this.particleSistem.randomSpaceY);
            
            this.transform.possition.x = possition.x;
            this.transform.possition.y = possition.y;
            this.transform.angle = 0;
            this.transform.width = this.size*this.particleSistem.transform.width;
            this.transform.height = this.size*this.particleSistem.transform.height;
            
            this.AddComponent(new Rigidbody(this, direction.x*this.particleSistem.rigidbody.speed.x, direction.y*this.particleSistem.rigidbody.speed.y, 0, 0, 0, 0));
            this.rigidbody.ignoreGravity = true;
            this.rigidbody.ignoreCollision = true;
        }
        else
        {
            this.transform.possition.x = this.particleSistem.transform.possition.x;
            this.transform.possition.y = this.particleSistem.transform.possition.y;
            this.transform.angle = this.particleSistem.transform.angle;
            this.transform.width = this.particleSistem.transform.width;
            this.transform.height = this.particleSistem.transform.height;
            
            this.AddComponent(new Rigidbody(this, this.particleSistem.rigidbody.speed.x, this.particleSistem.rigidbody.speed.y, 0, 0, 0, 0));
        }
        this.active = true;
        this.draw = false;
    }
    
    
    // Atualiza os parametros da particula.
    Update()
    {
        if(this.time < this.duration)
        {
            // Incrementa o tempo.
            this.time += system.deltaTime;
        }
        else
        {
            this.active = false;
        }
    }
    
    
    // Desenha o centro da particula.
    Draw()
    {   
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.transform.possition.x - 5, this.transform.possition.y - 5, 5, 5);
    }
}