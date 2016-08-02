function StartInterface()
{
    
}

function UpdateInterface()
{
    
}

function DrawInterface()
{
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, screen.width, screen.height/7);
    ctx.font= screen.height/20 + "px LCD";
    ctx.fillStyle = "black";
    ctx.fillText("Lives " + player.hp, screen.height/10, screen.height/14);
    ctx.fillText("Kunais " + player.ammo, screen.height/2, screen.height/14);
}

function KeydownInterface(key)
{
    switch(key)
    {
        case 37:
        break;
        case 39:
        break;
        case 38:
        break;
        case 32:
        break;
    }
}

function KeyupInterface(key)
{
    switch(key)
    {
        case 37:
        break;
        case 39:
        break;
        case 38:
        break;
    }
}

function mouseclickInterface(key)
{
    
}