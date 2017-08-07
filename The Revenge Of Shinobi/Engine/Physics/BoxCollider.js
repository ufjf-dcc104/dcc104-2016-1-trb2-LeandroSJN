//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
// TODO: Implementação da nova detecção de colisão.
// Modificado: 13/07/2017 - Documentação
//////////////////////////////////////////////////////////////////////////

/**
    * @desc Classe para colisor retangular.
*/
class BoxCollider extends Collider
{
    // Construtor.
    constructor(holder, relativeX, relativeY, width, height, angle)
    {
        // Construtor da classe mãe.
        super(holder, width, height, relativeX, relativeY, angle);
        
        this.type = "BoxCollider"; // Tipo do colisor.
        this.speedBefore = new vec2(0, 0); // Velocidade antes da colisao.
        this.onCollision = false; // Verdadeiro quando o objeto acabou de colidir.
        this.collisionSide; // Lado da colisao.
    }
    
    
    //--------------------------------------------------------------------
    // Loop principal.
    //--------------------------------------------------------------------

    // Atualisa a posição do collider de acordo com a posição do holder.
    Update()
    {
        this.transform.possition.x = this.relativePossition.x + this.holder.transform.possition.x;
        this.transform.possition.y = this.relativePossition.y + this.holder.transform.possition.y;
    }
    
    
    // Exibe graficamente o collider.
    Draw()
    {
        ctx.strokeStyle = "rgb(0, 255, 0)";
        ctx.strokeRect(this.transform.possition.x - this.transform.width/2, this.transform.possition.y - this.transform.height/2, this.transform.width, this.transform.height);

        ctx.fillStyle = "rgb(0, 255, 0)";
        if(this.c) ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fillRect(this.transform.possition.x - 2.5, this.transform.possition.y - 2.5, 5, 5);
    }
    

    //--------------------------------------------------------------------
    // Funções de deteccao de colisao.
    //--------------------------------------------------------------------

