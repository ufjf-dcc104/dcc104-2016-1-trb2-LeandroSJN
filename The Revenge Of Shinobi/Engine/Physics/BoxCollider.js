//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
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
        this.speedBefore = new vec2(0, 0);
        this.onCollision = false;
        this.collisionSide;
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
        ctx.fillRect(this.transform.possition.x - 2.5, this.transform.possition.y - 2.5, 5, 5);
    }
    

    //--------------------------------------------------------------------
    // Funções de deteccao de colisao.
    //--------------------------------------------------------------------

    Collides(collider)
    {
        //if(this.holder.rigidbody.speed.x != 0 || this.holder.rigidbody.speed.y != 0)
        if(!this.onCollision)
        {
            this.CillideWithCollider(collider);
        }
        else
        {
            if(this.collisionSide == "r" || this.collisionSide == "l")
                this.holder.rigidbody.speed.x = -this.speedBefore.x/2;
            else
                this.holder.rigidbody.speed.y = -this.speedBefore.y/2;
            this.onCollision = false;
        }
    }

    CillideWithCollider(collider)
    {
        var dif;
        var hWidth = this.transform.width/2;
        var hHeight = this.transform.height/2;
        var cWidth = collider.transform.width/2;
        var cHeight = collider.transform.height/2;

            if(this.transform.possition.y - hHeight <= collider.transform.possition.y + cHeight && this.transform.possition.y + hHeight >= collider.transform.possition.y - cHeight)
            {
                if(this.holder.rigidbody.speed.x > 0)
                {
                    dif = (collider.transform.possition.x - cWidth) - (this.transform.possition.x + hWidth);

                    if(Math.abs(dif/system.deltaTime) <= Math.abs(this.holder.rigidbody.speed.x))
                    {
                        this.speedBefore.x = cutDecimal(this.holder.rigidbody.speed.x);
                        this.holder.rigidbody.speed.x = cutDecimal(Math.abs(dif/system.deltaTime));
                        this.SetCollisionSide("l");
                    }
                }
                else if(this.holder.rigidbody.speed.x < 0)
                {
                    dif = (collider.transform.possition.x + cWidth) - (this.transform.possition.x - hWidth);

                    if(Math.abs(dif/system.deltaTime) <= Math.abs(this.holder.rigidbody.speed.x))
                    {
                        this.speedBefore.x = cutDecimal(this.holder.rigidbody.speed.x);
                        this.holder.rigidbody.speed.x = -cutDecimal(Math.abs(dif/system.deltaTime));
                        this.SetCollisionSide("r");
                    }
                }
            }
            if(this.transform.possition.x - hWidth <= collider.transform.possition.x + cWidth && this.transform.possition.x + hWidth >= collider.transform.possition.x - cWidth)
            {
                if(this.holder.rigidbody.speed.y > 0)
                {
                    dif = (collider.transform.possition.y - cHeight) - (this.transform.possition.y + hHeight);
                    
                    if(Math.abs(dif/system.deltaTime) <= Math.abs(this.holder.rigidbody.speed.y))
                    {
                        this.speedBefore.y = cutDecimal(this.holder.rigidbody.speed.y);
                        this.holder.rigidbody.speed.y = cutDecimal(Math.abs(dif/system.deltaTime));
                        this.SetCollisionSide("u");
                    }
                }
                else if(this.holder.rigidbody.speed.y < 0)
                {
                    dif = (collider.transform.possition.y + cHeight) - (this.transform.possition.y - hHeight);

                    if(Math.abs(dif/system.deltaTime) <= Math.abs(this.holder.rigidbody.speed.y))
                    {
                        this.speedBefore.y = cutDecimal(this.holder.rigidbody.speed.y);
                        this.holder.rigidbody.speed.y = -cutDecimal(Math.abs(dif/system.deltaTime));
                        this.SetCollisionSide("d");
                    }
                }
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