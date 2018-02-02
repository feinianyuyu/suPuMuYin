$(document).ready(function(){
	//获取购物车数据
	var goods = $.cookie("carts")?JSON.parse($.cookie("carts")):{};
	var goodsAll = 0;//总数
	if(goods){
		for(i in goods){
			goodsAll+=parseInt(goods[i].num);
		};
		$(".cart_no").html(goodsAll);
	}
	
	$.ajax({
		url:"../data/goodList/img.json",
		success:function(data){
			var str="";
			for(var i in data){
				str="<img src="+data[i].img+">"
			}
			$("#banner").html(str)
		}
	})
	function getProAjax(id,num){
		var oBox = $(id);
		oBox.html("")
		$.ajax({
			url:"../data/goodList/produce.json",
			success:function(data){
				var result = data;
				var str = "";
				for (var i in result[num]){
					str += "<li class='good_li' id="+result[num][i].id+">"
			           		+"<a href='goodDetail.html' target='_blank'>"
			               	+"<img src="+result[num][i].img+">"
			               	+"<div class='good_name'>"
			               		+"<span>"+result[num][i].name+"</span>"
			               	+"</div>"
			               	+"<div class='sheng'>"
			           		+"<img src='../img/goodList/sheng.png'>"
			           		+"<div class='spread'>"
			           			+"<p>"+"省"+"<p>"
			           			+"<span>"+result[num][i].discount+"</span>"
			           		+"</div>"
			           		+"</div>"
			               	+"<div class='good_price'>"
			               		+"<s>"+result[num][i].price2+"</s>"+"<br/>"
			               		+"<span>市场价：</span><span>"+result[num][i].price1+"</span>"
			               	+"</div>"
			               +"</a>"
			           +"</li>"        
				}
				oBox.append(str);
				//鼠标移入改变li样式
				$(".good a").mouseenter(function(){
					$(this).find(".good_name").stop().animate({"top":200},200)
				})
				$(".good a").mouseleave(function(){
					$(this).find(".good_name").stop().animate({"top":230},200)
				})
			}
		}).done(function(){//获取点击图片缓存
			$(".good_li").click(function(){
				var goods = {};
				goods.id=$(this).attr("id");
				goods.name=$(this).find(".good_name").find("span").text();
				goods.price=$(this).find(".good_price").find("span").last().text();
				goods.img=$(this).find("img").attr("src");
				$.cookie("goodsDetail",JSON.stringify(goods),{expires:7,path:"/"})
				//location.href="goodDetail.html"
			})
		
		})
	}	
	//实现分页
	var iNowPage=1;
	getProAjax(".good ul",1);
	var aPage = $(".pagination-pages").find(".pageNum");
	aPage.click(function(){
		iNowPage=$(this).html();
		getProAjax(".good ul",iNowPage)
		getActive(iNowPage);
	})
	// 上一页
	function getActive(iNowPage){
		Index = iNowPage-1;
		aPage.removeClass("current");
		aPage.eq(Index).addClass("current");
	}
	$(".page-prev").click(function(){
		iNowPage--;
		if(iNowPage==0){
			iNowPage=1;
		}
		getProAjax(".good ul",iNowPage);
		getActive(iNowPage);
	})
	//下一页
	$(".page-next").click(function(){
		iNowPage++;
		if(iNowPage==4){
			iNowPage=3;
		}
		getProAjax(".good ul",iNowPage);
		getActive(iNowPage);
	})
	//第一页
	$(".page-first").click(function(){
		iNowPage=1;
		getProAjax(".good ul",iNowPage);
		getActive(iNowPage);
	})
	//最后一页
	$(".page-last").click(function(){
		iNowPage=3;
		getProAjax(".good ul",iNowPage);
		getActive(iNowPage);
	})

	
})