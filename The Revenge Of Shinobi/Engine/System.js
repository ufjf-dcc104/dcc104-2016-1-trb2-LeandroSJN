//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
// TODO: Implementar a arvore de objetos.
//       Parar de tocar o audio de um level para o outro.
// Modificado: 14/07/2017 - Documentação
//////////////////////////////////////////////////////////////////////////


// Classe para no da arvore de gameobjects.
class Node
{
    constructor(object)
    {
        this.object = object;
        this.left = undefined;
        this.rigth = undefined;
    }
}


// Classe para arvore de gameojects.
class GameObjectTree
{
    constructor()
    {
        this.root = undefined;
        this.p = undefined;
    }

    // Adiciona um objeto na arvore.
    AddObject(object)
    {
        if(this.root == undefined)
        {
            this.root = new Node(object);
        }
        else
        {
            this.p = root;
            while(this.p != undefined)
            {
                if(this.p.object.drawOrder <= object.drawOrder)
                {
                    this.p = this.p.rigth;
                }
                else
                {
                    this.p = this.p.left;
                }
            }
            this.p = new Node(object);
        }
    }


    // Percorre a arvore fazendo os Updates.
    UpdateTree()
    {

    }


    // Percorre a arvore desenhando.
    DrawTree()
    {

    }
}

// Classe para os elementos do vetor de game objects.
class gameObjectsElement
{
    constructor(object, key, specialIndex)
    {
        this.object = object; // Objeto a ser armazenado.
        this.key = key; // Chave para encontrar o objeto no specialIndex.
        this.specialIndex = specialIndex; // Boleano para saber se o objeto pussui indice especial.
    }
}


/**
    * @desc Classe para automacao do sistema.
*/
class System
{
    constructor()
    {
        
        this.gameObjects = []; // Estrutura que armazena todos os objetos em ordem de desenho.
        this.index = {}; // Estrutura que armazena os indices dos objetos agrupados pelo seu tipo.
        this.specialIndex = {}; // Estrutura que armazena os indices dos objetos que possuem um specialIndex.
        this.scripts = []; // Vetor contendo os scripts.
        this.timeSinceStart = 0; // tempo desde o inicio.
        this.screenWidth = window.innerWidth; // Largura da tela.
        this.screenHeight = window.innerHeight; // Altura da tela.
        this.fps = 63; // Maximo de fps.
		this.dt = 0; // Delta time.
        this.G = 1.2*screen.height; // Valor da gravidade.
        this.audioLib = new AudioResources(); // Biblioteca de audio.
        this.imgLib = new ImageResources(); // Biblioteca de imagens.
        this.globalTileSize = this.screenHeight/7; // Tamanho padrão dos quadros.
        this.staticCamera = false; // Determina se a camera é estatica.
        this.interval = 1000/this.fps; // Intervalo.
        this.mousePos = 0; // Posição do mouse.
        this.debug = false; // Console normal.
        this.debugError = true; // Console de erro.
        this.debugWarn = false; // Console de perigo.
        this.visualDebug = false; // Debug visual.
        this.level; // Level atualmente ativo.
        this.interface = [];
        this.camera = new Camera();
        this.cursor = new Cursor(10, 10, "original");
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
        this.Debug("====================UPDATING SYSTEM====================");
        collisionSystem.Update();
        this.CallUpdates();
        this.RemoveInactives();
        this.camera.Update();
        this.cursor.Update();
        this.Debug("==================END OF SYSTEM UPDATE==================");
    }
    
    
    Draw()
    {
        ClearScreen();
        this.CallDraws();
        this.cursor.Draw();
    }
    
    
    //--------------------------------------------------------------------
    // FUNCOES DE CHAMADA.
    //--------------------------------------------------------------------
    
    
    // Chama os metodos de Update dos objetos.
    CallUpdates()
    {
        this.Debug(">START CallUpdates");

        for(var i = 0; i < this.gameObjects.length; i++)
        {
            this.Debug("Updating: " + this.gameObjects[i].object.type);
            
            this.gameObjects[i].object.UpdateGameObject();
        }
        
        for(var i = 0; i < this.scripts.length; i++)
        {
            this.scripts[i].Update();
        }

        for(var i = 0; i < this.interface.length; i++)
        {
            this.interface[i].UpdateGameObject();
        }

        this.level.Update();

        this.Debug(">END CallIpdates");
    }
    
    
    // Chama os metodos de Draw dos objetos.
    CallDraws()
    {
        if(this.visualDebug)
        {
            collisionSystem.grid.Draw();;
        }

        for(var i = 0; i < this.gameObjects.length; i++)
        {
            if(this.gameObjects[i].object.visible)
            {
                this.gameObjects[i].object.DrawGameObject();
            }
        }

        for(var i = 0; i < this.interface.length; i++)
        {
            this.interface[i].DrawGameObject();
        }
        
        if(this.visualDebug)
        {
            this.DrawAxis();
            this.DrawGrid();
        }
    }
    
    
    //--------------------------------------------------------------------
    // FUNCOES DE ADICAO.
    //--------------------------------------------------------------------
    
    
    // Adiciona um objeto a estrutura de GameObjects.
    AddGameObject(object, key, specialIndex)
    {
        this.gameObjects.push(new gameObjectsElement(object, key, specialIndex));
        this.OrderGameObjects();
        this.UpdateIndex();
        return object;
    }


