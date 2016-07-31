var mousePos = 0;

function keydown(e)
{
    //console.log("Tecla Pressionada: " + e.keyCode);
    KeydownLevel1(e.keyCode);
}
        
function keyup(e)
{
    //console.log("Tecla Solta: " + e.keyCode);
    KeyupLevel1(e.keyCode);
}
            
function mouseclick(e)
{
    mouseclickLevel1(e.keyCode);
}
        
function getMousePos(screen, evt)
{
    var rect = screen.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}