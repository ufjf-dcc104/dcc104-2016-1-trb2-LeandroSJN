/**
    * @desc Classe para o disparo do inimigo.
*/
class EnemyShot extends Shot
{
    // Construtor.
    constructor(x, y)
    {
        super(x, y);
        
        this.type = "EnemyShot";
    }
}