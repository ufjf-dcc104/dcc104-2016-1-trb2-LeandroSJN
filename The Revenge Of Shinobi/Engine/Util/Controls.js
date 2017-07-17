//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 2016
// Modificado: 14/07/2017 - Documentação
//                        - Mudança na variavel mousePos.
//                        - Remoção de codigos comentados.
//////////////////////////////////////////////////////////////////////////


// Chama a função de keydown do sistema.
function keydown(e)
{
    system.KeyDown(e.keyCode);
}
        

// Chama a função de keyup do sistema.
function keyup(e)
{
    system.KeyUp(e.keyCode);
}
            

// Chama a função de mouseClick do sistema.
function mouseclick(e)
{
    system.MouseClick(e.keyCode);
}
        

// Obtem a posição do mouse na tela.
function getMousePos(screen, evt)
{
    var rect = screen.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}