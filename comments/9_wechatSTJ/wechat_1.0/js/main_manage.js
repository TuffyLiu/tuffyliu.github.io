// JavaScript Document
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function')
	{
		window.onload=func;	
	}
	else
	{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}
// 加载函数
function addClass(element,value){
	if(!element.className){
		element.className = value;
		}
	else{
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;	
	}
}
//获取元素parent下的子节点中包含class为className的元素，并返回所有为该类
function getElementByClass(parent,className)
{
	var parentChilds = parent.getElementsByTagName('*');
	var resultElement = new Array();
	var pattClass = RegExp( "(\\s|^)" + className + "(\\s|$)");
	//alert(parentChilds.length);
	for(var i=0;i<parentChilds.length;i++)
	{
		if(pattClass.test(parentChilds[i].className))
		{
			resultElement.push(parentChilds[i]);
		}
		
	}
	if(resultElement.length > 1) return resultElement;
	
	else if (resultElement.length == 1) return resultElement[0];
	
	else return false;
}

//添加class函数
function removeClass(element,value){
	if(!element.className){
		return false;
		}
	else{
		element.className = element.className.replace( new RegExp( "(\\s|^)" + value + "(\\s|$)" ), "" );	
	}
}
//删除class函数
function getElementsByClassName(node,classname){
	if(node.getElementsByClassName)
	{
		return node.getElementsByClassName(classname);
	}
	else{
		var results = new Array();
		var elems = node.getEle
	}
}
function check_all(obj,cName){
	if(!document.getElementsByName(cName)) return false;
	var checkboxs = document.getElementsByName(cName);
	for(var i=0;i<checkboxs.length ; i++)
	{
		checkboxs[i].checked = obj.checked;
	}
}
//单选框全选/反选设置
function all_check(){
	if(!document.getElementById("all")) return false;
	var allCheck = document.getElementById("all");
	allCheck.onclick = function()
	{
		   
			if(allCheck.checked == true)
			{
				allCheck.checked=true;
		        check_all(allCheck,"abled");
				
			}
			if(allCheck.checked == false)
			{
				allCheck.checked=false;
		        check_all(allCheck,"abled");
			}
	}
}


//添加签到
//
//function captcha_check(){
//	if(!document.getElementsByName("captcha")) return false;
//	var captcha=document.getElementsByName("captcha");
//	var input1=captcha[0];/*document.getElementsByName("input1")[0];*/
//	var input2=captcha[1]/*document.getElementsByName("input2")[0];*/
//	var input3=captcha[2]/*document.getElementsByName("input3")[0];*/
//	var input4=captcha[3]/*document.getElementsByName("input4")[0];*/
//	input1.onkeydown=function() {
//		input1.select();
//		}
//	input2.onkeydown=function() {
//		input2.select();
//		}
//	input3.onkeydown=function() {
//		input3.select();
//		}
//	input4.onkeydown=function() {
//		input4.select();
//		}
//	input1.onkeyup = function() {
//		if(this.value.length==1){
//		   input2.select();
//           input2.focus();
//		   /*input2.value="";*/
//         }
//	}
//	input2.onkeyup = function() {
//		if(this.value.length==1){
//		   input3.select();
//           input3.focus();
//		   /*input3.value="";*/
//         }
//	}
//	input3.onkeyup = function() {
//		if(this.value.length==1){
//		   input4.select();
//           input4.focus();
//		   /*input4.value="";*/ 
//         }
//	} 
//	input4.onkeyup = function() {
//		if(this.value.length==1)
//		{
//		   setTimeout(function(){
//			  if(input2.value==""||input2.value==""||input3.value==""||input4.value=="")
//			  {
//			  return false;
//			  input1.select();
//			  input1.focus();
//			  }
//	          addsign(input1.value,input2.value,input3.value); 
//			  input1.value="";
//			  input2.value=""; 
//			  input3.value="";
//			  input4.value="";
//			  setTimeout(function(){
//				  input1.select();
//			      input1.focus();
//				  });
//			  },500) ;  
//         }
//	
//	}	
//}
//所有divclick失焦
//添加签到
function captcha_check()
{
	if(!document.getElementById("inputcaptcha")) return false;
	var captcha = document.getElementById("inputcaptcha");
	    
	captcha.oninput = function(){
	  if(captcha.value.length == 1)
	  {
		  
		  } 
	  if(captcha.value.length == 4)
	  { 
	    /*alert(captcha.value.length);*/
		 captcha.blur();
		 setTimeout("addsign('姓名','班级','号码')",1000);
		 setTimeout(function(){captcha.select();},2000);
		 setTimeout(function(){captcha.focus();captcha.value='';},3000);
	  }
	}
}

//添加节点
function addsign(name,Sclass,number){
	if(!document.getElementById("tablelist"))return false;
	var Ntable = document.getElementById("tablelist");
	var trElement = document.createElement("tr");
	
	var tdName = document.createElement("td");
	var textName = document.createTextNode(name);
	tdName.appendChild(textName);
	
	var tdClass = document.createElement("td");
	var textClass = document.createTextNode(Sclass);
	tdClass.appendChild(textClass);
	
	var tdNumber = document.createElement("td");
	var textNumber = document.createTextNode(number);
	tdNumber.appendChild(textNumber);
	
	trElement.appendChild(tdName);
	trElement.appendChild(tdClass);
	trElement.appendChild(tdNumber);
	
	removeClass(Ntable.firstChild,"first");
	Ntable.insertBefore(trElement,Ntable.firstChild);
	addClass(Ntable.firstChild,"first");	
}
addLoadEvent(addsign("余文豪","高三二班","12345678901"));
addLoadEvent(captcha_check);
addLoadEvent(all_check);
