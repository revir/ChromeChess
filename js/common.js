/**
 * ChinaChess - in html5
 * http://www.jnzo.com/chess/
 * @ author 一叶孤舟
 * @ mail itlwei@163.com
 * @ QQ 28701884
 */


var com = com||{};

com.init = function (stype){
	
	com.nowStype= stype || com.getCookie("stype") ||"stype2";
	var stype = com.stype[com.nowStype];
	com.width			=	stype.width;		//画布宽度
	com.height			=	stype.height; 		//画布高度
	com.spaceX			=	stype.spaceX;		//着点X跨度
	com.spaceY			=	stype.spaceY;		//着点Y跨度
	com.pointStartX		=	stype.pointStartX;	//第一个着点X坐标;
	com.pointStartY		=	stype.pointStartY;	//第一个着点Y坐标;
	com.page			=	stype.page;			//图片目录
	
	com.get("box").style.width = com.width+130+"px";
	
	com.canvas			=	document.getElementById("chess"); //画布
	com.ct				=	com.canvas.getContext("2d") ; 
	com.canvas.width	=	com.width;
	com.canvas.height	=	com.height;
	
	com.childList		=	com.childList||[];
	
	com.loadImages(com.page);		//载入图片/图片目录
	//z(com.initMap.join())
};

com.allRoles = ['black', 'red'];

//样式
com.stype = {
	stype1:{
		width:325,		//画布宽度
		height:402, 		//画布高度
		spaceX:35,		//着点X跨度
		spaceY:36,		//着点Y跨度
		pointStartX:5,		//第一个着点X坐标;
		pointStartY:19,		//第一个着点Y坐标;
		page:"stype_1"	//图片目录
	},
	stype2:{
		width:530,		//画布宽度
		height:567, 		//画布高度
		spaceX:57,		//着点X跨度
		spaceY:57,		//着点Y跨度
		pointStartX:-2,		//第一个着点X坐标;
		pointStartY:0,		//第一个着点Y坐标;
		page:"stype_2"	//图片目录
	}		
}

//载入图片
com.loadImages = function(stype){
	
	//绘制棋盘
	com.bgImg = new Image();
	com.bgImg.src  = "img/"+stype+"/bg.png";
	
	//提示点
	com.dotImg = new Image();
	com.dotImg.src  = "img/"+stype+"/dot.png";
	
	//棋子
	for (var i in com.args){
		com[i] = {};
		com[i].img = new Image();
		com[i].img.src = "img/"+stype+"/"+ com.args[i].img +".png";
	}
	
	//棋子外框
	com.paneImg = new Image();
	com.paneImg.src  = "img/"+stype+"/r_box.png";
	
	document.getElementsByTagName("body")[0].style.background= "url(img/"+stype+"/bg.jpg)";
	
}

//显示列表
com.show = function (){
	com.ct.clearRect(0, 0, com.width, com.height);  
	for (var i=0; i<com.childList.length ; i++){
		com.childList[i].show();
	}
}

//显示移动的棋子外框
com.showPane  = function (x,y,newX,newY){
	com.pane.isShow=true;
	com.pane.x= x ;
	com.pane.y= y ;
	com.pane.newX= newX ;
	com.pane.newY= newY ;
}

//生成map里面有的棋子
com.createMans = function(map){
	for (var i=0; i<map.length; i++){
		for (var n=0; n<map[i].length; n++){
			var key = map[i][n];
			if (key){
				com.mans[key]=new com.class.Man(key);
				com.mans[key].x=n;
				com.mans[key].y=i;
				com.childList.push(com.mans[key])
			}
		}
	}
}

//把坐标生成着法
com.createMove = function (map,x,y,newX,newY){
	var h="";
	var man = com.mans[map[y][x]];
	h+= man.text;
	map[newY][newX] = map[y][x];
	delete map[y][x];
	if (man.role===play.myRole){
		var mumTo=["一","二","三","四","五","六","七","八","九","十"];	
		newX=8-newX;
		h+= mumTo[8-x];
		if (newY > y) {
			h+= "退";
			if (man.pater == "m" || man.pater == "s" || man.pater == "x"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[newY - y -1];
			}
		}else if (newY < y) {
			h+= "进";
			if (man.pater == "m" || man.pater == "s" || man.pater == "x"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[y - newY -1];
			}
		}else {
			h+= "平";
			h+= mumTo[newX];
		}
	}else{
		var mumTo=["１","２","３","４","５","６","７","８","９","10"];
		h+= mumTo[x];
		if (newY > y) {
			h+= "进";
			if (man.pater == "M" || man.pater == "S" || man.pater == "X"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[newY - y-1];
			}
		}else if (newY < y) {
			h+= "退";
			if (man.pater == "M" || man.pater == "S" || man.pater == "X"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[y - newY-1];
			}
		}else {
			h+= "平";
			h+= mumTo[newX];
		}
	}
	return h;
}

