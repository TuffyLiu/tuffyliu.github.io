var canvas=document.getElementById("canvas");
//初始化
function init(){
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	window.onresize=function(){
		canvas.width=window.innerWidth;
		canvas.height=window.innerHeight;
	}
}

