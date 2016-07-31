function StartShotManager()
{
    
}

function UpdateShotManager()
{
    for(var i in player.shots)
    {
        if(player.shots[i].x > screen.width || player.shots[i].x < 0)
        {
            player.shots.splice(i,1);
        }
        else
        {
            player.shots[i].Move();
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