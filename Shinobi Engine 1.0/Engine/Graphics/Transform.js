//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
// Modificado: 14/07/2017 - Documentação
//////////////////////////////////////////////////////////////////////////


/**
    * @desc Classe que determina a posição e o tamanho em pixels de um objeto.
*/
class Transform
{
    // Construtor.
    constructor(holder, x, y, angle, width, height)
    {
        this.type = "Transform"; // Tipo do objeto.
        this.holder = holder; // Objeto que possui o transform.
        this.possition = new vec2(x, y); // Vetor de posicao.
        this.angle = angle; // Angulo do objeto.
        this.width = width; // Largura do objeto.
        this.height = height; // Altura do objeto.
        this.matrixPossition = new vec2(0, 0); // Possição do aobjeto no mapa de tiles.
        this.gridPossition = []; // Possições do objeto na matriz de colisão.
        this.scale = new vec2(1, 1); // Escala do objeto.
    }

    
    //--------------------------------------------------------------------
    // Loop principal.
    //--------------------------------------------------------------------

    Update()
    {

    }
    

    //--------------------------------------------------------------------
    // Funções auxiliares.
    //--------------------------------------------------------------------

    // Atualiza a possicao i,j do objeto na matriz principal.
    UpdateMatrixPossition()
    {
        this.matrixPossition.x = Math.floor((this.possition.x - system.GetObjectBySpecialIndex("ActiveLayer").transform.possition.x) /
        system.GetObjectBySpecialIndex("ActiveLayer").TS);
        this.matrixPossition.y = Math.floor((this.possition.y - system.GetObjectBySpecialIndex("ActiveLayer").transform.possition.y) /
        system.GetObjectBySpecialIndex("ActiveLayer").TS);
    }

    
    // Move instantaneamente o objeto para uma posicao.
    MoveInstant(x, y)
    {
        this.possition.x = x;
        this.possition.y = y;
    }
}