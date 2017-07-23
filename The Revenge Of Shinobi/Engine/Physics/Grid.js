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
        this.tileSize = system.screenHeight/50; // Tamanho dos quadros.
        this.transform.possition.x = x; // Determina a posição x.
        this.transform.possition.y = y; // Determina a posição y.
        this.transform.width = screen.width; // Determina a largura.
        this.transform.height = screen.height; // Determina a altura.
        this.maxTile = new vec2(0, 0);
        this.ocuppedPositions = [];

        this.Start();
    }
    
    
    //--------------------------------------------------------------------
    // Funções do loop principal.
    //--------------------------------------------------------------------
    
    Start()
    {
        this.maxTile.x = Math.floor(this.transform.width/this.tileSize);
        this.maxTile.y = Math.floor(this.transform.height/this.tileSize);
    }
    

    Update()
    {
        
    }
    
    
    // Desennha os quadros ocupados.
    Draw()
    {
        for(var i = 0; i < this.ocuppedPositions.length; i++)
        {
            ctx.fillStyle = "rgb(255, 0, 255)";
            ctx.fillRect(this.ocuppedPositions[i].x*this.tileSize + this.transform.possition.x,
                         this.ocuppedPositions[i].y*this.tileSize + this.transform.possition.y,
                         this.tileSize,
                         this.tileSize);
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
                    // Existe a posição x e y.
                    if(this.grid[possition[i].x][possition[i].y] != undefined)
                    {
                        var add = false;

                        for(var j = 0; j < this.grid[possition[i].x][possition[i].y].length; j++)
                        {
                            if(!this.WillCollideWith(this.grid[possition[i].x][possition[i].y][j].collider[0], object.collider[0]))
                            {
                                add = true;
                                this.grid[possition[i].x][possition[i].y][j].collider[0].collidersToCompare.push(object.collider[0].id);
                                object.collider[0].collidersToCompare.push(this.grid[possition[i].x][possition[i].y][j].collider[0].id);
                            }
                        }

                        if(add)
                        {
                            this.grid[possition[i].x][possition[i].y].push(object);
                            // Adiciona a posição da matriz ao vetor de posiçoes ocupadas quando ha mais de 1 elemento.
                            if(this.grid[possition[i].x][possition[i].y].length > 1)
                            {
                                this.ocuppedPositions.push(new vec2(possition[i].x, possition[i].y));
                            }
                        }
                    }
                    // So existe x na grid.
                    else
                    {
                        this.grid[possition[i].x][possition[i].y] = [];
                        this.grid[possition[i].x][possition[i].y].push(object);
                    }
                }
                // Não existe essa posição ainda na grid.
                else
                {
                    this.grid[possition[i].x] = [];
                    this.grid[possition[i].x][possition[i].y] = [];
                    this.grid[possition[i].x][possition[i].y].push(object);
                }
            }
        }
    }


    // Retorna verdadeiro se os colisores ja ocupam um mesmo quadro.
    WillCollideWith(collider1, collider2)
    {
        for(var i = 0; i < collider1.collidersToCompare.length; i++)
        {
            if(collider1.collidersToCompare[i] == collider2.id)
            {
                return true;
            }
        }
        return false;
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

            if(minX < 0) minX = 0;
            if(minY < 0) minY = 0;

            if(maxX > this.maxTile.x) maxX = this.maxTile.x;
            if(maxY > this.maxTile.y) maxY = this.maxTile.y;

            if(minX > this.maxTile.x || maxX < 0 || minY > this.maxTile.y || maxY < 0)
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
        this.ocuppedPositions = [];
    }
};