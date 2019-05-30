//time:20160303
//study from:w3cfuns.com
//real author:沉默着喜欢
//study:EiseLiu
//音乐控制

//application variables
var position={x: 0, y: window.innerHeight / 2};
var counter = 0;
var minFontSize = 3;
var angleDistortion = 0;
var letters = '想为你做件事，让你更快乐的事，好在你的心中埋下我的名字，求时间趁着你不注意的时候，悄悄地把这种子酿成果实。我想她的确是更适合你的女子，我太不够温柔成熟优雅懂事，如果我退回到好朋友的位置，你也就不再需要为难成这样子。很爱很爱你，所以愿意舍得让你，往更多幸福的地方飞去，很爱很爱你，只有让你拥有爱情，我才安心。看着她走向你，那幅画面多美丽，如果我会哭泣也是因为欢喜；地球上两个人，能相遇不容易，作不成你的情人我仍感激。很爱很爱你，所以愿意不牵绊你，往更多幸福的地方飞去，很爱很爱你 ，只有让你拥有爱情， 我才安心。--20160407来至"桂莲"';

//drawing variables
var canvas,reload;
var context;
var mouse = {x:0,y:0,dowm:false};

//初始化
function init(){
	//初始化cavas画布
	canvas=document.getElementById('canvas');
	context=canvas.getContext("2d");
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	reload=document.getElementById('reload');

	//移动端事件
	canvas.addEventListener('touchmove', mouseMove,false);
	canvas.addEventListener('touchstart', mouseDown,false);
	canvas.addEventListener('touchend', mouseUp,false);
	canvas.addEventListener('touchcancel', mouseUp,false);
	canvas.addEventListener('doubleTap ', doubleClick,false);
	reload.addEventListener('touchstart', doubleClick,false);


	//初始化事件监听
	canvas.addEventListener('mousemove', mouseMove,false);
	canvas.addEventListener('mousedown', mouseDown,false);
	canvas.addEventListener('mouseup', mouseUp,false);
	canvas.addEventListener('mouseout', mouseUp,false);
	canvas.addEventListener('dblclick', doubleClick,false);
	reload.addEventListener('click', doubleClick,false);

	//根据屏幕大小调整cavans大小
	window.onresize = function(ev){
		//var oEvent = event || ev;
		canvas.width=window.innerWidth;
		canvas.height=window.innerHeight;
	}
}
//鼠标移动的时候获取鼠标的位置,赋值给全局变量mouse {x,y},执行绘制方法draw
function mouseMove(ev){
	var oEvent = event || ev;
	oEvent.stopPropagation();
	oEvent.preventDefault();
	if(typeof(oEvent.pageX)=="undefined") oEvent=oEvent.touches[0];
	mouse.x=oEvent.pageX;
	mouse.y=oEvent.pageY;
	draw();
}
//绘制文字方法
function draw(){
	//通过全局变量down来记此时是否为点击后绘制状态
	if(mouse.down){
		//distance

		var d=distance(position,mouse);

		var fontSize=minFontSize+d/2;
		var letter = letters[counter];
		var stepSize=textWidth(letter,fontSize);
		//console.log(stepSize);
		//console.log(d);
		if(d>stepSize)
		{
			var angle=Math.atan2(mouse.y-position.y,mouse.x-position.x);

			context.font=fontSize+"px Georgia";
			context.save();
			context.translate(position.x,position.y);
			context.rotate(angle);
			context.fillText(letter,0,0);
			context.restore();

			counter=counter+1;
			if(counter>letters.length-1){
				counter=0;
			}
			position.x=position.x+Math.cos(angle)*stepSize;
			position.y=position.y+Math.sin(angle)*stepSize;
		}
	}
}
//计算两点间的距离
function distance(pt,pt2){
	var xs=0;
	var ys=0;
	xs=pt2.x-pt.x;
	xs=xs*xs;
	ys=pt2.y-pt.y;
	ys=ys*ys;
	return Math.sqrt(xs+ys);
}
//当点击时几下当前开始位置 position
function mouseDown(ev){
	var oEvent=ev||event;
	mouse.down=true;
	if(typeof(oEvent.pageX)=="undefined") oEvent=oEvent.touches[0];
	position.x=oEvent.pageX;
	position.y=oEvent.pageY;

	//隐藏提示信息
	document.getElementById('info').style.display='none';
	if(first)
	{
		music.play();
		first=false;
		musictype=true;
		musicOn.setAttribute("class", "music on");
	}
}
//放开点击事件
function mouseUp(ev){
	mouse.down=false;
}

//点击后清空绘制，也就是重新绘制
function doubleClick(ev){
	canvas.width=canvas.width;
	//counter=0;
}
//绘制文字，获取绘制的宽度
function textWidth(string,size){
	context.font=size+"px Georgia";
	if(context.fillText){
		return context.measureText(string).width;
	}
	else if(context.mozDrawText){
		return context.mozMeasureText(string);
	}
}
;
init();
//音乐
var music=document.getElementById('music');
var musicOn=document.getElementById('music-on');
var musictype=false;
var first=true;

function musicOnOff(ev){
	var oEvent = event || ev;
	oEvent.stopPropagation();
	oEvent.preventDefault();
	if(musictype)
	{
		music.pause();
		musicOn.setAttribute("class", "music");
		musictype=false;
	}
	else
	{
		musicOn.setAttribute("class", "music on");
		music.play();
		musictype=true;
	}
}
musicOn.addEventListener('touchstart', musicOnOff,false);
musicOn.addEventListener('click', musicOnOff,false);


