class Level1 extends Level
{
    //--------------------------------------------------------------------
    // Funções do loop principal.
    //--------------------------------------------------------------------

    Start()
    {
        this.LoadImages();
        this.LoadSounds();

        this.StartMaps();

        system.AddGameObject(new Aim(), "Aim", true);
        system.AddGameObject(new Player(5), "Player", true);
        //system.AddGameObject(new Layer("background",0,screen.height/2,0,0,1280,720,10,true, 0));
        //system.AddGameObject(new Enemy(800, 300));
        system.camera = new CameraLevel1();

        system.AddGameObject(new TestObject(screen.width/2, screen.height/1.5, 500, 50));
        system.AddGameObject(new TestObject(screen.width/4, screen.height/2, 500, 50));
        system.AddGameObject(new TestObject(screen.width/1.5, screen.height/3, 500, 50));
        system.AddGameObject(new TestObject(screen.width/2, screen.height, screen.width-10, 50));
        system.AddGameObject(new TestObject(screen.width/2, 0, screen.width-10, 50));
        system.AddGameObject(new TestObject(screen.width, screen.height/2, screen.width/10, screen.height));
        system.AddGameObject(new TestObject(0, screen.height/2, screen.width/10, screen.height));

        this.buttonMenu = system.AddInterfaceComponent(new Button("button", 50, 25, 100, 50, 300, 100));
        
        system.audioLib.Play("theShinobi");
    }
    
    
    Update()
    {   
        if(this.buttonMenu.click)
        {
            system.LoadLevel(new Menu());
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

        system.imgLib.AddImage("stopped", "Game/img/stopped.png");
        system.imgLib.AddImage("jumping", "Game/img/jumping.png");
        system.imgLib.AddImage("walking", "Game/img/walking.png");
        system.imgLib.AddImage("shoting", "Game/img/shoting.png");
        system.imgLib.AddImage("jumpingShoting", "Game/img/jumpingShoting.png");
        system.imgLib.AddImage("crouchedStopped", "Game/img/crouchedStopped.png");
        system.imgLib.AddImage("crouchedWalking", "Game/img/crouchedWalking.png");
        system.imgLib.AddImage("crouchedShoting", "Game/img/crouchedShoting.png");
        system.imgLib.AddImage("attacking", "Game/img/attacking.png");
        system.imgLib.AddImage("crouchedAttacking", "Game/img/crouchedAttacking.png");
        system.imgLib.AddImage("jumpingAttacking", "Game/img/jumpingAttacking.png");

        system.imgLib.AddImage("enemyStopped", "Game/img/enemyStopped.png");
        system.imgLib.AddImage("enemyShoting", "Game/img/enemyShoting.png");
        system.imgLib.AddImage("enemyJumping", "Game/img/enemyJumping.png");
        system.imgLib.AddImage("enemyJumpingShoting", "Game/img/enemyJumpingShoting.png");

        system.imgLib.AddImage("ground", "Game/img/ground.png");
        system.imgLib.AddImage("bamboo", "Game/img/bamboo.png");
        system.imgLib.AddImage("bamboo2", "Game/img/bamboo2.png");
        system.imgLib.AddImage("wall", "Game/img/wall.png");
        system.imgLib.AddImage("wall2", "Game/img/wall2.png");
        system.imgLib.AddImage("wall3", "Game/img/wall3.png");

        system.imgLib.AddImage("fire", "Game/img/fire.png");
        system.imgLib.AddImage("exp", "Game/img/exp.png");
        system.imgLib.AddImage("blood1", "Game/img/blood1.png");
        system.imgLib.AddImage("background", "Game/img/background.png");
    }


    // Carrega todos os audios que serao usados no level.
    LoadSounds()
    {
        system.audioLib.Load("theShinobi", "Game/sound/theShinobi.mp3", true);

        system.audioLib.Load("landing", "Game/sound/landing.mp3", false);
        system.audioLib.Load("kunai", "Game/sound/kunai.mp3", false);
    }

    
    // Cria os layers de acordo com as matrizes passadas.
    StartMaps()
    {
        var mapCoord1 = [
                       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                       ];
        var layer1 = new Map(false, 0, mapCoord1, 25, "blue", 1);
        
        var mapCoord2 = [
                       [3,3,3,0,3,3,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,0,3,0,0,0,0,0,0,0,3,3,0,0,0,3,3,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,3,0,0,3,0,0,0,3,0,0,0,0,0,0,0,3],
                       [3,3,3,0,3,3,0,0,0,0,4,0,3,4,0,0,0,0,0,0,0,0,0,4,0,0,0,3,3,3,0,3,0,0,0,0,0,0,0,3,3,0,4,0,3,3,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,3,0,0,3,0,0,0,3,0,0,0,4,0,0,0,3],
                       [3,3,3,0,3,3,0,0,0,0,3,0,3,3,0,0,0,4,0,0,0,0,0,3,0,0,0,3,3,3,0,3,0,0,0,0,0,0,0,3,3,0,3,0,3,3,0,0,0,0,0,0,3,0,0,0,4,0,0,0,0,0,0,4,3,0,0,3,4,0,0,3,0,0,0,3,0,0,0,3],
                       [3,3,3,0,3,3,0,4,0,0,3,0,3,3,4,0,4,3,0,0,0,0,0,3,0,0,0,3,3,3,0,3,0,0,0,0,0,0,0,3,3,4,3,0,3,3,0,0,0,0,4,0,3,0,0,0,3,0,0,0,0,0,0,3,3,0,0,3,3,0,0,3,0,0,4,3,0,0,0,3],
                       [3,3,3,0,3,3,4,3,0,0,3,0,3,3,3,0,3,3,0,0,0,0,0,3,0,0,0,3,3,3,0,3,0,0,0,4,0,0,0,3,3,3,3,0,3,3,0,0,0,0,3,0,3,0,0,0,3,0,4,0,0,0,0,3,3,0,4,3,3,0,0,3,0,0,3,3,0,0,0,3],
                       [3,3,3,0,3,3,3,3,0,0,3,0,3,3,3,0,3,3,0,0,0,0,0,3,0,0,0,3,3,3,0,3,0,0,0,3,0,0,4,3,3,3,3,4,3,3,0,0,0,0,3,0,3,0,0,0,3,4,3,0,0,0,0,3,3,0,3,3,3,4,0,3,0,0,3,3,0,0,0,3],
                       [3,3,3,0,3,3,3,3,0,0,3,0,3,3,3,0,3,3,0,0,0,0,0,3,0,0,0,3,3,3,0,3,0,0,0,3,0,0,3,3,3,3,3,3,3,3,0,0,0,0,3,0,3,0,0,0,3,3,3,0,0,0,0,3,3,0,3,3,3,3,0,3,0,0,3,3,0,0,0,3]
                       ];
        var layer2 = new Map(false, 0, mapCoord2, 70, "green", 2);

        var mapCoord3 = [
                       [3,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,3,0,0,3,3],
                       [3,0,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,3,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,4,3,0,4,3,3],
                       [3,0,3,3,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,3,4,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,4,3,3,0,0,0,0,0,0,0,0,0,4,0,0,3,0,0,3,3,4,3,3,3],
                       [3,4,3,3,4,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,4,3,0,0,0,0,0,0,0,0,0,0,0,3,3,3,4,0,0,0,0,0,0,0,0,3,0,0,3,0,0,3,3,3,3,3,3],
                       [3,3,3,3,3,0,0,4,3,5,2,2,2,2,2,2,2,2,2,2,6,0,0,0,0,0,3,3,5,2,2,6,5,2,2,2,2,2,2,6,0,0,0,3,3,5,2,6,0,5,2,2,2,2,2,2,2,2,2,2,6,0,5,2,2,2,6,5,2,2,2,2,2,6,3,3,3,3,3,3],
                       [3,3,3,3,3,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3],
                       [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
                       ];
        var layer3 = new Map(true, 0, mapCoord3, 80, "grey", 3);

        var mapCoord4 = [
                       [3,3,0,0,0,0,0,0,0,0,3,0,0,0,0,0,3,3,0,0,0,0,0,3,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,3,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,3,3,3],
                       [3,3,4,0,0,0,0,0,0,0,3,0,0,0,0,0,3,3,0,0,0,0,0,3,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,3,4,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,3,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,0,4,3,3,3],
                       [3,3,3,0,0,4,0,0,0,0,3,0,0,0,0,0,3,3,0,0,0,0,0,3,0,0,0,4,0,3,0,0,0,0,0,4,0,0,0,0,0,0,0,3,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,3,0,4,0,0,3,0,0,0,0,0,3,0,0,0,0,0,0,4,0,0,0,0,0,0,3,3,4,3,3,3,3],
                       [3,3,3,0,0,3,4,0,0,0,3,0,0,0,0,0,3,3,0,0,0,0,0,3,0,0,0,3,0,3,0,0,0,0,0,3,0,0,4,0,0,0,0,3,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,4,0,3,0,3,0,0,3,4,0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,0,0,4,3,3,3,3,3,3,3],
                       [3,3,3,0,0,3,3,0,0,0,3,0,0,0,0,0,3,3,0,4,0,0,0,3,0,0,0,3,0,3,0,0,4,0,0,3,0,0,3,4,0,0,0,3,0,0,0,0,0,3,3,0,0,0,0,0,0,0,4,0,3,0,0,0,0,0,3,4,3,0,3,0,0,3,3,0,0,0,0,3,0,0,0,0,4,0,3,0,0,4,0,0,3,3,3,3,3,3,3,3],
                       [3,3,3,0,0,3,3,0,0,0,3,0,0,0,0,0,3,3,0,3,0,0,0,3,0,0,0,3,0,3,0,0,3,0,0,3,0,0,3,3,0,0,0,3,0,0,0,0,0,3,3,0,0,0,0,0,0,0,3,0,3,0,0,0,0,0,3,3,3,4,3,0,0,3,3,0,0,0,0,3,0,0,0,0,3,4,3,0,0,3,0,0,3,3,3,3,3,3,3,3],
                       [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
                       ];
        var layer4 = new Map(false, 0, mapCoord4, 110, "green", 10);
        
        
        layer1.depth = 1.8;
        layer2.depth = 1.5;
        layer4.depth = 0.8;

        //system.AddGameObject(layer1);
        //system.AddGameObject(layer2);
        //system.AddGameObject(layer3, "ActiveLayer", true);
        //system.AddGameObject(layer4);
    }
}