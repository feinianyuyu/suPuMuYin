
$(function(){
	var userName=getCookie("username");
	if(userName==""){
		location.href="login.html"
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
	var oDiv = $(".cart_d_goodul ul");
	var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
	var priceAll = 0;//总价		
	var goodsAll = 0;//总数
	//先进入页面判断购物车内有无东西
	if(goods){
		if(JSON.stringify(goods)=="{}"){
    		$(".shopCar").hide();
    		$(".show_car").show();
    	}else{
    		$(".shopCar").show();
    		$(".show_car").hide();	
			var classCount=0;//商品类别数
			for(var i in goods){//如果有就便利缓存goods，并生成li动态添加到页面
				console.log(goods[i].price)
				var class_price=parseInt(parseInt(goods[i].price.slice(1))*goods[i].num*10)/10;//没类商品的总价
				priceAll+=class_price;
				goodsAll+=parseInt(goods[i].num);
				var str = "<li goodId="+goods[i].id+">"
	                +"<div class='good_check'>"
	                    +"<input type='checkbox' goodId="+goods[i].id+" checked='checked'>"
	                +"</div>"
	               + "<img goodId="+goods[i].id+" src="+goods[i].img+" width='72' height='72' class='good_img'>"
	               + "<div class='good_name'>"
	                  + " <span goodId="+goods[i].id+">"+goods[i].name+"</span>"
	                +"</div>"
	                +"<div class='good_attribute cart_d_item'>"
	                    +"<p>产地: 中国</p>"
	                   + "<p>尺码: 标准</p>"
	                    +"<p>规格: 国标</p>"
	                +"</div>"
	               + "<div class='good_price cart_d_item'>"
	                    +"<span goodId="+goods[i].id+">"+goods[i].price+"</span>"
	                +"</div>"
	                +"<div class='good_num'>"
	                    +"<input goodId="+goods[i].id+" type='button' class='good_downbtn' value='-'></input>"
	                   + "<input type='text' goodId="+goods[i].id+"  value="+goods[i].num+" class='input_num'></input>"
	                    +"<input goodId="+goods[i].id+" type='button' class='good_upbtn' value='+'></input>"
	                +"</div>"
	               + "<div class='good_price_all cart_d_item'>"
	                    +"<span goodId="+goods[i].id+">"+class_price+"</span>"
	                +"</div>"
	                +"<div class='good_del cart_d_item'>"
	                    +"<div ><a href='##' class='good_delete' goodId="+goods[i].id+">删除</a></div>"
	                    +"<div><a href='##'>收藏</a></div>"
	                +"</div>"
	            +"</li>"
	           	classCount++;
				oDiv.append(str);
				$(".sum").html(priceAll);
				$(".count").html(goodsAll);
				
			}
			//减商品数量按钮
			var good_downbtn = $(".good_downbtn");
			good_downbtn.click(function(){
				var num = $(this).siblings(".input_num").val();
				if(num>1){
					num--
				}
				var goodId = $(this).attr("goodId");
				$(this).siblings(".input_num").val(num);
				chang_price();
				chang_all_price();
				goods = JSON.parse($.cookie("carts"));
				goods[goodId].num = num;
				$.cookie("carts",JSON.stringify(goods),{expires:7,path:"/"});
			})
			//加商品数量按钮
			var good_upbtn = $(".good_upbtn");
			good_upbtn.click(function(){
				var num = $(this).siblings(".input_num").val();
				var goodId = $(this).attr("goodId");
				num++;
				$(this).siblings(".input_num").val(num);
				chang_price();
				chang_all_price();
				goods = JSON.parse($.cookie("carts"));
				goods[goodId].num = num;
				$.cookie("carts",JSON.stringify(goods),{expires:7,path:"/"});
			})
			//封装的函数，作用是随着按钮的按动改变单间商品总价格
			function chang_price(){
				$(".good_price_all span").html(function(){
					var result = parseInt($(this).parent().parent().find(".good_price span").text().slice(1)*$(this).parent().parent().find(".good_num .input_num").val()*10)/10;
					return result
				})
			}
		}
	}
	//选项按钮
	var all_checked=$(".allChecked");//全选按钮
	var goods_checked=$(".good_check input");//每个商品前的按钮
	var allPriceSpan= $(".good_price_all span") ;//每类商品的总价格
	var allGoodSpan = $(".input_num");//没类商品的数量
	var all_delete = $(".good_delete");//所有的删除
	var allLi=$(".cart_d_goodul li");//所有的li
	var allImg=$(".good_img");
	var allName=$(".good_name span");
	all_checked.click(function(){//当全选按钮点击时
		if($(this).prop("checked")){
			$("input[type='checkbox']").prop("checked", true);//让所有按钮被选中
			goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
			priceAll = 0;
			goodsAll = 0;
			for(var j in goods){//计算总价和总数
				priceAll+=(parseInt(goods[j].price.slice(1))*goods[j].num*10)/10;
				goodsAll+=parseInt(goods[j].num);
			}
			$(".sum").html(priceAll);
			$(".count").html(goodsAll);
		}else{
			$("input[type='checkbox']").prop("checked",false);//让所有按钮不被选中
			$(".sum").html(0);//价格0
			$(".count").html(0);	
		}
	})
	
	//封装的变换总价格的函数
	function chang_all_price(){
		var classCount = 0;//商品类目
		priceAll = 0;
		goodsAll = 0;
		for(var i in goods_checked){//遍利每个复选框按钮
			if(goods_checked.eq(i).prop("checked")){
				priceAll+=parseInt(allPriceSpan.eq(i).html());
				goodsAll+=parseInt(allGoodSpan.eq(i).val());
				classCount++
			}
			//如果选中商品类目和复选框数相等，则全选
			if(classCount == goods_checked.length){
				all_checked.prop("checked",true);
			}else{
				all_checked.prop("checked",false);
			}
		}
		$(".sum").html(priceAll);
		$(".count").html(goodsAll);
	}
	
	//点击复选框变换价格
	$(goods_checked).click(function(){
		chang_all_price();
	})
	
	//点击删除
	all_delete.click(function(){
		var iNow = $(this).index(".good_delete");//索引下标
		var idIndex = $(this).attr("goodId");//索引goodId
		for(var i in allLi){
			if(allLi.eq(i).attr("goodId") == idIndex){
				goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
				delete goods[idIndex];
				allLi.eq(i).remove();
			}
			$.cookie("carts",JSON.stringify(goods),{expires:7,path:"/"});//移除li后改变缓存
		}
		//改变各种数值重新调用函数 chang_all_price();
		all_delete = $(".good_delete");
		oDiv = $(".cart_d_goodul ul");
		all_checked=$(".allChecked");
		goods_checked=$(".good_check input");
		allPriceSpan= $(".good_price_all span");
		allGoodSpan = $(".input_num");
		allLi=$(".cart_d_goodul li");
		good_downbtn = $(".good_downbtn");
		good_upbtn = $(".good_upbtn");
		chang_all_price();
		//判断现在购物车是否空了
		if(JSON.stringify(goods)=="{}"){
			$(".shopCar").hide();
			$(".show_car").show();
		}else{
			$(".shopCar").show();
			$(".show_car").hide();
		}
	})
	
	//购物车全部清空
	var clear_car=$(".clear_car");
	clear_car.click(function(){
		$(".cart_d_goodul ul").hide();
		$.cookie("carts",JSON.stringify(goods),{expires:-1,path:"/"});
		$(".sum").html(0);
		$(".count").html(0);
		goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
		if(JSON.stringify(goods)=="{}"){
			$(".shopCar").hide();
			$(".show_car").show();
		}else{
			$(".shopCar").show();
			$(".show_car").hide();
		}
	})

	
	//跳转结算页面时，根据现页面复选框选中的东西来缓存一个新cookie ：GoodS，跳转后使用
	$(".good_submit").click(function(){
		if($(".sum").html()!=0){
			var payCookie = {};
			for(var i in goods_checked){
				if(goods_checked.eq(i).prop("checked")){
					var goodId = goods_checked.eq(i).attr("goodId");
					payCookie[goodId]={
						"id":goodId,
						"img":allImg.eq(i).attr("src"),
						"name":allName.eq(i).html(),
						"price":$(".good_price span").eq(i).html().slice(1),
						"num":allGoodSpan.eq(i).val(),
						"classPrice":$(".good_price_all span").eq(i).html()
					}
				}
			}
			$.cookie("Goods",JSON.stringify(payCookie),{expires:7,path:"/"})
			location.href="pay.html";
		}else{
			$(this).prop("disabled");
		}
	})
})	