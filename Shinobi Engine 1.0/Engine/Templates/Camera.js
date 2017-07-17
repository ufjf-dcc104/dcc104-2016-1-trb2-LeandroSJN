//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2017
// Modificado: 13/07/2017 - Documentação
//////////////////////////////////////////////////////////////////////////

/**
    * @desc Classe para simular uma camera.
*/
class Camera extends GameObject
{
    constructor()
    {
        super(); // Construtor da classe mãe.

        this.type = "Camera"; // Tipo do objeto.
        this.drawOrder = 0; // Ordem de desenho.
        this.AddComponent(new Rigidbody(this, 0, 0, 0, 0, 0, 0)); // Adiciona um corpo rigido.
        this.aperture; // Abertura da camera.
        this.active = true; // Determina se a camera está ativa.
        this.rigidbody.ignoreGravity = true; // Ignora a gravidade.
        this.rigidbody.ignoreCollision = true; // Ignora colisões.

        this.Start();
    }
    
    
    //--------------------------------------------------------------------
    // Loop principal.
    //--------------------------------------------------------------------
    
    
    Start()
    {
        
    }
    
    
    Update()
    {
        this.MoveCamera();
    }
    
    
    // Metodo para desenhar filtros da camera.
    Draw()
    {
        
    }
    
    
    //--------------------------------------------------------------------
    // Funções auxiliares.
    //--------------------------------------------------------------------
    
    // Move todos os objetos de acordo com a velociade da camera.
    MoveCamera()
    {
        for(var i = 0; i < system.gameObjects.length; i++)
        {
            system.gameObjects[i].object.transform.possition.x += cutDecimal((this.rigidbody.speed.x/system.gameObjects[i].object.depth) * system.deltaTime);
            system.gameObjects[i].object.transform.possition.y += cutDecimal((this.rigidbody.speed.y/system.gameObjects[i].object.depth) * system.deltaTime);
            this.transform.possition.x += cutDecimal(this.rigidbody.speed.x * system.deltaTime);
            this.transform.possition.y += cutDecimal(this.rigidbody.speed.y * system.deltaTime);
        }

        collisionSystem.grid.transform.possition.x += cutDecimal((this.rigidbody.speed.x) * system.deltaTime);
        collisionSystem.grid.transform.possition.y += cutDecimal((this.rigidbody.speed.y) * system.deltaTime);
    }
    
    
    //--------------------------------------------------------------------
    // Controles.
    //--------------------------------------------------------------------
    
    
    // Ações para quando uma tecla é precionada.
    KeyDown(key)
    {

    }
    
    
    // Ações para quando uma tecla é solta.
    KeyUp(key)
    {
        
    }
}