  var hp  = document.getElementById('hp');
	var innerHp = document.getElementById('hp__front');
	var innerHpText = document.getElementById('hp__text');
  	var showHeader = document.getElementById('header');
    var newHp = 100;
	innerHpText.innerText = newHp + " " + "/ 100";
	//счет игрока обновляется при перезоде на уровень, выносим в глобальную
	var score = 0;
	var innerScore = document.getElementById('score__content')
	innerScore.innerText = "0";
	//exp
	var player_exp = 0;
	var innerExp = document.getElementById('exp__status');
	var innterTextExp = document.getElementById('progres__text');
	var innerFrontProg = document.getElementById('progres__front');
	innerExp.innerText = '1';

	function Scene(screen, controls) {
		this.canvas = screen.canvas;
		this.ctx = this.canvas.getContext('2d');
		this.controls = controls;
		this.imgs = screen.imgs;

	}


	function Lib(screen, controls) {
		Scene.apply(this, arguments);
		this.assets = [
			{name: 'orc', path: 'assets/orc.png'},
			{name: 'player', path: 'assets/player_mace.png'},
            {name: 'sceleton', path: 'assets/sceleton.png'},
			{name: 'npc1', path: 'assets/npc1.png'},
			{name: 'npc_chest', path: 'assets/npc_chest.png'},
			{name: 'bg', path: 'assets/tiles.png'},
			{name: 'title', path: 'assets/title.png'},
			{name: 'tile',path:'tile.png'}
		];

		this.total = this.assets.length;
		this.loaded = 0;
		this.status = "loading";


		this.loaded_at = 0;

		var self = this;
		for(var i=0; i < this.total; i++) {
			var img = new Image();
			img.onload = function() {
				self.loaded++;
			};
			img.src = self.assets[i].path;
			screen.imgs[self.assets[i].name] = img;

		}

	}

	Lib.prototype = Object.create(Scene.prototype);
	Lib.prototype.constructor = Lib;

	Lib.prototype.render = function (time) {
		if(this.status == "loading") {
			if(this.loaded == this.total) {
				this.status = "loaded";
				this.loaded_at = time;
			}
			this.ctx.fillStyle = '#000000';
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height );
			this.ctx.fillStyle = '#ffffff';
			this.ctx.font="22px Georgia";
			this.ctx.fillText("Loading " + this.loaded + '/' + this.total,50,70);
			return "lib";
		}

		if(this.status == "loaded") {
			if((time - this.loaded_at) > 1000) {
				return "menu";
			} else {
				return "lib";
			}
		}

	}



	function Win(screen, controls) {
		Scene.apply(this, arguments);
	}

	Win.prototype = Object.create(Scene.prototype);
	Win.prototype.constructor = Win;


	Win.prototype.render = function (time) {
		this.ctx.fillStyle = '#000000';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height );
		this.ctx.fillStyle = '#ffffff';
		this.ctx.font="22px Georgia";
		this.ctx.fillText("You won!",50,70);
		return "win";
	};

	function Menu(screen, controls) {
		Scene.apply(this, arguments);
	}

	Menu.prototype = Object.create(Scene.prototype);
	Menu.prototype.constructor = Menu;


	Menu.prototype.render = function (time) {

	this.ctx.drawImage(this.imgs['title'],
				0,0,640,640,
				0,0,640,640);
				this.ctx.font="30px PressStart2P";
				this.ctx.fillStyle = '#C70800';
			this.ctx.fillText("MASLOVA PRISTAN'", 100,200);
			this.ctx.fillText("Нажмите пробел",115,500);
		if(this.controls.states['fire']) {
			return "level 1";
		} else {
			return "menu";
		}
	};


	function Level(level){
		this.level=level;
		
		if(this.level=="level 1"){
			this.map=[
				[4  ,4	,4	,4 	,12 ,9 ,13	,2 	,17	,18 ,19 ,34	,34 ,34 ,34 ,33 ,3 	,3 	,3	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13 	,2 	,20	,21	,22 ,38	,37 ,38	,37 ,35	,0 	,0	,0	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13 	,2 	,23	,24 ,25 ,39	,38 ,39 ,38 ,0	,0 	,0 	,0	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13 	,2 	,26	,27	,28 ,38	,37 ,29 ,29 ,32  ,0 ,0 	,0	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13 	,2 	,0 	,15 ,15 ,15	,15 ,16  ,15 ,15 ,15 ,15 ,15,3],
				[4  ,4	,5	,6 	,7 	,8 ,13 	,14 ,15	,15 ,2 	,3	,3 	,3 	,3 	,3  ,1 ,1 	,15	,3],
				[4	,4	,10	,11 ,12 ,9 ,13  ,2 	,42 ,34	,34 ,31	,17	,18	,19	,3  ,1 ,1 	,15	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13 	,3 	,36	,39	,38	,35	,20 ,21	,22	,3 	,3 ,0	,15 ,3],
				[4  ,4	,4	,4 	,12 ,41 ,1  ,3 	,36	,38	,37	,35	,23	,24	,25 ,15 ,15,15 ,15	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13	,3 	,33 ,0 ,0 ,0	,26 ,27 ,28 ,15 ,0 ,3 	,3	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13 	,3 	,3 	,3	,0 	,0	,15	,15 ,15 ,15	,0 	,3	,3	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13 	,3 	,3	,3 	,3 	,0	,15	,0 	,0 	,0 	,3 	,3 	,3	,3],
				[4  ,4	,4	,4 	,1 	,1 ,1 	,1 	,3 	,3 	,3 	,0	,15	,0 	,0 	,0 	,3 	,3 	,3	,3],
				[4  ,4	,4	,4 	,3 ,3 ,3 	,3 	,3 	,3 	,3 	,0	,15	,15	,15 ,15	,3 	,3 	,3	,3],
				[4  ,4	,5	,6 	,7 	,8 ,13 	,3 ,3	,3  ,3 	,3	,0	,2 	,15 ,15	,2 	,3 	,3	,3],
				[4	,4	,10	,11 ,3 ,3 ,3 	,3 	,3 	,3 	,3	,3	,3	,43	,15	,15 ,43	,43	,43	,3],
				[4 ,4	,4	,4 	,3 ,3 ,3 	,3 	,3 	,3 	,3	,3	,3 	,46	,45 ,48	,45	,46	,47	,3],
				[4 ,4	,4	,4 	,3 	,3 ,3   ,3 	,3 	,3 	,0	,0	,0 	,46	,46	,45	,45	,47	,0	,3],
				[4 ,4	,4	,4 	,3 ,3 ,3 	,3 	,3 	,0 	,0	,0	,3 	,48 ,46 ,46	,48	,48	,48	,3],
				[4 ,4	,4	,4 	,3 	,3 ,3 	,3 	,3 	,0 	,0	,3	,3 	,3 	,3 	,3 	,3 	,3 	,3	,3],
			
		];
	
		
		this.player_x=150;
		this.player_y=300;

		this.monster10_x=894;
		this.monster10_y=48;
		
		this.monster9_x=894;
		this.monster9_y=138;

		this.monster8_x=624;
		this.monster8_y=486;

		this.monster1_x=1134;
		this.monster1_y=1068;

		this.monster2_x=1124;
		this.monster2_y=1058;

		
		this.monster3_x=1124;
		this.monster3_y=1058;

		this.npc1_x=150;
		this.npc1_y=300;
		this.npc1Text="Здарова, бандиты";
		this.npc1wasDialogText="Хэх";
		this.npc1_directioin="right";
		this.npc1_is_chest=false;
		
		}

		if(this.level=="level 2"){
			this.map=[
				[4  ,4	,4	,4 	,12 ,9 ,13	,2 	,17	,18 ,19 ,34	,34 ,34 ,34 ,33 ,3 	,3 	,3	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13 	,2 	,20	,21	,22 ,38	,37 ,38	,37 ,35	,0 	,0	,0	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13 	,2 	,23	,24 ,25 ,39	,38 ,39 ,38 ,0	,0 	,0 	,0	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13 	,2 	,26	,27	,28 ,38	,37 ,29 ,29 ,32  ,0 ,0 	,0	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13 	,2 	,0 	,15 ,15 ,15	,15 ,16  ,15 ,15 ,15 ,15 ,15,3],
				[4  ,4	,5	,6 	,7 	,8 ,13 	,14 ,15	,15 ,2 	,3	,3 	,3 	,3 	,3  ,1 ,1 	,15	,3],
				[4	,4	,10	,11 ,12 ,9 ,13  ,2 	,42 ,34	,34 ,31	,17	,18	,19	,3  ,1 ,1 	,15	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13 	,3 	,36	,39	,38	,35	,20 ,21	,22	,3 	,3 ,0	,15 ,3],
				[4  ,4	,4	,4 	,12 ,41 ,1  ,3 	,36	,38	,37	,35	,23	,24	,25 ,15 ,15,15 ,15	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13	,3 	,33 ,0 ,0 ,0	,26 ,27 ,28 ,15 ,0 ,3 	,3	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13 	,3 	,3 	,3	,0 	,0	,15	,15 ,15 ,15	,0 	,3	,3	,3],
				[4  ,4	,4	,4 	,12 ,9 ,13 	,3 	,3	,3 	,3 	,0	,15	,0 	,0 	,0 	,3 	,3 	,3	,3],
				[4  ,4	,4	,4 	,1 	,1 ,1 	,1 	,3 	,3 	,3 	,0	,15	,0 	,0 	,0 	,3 	,3 	,3	,3],
				[4  ,4	,4	,4 	,3 ,3 ,3 	,3 	,3 	,3 	,3 	,0	,15	,15	,15 ,15	,3 	,3 	,3	,3],
				[4  ,4	,5	,6 	,7 	,8 ,13 	,3 ,3	,3  ,3 	,3	,0	,2 	,15 ,15	,2 	,3 	,3	,3],
				[4	,4	,10	,11 ,12 ,16 ,3 	,3 	,3 	,3 	,3	,3	,3	,43	,15	,15 ,43	,43	,43	,3],
				[4 ,4	,4	,4 	,12 ,9 ,3 	,3 	,3 	,3 	,3	,3	,3 	,46	,45 ,48	,45	,46	,47	,3],
				[4 ,4	,4	,4 	,1 	,1 ,3   ,3 	,3 	,3 	,0	,0	,0 	,46	,46	,45	,45	,47	,0	,3],
				[4 ,4	,4	,4 	,12 ,9 ,3 	,3 	,3 	,0 	,0	,0	,3 	,48 ,46 ,46	,48	,48	,48	,3],
				[4 ,4	,4	,4 	,1 	,1 ,3 	,3 	,3 	,1 	,3	,3	,3 	,3 	,3 	,3 	,3 	,3 	,3	,3],
			
		];
	
		
		this.player_x=150;
		this.player_y=300;

		this.monster10_x=894;
		this.monster10_y=48;
		
		this.monster9_x=894;
		this.monster9_y=138;

		this.monster8_x=624;
		this.monster8_y=486;

		this.monster1_x=1134;
		this.monster1_y=1068;

		this.monster2_x=1124;
		this.monster2_y=1058;

		
		this.monster3_x=1124;
		this.monster3_y=1058;

        this.npc1_x=150;
        this.npc1_y=300;
		this.npc1Text="Здарова, бандиты";
		this.npc1wasDialogText="Хэх";
		this.npc1_directioin="down";
		this.npc1_is_chest=true;

        }
        
        if(this.level=="level 3")
		{
			this.map=[
			     [4  ,4	,4	,4 	,12 ,9 ,13	,0 	,0 	,0 	,0 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4  ,4	,4	,4 	,12 ,9 ,13 	,0 	,0 	,0	,0 ,0	,0 	,0 	,0 	,0 	,0 	,0	,0	,0],
				 [4  ,4	,4	,4 	,12 ,9 ,13 	,0 	,0 	,0 	,0 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4  ,4	,4	,4 	,1 	,1 ,1 	,1 	,1 	,1 	,1 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4  ,4	,4	,4 	,12 ,9 ,13 	,0 	,0 	,0 	,1 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4  ,4	,5	,6 	,7 	,8 ,13 	,14 ,15 ,15 ,0 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4	,4	,10	,11 ,12 ,16 ,13 ,0 	,0 	,0 	,1 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4 ,4	,4	,4 	,12 ,9 ,13 	,0 	,0 	,0 	,1 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4 ,4	,4	,4 	,1 	,1 ,1 ,	1 	,1 	,1 	,1 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4  ,4	,4	,4 	,12 ,9 ,13	,0 	,0 	,0 	,0 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4  ,4	,4	,4 	,12 ,9 ,13 	,0 	,0 	,0	,0 ,0	,0 	,0 	,0 	,0 	,0 	,0	,0	,0],
				 [4  ,4	,4	,4 	,12 ,9 ,13 	,0 	,0 	,0 	,0 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4  ,4	,4	,4 	,1 	,1 ,1 	,1 	,1 	,1 	,1 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4  ,4	,4	,4 	,12 ,9 ,13 	,0 	,0 	,0 	,1 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4  ,4	,5	,6 	,7 	,8 ,13 	,14 ,15 ,15 ,0 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4	,4	,10	,11 ,12 ,16 ,13 ,0 	,0 	,0 	,1 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4 ,4	,4	,4 	,12 ,9 ,13 	,0 	,0 	,0 	,1 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4 ,4	,4	,4 	,1 	,1 ,1 ,	1 	,1 	,1 	,1 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4 ,4	,4	,4 	,12 ,9 ,13 	,0 	,0 	,0 	,1 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
				 [4 ,4	,4	,4 	,1 	,1 ,1 , 1 	,1 	,1 	,1 ,0	,0 	,0 	,0 	,0 	,0 	,0 	,0	,0],
		];
		this.player_x=150;
        this.player_y=300;
        
		this.monster10_x=894;
		this.monster10_y=48
		
		this.monster9_x=894;
		this.monster9_y=138

        this.npc1_x=150;
        this.npc1_y=300;

		}
	}


	function Game(screen, controls,new_level) {
		Scene.apply(this, arguments);
		Level.apply(this,arguments);
		this.new_level=new_level;
		this.current_level=new Level(new_level);
		this.camera = new Camera(0,0,this);
        this.player = new Player(this.current_level.player_x,this.current_level.player_y,this,newHp,10);

		this.monster1 = new Player(this.current_level.monster1_x,this.current_level.monster1_y,this,20,10);
		this.monster1.type = "monster";
		this.monster1.status = "walking";
		this.monster2 = new Player(this.current_level.monster2_x,this.current_level.monster2_y,this,20,10);
		this.monster2.type = "monster";
		this.monster2.status = "walking";

		this.monster3 = new Player(this.current_level.monster3_x,this.current_level.monster3_y,this,20,10);
		this.monster3.type = "monster";
		this.monster3.status = "walking";

		this.monster4 = new Player(this.current_level.monster4_x,this.current_level.monster4_y,this,20,10);
		this.monster4.type = "monster";
		this.monster4.status = "walking";

		this.monster5 = new Player(this.current_level.monster5_x,this.current_level.monster5_y,this,20,10);
		this.monster5.type = "monster";
		this.monster5.status = "walking";

		this.monster6 = new Player(this.current_level.monster6_x,this.current_level.monster6_y,this,20,10);
		this.monster6.type = "monster";
		this.monster6.status = "walking";

		this.monster7 = new Player(this.current_level.monster7_x,this.current_level.monster7_y,this,20,10);
		this.monster7.type = "monster";
		this.monster7.status = "walking";

		this.monster8 = new Player(this.current_level.monster8_x,this.current_level.monster8_y,this,20,10);
		this.monster8.type = "monster";
		this.monster8.status = "walking";

		this.monster9 = new Player(this.current_level.monster9_x,this.current_level.monster9_y,this,20,10);
		this.monster9.type = "monster";
		this.monster9.status = "walking";
		
		this.monster10 = new Player(this.current_level.monster10_x,this.current_level.monster10_y,this,20,10);
		this.monster10.type = "monster";
		this.monster10.status = "standing";

        this.npc1 = new Player(this.current_level.npc1_x,this.current_level.npc1_y,this,20,10,this.current_level.npc1Text,this.current_level.npc1wasDialogText);
		this.npc1.type = "npc";
		this.npc1.status = "standing";
		this.npc1.direction=this.current_level.npc1_directioin;
		this.npc1.is_chest=this.current_level.npc1_is_chest;

		this.sounds = {};
		this.sounds['arrow'] = new Sound('assets/arrow.wav');
		this.sounds['sword'] = new Sound('assets/sword.wav');
		
		this.map=this.current_level.map;
		

		this.tiles = [
			{j:0,i:0,walk: true},  //0 - grass
			{j:1,i:0,walk: false}, //1 - stone
			{j:2,i:0,walk: false},  //2 - plant
			{j:3,i:0,walk: false}, //3 - tree
			{j:0,i:1,walk: false}, //4 - water
			{j:0,i:2,walk: true}, //5 - brige 1-st part
			{j:1,i:2,walk: true}, //6 - brige 2-nd part
			{j:2,i:2,walk: true}, //7 - brige 3-rd part
			{j:3,i:2,walk: true}, //8 - brige 4-th part
			{j:3,i:1,walk: true}, //9 - sand
			{j:1,i:1,walk: false}, //10 boat 1-st part
			{j:2,i:1,walk: false}, //11 boat 2-nd part
			{j:4,i:0,walk: false}, //12 sand+water
			{j:4,i:1,walk: true}, //13 grass+sand
			{j:4,i:2,walk: true}, //14 trail start 1 _h
			{j:5,i:2,walk: true}, //15 trail 2 _h
			{j:6,i:2,walk: false}, //16 trail 3 _|
			{j:0,i:3,walk: false}, //17 крыша дома-лево-верх
			{j:1,i:3,walk: false}, //18 крыша дома-право-верх
			{j:2,i:3,walk: false}, //19 дом-камни около крыши-верх
			{j:0,i:4,walk: false}, //20 крыша дома-лево-низ
			{j:1,i:4,walk: false}, //21 крыша дома-право-низ
			{j:2,i:4,walk: false}, //22 камни около крыши-низ
			{j:0,i:5,walk: false}, //23 стена дома-лево
			{j:1,i:5,walk: false}, //24 стена дома-право
			{j:2,i:5,walk: false}, //25  камни около стены дома
			{j:0,i:6,walk: true}, //26 фундамент дома-лево
			{j:1,i:6,walk: true}, //27 фундамент дома-право
			{j:2,i:6,walk: true}, //28 камни около фундамента 
			{j:5,i:0,walk: false}, // 29 забор деревянный горизонтально-низ
			{j:6,i:0,walk: true}, // 30 пугало
			{j:7,i:0,walk: false},//31 деревянный забор влево-вверх
			{j:8,i:0,walk: false}, //32 деревянный забор вправо-вверх
			{j:9,i:0,walk: false}, //33 деревянный забор вправо-вниз
			{j:8,i:1,walk: false}, //34 забор деревянный горизонтально-верх
			{j:9,i:1,walk: false}, //35 забор деревянный вертикально-право
			{j:7,i:1,walk: false},//36 забор деревянный вертикально-лево
			{j:3,i:4,walk: true}, // 37 овощи 1
			{j:4,i:4,walk: true}, // 38 овощи 2
			{j:5,i:4,walk: true},// 39 овощи 3
			{j:6,i:4,walk: false},//40 песок с камнем 1
			{j:7,i:4,walk: false},// 41 песок с камнем 2
			{j:8,i:2,walk: false},// 42 деревянный забор влево-вниз
			{j:5,i:1,walk: false}, //43 забор кладбище-верх
			{j:8,i:4,walk: false},//44 забор кладбище-низ
			{j:3,i:3,walk: true}, // 45 надгробия 1
			{j:4,i:3,walk: true}, // 46 надгробия 2
			{j:5,i:3,walk: true}, // 47 надгробия 3
			{j:6,i:3,walk: true}, // 48 надгробия 4

		];

		this.arrows = [];

	}

	Game.prototype = Object.create(Scene.prototype);
	Game.prototype.constructor = Game;

	Game.prototype.render_bg = function (time) {
		var start_col = Math.floor(this.camera.x / 64);
		var start_row = Math.floor(this.camera.y / 64);
		showHeader.style.display = "flex";
		for(var i = start_row; i < (start_row + 11); i++) {
			for(var j = start_col; j < (start_col + 11); j++) {
				if(( j < 20) && (i < 20)) {
					var tile = this.tiles[this.map[i][j]];
              		this.ctx.drawImage(this.imgs['tile'],
                    	tile.j*64,tile.i*64,64,64,
                          	(j*64)-this.camera.x,(i*64) - this.camera.y ,64,64);
              	}
			}
		}

	};


	Game.prototype.render_sprites = function (time) {


		this.player.update(time);
		this.monster1.update(time);
		this.monster2.update(time);
		this.monster3.update(time);
		this.monster4.update(time);
		this.monster5.update(time);
		this.monster6.update(time);
		this.monster7.update(time);
		this.monster8.update(time);
		this.monster9.update(time);
        this.monster10.update(time);
        this.npc1.update(time);
        this.camera.update(time);
        


		//render monster

		this.ctx.drawImage(this.imgs['sceleton'],
 									 this.monster1.j*64,this.monster1.i*64,64,64,
 												 ( this.monster1.x )-this.camera.x,(this.monster1.y) - this.camera.y ,64,64);

	this.ctx.drawImage(this.imgs['sceleton'],
 									 this.monster2.j*64,this.monster2.i*64,64,64,
 												 ( this.monster2.x )-this.camera.x,(this.monster2.y) - this.camera.y ,64,64);

	this.ctx.drawImage(this.imgs['sceleton'],
 									 this.monster3.j*64,this.monster3.i*64,64,64,
 												 ( this.monster3.x )-this.camera.x,(this.monster3.y) - this.camera.y ,64,64);		

	this.ctx.drawImage(this.imgs['sceleton'],
 									 this.monster4.j*64,this.monster4.i*64,64,64,
 												 ( this.monster4.x )-this.camera.x,(this.monster4.y) - this.camera.y ,64,64);
												  
	this.ctx.drawImage(this.imgs['sceleton'],
 									 this.monster5.j*64,this.monster5.i*64,64,64,
 												 ( this.monster5.x )-this.camera.x,(this.monster5.y) - this.camera.y ,64,64);

	this.ctx.drawImage(this.imgs['sceleton'],
 									 this.monster6.j*64,this.monster6.i*64,64,64,
 												 ( this.monster6.x )-this.camera.x,(this.monster6.y) - this.camera.y ,64,64);

	this.ctx.drawImage(this.imgs['sceleton'],
 									 this.monster7.j*64,this.monster7.i*64,64,64,
 												 ( this.monster7.x )-this.camera.x,(this.monster7.y) - this.camera.y ,64,64);

	this.ctx.drawImage(this.imgs['orc'],
 									 this.monster8.j*64,this.monster8.i*64,64,64,
 												 ( this.monster8.x )-this.camera.x,(this.monster8.y) - this.camera.y ,64,64);

		this.ctx.drawImage(this.imgs['orc'],
 									 this.monster9.j*64,this.monster9.i*64,64,64,
 												 ( this.monster9.x )-this.camera.x,(this.monster9.y) - this.camera.y ,64,64);

this.ctx.drawImage(this.imgs['orc'],
 									 this.monster10.j*64,this.monster10.i*64,64,64,
                                                  ( this.monster10.x )-this.camera.x,(this.monster10.y) - this.camera.y ,64,64);		
                                                  

this.ctx.drawImage(this.imgs['npc_chest'],
 									 this.npc1.j*64,this.npc1.i*64,64,64,
 												 ( this.npc1.x )-this.camera.x,(this.npc1.y) - this.camera.y ,64,64);	

		//render player
		this.ctx.drawImage(this.imgs['player'],
                    this.player.j*64,this.player.i*64,64,64,
                          ( this.player.x )-this.camera.x,(this.player.y) - this.camera.y ,64,64);


		//render arows
		for(var  i=this.arrows.length;i>0;i--) {
				 if ( this.arrows[i-1].active === false) this.arrows.splice(i-1, 1);
		}

		for(var  i=0;i<this.arrows.length;i++) {
			this.arrows[i].update(time);
			this.ctx.drawImage(this.imgs['player'],
	                    this.arrows[i].j*64,this.arrows[i].i*64,64,64,
	                          ( this.arrows[i].x )-this.camera.x,(this.arrows[i].y) - this.camera.y ,64,64);

		}


	};



	Game.prototype.render = function (time) {
		this.ctx.fillStyle = '#ffffff';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height );

		this.render_bg(time);
		this.render_sprites(time);
		console.log(this.monster1.dead);
		if(this.new_level=="level 1"){
		if(this.monster1.dead==true &&
			this.monster8.dead==true &&
			this.monster9.dead==true &&
			this.monster10.dead==true &&
			this.monster2.dead==true &&
			this.monster3.dead==true)
			{
				this.npc1.x=582;
				this.npc1.y=1134;
				this.npc1.npcText="Лодочник: <br> Да ты просто мясник. Жители этой деревни будут благодарны тебе!";
			}


		if(this.player.x > 590 && this.player.x<620 && 
			this.player.y>1162 &&
			this.monster1.dead==true &&
			this.monster8.dead==true &&
			this.monster9.dead==true &&
			this.monster10.dead==true &&
			this.monster2.dead==true &&
			this.monster3.dead==true) {
				this.ctx.drawImage(this.imgs['title'],
				0,0,640,640,
				0,0,640,640);
                     this.new_level="level 2";
				 	return 'level 2';
			 } else {
					return 'level 1';
			 }
		}

		if(this.new_level=="level 2"){
                        return 'level 2';
                 }

         if(this.new_level=="level 3"){
             return "level 3";
         }
            

        };
        



	function Camera(x,y,scene) {
		this.x = x;
		this.y = y;
		this.w = 640;
		this.h = 640;
		this.scene = scene;
	}

	Camera.prototype.update = function (time) {
		if((this.scene.player.x - this.x) < 200) {
			this.x = this.scene.player.x  - 200;
		}

		if((this.scene.player.x - this.x) > 440) {
			this.x = this.scene.player.x  - 440;
		}

		if(this.x < 0) this.x = 0;
		if(this.x > 640) this.x = 640;


		if((this.scene.player.y - this.y) < 200) {
			this.y = this.scene.player.y  - 200;
		}

		if((this.scene.player.y - this.y) > 440) {
			this.y = this.scene.player.y  - 440;
		}

		if(this.x < 0) this.x = 0;
		if(this.x > 640) this.x = 640;

		if(this.y < 0) this.y = 0;
		if(this.y > 640) this.y = 640;

	};


