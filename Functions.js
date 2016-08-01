
function directionalVector(object1, object2)
{
    var vector = [];
    vector[0] = object2.x - object1.x;
    vector[1] = object2.y - object1.y;
    var mod = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
    vector[0] = vector[0]/mod;
    vector[1] = vector[1]/mod;
    return vector;
}

function distance(object1, object2)
{
    var x = object2.x - object1.x;
    var y = object2.y - object1.y;
    var mod = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return mod;
}