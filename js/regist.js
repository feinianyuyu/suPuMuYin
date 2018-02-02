var regs = {//正则
	pwdReg: /^[^\s]{6,16}$/,
	mobileReg:/(^1[0-9]{10}$)|(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/
}

$(function(){
	var phone = $("#new_account");
	var pwd = $("#reg_password");
	var yzm = $("#reg_verifyCode");
	var ck = $("#ck");
	var btn = $("#btnRegister");
	var phoneYzm = $("#ver_code");
	var tip = $("#DIVRegisterMsg");
	var yzm_box=$(".yzm_box");
	
	phone.blur(function(e){
		checkPhone(e);
	})
	phone.keyup(function(e){
		checkPhone(e);
	})
	pwd.blur(function(e){
		checkPwd(e);
	})
	pwd.keyup(function(e){
		checkPwd(e);
	})
	//检查电话或邮箱是否正确
	function checkPhone(_e){
		if(_e){
			var type = _e.type;
		}
		
		var value = phone.val();
		if(type=="blur"){
			if(value==""){
				tip.css("display","none")
				return false;//代码执行完毕，跳出去
			}
		}
		if(value=="") {
        	tip.addClass(".error_tips");
        	tip.html("<i></i>请输入手机号或邮箱");
        	return false;
       } else if(regs.mobileReg.test(value)) {
			tip.removeClass(".error_tips");
			tip.html("");
        	return true;
        } else {
        	tip.css("display","block")
        	tip.addClass(".error_tips");
        	tip.html("<i></i>请正确输入手机号或邮箱");
        	return false;
        }
	}
	//检查密码输入是否正确
	function checkPwd(_e){
		if(_e){
			var type = _e.type
		}
		var value = pwd.val();
		if(type=="blur"){
			if(value=="") {
				tip.css("display","none")
				return false;
			}
		}
		if(value==""){
			pwd.addClass("curr");
        	tip.addClass(".error_tips");
        	tip.html("<i></i>请输入密码");
        	return false;
		}else if(regs.pwdReg.test(value)){
			pwd.removeClass("curr");
			tip.removeClass("e2");
			tip.removeClass(".error_tips");
			tip.html("");
			return true;
		} else {
			pwd.addClass("curr");
        	tip.css("display","block")
        	tip.addClass("e2");
        	tip.html("<i></i>请输入6-16位字符且不能包含空格")
			return false;
		}
	}
	
	// 产生验证码字母大写小写与数字
	function yanZheng(){
		var str="";
		for(var i=0;i<4;i++){
			var n =parseInt(Math.random()*4);
			if(n==0){
				var z = parseInt(Math.random()*26+65);
				str+= String.fromCharCode(z);
			}
			else if(n==1){
				var x = parseInt(Math.random()*26+97);
				str+= String.fromCharCode(x)
			}
			else if(n==2||n==3){
				str+= parseInt(Math.random()*10)
			}	
		}
		return str;
	}
	yzm_box.html(yanZheng());
	yzm_box.click(function(){
		yzm_box.html(yanZheng());
	})
 
	yzm.blur(function(e){
		checkYanzheng(e);
	})
	//检验验证码
	function checkYanzheng(_e){
		var value = yzm.val().toLowerCase();
		var value1 = yzm_box.html().toLowerCase();
		if(value==value1){
			tip.removeClass(".error_tips");
			tip.html("");
			return true;
		}else{
			tip.addClass(".error_tips");
			tip.html("<i></i>验证码错误")
			tip.css("display","block")
			yzm_box.html(yanZheng());
			return false;
		}
	}
	
	btn.click(function(){//点击前检车是否阅读了协议
		if(ck[0].checked){
			if(checkPhone()&&checkPwd()&&checkYanzheng()){
				setCookie("username",phone.val(),30);
				setCookie("pwd",pwd.val(),30);
				location.href="login.html"
			}
		}else {
			$(this).removeClass(".reg_submit").addClass(".reg_submit1");
			tip.addClass(".error_tips");
			tip.html("<i></i>注册前请阅读《速普商城用户协议》");
			tip.css("display","block")
		}
		return false;
	})
	
})