    // Detecta e trata uma colisao.
    Collides(collider)
    {
        if(!this.onCollision)
        {
            this.CillideWithCollider(collider);
        }
        else
        {
            this.CollisionReaction(collider);
        }
    }

    
    // Determina se houve uma colisao e qual foi o lado.
    CillideWithCollider(collider)
    {
        collisionSystem.totalTests++;
        
        var dif;
        var speedRes;
        var hWidth = this.transform.width/2;
        var hHeight = this.transform.height/2;
        var cWidth = collider.transform.width/2;
        var cHeight = collider.transform.height/2;

        // TODO: Terminar a nova implementação.
        /*if(this.transform.possition.y - c1Height <= collider.transform.possition.y + c2Height && this.transform.possition.y + c1Height >= collider.transform.possition.y - c2Height)
        {
            if(this.holder.rigidbody.speed.x > 0)
            {
                distance = ((collider.transform.possition.x - c2Width) - (this.transform.possition.x + c1Width))/system.deltaTime;
                speedRes = this.holder.rigidbody.speed.x - collider.holder.rigidbody.speed.x;
                
                if((distance > 0) && ((speedRes) >= distance))
                {
                    this.holder.rigidbody.speed.x = distance;
                }
            }
            else if(this.holder.rigidbody.speed.x < 0)
            {
                distance = ((this.transform.possition.x - c1Width) - (collider.transform.possition.x + c2Width))/system.deltaTime;

                if((distance >= 0) && ((collider.holder.rigidbody.speed.x - this.holder.rigidbody.speed.x) >= distance))
                {
                    
                }
            }
        }
        
        if(this.transform.possition.x - c1Width <= collider.transform.possition.x + c2Width && this.transform.possition.x + c1Width >= collider.transform.possition.x - c2Width)
        {
            if(this.holder.rigidbody.speed.y > 0)
            {
                distance = ((collider.transform.possition.y - c2Height) - (this.transform.possition.y + c1Height))/system.deltaTime;

                if((distance >= 0) && ((this.holder.rigidbody.speed.y - collider.holder.rigidbody.speed.y) >= distance))
                {
                    
                }
            }
            else if(this.holder.rigidbody.speed.y < 0)
            {
                distance = ((this.transform.possition.y - c1Height) - (collider.transform.possition.y + c2Height))/system.deltaTime;

                if((distance >= 0) && ((collider.holder.rigidbody.speed.y - this.holder.rigidbody.speed.y) >= distance))
                {
                    
                }
            }
        }*/

            if(this.transform.possition.y - hHeight <= collider.transform.possition.y + cHeight && this.transform.possition.y + hHeight >= collider.transform.possition.y - cHeight)
            {
                if(this.holder.rigidbody.speed.x > 0)
                {
                    dif = (collider.transform.possition.x - cWidth) - (this.transform.possition.x + hWidth);

                    if(Math.abs(dif/system.deltaTime) <= Math.abs(this.holder.rigidbody.speed.x - collider.holder.rigidbody.speed.x))
                    {
                        this.speedBefore.x = cutDecimal(this.holder.rigidbody.speed.x);
                        this.holder.rigidbody.speed.x = cutDecimal(Math.abs(dif/system.deltaTime));
                        this.SetCollisionSide("l");
                        return true;
                    }
                }
                else if(this.holder.rigidbody.speed.x < 0)
                {
                    dif = (collider.transform.possition.x + cWidth) - (this.transform.possition.x - hWidth);

                    if(Math.abs(dif/system.deltaTime) <= Math.abs(this.holder.rigidbody.speed.x - collider.holder.rigidbody.speed.x))
                    {
                        this.speedBefore.x = cutDecimal(this.holder.rigidbody.speed.x);
                        this.holder.rigidbody.speed.x = -cutDecimal(Math.abs(dif/system.deltaTime));
                        this.SetCollisionSide("r");
                        return true;
                    }
                }
            }
            if(this.transform.possition.x - hWidth <= collider.transform.possition.x + cWidth && this.transform.possition.x + hWidth >= collider.transform.possition.x - cWidth)
            {
                if(this.holder.rigidbody.speed.y > 0)
                {
                    dif = (collider.transform.possition.y - cHeight) - (this.transform.possition.y + hHeight);
                    
                    if(Math.abs(dif/system.deltaTime) <= Math.abs(this.holder.rigidbody.speed.y - collider.holder.rigidbody.speed.y))
                    {
                        this.speedBefore.y = cutDecimal(this.holder.rigidbody.speed.y);
                        this.holder.rigidbody.speed.y = cutDecimal(Math.abs(dif/system.deltaTime));
                        this.SetCollisionSide("u");
                        return true;
                    }
                }
                else if(this.holder.rigidbody.speed.y < 0)
                {
                    dif = (collider.transform.possition.y + cHeight) - (this.transform.possition.y - hHeight);

                    if(Math.abs(dif/system.deltaTime) <= Math.abs(this.holder.rigidbody.speed.y - collider.holder.rigidbody.speed.y))
                    {
                        this.speedBefore.y = cutDecimal(this.holder.rigidbody.speed.y);
                        this.holder.rigidbody.speed.y = -cutDecimal(Math.abs(dif/system.deltaTime));
                        this.SetCollisionSide("d");
                        return true;
                    }
                }
            }
            return false;
    }

    
    // Determina a reação da colisao.
    CollisionReaction(collider)
    {
        if(this.holder.rigidbody.collisionReaction == "reflect")
        {
            if(this.collisionSide == "r" || this.collisionSide == "l")
            {
                this.holder.rigidbody.speed.x = -this.speedBefore.x;
            }
            else
            {
                this.holder.rigidbody.speed.y = -this.speedBefore.y;
            }
            this.onCollision = false;
        }
        else if(this.holder.rigidbody.collisionReaction == "slide")
        {
            this.onCollision = false;
        }
        else if(this.holder.rigidbody.collisionReaction == "stop")
        {
            this.holder.rigidbody.speed.x = 0;
            this.holder.rigidbody.speed.y = 0;
            this.onCollision = false;
        }
    }

    
    SetCollisionSide(side)
    {
        this.onCollision = true;
        this.collisionSide = side;
    }

    
    UnsetCollisionSide()
    {
        this.onCollision = false;
        this.collisionSide = null;
    }
}