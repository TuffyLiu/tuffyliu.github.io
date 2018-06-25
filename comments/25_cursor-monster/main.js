
var status="sleep",
	mouthOpen=false,
	count=0;
var eye=document.querySelectorAll(".eye"),
	lid=document.querySelectorAll(".lid"),
	mouth=document.getElementById("mouth"),
	wrapper=document.getElementById("wrapper");
function distance(x1,y1,x2,y2){
	return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}
function playAudio(id){
	try{
		var audio=document.getElementById(id);
		audio.currentTime=0;
		audio.play();

	}catch(e){
		console.log(e);

	}
}
document.onmousemove=cursorMove;
document.onmouseleave=cursorLeave;
function cursorMove(ev){
	var ev=ev||window.event;
	
	//中心的位置
	var docW=window.innerWidth,
		docH=window.innerHeight;
	var diffX = (docW/2) - ev.clientX;
	var diffY = (docH/2)-100 - ev.clientY;
	var distM = distance(docW/2,(docH/2)+60, ev.clientX, ev.clientY);
	if(status == "sleep"){
		if(distM<200){
			wrapper.className="hungry";
			status = "hungry";
			playAudio("audio-ohh");

		}
	}else if(status=="hungry"){
		//eye
		var eye_background = Math.floor( diffX /-30 ) +'px '+ Math.floor( diffY /-30 ) +'px';		
		var eye_translate =	Math.floor(diffX/-50 )+'px, '+ Math.floor(diffY/-100 )+'px';	
		eye[1].setAttribute("style","background-position:"+eye_background+"; -webkit-transform:translate3d("+eye_translate+",0); -moz-transform:translate("+eye_translate+");");
		eye[0].setAttribute("style","background-position:"+eye_background+"; -webkit-transform:translate3d("+eye_translate+",0) scale(.6); -moz-transform:translate("+eye_translate+") scale(.6);");
		

		//eye lid
		var eye_lid_p = 100+Math.floor( diffY /-20 );
		var eye_lid = '-webkit-gradient(radial, 50% '+ eye_lid_p +'%, 20, 50% '+ eye_lid_p +'%, 50, color-stop(.5, rgba(0,0,0,0)), color-stop(.6, rgba(0,0,0,1)))';
		lid[0].setAttribute("style", "-webkit-mask-image:"+eye_lid+";" );
		lid[1].setAttribute("style", "-webkit-mask-image:"+eye_lid+";" );

		//mouth
		if (distM > 200) {
			if(mouthOpen) {
				mouthOpen = false;
				mouth.className="out";
				var mouth_height = "20px";
				count = 0;
			}

		}else{
			var mouth_height = 80 - Math.floor(distM /3)+'px';
			if(!mouthOpen) {
				mouthOpen = true;
				mouth.className="";
			}

		}
		var mouth_transform = Math.floor(diffX/-80 )+'px, '+ Math.floor(diffY/-80 )+'px';
		mouth.setAttribute("style","height:"+mouth_height+";-webkit-transform:translate3d("+mouth_transform+", 0);-moz-transform:translate("+mouth_transform+");");
		if(distM<30&& status != "eat"){
			mouth.removeAttribute("style");
			document.body.setAttribute("style","cursor:none");//隐藏鼠标
			wrapper.className="eat";
			status = "eat";
			playAudio("audio-snap");
		}

	}else if(status == "eat"){

		if(distM>120){
			wrapper.className="hungry";
			status = "hungry";
			playAudio("audio-ohh");
			document.body.removeAttribute("style");
		}
	}
}
function cursorLeave(){
	wrapper.className="sleep";
	status = "sleep";
	eye[0].removeAttribute("style");
	eye[1].removeAttribute("style");
	lid[0].removeAttribute("style");
	lid[1].removeAttribute("style");
	mouth.removeAttribute("style");
}