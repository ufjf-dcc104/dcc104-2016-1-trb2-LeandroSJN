function StartMapManager()
{
    var map = new Map();
    layers.push(map);
}

function UpdateMapManager()
{
    layers[0].MoveMap(dt);
    layers[0].DrawMap();
}

function KeydownMapManager(key)
{
    switch(key)
    {
        case 37:
            layers[0].mapaVx = 100;
        break;
        case 39:
            layers[0].mapaVx = -100;
        break;
        case 38:
        break;
    }
}

function KeyupMapManager(key)
{
    switch(key)
    {
        case 37:
            layers[0].mapaAx = 0;
            layers[0].mapaVx = 0;
        break;
        case 39:
            layers[0].mapaAx = 0;
            layers[0].mapaVx = 0;
        break;
        case 38:
        break;
    }
}