//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Descrição: Conjunto de funções uteis.
// Criado: 2015
// Modificado: 14/07/2017 - Documentação
//////////////////////////////////////////////////////////////////////////


// Limpa a tela.
function ClearScreen()
{
    ctx.fillStyle = "black";
    ctx.clearRect(0,0, screen.width, screen.height);
    ctx.fillRect(0, 0, screen.width, screen.height);
}


// Oculta o cursor.
function HideCursor()
{
    document.getElementsByTagName("canvas")[0].style.cursor = "none";
}


// Oculta as barras de rolagem.
function HideBars()
{
    document.body.style.overflow = 'hidden';
}


// Calcula o modulo de um vetor.
function Mod(vector)
{
    var mod = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
    return mod;
}


// Normalisa um vetor.
function Normalize(vector)
{
    var mod = Mod(vector);
    var nVector = new vec2();
    
    nVector.x = vector.x/mod;
    nVector.y = vector.y/mod;
    
    return nVector;
}


// Retorna o vetor direcional do objeto1 ao objeto2.
function directionalVector(object1, object2)
{
    var vector = new vec2();
    vector.x = object2.transform.possition.x - object1.transform.possition.x;
    vector.y = object2.transform.possition.y - object1.transform.possition.y;
    
    return Normalize(vector);
}


// Retorna em qual lado o objeto1 está em relação ao objeto2 no eixo x.
function direction(object1, object2)
{
    if(object1.transform.possition.x < object2.transform.possition.y) return 1;
    else return -1;
}


// Retorna a distancia entre dois pontos.
function distance(object1, object2)
{
    var vector = new vec2();
    vector.x = object2.transform.possition.x - object1.transform.possition.x;
    vector.y = object2.transform.possition.y - object1.transform.possition.y;
    var mod = Mod(vector);
    return mod;
}


// Retorna o angulo de inclinação de um objeto de acordo com sua velocidade.
function angle(object)
{
    var vector = new vec2();
    vector.x = object.rigidbody.speed.x;
    vector.y = object.rigidbody.speed.y;
    var mod = Mod(vector);
    var ang = Math.acos((object.rigidbody.speed.x)/mod);
    if(object.rigidbody.speed.y < 0)
    {
        ang = -ang;
    }
    return ang;
}


// Retorna uma direcao dado um angulo.
function AngleToDirection(angle)
{
    var vector = new vec2();
    vector.x = Math.cos(angle);
    vector.y = Math.sin(angle);
    
    return vector;
}


// Retorna uma posicao aleatoria em um quadrado.
function RandomInQuad(center, sizeX, sizeY)
{
    var minX = center.x - sizeX/2;
    var maxX = center.x + sizeX/2;
    var minY = center.y - sizeY/2;
    var maxY = center.y + sizeY/2;
    
    var possition = new vec2();
    
    possition.x = Math.floor(Math.random() * (maxX - minX + 1) ) + minX;
    possition.y = Math.floor(Math.random() * (maxY - minY + 1) ) + minY;
    
    return possition;
}


// Retorna um angulo aleatorio em um intervalo.
function RandomAngle(angleMin, angleMax)
{
    return Math.random() * (angleMax - angleMin + 1) + angleMin;
}


// Retorna 1 se o objeto1 esta na direita e -1 se esta a esqueda do objeto2.
function side(object1, object2)
{
    if(object1.transform.possition.x < object2.transform.possition.x)
    {
        return -1;
    }
    else
    {
        return 1;
    }
}


// Remove 5 cassas decimais de um numero.
function cutDecimal(num)
{
    return Math.round(num*100000)/100000;
}