function json2url(json){
	json.t=Math.random();
	var arr=[];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}
function ajax(json){
	//考虑默认值
	json=json || {};
	if(!json.url){
		alert('死去吧');
		return;	
	}
	json.type=json.type || 'get';
	json.time=json.time || 300000;
	json.data=json.data || {};
	
	
	var timer=null;
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	switch(json.type.toLowerCase()){
		case 'get':
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
	
			oAjax.send();
			break;
		case 'post':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
	}
	
	//网络加载
	json.fnLoading && json.fnLoading();
	
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			json.complete && json.complete();
			
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				json.success && json.success(oAjax.responseText);	
			}else{
				json.error && json.error(oAjax.status);
			}
			clearTimeout(timer);	
		}
	};
	
	//网络超时
	timer=setTimeout(function(){
		alert('您的网络不给力');
		oAjax.onreadystatechange=null;
	},json.time);
}








