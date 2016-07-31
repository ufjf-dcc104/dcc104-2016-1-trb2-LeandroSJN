var player;
var enemies = [];
var layers = [];

function StartLevel1()
{
    StartMapManager();
    StartPlayerManager();
}
    
function UpdateLevel1()
{
    UpdateMapManager();
    UpdatePlayerManager();
}

function DrawLevel1()
{
    for(var i = 0; i <= activeLayer; i++)
    {
        layers[i].DrawMap();
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
}

function KeyupLevel1(key)
{
    KeyupMapManager(key);
    KeyupPlayerManager(key);
}