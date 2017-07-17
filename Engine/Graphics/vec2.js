//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2017
// Modificado: 14/07/2017 - Documentação.
//             16/07/2017 - Adição de funções.
//////////////////////////////////////////////////////////////////////////


/**
    * @desc Vetor de duas dimensoes.
*/
class vec2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    
    // Produto escalar.
    static dot(vector1, vector2)
    {
        return vector1.x * vector2.x + vector1.y * vector2.y;
    }

    
    // Normalisa um vetor.
    static normalize(vector)
    {
        var mod = Mod(vector);
        var nVector = new vec2();
        
        nVector.x = vector.x/mod;
        nVector.y = vector.y/mod;
        
        return nVector;
    }

    
    // Retorna o vetor direcional da posição2 a posição1.
    static directionalVector(vector1, vector2)
    {
        var vector = new vec2();
        vector.x = vector1.x - vector2.x;
        vector.y = vector1.y - vector2.y;
        
        return vec2.normalize(vector);
    }
}