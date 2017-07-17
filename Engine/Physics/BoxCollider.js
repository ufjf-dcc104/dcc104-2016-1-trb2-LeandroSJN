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
        this.activeLayer = system.GetObjectBySpecialIndex("ActiveLayer"); // Leyer ativa atualmente.
    }
    
    
    //--------------------------------------------------------------------
    // Loop principal.
    //--------------------------------------------------------------------

    // Atualisa a posição do collider de acordo com a posição do holder.
    Update()
    {
        this.transform.possition.x = this.relativePossition.x + this.holder.transform.possition.x - this.transform.width/2;
        this.transform.possition.y = this.relativePossition.y + this.holder.transform.possition.y - this.transform.height/2;

        this.activeLayer = system.GetObjectBySpecialIndex("ActiveLayer");
    }
    
    
    // Exibe graficamente o collider.
    Draw()
    {
        ctx.strokeStyle = "rgb(0, 255, 0)";
        ctx.strokeRect(this.transform.possition.x, this.transform.possition.y, this.transform.width, this.transform.height);
    }
    

    //--------------------------------------------------------------------
    // Funções de deteccao de colisao.
    //--------------------------------------------------------------------
    
    // Verifica a colisão do objeto com a plataforma.
    CollideWithPlatform()
    {
        system.Debug(">START CollideWithPlatform");
        system.Debug("Colliding " + this.holder.type);
        system.Debug("UnderTile: " + this.activeLayer.mapa[this.holder.transform.matrixPossition.y + 1][this.holder.transform.matrixPossition.x]);

        if(this.activeLayer.mapa[this.holder.transform.matrixPossition.y + 1][this.holder.transform.matrixPossition.x] == 2 ||
           this.activeLayer.mapa[this.holder.transform.matrixPossition.y + 1][this.holder.transform.matrixPossition.x] == 1)
            {
                var foot = (this.holder.transform.possition.y) + this.transform.height / 2;

                // Para o calculo do top deve se fazer a compensação do deslocamento do mapa.
                var top = ((this.holder.transform.matrixPossition.y + 1) * this.activeLayer.TS) +
                            this.activeLayer.transform.possition.y;

                top = cutDecimal(top);
                foot = cutDecimal(foot);
                
                system.Debug("On platform: " + (top - foot));

                this.holder.rigidbody.speed.y = cutDecimal(Math.min(this.holder.rigidbody.speed.y, Math.abs(top - foot) / system.deltaTime));
                
                if(this.holder.rigidbody.speed.y == this.activeLayer.rigidbody.speed.y && !this.holder.onPlatform)
                {
                    this.holder.onPlatform = true;

                    if(this.holder.jumping || this.holder.jumpingShoting)
                    {
                        system.audioLib.Play("landing");
                    }
                }
            }
            else
            {
                system.Debug("No platform!");
            }
            system.Debug(">END CollideWithPlatform");
    }


    //--------------------------------------------------------------------
    // Funções de tratamento de colisao.
    //--------------------------------------------------------------------


    AABBResponse(collider)
    {
        var side = this.CollisionSide(collider);
       
        // Colisão cima.
        if(side == "up")
        {
            
        }
        // Colisão direita.
        else if(side == "right")
        {

        }
        // Colisão baixo.
        else if(side == "down")
        {

        }
        // Colisão esquerda.
        else if(side == "left")
        {

        }
    }


    // Retorna o lado mais provavel da colisão.
    CollisionSide(collider)
    {
        var compass = [
            new vec2(0.0, -1.0),// up
            new vec2(1.0, 0.0),	// right
            new vec2(0.0, 1.0),// down
            new vec2(-1.0, 0.0)	// left
        ]

        var direction = [
            "up",
            "right",
            "down",
            "left"
        ]

        var max = 0.0;
        var bestMatch = -1;

        for(var i = 0; i < 4; i++)
        {
            var dotProduct = vec2.dot(vec2.directionalVector(this.transform.possition, collider.transform.possition), compass[i]);
            
            if(dotProduct > max)
            {
                max = dotProduct;
                bestMatch = i;
            }
        }

        return direction[bestMatch];
    }
}