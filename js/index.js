$(function(){
	//监听游戏规则的点击
	$(".rule").click(function(){
		$(".rules").stop().fadeIn(100);
	});
	//监听关闭按钮
	$(".close").click(function(){
		$(".rules").stop().fadeOut(100);
	});
	//监听开始按钮的点击
	$(".start").click(function(){
		$(this).stop().fadeOut(100);
		//调用处理进度条的方法
		progressHandler();
		wolfAnimation();
	});
	//监听重新开始按钮
	$(".reStart").click(function(){
		$(".mask").stop().fadeOut(100);
		progressHandler();
		wolfAnimation();
		$(".score").text(0);
	});
	//定义处理进度条的方法（进度条宽度变小）
	function progressHandler(){
		$(".progress").css({
			width: 180
		});
		//开启定时器处理进度条
		var timer=setInterval(function (){
			//拿到进度条当前的宽度,减少宽度,并给进度条重新赋值
			var progressWidth = $(".progress").width();
			progressWidth -= 2;
			$(".progress").css({
				width: progressWidth
			});
			if(progressWidth<=0){
				clearInterval(timer);
				$(".mask").stop().fadeIn(100);
				stopAnimation();
			}
		}, 100);
	}
	//定义灰太狼动画的方法
	var wolfTimer;
	function wolfAnimation(){
		//定义两个数组保存所有狼的图片
		var wolf_1=['./img/h0.png','./img/h1.png','./img/h2.png','./img/h3.png','./img/h4.png','./img/h5.png','./img/h6.png','./img/h7.png','./img/h8.png','./img/h9.png']
		var wolf_2=['./img/x0.png','./img/x1.png','./img/x2.png','./img/x3.png','./img/x4.png','./img/x5.png','./img/x6.png','./img/x7.png','./img/x8.png','./img/x9.png']
		//定义数组保存所有位置
		var arrPos=[
			{left:"100px",top:"115px"},
			{left:"20px",top:"160px"},
			{left:"190px",top:"142px"},
			{left:"105px",top:"193px"},
			{left:"19px",top:"221px"},
			{left:"202px",top:"212px"},
			{left:"120px",top:"275px"},
			{left:"30px",top:"295px"},
			{left:"209px",top:"297px"}
		];
		//创建图片
		var $wolfImage=$("<img src='' class='wolfImg'>");
		//随机获取图片位置
		var posIndex=Math.round(Math.random()*8);
		//设置图片位置
		$wolfImage.css({
			position:"absolute",
			left:arrPos[posIndex].left,
			top:arrPos[posIndex].top
		});
		//随即获取数组类型
		var wolfType=Math.round(Math.random()) == 0? wolf_1 : wolf_2;
		//设置图片内容
		window.wolfIndex=0;
		window.wolfIndexEnd=5;
		wolfTimer=setInterval(function(){
			if(wolfIndex>wolfIndexEnd){
				$wolfImage.remove();
				clearInterval(wolfTimer);
				wolfAnimation();
			}
			$wolfImage.attr("src", wolfType[wolfIndex]);
			wolfIndex++;
		}, 200);
		//将图片添加到界面上
		$(".container").append($wolfImage);
		//调用处理游戏规则的方法
		gameRules($wolfImage);
	}
	function gameRules($wolfImage){
		$wolfImage.one("click", function(){
			//修改索引
			window.wolfIndex=5;
			window.wolfIndexEnd=9;
			//拿到当前点击的图片地址
			var $src=$(this).attr("src");
			//判断是否是灰太狼
			var flag = $src.indexOf("h") >= 0;
			//增减分数
			if(flag){
				$(".score").text(parseInt($(".score").text()) +10);
			}else{
				$(".score").text(parseInt($(".score").text()) -10);
			}
		});
	}
	function stopAnimation(){
		$(".wolfImg").remove();
		clearInterval(wolfTimer);
	}
});