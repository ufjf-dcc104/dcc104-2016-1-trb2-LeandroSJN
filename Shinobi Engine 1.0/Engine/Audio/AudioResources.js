//////////////////////////////////////////////////////////////////////////
// Autor: Igor Knop
// Criado: 2015
// Modificado: 14/07/2017 - Leandro Dornela Ribeiro:
//                          Documentação.
//                          Alteração de padão.
//////////////////////////////////////////////////////////////////////////


/**
 * @desc Biblioteca de audio.
 */
class AudioResources
{
    // Construtor.
    constructor(numcanais)
    {
        this.numcanais = numcanais||10;
        this.sons = {};
        this.canais = [];
        this.ativos = {};
        this.loop = [];
        for(var i = 0; i < this.numcanais; i++)
        {
            this.canais[i] = {
                "audio": new Audio(),
                "fim": -1
            };
        }
    }
    

    // Carrega e adiciona uma faixa de audio.
    Load(key, src, loop)
    {
        this.sons[key] = new Audio(src);
        this.sons[key].load();
        this.loop.push(loop);
    }

    
    // Reproduz uma faixa de audio.
    Play(key, duration)
    {
        if(this.ativos[key]) return;
        if(duration)
        {
            this.ativos[key] = true;
            setTimeout((function(that){
                return function(){
                    delete that.ativos[key];
                };
            })(this), duration);
        }

        var agora = new Date();
        for(var i = 0; i < this.numcanais; i++)
        {
            if(this.canais[i].fim<agora.getTime())
            {
                this.canais[i].fim = agora.getTime()+this.sons[key].duration*1000;
                this.canais[i].audio.src = this.sons[key].src;
                this.canais[0].audio.addEventListener('ended', function() { this.currentTime = 0; this.play(); }, false);
                this.canais[i].audio.play();
                break;
            }
        }
    }
}
