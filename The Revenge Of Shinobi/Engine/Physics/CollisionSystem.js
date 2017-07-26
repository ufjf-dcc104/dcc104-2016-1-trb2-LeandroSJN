//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
// Modificado: 13/07/2017 - Documentação
//             18/07/2017 - Correção de bug no deslocamento do colisor,
//                          relacionado a ordem de chamada.
//             26/07/2017 - Melhorias na colisão.
//////////////////////////////////////////////////////////////////////////

/**
    * @desc Armazena o resultado da colisão.
*/
class Result
{
    constructor(collides, object)
    {
        this.collides = collides; // Booleano para colisão.
        this.object = object; // Objeto com o qual colidiu.
    }
}


/**
    * @desc Classe para controle de colisao.
*/
class CollisionSystem
{
    // Construtor.
    constructor()
    {
        this.totalTests = 0;
    }
    
    //--------------------------------------------------------------------
    // Loop principal.
    //--------------------------------------------------------------------
    
    // Inicializa os parametros.
    Start()
    {
        
    }
    
    
    // Atualiza os parametros.
    Update()
    {
        system.Debug("==========UPDATING COLLISION SYSTEM==========");
        
        this.totalTests = 0;

        for(var i = 0; i < system.gameObjects.length; i++)
        {
            system.Debug("OBJ: " + system.gameObjects[i].object.type);

            system.gameObjects[i].object.collisionResult = new Result(false, null);
            
            // Atualisa a collisor do objeto se ele o tiver.
            try
            {
                for(var j = 0; j < system.gameObjects[i].object.collider.length; j++)
                {
                    system.gameObjects[i].object.collider[j].Update();
                }
            }
            catch (error)
            {
                system.DebugWarn("THE OBJECT DONT HAVE A COLLIDER!");
            }
            
            // Atualisa o rigidbody.
            try
            {
                system.gameObjects[i].object.rigidbody.Update();
            }
            catch (error)
            {
                system.DebugWarn("THE OBJECT DONT HAVE A RIGIDBODY!");
            }

            // Verifica colisoes.
            if(system.gameObjects[i].object.collider[0]) for(var j = 0; j < system.gameObjects.length; j++)
            {
                if(system.gameObjects[j].object.collider[0] && i != j) system.gameObjects[i].object.collider[0].Collides(system.gameObjects[j].object.collider[0]);
            }

            // Atualiza a posicao.
            try
            {
                system.gameObjects[i].object.rigidbody.UpdatePossition();
            }
            catch (error)
            {
                system.DebugWarn("THE OBJECT DONT HAVE A RIGIDBODY!");
            }
        }
        
        //console.log(this.totalTests + ", " + system.gameObjects.length);
        system.Debug("==========COLLISION SYSTEM UPDATED==========");
    }
}