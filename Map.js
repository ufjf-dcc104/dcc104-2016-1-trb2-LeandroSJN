var TS = 64;
var G = 400;
            
var mapaX = 0;
var mapaVx = 0;
var mapaAx = 0;

var mapa = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
var pc = {
    w: 32,
    h: 64,
    x: screen.width/2,
    y: 180,
    xi: 0,
    yi: 0,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    jumping: false
}
            
var playerVirtualX = pc.x;
var playerVirtualY = pc.y;

function desenhaMapa()
{
    for(var i = 0; i < 10; i++)
    {
        for(var j = pc.xi - 10; j < pc.xi + 10; j++)
        {
            if(mapa[i][j] == 1)
            {
                ctx.fillStyle = "lightgray";
                ctx.fillRect(mapaX + (TS * j), TS * i, TS, TS);
            }
        }
    }
}
            
function moveMapa(dt)
{
    mapaVx = mapaVx + mapaAx * dt;
    mapaX = mapaX + mapaVx * dt;
    playerVirtualX = playerVirtualX - mapaVx * dt;
}

function desenhaPC()
{
    imgLib.drawRotatedScale(ctx, "stoped", pc.x, pc.y, pc.w, pc.h);

    ctx.strokeStyle = "red";
    ctx.strokeRect(pc.xi * TS + mapaX, pc.yi * TS, TS, TS);
}

function movePC(dt)
{
    pc.vx = pc.vx + pc.ax * dt;
    pc.x = pc.x + pc.vx * dt;
    pc.vy = pc.vy + pc.ay * dt + G * dt;

    pc.xi = Math.floor(playerVirtualX / TS);
    pc.yi = Math.floor(pc.y / TS);

    if(mapa[pc.yi + 1][pc.xi])
    {
        var foot = pc.y + pc.h / 2;
        var top = (pc.yi + 1) * TS;
        pc.vy = Math.min(pc.vy, Math.abs((top - foot)) / dt);
        if(pc.vy == 0)
        {
            pc.jumping = false;
        }
    }
    pc.y = pc.y + pc.vy * dt;
}

document.addEventListener("keydown", function(e)
{
    switch(e.keyCode)
    {
        case 37:
            mapaVx = 100;
        break;
        case 39:
            mapaVx = -100;
        break;
        case 38:
            if(!pc.jumping)
            {
                audioLib.play("jump", 1000);
                pc.vy = -300;
                pc.jumping = true;
            }
        break;
    }
});

document.addEventListener("keyup", function(e)
{
    switch(e.keyCode)
    {
        case 37:
            mapaAx = 0;
            mapaVx = 0;
        break;
        case 39:
            mapaAx = 0;
            mapaVx = 0;
        break;
        case 38:
        break;
    }
});