var enemiesShots = [];

function StartShotManager()
{
    imgLib.addImage("kunai", "img/kunai.png");
}

function removeInvisibleShot(shotsVector, shot, i)
{
    if(shot.x > screen.width || shot.x < 0)
    {
        shotsVector.splice(i,1);
        return true;
    }
    return false;
}

function UpdateShotManager()
{
    for(var i in player.shots)
    {
        if(!player.shots[i].active && quadCollision(player.shots[i], player))
        {
            if(player.ammo < player.maxAmmo)
            {
                player.shots.splice(i,1);
                player.ammo++;
                break;
            }
        }
        if(!removeInvisibleShot(player.shots, player.shots[i], i))
        {
            player.shots[i].Move();
            for(var j in enemies)
            {
                if(player.shots[i].active && quadCollision(player.shots[i], enemies[j]))
                {
                    enemies.splice(j,1);
                    player.shots.splice(i,1);
                    break;
                }
            }
        }
    }
    for(var i in enemiesShots)
    {
        if(!removeInvisibleShot(enemiesShots, enemiesShots[i], i))
        {
            enemiesShots[i].Move();
            if(enemiesShots[i].active && quadCollision(enemiesShots[i], player))
            {
                enemiesShots.splice(i,1);
                player.hp -= 10;
                break;
            }
        }
    }
}

function KeydownShotManager(key)
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

function KeyupShotManager(key)
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