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
        //this.rigidbody.speed.y = -cutDecimal(this.player.rigidbody.speed.y/2);
    }
    
    
    //--------------------------------------------------------------------
    // Controles.
    //--------------------------------------------------------------------
    
    
    // Ações para quando uma tecla é precionada.
    KeyDown(key)
    {
        switch(key)
        {
            case 65:
                //this.rigidbody.speed.x = this.player.rigidbody.defaultSpeed.x;
            break;
            case 68:
                //this.rigidbody.speed.x = -this.player.rigidbody.defaultSpeed.x;
            break;
            case 87:
                this.rigidbody.speed.y = this.rigidbody.defaultSpeed.x;
            break;
            case 83:
                this.rigidbody.speed.y = -this.rigidbody.defaultSpeed.x;
            break;
            case 32:  
            break;
        }
    }
    
    
    // Ações para quando uma tecla é solta.
    KeyUp(key)
    {
        switch(key)
        {
            case 65:
                this.rigidbody.acceleration.x = 0;
                this.rigidbody.speed.x = 0;
            break;
            case 68:
                this.rigidbody.acceleration.x = 0;
                this.rigidbody.speed.x = 0;
            break;
            case 87:
                this.rigidbody.speed.y = 0;
            break;
            case 83:
                this.rigidbody.speed.y = 0;
            break;
            case 38:
            break;
        }
    }
}