var INNERHEIGHT,INNERWIDTH;
function main(){
	resizeContainer();
	setDefault()
	menushow();
	$(window).resize(resizeContainer);
}
function resizeContainer(){
	INNERHEIGHT=window.innerHeight;
	INNERWIDTH=window.innerWidth;
	$("#container").css({
		height: INNERHEIGHT,
		width: INNERWIDTH,
	});
}
function menushow(){
	$("#menu").on('click', function(event) {
		event.preventDefault();
		$("body").toggleClass('nav-open');
		$("#nav-overlay").fadeToggle('500', function() {});
	});
}

var container=$("#container");
var panel=$(".panel");
var content=$("#content");
var tooltip=$(".tooltip");
var poster=$(".blok-poster");
var mouse = {pageX:0,pageY:0,dowm:false},lengthX=0,lengthY=0,scrollTop=0,scrollLeft=0,distance=0,transX=0,transY=0;
var saveMouse;
var MyDocument=$(document);
function setDefault(){
	content.css({
	height: "7000px",
	width: "7000px",
	});
	poster.css({
		left: "100px",
		top: "100px",
	});
}
MyDocument.on('click',MouseClick);
MyDocument.on('mousemove',MouseMove);
MyDocument.on('mousedown', MouseDown);
MyDocument.on('mouseup',MouseUp);
function savePoint(event,down){
	mouse.pageX=event.pageX;
	mouse.pageY=event.pageY;
	mouse.down=down;
}
//鼠标超出浏览器后一样响应
function getCapture () {
	window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP|Event.STARTSELECT);
    window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP|Event.STARTSELECT);
}
var close=false;
function MouseClick (event) {
	event.preventDefault();
	var target=$(event.target);
	console.log(close);
	if(target.parents('.blok-poster').length==0&&close){
		poster.removeClass('play');
		var panel=$(event.target).parent();
	}
}
function MouseDown (event) {
	event.preventDefault();
	console.log('Down');
	getCapture();
	close=true;
	var target=$(event.target);
	saveMouse=event;
	if(target.parents('.blok-poster').length==0){
		savePoint(event,true);	
	}
}
function MouseMove (event) {
	event.preventDefault();
	var target=$(event.target);
	getCapture();

	if(mouse.down){
		
		//console.log(event);
		lengthX=event.pageX-mouse.pageX;
		lengthY=event.pageY-mouse.pageY;
		distance= Math.sqrt(lengthX*lengthX+lengthY*lengthY);
		console.log(distance);
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
		}/*else if(container[0].clientWidth+container[0].scrollLeft==container[0].scrollWidth){
			//
		}*/
		panel.css({
			transform: 'translate('+transY/10+'px,'+transX/10+'px)'
		});
		container.scrollTop(scrollTop);
		container.scrollLeft(scrollLeft);
		savePoint(event,true);
	}
}
var Recover,cover=true;
function MouseUp (event) {
	event.preventDefault();
	getCapture();
	if(!(saveMouse.pageX==event.pageX&&saveMouse.pageY==event.pageY)){
	 	close=false;
	 }
	savePoint(event,false);
	if(transY>0||transX>0){
		cover=true
		Recover=window.setInterval(tranRecover,0.001);
	}else if(transX<0) {
		cover=false;
		Recover=self.setInterval(tranRecover,0.001);
	}
}
function tranRecover(){
	if(cover){
		if(transY>0)
		{
			transY=transY-10;
		}else
		{
			transY=0;
		}
		if(transX>0)
		{
			transX=transX-10;
		}else {
			transX=0;
		}
	}else{
		/*if(transY<0)
		{
			transY=transY+10;
		}else
		{
			transY=0;
		}*/
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
var mousePoster = {pageX:0,pageY:0,dowm:false};
var offsetPoster,open=false,posterPoit={pageX:0,pageY:0};
var downPoit,movePoit,upPoit,oldPoit;
function savePointPoster(event,down){
	var target=$(event.currentTarget);
	offsetPoster=target.offset();
	mousePoster.pageX=event.pageX-offsetPoster.left;
	mousePoster.pageY=event.pageY-offsetPoster.top;
	mousePoster.offsetX=event.pageX-offsetPoster.left;
	mousePoster.offsetY=event.pageY-offsetPoster.top;
	mousePoster.down=down;
}
poster.on('click',blokPosterClick);
poster.on('mousemove',blokPosterMove);
poster.on('mouseleave',blokPosterLeave);
poster.on('mousedown',blokPosterDown);
poster.on('mouseup',blokPosterUp);
poster.on('mouseenter',blokPosterEnter);

function blokPosterMove (event) {
	event.preventDefault();
	getCapture();
	oldPoit=movePoit;
	var target=$(event.currentTarget);
	tooltip.css({
		top: event.pageY+65,
		left: event.pageX-50,
	});
	if(target.hasClass('play')){
		tooltip.addClass('hide');
	}else{
		tooltip.removeClass('hide');
	}
	if(mousePoster.down){
		//console.log(getDistance(event,movePoit));
		var tempTop=event.pageY-mousePoster.pageY;
		var tempLeft=event.pageX-mousePoster.pageX;
		target.offset({top:tempTop,left:tempLeft});
	}
	movePoit=event;
}
function getDistance(nowPoit,oldPoit){
	var lengthX=nowPoit.pageX-oldPoit.pageX;
	var lengthY=nowPoit.pageY-oldPoit.pageY;
	return Math.sqrt(lengthX*lengthX+lengthY*lengthY);
}
function blokPosterLeave(event) {
	event.preventDefault();
	tooltip.addClass('hide');
	savePointPoster(event,false);
}
function blokPosterEnter(event) {
	event.preventDefault();
	tooltip.removeClass('hide');
}
function blokPosterDown(event) {
	oldPoit=event;
	downPoit=event;
	open=true;
	getCapture();
	event.preventDefault();
	posterPoit.pageX=event.pageX;
	posterPoit.pageY=event.pageY;
	var target=$(event.currentTarget);
	target.addClass('dragging');
	target.siblings('.dragging').removeClass('dragging');
	tooltip.addClass('hide');
	savePointPoster(event,true);
}
var tempX,tempY,blockMore,NowTarget;
function blokPosterUp(event) {
	 upPoit=event;
	 getCapture();
	 console.log("up");
	 event.preventDefault();
	 var target=$(event.currentTarget);
	 tooltip.removeClass('hide');
	 savePointPoster(event,false);
	 if(!(posterPoit.pageX==event.pageX&&posterPoit.pageY==event.pageY)){
	 	open=false;
	 }
	 console.log(event.pageX+":"+oldPoit.pageX+"="+(event.pageX-oldPoit.pageX));
	 console.log(event.pageY+":"+oldPoit.pageY+"="+(event.pageY-oldPoit.pageY));
	 tempX=(event.pageX-oldPoit.pageX)*2;
	 tempY=(event.pageY-oldPoit.pageY)*2;
	 console.log(tempY);
	 console.log(tempX);
	 NowTarget=target;
	 blockMore=self.setInterval(moreAddMove,8);
}
function moreAddMove(){
	var tempOffset=NowTarget.offset();
	//console.log(tempOffset);
	//console.log(tempY);
	//console.log(tempX);
	var moveY=tempOffset.top+tempY;
	var moveX=tempOffset.left+tempX;
	NowTarget.offset({top:moveY,left:moveX});
	if(tempY>1){
		tempY--;
	}else if(tempY<-1){
		tempY++;
	}else{
		tempY=0;
	}
	if(tempX>1){
		tempX--;
	}else if(tempX<-1){
		tempX++;
	}else{
		tempX=0;
	}
	if(tempX==0&&tempY==0){
		window.clearInterval(blockMore);
	}

}
function blokPosterClick(event) {
	 console.log('click');
	 savePoint(event,false);
	 getCapture();
	 event.preventDefault();
	 var target=$(event.currentTarget);
	 if(open){
	 	target.addClass('play');
	 	target.siblings('.play').removeClass('play');
	 }
}
main();

