var TS = screen.height/7;
var G = 0.8*screen.height;
            
var mapaX = 0;
var mapaVx = 0;
var mapaAx = 0;

var mapa = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
var pc = {
    w: screen.height/7,
    h: screen.height/7,
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
    for(var i = 0; i < 7; i++)
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
    ctx.fillStyle = "blue";
    ctx.fillRect(pc.x - pc.w / 2, pc.y - pc.h / 2, pc.w, pc.h);
    
    imgLib.drawCentered(ctx, "stoped", pc.x, pc.y, pc.w, pc.h);

    ctx.strokeStyle = "red";
    ctx.strokeRect(pc.xi * TS + mapaX, pc.yi * TS, TS, TS);
    
    ctx.fillStyle = "yellow";
    ctx.fillRect(pc.x - 5, pc.y - 5, 10, 10);
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
                pc.vy = -0.7*screen.height;
                pc.jumping = true;
                console.log(pc.vy/TS);
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