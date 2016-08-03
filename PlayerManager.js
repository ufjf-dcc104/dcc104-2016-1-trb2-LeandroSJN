function StartPlayerManager()
{
    imgLib.addImage("stopped", "img/stopped.png");
    imgLib.addImage("jumping", "img/jumping.png");
    imgLib.addImage("walking", "img/walking.png");
    imgLib.addImage("shoting", "img/shoting.png");
    imgLib.addImage("jumpingShoting", "img/jumpingShoting.png");
    audioLib.load("landing", "sound/landing.mp3");
    audioLib.load("kunai", "sound/kunai.mp3");
    player = new Player();
}

function playerStateManager()
{
    //1-stoped, 2-jumping, 3-walking, 4-shoting, 5-jumping shoting
    if(player.shotTime >= player.shotAnimation)
    {
        if(player.vy != 0)
        {
            player.state = 2;
        }
        else if(player.onPlatform)
        {
            if(player.vx != 0 || layers[activeLayer].mapaVx != 0)
            {
                player.state = 3;
            }
            else
            {
                player.state = 1;
            }
            if(player.damaged)
            {
                player.damaged = false;
                layers[activeLayer].mapaVx = 0;
                player.vx = 0;
            }
        }
    }
    else
    {
        if(player.vy != 0)
        {
            player.state = 5;
        }
        else if(player.onPlatform)
        {
            player.state = 4;
        }
    }
    player.shotTime += 1*dt;
}

function UpdatePlayerManager()
{
    if(player.state != 4)
    {
        if(player.x >= player.w/2)
        {
            player.Move(dt, layers[activeLayer].mapa);
        }
        else
        {
            player.x = player.w/2;
            player.vx = 0;
        }
    }
    if(layers[activeLayer].mapaX >= 0 && player.x < screen.width/2)
    {
        //staticCamera = false;
    }
    playerStateManager();
}

function KeydownPlayerManager(key)
{
    if(!player.damaged)
    {
        switch(key)
        {
            case 65:
                if(staticCamera && player.state != 4) player.vx = -player.speedX;
            break;
            case 68:
                if(staticCamera && player.state != 4) player.vx = player.speedX;
            break;
            case 87:
                if(player.state == 1 || player.state == 3 )
                {
                    console.log(player.state, "jump");
                    player.vy = -player.speedY;
                    player.state = 2;
                    player.onPlatform = false;
                }
            break;
            case 32:
                var shot = new Shot(player.x, player.y);
                var direction = directionalVector(shot, aim);
                shot.vx = shot.vx*direction[0];
                shot.vy = shot.vy*direction[1];
                shot.ang = angle(shot);
                player.shots.push(shot);
            break;
        }
    }
}

function KeyupPlayerManager(key)
{
    if(!player.damaged)
    {
        switch(key)
        {
            case 65:
                player.ax = 0;
                player.vx = 0;
            break;
            case 68:
                player.ax = 0;
                player.vx = 0;
            break;
            case 38:
            break;
        }
    }
}

function mouseclickPlayerManager(key)
{
    if(player.shotTime >= player.shotAnimation && !player.damaged)
    {
        if(player.ammo != 0)
        {
            var shot = new Shot(player.x, player.y);
            var direction = directionalVector(shot, aim);
            shot.vx = shot.vx*direction[0];
            shot.vy = shot.vy*direction[1];
            shot.ang = angle(shot);
            player.shots.push(shot);
            player.ammo--;
            
            if(player.state != 2)
            {
                layers[activeLayer].mapaAx = 0;
                layers[activeLayer].mapaVx = 0;
                player.ax = 0;
                player.vx = 0;
            }
            
            audioLib.play("kunai");

            player.shotTime = 0;
        }
    }
}