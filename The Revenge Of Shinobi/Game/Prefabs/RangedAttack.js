/**
    * @desc Class para controle de ataques a distancia.
*/
class RangedAttack
{
    // Construtor.
    constructor(damage, ammo, maxAmmo, refreshTime)
    {
        this.damage = damage;
        this.actualAmmo = ammo;
        this.maxAmmo = maxAmmo;
        this.refresh = refreshTime;
        this.atualTime = this.refresh;
        this.type = "RangedAttack";
    }
    
    
    // Atualiza os paramentros.
    Update()
    {
        this.atualTime += system.deltaTime;
    }
    
    // Retorna verdadeiro se houver munição.
    haveAmmo()
    {
        if(this.actualAmmo > 0)
        {
            return true;
        }
        return false;
    }
    
    
    // Cria um tiro.
    CreateShot(holder)
    {
        // Se o player possui munição.
        if(this.haveAmmo())
        {
            var shot;
                
            // Posiciona o tiro em ralação ao player de acordo com a posição da mira.
            if(system.cursor.transform.possition.x < holder.transform.possition.x)
            {
                shot = new Shot(holder.transform.possition.x - 0.3*holder.transform.width, holder.transform.possition.y - 0.2*holder.transform.height);
            }
            else
            {
                shot = new Shot(holder.transform.possition.x + 0.3*holder.transform.width, holder.transform.possition.y - 0.2*holder.transform.height);
            }

            // Obtem a direção do tiro a mira.
            var direction = directionalVector(shot, system.cursor);
                
            // Multiplica a velocidade do tiro pelo vetor unitario de direção.
            shot.rigidbody.speed.x = shot.rigidbody.speed.x*direction.x;
            shot.rigidbody.speed.y = shot.rigidbody.speed.y*direction.y;
                
            // Obtem o angulo do tiro de acordo com sua velocidade.
            shot.transform.angle = angle(shot);
                
            this.actualAmmo--;

            // Reproduz o audio do disparo.
            system.audioLib.Play("kunai");

            this.atualTime = 0;
            
            return shot;
        }
    }
    
    
    // Cria um tiro do player.
    CreatePlayerShot(holder)
    {
        // Se o player possui munição.
        if(this.haveAmmo())
        {
            var shot;
                
            // Posiciona o tiro em ralação ao player de acordo com a posição da mira.
            if(system.cursor.transform.possition.x < holder.transform.possition.x)
            {
                shot = new PlayerShot(holder.transform.possition.x - 0.3*holder.transform.width, holder.transform.possition.y - 0.2*holder.transform.height);
            }
            else
            {
                shot = new PlayerShot(holder.transform.possition.x + 0.3*holder.transform.width, holder.transform.possition.y - 0.2*holder.transform.height);
            }

            // Obtem a direção do tiro a mira.
            var direction = directionalVector(shot, system.cursor);
                
            // Multiplica a velocidade do tiro pelo vetor unitario de direção.
            shot.rigidbody.speed.x = shot.rigidbody.speed.x*direction.x;
            shot.rigidbody.speed.y = shot.rigidbody.speed.y*direction.y;
                
            // Obtem o angulo do tiro de acordo com sua velocidade.
            shot.transform.angle = angle(shot);
                
            this.actualAmmo--;

            // Reproduz o audio do disparo.
            system.audioLib.Play("kunai");

            this.atualTime = 0;
            
            return shot;
        }
    }
    
    
    // Cria um tiro do inimigo.
    CreateEnemyShot(holder)
    {
        // Se o player possui munição.
        if(this.haveAmmo())
        {
            var shot;
                
            // Posiciona o tiro em ralação ao player de acordo com a posição da mira.
            if(system.cursor.transform.possition.x < holder.transform.possition.x)
            {
                shot = new EnemyShot(holder.transform.possition.x - 0.3*holder.transform.width, holder.transform.possition.y - 0.2*holder.transform.height);
            }
            else
            {
                shot = new EnemyShot(holder.transform.possition.x + 0.3*holder.transform.width, holder.transform.possition.y - 0.2*holder.transform.height);
            }

            // Obtem a direção do tiro a mira.
            var direction = directionalVector(shot, system.cursor);
                
            // Multiplica a velocidade do tiro pelo vetor unitario de direção.
            shot.rigidbody.speed.x = shot.rigidbody.speed.x*direction.x;
            shot.rigidbody.speed.y = shot.rigidbody.speed.y*direction.y;
                
            // Obtem o angulo do tiro de acordo com sua velocidade.
            shot.transform.angle = angle(shot);
                
            this.actualAmmo--;

            // Reproduz o audio do disparo.
            system.audioLib.Play("kunai");

            this.atualTime = 0;
            
            return shot;
        }
    }
}