//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
// Modificado: 13/07/2017 - Documentação
//             18/07/2017 - Correção de bug no deslocamento do colisor,
//                          relacionado a ordem de chamada.
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
        this.collidersCount = 0;
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

            system.gameObjects[i].object.collisionResult = new Result(false, null);
            
            // Atualisa o rigidbody.
            try
            {
                system.gameObjects[i].object.rigidbody.Update();
            }
            catch (error)
            {
                system.DebugWarn("THE OBJECT DONT HAVE A RIGIDBODY!");
            }

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
        }
        
        this.VerifyCollisions();

        // Atualiza a posição do rigidbody.
        for(var i = 0; i < system.gameObjects.length; i++)
        {
            try
            {
                system.gameObjects[i].object.rigidbody.UpdatePossition();
            }
            catch (error)
            {
                system.DebugWarn("THE OBJECT DONT HAVE A RIGIDBODY!");
            }

        }

        system.Debug("==========COLLISION SYSTEM UPDATED==========");
    }
    
    
    //--------------------------------------------------------------------
    // Funções Secundarias.
    //--------------------------------------------------------------------
    
    // Verifica se os objetos na grid colidem.
    VerifyCollisions()
    {
        var grid = this.grid.grid;

        for(var i = 0; i < this.grid.ocuppedPositions.length; i++)
        {
            var a1 = this.grid.ocuppedPositions[i].x;
            var a2 = this.grid.ocuppedPositions[i].y;

            for(var k = 0; k < grid[a1][a2].length - 1; k++)
            {
                for(var l = k+1; l < grid[a1][a2].length; l++)
                {   
                     this.CallColliders(a1, a2, k, l, grid);
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
                    grid[i][j][k].collider[m].Collides(grid[i][j][l].collider[n]);
                    /*if(grid[i][j][k].collider[m].Collides(grid[i][j][l].collider[n]))
                    {
                        grid[i][j][k].collisionResult = new Result(true, grid[i][j][l]);
                        grid[i][j][l].collisionResult = new Result(true, grid[i][j][k]);

                        //grid[i][j][k].collider[m].AABBResponse(grid[i][j][l].collider[n]);
                    }*/
                }
            }
        }
        else
        {
            grid[i][j][k].collider[0].Collides(grid[i][j][l].collider[0]);
            grid[i][j][l].collider[0].Collides(grid[i][j][k].collider[0]);
            //grid[i][j][l].collider[0].Collides(grid[i][j][k].collider[0]);
            /*if(grid[i][j][k].collider[0].Collides(grid[i][j][l].collider[0]))
            {
                grid[i][j][k].collisionResult = new Result(true, grid[i][j][l]);
                grid[i][j][l].collisionResult = new Result(true, grid[i][j][k]);

                //grid[i][j][k].collider[0].AABBResponse(grid[i][j][l].collider[0]);
            }*/
        }
    }
}