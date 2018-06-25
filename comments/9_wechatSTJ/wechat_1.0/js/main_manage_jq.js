// JavaScript Document
//Make sure jQuery has been loaded before app.js
if (typeof jQuery === "undefined") {
  throw new Error("AdminLTE requires jQuery");
}

if($("#inputcaptcha"))
{
   var input=$("#inputcaptcha");
   var showbox=$("#captcha i");
   var word=showbox.val();
   var clickTimes=0;
   var choseTxt="";
   $("#tablelist tr").eq(0).addClass("first");
   input.click(function(){
	   if(clickTimes==0)
	   {
		 showbox.eq(clickTimes).addClass("ifocus");
		 input.focus();
	   }
	});
   input.keyup(function(event){
	   var word=input.val();
	   if(word.length>0)
	   {
		 showbox.eq(clickTimes).removeClass("ifocus");       
		 var currKeyN=word.charAt(clickTimes);
		 showbox.eq(clickTimes).html(currKeyN);
		 showbox.eq(clickTimes+1).addClass("ifocus");
		 clickTimes++; 
		 if(clickTimes==4 )
		 {
		   showbox.eq(clickTimes-1).removeClass("ifocus");
		   if(word.match("1234"))
		   {
			   /*alert("签到成功")**;*/
			   $(".tip-ok").css("display","block");
			   setTimeout(function(){
					$(".tip-ok").css("display","none");}
					,400);
			   $("#tablelist").prepend("<tr><td>余文1豪</td><td>高三1二班</td><td>12345678901</td></tr>");
			   <!--$("<tr><td>余文1豪</td><td>高三1二班</td><td>12345678901</td></tr>").insertBefore("tr");--
			   $("#tablelist tr").eq(0).addClass("first");
			   $("#tablelist tr").eq(1).removeClass("first");
			   $(".sign-number span").html($("#tablelist tr").length);
		   }
		   else
		   {
			   /*alert("验证码错误");*/
			   $(".tip-no").css("display","block");
			   for(var i=0 ;i<4;i++)
			   {
				   showbox.eq(i).addClass("false");
			   }
			   setTimeout(function(){
				 for(var i=0 ;i<4;i++)
				 {
					  showbox.eq(i).removeClass("false");	 
				 }
			   },1000); 
			   setTimeout(function(){
				   $(".tip-no").css("display","none");},1500);
					   
		   }
		   /*输入四个数字初始化*/
		   setTimeout(function(){
			   clickTimes=0;
			   showbox.eq(clickTimes).addClass("ifocus");
			   input.val("");
			   for(var i=0 ;i<4;i++)
			  {
				   showbox.eq(i).html("");
			  } 
			},500);
			 
		 }
	   }
   })
}

if($(".act-enlist-list"))
{
	checklist();
	function checklist(){
	  var trlists =$(".act-enlist-list table tr");
	  var peding = $(".peding");
	  var refuse =$(".refuse");
	  var pass=$("[name='disabled']");
	  var enlist=$(".act-enlist ul li");
	  enlist.eq(0).html("已报名"+trlists.length+"人");
	  enlist.eq(1).html("未审核："+peding.length+"人");
	  enlist.eq(2).html("已通过："+pass.length+"人");
	  enlist.eq(3).html("已拒绝："+refuse.length+"人");
	}
	$("#all").click(function(){
		
		alert($("#all").attr("checked"));
		if($("#all").attr("checked") == true)
		{
		  var ableCheck =$("[name='abled']");
		  this.checked=true;
		  for(var i=0 ;i<ableCheck.length;i++)
		  {
			ableCheck.eq(i).checked=true;
		    ableCheck.eq(i).attr("checked","checked");
		  }
		}
		if($("#all").checked == false)
		{
			
		    var ableCheck =$("[name='abled']");
			this.checked=false;
			for(var i=0 ;i<ableCheck.length;i++)
			{
			   ableCheck.eq(i).attr("checked",false);
			 
			}
		}
		
	});
	
}