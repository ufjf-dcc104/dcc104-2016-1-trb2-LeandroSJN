var player;
var enemies = [];
var layers = [];

function StartLevel1()
{
    StartMapManager();
    StartPlayerManager();
    StartShotManager();
    StartEnemyManager();
    StartInterface();
    audioLib.load("theShinobi", "sound/theShinobi.mp3");
    audioLib.play("theShinobi");
}
    
function UpdateLevel1()
{
    UpdateMapManager();
    UpdatePlayerManager();
    UpdateShotManager();
    UpdateEnemyManager();
    UpdateInterface();
}

function DrawLevel1()
{
    for(var i = 0; i <= activeLayer; i++)
    {
        layers[i].DrawMap();
    }
    for(var i in player.shots)
    {
        player.shots[i].Draw();
    }
    player.Draw();
    for(var i in enemies)
    {
        for(var j in enemies[i].shots)
        {
            enemies[i].shots[j].Draw();
        }
        enemies[i].Draw();
    }
    for(var i in enemiesShots)
    {
        enemiesShots[i].Draw();
    }
    for(var i = activeLayer + 1; i < totalLayers; i++)
    {
        layers[i].DrawMap();
    }
    DrawInterface();
}

function KeydownLevel1(key)
{
    KeydownMapManager(key);
    KeydownPlayerManager(key);
    KeydownShotManager(key);
    KeydownInterface(key);
}

function KeyupLevel1(key)
{
    KeyupMapManager(key);
    KeyupPlayerManager(key);
    KeyupShotManager(key);
    KeyupInterface(key);
}

function mouseclickLevel1(key)
{
    mouseclickPlayerManager(key);
    mouseclickInterface(key);
}