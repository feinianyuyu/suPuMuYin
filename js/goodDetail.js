$(function(){
	//热门动态加载
	$.get("../data/goodDetail/hot_good.json",function(data){
		var result = data;
		var str = "";
		for(var i in result){
			str+="<li><a href='##'><img src="+result[i].img+" width='100%'/></a><div><a href='#'>"+result[i].name+"</a></div>"
                	+"<a class='price'>"
                	+result[i].price
                	+"</a>"
                +"</li> "               
		}
		$(".category_list ul").html(str);
	})
	//商品详情照片动态加载
	$.get("../data/goodDetail/detail.json",function(data){
		var result = data;
		var str = "";
		for(var i in result){
			str+="<p><img src="+result[i].img+">"
				+"</p>" 
		}
		$(".good_d_detailbox").html(str)
	})
    //吸顶导航
    var iFixTop=$(".parameter .tab_trigger").offset().top;
    $(window).scroll(function() {
		var iScrollTop = $(this).scrollTop();
		if(iScrollTop >= iFixTop) {
			$(".parameter .tab_trigger").css({position: "fixed", top: 0});

		} else {
			$(".parameter .tab_trigger").css("position", "static");
		}
		//选项卡切换
		$(".tab_trigger li").click(function(){
			
	    	$(this).addClass("active").siblings().removeClass('active');
			$(".tab_content_item1").eq($(this).index()).addClass("tab_content_selected").siblings().removeClass("tab_content_selected");
	    	if($(".parameter .tab_trigger").css("position")=="fixed") {
				$("html,body").stop().animate({scrollTop:iFixTop},500);
			}
	    });
	})

    //放大镜
    var goodMsg=JSON.parse($.cookie("goodsDetail"));
   	var goodId=goodMsg.id;
   	var goodImg=goodMsg.img;
    $(".middle-img").attr({src:goodMsg.img});
    $(".big-img").attr({src:goodMsg.img});
    $(".small-img-box img").attr({src:goodMsg.img});
    $("#g_price span").html(goodMsg.price);
    $(".good_name").html(goodMsg.name);

	var oDiv = $(".glass");
	var oMiddleImgBox = $(".glass .glass_big");//鼠标在上面滑动的box
	var oMiddleImg = $(".glass .middle-img");//上面的图片
	var oImageZoom = $(".glass .image-zoom");//图片上的罩面层
	var oBigImgBox = $(".glass .big-img-box");//发大图片的盒子
	var oBigImg = $(".glass .big-img");//发大后的图片
	var oSmallImgBox = $(".glass .small-img-box");//下面索引的小图片
	var aSmallImg = $(".glass .small-img-box img");//所有的小图片

	aSmallImg.mouseover(function() {
		var src = $(this).attr("src")
		oMiddleImg.attr("src", src);
		oBigImg.attr("src", src);
	})

	oMiddleImgBox.mouseover(function() {
		oImageZoom.show();
		oBigImgBox.show();
	})

	oMiddleImgBox.mouseout(function() {
		oImageZoom.hide();
		oBigImgBox.hide();
	})
	//鼠标在上面移动时
	oMiddleImgBox.mousemove(function(e) {
		var iScrollLeft = $(window).scrollLeft();
		var iScrollTop = $(window).scrollTop();
		var iLeft = iScrollLeft + e.clientX - oImageZoom.outerWidth()/2 - oMiddleImgBox.offset().left;
		var iTop = iScrollTop + e.clientY - oImageZoom.outerHeight()/2 - oMiddleImgBox.offset().top;
		var iSmallMaxLeft = oMiddleImgBox.outerWidth() - oImageZoom.outerWidth();
		var iSmallMaxTop = oMiddleImgBox.outerHeight() - oImageZoom.outerHeight();

		if(iLeft<0) {
			iLeft = 0;
		} else if(iLeft>iSmallMaxLeft) {
			iLeft = iSmallMaxLeft;
		}

		if(iTop<0) {
			iTop = 0;
		} else if(iTop>iSmallMaxTop) {
			iTop = iSmallMaxTop;
		}

		var iBigLeft = -iLeft/iSmallMaxLeft*(oBigImg.outerWidth()-oBigImgBox.outerWidth());
		var iBigTop = -iTop/iSmallMaxTop*(oBigImg.outerHeight()-oBigImgBox.outerHeight());
		oImageZoom.css({"left": iLeft, "top": iTop});
		oBigImg.css({"left": iBigLeft, "top": iBigTop})
	})
	// 加入购物车特效 插件不完善
	var offset = $(".cart_small").offset();  //结束的地方的元素
	$(".addcar").click(function(event){   //是$(".addcar")这个元素点击促发的 开始动画的位置就是这个元素的位置为起点
		var addcar = $(this);
		var img = addcar.parents().find('.middle-img').attr('src');
		var flyer = $('<img class="u-flyer" src="'+img+'">');
		flyer.fly({

			start: {
				left: event.pageX,
				top: event.pageY
			},
			end: {
				left: offset.left,
				top: offset.top,
				width: 0,
				height: 0
			}
		});
	});
	//加减购买数量
	$(".good_d_downbtn").click(function(){
		var num = $(".good_d_sum").val();
		if(num>1){
			num--
		}
		$(".good_d_sum").val(num)
	})
	$(".good_d_upbtn").click(function(){
		var num = $(".good_d_sum").val();
		num++;
		$(".good_d_sum").val(num)
	})
	//购物车数量
	var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
	var goodsAll = 0;//总数
	if(goods){
		for(i in goods){
			goodsAll+=parseInt(goods[i].num);
		};
		$(".cart_no").html(goodsAll);
	}

	$(".good_d_sum").blur(function(){
		if((/\d$/gi).test($(".good_d_sum").val())){
			$(".good_d_sum").val($(".good_d_sum").val())
		}else{
			$(".good_d_sum").val(1)
		}
	})
	// 加入购物车
	$(".addcar").click(function() {
		//缓存商品信息到carts
		var goodName = $(".good_name").html();
		var goodPrice = $("#g_price span").text();
		goods = $.cookie("carts") ? JSON.parse($.cookie("carts")) : {};
		if(goodId in goods) {
			var count = parseInt($(".good_d_sum").val());
			goods[goodId].num+=count;
		} else {
			goods[goodId] = {
				id: goodId,
				name: goodName,
				price: goodPrice,
				img:goodImg,
				num: 1,
			}
		}
		$.cookie("carts", JSON.stringify(goods), {expires: 7, path: "/"});
		//购物车车标数量
		goodsAll = 0;//先让总数为0
		if(goods){
			for(i in goods){
				goodsAll+=parseInt(goods[i].num);
			};
			$(".cart_no").html(goodsAll);
		}
	})
})
