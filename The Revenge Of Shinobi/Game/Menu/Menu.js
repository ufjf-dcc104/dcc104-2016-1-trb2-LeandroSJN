//////////////////////////////////////////////////////////////////////////
// Autor: Leandro Dornela Ribeiro
// Criado: 20/07/2017
//////////////////////////////////////////////////////////////////////////


class Menu extends Level
{
    Start()
    {
        this.LoadImages();
        this.LoadSounds();

        this.aim = system.AddGameObject(new Aim(), "Aim", true);
        this.buttonLv1 = system.AddInterfaceComponent(new Button("button", screen.width/2, screen.height/2 - 150, 300, 100, 300, 100));
        this.buttonLv2 = system.AddInterfaceComponent(new Button("button", screen.width/2, screen.height/2, 300, 100, 300, 100));
        this.buttonLv3 = system.AddInterfaceComponent(new Button("button", screen.width/2, screen.height/2 + 150, 300, 100, 300, 100));


        system.audioLib.Play("theShinobi");
    }


    Update()
    {
        if(this.buttonLv1.click)
        {
            system.LoadLevel(new Level1());
        }
        if(this.buttonLv2.click)
        {
            system.LoadLevel(new Level1());
        }
        if(this.buttonLv3.click)
        {
            system.LoadLevel(new Level1());
        }
    }

    //--------------------------------------------------------------------
    // Funções auxiliares.
    //--------------------------------------------------------------------

    // Carrega todas as imagens que serao usadas no level.
    LoadImages()
    {
        system.imgLib.AddImage("kunai", "Game/img/kunai.png");
        system.imgLib.AddImage("button", "Game/img/button.png");
    }

    // Carrega todos os audios que serao usados no level.
    LoadSounds()
    {
        system.audioLib.Load("theShinobi", "Game/sound/theShinobi.mp3", true);
    }
}