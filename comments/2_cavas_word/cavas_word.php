 <!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Pragma" CONTENT="no-cache">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="format-detection" content="telephone=no">
	<meta name="keywords" content="想为你做件事，让你更快乐的事，好在你的心中埋下我的名字."/>
    <meta name="description" content="想为你做件事，让你更快乐的事，好在你的心中埋下我的名字." />
	<title>我想为你做件事</title>
	<link rel="stylesheet" href="css/cavas_word.css">
</head>

<body>
	<p class="banner">想为你做件事，让你更快乐的事，好在你的心中埋下我的名字.</p>
	<!--img src="img/banner.jpg" alt="" class="banner"-->

	<audio src="loveyou.mp3"preload loop controls id="music">浏览器不支持</audio>
	<canvas id="canvas" >
		您的浏览器不支持html5画布功能。
	</canvas>
	<div class="music" id="music-on"></div>
	<div class="reload" id="reload"></div>
	<div id="info" data="3">您有一封来信,请划开。</div>
	<div class="nextpage"><a href="Fireworks.html">更多</a></div>
	<script src="js/cavas_word.js"></script>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script>
		<?php
			require_once "signature.php";
			$jssdk = new JSSDK("wxe36558ab44ff34e9", "ca239fe2930feb49ea83f174a080697c");
			$signPackage = $jssdk->GetSignPackage();
			$news = array('Title' =>'我想为你做件事', 'Description'=>'想为你做件事，让你更快乐的事，好在你的心中埋下我的名字.','PicUrl' =>'http://tofei.sinaapp.com/img/banner.jpg','Url' =>'http://tofei.sinaapp.com/cavas_word.php');
		?>
		 wx.config({
	        debug: false,
	        appId: '<?php echo $signPackage["appId"];?>',
	        timestamp: '<?php echo $signPackage["timestamp"];?>',
	        nonceStr: '<?php echo $signPackage["nonceStr"];?>',
	        signature: '<?php echo $signPackage["signature"];?>',
	        jsApiList: [
	            // 所有要调用的 API 都要加到这个列表中
	            'checkJsApi',
	            'openLocation',
	            'getLocation',
	            'onMenuShareTimeline',
	            'onMenuShareAppMessage',
	            'onMenuShareWeibo',
	            'onMenuShareQQ',
	            'onMenuShareQZone'
	          ]
	    });
		wx.ready(function(){
			console.log("ok");
			//console.log('<?php echo $news['PicUrl'];?>');
			wx.onMenuShareAppMessage({

	          title: '<?php echo $news['Title'];?>',
	          desc: '<?php echo $news['Description'];?>',
	          link: '<?php echo $news['Url'];?>',
	          imgUrl: '<?php echo $news['PicUrl'];?>',
	          trigger: function (res) {
	          	console.log('onMenuShareAppMessage');
	            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
	            // alert('用户点击发送给朋友');
	          },
	          success: function (res) {
	            // alert('已分享');
	          },
	          cancel: function (res) {
	            // alert('已取消');
	          },
	          fail: function (res) {
	            // alert(JSON.stringify(res));
	          }
	        });

	        wx.onMenuShareTimeline({
	          title: '<?php echo $news['Title'];?>',
	          link: '<?php echo $news['Url'];?>',
	          imgUrl: '<?php echo $news['PicUrl'];?>',
	          trigger: function (res) {
	            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
	            // alert('用户点击分享到朋友圈');
	          },
	          success: function (res) {
	            // alert('已分享');
	          },
	          cancel: function (res) {
	            // alert('已取消');
	          },
	          fail: function (res) {
	            // alert(JSON.stringify(res));
	          }
	        });
	        wx.onMenuShareQQ({
			    title: '<?php echo $news['Title'];?>',
		        desc: '<?php echo $news['Description'];?>',
		        link: '<?php echo $news['Url'];?>',
		        imgUrl: '<?php echo $news['PicUrl'];?>',
			    success: function () { 
			       // 用户确认分享后执行的回调函数
			    },
			    cancel: function () { 
			       // 用户取消分享后执行的回调函数
			    }
			});
			wx.onMenuShareWeibo({
			    title: '<?php echo $news['Title'];?>',
		        desc: '<?php echo $news['Description'];?>',
		        link: '<?php echo $news['Url'];?>',
		        imgUrl: '<?php echo $news['PicUrl'];?>',
			    success: function () { 
			       // 用户确认分享后执行的回调函数
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    }
			});
			wx.onMenuShareQZone({
			    title: '<?php echo $news['Title'];?>',
		        desc: '<?php echo $news['Description'];?>',
		        link: '<?php echo $news['Url'];?>',
		        imgUrl: '<?php echo $news['PicUrl'];?>',
			    success: function () { 
			       // 用户确认分享后执行的回调函数
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    }
			});
		});
		wx.error(function(res){
			console.log("no");
		});
		
	</script>
</body>

</html>