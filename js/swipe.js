$(document).ready(function(){

	$('#gallery').bind('swipeleft', swipeLeft);
	$('#gallery').bind('swipeleftdown', swipeLeft);
	$('#gallery').bind('swipeleftup', swipeLeft);

	$('#gallery').bind('swiperight', swipeRight);
	$('#gallery').bind('swiperightdown', swipeRight);
	$('#gallery').bind('swiperightup', swipeRight);

});

var slides = $('.slide').length - 1;

var slidesLength = (slides * -640);

function swipeLeft() {
	if ($('#slides').position().left > slidesLength) {
		$('#slides').animate({
	        left: '-=640',
	        }, 200, function() {
	        	$('#slides').stop(true, true);
	    });
	}
};

function swipeRight() {
	if ($('#slides').position().left < 0) {
		$('#slides').animate({
	        left: '+=640',
	        }, 300, function() {
	        	$('#slides').stop(true, true);
	    });
	}
};