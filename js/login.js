	
$(function(){
	var userName = $("#account");
	var pssword = $("#password");
	var btn = $("#btnLogin");
	var remember =$("#cbRememberUserName");
	var auto =$("#cbAutoLogin");
	var drag = $("#drag");
	var tip = $("#DIVLoginMsg");
	var drag_box = $(".bgSlider");
	var open=false;//判断滑块开关的
	//引用的滑块插件
	var slider = new SliderUnlock("#slider",{
        successLabelTip : "验证通过"    
    },function(){
        $(".tips").html("");
        $(".bgSlider").css("backgroundColor","rgb(166, 230, 154)");
        $("#label").html("√");
        open=true;
    });
    $("#slider").mousemove(function(){event.returnValue=false;}) //阻止滑块被选中事件   
	slider.init();
	//判断是否自动登录
	if(auto[0].checked){
		if(getCookie("username")==""||getCookie("pwd")==""){
		}else{
			location.href="index.html"
		}
	}	
	$("#account").val(getCookie("username1"));  
    //点击登录按钮校验
	btn.click(function(){
		var user = userName.val();
		var pwd = pssword.val();
		if(open==true){
			$.get("../data/login/user.json",function(data){//JSON里的账号密码
				var result = data;
				for(var i in result){
					if(user==result[i].userName&&pwd==result[i].password){//如果账号密码正确。跳转
						setCookie("username",user);
						setCookie("pwd",pwd);
						location.href="index.html"
					}else if(user==getCookie("username")&&pwd==getCookie("pwd")&&user!=""&&pwd!=""){//如果与缓存的账号密码正确且不为空，跳转
						setCookie("username",user);
						setCookie("pwd",pwd);
						console.log("huancun")
						location.href="index.html";
						
					}else{
						tip.addClass(".error_tips");
						tip.html("<i></i>帐号或密码错误")
						tip.css("display","block");
					}
				}
				if(remember[0].checked){//如果记住密码按钮是被选中的，存缓存
					setCookie("username1",user,7);
					setCookie("pwd1",pwd,7);
				}
			})
			return false;//关闭开关
		}else{
			tip.addClass(".error_tips");
			tip.html("<i></i>请滑动滑块验证")
			tip.css("display","block");
			return false;
		}
	})
})