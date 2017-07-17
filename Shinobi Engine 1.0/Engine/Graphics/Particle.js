//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
// Modificado: 14/07/2017 - Documentação
//////////////////////////////////////////////////////////////////////////


/**
    * @desc Classe para gerar efeitos de particulas.
*/
class Particle extends GameObject
{
    // Construtor.
    constructor(holder, sprite, frameWidth, frameHeight, scaleW, scaleH, deslocX, deslocY, framesX, framesY, fps,
                relativeX, relativeY, angle, width, height, fixed,
                max, interval, duration, particleDuration,
                speedX, speedY, angularSpeed,
                randomized, randomSpaceX, randomSpaceY, angleMin, angleMax)
    {
        super(); // Construtor da classe mãe.
        
        this.type = "Particle"; // Tipo do objeto.
        this.drawOrder = holder.drawOrder + 1; // Ordem de desenho.
        this.holder = holder; // Objeto que possui as particulas.
        this.transform.possition.x = holder.transform.possition.x + relativeX; // Posição x do sistema de particulas.
        this.transform.possition.y = holder.transform.possition.y + relativeY; // Posição y do sistema de particulas.
        this.transform.angle = angle; // Angulo de rotação.
        this.transform.width = width; // Largura dos elementos.
        this.transform.height = height; // Altura dos elementos.
        this.AddComponent(new Rigidbody(this, speedX, speedY, 0, 0, 0, 0)); // Compo rigido para o sistema.
        this.rigidbody.angularSpeed = angularSpeed; // Velocidade angular.
        this.rigidbody.ignoreCollision = true; // Comportamento na colisão.
        this.rigidbody.ignoreGravity = true; // Comportamento gravitacional.
        this.max = max; // Maximo de particulas.
        this.interval = interval; // Intervalo entre as particulas.
        this.duration = duration; // Duração do efeito.
        this.particleDuration = particleDuration; // Duracao de cada particula.
        this.time = 0; // Tempo atual.
        this.intervalTime = this.interval; // Tempo entre as particulas.
        this.relativeX = relativeX; // Posição x relativa ao holder.
        this.relativeY = relativeY; // Posição y relativa ao holder.
        this.particlesCount = 0; // Contador para os elementos de particula.
        this.randomized = randomized; // Boleano para determinar se o sistema é randomico.
        this.randomSpaceX = randomSpaceX; // Intervalo de espaço randomico x.
        this.randomSpaceY = randomSpaceY; // Intervalo de espaço randomico y.
        this.angleMin = angleMin; // Angulo minimo.
        this.angleMax = angleMax; // Angulo maximo.
        this.fixed = fixed; // Boleano para determinar se o sistema esta preso a outro objeto.
        
        // Sprite das particulas.
        this.sprite = sprite;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.scaleW = scaleW;
        this.scaleH = scaleH;
        this.deslocX = deslocX;
        this.deslocY = deslocY;
        this.framesX = framesX;
        this.framesY = framesY;
        this.fps = fps;
    }
    
    //--------------------------------------------------------------------
    // Loop principal.
    //--------------------------------------------------------------------
    
    
    // Inicializa o sistema.
    Start()
    {
        
    }
    
    
    // Atualiza os parametros do sistema.
    Update()
    {
        // Se estiver no tempo de duracao cria uma particula, senao seta
        // o estado para inativo.
        if(this.time < this.duration)
        {
            this.Move();
            
            // Adiciona uma nova particula.
            this.CreateParticle();
            
            // Incrementa o tempo.
            this.time += system.deltaTime;
        }
        else
        {
            this.active = false;
        }
    }
    
    
    // Desenha o centro do gerador de particulas.
    Draw()
    {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.transform.possition.x - 5, this.transform.possition.y - 5, 10, 10);
    }
    
    
    //--------------------------------------------------------------------
    // Funções Secundarias.
    //--------------------------------------------------------------------
    
    
    // Cria uma particula.
    CreateParticle()
    {
        if(this.intervalTime > this.interval)
        {
            system.AddGameObject(new ParticleElement(this));
            this.intervalTime = 0;
            this.particlesCount++;
        }
        else
        {
            this.intervalTime += system.deltaTime;
        }
    }
    
    
    // Move o sistema de particlas para o objeto caso esteja fixada nele.
    Move()
    {
        if(this.fixed)
        {
            this.transform.possition.x = this.relativeX + this.holder.transform.possition.x;
            this.transform.possition.y = this.relativeY + this.holder.transform.possition.y;
        }
    }
}