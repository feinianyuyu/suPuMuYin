
$(function(){
	var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
	var goodsAll = 0;//总数
	if(goods){
		for(i in goods){
			goodsAll+=parseInt(goods[i].num);
		};
		$(".cart_no").html(goodsAll);
	}
	//二级菜单栏的显示与隐藏
	$(".cateMenu").css("display","block");
	$(".navCon-cate-title").mouseout(function(){
		$(".cateMenu").css("display","block");
	})
	$(".list-item").mouseout(function(){
		$(this).css("display","none")
	})
	//大轮播图
	var isClick = false;
	var oDiv = $("#banner");
	var aDiv = $(".banner_box div");
	var oPrev = $(".banner_prev");
	var oNext = $(".banner_next");
	var aLi = $(".banner_nav li");
	var iNow = 0;
	autoPlay();
	function autoPlay(){
		clearInterval(oDiv.timer);
		oDiv.timer = setInterval(function(){
			iNow++;
			if(iNow==aDiv.length){
				iNow=0;
			}
			tab();
		},1500)
	}
	oDiv.mouseover(function(){

		clearInterval(oDiv.timer);
		oPrev.stop().fadeTo("slow",0.3);
		oNext.stop().fadeTo("slow",0.3)
	})
	oDiv.mouseout(function(){
		autoPlay();
		oPrev.stop().fadeOut("slow",0);
		oNext.stop().fadeOut("slow",0)
	})
	oPrev.click(function(){
		isClick = true;
		iNow--;
		if(iNow==-1){
			iNow=aDiv.length-1;
		}
		tab();
	})
	oNext.click(function(){
		isClick = true;
		iNow++;
		if(iNow==aDiv.length){
			iNow=0;
		}
		tab();
	})
	for(var i = 0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onclick = function(){
			iNow = this.index;
			tab();
		}
	}
	function tab(){
		
		aLi.stop().removeClass("active").eq(iNow).stop().addClass("active");
		aDiv.stop().animate({opacity:0}).eq(iNow).stop().animate({opacity:100},100);

	}
	//动态加载热门商品
	$.get("../data/index/hot_sale.json",function(data){
		var result=data;
		var str="";
		for(var i in result){
			str+="<li class='hot_sale'>"
                +"<div class='sprice_list_pergood'>"
                    +"<a href='##'>"
	                    +"<div class='sprice_list_good_img'>"
	                        +"<img src="+result[i].img+" class='hot_img' width='219' height='219'>"
	                        +"<div class='sprice_list_roundhover empty'>"
	                        +"</div>"
	                        +"<i class='ltaghide_0'></i>"
	                    +"</div>"
                    +"</a>"
                    +"<div class='hot_hide'>"      
                    +"</div>"
                    +"<a href='goodList.html' class='hot_move'>"
                        +"查看相关"
                    +"</a>"
                    +"<a href='##' >"+result[i].name+"</a>"
                    +"<br/>"
                    +"<span class='price'>"+result[i].price2+"</span>"
                    +"<br/>" 
                    +"<s>"+result[i].price1+"</s>"       
                +"</div>"                   
            +"</li>"
		}
		$("#hsprice_box ul").html(str)
	})
	//动态添加限时特卖
	$.get("../data/index/home_sale.json",function(data){
		
		var result=data;
		var str="";
		for(var i in result){
			str+="<li>"
                +"<a href='goodList.html'>"
                    +"<div class='home_big_box'>"
                        +"<img src="+result[i].img_big+" width='588' height='234'/>"
                        +"<div class='home_box'>"
                            +"<img src="+result[i].img_small+" width='111' height='52'/>"
                            +"<div class='home_box_small'>"
                                +"<span class='home_name'>"+result[i].name+"</span>"
                                +"<span class='home_detal'>"+result[i].detal+"</span>"
                            +"</div>"
                        +"</div>"
                        
                    +"</div>"
                    +"<div class='deadline_time'>"
                        +"<span>还有：<span>"
                            +"<span class='days'>00</span>天"
                            +"<span class='hours'>00</span>时"
                            +"<span class='minutes'>00</span>分"
                            +"<span class='seconds'>00</span>秒结束"
                    +"</div>"
                +"</a>"
            +"</li>" ;
            
		}
		
		$(".home_sale ul").html(str);
		$(".home_sale li").mouseover(function(event){
		//限时特卖商品的上滑特效	
			event.stopPropagation();
			$(this).find(".home_box").stop().animate({
				bottom:0
			}).find(".home_box_small").stop().animate({
				bottom:0
			},"slow")	
		})
		$(".home_sale li").mouseout(function(event){
			event.stopPropagation();
			$(this).find(".home_box").stop().animate({
				bottom:"-56px"
			}).find(".home_box_small").stop().animate({
				bottom:"-56px"
			})
		})
		//倒计时			
		$('.deadline_time').eq(0).downCount({
			date: "12/17/2016 12:00:00",
			offset: +10
			}, function () {
				alert('倒计时结束!');
		});
		$('.deadline_time').eq(1).downCount({
			date: "12/18/2016 12:00:00",
			offset: +10
			}, function () {
				alert('倒计时结束!');
		});		
		$('.deadline_time').eq(2).downCount({
			date: "12/20/2016 12:00:00",
			offset: +10
			}, function () {
				alert('倒计时结束!');
		});	
		$('.deadline_time').eq(3).downCount({
			date: "12/21/2016 12:00:00",
			offset: +10
			}, function () {
				alert('倒计时结束!');
		});			
	})
	//每层楼里右边动画效果
	function move_box(){
		$(".stairs_right li").mouseover(function(event){
			event.stopPropagation();
			$(this).find("img").stop().animate({left:"25px"});
		})
		$(".stairs_right li").mouseout(function(event){
			event.stopPropagation();
			$(this).find("img").stop().animate({left:"35px"});
		})
	}
	//小轮播图动态加载
	$.get("../data/index/lunbo1.json",function(data){		
		var result=data;
		var str=""
		var count = 0;
		for(var i in result){
			var str1  = "<li></li>"
			$("#container1 .box").append(str1)
			for(var j in result[i]){
				str =
						"<a href='##'><img src="+result[i][j].img+"></a>"					
				$("#container1 .box li").eq(count).append(str);				
			}
			count++			
		}
		lunbo($("#container1"));
	})
	$.get("../data/index/lunbo2.json",function(data){		
		var result=data;
		var str=""
		var count = 0;
		for(var i in result){
			var str1  = "<li></li>"
			$("#container2 .box").append(str1)
			for(var j in result[i]){
				str =
						"<a href='##'><img src="+result[i][j].img+"></a>"					
				$("#container2 .box li").eq(count).append(str);				
			}
			count++
		}
		lunbo($("#container2"));
	})
	$.get("../data/index/lunbo2.json",function(data){		
		var result=data;
		var str=""
		var count = 0;
		for(var i in result){
			var str1  = "<li></li>"
			$("#container3 .box").append(str1)
			for(var j in result[i]){
				str =
						"<a href='##'><img src="+result[i][j].img+"></a>"					
				$("#container3 .box li").eq(count).append(str);				
			}
			count++
		}
		lunbo($("#container3"));
	})
	$.get("../data/index/lunbo2.json",function(data){		
		var result=data;
		var str=""
		var count = 0;
		for(var i in result){
			var str1  = "<li></li>"
			$("#container4 .box").append(str1)
			for(var j in result[i]){
				str =
						"<a href='##'><img src="+result[i][j].img+"></a>"					
				$("#container4 .box li").eq(count).append(str);				
			}
			count++
		}
		lunbo($("#container4"));

	})
	$.get("../data/index/lunbo2.json",function(data){		
		var result=data;
		var str=""
		var count = 0;
		for(var i in result){
			var str1  = "<li></li>"
			$("#container5 .box").append(str1)
			for(var j in result[i]){
				str =
						"<a href='##'><img src="+result[i][j].img+"></a>"					
				$("#container5 .box li").eq(count).append(str);				
			}
			count++
		}
		lunbo($("#container5"));
	})
	//小轮播图封装
	function lunbo(obj){
		var oDiv =$(obj);
		var oUl = $(oDiv).find("ul");
		var aLi = $(oDiv).find("li");
		var oPrev = $(oDiv).find(".prev");
		var oNext = $(oDiv).find(".next");
		var iNow = 0;
		var len=aLi.length;
		var oFirst = aLi.first().clone(true);
		len+=1;
		oUl.append(oFirst);
		oUl.css("width",aLi.first().outerWidth()*len)
		autoPlay();
		function autoPlay(){
			clearInterval(oDiv.timer);
			oDiv.timer = setInterval(function(){
				iNow++;
				if(iNow==len){
					iNow=1;
					oUl.css("left",0);
				}
				tab();
			},1000)
		}
		oPrev.click(function(){
			iNow--;
			if(iNow==-1){
				oUl.css("left",-aLi.first().outerWidth()*(len-1));
				iNow= len-2;
			}
			tab();
			return false;
		})
		oNext.click(function(){
			iNow++;
			if(iNow==len){
				oUl.css("left",0);
				iNow=1;
			}
			tab();
			return false;
		})
		function tab(){	
			var navIndex = 0;
			if(iNow==len-1){
				navIndex=0;
			}else{
				navIndex = iNow;
			}
			oUl.stop().animate({left:-iNow*aLi.first().outerWidth()},"slow")		
		}
	}
	//楼梯内图片动态加载
	$.get("../data/index/stairs1_right.json",function(data){
		var result = data;
		var str="";
		for(var i in result){
			str+="<li><a href='goodList.html'>"
					+"<p class='stairs_p1'>"+result[i].p1+"</p>"
					+"<p class='stairs_p2'>"+result[i].p2+"</p>"
					+"<img src="+result[i].img+" width='120' height='120'>"
					+"</a>"
				+"</li>"
		}
		$(".stairs_right ul").eq(0).html(str);
		move_box();
	})
	$.get("../data/index/stairs2_right.json",function(data){
		var result = data;
		var str="";
		for(var i in result){
			str+="<li><a href='goodList.html'>"
					+"<p class='stairs_p1'>"+result[i].p1+"</p>"
					+"<p class='stairs_p2'>"+result[i].p2+"</p>"
					+"<img src="+result[i].img+" width='120' height='120'>"
					+"</a>"
				+"</li>"
		}
		$(".stairs_right ul").eq(1).html(str);
		$(".stairs_right ul").eq(2).html(str);
		$(".stairs_right ul").eq(3).html(str);
		$(".stairs_right ul").eq(4).html(str);
		move_box();
	})
	//底部图片动态加载
	$.get("../data/index/my.json",function(data){
		var str ="";
		for (var i in data){
			str+="<li><a href='##'><img src="+data[i].img+"></a></li>"
		}
		$(".muying_list").html(str)
	})
	//楼梯
	var isClick = false//点击是true。没有点击是false；
	$("#loutiNav  ul li").click(function(){//楼梯点击时改变页面滚动高度
		isClick = true
		$(this).find("span").addClass("active").parent().siblings().find("span").removeClass("active");
		var iTop = $(".common_stairs").eq($(this).index()).offset().top;
		$("html,body").stop().animate({scrollTop:iTop},500,function(){
			isClick = false;
		});
	})
	//滚动时改变楼梯样式
	$(window).scroll(function(){
		if(!isClick){
			var iScrollTop = $(this).scrollTop();
			$(".common_stairs").each(function(){
				if(iScrollTop<$(".common_stairs").eq(0).offset().top-$(this).prev().outerHeight()/2){
					$("#loutiNav").hide();
				}else if(iScrollTop>=$(this).offset().top-$(this).prev().outerHeight()/2){
					$("#loutiNav ul li").eq($(this).index(".common_stairs")).find("span").addClass("active").parent().siblings().find("span").removeClass("active")
					$("#loutiNav").show();
				}
			})
			if(iScrollTop>$(".fiveF").offset().top){
				$("#loutiNav").hide();
			}
		}
		
	})
	$(".return_top").click(function(){
		$("html,body").stop().animate({scrollTop:0},500)
	})
})

	

	