com.initMap = [
	['C0','M0','X0','S0','J0','S1','X1','M1','C1'],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,'P0',    ,    ,    ,    ,    ,'P1',    ],
	['Z0',    ,'Z1',    ,'Z2',    ,'Z3',    ,'Z4'],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	['z0',    ,'z1',    ,'z2',    ,'z3',    ,'z4'],
	[    ,'p0',    ,    ,    ,    ,    ,'p1',    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	['c0','m0','x0','s0','j0','s1','x1','m1','c1']
];

com.initMapBlackRole = [
	['c1','m1','x1','s1','j0','s0','x0','m0','c0'],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,'p1',    ,    ,    ,    ,    ,'p0',    ],
	['z4',    ,'z3',    ,'z2',    ,'z1',    ,'z0'],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	['Z4',    ,'Z3',    ,'Z2',    ,'Z1',    ,'Z0'],
	[    ,'P1',    ,    ,    ,    ,    ,'P0',    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	['C1','M1','X1','S1','J0','S0','X0','M0','C0']
];

com.initMap1 = [
	[    ,    ,    ,, "J0"   ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,"c0",    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,	  ,    ,    ,    ],
	[    ,    ,    ,    ,"s0",    ,    ,"C0",    ],
	[    ,    ,    ,"s1",    ,"j0",    ,    ,    ]
];

com.initMap1 = [
	[    ,    ,    ,, "J0"   ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    , ,    ,    ,    ],
	[    ,    ,    ,    ,    ,"z0",    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,	  ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    , "j0"   ,,    ,    ,    ]
];

com.keys = {
	"c0":"c","c1":"c",
	"m0":"m","m1":"m",
	"x0":"x","x1":"x",
	"s0":"s","s1":"s",
	"j0":"j",
	"p0":"p","p1":"p",
	"z0":"z","z1":"z","z2":"z","z3":"z","z4":"z","z5":"z",
	
	"C0":"c","C1":"C",
	"M0":"M","M1":"M",
	"X0":"X","X1":"X",
	"S0":"S","S1":"S",
	"J0":"J",
	"P0":"P","P1":"P",
	"Z0":"Z","Z1":"Z","Z2":"Z","Z3":"Z","Z4":"Z","Z5":"Z",
}

//棋子能走的着点
com.bylaw ={}
//车
com.bylaw.c = function (x,y,map,role){
	var d=[];
	//左侧检索
	for (var i=x-1; i>= 0; i--){
		if (map[y][i]) {
			if (com.mans[map[y][i]].role!=role) d.push([i,y]);
			break
		}else{
			d.push([i,y])	
		}
	}
	//右侧检索
	for (var i=x+1; i <= 8; i++){
		if (map[y][i]) {
			if (com.mans[map[y][i]].role!=role) d.push([i,y]);
			break
		}else{
			d.push([i,y])	
		}
	}
	//上检索
	for (var i = y-1 ; i >= 0; i--){
		if (map[i][x]) {
			if (com.mans[map[i][x]].role!=role) d.push([x,i]);
			break
		}else{
			d.push([x,i])	
		}
	}
	//下检索
	for (var i = y+1 ; i<= 9; i++){
		if (map[i][x]) {
			if (com.mans[map[i][x]].role!=role) d.push([x,i]);
			break
		}else{
			d.push([x,i])	
		}
	}
	return d;
}

