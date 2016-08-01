function StartEnemyManager()
{
    var enemy = new Enemy(700, 0);
    enemies.push(enemy);
}

function UpdateEnemyManager()
{
    for(var i in enemies)
    {
        console.log(enemies[i].state);
        if(enemies[i].state == 1)
        {
            if(distance(enemies[i], player) < screen.height/4)
            {
                enemies[i].vy = -player.speedY;
                enemies[i].state = 2;
                if(enemies[i].x - player.x < 0)
                {
                    enemies[i].vx = -0.5*player.speedX;
                }
                else
                {
                    enemies[i].vx = 0.5*player.speedX;
                }
            }
            else
            {
                enemies[i].vx = 0;
            }
        }
        console.log(enemies[i].state);
        
        enemies[i].Move();
    }
}