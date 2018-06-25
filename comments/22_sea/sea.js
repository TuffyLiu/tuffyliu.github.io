;(function(window){
	'use strict';
	function debounce(func,wait,immediate){
		var timeout;
		return function(){
			var context=this,args=arguments;
			var later = function(){
				timeout=null;
				if(!immediate) func.apply(context,args);
			};
			var callNow=immediate && !timeout;
			clearTimeout(timeout);
			timeout=setTimeout(later, wait);
			if(callNow) func.apply(context,args);
		}

	}
	var winsize={width:window.innerWidth,height:window.innerHeight},//用于记录屏幕的大小
		bubbles={
			canvas:null,
			ctx:null,
			mousex:winsize.width-30,
			mousey:winsize.height-30,
			cntr:0,
			circleArr:new Array(),//用于气泡队列
			requestTd:undefined,
			init:function(){
				this.canvas=document.getElementById('bubbles');//获取canvas
				this.ctx=this.canvas.getContext('2d');//2d绘画模式
				this.canvas.width=winsize.width;
				this.canvas.height=winsize.height;
				//音乐
				var music=document.getElementById('music');
				music.play();
				//浏览器resize调整canvas画布的大小
				var self=this;
				this.debounceResize=debounce(function(){
					winsize={width:window.innerWidth,height:window.innerHeight};
					self.canvas.height=winsize.height;
					self.canvas.width=winsize.width;
				},10);
				window.addEventListener('resize', this.debounceResize);
			},
			loop:function(){//每一帧调用的方法（循环）
				this.requestId=requestAnimationFrame(bubbles.loop.bind(this));//requestID 是一个长整型非零值,作为一个唯一的标识符.你可以将该值作为参数传给
				//这就要求你的动画函数执行会先于浏览器重绘动作。通常来说，被调用的频率是每秒60次
				this.update();//庚子年气泡的位置
				this.render();//重新绘制
			},
			update:function(){
				if(this.cntr++ % 2 ==0){//多少次循环，执行添加一个圆
					this.createCircle();
				}
				for(var circle in this.circleArr){
					circle=this.circleArr[circle];
					var max = 2,min=-2;
					if(this.mousex<=winsize.width/2-winsize.width*0.1){//当处于左边
						min=-4;
					}else if(this.mousex>=winsize.width/2+winsize.width*0.1){//当处于右边
						max=4;
					}
					circle.x +=Math.floor(Math.random()*(max-min+1))+min;//floor向下取整，泡泡的左右移动，当处于屏幕左右两边上升过程有偏移
					circle.y -=Math.random()*15;
				}
				//当泡泡跑出可视范围则把该泡泡从队列中去除
				while (this.circleArr.length>2&&(this.circleArr[0].x+this.circleArr[0].s>winsize.width||this.circleArr[0].x+this.circleArr[0].s<0||this.circleArr[0].y+this.circleArr[0].s>winsize.height||this.circleArr[0].y+this.circleArr[0].s<0)) {
					this.circleArr.shift();//方法用于把数组的第一个元素从其中删除，并返回第一个元素的值
				}
			},
			render:function(){//遍历队列，调用画圆方法
				//console.log('render');
				this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);//clear
				//console.log( this.circleArr);
				for(var circle in this.circleArr){
					var current=this.circleArr[circle];
					this.drawCircle(current.x,current.y,current.s);
				}
			},
			createCircle:function(){//间隔时间在队列中添加气泡圆
				var temp=this.circleArr[this.circleArr.length-1];
				this.circleArr[this.circleArr.length] ={
					x:this.mousex,
					y:this.mousey,
					s:Math.random()*winsize.height/60
				};
			},
			drawCircle:function(x,y,radius){//画圆方法
				this.ctx.fillStyle="rgba(255,255,255,0.5)";
				this.ctx.beginPath();
				this.ctx.arc(x,y,radius,0,Math.PI*2,false);
				this.ctx.fill();
				//console.log('drawCircle');
			},
			start:function(){//开始画圆
				if(!this.requestId){
					document.onmousemove=this.getMouseCoordinates.bind(this);
					this.loop();
				}
			},
			stop:function(){//停止画圆
				if(this.requestId){
					window.canclelAnimationFrame(this.requestId);
					this.requestId=undefined;
					document.onmousemove=null;
					this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
				}

			},
			getMouseCoordinates:function(ev){//记录鼠标当时所在的位置，mousemove..
				var ev=ev||window.event;
				this.mousex=ev.pageX;
				this.mousey=ev.pageY;
			}
		};
		bubbles.init();
		bubbles.start();

})(window);