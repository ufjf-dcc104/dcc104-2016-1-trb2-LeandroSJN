//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 13/07/2017
//////////////////////////////////////////////////////////////////////////

/**
    * @desc Transição de um estado a para b dada uma condição.
*/
class Transition
{
    // Construtor
    constructor(holder, actualState, nextState, varToCompare, condition, value)
    {
        this.holder = holder; // Objeto que possui o animator.
        this.actualState = actualState; // Estado atual.
        this.nextState = nextState; // Proximo estado.
        this.varToCompare = varToCompare; // Variavel para comparação.
        this.condition = condition; // Condição para comparação.
        this.value = value; // Valor para se comparar.
        
        // Vetor com os operadores possiveis.
        this.conditions = {
            '==': function(a, b) { return a == b },
            '!=': function(a, b) { return a != b },
            '>': function(a, b) { return a > b },
            '>=': function(a, b) { return a >= b },
            '<': function(a, b) { return a < b },
            '<=': function(a, b) { return a <= b },
        }
    }

    
    // Verifica se algumacondição de mudança de estado foi satisfeita e retorna o estado resultante.
    MakeTransition()
    {
        for(var i = 0; i < this.varToCompare.length; i++)
        {
            if(!this.conditions[this.condition[i]](this.Variables(this.varToCompare[i]), this.value[i]))
            {
                return this.actualState;
            }
        }
        return this.nextState;
    }

    
    // Retorna o valor correspondente ao parametro desejado.
    Variables(value)
    {
        switch(value)
        {
            case "speed.x":
                return this.holder.rigidbody.speed.x;
            case "speed.y":
                return this.holder.rigidbody.speed.y;
        }
    }
}


/**
    * @desc Estados da animação.
*/
class State
{
    // Construtor
    constructor(name)
    {
        this.name = name; // Nome do estado.
        this.transitions = []; // Vetor de transições.
    }
}


/**
    * @desc Controla as animações do objeto utilizando um automato. 
*/
class AnimationController
{
    // Construtor
    constructor(holder)
    {
        this.holder = holder; // Objeto que possui o animator.
        this.states = {}; // Conjunto de estados.
        this.activeState; // Estado atual.
        this.initialState; // Estado inicial.
        this.finalState; // Estado final.
    }

    
    //--------------------------------------------------------------------
    // Loop principal.
    //--------------------------------------------------------------------

    
    // Determina o proximo estado verificando todas as transiçoes do estado atual.
    Update()
    {
        // Verifica inicialmente se o estado possui transiçoes.
        if(this.states[this.activeState].transitions[0])
        {
            for(var i = 0; i < this.states[this.activeState].transitions.length; i++)
            {
                this.activeState = this.states[this.activeState].transitions[i].MakeTransition();
            }
        }
    }

    //--------------------------------------------------------------------
    // Funções de adição.
    //--------------------------------------------------------------------

    // Adiciona um novo estado.
    AddState(stateName)
    {
        this.states[stateName] = new State(name);
    }

    
    // Adiciona uma nova transição. As variaveis "varToCompare", "condition"
    // e "value" são vetores. 
    AddTransition(state, nextState, varToCompare, condition, value)
    {
        this.states[state].transitions.push(new Transition(this.holder, state, nextState, varToCompare, condition, value));
    }

    
    //--------------------------------------------------------------------
    // Funções auxiliares.
    //--------------------------------------------------------------------
    
    // Adiciona o estado inicial e torna esse o estado ativo.
    SetInitialState(state)
    {
        this.initialState = state;
        this.activeState = this.initialState;
    }
}