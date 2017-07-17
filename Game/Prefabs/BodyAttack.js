/**
    * @desc Class para controle de ataques corpo a corpo.
*/
class BodyAttack
{
    // Construtor.
    constructor(collider, damage, refreshTime)
    {
        this.collider = collider;
        this.damage = damage;
        this.refresh = refreshTime;
        this.atualTime = this.refresh;
    }
    
    
    // Atualiza os paramentros.
    Update(holder)
    {
        this.atualTime += 1*dt;
        this.collider.Update(holder);
    }
}