//马
com.bylaw.m = function (x,y,map,role){
	var d=[];
		//1点
		if ( y-2>= 0 && x+1<= 8 && !play.map[y-1][x] &&(!com.mans[map[y-2][x+1]] || com.mans[map[y-2][x+1]].role!=role)) d.push([x+1,y-2]);
		//2点
		if ( y-1>= 0 && x+2<= 8 && !play.map[y][x+1] &&(!com.mans[map[y-1][x+2]] || com.mans[map[y-1][x+2]].role!=role)) d.push([x+2,y-1]);
		//4点
		if ( y+1<= 9 && x+2<= 8 && !play.map[y][x+1] &&(!com.mans[map[y+1][x+2]] || com.mans[map[y+1][x+2]].role!=role)) d.push([x+2,y+1]);
		//5点
		if ( y+2<= 9 && x+1<= 8 && !play.map[y+1][x] &&(!com.mans[map[y+2][x+1]] || com.mans[map[y+2][x+1]].role!=role)) d.push([x+1,y+2]);
		//7点
		if ( y+2<= 9 && x-1>= 0 && !play.map[y+1][x] &&(!com.mans[map[y+2][x-1]] || com.mans[map[y+2][x-1]].role!=role)) d.push([x-1,y+2]);
		//8点
		if ( y+1<= 9 && x-2>= 0 && !play.map[y][x-1] &&(!com.mans[map[y+1][x-2]] || com.mans[map[y+1][x-2]].role!=role)) d.push([x-2,y+1]);
		//10点
		if ( y-1>= 0 && x-2>= 0 && !play.map[y][x-1] &&(!com.mans[map[y-1][x-2]] || com.mans[map[y-1][x-2]].role!=role)) d.push([x-2,y-1]);
		//11点
		if ( y-2>= 0 && x-1>= 0 && !play.map[y-1][x] &&(!com.mans[map[y-2][x-1]] || com.mans[map[y-2][x-1]].role!=role)) d.push([x-1,y-2]);

	return d;
}

//相
com.bylaw.x = function (x,y,map,role){
	var d=[];
	if (role===play.myRole){
		//4点半
		if ( y+2<= 9 && x+2<= 8 && !play.map[y+1][x+1] && (!com.mans[map[y+2][x+2]] || com.mans[map[y+2][x+2]].role!=role)) d.push([x+2,y+2]);
		//7点半
		if ( y+2<= 9 && x-2>= 0 && !play.map[y+1][x-1] && (!com.mans[map[y+2][x-2]] || com.mans[map[y+2][x-2]].role!=role)) d.push([x-2,y+2]);
		//1点半
		if ( y-2>= 5 && x+2<= 8 && !play.map[y-1][x+1] && (!com.mans[map[y-2][x+2]] || com.mans[map[y-2][x+2]].role!=role)) d.push([x+2,y-2]);
		//10点半
		if ( y-2>= 5 && x-2>= 0 && !play.map[y-1][x-1] && (!com.mans[map[y-2][x-2]] || com.mans[map[y-2][x-2]].role!=role)) d.push([x-2,y-2]);
	}else{
		//4点半
		if ( y+2<= 4 && x+2<= 8 && !play.map[y+1][x+1] && (!com.mans[map[y+2][x+2]] || com.mans[map[y+2][x+2]].role!=role)) d.push([x+2,y+2]);
		//7点半
		if ( y+2<= 4 && x-2>= 0 && !play.map[y+1][x-1] && (!com.mans[map[y+2][x-2]] || com.mans[map[y+2][x-2]].role!=role)) d.push([x-2,y+2]);
		//1点半
		if ( y-2>= 0 && x+2<= 8 && !play.map[y-1][x+1] && (!com.mans[map[y-2][x+2]] || com.mans[map[y-2][x+2]].role!=role)) d.push([x+2,y-2]);
		//10点半
		if ( y-2>= 0 && x-2>= 0 && !play.map[y-1][x-1] && (!com.mans[map[y-2][x-2]] || com.mans[map[y-2][x-2]].role!=role)) d.push([x-2,y-2]);
	}
	return d;
}

