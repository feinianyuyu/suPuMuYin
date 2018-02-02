$(function(){
	//登录用户
	var userName=getCookie("username");
	if(userName==""){
	}else{
		//$(".login_box").html("hi!"+userName+"欢迎来到速普商城！")
		$(".loadHide").html(userName);
		$(".load").hide();
		$(".zhuceHide").html("<a href='shopCar.html' class='exit'>退出</a>")
		//$(".zhuceHide").html(userName);
		$(".zhuce").hide();
	}
	$(".exit").click(function(){
		userName=removeCookie("username");
	})

	//选择支付方式
	$(".pay_way").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
	})
	//获取缓存
	var goods = $.cookie("Goods")?JSON.parse($.cookie("Goods")):{};
	var priceAll = 0;//总价		
	var goodsAll = 0;//总数
	if(goods){
		var classCount=0;//商品类别数
		for(var i in goods){//遍历goods，动态添加li
			var class_price=parseInt(goods[i].price*goods[i].num)
			priceAll+=class_price;
			goodsAll+=parseInt(goods[i].num);
			var str ="<li>"
	                +"<img src="+goods[i].img+" width='72' height='72' class='good_img'>"
	                +"<div class='good_name'>"
	                    +"<span>"+goods[i].name+"</span>"
	                +"</div>"
	                +"<div class='good_attribute cart_d_item1'>"
	                    +"<p>产地: 中国</p>"
	                    +"<p>尺码: 60*60cm</p>"
	                    +"<p>规格: 10片装</p>"
	                +"</div>"
	                +"<div class='good_price cart_d_item1'>"
	                    +"<span>"+goods[i].price+"</span>"
	                +"</div>"
	                +"<div class='good_num'>"
	                    +"<span>"+goods[i].num+"</span>"
	                +"</div>"
	                +"<div class='good_price_all cart_d_item1'>"
	                    +"<span>"+class_price+"</span>"
	                +"</div>"
	            +"</li>" 
           	classCount++;
			$(".goods_ul").append(str);
			$(".all_price").html(priceAll);
			$(".all_goods").html(goodsAll);
		}
	}

})