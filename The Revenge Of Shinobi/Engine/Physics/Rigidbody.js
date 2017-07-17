//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
// Modificado: 13/07/2017 - Documentação
// TODO: Implementar tratamento de colisão.
//////////////////////////////////////////////////////////////////////////

/**
    * @desc Classe para rigidbody, possui a velociade do objeto.
    * Responsavel pela sua movimentação e interação com o mundo.
*/
class Rigidbody
{
    // Construtor.
    constructor(holder, speedX, speedY, defSpeedX, defSpeedY, accelerationX, accelerationY)
    {
        this.type = "Rigidbody"; // Tipo do objeto.
        this.holder = holder; // Objeto que possui o rigidbody.
        this.speed = new vec2(speedX, speedY); // Velocidade do objeto.
        this.acceleration = new vec2(accelerationX, accelerationY); // Aceleracao do objeto.
        this.defaultSpeed = new vec2(defSpeedX, defSpeedY); // Velocidade padrao do objeto.
        this.angularSpeed = 0; // Velocidade Angular.
        this.mass = 0; // Massa do objeto.
        this.ignoreGravity = false; // Boleano para determinar se o objeto e afetado pela gravidade.
        this.ignoreCollision = false; // Ignorar quando ha uma colisao.
    }
    
    
    //--------------------------------------------------------------------
    // Loop principal.
    //--------------------------------------------------------------------
    
    // Atualisa as variaveis fisicas.
    Update()
    {
        this.UpdateSpeed();
        
        for(var i = 0; i < this.holder.collider.length; i++)
        {
            if(this.holder.collider[i])
            {
                if(!this.ignoreCollision)
                {
                    this.holder.collider[i].CollideWithPlatform();
                }
                else
                {
                    system.DebugWarn(this.holder.type + " IGNORES COLLISION!");
                }
            }
            else
            {
                system.DebugWarn(this.holder.type + " DONT HAVE A COLLIDER!");
            }
        }
        
        this.UpdatePossition();
    }
    
    
    //--------------------------------------------------------------------
    // Funções auxiliares.
    //--------------------------------------------------------------------
    
    CollisionTratament()
    {
        
    }
    
    
    // Atualiza o valor da velocidade de acordo com o tempo, acelereção e gravidade.
    UpdateSpeed()
    {
        this.speed.x += cutDecimal(this.acceleration.x * system.deltaTime);
        this.speed.y += cutDecimal(this.acceleration.y * system.deltaTime);
        if(!this.ignoreGravity)
        {
            this.speed.y += cutDecimal(system.G * system.deltaTime);
        }
    }
    
    
    // Atualiza a posicao de acordo com a velocidade.
    UpdatePossition()
    {
        this.holder.transform.possition.x += cutDecimal(this.speed.x * system.deltaTime);
        this.holder.transform.possition.y += cutDecimal(this.speed.y * system.deltaTime);
    }
}