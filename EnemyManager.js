var spawnTime = 0;

function StartEnemyManager()
{
    
}

function spawnEnemy()
{
    if(spawnTime >= 1)
    {
        var enemy = new Enemy(screen.width, 0);
        enemies.push(enemy);
        spawnTime = 0;
    }
    else
    {
        spawnTime += 1*dt;
    }
}

function UpdateEnemyManager()
{
    spawnEnemy();
    
    for(var i in enemies)
    {
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
            else if(distance(enemies[i], player) > screen.height)
            {
                enemies[i].vy = -player.speedY;
                enemies[i].state = 2;
                if(enemies[i].x - player.x < 0)
                {
                    enemies[i].vx = 0.5*player.speedX;
                }
                else
                {
                    enemies[i].vx = -0.5*player.speedX;
                }
            }
            else
            {
                enemies[i].vx = 0;
            }
        }
        
        enemies[i].Move();
        
        if(enemies[i].shotTime >= 1)
        {
            var shot = new Shot(enemies[i].x, enemies[i].y);
            var direction = directionalVector(shot, player);
            shot.vx = shot.vx*direction[0];
            shot.vy = shot.vy*direction[1];
            shot.ang = angle(shot);
            enemiesShots.push(shot);
            
            enemies[i].shotTime = 0;
        }
        else
        {
            enemies[i].shotTime += 1*dt;
        }
    }
}