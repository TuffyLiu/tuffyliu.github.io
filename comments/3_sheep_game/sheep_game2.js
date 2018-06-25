
/************************************************************************/
var SHEEP_WIDTH=164,SPRIT_LEFT=0,TRAN_X=164;
var DRAW_WIDTH=window.innerWidth;
var sheeps=[];
var stage=document.getElementById("stage");
var sheep;
/*Tile对象用于存储每个小块的信息*/
function Sheep(){
	this.spriptSpeed=0;
	this.tranSpeed=0;
	this.tran_x=164;
	this.sprit_left=0;
	this.sheepDom=document.createElement("<div class='sheep'></div>");
}
function createSheep(){
	var sheep=new Sheep();
	sheep.spriptSpeed=70;
	sheep.tranSpeed=100;
	sheep.tran_x=164;
	sheep.sprit_left=0;
	stage.appendChild(this.sheepDom);
}
function sprit(sheep){
	if(sheep.sprit_left<(SHEEP_WIDTH*7)){
		sheep.sprit_left=sheep.sprit_left+SHEEP_WIDTH;
		sheep.sheepDom.style.backgroundPosition=-bg_left+'px 0px';
	}else{
		sheep.sprit_left=0;
		sheep.sheepDom.style.backgroundPosition='0 0';
	}
}
function walk2(){
	sheep[0].style.transform='translate3d('+walk+'px, 0, 0)';

	if(walk>-(screenWidth+404)){
		walk=walk-10;
	}else{
		walk=164;
	}
}
