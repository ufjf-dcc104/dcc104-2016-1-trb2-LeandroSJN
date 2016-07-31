var player;
var enemies = [];
var layers = [];

function StartLevel1()
{
    StartMapManager();
    StartPlayerManager();
    StartShotManager();
}
    
function UpdateLevel1()
{
    UpdateMapManager();
    UpdatePlayerManager();
    UpdateShotManager();
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
    for(var i = activeLayer + 1; i < totalLayers; i++)
    {
        layers[i].DrawMap();
    }
}

function KeydownLevel1(key)
{
    KeydownMapManager(key);
    KeydownPlayerManager(key);
    KeydownShotManager(key);
}

function KeyupLevel1(key)
{
    KeyupMapManager(key);
    KeyupPlayerManager(key);
    KeyupShotManager(key);
}

function mouseclickLevel1(key)
{
    mouseclickPlayerManager(key);
}