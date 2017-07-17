/**
    * @desc Classe para controle de saúde de um personagem.
*/
class Health
{
    // Construtor.
    constructor(maxHP)
    {
        this.maxHP = maxHP;
        this.HP = maxHP;
        this.type = "Health";
    }
    
    
    // Reduz o hp de uma quantidade informada.
    ReduceHP(val)
    {
        this.HP -= val;
    }
    
    
    // Retorna verdadeiro se hp é maior que um dado valor.
    IsAlive(val)
    {
        if(this.HP > val)
        {
            return true;
        }
        return false;
    }
}