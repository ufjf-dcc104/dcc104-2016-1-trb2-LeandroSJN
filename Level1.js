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