    AddInterfaceComponent(object)
    {
        this.interface.push(object);
        return object;
    }
    
    
    // Adiciona um script ao vetor de scripts.
    AddScript(script)
    {
        this.scripts.push(script);
    }
    
    
    //--------------------------------------------------------------------
    // FUNCOES DE REMOCAO.
    //--------------------------------------------------------------------
    
    
    // Remove um objeto quando este esta inativo.
    RemoveInactives()
    {
        for(var i = 0; i < this.gameObjects.length; i++)
        {
            if(!this.gameObjects[i].object.active)
            {
                this.gameObjects.splice(i, 1);
                this.UpdateIndex();
            }
        }
    }
    
    
    //--------------------------------------------------------------------
    // FUNCOES DE CONSULTA.
    //--------------------------------------------------------------------
    
    
    // Retorna todos os objetos de um determinado tipo.
    GetObjectsByType(type)
    {
        var objects = [];
        
        for(var i in this.index[type])
        {
            objects.push(this.gameObjects[this.index[type][i]].object);
        }
        
        if(objects.length == 1)
        {
            objects = objects[0];
        }
        
        return objects;
    }
    
    
    // Retorna um objeto que tenha um identificador especial.
    GetObjectBySpecialIndex(specialIndex)
    {
        return this.gameObjects[this.specialIndex[specialIndex]].object;
    }
    
    
    //--------------------------------------------------------------------
    // FUNCOES DE CONTROLE.
    //--------------------------------------------------------------------
    
    
    KeyUp(key)
    {
        for(var i = 0; i < this.gameObjects.length; i++)
        {
            this.gameObjects[i].object.KeyUp(key);
        }

        for(var i = 0; i < this.scripts.length; i++)
        {
            this.scripts[i].KeyUp(key);
        }

        for(var i = 0; i < this.interface.length; i++)
        {
            this.interface[i].KeyUp(key);
        }
    }
    
    
    KeyDown(key)
    {
        for(var i = 0; i < this.gameObjects.length; i++)
        {
            this.gameObjects[i].object.KeyDown(key);
        }

        for(var i = 0; i < this.scripts.length; i++)
        {
            this.scripts[i].KeyDown(key);
        }

        for(var i = 0; i < this.interface.length; i++)
        {
            this.interface[i].KeyDown(key);
        }
    }
    
    
    MouseClick(key)
    {
        for(var i = 0; i < this.gameObjects.length; i++)
        {
            this.gameObjects[i].object.MouseClick(key);
        }

        for(var i = 0; i < this.scripts.length; i++)
        {
            this.scripts[i].MouseClick(key);
        }

        for(var i = 0; i < this.interface.length; i++)
        {
            this.interface[i].MouseClick(key);
        }
    }
    
