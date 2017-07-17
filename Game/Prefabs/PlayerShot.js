/**
    * @desc Classe para o disparo do player.
*/
class PlayerShot extends Shot
{
    // Construtor.
    constructor(x, y)
    {
        super(x, y);
        
        this.type = "PlayerShot";
    }
}