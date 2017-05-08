
$(function(){

	$('ul.nav.navbar-nav li').hover(function(){
		console.log($(this).index());
		$(this).siblings('.top-active').addClass('position-' + $(this).index());
	}, function(){
		$(this).siblings('.top-active').removeClass('position-' + $(this).index());
	});


	// 切换自定义select
	$('.select').on('click','.select-face',function(e){
		e.stopPropagation();
		var s = $(this);
		var b = $(this).siblings("ul.select-options");
		var _show = function(){b.slideDown(200);s.toggleClass('active');};
        var _hide = function(){b.slideUp(200);s.removeClass("active");};
        b.is(":hidden")?_show():_hide();
        b.find('li').on('click',function(){
        	var txt = $(this).text();
        	$(this).parent('ul').siblings('.select-face').find('.select-val').text(txt);
        	_hide();
        	$('.select').children("ul.select-options").slideUp(200).removeClass("active");
        });
	});
	
	
	$(document).click(function(){
		$('.select').children("ul.select-options").slideUp(200).removeClass("active");
	});

	
	// 绑定自定义radio btn功能
	if ($('.radio-btn').length > 0) {
		$('.radio-btn').click(function() {
			$('.radio-btn[name=' + $(this).attr('name') + ']').removeClass('checked');
			$(this).addClass('checked');
			if ($(this).attr('link-input')) {
				if ($('#' + $(this).attr('link-input')).length > 0) {
					$('#' + $(this).attr('link-input')).val($(this).attr("value"));
				}
			}
		});
	}


    // 自定义checkbox
    $('body').on('click', '.btn-checkbox', function(){
    	$(this).toggleClass('checked');
    });


    // 回到顶部按钮
    $(window).scroll(function(e){
    	toggleRocket();
    });
    $(window).resize(function(e){
    	toggleRocket();
    });
    $('.btn-back-top').click(function(){
    	scrollRocket();
    });
});

function toggleRocket () {
	var top = $(window).scrollTop();
	if (top > $(window).height()) {
		$('.btn-back-top').fadeIn(300);
	} else {
		$('.btn-back-top').fadeOut(300);
	}
}

function scrollRocket () {
	var v = 50;
	var minV = 1;
	var top = $(window).scrollTop();
	var scroll = setInterval(function(){
		if (top > v) {
			if (top < 800) {
				// v -= 1;
				v *= 0.94;
				if (v < minV) {
					v = minV;
				}
			}
			top -= v;
		} else {
			top = 0;
			clearInterval(scroll);
		}
		$(window).scrollTop(top);
	}, 10);
}



// 建立一个input file的文件的url返回
function getFileURL(obj) {
	var file = obj.files[0];
	var url = null ; 
	if (window.createObjectURL!=undefined) { // basic
		url = window.createObjectURL(file) ;
	} else if (window.URL!=undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file) ;
	} else if (window.webkitURL!=undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file) ;
	}
	return url ;
}


function getInputFileSize(obj){  
    obj = $(obj)[0];
    var fileLenth = -1, objValue = obj.value;  
    alert(objValue);
    if (objValue == "") return fileLenth;  
    try {  
        //对于IE判断要上传的文件的大小  
        var fso = new ActiveXObject("Scripting.FileSystemObject"); 
        fileLenth = parseInt(fso.getFile(objValue).size);  
    } catch (e){  
        try{  
            //对于非IE获得要上传文件的大小  
            fileLenth = parseInt(obj.files[0].size);  
        }catch (e) {  
            fileLenth = -1;  
        }  
    }  
    return fileLenth;  
}  

function getInputFileName (obj) {
    obj = $(obj)[0];
    var result = '', objValue = obj.value;  
    if(objValue == "") return result;  
    try {  
        //对于IE判断要上传的文件的名字 
        var fso = new ActiveXObject("Scripting.FileSystemObject"); 
        result = fso.getFile(objValue).name;  
    } catch (e){  
        try{  
            //对于非IE获得要上传文件的名字 
            result = obj.files[0].name;
        }catch (e) {  
            result = '';  
        }  
    }  
    return result;  
}
