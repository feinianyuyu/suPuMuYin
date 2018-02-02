$(function(){
	$("#supuy_user").mouseover(function(){
		$(".user_con").css("display","block")
		$(this).find(".down").css({
		"background": "#fff",
		"borderTop": "1px solid red",
		"borderRight":"1px solid red",
		"borderBottom":"none",
		"borderLeft":"1px solid red"
		})
	})
	$("#supuy_user").mouseout(function(){
		$(".user_con").css("display","none")
		$(this).find(".down").css({
		"background": "#F6F6F6",
		"borderTop": "1px solid #F6F6F6",
		"borderRight":"1px solid #F6F6F6",
		"borderBottom":"none",
		"borderLeft":"1px solid #F6F6F6"
		})
	})
	$("#supuy_app").mouseover(function(){
		$(".app_con").css("display","block")
		$(this).find(".down").css({
		"background": "#fff",
		"borderTop": "1px solid red",
		"borderRight":"1px solid red",
		"borderBottom":"none",
		"borderLeft":"1px solid red"
		})
	})
	$("#supuy_app").mouseout(function(){
		$(".app_con").css("display","none")
		$(this).find(".down").css({
		"background": "#F6F6F6",
		"borderTop": "1px solid #F6F6F6",
		"borderRight":"1px solid #F6F6F6",
		"borderBottom":"none",
		"borderLeft":"1px solid #F6F6F6"
		})
	})
	$("#supuy_service").mouseover(function(){
		$(".service_con").css("display","block")
		$(this).find(".down").css({
		"background": "#fff",
		"borderTop": "1px solid red",
		"borderRight":"1px solid red",
		"borderBottom":"none",
		"borderLeft":"1px solid red"
		})
	})
	$("#supuy_service").mouseout(function(){
		$(".service_con").css("display","none")
		$(this).find(".down").css({
		"background": "#F6F6F6",
		"borderTop": "1px solid #F6F6F6",
		"borderRight":"1px solid #F6F6F6",
		"borderBottom":"none",
		"borderLeft":"1px solid #F6F6F6"
		})
	})
	
})

function loadHtml(url,selector){
	$.ajax({
		url:url,
		async:false,
		success:function(data){
			$(selector).html(data)
		}
	})
}