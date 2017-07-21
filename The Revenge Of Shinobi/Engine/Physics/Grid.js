//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
// Modificado: 13/07/2017 - Documentação
//////////////////////////////////////////////////////////////////////////

/**
    * @desc Estrutura para armazenar os objetos que possuem colliders,
    * são verificadas as colisões entre objetos que estão na mesma posição
    * da matriz.
*/
class Grid extends GameObject
{
    // Construtor.
    constructor(holder, x, y, width, height)
    {
        super(); // Construtor da classe mãe.

        this.type = "Grid"; // Tipo do objeto.
        this.holder = holder; // Objeto que possui o grid.
        this.grid = []; // Matriz para armazenar os objetos.
        this.tileSize = system.screenHeight/80; // Tamanho dos quadros.
        this.transform.possition.x = x; // Determina a posição x.
        this.transform.possition.y = y; // Determina a posição y.
        this.transform.width = width; // Determina a largura.
        this.transform.height = height; // Determina a altura.
        this.maxTile = new vec2(0, 0);

        this.Start();
    }
    
    
    //--------------------------------------------------------------------
    // Funções do loop principal.
    //--------------------------------------------------------------------
    
    Start()
    {
        
    }
    

    Update()
    {
        
    }
    
    
    // Desennha os quadros ocupados.
    Draw()
    {
        for(var i = 0; i < this.grid.length; i++)
        {
            if(this.grid[i] != undefined)
            for(var j = 0; j < this.grid[i].length; j++)
            {
                if(this.grid[i][j] != undefined && i >= 0 && j >= 0)
                {
                    ctx.fillStyle = "grey";
                    ctx.fillRect(i*this.tileSize + this.transform.possition.x,
                                 j*this.tileSize + this.transform.possition.y,
                                 this.tileSize,
                                 this.tileSize);
                }
            }
        }
        
    }


    //--------------------------------------------------------------------
    // Funções auxiliares.
    //--------------------------------------------------------------------

    // Obtem a posição e adiciona um objeto a grade.
    AddObject(object)
    {
        if(object.type != "Map" && object.type != "Grid")
        {
            var possition = this.GetObjectPossition(object);

            for(var i = 0; i < possition.length; i++)
            {
                if(this.grid[possition[i].x] != undefined)
                {
                    if(this.grid[possition[i].x][possition[i].y] != undefined)
                    {
                        this.UpdatePossition(object, possition[i]);
                    }
                    else
                    {
                        this.grid[possition[i].x][possition[i].y] = [];

                        this.UpdatePossition(object, possition[i]);
                    }
                }
                else
                {
                    this.grid[possition[i].x] = [];
                    this.grid[possition[i].x][possition[i].y] = [];
                    
                    this.UpdatePossition(object, possition[i]);
                }
            }
        }
    }

    
    // Adiciona o objeto na possição calculada.
    UpdatePossition(object, possition)
    {              
        object.transform.gridPossition.x = possition.x;
        object.transform.gridPossition.y = possition.y;
        var zLenght = this.grid[possition.x][possition.y].push(object);
        object.transform.gridPossition.z = zLenght - 1;
    }
    
    
    // Obtem os indices correspondentes aos quadros ocupados pelo objeto.
    GetObjectPossition(object)
    {
        var indexes = [];
        var zone = 1;
        
        for(var i = 0; i < object.collider.length; i++)
        {
            var minX = Math.floor(((object.transform.possition.x - object.collider[i].transform.width/2) - this.transform.possition.x) / this.tileSize);
            var maxX = Math.floor(((object.transform.possition.x + object.collider[i].transform.width/2) - this.transform.possition.x) / this.tileSize);
            var minY = Math.floor(((object.transform.possition.y - object.collider[i].transform.height/2) - this.transform.possition.y) / this.tileSize);
            var maxY = Math.floor(((object.transform.possition.y + object.collider[i].transform.height/2) - this.transform.possition.y) / this.tileSize);

            if(minX < 0 || maxX < 0 || minY < 0 || maxY < 0)
            {
                //object.active = false;
            }
            else for(var j = minX - zone; j <= maxX + zone; j++)
            {
                for(var k = minY - zone; k <= maxY + zone; k++)
                {
                    indexes.push(new vec2(j, k));
                }
            }
        }
        
        return indexes;
    }


    // Limpa toda a grade.
    ResetGrid()
    {
        this.grid = [];
    }
};