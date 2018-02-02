$(function(){
	//鼠标移入移除显示隐藏菜单
	$("#supuy_user").mouseover(function(){
		$(".user_con").css("display","block")
	})
	$("#supuy_user").mouseout(function(){
		$(".user_con").css("display","none")
	})
	$("#supuy_app").mouseover(function(){
		$(".app_con").css("display","block")
	})
	$("#supuy_app").mouseout(function(){
		$(".app_con").css("display","none")
	})
	$("#supuy_service").mouseover(function(){
		$(".service_con").css("display","block")
	})
	$("#supuy_service").mouseout(function(){
		$(".service_con").css("display","none")
	})
	$(".navCon-cate-title").mouseover(function(){
		$(".cateMenu").css("display","block")
	})
	$(".navCon-cate-title").mouseout(function(){
		$(".cateMenu").css("display","none")
	})
	//二级导航
	$(".cate-tag").mouseover(function(){
		$(this).parent().find(".list-item").css("display","block");
		$(".list-item").mouseover(function(){
			$(this).css("display","block");
		})
	})
	$(".cate-tag").mouseout(function(){
		$(this).parent().find(".list-item").css("display","none")
	})
	//加载片段页面函数
	var userName=getCookie("username");
	if(userName==""){

	}else{
		$(".loadHide").html(userName);
		$(".load").hide();
		$(".zhuceHide").html("<a href='index.html' class='exit'>退出</a>")
		$(".zhuce").hide();
	}
	$(".exit").click(function(){
		userName=removeCookie("username");
	})
	
	var oInput = document.getElementById("search_text");
	$(oInput).keyup(function(){
		var value = this.value;
		var oScript = document.createElement("script");
		oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+value+"&json=1&p=3&cb=suggestion&t";
		document.body.appendChild(oScript);
		
	})	
})

//百度收索提示框suggestion函数
function suggestion(data){
	var result = data.g
	var oUl = document.getElementById("tipList");
	oUl.innerHTML = "";	
	for(var i in result){
		var oLi = document.createElement("li");
		oLi.innerHTML = result[i].q;
		oUl.appendChild(oLi);
		oUl.style.display="block"
	}
	document.onclick=function(){
		oUl.style.display="none"
	}
	$(".tipList li").click(function(){
		$($(oInput)).html($(this).html())
	})
}
//加载html片段封装函数
function loadHtml(url,selector){
	$.ajax({
		url:url,
		async:false,
		success:function(data){
			$(selector).html(data)
		}
	})
}	

	
		
	
	
