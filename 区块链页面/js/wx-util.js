
    (function($,document,window,undefined){
	if(!$.myUtil){
		$.myUtil = {};
	};
	
	
	/***
	 * 参数说明：
	 * type ： 消息确认框类型 （confirm : 含有确认和取消按钮，为空则只有确认按钮） | 
	 * title : 标题 | msg : 消息内容 | confirm :  点击确认后执行函数 | cancel : 点击取消后执行函数
	 */
	$.myUtil.confirm = function(type,title,msg,bg,confirm,cancel){
		var options = $.extend({'msg':'是否确认','close':function(oThis){
			oThis.empty().remove();
			$(".zhezhao-bg").empty().remove();
		}},{'type':type,'title':title,'msg':msg,'confirm':confirm,'cancel':cancel});
		if($(".mybox").length >0){
			return false;
		}
		if(bg){
			$('<div class="zhezhao-bg" style="display:block"/>').appendTo('body');
		}			
		var $box = $('<div class="div-msg mybox"/>').appendTo('body');
		var str = '';
		if(options.type && options.title){
			str += '<p class="p-title">'+options.title+'</p>';
		}
		str += ' <p class="p-text">'+options.msg+'</p>';
		str +='<div>';
		if(options.type){			
			str += '<a href="javascript:void(0);" id="alert-cancel" class="alert-button" style="border-right:1px solid #e8e8e8">取消</a>';
			str += '<a href="javascript:void(0);" id="alert-confirm" class="alert-button" >确认</a>';
		}else{
			str += '<a  id="alert-sure" class="alert-button" style="width:100%">确定</a>';
		}		
		str +='</div>';	
		$box.html(str);
		// 绑定事件
		$box.off().on('click',function(event){
			if(event.target.id == 'alert-sure'){
				(typeof(confirm) == 'function') ?  confirm.call(this) : options.close($(this));
				options.close($(this));
			}
			if(event.target.id == 'alert-confirm'){
				(typeof(confirm) == 'function') ?  confirm.call(this) : options.close($(this));
				options.close($(this));
			}
			if(event.target.id == 'alert-cancel'){
				(typeof(cancel) == 'function') ?  cancel.call(this) : options.close($(this));
				options.close($(this));
			}
		});			
	};
	/***
	 * 参数说明 ： msg ： 消息内容 | timeout : 消失时间 (毫秒) | isLoad : 是否含有加载动画
	 */
	$.myUtil.alert = function(msg,timeout,isload){
		var options = $.extend({'msg':'您输入的消息有误','timeout':2000,'loading':false},{'msg':msg,'timeout':timeout,'loading':isload});
		if($(".mybox").length >0){
			return false;
		}
		var $bg = $('<div class="zhezhao-bg sw-bg" style="display:block;background-color: #fff;opacity: 0;filter: alpha(opacity=0);"/>').appendTo('body');
		var $box = $('<div class="box2 mybox"/>').appendTo('body');
		var str = '<div class="window">';		
		if(options.loading){
			str += '		<div class="tips">';		
			str += '			<div class="tips1" style="text-align: center;">';
			str += '			<img src="'+$.myUtil.path()+'/images/loading.gif" width="27">';
		}else{
			str += '		<div class="tips2">';		
			str += '			<div class="tips1">';
		}
		str += ' 				<p>'+options.msg+'</p>';
		str += '			</div>';
		str += '		</div>';
		str += '	</div>';
		$box.html(str);
        
		window.setTimeout(function(){		
			$bg.empty().remove();
			$box.empty().remove();
		},options.timeout);		
	};
	
})(jQuery,document,window);
