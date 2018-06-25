;(function(window){
	'use strict';
	var centerX=200,centerY=200,
		dataCanvas=document.getElementById('dataPie'),
		ctx=dataCanvas.getContext('2d');
	dataCanvas.width=800;
	dataCanvas.height=800;
	ctx.fillStyle="rgba(6,255,255,0.5)";
	ctx.beginPath();
	ctx.moveTo(150,150);
	ctx.arc(150,150,100,90*Math.PI/180,30*Math.PI/180,false);
	ctx.closePath();
	ctx.stroke();
	CanvasRenderingContext2D.prototype.sector = function(x,y,r,sector){
		ctx.fillStyle =sector.color;
	    this.save();
	    this.beginPath();
	    this.moveTo(x,y);
	    this.arc(x,y,r,sector.starAng*Math.PI/180,sector.endAng*Math.PI/180,false);
	    this.closePath();
	    this.restore();
	    return this;
	}
	CanvasRenderingContext2D.prototype.polygon = function(x,y,r,n){
		var i,ang;
		ang=Math.PI*2/n;
	    this.save();
	    this.translate(x,y);
	    this.moveTo(0,-r);
	    this.beginPath();
	    for(i=0;i<n;i++){
	    	this.rotate(ang);
	    	this.lineTo(0,-r);
	    }
	    this.closePath();
	    this.restore();
	    return this;
	}
	CanvasRenderingContext2D.prototype.datatip = function(x,y,r,sector){
		var i,ang;
		this.textAlign="center";
    	
    	this.fillStyle = '#fff';
	    this.save();
	    this.beginPath();
	    this.translate(x+Math.cos(sector.starAng*Math.PI/180+sector.angHalf*Math.PI/180)*r/4*3,y+Math.sin(sector.starAng*Math.PI/180+sector.angHalf*Math.PI/180)*r/4*3);
	    this.fillText(sector.percent, 0,0);
	    this.closePath();
	    this.restore();
	    return this;
	}
	CanvasRenderingContext2D.prototype.dataRect= function(x,y,r,rectY,sector){
		ctx.save();
		ctx.beginPath();
		ctx.translate(400,rectY);
		ctx.fillStyle = sector.color;
		ctx.fillRect(0,0,80,40);
		ctx.translate(120,26);
		ctx.fillText(sector.type, 0,0);
		ctx.translate(60,0);
		ctx.fillText(sector.percent,0,0);
		ctx.closePath();
	    ctx.restore();
	    return this;
	}
	

    var colorList=['#292a2e','#4e4e4e', '#888888','#9da1a7 ', '#ff3234', '#ffa132','#5c83b2'];
    var dataList=[{'type':'学术','num':100},{'type':'体育','num':102},{'type':'文娱','num':43},{'type':'公益','num':40},{'type':'其他','num':28}];
    var dataSum=0,x=0,sumAng=0,ang=0,sectorList=new Array();
    //初始化数据
    for (x in dataList)
	{
		dataSum=dataSum+dataList[x].num;
		sectorList[x]={
			color:colorList[x],
			type:dataList[x].type,
			num:dataList[x].num,
		};
	}
	for (x in sectorList)
	{
		sectorList[x].percent=((sectorList[x].num/dataSum)*100).toFixed(1)+'%';
		ang=parseInt((sectorList[x].num/dataSum)*360);
		sectorList[x].angHalf=ang/2;
		sectorList[x].starAng=sumAng;
		sumAng=sumAng+ang;
		sectorList[x].endAng=sumAng;
		if(x==sectorList.length-1){
			sectorList[x].endAng=360;
		}
	}
	//画扇形
	var r=150;
	function dataSector(active){
		console.log("change");
		ctx.fillStyle = '#eeeeee';
    	ctx.polygon(200,200,200,6).fill();
		var rectY=50;
		for (x in sectorList)
		{
			//数据提示
	    	if(x==active){
	    		ctx.font = "24px serif";
	    	}else{
	    		ctx.font = "18px serif";
	    		//r=150;
	    	}
			//扇形
	    	ctx.sector(centerX,centerY,r,sectorList[x]).fill();
	    	ctx.strokeStyle="#eeeeee";
	    	ctx.sector(centerX,centerY,r,sectorList[x]).stroke();
	    	
	    	ctx.datatip(centerX,centerY,r,sectorList[x]);
	    	//右边数据
	    	ctx.font = "18px serif";
	    	ctx.dataRect(200,200,150,rectY,sectorList[x]);
	    	rectY=rectY+50;
		}
		//画总数据提示
		ctx.save();
		//ctx.beginPath();
		ctx.fillStyle = '#eeeeee';
	    ctx.arc(200,200,80,0,2*Math.PI);
	    ctx.fill();
		ctx.fillStyle = '#999';
		ctx.translate(200,200+9);
		ctx.font = "18px serif";
		ctx.fillText("活动总数"+dataSum, 0,0);
		//ctx.closePath();
	    ctx.restore();
	}


    //画柱形图
    var maxData=0;
    for (x in sectorList){
    	//console.log(sectorList[x].num);
    	if(sectorList[x].num>maxData){
    		maxData=sectorList[x].num;
    	}
    }

    maxData=parseInt(maxData*1.1);
    ctx.save();
	//ctx.beginPath();
	ctx.translate(0,700);
	ctx.strokeStyle="#999";
	ctx.moveTo(40,-300);
	ctx.lineTo(40,0);
	ctx.lineTo(600,0);
	//ctx.closePath();

	ctx.stroke();

    for (x in sectorList){
    	ctx.translate(100,0);
		ctx.fillStyle = sectorList[x].color;
		ctx.fillRect(0,0,50,-(sectorList[x].num/maxData*300));
		ctx.fillText(sectorList[x].type, 25,30);

		ctx.fillText(sectorList[x].num, 25,-(sectorList[x].num/maxData*300)-10);
    }
    ctx.restore();

    //鼠标经过监听
    console.log(sectorList);
    var hoverAng=0,changeMark=-1;
    dataSector();
    dataCanvas.addEventListener("mousemove",function(ev){
    	var ev=ev||window.event;
    	var tempActive=-1,
    	length=Math.sqrt((ev.x-centerX)*(ev.x-centerX)+(ev.y-centerY)*(ev.y-centerY)),
    	lengthX=ev.x-centerX,
    	lengthY=ev.y-centerY,
    	ang=Math.atan(Math.abs((ev.y-centerY)/(ev.x-centerX)))/Math.PI*180;
    	if(length<=150&&length>=80){
    		if(lengthX>=0&&lengthY>=0){
    			hoverAng=ang;
    		}else if(lengthX<=0&&lengthY>=0){
    			hoverAng=180-ang;
    		}else if(lengthX<=0&&lengthY<=0){
    			hoverAng=180+ang;
    		}else if(lengthX>=0&&lengthY){
    			hoverAng=360-ang;
    		}
    		for (x in sectorList){
    			if(hoverAng>sectorList[x].starAng&&hoverAng<sectorList[x].endAng){
    				tempActive=x;
    				//changeMark=true;
    			}
    		}
    	}else{
    		tempActive=-1;
    	}
    	if(changeMark!=tempActive){
    		ctx.clearRect(0,0,800,400);
    		dataSector(tempActive);
    		changeMark=tempActive
    	}
    },false);



})(window);