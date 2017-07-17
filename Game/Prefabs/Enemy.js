/*
    * @desc Classe para um inimigo.
*/
class Enemy extends GameObject
{
    // Construtor.
    constructor(x, y)
    {
        super();
        
        var ny = 6*system.globalTileSize - screen.height/14 - 1;
        
        // Componentes.
        this.transform = new Transform(this, x, ny, 0, system.globalTileSize, system.globalTileSize);
        this.rigidbody = new Rigidbody(0, 0, 0, 0, 0, 0);
        this.collider = new BoxCollider(this, 0, 0, this.transform.width/8, this.transform.height, angle);
        this.health = new Health(99999999);
        this.ammo = new RangedAttack(10, 999, 9999999999, 0.2);
        this.drawOrder = 8;
        
        this.moveWithCamera = false;
        
        this.type = "Enemy";
    }
    
    
    //--------------------------------------------------------------------
    // Funções do loop principal.
    //--------------------------------------------------------------------
    
    
    // Inicializa o player.
    Start()
    {
        
    }
    
    
    // Atualiza os parametros do player.
    Update()
    {
        this.IA();
        this.Move();
        this.StateManager();
        this.collider.Update();
        this.CollisionTreatment();
    }
    
    
    // Desenha o player de acordo com seu estado.
    Draw()
    {
        ctx.save();
            var scale = side(system.GetObjectsByType("Player"), this);    
            
            ctx.scale(scale,1);
        
            if(this.stopped)
            {
                system.imgLib.DrawCentered(ctx, "enemyStopped", scale*this.transform.possition.x, this.transform.possition.y, this.transform.width, this.transform.height);
            }  
            else if(this.jumping)
            {
                system.imgLib.DrawCentered(ctx, "enemyJumping", scale*this.transform.possition.x, this.transform.possition.y, this.transform.width, this.transform.height);
            }  
            else if(this.shoting)
            {
                system.imgLib.DrawCentered(ctx, "enemyShoting", scale*this.transform.possition.x, this.transform.possition.y, this.transform.width, this.transform.height);
            }  
            else if(this.jumpingShoting)
            {
                system.imgLib.DrawCentered(ctx, "enemyJumpingShoting", scale*this.transform.possition.x, this.transform.possition.y, this.transform.width, this.transform.height);
            }
        ctx.restore();

        ctx.strokeStyle = "red";
        ctx.strokeRect(this.transform.matrixPossition.x * system.GetObjectBySpecialIndex("ActiveLayer").TS + system.GetObjectBySpecialIndex("ActiveLayer").transform.possition.x, this.transform.matrixPossition.y * system.GetObjectBySpecialIndex("ActiveLayer").TS, system.GetObjectBySpecialIndex("ActiveLayer").TS, system.GetObjectBySpecialIndex("ActiveLayer").TS);

        ctx.fillStyle = "yellow";
        ctx.fillRect(this.transform.possition.x - 5, this.transform.possition.y - 5, 10, 10);
        
        this.collider.Draw();
    }
    
    
    //--------------------------------------------------------------------
    // Funções Secundarias.
    //--------------------------------------------------------------------
    
    
    StateManager()
    {
        this.ResetStates();
        
        this.IsStopped(this)
        this.IsJumping(this)
        this.IsWalking(this)
        this.IsShoting(this)
        this.IsJumpingShoting(this)
    }
    
    
    // IA do inimigo.
    IA()
    {
        /*for(var i in enemies)
        {
            enemiesStateManager(enemies[i]);

            if(enemies[i].onPlatform)
            {
                if(distance(enemies[i], player) < 0.25*screen.height)
                {
                    enemies[i].vy = -player.rigidbody.defaultSpeedY;
                    enemies[i].onPlatform = false;
                    if(enemies[i].x - player.transform.possition.x < 0)
                    {
                        enemies[i].vx = -0.5*player.rigidbody.defaultSpeed.x;
                    }
                    else
                    {
                        enemies[i].vx = 0.5*player.rigidbody.defaultSpeed.x;
                    }
                }
                else if(distance(enemies[i], player) > 0.7*screen.height)
                {
                    enemies[i].vy = -player.rigidbody.defaultSpeedY;
                    enemies[i].onPlatform = false;
                    if(enemies[i].x - player.transform.possition.x < 0)
                    {
                        enemies[i].vx = 0.5*player.rigidbody.defaultSpeed.x;
                    }
                    else
                    {
                        enemies[i].vx = -0.5*player.rigidbody.defaultSpeed.x;
                    }
                }
                else
                {
                    enemies[i].vx = 0;
                }
            }

            enemies[i].Move();

            if(enemies[i].shotTime >= enemies[i].shotAnimation)
            {
                var shot = new Shot(enemies[i].x, enemies[i].y);
                var direction = directionalVector(shot, player);
                shot.vx = shot.vx*direction[0];
                shot.vy = shot.vy*direction[1];
                shot.ang = angle(shot);
                enemiesShots.push(shot);

                system.audioLib.Play("kunai");

                enemies[i].shotTime = 0;
            }
            else
            {
                enemies[i].shotTime += 1*dt;
            }

            if(player.attackTime <= player.attackAnimation)
            {
                if(quadCollision(player.attackArea, enemies[i].collider))
                {
                    enemies.splice(i,1);
                    totalEnemies--;
                    break;
                }
            }
        }*/
    }
    
    
    // Movimento do inimigo.
    Move()
    {   
        this.rigidbody.relativeSpeedX = this.rigidbody.relativeSpeedX + this.rigidbody.acceleration.x * system.deltaTime;
        this.rigidbody.speed.x = this.rigidbody.relativeSpeedX + system.GetObjectBySpecialIndex("ActiveLayer").rigidbody.speed.x;
        
        this.rigidbody.speed.y = this.rigidbody.speed.y + this.rigidbody.acceleration.y * system.deltaTime + system.G * system.deltaTime;
        this.transform.possition.x = this.transform.possition.x + this.rigidbody.speed.x * system.deltaTime;
        
        
        this.transform.matrixPossition.x = Math.floor((system.GetObjectBySpecialIndex("ActiveLayer").relativeX + this.transform.possition.x - screen.width/2) / system.GetObjectBySpecialIndex("ActiveLayer").TS);
        this.transform.matrixPossition.y = Math.floor((system.GetObjectBySpecialIndex("ActiveLayer").relativeY + (this.transform.possition.y - (6*system.globalTileSize - screen.height/14))) / system.GetObjectBySpecialIndex("ActiveLayer").TS);
        //this.transform.matrixPossition.y = Math.floor(this.transform.possition.y / system.GetObjectBySpecialIndex("ActiveLayer").TS);

        if(system.GetObjectBySpecialIndex("ActiveLayer").mapa[this.transform.matrixPossition.y + 1][this.transform.matrixPossition.x] == 2 ||
           system.GetObjectBySpecialIndex("ActiveLayer").mapa[this.transform.matrixPossition.y + 1][this.transform.matrixPossition.x] == 1)
        {
            var foot = this.transform.possition.y + this.transform.height / 2;
            
            // Para o calculo do top deve se fazer a compensação do deslocamento do mapa.
            var top = ((this.transform.matrixPossition.y + 1) * system.GetObjectBySpecialIndex("ActiveLayer").TS) - (system.GetObjectBySpecialIndex("ActiveLayer").relativeY - (6*system.globalTileSize - screen.height/14));
            
            this.rigidbody.speed.y = Math.min(this.rigidbody.speed.y, Math.abs((top - foot) / system.deltaTime));
            
            if(this.rigidbody.speed.y == system.GetObjectBySpecialIndex("ActiveLayer").rigidbody.speed.y && !this.onPlatform)
            {
                this.onPlatform = true;
                
                if(this.jumping || this.jumpingShoting)
                {
                    system.audioLib.Play("landing");
                }
            }
        }
        
        this.transform.possition.y = this.transform.possition.y + this.rigidbody.speed.y * system.deltaTime;

        // Move o player de acordo com o movimento do mapa.
        this.transform.possition.y = this.transform.possition.y + system.GetObjectBySpecialIndex("ActiveLayer").rigidbody.speed.y * system.deltaTime;
    }
    
    
    // Determina oque acontece quando o objeto colide com outro especifico.
    CollisionTreatment()
    {
        var result = collisionSystem.Collides(this, system.GetObjectsByType("PlayerShot"));
        if(result)
        {
            /*(holder, sprite, frameWidth, frameHeight, scaleW, scaleH, deslocX, deslocY, frames, fps,
                relativeX, relativeY, angle, width, height, fixed,
                max, interval, duration, particleDuration,
                speedX, speedY, angularSpeed,
                randomized, randomSpaceX, randomSpaceY, angleMin, angleMax)*/
            
            var particle = new Particle(this,"blood1",32,32,1,1,0,0,8,5.75,// Sprite.
                                     0,0,0,32,32, true, // Transform.
                                     10000,0.1,100.71,100.71,10,10, 0,
                                     true, 100, 100, 0, 2*Math.PI);// Particle.
        
            //system.AddGameObject(particle);
            
            console.log("Enemy hit");
        }
    }
}