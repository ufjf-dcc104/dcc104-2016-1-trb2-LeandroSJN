//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 15/07/2017
// Modificado: 18/07/2017 -Correção de bug de movimento.
//////////////////////////////////////////////////////////////////////////

/**
    * @desc Classe para camera do level 1.
*/
class CameraLevel1 extends Camera
{
    Start()
    {
        this.player = system.GetObjectsByType("Player");
    }


    SetSpeed()
    {
        //this.rigidbody.speed.x = -this.player.rigidbody.speed.x;
        //this.rigidbody.speed.y = -cutDecimal(this.player.rigidbody.speed.y);
    }
}