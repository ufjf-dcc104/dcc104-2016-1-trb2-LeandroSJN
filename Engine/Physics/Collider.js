//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
// Modificado: 13/07/2017 - Documentação
//////////////////////////////////////////////////////////////////////////

/**
    * @desc Classe para detecção de colisão, aqui não é feita
    * nenhuma ação apos a detecção, as ações são tomadas na
    * classe Rigidbody caso o objeto seja um.
    * 
    * Para usar um collisor bastar instacialo na classe desejada,
    * escolhendo sua forma, o classe que recebera o colisor deve
    * possuir um transform.
*/
class Collider extends GameObject
{
    // Construtor.
    constructor(holder, width, height, relativeX, relativeY, angle)
    {    
        super(); // Construtor da classe mãe.

        this.type = "Collider"; // Tipo do objeto.
        this.holder = holder; // Objeto que possui o collider.
        this.relativePossition = new vec2(relativeX, relativeY); // Posição do collider em relação ao holder.
        this.transform.possition.x = holder.transform.possition.x + this.relativePossition.x; // Determina a possição x.
        this.transform.possition.y = holder.transform.possition.y + this.relativePossition.y; // Determina a possição y.
        this.transform.angle = angle; // Determina o angulo.
        this.transform.width = width; // Determina a largura.
        this.transform.height = height; // Determina a altura.
        this.gridPossition = []; // Posição do objeto na grade de colisão.
    }
    
    
    // TODO: Implementar a verificação de colisão para outras formas.
    // Verifica a colisão de acordo com o tipo do colisor.
    Collides(collider)
    {
        // Colisão entre duas caixas.
        if(this.type == "BoxCollider" && collider.type == "BoxCollider")
        {
            if(this.transform.possition.x < collider.transform.possition.x + collider.transform.width &&
               this.transform.possition.x + this.transform.width > collider.transform.possition.x &&
               this.transform.possition.y < collider.transform.possition.y + collider.transform.height &&
               this.transform.height + this.transform.possition.y > collider.transform.possition.y)
            {
                return true;
            }
        }
        
        
        // Colisão entre uma caixa e um circulo.
        else if(this.type == "BoxCollider" && collider.type == "CircleCollider")
        {
            
        }
        else if(this.type == "CircleCollider" && collider.type == "BoxCollider")
        {
            
        }
        
        
        // Colisão entre dois circulos.
        else if(this.type == "CircleCollider" && collider.type == "CircleCollider")
        {
            
        }
    }
}