    //--------------------------------------------------------------------
    // FUNCOES UTEIS.
    //--------------------------------------------------------------------
    
    
    // Ordena o vetor de objetos de acordo com a draworder.
    OrderGameObjects()
    {
        this.gameObjects.sort(function(a, b) {return a.object.drawOrder - b.object.drawOrder});
    }
    
    
    // Atualiza as estruturas de indices.
    UpdateIndex()
    {
        // Esvazia os indices.
        this.index = {};
        this.specialIndex = {};
        
        for(var i = 0; i < this.gameObjects.length; i++)
        {
            // Verifica se ja existe um objeto do mesmo tipo nos indices e o adiciona.
            if(this.index[this.gameObjects[i].object.type])
            {
                this.index[this.gameObjects[i].object.type].push(i);
            }
            else
            {
                this.index[this.gameObjects[i].object.type] = [];
                this.index[this.gameObjects[i].object.type].push(i);
            }
            
            // Adiciona um indice especial caso exista.
            if(this.gameObjects[i].specialIndex)
            {
                this.specialIndex[this.gameObjects[i].key] = i;
            }
        }
    }
    
    
    // Limpa a cena e inicia um level.
    LoadLevel(level)
    {
        delete(this.audioLib);
        delete(this.imgLib);
        delete(this.gameObjects);
        delete(this.interface);
        delete(this.level);

        this.audioLib = new AudioResources();
        this.imgLib = new ImageResources();
        this.gameObjects = [];
        this.interface = [];
        this.level = level;
        this.level.Start();
    }
    
    
    //--------------------------------------------------------------------
    // FUNCOES DE DEBUG E AUXILIO
    //--------------------------------------------------------------------
    
    
    // Desenha os eixos.
    DrawAxis()
    {
        ctx.save();
            ctx.beginPath();
                ctx.lineWidth = 10;
                ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
                ctx.moveTo(0, 0);
                ctx.lineTo(screen.width, 0);
            ctx.stroke();

            ctx.beginPath();
                ctx.strokeStyle = 'rgba(0, 255, 0, 1)';
                ctx.moveTo(0, 0);
                ctx.lineTo(0, screen.height);
            ctx.stroke();
        ctx.restore();
    }
    
    
    // Desenha uma grade.
    DrawGrid()
    {
        for(var i = 0; i < 20; i++)
        {
            ctx.save();
                ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
                    ctx.moveTo(i*this.globalTileSize, 0);
                    ctx.lineTo(i*this.globalTileSize, screen.height);

                    ctx.font = screen.height/50 + "px Arial";
                    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
                    ctx.fillText(i*this.globalTileSize, i*this.globalTileSize, screen.height/30);
                ctx.stroke();

                ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
                    ctx.moveTo(0, i*this.globalTileSize);
                    ctx.lineTo(screen.width, i*this.globalTileSize);
            
                    ctx.font = screen.height/50 + "px Arial";
                    ctx.fillStyle = 'rgba(0, 255, 0, 1)';
                    ctx.fillText(i*this.globalTileSize, screen.width/100, i*this.globalTileSize);
                ctx.stroke();
            ctx.restore();
        }
    }

    
    // Mensagem normal.
    Debug(text)
    {
        if(this.debug)
        {
            console.log(text);
        }
    }

    
    // Mensagem de perigo.
    DebugWarn(text)
    {
        if(this.debugWarn)
        {
            console.warn(text);
        }
    }

    
    // Mensagem de erro.
    DebugError(text)
    {
        if(this.debugError)
        {
            console.error(text);
        }
    }
}