//士
com.bylaw.s = function (x,y,map,role){
	var d=[];
	if (role===play.myRole){ //红方
		//4点半
		if ( y+1<= 9 && x+1<= 5 && (!com.mans[map[y+1][x+1]] || com.mans[map[y+1][x+1]].role!=role)) d.push([x+1,y+1]);
		//7点半
		if ( y+1<= 9 && x-1>= 3 && (!com.mans[map[y+1][x-1]] || com.mans[map[y+1][x-1]].role!=role)) d.push([x-1,y+1]);
		//1点半
		if ( y-1>= 7 && x+1<= 5 && (!com.mans[map[y-1][x+1]] || com.mans[map[y-1][x+1]].role!=role)) d.push([x+1,y-1]);
		//10点半
		if ( y-1>= 7 && x-1>= 3 && (!com.mans[map[y-1][x-1]] || com.mans[map[y-1][x-1]].role!=role)) d.push([x-1,y-1]);
	}else{
		//4点半
		if ( y+1<= 2 && x+1<= 5 && (!com.mans[map[y+1][x+1]] || com.mans[map[y+1][x+1]].role!=role)) d.push([x+1,y+1]);
		//7点半
		if ( y+1<= 2 && x-1>= 3 && (!com.mans[map[y+1][x-1]] || com.mans[map[y+1][x-1]].role!=role)) d.push([x-1,y+1]);
		//1点半
		if ( y-1>= 0 && x+1<= 5 && (!com.mans[map[y-1][x+1]] || com.mans[map[y-1][x+1]].role!=role)) d.push([x+1,y-1]);
		//10点半
		if ( y-1>= 0 && x-1>= 3 && (!com.mans[map[y-1][x-1]] || com.mans[map[y-1][x-1]].role!=role)) d.push([x-1,y-1]);
	}
	return d;
		
}

//将
com.bylaw.j = function (x,y,map,role){
	var d=[];
	var isNull=(function (y1,y2){
		var y1=com.mans["j0"].y;
		var x1=com.mans["J0"].x;
		var y2=com.mans["J0"].y;
		for (var i=y1-1; i>y2; i--){
			if (map[i][x1]) return false;
		}
		return true;
	})();
	
	if (role===play.myRole){ //红方
		//下
		if ( y+1<= 9  && (!com.mans[map[y+1][x]] || com.mans[map[y+1][x]].role!=role)) d.push([x,y+1]);
		//上
		if ( y-1>= 7 && (!com.mans[map[y-1][x]] || com.mans[map[y-1][x]].role!=role)) d.push([x,y-1]);
		//老将对老将的情况
		if ( com.mans["j0"].x == com.mans["J0"].x &&isNull) d.push([com.mans["J0"].x,com.mans["J0"].y]);
		
	}else{
		//下
		if ( y+1<= 2  && (!com.mans[map[y+1][x]] || com.mans[map[y+1][x]].role!=role)) d.push([x,y+1]);
		//上
		if ( y-1>= 0 && (!com.mans[map[y-1][x]] || com.mans[map[y-1][x]].role!=role)) d.push([x,y-1]);
		//老将对老将的情况
		if ( com.mans["j0"].x == com.mans["J0"].x &&isNull) d.push([com.mans["j0"].x,com.mans["j0"].y]);
	}
	//右
	if ( x+1<= 5  && (!com.mans[map[y][x+1]] || com.mans[map[y][x+1]].role!=role)) d.push([x+1,y]);
	//左
	if ( x-1>= 3 && (!com.mans[map[y][x-1]] || com.mans[map[y][x-1]].role!=role))d.push([x-1,y]);
	return d;
}

//炮
com.bylaw.p = function (x,y,map,role){
	var d=[];
	//左侧检索
	var n=0;
	for (var i=x-1; i>= 0; i--){
		if (map[y][i]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[y][i]].role!=role) d.push([i,y]);
				break	
			}
		}else{
			if(n==0) d.push([i,y])	
		}
	}
	//右侧检索
	var n=0;
	for (var i=x+1; i <= 8; i++){
		if (map[y][i]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[y][i]].role!=role) d.push([i,y]);
				break	
			}
		}else{
			if(n==0) d.push([i,y])	
		}
	}
	//上检索
	var n=0;
	for (var i = y-1 ; i >= 0; i--){
		if (map[i][x]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[i][x]].role!=role) d.push([x,i]);
				break	
			}
		}else{
			if(n==0) d.push([x,i])	
		}
	}
	//下检索
	var n=0;
	for (var i = y+1 ; i<= 9; i++){
		if (map[i][x]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[i][x]].role!=role) d.push([x,i]);
				break	
			}
		}else{
			if(n==0) d.push([x,i])	
		}
	}
	return d;
}

