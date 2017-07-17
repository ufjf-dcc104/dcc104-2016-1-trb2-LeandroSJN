//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 15/07/2017
//////////////////////////////////////////////////////////////////////////

/**
    * @desc Classe para camera do level 1.
*/
class CameraLevel1 extends Script
{
    Start()
    {
        this.camera = system.GetObjectsByType("Camera");
        this.player = system.GetObjectsByType("Player");
    }

    // Move todos os objetos de acordo com a velociade da camera.
    Update()
    {
        //this.camera.rigidbody.speed.y = -cutDecimal(this.player.rigidbody.speed.y/2);
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
                this.camera.rigidbody.speed.x = this.player.rigidbody.defaultSpeed.x;
            break;
            case 68:
                this.camera.rigidbody.speed.x = -this.player.rigidbody.defaultSpeed.x;
            break;
            case 87:
                this.camera.rigidbody.speed.y = this.camera.rigidbody.defaultSpeed.x;
            break;
            case 83:
                this.camera.rigidbody.speed.y = -this.camera.rigidbody.defaultSpeed.x;
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
                this.camera.rigidbody.acceleration.x = 0;
                this.camera.rigidbody.speed.x = 0;
            break;
            case 68:
                this.camera.rigidbody.acceleration.x = 0;
                this.camera.rigidbody.speed.x = 0;
            break;
            case 87:
                this.camera.rigidbody.speed.y = 0;
            break;
            case 83:
                this.camera.rigidbody.speed.y = 0;
            break;
            case 38:
            break;
        }
    }
}