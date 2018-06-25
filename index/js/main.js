var INNERHEIGHT,INNERWIDTH;
var MAXHEIGHT=5000,MAXWIDTH=5000;
var MAXLEFT=5000,MAXTOP=5000;
var IsPoster=false,ActivePoster,isDraging=false,isClick=true,Point,downPoint,lastPoit,downTime,upTime;
var Recover,cover=true,lastMoveX=0,lastMoveY=0,blockMore;
var container=$("#container");
var panel=$(".panel");
var content=$("#content");
var tooltip=$(".tooltip");
var poster=$(".blok-poster");
var preloader=$("#preloader");
var lengthX=0,lengthY=0,scrollTop=0,scrollLeft=0,transX=0,transY=0;
var saveMouse,maxProcess=100,preload,showtip=true,showTip=true;
var mousePoster = {lengthX:0,lengthY:0};
var MyDocument=$(document);
function main(){
	resizeContainer();
	setDefault()
	menushow();
	$(window).resize(resizeContainer);
	MyDocument.on('click',MouseClick);
	MyDocument.on('mousemove',MouseMove);
	MyDocument.on('mousedown', MouseDown);
	MyDocument.on('mouseup',MouseUp);
	$(".nav-overlay-innner").scroll(function() {
		if($(this)[0].scrollTop>80){
			/*if($("body").hasClass('show-info')){
				$("body").removeClass('show-info');
			}*/
			$("#menu").addClass('scoll');
		}else{
			$("#menu").removeClass('scoll');
		}
	});
}
function resizeContainer(){
	INNERHEIGHT=window.innerHeight;
	INNERWIDTH=window.innerWidth;
	$("#container").css({
		height: INNERHEIGHT,
		width: INNERWIDTH,
	});
	poster.eq(0).css({
			left:(window.innerWidth/2-poster.width())+"px",
			top: (window.innerHeight/2-poster.height()/2)+"px",
	});
	$(".welcome").css({
			left:(window.innerWidth/2+50)+"px",
			top: (window.innerHeight/2-80)+"px",
	});
}

function menushow(){
	$("#menu").on('click', function(event) {
		event.preventDefault();
		$("body").toggleClass('nav-open');
		$("#menu").removeClass('scoll');
		$("#nav-overlay").fadeToggle('500', function() {});
	});
	$("#impressum").on('click', function(event) {
		event.preventDefault();
		$("body").toggleClass('show-info');
	});
}
function setDefault(){
	content.css({
		height: MAXHEIGHT+"px",
		width: MAXWIDTH+"px",
		});
	poster.each(function(){
		$(this).css({
			left: Math.round(Math.random()*(MAXHEIGHT-600-INNERHEIGHT/3)+INNERHEIGHT/3)+"px",
			top: Math.round(Math.random()*(MAXWIDTH-800-INNERWIDTH/3)+INNERWIDTH/3)+"px",
		});
	});
	poster.eq(0).css({
			left:(window.innerWidth/2-poster.width())+"px",
			top: (window.innerHeight/2-poster.height()/2)+"px",
	});
	$(".gif-show img").each(function(){
		$(this).css({
			left: Math.round(Math.random()*(MAXHEIGHT-600-INNERHEIGHT/3)+INNERHEIGHT/3)+"px",
			top: Math.round(Math.random()*(MAXWIDTH-800-INNERWIDTH/3)+INNERWIDTH/3)+"px",
		});
	});
	$(".welcome").css({
			left:(window.innerWidth/2+50)+"px",
			top: (window.innerHeight/2-80)+"px",
	});
	setTimeout(function (argument) {
		 preloader.fadeOut('5000');
	}, 3000);
}
//鼠标超出浏览器后一样响应
function getCapture () {
	window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP|Event.STARTSELECT);
    window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP|Event.STARTSELECT);
}
function MouseClick (event) {
	console.log("click");
	var target=$(event.target);
	if(target.parents('a').length==0||!isClick){
		event.preventDefault();
	}
	if(isClick){
		if(target.parents('.blok-poster').length==0){
			poster.removeClass('play');
		}else if(!ActivePoster.hasClass('play')){
			showtip=false;
			ActivePoster.addClass('play');
	 		ActivePoster.siblings('.play').removeClass('play');
		}
	}
}