//卒
com.bylaw.z = function (x,y,map,role){
	var d=[];
	if (role===play.myRole){ //红方
		//上
		if ( y-1>= 0 && (!com.mans[map[y-1][x]] || com.mans[map[y-1][x]].role!=role)) d.push([x,y-1]);
		//右
		if ( x+1<= 8 && y<=4  && (!com.mans[map[y][x+1]] || com.mans[map[y][x+1]].role!=role)) d.push([x+1,y]);
		//左
		if ( x-1>= 0 && y<=4 && (!com.mans[map[y][x-1]] || com.mans[map[y][x-1]].role!=role))d.push([x-1,y]);
	}else{
		//下
		if ( y+1<= 9  && (!com.mans[map[y+1][x]] || com.mans[map[y+1][x]].role!=role)) d.push([x,y+1]);
		//右
		if ( x+1<= 8 && y>=6  && (!com.mans[map[y][x+1]] || com.mans[map[y][x+1]].role!=role)) d.push([x+1,y]);
		//左
		if ( x-1>= 0 && y>=6 && (!com.mans[map[y][x-1]] || com.mans[map[y][x-1]].role!=role))d.push([x-1,y]);
	}
	
	return d;
}

//棋子们
com.args={
	//红子 中文/图片地址/阵营/权重
	'c':{text:"车", img:'r_c', my:1 ,bl:"c", value:com.value.c},
	'm':{text:"马", img:'r_m', my:1 ,bl:"m", value:com.value.m},
	'x':{text:"相", img:'r_x', my:1 ,bl:"x", value:com.value.x},
	's':{text:"仕", img:'r_s', my:1 ,bl:"s", value:com.value.s},
	'j':{text:"将", img:'r_j', my:1 ,bl:"j", value:com.value.j},
	'p':{text:"炮", img:'r_p', my:1 ,bl:"p", value:com.value.p},
	'z':{text:"兵", img:'r_z', my:1 ,bl:"z", value:com.value.z},
	
	//蓝子
	'C':{text:"車", img:'b_c', my:-1 ,bl:"c", value:com.value.C},
	'M':{text:"馬", img:'b_m', my:-1 ,bl:"m", value:com.value.M},
	'X':{text:"象", img:'b_x', my:-1 ,bl:"x", value:com.value.X},
	'S':{text:"士", img:'b_s', my:-1 ,bl:"s", value:com.value.S},
	'J':{text:"帅", img:'b_j', my:-1 ,bl:"j", value:com.value.J},
	'P':{text:"炮", img:'b_p', my:-1 ,bl:"p", value:com.value.P},
	'Z':{text:"卒", img:'b_z', my:-1 ,bl:"z", value:com.value.Z}
};

com.class = com.class || {} //类
com.class.Man = function (key, x, y){
	this.pater = key.slice(0,1);
	var o=com.args[this.pater]
	this.x = x||0;   
    this.y = y||0;
	this.key = key ;
	this.my = o.my;
	this.text = o.text;
	this.value = o.value;
	this.isShow = true;
	this.alpha = 1;
	this.ps = []; //着点

	//red or black
	if(key.toLowerCase() === key)
		this.role = 'red';
	else
		this.role = 'black';
	
	this.show = function (){
		if (this.isShow) {
			com.ct.save();
			com.ct.globalAlpha = this.alpha;
			com.ct.drawImage(com[this.pater].img,com.spaceX * this.x + com.pointStartX , com.spaceY *  this.y +com.pointStartY);
			com.ct.restore(); 
		}
	}
	
	this.bl = function (map){
		var map = map || play.map
		return com.bylaw[o.bl](this.x,this.y,map,this.role)
	}
}

com.class.Bg = function (img, x, y){
	this.x = x||0; 
    this.y = y||0;
	this.isShow = true;
	
	this.show = function (){
		if (this.isShow) com.ct.drawImage(com.bgImg, com.spaceX * this.x,com.spaceY *  this.y);
	}
}
com.class.Pane = function (img, x, y){
	this.x = x||0; 
    this.y = y||0;
	this.newX = x||0; 
    this.newY = y||0;
	this.isShow = true;
	
	this.show = function (){
		if (this.isShow) {
			com.ct.drawImage(com.paneImg, com.spaceX * this.x + com.pointStartX , com.spaceY *  this.y + com.pointStartY)
			com.ct.drawImage(com.paneImg, com.spaceX * this.newX + com.pointStartX  , com.spaceY *  this.newY + com.pointStartY)
		}
	}
}

com.class.Dot = function (img, x, y){
	this.x = x||0; 
    this.y = y||0;
	this.isShow = true;
	this.dots=[]
	
	this.show = function (){
		for (var i=0; i<this.dots.length;i++){
			if (this.isShow) com.ct.drawImage(com.dotImg, com.spaceX * this.dots[i][0]+10  + com.pointStartX ,com.spaceY *  this.dots[i][1]+10 + com.pointStartY)
		}
	}
}

com.init();
