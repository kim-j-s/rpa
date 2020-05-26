function inputDesign(){
	$('.inpD input').each(function(){
		if ($(this).prop('checked')) {
			$(this).closest('.inpD').addClass('checked')
		}else{
			$(this).closest('.inpD').removeClass('checked')
		}
	})
}

function naviShow(){
	var check = true;
	var gnb = $('.gnbTop');
	var gnbAll = $('.gnbAll');

	gnb.on('mouseover',function(){
		if(check){
			check = false;
			gnbAll.slideDown(300,function(){
				check = true;
			});
		}
	})

	$('.gnbWrap').on('mouseleave',function(){
		if(check){
			check = false;
			gnbAll.slideUp(300,function(){
				check = true;
			});
		}
	})
}

function openPop(){
	$('.openPop').click(function(){
		//$('body').addClass('hidden');
		var href = $(this).attr('href');
		$(href).fadeIn(100);		
		return false;	
	});
	closePop();
}

function closePop(){
	$('.btnPopClose').click(function(){
		//$('body').removeClass('hidden');
		$(this).closest('.popup').fadeOut(200);
	})
}

function calendarSet(){
	$('.datePicker').find('.inpTxt').datepicker({
		showOn: 'button',
		dateFormat: 'yy-mm-dd',
		changeMonth: true, 
		changeYear: true, 
		showButtonPanel: false,
		nextText: '다음 달',
		prevText: '이전 달',
		currentText: '오늘 날짜', 
		closeText: '닫기', 
		dayNamesMin: ['일','월', '화', '수', '목', '금', '토'], 
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	});
}

$(function(){
	openPop();
	closePop();
	naviShow();
	inputDesign();
	$('.inpD').find('input').on('change',function(){
		inputDesign();
	});
	if($('.datePicker').length > 0){calendarSet()}

});