function Arrow(x,y,direction,scene) {
	this.active = true;
	this.x = x;
	this.y = y;
	this.scene = scene;
	this.speed = 10;
	this.direction = direction;
	this.sprites = {
		right: [10,0],
		left: [9,0],
		up: [11,0],
		down: [12,0]
	};
	this.j = this.sprites[direction][0];
	this.i = this.sprites[direction][1];
}

Arrow.prototype.update = function (time) {
		this.move();
};

Arrow.prototype.move = function () {
	var new_x = this.x;
	var new_y = this.y;
	if(this.direction == "right" ) new_x += this.speed;
	if(this.direction == "left" ) new_x -= this.speed;
	if(this.direction == "up" ) new_y -= this.speed;
	if(this.direction == "down" ) new_y += this.speed;


	if(this.is_hit(new_x,new_y)) {
		this.active = false;
		return true;
	} else {
		this.x = new_x;
		this.y = new_y;
	}
}

Arrow.prototype.is_hit = function (x,y) {
var pos_x = x;
var pos_y = y;
if(this.direction == "right" ) {pos_x += 64; pos_y += 32; };
if(this.direction == "left" ) {pos_y += 32; };
if(this.direction == "up" ) {pos_x += 32;  };
if(this.direction == "down" ) {pos_x += 32; pos_y += 64; };

if((pos_x < 0) || (pos_x > 1280) || (pos_y < 0) || (pos_y > 1280)) {
	return true;
}

var j = Math.floor(pos_x / 64);
var i = Math.floor(pos_y / 64);

if((pos_x > this.scene.monster1.x) &&
   (pos_x < (this.scene.monster1.x + 64)) &&
	 (pos_y > this.scene.monster1.y) &&
	(pos_y < (this.scene.monster1.y + 64))) {
		this.scene.monster1.hp -= this.scene.player.damage;
		if(this.scene.monster1.hp <= 0){
			this.scene.monster1.set_action("down","dead");

			return true;
		}
		
	}

	if((pos_x > this.scene.monster2.x) &&
   (pos_x < (this.scene.monster2.x + 64)) &&
	 (pos_y > this.scene.monster2.y) &&
	(pos_y < (this.scene.monster2.y + 64))) {
		this.scene.monster2.hp -= this.scene.player.damage;
		if(this.scene.monster2.hp <= 0){
			this.scene.monster2.set_action("down","dead");

			return true;
		}
		
	}

	if((pos_x > this.scene.monster3.x) &&
   (pos_x < (this.scene.monster3.x + 64)) &&
	 (pos_y > this.scene.monster3.y) &&
	(pos_y < (this.scene.monster3.y + 64))) {
		this.scene.monster3.hp -= this.scene.player.damage;
		if(this.scene.monster3.hp <= 0){
			this.scene.monster3.set_action("down","dead");

			return true;
		}
		
	}

	if((pos_x > this.scene.monster4.x) &&
   (pos_x < (this.scene.monster4.x + 64)) &&
	 (pos_y > this.scene.monster4.y) &&
	(pos_y < (this.scene.monster4.y + 64))) {
		this.scene.monster4.hp -= this.scene.player.damage;
		if(this.scene.monster4.hp <= 0){
			this.scene.monster4.set_action("down","dead");

			return true;
		}
		
	}

	if((pos_x > this.scene.monster5.x) &&
   (pos_x < (this.scene.monster5.x + 64)) &&
	 (pos_y > this.scene.monster5.y) &&
	(pos_y < (this.scene.monster5.y + 64))) {
		this.scene.monster5.hp -= this.scene.player.damage;
		if(this.scene.monster5.hp <= 0){
			this.scene.monster5.set_action("down","dead");

			return true;
		}
		
	}

	if((pos_x > this.scene.monster6.x) &&
   (pos_x < (this.scene.monster6.x + 64)) &&
	 (pos_y > this.scene.monster6.y) &&
	(pos_y < (this.scene.monster6.y + 64))) {
		this.scene.monster6.hp -= this.scene.player.damage;
		if(this.scene.monster6.hp <= 0){
			this.scene.monster6.set_action("down","dead");

			return true;
		}
		
	}

	if((pos_x > this.scene.monster7.x) &&
   (pos_x < (this.scene.monster7.x + 64)) &&
	 (pos_y > this.scene.monster7.y) &&
	(pos_y < (this.scene.monster7.y + 64))) {
		this.scene.monster7.hp -= this.scene.player.damage;
		if(this.scene.monster7.hp <= 0){
			this.scene.monster7.set_action("down","dead");

			return true;
		}
		
	}

	if((pos_x > this.scene.monster8.x) &&
   (pos_x < (this.scene.monster8.x + 64)) &&
	 (pos_y > this.scene.monster8.y) &&
	(pos_y < (this.scene.monster8.y + 64))) {
		this.scene.monster8.hp -= this.scene.player.damage;
		if(this.scene.monster8.hp <= 0){
			this.scene.monster8.set_action("down","dead");

			return true;
		}
		
	}

	if((pos_x > this.scene.monster9.x) &&
   (pos_x < (this.scene.monster9.x + 64)) &&
	 (pos_y > this.scene.monster9.y) &&
	(pos_y < (this.scene.monster9.y + 64))) {
		this.scene.monster9.hp -= this.scene.player.damage;
		if(this.scene.monster9.hp <= 0){
			this.scene.monster9.set_action("down","dead");

			return true;
		}
		
	}

	if((pos_x > this.scene.monster10.x) &&
   (pos_x < (this.scene.monster10.x + 64)) &&
	 (pos_y > this.scene.monster10.y) &&
	(pos_y < (this.scene.monster10.y + 64))) {
		this.scene.monster10.hp -= this.scene.player.damage;
		if(this.scene.monster10.hp <= 0){
			this.scene.monster10.set_action("down","dead");

			return true;
		}
		
    }
	return	!this.scene.tiles[this.scene.map[i][j]].walk;
}


	function Player(x,y,scene,hp,damage,npcText,wasDialogText) {
		this.x = x;
		this.y = y;
		this.i = 0;
		this.j = 0;
		this.bow = 1;
		this.type = "player";
		this.scene = scene;
		this.dead = false;
		this.lastTime = 0;
		this.speed = 3;
		this.direction = "down";
		this.status = "start";
		this.change_animation = true;
		this.current_animation_frame = 0;
		this.current_action = this.move_down;
		this.got_obstacle = false;
		this.hp=hp;
		this.maxhp = hp;
		this.damage=damage;
        this.level = 1;
        this.npcText=npcText;
        this.wasDialog=false;
		this.wasDialogText=wasDialogText;
		this.is_chest=false;
		
		this.exp = 1;

		this.sprites = {
			standing: {
				right: {
					total: 1,
					frames: [[0,3]]
				},
				left: {
					total: 1,
					frames: [[0,1]]
				},
				up: {
					total: 1,
					frames: [[0,0]]
				},
				down: {
					total: 1,
					frames: [[0,2]]
				}
			},
			walking: {
				right: {
					total: 9,
					frames: [[0,11],[1,11],[2,11],[3,11],[4,11],[5,11],[6,11],[7,11],[8,11]]
				},
				left: {
					total: 9,
					frames: [[0,9],[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9]]
				},
				up: {
					total: 9,
					frames: [[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8]]
				},
				down: {
					total: 9,
					frames: [[0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10]]
				}
			},
			start: {
				down: {
					total: 9,
					frames: [[0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10]]
				}
			},
			dead: {
				down: {
					total: 6,
					frames: [[0,20],[1,20],[2,20],[3,20],[4,20],[5,20]]
				}
			},
			fire: {
				right: {
					total: 13,
					frames: [[0,19],[1,19],[2,19],[3,19],[4,19],[5,19],[6,19],[7,19],[8,19],[9,19],[10,19],[11,19],[12,19]]
				},
				left: {
					total: 13,
					frames: [[0,17],[1,17],[2,17],[3,17],[4,17],[5,17],[6,17],[7,17],[8,17],[9,17],[10,17],[11,17],[12,17]]
				},
				up: {
					total: 13,
					frames: [[0,16],[1,16],[2,16],[3,16],[4,16],[5,16],[6,16],[7,16],[8,16],[9,16],[10,16],[11,16],[12,16]]
				},
				down: {
					total: 13,
					frames: [[0,18],[1,18],[2,18],[3,18],[4,18],[5,18],[6,18],[7,18],[8,18],[9,18],[10,18],[11,18],[12,18]]
				}
			},
			attack: {
				right: {
					total: 20,
					frames: [[0,15],[1,15],[2,15],[3,15],[4,15],[5,15],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3]]
				},
				left: {
					total: 20,
					frames: [[0,13],[1,13],[2,13],[3,13],[4,13],[5,13],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]
				},
				up: {
					total: 20,
					frames: [[0,12],[1,12],[2,12],[3,12],[4,12],[5,12],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
				},
				down: {
					total: 20,
					frames: [[0,14],[1,14],[2,14],[3,14],[4,14],[5,14],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2]]
				}
			},

			attack_sword:{
				right:
				{	
					total: 20,
					frames:[[1,31],[4,31],[7,31],[10,31],[13,31],[16,31],[1,31],[1,31],[1,31],[1,31],[1,31],[1,31],[1,31],[1,31],[1,31],[1,31],[1,31],[1,31],[1,31],[1,31]]
				},

				left:{
					total:20,
					frames:[[1,25],[4,25],[7,25],[10,25],[13,25],[16,25],[1,25],[1,25],[1,25],[1,25],[1,25],[1,25],[1,25],[1,25],[1,25],[1,25],[1,25],[1,25],[1,25],[1,25]]
				},

				up:{
					total:20,
					frames:[[1,22],[4,22],[7,22],[10,22],[13,22],[16,22],[1,22],[1,22],[1,22],[1,22],[1,22],[1,22],[1,22],[1,22],[1,22],[1,22],[1,22],[1,22],[1,22],[1,22]]
				},

				down:{
					total:20,
					frames:[[1,28],[4,28],[7,28],[10,28],[13,28],[16,28],[1,28],[1,28],[1,28],[1,28],[1,28],[1,28],[1,28],[1,28],[1,28],[1,28],[1,28],[1,28],[1,28],[1,28]]
				}

			},

			open_chest_anim:{
				right: {
					total: 1,
					frames: [[0,3]]
				},
				left: {
					total: 1,
					frames: [[0,1]]
				},
				up: {
					total: 1,
					frames: [[0,0]]
				},
				down: {
					total: 8,
					frames: [[0,2],[1,2],[1,2],[1,2],[2,2],[2,2],[2,2],[2,2]]
				}
			},

			chest_opened:{

				right: {
					total: 1,
					frames: [[0,3]]
				},
				left: {
					total: 1,
					frames: [[0,1]]
				},
				up: {
					total: 1,
					frames: [[0,0]]
				},
				down: {
					total: 1,
					frames: [[2,2]]
				}
			}

		};
	};

	Player.prototype.animate = function () {       
		var frame = this.sprites[this.status][this.direction];

		if(this.dead) {
			return true;
		}

		if(this.change_animation) {
			this.change_animation = false;
			this.current_animation_frame = 0;
		} else {
			if(frame.total > 1) {
				this.current_animation_frame++;
				if( (this.current_animation_frame + 1) == frame.total ) {
					if((this.status == "start") || (this.status == "walking") || (this.status == "attack")||(this.status == "attack_sword")||(this.status=="open_chest_anim")||(this.status=="chest_opened")) {
						this.current_animation_frame = 0;
					}

					if(this.status=="attack"){
						this.scene.sounds['sword'].play();
					}

					if(this.status == "dead") {
						this.current_animation_frame = 5;
						this.dead = true;
					}

					if(this.status == "fire") {
						this.current_animation_frame = 0;
						this.set_action(this.direction,"standing");
						this.scene.arrows.push(new Arrow(this.x,this.y,this.direction,this.scene) );
						this.scene.sounds['arrow'].play();
					}
				}
			}
		}

        if(this.scene.player.show_levelup==true){
            this.scene.ctx.fillStyle = '#FFFFFF';
            this.scene.ctx.font="15px PressStart2P";
            this.scene.ctx.fillText("LEVEL UP!",this.scene.player.x-30-this.scene.camera.x,this.scene.player.y+10-this.scene.camera.y);
            setTimeout(() => {
                this.scene.player.show_levelup=false;
            }, 1000);
         }
         

		this.j = frame.frames[this.current_animation_frame][0];
		this.i = frame.frames[this.current_animation_frame][1];

	};

	Player.prototype.set_action = function (direction,status) {
		if(this.direction != direction) {
			this.direction = direction;
			this.change_animation = true;
		}

		if(this.status != status) {
			this.status = status;
			this.change_animation = true;
		}
	};

	Player.prototype.is_walkable = function (x,y) {

		if(x < 0 ) {
			this.got_obstacle = true;
			return false;
		};
		if(y < 0) {
			this.got_obstacle = true;
			return false;
		};

		var x1 = x;
		var x2 = x + 64;
		var y1 = y;
		var y2 = y+63;

		x1 = x1 + 10;
		x2 = x2 - 1;
		y1 = y1 +20;
		y2 = y2 -10;

		var j1 = Math.floor((x1) / 64);
		var j2 = Math.floor((x2) / 64);
		var i1 = Math.floor((y1) / 64);
		var i2 = Math.floor((y2) / 64);

		var walkable = true;

		for(var i = i1; i <= i2; i++) {
			for(var j = j1; j <= j2; j++) {
				if(!this.scene.tiles[this.scene.map[i][j]].walk) {
					walkable = false;
				}
			}
		}

		this.got_obstacle = !walkable;
		return walkable;

	};

	Player.prototype.move_left = function () {
		this.set_action("left","walking");

		if(this.is_walkable(this.x - this.speed,this.y)) {
			
			if(this.type=="player"){
				this.x = this.x - this.speed;
			}
			this.x = this.x - this.speed;
			if(this.x < 0) {
				this.x = 0;
			}
		}
	};

	Player.prototype.move_right = function () {
		this.set_action("right","walking");
		if(this.is_walkable(this.x + this.speed,this.y)) {

			if(this.type=="player"){
				this.x = this.x + this.speed;
			}
			this.x = this.x + this.speed;
			if(this.x > 1216) {
				this.x =1216;
			}
		}
	};

	Player.prototype.move_up = function () {
		this.set_action("up","walking");
		if(this.is_walkable(this.x ,this.y - this.speed-5)) {

			if(this.type=="player"){
				this.y = this.y - this.speed;
			}

			this.y = this.y - this.speed;
			if(this.y < 0) {
				this.y =0;
			}
		}
	};

	Player.prototype.move_down = function () {
		this.set_action("down","walking");
		if(this.is_walkable(this.x,this.y + this.speed)) {

			if(this.type=="player"){
				this.y = this.y + this.speed;
			}
   
			this.y = this.y + this.speed;
			if(this.y > 1216) {
				this.y =1216;
			}
		}
	};


	Player.prototype.fire = function () {
		this.set_action(this.direction,"fire");
	}
	Player.prototype.attack = function () {
		
		if(this.type == "monster"){
			this.set_action(this.direction,"attack");
		}
		if(this.type == "player"){
			console.log('exp ='+player_exp,'score'+ score,'level'+ this.scene.player.level, 'hp ' + this.scene.player.hp, 'max hp ' + this.scene.player.maxhp);
			
			this.set_action(this.direction,"attack_sword");
			
			if(Math.sqrt(
				Math.pow((this.x - this.scene.monster1.x), 2) + Math.pow((this.y - this.scene.monster1.y), 2)) <= 50){
				this.scene.monster1.hp -= this.damage/20;
				
				
				if (this.scene.monster1.hp <= 0){
					this.scene.monster1.set_action("down", "dead");
					
				}
			}

			if(Math.sqrt(
				Math.pow((this.x - this.scene.monster2.x), 2) + Math.pow((this.y - this.scene.monster2.y), 2)) <= 50){
				this.scene.monster2.hp -= this.damage/20;
				
				
				if (this.scene.monster2.hp <= 0){
					this.scene.monster2.set_action("down", "dead");
					
				}
			}
			if(Math.sqrt(
				Math.pow((this.x - this.scene.monster3.x), 2) + Math.pow((this.y - this.scene.monster3.y), 2)) <= 50){
				this.scene.monster3.hp -= this.damage/20;
				
				
				if (this.scene.monster3.hp <= 0){
					this.scene.monster3.set_action("down", "dead");
					
				}
			}
			if(Math.sqrt(
				Math.pow((this.x - this.scene.monster4.x), 2) + Math.pow((this.y - this.scene.monster4.y), 2)) <= 50){
				this.scene.monster4.hp -= this.damage/20;
				
				
				if (this.scene.monster4.hp <= 0){
					this.scene.monster4.set_action("down", "dead");
					
				}
			}
			if(Math.sqrt(
				Math.pow((this.x - this.scene.monster5.x), 2) + Math.pow((this.y - this.scene.monster5.y), 2)) <= 50){
				this.scene.monster5.hp -= this.damage/20;
				
				
				if (this.scene.monster5.hp <= 0){
					this.scene.monster5.set_action("down", "dead");
					
				}
			}
			if(Math.sqrt(
				Math.pow((this.x - this.scene.monster6.x), 2) + Math.pow((this.y - this.scene.monster6.y), 2)) <= 50){
				this.scene.monster6.hp -= this.damage/20;
				
				
				if (this.scene.monster6.hp <= 0){
					this.scene.monster6.set_action("down", "dead");
					
				}
			}
			if(Math.sqrt(
				Math.pow((this.x - this.scene.monster7.x), 2) + Math.pow((this.y - this.scene.monster7.y), 2)) <= 50){
				this.scene.monster7.hp -= this.damage/20;
				
				
				if (this.scene.monster7.hp <= 0){
					this.scene.monster7.set_action("down", "dead");
					
				}
			}
			if(Math.sqrt(
				Math.pow((this.x - this.scene.monster8.x), 2) + Math.pow((this.y - this.scene.monster8.y), 2)) <= 50){
				this.scene.monster8.hp -= this.damage/20;
				
				
				if (this.scene.monster8.hp <= 0){
					this.scene.monster8.set_action("down", "dead");
					
				}
			}
			if(Math.sqrt(
				Math.pow((this.x - this.scene.monster9.x), 2) + Math.pow((this.y - this.scene.monster9.y), 2)) <= 50){
				this.scene.monster9.hp -= this.damage/20;
				
				
				if (this.scene.monster9.hp <= 0){
					this.scene.monster9.set_action("down", "dead");
					
				}
			}
			if(Math.sqrt(
				Math.pow((this.x - this.scene.monster10.x), 2) + Math.pow((this.y - this.scene.monster10.y), 2)) <= 50){
				this.scene.monster10.hp -= this.damage/20;
				
				
				if (this.scene.monster10.hp <= 0){
					this.scene.monster10.set_action("down", "dead");
					
				}
            }
		}
	}

	Player.prototype.start = function () {
		if(this.y < 100) {
			this.y = this.y + this.speed;
		} else {
			this.set_action("down","standing");
		}

	}

	Player.prototype.update = function (time) {
			this.animate();
			console.log(this.scene.player.x);
			console.log(this.scene.player.y);
			var need_to_levelup = (this.level + 1) * this.level / 2 ;
			innterTextExp.innerText = player_exp * 100 +' / '+ need_to_levelup * 100;
			innerFrontProg.style.width = 100 / need_to_levelup * player_exp  + 'px';
			console.log(player_exp)
			if(player_exp >= need_to_levelup){
				this.level++;
				this.damage *= 2;
				
				this.hp = this.maxhp;
				console.log(this.maxhp)
                newHp = this.scene.player.hp;
                this.show_levelup=true;
				if(newHp >= 0){
					innerHpText.innerText = newHp - (newHp%2) + " " + "/ " + String(this.scene.player.maxhp);
                    innerHp.style.width = (200 - ((100 - newHp) * 2)) + 'px';
                }
			}
			if(this.status == "start") {
				this.start();
				return true;
			}

			if(this.status == "fire") {
				return true;
			}

			if(this.status == "melee") {
				return true;
			}
    
			if(this.status == "dead") {
				player_exp += this.exp;
				innerExp.innerText = this.scene.player.level;
				// this.scene.player.exp += this.exp;
				score += this.exp * 100;
				this.exp = 0;
				innerScore.innerText = score;
				return true;
			}

			if(this.type == "monster") {
				return this.monster_ai_controll(time);
            }
            
            if(this.type=="npc"){
                return this.npc_ai();
            }

			if(this.scene.controls.states['fire']) {
				if(this.scene.player.bow){
					this.fire();
				}
				return true;
			}

			if(this.scene.controls.states['melee']) {
				
				this.attack();
				
				
				
				return true;
			}

			if(this.scene.controls.states['left']) {
				this.move_left();
				return true;
			}

			if(this.scene.controls.states['right']) {
				this.move_right();
				return true;
			}

			if(this.scene.controls.states['forward']) {
				this.move_up();
				return true;
			}

			if(this.scene.controls.states['backward']) {
				this.move_down();
				return true;
			}

			this.set_action(this.direction,"standing");


	}

	Player.prototype.monster_ai_controll = function (time) {

		
		if((this.scene.player.dead == false) &&
			(this.scene.player.x < this.x + 70 &&
   			this.scene.player.x + 70 > this.x &&
   			this.scene.player.y < this.y + 70 &&
   			150 + this.scene.player.y > this.y)){
                  
				    if(this.scene.player.y-this.y>=30 && this.scene.player.y-this.y>=40 && this.scene.player.y-this.y>=-30 && this.scene.player.y-this.y>=-40) {this.current_action=this.move_down;}
				  else if(this.scene.player.x-this.x>=30 && this.scene.player.x-this.x>=40 && this.scene.player.x-this.x>=-30 && this.scene.player.x-this.x>=-40) {this.current_action=this.move_right;}
				   else if(this.scene.player.y-this.y<=30 && this.scene.player.y-this.y<=40 && this.scene.player.y-this.y<=-30 && this.scene.player.y-this.y<=-40) {this.current_action=this.move_up;}
				   else if(this.scene.player.x-this.x<30 && this.scene.player.x-this.x<=40 && this.scene.player.x-this.x<-30 && this.scene.player.x-this.x<=-40) {this.current_action=this.move_left;}
		
			else if((this.scene.player.dead == false) &&
			(this.scene.player.x < this.x + 50 &&
   			this.scene.player.x + 50 > this.x &&
   			this.scene.player.y < this.y + 50 &&
   			50 + this.scene.player.y > this.y)) {
				

				if(this.scene.player.y-this.y>=20){
					this.set_action("down","attack");
				}

				else if(this.scene.player.y-this.y<20 && this.scene.player.x-this.x<0){
					this.set_action("left","attack");
				}

				else if(this.scene.player.y-this.y<20 && this.scene.player.x-this.x>0){
					this.set_action("right","attack");
				}
				

			this.attack();
			newHp-=this.damage/20;
			if(score > 0){
				score -= 1;
			}
			
			this.scene.player.hp=newHp;
			if(newHp >= 0){
				innerHpText.innerText = newHp - (newHp%2) + " " + "/ " + String(this.scene.player.maxhp);
				innerHp.style.width = (200 - ((100 - newHp) * 2)) + 'px';
			} 
			
			if(this.scene.player.hp<0){
				this.scene.player.set_action("down","dead");
			   }
			   
			   return true;
				
			}
		
			if(this.scene.player.x == this.x &&
				 this.scene.player.y == this.y && this.scene.controls.states['melee']){

					this.hp -= this.scene.player.damage;
					if(this.hp <= 0){
						this.set_action("down", "dead");
					}
			}
		}


		if((this.got_obstacle) || ((time - this.lastTime) > 3000 )) {
			var actions = [this.move_left,this.move_right,this.move_up,this.move_down];
			this.current_action = actions[Math.floor(Math.random() * actions.length)];
			this.lastTime = time;

		}

		this.current_action();

		return true;
    };
    
    Player.prototype.npc_ai=function(){
        document.getElementsByClassName("dialog_text")[0].innerHTML=this.npcText;
        if(this.scene.player.x-this.x<50&&
            this.scene.player.x-this.x>-50&&
            this.scene.player.y-this.y<50&&
            this.scene.player.y-this.y>-50){
                this.scene.ctx.fillStyle = '#FFFFFF';
                this.scene.ctx.font="20px PressStart2P";
                this.scene.ctx.fillText("F",this.x+25-this.scene.camera.x,this.y+10-this.scene.camera.y);
                if(this.scene.controls.states['interaction']){
					if(this.is_chest==true){
					this.set_action("down","open_chest_anim");
					setTimeout(()=>{this.set_action("down","chest_opened");},200)
				}
                    document.getElementsByClassName("dialog")[0].style.visibility="visible";
                    this.wasDialog=true;
                }
            }
            else{
                document.getElementsByClassName("dialog")[0].style.visibility="hidden";
                if(this.wasDialog==true){
                    this.npcText=this.wasDialogText;
                }
            }

    }

	function Sound(src) {
	    this.sound = document.createElement("audio");
	    this.sound.src = src;
	    this.sound.setAttribute("preload", "auto");
	    this.sound.setAttribute("controls", "none");
	    this.sound.style.display = "none";
	    document.body.appendChild(this.sound);
	}

	Sound.prototype.play = function () {
		this.sound.play();
	};

	Sound.prototype.stop = function () {
		this.sound.pause();
	};

	function Controls() {
        this.codes  = { 37: 'left', 39: 'right', 38: 'forward', 40: 'backward', 32: 'fire', 69: 'melee', 70: 'interaction', 27:'interaction' };
        this.states = { 'left': false, 'right': false, 'forward': false, 'backward': false, 'fire' : false, 'melee' : false };
        document.addEventListener('keydown', this.onKey.bind(this, true), false);
        document.addEventListener('keyup', this.onKey.bind(this, false), false);
     }


    Controls.prototype.onKey = function(val, e) {
        var state = this.codes[e.keyCode];
        if (typeof state === 'undefined') return;
        this.states[state] = val;
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
    };


    function GameLoop() {
        this.frame = this.frame.bind(this);
        this.lastTime = 0;
        this.callback = function() {};
    }

    GameLoop.prototype.start = function(callback) {
       	this.callback = callback;
        requestAnimationFrame(this.frame);
    };

    GameLoop.prototype.frame = function(time) {

        if((time - this.lastTime) > 30) {
        	this.lastTime = time;
        	this.callback(time);
        }
        requestAnimationFrame(this.frame);
    };



    var controls = new Controls();
    var screen = {};
    screen.canvas = document.getElementById('screen');
	screen.canvas.width = 640;
    screen.canvas.height = 640;
    screen.imgs = {};
    var loop = new GameLoop();

    var scenes = {};
    scenes['lib'] = new Lib(screen, controls);
    scenes['menu'] = new Menu(screen, controls);
    scenes['level 1'] = new Game(screen, controls,"level 1");
    scenes['level 2'] = new Game(screen, controls, "level 2");
    scenes['level 3'] = new Game(screen,controls,'level 3');
	scenes['win'] = new Win(screen, controls);

    var current_scene = 'lib';

    loop.start(function frame(time) {

      	current_scene = scenes[current_scene].render(time);

    });
