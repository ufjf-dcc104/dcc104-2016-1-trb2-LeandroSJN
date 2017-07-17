//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
// Modificado: 13/07/2017 - Documentação
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
        this.grid = new Grid(this, 0, 0, 0, 0); // Estrutura que armazena os objetos para verificação.
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
        
        this.grid.ResetGrid();

        for(var i = 0; i < system.gameObjects.length; i++)
        {
            system.Debug("OBJ: " + system.gameObjects[i].object.type);

            system.gameObjects[i].object.transform.UpdateMatrixPossition();
            system.gameObjects[i].object.collisionResult = new Result(false, null);
            
            // Atualisa a collisor do objeto se ele o tiver.
            try
            {
                for(var j = 0; j < system.gameObjects[i].object.collider.length; j++)
                {
                    // Update da grid.
                    this.grid.AddObject(system.gameObjects[i].object);
                    
                    system.gameObjects[i].object.collider[j].Update();
                }
            }
            catch (error)
            {
                system.DebugWarn("THE OBJECT DONT HAVE A COLLIDER!");
            }

            try
            {
                system.gameObjects[i].object.rigidbody.Update();
            }
            catch (error)
            {
                system.DebugWarn("THE OBJECT DONT HAVE A RIGIDBODY!");
            }
        }
        
        this.VerifyCollisions();

        system.Debug("==========COLLISION SYSTEM UPDATED==========");
    }
    
    
    //--------------------------------------------------------------------
    // Funções Secundarias.
    //--------------------------------------------------------------------
    
    // Verifica se os objetos na grid colidem.
    VerifyCollisions()
    {
        var grid = this.grid.grid;
        
        for(var i = 0; i < grid.length; i++)
        {
            if(grid[i] != undefined) for(var j = 0; j < grid[i].length; j++)
            {
                if((grid[i][j] != undefined))
                {
                    if(grid[i][j].length > 1) for(var k = 0; k < grid[i][j].length - 1; k++)
                    {
                        for(var l = k+1; l < grid[i][j].length; l++)
                        {   
                            this.CallColliders(i,j,k,l,grid);
                        }
                    }
                }
            }
        }
    }

    
    // Chama a função de colisão para todos os colisores.
    CallColliders(i,j,k,l,grid)
    {
        var collider1length = grid[i][j][k].collider.length;
        var collider2length = grid[i][j][l].collider.length;

        if(collider1length > 1 || collider2length > 1)
        {
            for(var m = 0; m < collider1length; m++)
            {
                for(var n = 0; n < collider2length; n++)
                {
                    if(grid[i][j][k].collider[m].Collides(grid[i][j][l].collider[n]))
                    {
                        grid[i][j][k].collisionResult = new Result(true, grid[i][j][l]);
                        grid[i][j][l].collisionResult = new Result(true, grid[i][j][k]);

                        //grid[i][j][k].collider[m].AABBResponse(grid[i][j][l].collider[n]);
                    }
                }
            }
        }
        else
        {
            if(grid[i][j][k].collider[0].Collides(grid[i][j][l].collider[0]))
            {
                grid[i][j][k].collisionResult = new Result(true, grid[i][j][l]);
                grid[i][j][l].collisionResult = new Result(true, grid[i][j][k]);

                //grid[i][j][k].collider[0].AABBResponse(grid[i][j][l].collider[0]);
            }
        }
    }
}