//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 20/07/2017
//////////////////////////////////////////////////////////////////////////

class Button extends GameObject
{
    constructor(sprite, possitionX, possitionY, width, height, imageSizeX, imageSizeY)
    {
        super();

        this.type = "Button";
        this.click = false;

        this.transform.possition.x = possitionX;
        this.transform.possition.y = possitionY;
        this.transform.width = width;
        this.transform.height = height;
        
        this.AddAnimationController();
        this.animation.AddState("idle");
        this.animation.SetInitialState("idle");
        this.AddRenderComponent("idle", new SpriteAnimation(sprite, imageSizeX, imageSizeY, 1, 1, 0, 0, 0, 0, 0));
    }

    Click()
    {
        if((system.mousePos.x >= this.transform.possition.x - this.transform.width/2) &&
           (system.mousePos.x <= this.transform.possition.x + this.transform.width/2) &&
           (system.mousePos.y >= this.transform.possition.y - this.transform.height/2) &&
           (system.mousePos.y <= this.transform.possition.y + this.transform.height/2))
           {
               return true;
           }
           else
           {
               return false;
           }
    }

    Draw()
    {
        //ctx.strokeStyle = "rgb(0, 255, 255)";
        //ctx.strokeRect(this.transform.possition.x - this.transform.width/2, this.transform.possition.y - this.transform.height/2, this.transform.width, this.transform.height);

        //ctx.fillStyle = "rgb(0, 255, 255)";
        //ctx.fillRect(this.transform.possition.x - 2.5, this.transform.possition.y - 2.5, 5, 5);
    }

    MouseClick()
    {
        this.click = this.Click();
    }
}