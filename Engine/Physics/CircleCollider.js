//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
// Modificado: 13/07/2017 - Documentação
//////////////////////////////////////////////////////////////////////////

/**
    * @desc Classe para colisor circular.
*/
class CircleCollider extends Collider
{
    // Construtor.
    constructor(holder, relativeX, relativeY, sx, sy)
    {
        super(sx, sy, holder, relativeX, relativeY);
        
        this.type = "CircleCollider";
    }
    
    
    // Atualisa a posição do collider de acordo com a posição
    // do holder passada por paramentro.
    Update(holder)
    {
        this.transform.possition.x = this.relativeX + holder.transform.possition.x - this.transform.width/2;
        this.transform.possition.y = this.relativeY + holder.transform.possition.y - this.transform.height/2;
    }
    
    
    Draw()
    {
        ctx.strokeStyle = "rgb(0, 255, 0)";
    }
}