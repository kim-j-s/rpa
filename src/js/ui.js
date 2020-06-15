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
		changeYear: false, 
		showMonthAfterYear: true,
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

function popTableSlide(){
	$(document).on('click', '.slideBtn', function(){
		if ( $(this).closest('.tableWrap').find('.tblSlide').css('display') == 'block' )
		{
			$(this).closest('.tableWrap').addClass('on').find('.tblSlide').slideUp(500);
			$(this).addClass('on');
		} else {
			$(this).closest('.tableWrap').removeClass('on').find('.tblSlide').slideDown(500);
			$(this).removeClass('on');
		}
	});
}

function botTimeLine() {
	$('.botEventState').each(function(i){
		var Start = $('.botEventState').eq(i).data('active-start');
		var Time = $('.botEventState').eq(i).data('active-time');
		calcS = Start / 1440 * 100;
		calcT = Time / 1440 * 100;
		$('.botEventState').eq(i).css('left',calcS + '%');
		$('.botEventState').eq(i).css('width',calcT + '%');
	});
}


// fileUpload
function fileUploadAdd(e) {
	$(e).closest('.inpFileList').find('.inpfile').val('');
	$(e).closest('.inpFileList').find('.inpTxt').val('');
	$(e).closest('.inpFileList').find('.inpfile').trigger('click');
}

// fileUploadListDelete
function fileUploadListDelete(e) {
	$(e).closest('.inpFileList').remove();
}

// fileUploadListAdd
function fileUploadListAdd(e) {
	var html = '' +
	' <div class="inpFileList">' +
	'	<div class="inpFileBtnEle">' +
	'		<button type="button" class="btnSelect" onclick="fileUploadAdd(this)">찾기</button>' +
	'	</div>' +
	'	<input type="file" class="inpfile">' +
	'	<input type="text" class="inpTxt" placeholder="파일을 첨부하세요" readonly>' +
	'	<button type="button" class="btn UploadListDelete" onclick="fileUploadListDelete(this)">삭제</button>' +
	'	<button type="button" class="btn UploadListAdd" onclick="fileUploadListAdd(this)">추가</button>' +
	'</div>' ;
	$(html).appendTo($(e).closest('.inpFileWrap'));
}

function inpfile(){
	$(document).on('change', '.inpfile', function(){
		g = $(this).val().split('\\').pop();
		$(this).closest('.inpFileList').find('.inpTxt').val(g);
	});
}


$(function(){
	openPop();
	closePop();
	//naviShow();
	inputDesign();
	$('.inpD').find('input').on('change',function(){
		inputDesign();
	});
	if($('.datePicker').length > 0)
	{
		calendarSet();
	}
	if($('.botEventState').length > 0)
	{
		botTimeLine();
	}

	
	popTableSlide();
	inpfile();
});







//ck Editor
/*
ck Editor 이미지 추가 기능 참조 페이지
url : https://hdady.tistory.com/entry/CKEditor-5-ImageUpload
*/
function ckEditor(){
	ClassicEditor
		.create( document.querySelector( '#editor' ), {language:"ko"})
		.then(function (editor) {
			editoro = editor;
			editor.plugins.get("FileRepository").createUploadAdapter = function (loader) {
				return new CustomUploadAdapter(loader, "/images/board/press", function (result) {
					var fileSeq = isEmpty(result[0]) ? "noimage" : result[0];
					var imageUrl = window.location.protocol + "//" + window.location.host + "/image/" + fileSeq;
					return {"default" : imageUrl};
				});
			};
		})

		.catch(function (error) {
			console.log( error );
		});


	var CustomUploadAdapter = function (loader, path, fn_resolve) {
		this.constructor = function ( loader ) {
			this.loader = loader;
			this.path = path;
			this.fn_resolve = fn_resolve;
		};
		this.upload = function () {
			return new Promise(function (resolve, reject) {
				this.xhr = ajax_file_upload({
					loader: loader,
					resolve: resolve,
					reject: reject,
					files: [loader.file],
					path: path,
					fn_progress: function (e) {
						e.lengthComputable && (loader.uploadTotal = e.total, loader.uploaded = e.loaded);
						console.log('s1');
					},
					fn_success: function (e) {
						resolve(fn_resolve && fn_resolve(e));
						console.log('s2');
					},
					fn_error: function (e) {
						reject("upload fail =>" + $(loader.file.name));
						console.log('s3');
					},
					fn_abort: reject
				});
			});
		};
		this.abort = function () {
			return this.xhr.abort && this.xhr.abort();
		}
	};


	function ajax_file_upload(p) {		
		if (!p.files || !p.loader || !p.path) return new XMLHttpRequest;		
		var formData = new FormData();
		for (var idx in p.files) {
			formData.append("uploadfile", p.files[idx]);
		}
		formData.append("path", p.path);		
		return $.ajax({
			url: '/api/common/fileupload',
			processData: false,
			contentType: false,
			data: formData,
			type: 'POST',
			onprogress: function (e) {
				p.fn_progress && p.fn_progress(e);
			},
			success: function(e){
				p.fn_success && p.fn_success(e);
			},
			error: function (e) {
				p.fn_error && p.fn_error;
			},
			abort: function (e) {
				p.fn_abort && p.fn_abort(e);
			}
		});
	}
}
