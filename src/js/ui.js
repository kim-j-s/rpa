function inputDesign(){
	$('.inpD input').each(function(){
		if ($(this).prop('checked')) {
			$(this).closest('.inpD').addClass('checked')
		}else{
			$(this).closest('.inpD').removeClass('checked')
		}
	})
}


function chkAllTxt(){
	$('.chkAllTxt').on('change', function(){
		var data = $(this).data('chkallline');
		if ($(this).prop('checked')) {
			$(this).closest('table').find('[data-chkline="'+ data +'"]').prop('checked',true);
			$(this).closest('table').find('[data-chkline="'+ data +'"]').closest('.inpD.check').addClass('checked');
		} else {
			$(this).closest('table').find('[data-chkline="'+ data +'"]').prop('checked',false);
			$(this).closest('table').find('[data-chkline="'+ data +'"]').closest('.inpD.check').removeClass('checked');
		}
	});
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
		var data = $(this).data('popopen');
		console.log(data);
		$(href).fadeIn(100);	
		$('[data-pop="'+ data +'"]').fadeIn(100);
		return false;
	});
	closePop();
}

function openWindows(){
	$('.openWindows').click(function(){
		var data = $(this).data('winopen');
		var win = window.open(data, "PopupWin", "width=1080,height=700");
	});
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

function botActiveChkbox() {
	$('.botActiveChkbox').on('change', function(){
		if ($('.botActiveChkbox').prop('checked')) {
			$(this).closest('.schGroup').find('.inpWrap2').addClass('on');
			$(this).closest('.schGroup').find('.inpTxt').attr('disabled',false);
			$(this).closest('.schGroup').find('.btns').attr('disabled',false);
		} else {
			$(this).closest('.schGroup').find('.inpWrap2').removeClass('on');
			$(this).closest('.schGroup').find('.inpTxt').attr('disabled',true).val('');
			$(this).closest('.schGroup').find('.btns').attr('disabled',true);
		}
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
	'		<button type="button" class="btns ty8 etc" onclick="fileUploadAdd(this)">파일찾기</button>' +
	'	</div>' +
	'	<input type="file" class="inpfile">' +
	'	<input type="text" class="inpTxt" placeholder="파일을 첨부하세요" readonly>' +
	'	<div class="inpFileBtns">' +
	'		<button type="button" class="btns ty15" onclick="fileUploadListDelete(this)">삭제</button>' +
	'		<button type="button" class="btns ty14" onclick="fileUploadListAdd(this)">추가</button>' +
	'	</div>' +
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
	openWindows();
	closePop();
	naviShow();
	inputDesign();
	chkAllTxt();
	$('.inpD').find('input').on('change', function(){
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
	if($('.botEventState').length > 0)
	{
		botActiveChkbox();
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






// Spinner
//fgnass.github.com/spin.js#v1.2.7
!function(e,t,n){function o(e,n){var r=t.createElement(e||"div"),i;for(i in n)r[i]=n[i];return r}function u(e){for(var t=1,n=arguments.length;t<n;t++)e.appendChild(arguments[t]);return e}function f(e,t,n,r){var o=["opacity",t,~~(e*100),n,r].join("-"),u=.01+n/r*100,f=Math.max(1-(1-e)/t*(100-u),e),l=s.substring(0,s.indexOf("Animation")).toLowerCase(),c=l&&"-"+l+"-"||"";return i[o]||(a.insertRule("@"+c+"keyframes "+o+"{"+"0%{opacity:"+f+"}"+u+"%{opacity:"+e+"}"+(u+.01)+"%{opacity:1}"+(u+t)%100+"%{opacity:"+e+"}"+"100%{opacity:"+f+"}"+"}",a.cssRules.length),i[o]=1),o}function l(e,t){var i=e.style,s,o;if(i[t]!==n)return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(o=0;o<r.length;o++){s=r[o]+t;if(i[s]!==n)return s}}function c(e,t){for(var n in t)e.style[l(e,n)||n]=t[n];return e}function h(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)e[i]===n&&(e[i]=r[i])}return e}function p(e){var t={x:e.offsetLeft,y:e.offsetTop};while(e=e.offsetParent)t.x+=e.offsetLeft,t.y+=e.offsetTop;return t}var r=["webkit","Moz","ms","O"],i={},s,a=function(){var e=o("style",{type:"text/css"});return u(t.getElementsByTagName("head")[0],e),e.sheet||e.styleSheet}(),d={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"},v=function m(e){if(!this.spin)return new m(e);this.opts=h(e||{},m.defaults,d)};v.defaults={},h(v.prototype,{spin:function(e){this.stop();var t=this,n=t.opts,r=t.el=c(o(0,{className:n.className}),{position:n.position,width:0,zIndex:n.zIndex}),i=n.radius+n.length+n.width,u,a;e&&(e.insertBefore(r,e.firstChild||null),a=p(e),u=p(r),c(r,{left:(n.left=="auto"?a.x-u.x+(e.offsetWidth>>1):parseInt(n.left,10)+i)+"px",top:(n.top=="auto"?a.y-u.y+(e.offsetHeight>>1):parseInt(n.top,10)+i)+"px"})),r.setAttribute("aria-role","progressbar"),t.lines(r,t.opts);if(!s){var f=0,l=n.fps,h=l/n.speed,d=(1-n.opacity)/(h*n.trail/100),v=h/n.lines;(function m(){f++;for(var e=n.lines;e;e--){var i=Math.max(1-(f+e*v)%h*d,n.opacity);t.opacity(r,n.lines-e,i,n)}t.timeout=t.el&&setTimeout(m,~~(1e3/l))})()}return t},stop:function(){var e=this.el;return e&&(clearTimeout(this.timeout),e.parentNode&&e.parentNode.removeChild(e),this.el=n),this},lines:function(e,t){function i(e,r){return c(o(),{position:"absolute",width:t.length+t.width+"px",height:t.width+"px",background:e,boxShadow:r,transformOrigin:"left",transform:"rotate("+~~(360/t.lines*n+t.rotate)+"deg) translate("+t.radius+"px"+",0)",borderRadius:(t.corners*t.width>>1)+"px"})}var n=0,r;for(;n<t.lines;n++)r=c(o(),{position:"absolute",top:1+~(t.width/2)+"px",transform:t.hwaccel?"translate3d(0,0,0)":"",opacity:t.opacity,animation:s&&f(t.opacity,t.trail,n,t.lines)+" "+1/t.speed+"s linear infinite"}),t.shadow&&u(r,c(i("#000","0 0 4px #000"),{top:"2px"})),u(e,u(r,i(t.color,"0 0 1px rgba(0,0,0,.1)")));return e},opacity:function(e,t,n){t<e.childNodes.length&&(e.childNodes[t].style.opacity=n)}}),function(){function e(e,t){return o("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',t)}var t=c(o("group"),{behavior:"url(#default#VML)"});!l(t,"transform")&&t.adj?(a.addRule(".spin-vml","behavior:url(#default#VML)"),v.prototype.lines=function(t,n){function s(){return c(e("group",{coordsize:i+" "+i,coordorigin:-r+" "+ -r}),{width:i,height:i})}function l(t,i,o){u(a,u(c(s(),{rotation:360/n.lines*t+"deg",left:~~i}),u(c(e("roundrect",{arcsize:n.corners}),{width:r,height:n.width,left:n.radius,top:-n.width>>1,filter:o}),e("fill",{color:n.color,opacity:n.opacity}),e("stroke",{opacity:0}))))}var r=n.length+n.width,i=2*r,o=-(n.width+n.length)*2+"px",a=c(s(),{position:"absolute",top:o,left:o}),f;if(n.shadow)for(f=1;f<=n.lines;f++)l(f,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(f=1;f<=n.lines;f++)l(f);return u(t,a)},v.prototype.opacity=function(e,t,n,r){var i=e.firstChild;r=r.shadow&&r.lines||0,i&&t+r<i.childNodes.length&&(i=i.childNodes[t+r],i=i&&i.firstChild,i=i&&i.firstChild,i&&(i.opacity=n))}):s=l(t,"animation")}(),typeof define=="function"&&define.amd?define(function(){return v}):e.Spinner=v}(window,document);

// Spinner 
function Spin() {
	var Dimmed = '<div class="dimmed on loaderdimmed"></div>';
	var Loader = '<div id="loader"></div>';
	$(Dimmed).insertBefore('footer');
	$(Loader).insertBefore('footer');
	var opts = {
	  lines: 10,
	  length: 8,
	  width: 4,
	  radius: 14,
	  corners: 1,
	  rotate: 0,
	  color: '#fff',
	  speed: 1,
	  trail: 60,
	  shadow: false,
	  hwaccel: false,
	  className: 'spinner',
	  zIndex: 2e9,
	  position:'fixed'
	};
	new Spinner(opts).spin(document.getElementById('loader'));
}

function SpinDestory() {
	$('#loader').remove();
	$('.loaderdimmed').remove();
}