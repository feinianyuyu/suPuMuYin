/*
 * name:cookie的名称
 * value:cookie的值
 * day：保留日期
 * path：路径 默认为/
*/
function setCookie(name,value,day,path){//添加
				var cookieTxt ="";
				cookieTxt+=encodeURIComponent(name)+"="+encodeURIComponent(value);
				if(day){
					var oDate = new Date();
					oDate.setDate(oDate.getDate()+day);
					cookieTxt+="; expires="+oDate;
				}
				if(path){
					cookieTxt+="; path"+path
				}else{
					cookieTxt+="; path=/"
				}
				document.cookie = cookieTxt;
			}

function getCookie(name){//获取
				var arr =decodeURIComponent(document.cookie).split("; ");
				for(var i=0;i<arr.length;i++){
					var arr1 = arr[i].split("=");
					if(arr1[0]==name){
						return arr1[1];
					}
				}
				return "";
			}

function removeCookie(name){//删除
				setCookie(name,"",-1);
			}