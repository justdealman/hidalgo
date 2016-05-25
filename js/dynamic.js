$.fn.background = function() {
	this.parent().css({
		'background': 'url("'+this.attr('src')+'") no-repeat center center',
		'background-size': 'cover'
	});
}
function slider() {
	$('.slider .temp > div').each(function() {
		var path = $(this).children('img').attr('src');
		$(this).css({
			'background': 'url("'+path+'") no-repeat center center'
		});
	})
	$('.slider .container').empty();
	$('.slider .prev, .slider .next, .slider .pagination').remove();
	$('.slider .container').html($('.slider .temp').html());
	$('.slider, .slider .container, .slider .container > div').width($('.wrapper').width());
	$('.slider').slides({
		generatePagination: true,
		generateNextPrev: true,
		container: 'container',
		effect: 'slide',
		slideSpeed: 500,
		slideEasing: 'easeInOutQuad',
		play: 10000,
		pause: 2500,
	});
}
$(function() {
	$('.img-bg').each(function() {
		$(this).background();
	});
	if ( $('.slider').length > 0 ) {
		slider();
		$('body').addClass('index');
		$('.slider').bind('swipeleft', function() {
			$('.slider .next').trigger('click');
		});
		$('.slider').bind('swiperight', function() {
			$('.slider .prev').trigger('click');
		});
	}
	$(window).resize(function() {
		slider();
	});
	$('i.minus').on('click', function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
	});
	$('i.plus').on('click', function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
	});
	$('.lk-open').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('opened') ) {
			$(this).addClass('opened');
		} else {
			$(this).removeClass('opened');
		}
		$(this).siblings('.lk-drop').stop().slideToggle(250);
	});
	$('html').on('click', function() {
		$('.lk-drop').stop().slideUp(250);
		$('.lk-open').removeClass('opened');
	});
	$('.lk-open, .lk-drop').on('click', function(e) {
		e.stopPropagation();
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('form.standart input, form.standart textarea').each(function() {
		if ( $(this).val().length > 0 ) {
			$(this).parent().addClass('complete').removeClass('focus');
		}
		$(this).focusin(function() {
			$(this).parent().addClass('focus');
		});
		$(this).focusout(function() {
			if ( $(this).val().length > 0 ) {
				$(this).parent().addClass('complete').removeClass('focus');
			}
			else {
				$(this).parent().removeClass('focus complete');
			}
		});
	});
	$('form.standart p > span').on('click', function(e) {
		e.preventDefault();
		$(this).siblings('input, textarea').focus();
	});
	$('input[type="checkbox"], input[type="radio"]').uniform();
	$('[data-open]').bind('click', function(e) {
		e.preventDefault();
		$('.lk-drop').stop().slideUp(250);
		$('.lk-open').removeClass('opened');
		var t = $('.modal[data-target="'+$(this).attr('data-open')+'"]');
		$('.fade').stop(true,true).fadeIn(500);
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( h < 0 ) {
			h = 0;
		}
		t.css({
			'top': h+'px'
		}).stop(true,true).fadeIn(500);
	});
	$('.fade, .modal .close').bind('click', function(e) {
		e.preventDefault();
		$('.fade, .modal').stop(true,true).fadeOut(500);
	});
	$('.go-top').on('click', function() {
		$('html, body').stop().animate({
			scrollTop: 0
		}, 500);
	});
	$('.slider .scroll').on('click', function() {
		$('html, body').stop().animate({
			scrollTop: $('.slider').next().offset().top
		}, 500);
	});
	$(window).on('scroll', function() {
		if ( $(document).scrollTop() > $('.panel').outerHeight()+$('header').outerHeight()+$('nav').outerHeight() ) {
			$('.go-top').show();
		} else {
			$('.go-top').hide();
		}
	});
	$(window).bind('scroll');
	if ( $('.contained-b > ul > li').length > 4 ) {
		$('.contained-b > ul').jcarousel({
			scroll: 4,
			animation: 500,
			slideEasing: 'easeInOutQuad',
			wrap: 'circular'
		});
		$('.contained-b .jcarousel-container').bind('swipeleft', function() {
			$('.contained-b .jcarousel-container .jcarousel-next').trigger('click');
		});
		$('.contained-b .jcarousel-container').bind('swiperight', function() {
			$('.contained-b .jcarousel-container .jcarousel-prev').trigger('click');
		});
	}
	$('.gallery-l .core, .articles-l .core').masonry({
		itemSelector: '.item',
		gutter: 15
	});
});