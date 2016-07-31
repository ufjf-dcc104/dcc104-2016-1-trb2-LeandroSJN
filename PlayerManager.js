function StartPlayerManager()
{
    imgLib.addImage("stoped", "img/stoped.png");
    audioLib.load("jump", "sound/Cartoon Hop-SoundBible.com-553158131.mp3");
    player = new Player();
}

function UpdatePlayerManager()
{
    player.Move(dt, layers[activeLayer].mapa);
    player.Draw();
}

function KeydownPlayerManager(key)
{
    switch(key)
    {
        case 37:
            //if(layers[activeLayer].mapaX < 0) player.ax = 100;
        break;
        case 39:
            //if(layers[activeLayer].mapaX < 0) player.ay = -100;
        break;
        case 38:
            if(!player.jumping)
            {
                audioLib.play("jump");
                player.vy = -0.7*screen.height;
                player.jumping = true;
                console.log(player.vy/layers[0].TS);
            }
        break;
    }
}

function KeyupPlayerManager(key)
{
    switch(key)
    {
        case 37:
            player.ax = 0;
        break;
        case 39:
            player.ax = 0;
        break;
        case 38:
        break;
    }
}