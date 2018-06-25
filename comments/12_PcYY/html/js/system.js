/****全局变量*****/
var animationSpeed=300;
$("#add-manege").bind('click', function(event) {
	/* Act on the event */
	$('.Manage-new').modal('show');
});
$(".D-sumary>.a-green").bind('click', function(event) {
	/* Act on the event */
	$(this).parent().hide();
	$(this).parent().next().slideDown();
});
$(".D-detail>.a-orange").bind('click', function(event) {
	/* Act on the event */
	$(this).parent().prev().show();
	$(this).parent().hide();
});
/*左边导航sidebar的开关*/
$(".treeview>a ").bind('click', function(event) {
	if($(this).parent().hasClass('active')&&$(this).next().is(':visible'))
	{
		$(this).next().slideUp(animationSpeed,function(){
			$(this).parent().removeClass('active');
		});
	}
	else
	{
		$(".treeview.active ul").slideUp(animationSpeed,function(){
			$(this).parent().removeClass('active');
		});
		$(this).next().slideDown(animationSpeed,function(){
			//$(".treeview.active").removeClass('active');
			$(this).parent().addClass('active');
		});
	}  

});
/*左边导航sidebar的开关(根据浏览高度关闭)*/
$(window).resize( function() {
	var hhh=window.innerHeight;
	var www=window.innerWidth;
	var tree=$(".treeview.active"),treeul=tree.find('ul');
	if(hhh<630&&tree.length>0)
	{
		//console.log(hhh);
		treeul.slideUp(animationSpeed,function(){
			//$(this).parent().removeClass('active');
		});
	}
	else if(tree.length>0&&!treeul.is(':visible'))
	{
		treeul.slideDown(animationSpeed,function(){
			//$(this).parent().removeClass('active');
		});
	}
});
/*模拟下拉选项，点击后文本选择改变*/
$(".dropdown-menu a").bind('click',function(){
	console.log('kk');
	$(this).parents(".dropdown").find(".select-item").text($(this).text());
});




