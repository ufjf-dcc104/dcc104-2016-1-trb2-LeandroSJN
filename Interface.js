function StartInterface()
{
    imgLib.addImage("interface", "img/interface.png");
    imgLib.addImage("vignetting", "img/vignetting.png");
}

function UpdateInterface()
{
    
}

function DrawInterface()
{
    //ctx.fillStyle = "yellow";
    //ctx.fillRect(0, 0, screen.width, screen.height/7);
    imgLib.drawCentered(ctx, "vignetting", screen.width/2, screen.height/2, screen.width, screen.height);
    imgLib.drawCentered(ctx, "interface", screen.width/2, screen.height/14, screen.width, screen.height/7);
    ctx.font= screen.height/20 + "px Aniron Bold";
    ctx.fillStyle = "black";
    ctx.fillText("LIFE " + player.hp, screen.height/10, screen.height/14 + screen.height/80);
    ctx.fillText("KUNAIS " + player.ammo, screen.height/2, screen.height/14 + screen.height/80);
    if(!inGame)
    {
        ctx.fillText("FIM DE JOGO!", screen.width/2, screen.height/14 + screen.height/80);
        if(player.hp > 0)
        {
            ctx.fillText("SUCESSO!", screen.width/2 + screen.width/4, screen.height/14 + screen.height/80);
        }
        else
        {
            ctx.fillText("FRACASSOU!", screen.width/2 + screen.width/4, screen.height/14 + screen.height/80);
        }
    }
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