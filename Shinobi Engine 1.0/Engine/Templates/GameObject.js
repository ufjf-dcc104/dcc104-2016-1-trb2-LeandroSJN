//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
// Modificado: 14/07/2017 - Documentação
// TODO: Passar components = {} para componentes = []. 
//////////////////////////////////////////////////////////////////////////


/**
    * @desc Classe generica para qualquer objeto.
*/
class GameObject
{
    // Construtor
    constructor()
    {
        this.type = "GameObject"; // Tipo do objeto.
        this.tag; // Tag do objeto.
        this.transform = new Transform(this, 0, 0, 0, 0, 0); // Componente transform.
        this.renderComponents = {}; // Array de componentes de render.
        this.components = {}; // Array de componentes.
        this.collider = []; // Array de colliders.
        this.rigidbody; // Rigidbody.
        this.drawOrder = 0; // Ordem de desenho.
        this.draw = false; // Booleano para ser desenhado.
        this.visible = true; // Determina se o objeto é visivel.
        this.onPlatform = false; // Verdadeiro quando o objeto está na plataforma.
        this.animation; // Controlador de animação.
        this.depth = 1; // Profundidade do objeto.
        this.active = true; // Bolleano para objeto ativo.
        this.collisionResult = new Result(false, null); // Resultado da collisao.
    }
    
    
    Start()
    {
        
    }

    //--------------------------------------------------------------------
    // Update.
    //--------------------------------------------------------------------
    
    // Atualiza os componentes, o objeto e o animation.
    UpdateGameObject()
    {
        this.UpdateComponents();
        this.Update();
        if(this.animation != undefined)
        {
            this.animation.Update();
        }
    }

    
    // Atualiza os coponentes do objeto.
    UpdateComponents()
    {
        for(var i in this.components)
        {
            try
            {
                this.components[i].Update()
            }
            catch (error)
            {
                system.DebugWarn("THE COMPONENT " + this.components[i].type + " DONT HAVE A UPDATE METHOD!");
            }
        }
    }
    
    
    // Update do objeto.
    Update()
    {
        
    }

    
    //--------------------------------------------------------------------
    // Draw.
    //--------------------------------------------------------------------

    // Desenha os componetes e o objeto.
    DrawGameObject()
    {
        this.DrawComponents();
        if(this.draw)
        {
            if(this.animation != undefined)
            {
                this.renderComponents[this.animation.activeState].Draw(this.transform.scale,this);
            }
            else
            {
                this.renderComponents[0].Draw(this.transform.scale,this);
            }
        }
        this.Draw();
    }

    
    // Desenha os componentes do objeto.
    DrawComponents()
    {
        for(var i in this.components)
        {
            try
            {
                this.components[i].Draw()
            }
            catch (error)
            {
                system.DebugWarn("THE COMPONENT " + this.components[i].type + " DONT HAVE A DRAW METHOD!");
            }
        }

        for(var i = 0; i < this.collider.length; i++)
        {
            this.collider[i].Draw();
        }
    }
    
    
    // Desenho customizado do objeto.
    Draw()
    {
        
    }
    
    
    //--------------------------------------------------------------------
    // Funções de adição.
    //--------------------------------------------------------------------
    
    // Adiciona um novo componente de acordo com seu tipo.
    AddComponent(component)
    {
        if(component.type != undefined)
        {
            if(component.type == "Rigidbody")
            {
                this.rigidbody = component;
            }
            else if(component.type == "BoxCollider")
            {
                this.collider.push(component);
            }
            else if(component.type == "CircleCollider")
            {
                this.collider.push(component);
            }
            else if(!this.components[component.type])
            {
                this.components[component.type] = component;
            }
            else
            {
                system.DebugError("THIS OBJECT ALREADY HAVE A COMPONENT OF THIS TYPE!");
            }
        }
        else
        {
            system.DebugError("THE COMPONENT DONT HAVE A TYPE!");
        }
    }

    
    // Adiciona um componente com uma tag.
    AddComponentWhitTag(key, component)
    {
        if(!this.components[key])
        {
            this.components[key] = component;
        }
        else
        {
            system.DebugError("THIS OBJECT ALREADY HAVE A COMPONENT WHIT THIS KEY!");
        }
    }


    // Adiciona um componente de renderização e abilita o desenho do objeto.
    AddRenderComponent(state, component)
    {
        this.renderComponents[state] = component;
        this.draw = true;
    }

    
    // Adiciona um AnimationController.
    AddAnimationController()
    {
        this.animation = new AnimationController(this);
    }


    //--------------------------------------------------------------------
    // Funções de consulta.
    //--------------------------------------------------------------------
    
    // Retorna um componente com o tipo especifico.
    GetComponentByType(type)
    {
        if(type == "Rigidbody")
        {
            return this.rigidbody;
        }
        else if(type == "BoxCollider")
        {
            return this.collider;
        }
        else if(type == "CircleCollider")
        {
            return this.collider;
        }
        else if(this.components[type])
        {
            return this.components[type];
        }
        else
        {
            system.DebugError("NO COMPONETS OF THIS TYPE!");
        }
    }


    // Verifica se o objeto colidiu com um outro de certo tipo.
    CollideWith(type)
    {
        if(this.collisionResult.collides && this.collisionResult.object.type == type)
        {
            return true;
        }
        else
        {
            return false;
        }
    }


    //--------------------------------------------------------------------
    // Controles.
    //--------------------------------------------------------------------
    
    KeyDown()
    {
        
    }
    
    KeyUp()
    {
        
    }
    
    MouseClick()
    {
        
    }
}