function MouseDown (event) {
	console.log('Down');
	event.preventDefault();
	getCapture();
	var target=$(event.target);
	saveMouse=event;
	if(target.parents('.blok-poster').length==0){
		IsPoster=false;
	}else{
		IsPoster=true;
		ActivePoster=target.parents('.blok-poster')
		ActivePoster.addClass('dragging');
		ActivePoster.siblings('.dragging').removeClass('dragging');
		mousePoster.lengthX=event.pageX-ActivePoster[0].offsetLeft;
		mousePoster.lengthY=event.pageY-ActivePoster[0].offsetTop;
	}
	if(target.parents('#container').length>0){
		isDraging=true;
	}
	Point=event;
	lastPoit=Point;
	downPoint=Point;
	downTime=new Date();
	downTime=downTime.getTime();
}
function MouseMove (event) {
	event.preventDefault();
	getCapture();
	lastPoit=Point;
	//console.log(lastPoit);
	var target=$(event.target);
	if(isDraging){
		upTime=new Date();
		upTime=upTime.getTime();
		lastMoveX=parseInt((event.pageX-lastPoit.pageX)/(upTime-downTime)*5);
		lastMoveY=parseInt((event.pageY-lastPoit.pageY)/(upTime-downTime)*5);
		downTime=upTime;
		if(!IsPoster){
			lengthX=event.pageX-Point.pageX;
			lengthY=event.pageY-Point.pageY;
			scrollTop=container.scrollTop()-lengthY;
			scrollLeft=container.scrollLeft()-lengthX;
			if(scrollTop<0){
				transX=transX-scrollTop;
				scrollTop=0;
			}else if(container[0].clientHeight+container[0].scrollTop==container[0].scrollHeight){
				transX=(transX+lengthY);
			}
			if(scrollLeft<0){
				transY=transY-scrollLeft;
				scrollLeft=0;
			}
			panel.css({
				transform: 'translate('+transY/10+'px,'+transX/10+'px)'
			});
			container.scrollTop(scrollTop);
			container.scrollLeft(scrollLeft);
		}else{
			var tempTop=event.pageY-mousePoster.lengthY;
			var tempLeft=event.pageX-mousePoster.lengthX;
			//ActivePoster.offset({top:tempTop,left:tempLeft});
			setPositon(tempTop,tempLeft);
		}
	}
	if(showtip){
		if(target.parents('.blok-poster').length==0){
			tooltip.css({
				top: event.pageY+65,
				left: event.pageX-50,
				opacity:0,
			});
		}else{
			tooltip.css({
				top: event.pageY+65,
				left: event.pageX-50,
				opacity:1,
			});
		}
	}else if(showTip){
		tooltip.css({
			display:"none"
		});
		showTip=false;
	}
	Point=event;
}
function setPositon(top,left){
	ActivePoster.css({
		top: top+'px',
		left: left+'px'
	});
}
var setoutBack;
function MouseUp (event) {
	console.log('up');
	event.preventDefault();
	getCapture();
	if(downPoint.pageX==event.pageX&&downPoint.pageY==event.pageY){
	 	isClick=true;
	 }else{
	 	isClick=false;
	 }
	if(!IsPoster){
		if(transY>0||transX>0){
			cover=true
			Recover=window.setInterval(tranRecover,1);
		}else if(transX<0) {
			cover=false;
			Recover=self.setInterval(tranRecover,1);
		}
	}else{
		MAXLEFT=MAXWIDTH-ActivePoster.width();
	 	MAXTOP=MAXHEIGHT-ActivePoster.height();
	 	if(isPosterOut()){
	 		setoutBack=self.setInterval(outBack,1);
		}
	}
	if(lastMoveX!=0||lastMoveY!=0){
 		blockMore=self.setInterval(moreAddMove,1);
 	}
	Point=event;
	isDraging=false;
}
function isPosterOut(){
	if(ActivePoster[0].offsetLeft<0||ActivePoster[0].offsetTop<0||ActivePoster[0].offsetLeft>MAXLEFT||ActivePoster[0].offsetTop>MAXTOP){
		return true;
	}else{
		return false;
	}
}
function outBack(){
	var left=ActivePoster[0].offsetLeft;
	var top=ActivePoster[0].offsetTop;
	var tempLeft=true;
	var tempTop=true;
	if(left<-1){
		left=parseInt(left*0.96);
		tempLeft=false;
	}else if(left>MAXLEFT){
		left=left*0.999;
		tempLeft=false;
	}
	if(top<-1){
		top=parseInt(top*0.96);
		tempTop=false;
	}else if(top>MAXTOP){
		top=parseInt(top*0.999);
		tempTop=false;
	}
	setPositon(top,left);
	if(tempLeft&&tempTop){
		window.clearInterval(setoutBack);
	}
}
function tranRecover(){
	if(cover){
		if(transY>0)
		{
			transY=transY-13;
		}else
		{
			transY=0;
		}
		if(transX>0)
		{
			transX=transX-13;
		}else {
			transX=0;
		}
	}else{
		if(transX<0)
		{
			transX=transX+10;
		}else {
			transX=0;
		}
	}
	panel.css({
		transform: 'translate('+transY/10+'px,'+transX/10+'px)'
	});
	if(transX==0&&transY==0){
		window.clearInterval(Recover)
	}
}
function moreAddMove(){
	if(IsPoster){
		var moveY=ActivePoster[0].offsetTop+lastMoveY;
		var moveX=ActivePoster[0].offsetLeft+lastMoveX;
		setPositon(moveY,moveX);

	}else{
		scrollTop=container.scrollTop()-lastMoveY;
		scrollLeft=container.scrollLeft()-lastMoveX;
		container.scrollTop(scrollTop);
		container.scrollLeft(scrollLeft);
	}
	lastMoveY=lastMoveY*0.96;
	lastMoveX=lastMoveX*0.96;
	if(Math.abs(lastMoveX)<1&&Math.abs(lastMoveY)<1){
		if(IsPoster&&isPosterOut()){
			setoutBack=self.setInterval(outBack,1);
		}
		window.clearInterval(blockMore);

	}
}
main();

