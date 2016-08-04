var spawnTime = 0;
var totalEnemies = 0;
var maxEnemies = 5;

function StartEnemyManager()
{
    imgLib.addImage("enemyStopped", "img/enemyStopped.png");
    imgLib.addImage("enemyShoting", "img/enemyShoting.png");
    imgLib.addImage("enemyJumping", "img/enemyJumping.png");
    imgLib.addImage("enemyJumpingShoting", "img/enemyJumpingShoting.png");
}

function spawnEnemy()
{
    if(spawnTime >= 5 && totalEnemies < maxEnemies)
    {
        var enemy = new Enemy(screen.width, 0);
        enemies.push(enemy);
        totalEnemies++;
        spawnTime = 0;
    }
    else
    {
        spawnTime += 1*dt;
    }
}

//1-stoped, 2-juming, 3-shoting, 4-jumping shoting
function enemiesStateManager(enemy)
{
    if(enemy.shotTime >= enemy.shotAnimation)
    {
        if(enemy.onPlatform)
        {
            enemy.state = 1;
        }
        else
        {
            enemy.state = 2;
        }
    }
    else
    {
        if(enemy.onPlatform)
        {
            enemy.state = 3;
        }
        else
        {
            enemy.state = 4;
        }
    }
}

function enemiesIa()
{
    for(var i in enemies)
    {
        if(enemies[i].onPlatform)
        {
            if(distance(enemies[i], player) < 0.25*screen.height)
            {
                enemies[i].vy = -player.speedY;
                enemies[i].onPlatform = false;
                if(enemies[i].x - player.x < 0)
                {
                    enemies[i].vx = -0.5*player.speedX;
                }
                else
                {
                    enemies[i].vx = 0.5*player.speedX;
                }
            }
            else if(distance(enemies[i], player) > 0.7*screen.height)
            {
                enemies[i].vy = -player.speedY;
                enemies[i].onPlatform = false;
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
        
        enemiesStateManager(enemies[i]);
        
        if(enemies[i].shotTime >= enemies[i].shotAnimation + 1)
        {
            var shot = new Shot(enemies[i].x, enemies[i].y);
            var direction = directionalVector(shot, player);
            shot.vx = shot.vx*direction[0];
            shot.vy = shot.vy*direction[1];
            shot.ang = angle(shot);
            enemiesShots.push(shot);
            
            audioLib.play("kunai");
            
            enemies[i].shotTime = 0;
        }
        else
        {
            enemies[i].shotTime += 1*dt;
        }
    }
}

function UpdateEnemyManager()
{
    spawnEnemy();
    enemiesIa();
}