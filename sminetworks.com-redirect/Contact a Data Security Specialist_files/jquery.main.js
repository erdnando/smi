// page init
jQuery(function(){
	initMobileNav();
	initSlider();
	initFixedOnScroll();
	initFixedScrollBlock();
	initLightbox();
	initSameHeight();
	initAccordion();
	initDropDownClasses();
	textChanging();
	initCustomForms();
	initAnchors();
	initAddClasses();
	initSticky();
	initTabs();
	initMapTabs();
	initFilter();
	initParamsScroll();
	trackDblclickAdTrigger();
});

// Tracker - double click
function trackDblclickAd(cur) {
    var dis     = jQuery(cur),
        dblVal  = dis.attr("data-dblclick"),
        axel    = Math.random() + "",
        a       = axel * 10000000000000;
    if(dblVal != "" && typeof(dblVal) != "undefined") {
        dblVal  = dblVal.trim(),
        jQuery("body").append('<iframe src="https://6451230.fls.doubleclick.net/activityi;src=6451230;'+dblVal+';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord='+a+'?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
    }
}
function trackDblclickAdTrigger() {
    jQuery("[data-dblclick]").click(function(){
        trackDblclickAd(this);
    });
}

//Get URL parameter value
function getParameterByName(name) {
   name        = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
   var regex   = new RegExp("[\\?&]" + name + "=([^&#]*)"),
       results = regex.exec(location.search);
   return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function initParamsScroll() {
	var stMM = getParameterByName("mm") || "";
	if(stMM != "") { jQuery(".mm-v").val(stMM).trigger("change"); }
	jQuery(window).load(function() {
	    var stTar = getParameterByName("scrollto") || "";
	    if(stTar != "") {
	        var scrollTo = jQuery("#"+stTar).offset().top, doc = jQuery('html, body'), diff = Math.abs(doc.scrollTop() - scrollTo);
	        if(diff > 5) { doc.animate({ scrollTop: scrollTo }, 600); }
	    }
	})
}
function initFilter() {
	$(".select-form select.mm-v").change(function() {
		var disVal = $(this).val();
		$("#major-section .scale-section .box").hide().filter("."+disVal).show();
	}).trigger("change");
}

function initMapTabs(){
	function switchClass() {
		var curActive =jQuery('.map-image svg .circle.active').data('id');
		jQuery('.map .tab').removeClass('active');
		jQuery('#' + curActive).addClass('active');
		initSameHeight();
	}

	switchClass();

	jQuery('.map-image svg .area').on('mouseenter touchstart', function(){
		var dataArea = jQuery(this).data('region');
		jQuery('.map-image svg .circle').attr('class', 'circle');
		jQuery('.map-image svg .circle').each(function(){
			var that = jQuery(this);
			if (that.data('id') == dataArea) {
				that.attr('class', 'circle active');
			}
		});
		switchClass();
	});
}

// solution animation
function initSticky(){
	$(window).load(function(){
		var stickyNav = {
			nav: $(".sticky-nav"),
			sticking: '',
			action: function(){
				if ($(window).width() >= 768) {
					if (stickyNav.sticking != 'large') {
						stickyNav.nav.sticky({ topSpacing: 0, zIndex: 11, center:true, className:"hey", getWidthFrom: '#main', responsiveWidth: true });
						stickyNav.sticking = 'large';
					}
				}else{
					if (stickyNav.sticking != 'small') {
						stickyNav.nav.unstick();
						stickyNav.sticking = 'small';
					}
				};
			}
		};
		stickyNav.action();

		var stickyTab = {
			nav: $(".tabset-sticky"),
			sticking: '',
			action: function(){
				if ($(window).width() >= 768) {
					if (stickyTab.sticking != 'large') {
						stickyTab.nav.sticky({ topSpacing: 0, zIndex: 9, center:true, className:"hey", getWidthFrom: '#main', responsiveWidth: true });
						stickyTab.sticking = 'large';
					}
				}else{
					if (stickyTab.sticking != 'small') {
						stickyTab.nav.unstick();
						stickyTab.sticking = 'small';
					}
				};
			}
		};
		stickyTab.action();


		$(window).resize(function(){
			stickyNav.action();
			stickyTab.action();
		});
    });
}

// solution animation
function textChanging(){
	jQuery('.solution-section').each(function() {
		var holder = jQuery(this),
		textNumbers = holder.find('.count-number');

		textNumbers.each(function(index) {
			var element = jQuery(this),
			startValue = element.data('start'),
			endValue = element.data('end'),
			duration = element.data('duration');

			new textAnimator(element, {startValue: startValue, endValue: endValue, animDuration: duration});
		});
	});
}

function textAnimator(context, opts){
	var startTime = null,
	hasAnimated = false,
	parent = '.box',
	finishClass = 'end-anim',
	win = jQuery(window);

	this.animate = function(){
		var now = Date.now(),
		percent = (now - startTime) / opts.animDuration,
		newValue = parseInt(opts.startValue + (opts.endValue - opts.startValue) * percent),
		frame = this.getFrame();

		if(now - startTime <= opts.animDuration){
			context.text(newValue);
			frame(this.animate.bind(this));
		} else {
			context.text(opts.endValue);
		}
	}

	this.getFrame = function(){
		return  window.requestAnimationFrame 		||
		window.webkitRequestAnimationFrame  ||
		window.mozRequestAnimationFrame 	||
		window.oRequestAnimationFrame 		||
		window.msRequestAnimationFrame 		||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	}

	this.scrollHandler = function(){
		if(this.inView() && !hasAnimated) {
			startTime = Date.now();
			hasAnimated = true;
			win.off('scroll', this.scrollHandler);
			this.animate();

			//add class to parent when animation complete
			setTimeout(function(){
				context.closest(parent).addClass(finishClass);
			}, opts.animDuration);
		}
	}

	this.inView = function(){
		var top = context[0].getBoundingClientRect().top,
		winHeight = win.height();

		return (top + context.height() <= winHeight) && top >= 0
	}

	this.init = function(){
		context.text(opts.startValue);
		win.on('load scroll', this.scrollHandler.bind(this));
	}

	this.init();
}



// mobile menu init
function initMobileNav() {
	jQuery('body').mobileNav({
		hideOnClickOutside: true,
		menuActiveClass: 'nav-active',
		menuOpener: '.nav-opener',
		menuDrop: '.nav-drop'
	});
	jQuery('body').mobileNav({
		hideOnClickOutside: true,
		menuActiveClass: 'global-nav-active',
		menuOpener: '.global-opener',
		menuDrop: '.global-drop'
	});
}

// add classes if item has dropdown
function initDropDownClasses() {
	lib.each(lib.queryElementsBySelector('#nav li'), function(index, item) {
		var drop = lib.queryElementsBySelector('.drop-down', item);
		var link = item.getElementsByTagName('a')[0];
		if(drop.length) {
			lib.addClass(item, 'has-drop-down');
			if(link) lib.addClass(link, 'has-drop-down-a');
		}
	});
	lib.each(lib.queryElementsBySelector('.drop-box li'), function(index, item) {
		var drop = lib.queryElementsBySelector('.drop-inner', item);
		var link = item.getElementsByTagName('a')[0];
		if(drop.length) {
			lib.addClass(item, 'has-drop-down');
			if(link) lib.addClass(link, 'has-drop-down-a');
		}
	});
	lib.each(lib.queryElementsBySelector('.add-nav ul li'), function(index, item) {
		var drop = lib.queryElementsBySelector('.drop', item);
		var link = item.getElementsByTagName('a')[0];
		if(drop.length) {
			lib.addClass(item, 'has-drop-down');
			if(link) lib.addClass(link, 'has-drop-down-a');
		}
	});
}

// accordion menu init
function initAccordion() {
	jQuery('.accordion').slideAccordion({
		addClassBeforeAnimation: true,
		opener: 'a.accordion-opener',
		slider: 'div.slide',
		animSpeed: 300
	});
	jQuery('.accordion').slideAccordion({
		opener: 'a.accordion-opener',
		slider: '.drop-down',
		animSpeed: 300
	});
	jQuery('.drop-box').slideAccordion({
		addClassBeforeAnimation: true,
		opener: 'a.accordion-opener-inner',
		slider: '.drop-inner',
		animSpeed: 300
	});
	jQuery('.accordion').slideAccordion({
		addClassBeforeAnimation: true,
		opener: 'a.accordion-opener',
		slider: '.drop',
		animSpeed: 300
	});

	$('.nav-drop').on('click', '.accordion-opener', function(){
		$('.nav-drop').animate({scrollTop: $(this).offset().top},300);
	});
}

// slideshowGallery init
function initSlider() {
	jQuery('.slide-gallery').slick({
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000
	});

	jQuery('.regular-gallery').slick({
		infinite: true,
		speed: 500,
		fade: true,
		autoplay: true,
		autoplaySpeed: 4000,
		cssEase: 'linear',
		responsive: [
		{
			breakpoint: 1024,
			settings: {
				arrows: false,
				dots: true
			}
		}
		]
	});

	jQuery('.three-boxes-gallery').slick({
		dots: true,
		infinite: true,
		fade: false,
		slidesToShow: 3,
		slidesToScroll: 3,
		autoplaySpeed: 4000,
		responsive: [
		{
			breakpoint: 1024,
			settings: {
				arrows: false,
				slidesToShow: 2,
				slidesToScroll: 2,
				dots: true
			}
		},
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true
			}
		}
		]
	});

	jQuery('.logo-gallery').slick({
		infinite: true,
		fade: false,
		slidesToShow: 6,
		slidesToScroll: 6,
		autoplaySpeed: 4000,
		responsive: [
		{
			breakpoint: 1024,
			settings: {
				arrows: false,
				slidesToShow: 4,
				slidesToScroll: 4,
				dots: true
			}
		},
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				slidesToShow: 2,
				slidesToScroll: 2,
				dots: true
			}
		}
		]
	});
}

// initialize custom form elements
function initCustomForms() {
	jcf.setOptions('Select', {
		wrapNative: false
	});
	jcf.replaceAll();
}


// fixed block init
function initFixedOnScroll() {
	var scroll = jQuery(document).scrollTop(),
	header = jQuery('#header'),
	headerHeight = jQuery('#header').outerHeight();

	jQuery(window).scroll(function () {
		var bodyScroll = jQuery('body').css('overflow');
		var scrolled = jQuery(document).scrollTop();
		if (scrolled > headerHeight) {
			header.addClass('off-canvas');
			jQuery('body').addClass('no-menu');

		} else if (scrolled <= 1) {
			header.removeClass('off-canvas');
			jQuery('body').removeClass('no-menu');
		}

		if ((scrolled > scroll) && (bodyScroll !== "hidden")) {
			header.removeClass('fixed');
		} else if ((scrolled < scroll) && (bodyScroll !== "hidden")) {
			header.addClass('fixed');

		}
		scroll = jQuery(document).scrollTop();
	});
}

// initialize fixed blocks on scroll
function initFixedScrollBlock() {
	var hero = jQuery('.hero .btn-group');
	if (hero.length) {
		var heroTop = parseInt(hero.offset().top) - 120;
		$(window).scroll(function(){
			var fixedClass = 'fixed-position';
			if (heroTop + parseInt(hero.outerHeight()) < $(window).scrollTop()) {
				if(!hero.hasClass(fixedClass)){
					hero.addClass(fixedClass);
					console.log('r');
				}
			}else {
				if(hero.hasClass(fixedClass)){
					hero.removeClass(fixedClass);
					console.log('r');
				};
			}
		});
	}
}

// initialize smooth anchor links
function initAnchors() {
	new SmoothScroll({
		anchorLinks: '#header .big-btn'
	});
	new SmoothScroll({
		anchorLinks: '.sticky-nav a',
		extraOffset: 68,
		activeClasses: 'parent'
	});

	//tabs smooth scroll
	var links = jQuery('.tabset a'),
		winWidth = jQuery(window).width(),
		iScrollPos = 0,
		page = jQuery('html,body'),
		offset,
		iCurScrollPos,
		headerHeight = jQuery('#header').outerHeight(),
		indent =  links.outerHeight();

	jQuery(window).on('resize', function() {
		winWidth = jQuery(window).width();
		indent =  links.outerHeight();
		headerHeight = jQuery('#header').outerHeight();
    });

	offset = indent;

	function scrollPosition() {
		$(window).scroll(function () {
			iCurScrollPos = $(this).scrollTop();
		});
	}
	scrollPosition();

	links.on('click', function() {
       	var target = jQuery(this.hash);
       	page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
	       page.stop();
	   	});
     	if (location.hostname == this.hostname) {
       		if (target.length !=0) {
       			if(winWidth >= 768) {
					if(iCurScrollPos <= target.offset().top - offset) {
	       				page.animate({
		                  	scrollTop: target.offset().top - indent
		             	}, 500);
					} else {
						page.animate({
		                  	scrollTop: target.offset().top - indent - headerHeight
		             	}, 500);
					}
       			}
           }
     	}
    });
}


// content tabs init
function initTabs() {
	jQuery('ul.tabset').tabset({
		tabLinks: 'a',
		addToParent: true,
		animSpeed: 0 ,
		autoHeight: true
	});
}

// fancybox modal popup init
function initLightbox() {
	$(document).foundation();
	var $modal = $('#search-popup');
	$modal.on('open.zf.reveal', function(event){
		if (screen.width > 1024) {
			setTimeout(function () {
				$(event.target).find('input[type="search"]').focus();
			}, 700);
		}else{
			$(event.target).find('input[type="search"]').focus();
		}
		$('body').css({ 'margin-right': getScrollBarWidth() });
	});
	$modal.on('closed.zf.reveal', function(event){
		$('body').css({ 'margin-right': 0 });
	});

	jQuery('a.open-lightbox').fancybox({
		helpers: {
			overlay: {
				css: {
					background: 'rgba(31, 37, 53, 0.65)'
				}
			}
		},
		afterLoad: function(current, previous) {
			// handle custom close button in inline modal
			if(current.href.indexOf('#') === 0) {
				jQuery(current.href).find('a.close-lightbox').off('click.fb').on('click.fb', function(e){
					e.preventDefault();
					jQuery.fancybox.close();
				});
			}
		}
	});

	jQuery('a[rel*="lightbox"]').fancybox({
		loop: false,
		helpers: {
			overlay: {
				css: {
					background: 'rgba(31, 37, 53, 0.65)'
				}
			}
		},
		afterLoad: function(current, previous) {
			// handle custom close button in inline modal
			if(current.href.indexOf('#') === 0) {
				jQuery(current.href).find('a.close').off('click.fb').on('click.fb', function(e){
					e.preventDefault();
					jQuery.fancybox.close();
				});
			}
		},
		wrapCSS: 'lightbox-team-popup',
		nextEffect: 'none',
		prevEffect: 'none'
	});

	jQuery('a.lightbox-video').fancybox({
		loop: false,
		helpers: {
			overlay: {
				css: {
					background: 'rgba(0, 0, 0, 0.65)'
				}
			}
		},
		afterLoad: function(current, previous) {
			// handle custom close button in inline modal
			if(current.href.indexOf('#') === 0) {
				jQuery(current.href).find('a.close').off('click.fb').on('click.fb', function(e){
					e.preventDefault();
					jQuery.fancybox.close();
				});
			}
		}
	});


}

function getScrollBarWidth () {
	var inner = document.createElement('p');
	inner.style.width = "100%";
	inner.style.height = "200px";

	var outer = document.createElement('div');
	outer.style.position = "absolute";
	outer.style.top = "0px";
	outer.style.left = "0px";
	outer.style.visibility = "hidden";
	outer.style.width = "200px";
	outer.style.height = "150px";
	outer.style.overflow = "hidden";
	outer.appendChild (inner);

	document.body.appendChild (outer);
	var w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';
	var w2 = inner.offsetWidth;
	if (w1 == w2) w2 = outer.clientWidth;

	document.body.removeChild (outer);

	return (w1 - w2);
};


// align blocks height
function initSameHeight() {
	jQuery('.slider').sameHeight({
		elements: '.box',
		flexible: true
	});
	jQuery('.information ').sameHeight({
		elements: '.box h2',
		multiLine: true,
		flexible: true
	});
	jQuery('.card-holder').sameHeight({
		elements: '.card',
		multiLine: true,
		flexible: true
	});
	jQuery('.news-container, .three-boxes-gallery').sameHeight({
		elements: '.item-news .text',
		multiLine: true,
		flexible: true
	});
	jQuery('.logo-gallery').sameHeight({
		elements: '.slide',
		multiLine: true,
		flexible: true
	});
}


// add class on click
function initAddClasses() {
	lib.each(lib.queryElementsBySelector('.languages-box .open-languages'), function(index, item) {
		new AddClass({
			item: item,
			addToParent: 'languages-box',
			classAdd: 'active-languages'
		});
	});
}



/*
 * Simple Mobile Navigation
 */
 ;(function($) {
 	function MobileNav(options) {
 		this.options = $.extend({
 			container: null,
 			hideOnClickOutside: false,
 			menuActiveClass: 'nav-active',
 			menuOpener: '.nav-opener',
 			menuDrop: '.nav-drop',
 			toggleEvent: 'click',
 			outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
 		}, options);
 		this.initStructure();
 		this.attachEvents();
 	}
 	MobileNav.prototype = {
 		initStructure: function() {
 			this.page = $('html');
 			this.container = $(this.options.container);
 			this.opener = this.container.find(this.options.menuOpener);
 			this.drop = this.container.find(this.options.menuDrop);
 		},
 		attachEvents: function() {
 			var self = this;

 			if(activateResizeHandler) {
 				activateResizeHandler();
 				activateResizeHandler = null;
 			}

 			this.outsideClickHandler = function(e) {
 				if(self.isOpened()) {
 					var target = $(e.target);
 					if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
 						self.hide();
 					}
 				}
 			};

 			this.openerClickHandler = function(e) {
 				e.preventDefault();
 				self.toggle();
 			};

 			this.opener.on(this.options.toggleEvent, this.openerClickHandler);
 		},
 		isOpened: function() {
 			return this.container.hasClass(this.options.menuActiveClass);
 		},
 		show: function() {
 			this.container.addClass(this.options.menuActiveClass);
 			if(this.options.hideOnClickOutside) {
 				this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
 			}
 		},
 		hide: function() {
 			this.container.removeClass(this.options.menuActiveClass);
 			if(this.options.hideOnClickOutside) {
 				this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
 			}
 		},
 		toggle: function() {
 			if(this.isOpened()) {
 				this.hide();
 			} else {
 				this.show();
 			}
 		},
 		destroy: function() {
 			this.container.removeClass(this.options.menuActiveClass);
 			this.opener.off(this.options.toggleEvent, this.clickHandler);
 			this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
 		}
 	};

 	var activateResizeHandler = function() {
 		var win = $(window),
 		doc = $('html'),
 		resizeClass = 'resize-active',
 		flag, timer;
 		var removeClassHandler = function() {
 			flag = false;
 			doc.removeClass(resizeClass);
 		};
 		var resizeHandler = function() {
 			if(!flag) {
 				flag = true;
 				doc.addClass(resizeClass);
 			}
 			clearTimeout(timer);
 			timer = setTimeout(removeClassHandler, 500);
 		};
 		win.on('resize orientationchange', resizeHandler);
 	};

 	$.fn.mobileNav = function(options) {
 		return this.each(function() {
 			var params = $.extend({}, options, {container: this}),
 			instance = new MobileNav(params);
 			$.data(this, 'MobileNav', instance);
 		});
 	};
 }(jQuery));


/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

  */
  /* global window, document, define, jQuery, setInterval, clearInterval */
  (function(factory) {
  	'use strict';
  	if (typeof define === 'function' && define.amd) {
  		define(['jquery'], factory);
  	} else if (typeof exports !== 'undefined') {
  		module.exports = factory(require('jquery'));
  	} else {
  		factory(jQuery);
  	}

  }(function($) {
  	'use strict';
  	var Slick = window.Slick || {};

  	Slick = (function() {

  		var instanceUid = 0;

  		function Slick(element, settings) {

  			var _ = this, dataSettings;

  			_.defaults = {
  				accessibility: true,
  				adaptiveHeight: false,
  				appendArrows: $(element),
  				appendDots: $(element),
  				arrows: true,
  				asNavFor: null,
  				prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
  				nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
  				autoplay: false,
  				autoplaySpeed: 3000,
  				centerMode: false,
  				centerPadding: '50px',
  				cssEase: 'ease',
  				customPaging: function(slider, i) {
  					return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
  				},
  				dots: false,
  				dotsClass: 'slick-dots',
  				draggable: true,
  				easing: 'linear',
  				edgeFriction: 0.35,
  				fade: false,
  				focusOnSelect: false,
  				infinite: true,
  				initialSlide: 0,
  				lazyLoad: 'ondemand',
  				mobileFirst: false,
  				pauseOnHover: true,
  				pauseOnFocus: true,
  				pauseOnDotsHover: false,
  				respondTo: 'window',
  				responsive: null,
  				rows: 1,
  				rtl: false,
  				slide: '',
  				slidesPerRow: 1,
  				slidesToShow: 1,
  				slidesToScroll: 1,
  				speed: 500,
  				swipe: true,
  				swipeToSlide: false,
  				touchMove: true,
  				touchThreshold: 5,
  				useCSS: true,
  				useTransform: true,
  				variableWidth: false,
  				vertical: false,
  				verticalSwiping: false,
  				waitForAnimate: true,
  				zIndex: 1000
  			};

  			_.initials = {
  				animating: false,
  				dragging: false,
  				autoPlayTimer: null,
  				currentDirection: 0,
  				currentLeft: null,
  				currentSlide: 0,
  				direction: 1,
  				$dots: null,
  				listWidth: null,
  				listHeight: null,
  				loadIndex: 0,
  				$nextArrow: null,
  				$prevArrow: null,
  				slideCount: null,
  				slideWidth: null,
  				$slideTrack: null,
  				$slides: null,
  				sliding: false,
  				slideOffset: 0,
  				swipeLeft: null,
  				$list: null,
  				touchObject: {},
  				transformsEnabled: false,
  				unslicked: false
  			};

  			$.extend(_, _.initials);

  			_.activeBreakpoint = null;
  			_.animType = null;
  			_.animProp = null;
  			_.breakpoints = [];
  			_.breakpointSettings = [];
  			_.cssTransitions = false;
  			_.focussed = false;
  			_.interrupted = false;
  			_.hidden = 'hidden';
  			_.paused = true;
  			_.positionProp = null;
  			_.respondTo = null;
  			_.rowCount = 1;
  			_.shouldClick = true;
  			_.$slider = $(element);
  			_.$slidesCache = null;
  			_.transformType = null;
  			_.transitionType = null;
  			_.visibilityChange = 'visibilitychange';
  			_.windowWidth = 0;
  			_.windowTimer = null;

  			dataSettings = $(element).data('slick') || {};

  			_.options = $.extend({}, _.defaults, settings, dataSettings);

  			_.currentSlide = _.options.initialSlide;

  			_.originalSettings = _.options;

  			if (typeof document.mozHidden !== 'undefined') {
  				_.hidden = 'mozHidden';
  				_.visibilityChange = 'mozvisibilitychange';
  			} else if (typeof document.webkitHidden !== 'undefined') {
  				_.hidden = 'webkitHidden';
  				_.visibilityChange = 'webkitvisibilitychange';
  			}

  			_.autoPlay = $.proxy(_.autoPlay, _);
  			_.autoPlayClear = $.proxy(_.autoPlayClear, _);
  			_.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
  			_.changeSlide = $.proxy(_.changeSlide, _);
  			_.clickHandler = $.proxy(_.clickHandler, _);
  			_.selectHandler = $.proxy(_.selectHandler, _);
  			_.setPosition = $.proxy(_.setPosition, _);
  			_.swipeHandler = $.proxy(_.swipeHandler, _);
  			_.dragHandler = $.proxy(_.dragHandler, _);
  			_.keyHandler = $.proxy(_.keyHandler, _);

  			_.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

Slick.prototype.activateADA = function() {
	var _ = this;

	_.$slideTrack.find('.slick-active').attr({
		'aria-hidden': 'false'
	}).find('a, input, button, select').attr({
		'tabindex': '0'
	});

};

Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

	var _ = this;

	if (typeof(index) === 'boolean') {
		addBefore = index;
		index = null;
	} else if (index < 0 || (index >= _.slideCount)) {
		return false;
	}

	_.unload();

	if (typeof(index) === 'number') {
		if (index === 0 && _.$slides.length === 0) {
			$(markup).appendTo(_.$slideTrack);
		} else if (addBefore) {
			$(markup).insertBefore(_.$slides.eq(index));
		} else {
			$(markup).insertAfter(_.$slides.eq(index));
		}
	} else {
		if (addBefore === true) {
			$(markup).prependTo(_.$slideTrack);
		} else {
			$(markup).appendTo(_.$slideTrack);
		}
	}

	_.$slides = _.$slideTrack.children(this.options.slide);

	_.$slideTrack.children(this.options.slide).detach();

	_.$slideTrack.append(_.$slides);

	_.$slides.each(function(index, element) {
		$(element).attr('data-slick-index', index);
	});

	_.$slidesCache = _.$slides;

	_.reinit();

};

Slick.prototype.animateHeight = function() {
	var _ = this;
	if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
		var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
		_.$list.animate({
			height: targetHeight
		}, _.options.speed);
	}
};

Slick.prototype.animateSlide = function(targetLeft, callback) {

	var animProps = {},
	_ = this;

	_.animateHeight();

	if (_.options.rtl === true && _.options.vertical === false) {
		targetLeft = -targetLeft;
	}
	if (_.transformsEnabled === false) {
		if (_.options.vertical === false) {
			_.$slideTrack.animate({
				left: targetLeft
			}, _.options.speed, _.options.easing, callback);
		} else {
			_.$slideTrack.animate({
				top: targetLeft
			}, _.options.speed, _.options.easing, callback);
		}

	} else {

		if (_.cssTransitions === false) {
			if (_.options.rtl === true) {
				_.currentLeft = -(_.currentLeft);
			}
			$({
				animStart: _.currentLeft
			}).animate({
				animStart: targetLeft
			}, {
				duration: _.options.speed,
				easing: _.options.easing,
				step: function(now) {
					now = Math.ceil(now);
					if (_.options.vertical === false) {
						animProps[_.animType] = 'translate(' +
						now + 'px, 0px)';
						_.$slideTrack.css(animProps);
					} else {
						animProps[_.animType] = 'translate(0px,' +
						now + 'px)';
						_.$slideTrack.css(animProps);
					}
				},
				complete: function() {
					if (callback) {
						callback.call();
					}
				}
			});

		} else {

			_.applyTransition();
			targetLeft = Math.ceil(targetLeft);

			if (_.options.vertical === false) {
				animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
			} else {
				animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
			}
			_.$slideTrack.css(animProps);

			if (callback) {
				setTimeout(function() {

					_.disableTransition();

					callback.call();
				}, _.options.speed);
			}

		}

	}

};

Slick.prototype.getNavTarget = function() {

	var _ = this,
	asNavFor = _.options.asNavFor;

	if ( asNavFor && asNavFor !== null ) {
		asNavFor = $(asNavFor).not(_.$slider);
	}

	return asNavFor;

};

Slick.prototype.asNavFor = function(index) {

	var _ = this,
	asNavFor = _.getNavTarget();

	if ( asNavFor !== null && typeof asNavFor === 'object' ) {
		asNavFor.each(function() {
			var target = $(this).slick('getSlick');
			if(!target.unslicked) {
				target.slideHandler(index, true);
			}
		});
	}

};

Slick.prototype.applyTransition = function(slide) {

	var _ = this,
	transition = {};

	if (_.options.fade === false) {
		transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
	} else {
		transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
	}

	if (_.options.fade === false) {
		_.$slideTrack.css(transition);
	} else {
		_.$slides.eq(slide).css(transition);
	}

};

Slick.prototype.autoPlay = function() {

	var _ = this;

	_.autoPlayClear();

	if ( _.slideCount > _.options.slidesToShow ) {
		_.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
	}

};

Slick.prototype.autoPlayClear = function() {

	var _ = this;

	if (_.autoPlayTimer) {
		clearInterval(_.autoPlayTimer);
	}

};

Slick.prototype.autoPlayIterator = function() {

	var _ = this,
	slideTo = _.currentSlide + _.options.slidesToScroll;

	if ( !_.paused && !_.interrupted && !_.focussed ) {

		if ( _.options.infinite === false ) {

			if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
				_.direction = 0;
			}

			else if ( _.direction === 0 ) {

				slideTo = _.currentSlide - _.options.slidesToScroll;

				if ( _.currentSlide - 1 === 0 ) {
					_.direction = 1;
				}

			}

		}

		_.slideHandler( slideTo );

	}

};

Slick.prototype.buildArrows = function() {

	var _ = this;

	if (_.options.arrows === true ) {

		_.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
		_.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

		if( _.slideCount > _.options.slidesToShow ) {

			_.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
			_.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

			if (_.htmlExpr.test(_.options.prevArrow)) {
				_.$prevArrow.prependTo(_.options.appendArrows);
			}

			if (_.htmlExpr.test(_.options.nextArrow)) {
				_.$nextArrow.appendTo(_.options.appendArrows);
			}

			if (_.options.infinite !== true) {
				_.$prevArrow
				.addClass('slick-disabled')
				.attr('aria-disabled', 'true');
			}

		} else {

			_.$prevArrow.add( _.$nextArrow )

			.addClass('slick-hidden')
			.attr({
				'aria-disabled': 'true',
				'tabindex': '-1'
			});

		}

	}

};

Slick.prototype.buildDots = function() {

	var _ = this,
	i, dot;

	if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

		_.$slider.addClass('slick-dotted');

		dot = $('<ul />').addClass(_.options.dotsClass);

		for (i = 0; i <= _.getDotCount(); i += 1) {
			dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
		}

		_.$dots = dot.appendTo(_.options.appendDots);

		_.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');

	}

};

Slick.prototype.buildOut = function() {

	var _ = this;

	_.$slides =
	_.$slider
	.children( _.options.slide + ':not(.slick-cloned)')
	.addClass('slick-slide');

	_.slideCount = _.$slides.length;

	_.$slides.each(function(index, element) {
		$(element)
		.attr('data-slick-index', index)
		.data('originalStyling', $(element).attr('style') || '');
	});

	_.$slider.addClass('slick-slider');

	_.$slideTrack = (_.slideCount === 0) ?
	$('<div class="slick-track"/>').appendTo(_.$slider) :
	_.$slides.wrapAll('<div class="slick-track"/>').parent();

	_.$list = _.$slideTrack.wrap(
		'<div aria-live="polite" class="slick-list"/>').parent();
	_.$slideTrack.css('opacity', 0);

	if (_.options.centerMode === true || _.options.swipeToSlide === true) {
		_.options.slidesToScroll = 1;
	}

	$('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

	_.setupInfinite();

	_.buildArrows();

	_.buildDots();

	_.updateDots();


	_.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

	if (_.options.draggable === true) {
		_.$list.addClass('draggable');
	}

};

Slick.prototype.buildRows = function() {

	var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

	newSlides = document.createDocumentFragment();
	originalSlides = _.$slider.children();

	if(_.options.rows > 1) {

		slidesPerSection = _.options.slidesPerRow * _.options.rows;
		numOfSlides = Math.ceil(
			originalSlides.length / slidesPerSection
			);

		for(a = 0; a < numOfSlides; a++){
			var slide = document.createElement('div');
			for(b = 0; b < _.options.rows; b++) {
				var row = document.createElement('div');
				for(c = 0; c < _.options.slidesPerRow; c++) {
					var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
					if (originalSlides.get(target)) {
						row.appendChild(originalSlides.get(target));
					}
				}
				slide.appendChild(row);
			}
			newSlides.appendChild(slide);
		}

		_.$slider.empty().append(newSlides);
		_.$slider.children().children().children()
		.css({
			'width':(100 / _.options.slidesPerRow) + '%',
			'display': 'inline-block'
		});

	}

};

Slick.prototype.checkResponsive = function(initial, forceUpdate) {

	var _ = this,
	breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
	var sliderWidth = _.$slider.width();
	var windowWidth = window.innerWidth || $(window).width();

	if (_.respondTo === 'window') {
		respondToWidth = windowWidth;
	} else if (_.respondTo === 'slider') {
		respondToWidth = sliderWidth;
	} else if (_.respondTo === 'min') {
		respondToWidth = Math.min(windowWidth, sliderWidth);
	}

	if ( _.options.responsive &&
		_.options.responsive.length &&
		_.options.responsive !== null) {

		targetBreakpoint = null;

	for (breakpoint in _.breakpoints) {
		if (_.breakpoints.hasOwnProperty(breakpoint)) {
			if (_.originalSettings.mobileFirst === false) {
				if (respondToWidth < _.breakpoints[breakpoint]) {
					targetBreakpoint = _.breakpoints[breakpoint];
				}
			} else {
				if (respondToWidth > _.breakpoints[breakpoint]) {
					targetBreakpoint = _.breakpoints[breakpoint];
				}
			}
		}
	}

	if (targetBreakpoint !== null) {
		if (_.activeBreakpoint !== null) {
			if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
				_.activeBreakpoint =
				targetBreakpoint;
				if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
					_.unslick(targetBreakpoint);
				} else {
					_.options = $.extend({}, _.originalSettings,
						_.breakpointSettings[
						targetBreakpoint]);
					if (initial === true) {
						_.currentSlide = _.options.initialSlide;
					}
					_.refresh(initial);
				}
				triggerBreakpoint = targetBreakpoint;
			}
		} else {
			_.activeBreakpoint = targetBreakpoint;
			if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
				_.unslick(targetBreakpoint);
			} else {
				_.options = $.extend({}, _.originalSettings,
					_.breakpointSettings[
					targetBreakpoint]);
				if (initial === true) {
					_.currentSlide = _.options.initialSlide;
				}
				_.refresh(initial);
			}
			triggerBreakpoint = targetBreakpoint;
		}
	} else {
		if (_.activeBreakpoint !== null) {
			_.activeBreakpoint = null;
			_.options = _.originalSettings;
			if (initial === true) {
				_.currentSlide = _.options.initialSlide;
			}
			_.refresh(initial);
			triggerBreakpoint = targetBreakpoint;
		}
	}

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
            	_.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

    	var _ = this,
    	$target = $(event.currentTarget),
    	indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
        	event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
        	$target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

        	case 'previous':
        	slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
        	if (_.slideCount > _.options.slidesToShow) {
        		_.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
        	}
        	break;

        	case 'next':
        	slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
        	if (_.slideCount > _.options.slidesToShow) {
        		_.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
        	}
        	break;

        	case 'index':
        	var index = event.data.index === 0 ? 0 :
        	event.data.index || $target.index() * _.options.slidesToScroll;

        	_.slideHandler(_.checkNavigable(index), false, dontAnimate);
        	$target.children().trigger('focus');
        	break;

        	default:
        	return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

    	var _ = this,
    	navigables, prevNavigable;

    	navigables = _.getNavigableIndexes();
    	prevNavigable = 0;
    	if (index > navigables[navigables.length - 1]) {
    		index = navigables[navigables.length - 1];
    	} else {
    		for (var n in navigables) {
    			if (index < navigables[n]) {
    				index = prevNavigable;
    				break;
    			}
    			prevNavigable = navigables[n];
    		}
    	}

    	return index;
    };

    Slick.prototype.cleanUpEvents = function() {

    	var _ = this;

    	if (_.options.dots && _.$dots !== null) {

    		$('li', _.$dots)
    		.off('click.slick', _.changeSlide)
    		.off('mouseenter.slick', $.proxy(_.interrupt, _, true))
    		.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    	}

    	_.$slider.off('focus.slick blur.slick');

    	if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
    		_.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
    		_.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
    	}

    	_.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
    	_.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
    	_.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
    	_.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

    	_.$list.off('click.slick', _.clickHandler);

    	$(document).off(_.visibilityChange, _.visibility);

    	_.cleanUpSlideEvents();

    	if (_.options.accessibility === true) {
    		_.$list.off('keydown.slick', _.keyHandler);
    	}

    	if (_.options.focusOnSelect === true) {
    		$(_.$slideTrack).children().off('click.slick', _.selectHandler);
    	}

    	$(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

    	$(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

    	$('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

    	$(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
    	$(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

    	var _ = this;

    	_.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
    	_.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

    	var _ = this, originalSlides;

    	if(_.options.rows > 1) {
    		originalSlides = _.$slides.children().children();
    		originalSlides.removeAttr('style');
    		_.$slider.empty().append(originalSlides);
    	}

    };

    Slick.prototype.clickHandler = function(event) {

    	var _ = this;

    	if (_.shouldClick === false) {
    		event.stopImmediatePropagation();
    		event.stopPropagation();
    		event.preventDefault();
    	}

    };

    Slick.prototype.destroy = function(refresh) {

    	var _ = this;

    	_.autoPlayClear();

    	_.touchObject = {};

    	_.cleanUpEvents();

    	$('.slick-cloned', _.$slider).detach();

    	if (_.$dots) {
    		_.$dots.remove();
    	}


    	if ( _.$prevArrow && _.$prevArrow.length ) {

    		_.$prevArrow
    		.removeClass('slick-disabled slick-arrow slick-hidden')
    		.removeAttr('aria-hidden aria-disabled tabindex')
    		.css('display','');

    		if ( _.htmlExpr.test( _.options.prevArrow )) {
    			_.$prevArrow.remove();
    		}
    	}

    	if ( _.$nextArrow && _.$nextArrow.length ) {

    		_.$nextArrow
    		.removeClass('slick-disabled slick-arrow slick-hidden')
    		.removeAttr('aria-hidden aria-disabled tabindex')
    		.css('display','');

    		if ( _.htmlExpr.test( _.options.nextArrow )) {
    			_.$nextArrow.remove();
    		}

    	}


    	if (_.$slides) {

    		_.$slides
    		.removeClass('slick-slide slick-active slick-center slick-visible slick-current')
    		.removeAttr('aria-hidden')
    		.removeAttr('data-slick-index')
    		.each(function(){
    			$(this).attr('style', $(this).data('originalStyling'));
    		});

    		_.$slideTrack.children(this.options.slide).detach();

    		_.$slideTrack.detach();

    		_.$list.detach();

    		_.$slider.append(_.$slides);
    	}

    	_.cleanUpRows();

    	_.$slider.removeClass('slick-slider');
    	_.$slider.removeClass('slick-initialized');
    	_.$slider.removeClass('slick-dotted');

    	_.unslicked = true;

    	if(!refresh) {
    		_.$slider.trigger('destroy', [_]);
    	}

    };

    Slick.prototype.disableTransition = function(slide) {

    	var _ = this,
    	transition = {};

    	transition[_.transitionType] = '';

    	if (_.options.fade === false) {
    		_.$slideTrack.css(transition);
    	} else {
    		_.$slides.eq(slide).css(transition);
    	}

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

    	var _ = this;

    	if (_.cssTransitions === false) {

    		_.$slides.eq(slideIndex).css({
    			zIndex: _.options.zIndex
    		});

    		_.$slides.eq(slideIndex).animate({
    			opacity: 1
    		}, _.options.speed, _.options.easing, callback);

    	} else {

    		_.applyTransition(slideIndex);

    		_.$slides.eq(slideIndex).css({
    			opacity: 1,
    			zIndex: _.options.zIndex
    		});

    		if (callback) {
    			setTimeout(function() {

    				_.disableTransition(slideIndex);

    				callback.call();
    			}, _.options.speed);
    		}

    	}

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

    	var _ = this;

    	if (_.cssTransitions === false) {

    		_.$slides.eq(slideIndex).animate({
    			opacity: 0,
    			zIndex: _.options.zIndex - 2
    		}, _.options.speed, _.options.easing);

    	} else {

    		_.applyTransition(slideIndex);

    		_.$slides.eq(slideIndex).css({
    			opacity: 0,
    			zIndex: _.options.zIndex - 2
    		});

    	}

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

    	var _ = this;

    	if (filter !== null) {

    		_.$slidesCache = _.$slides;

    		_.unload();

    		_.$slideTrack.children(this.options.slide).detach();

    		_.$slidesCache.filter(filter).appendTo(_.$slideTrack);

    		_.reinit();

    	}

    };

    Slick.prototype.focusHandler = function() {

    	var _ = this;

    	_.$slider
    	.off('focus.slick blur.slick')
    	.on('focus.slick blur.slick',
    		'*:not(.slick-arrow)', function(event) {

    			event.stopImmediatePropagation();
    			var $sf = $(this);

    			setTimeout(function() {

    				if( _.options.pauseOnFocus ) {
    					_.focussed = $sf.is(':focus');
    					_.autoPlay();
    				}

    			}, 0);

    		});
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

    	var _ = this;
    	return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

    	var _ = this;

    	var breakPoint = 0;
    	var counter = 0;
    	var pagerQty = 0;

    	if (_.options.infinite === true) {
    		while (breakPoint < _.slideCount) {
    			++pagerQty;
    			breakPoint = counter + _.options.slidesToScroll;
    			counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
    		}
    	} else if (_.options.centerMode === true) {
    		pagerQty = _.slideCount;
    	} else if(!_.options.asNavFor) {
    		pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
    	}else {
    		while (breakPoint < _.slideCount) {
    			++pagerQty;
    			breakPoint = counter + _.options.slidesToScroll;
    			counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
    		}
    	}

    	return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

    	var _ = this,
    	targetLeft,
    	verticalHeight,
    	verticalOffset = 0,
    	targetSlide;

    	_.slideOffset = 0;
    	verticalHeight = _.$slides.first().outerHeight(true);

    	if (_.options.infinite === true) {
    		if (_.slideCount > _.options.slidesToShow) {
    			_.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
    			verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
    		}
    		if (_.slideCount % _.options.slidesToScroll !== 0) {
    			if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
    				if (slideIndex > _.slideCount) {
    					_.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
    					verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
    				} else {
    					_.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
    					verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
    				}
    			}
    		}
    	} else {
    		if (slideIndex + _.options.slidesToShow > _.slideCount) {
    			_.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
    			verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
    		}
    	}

    	if (_.slideCount <= _.options.slidesToShow) {
    		_.slideOffset = 0;
    		verticalOffset = 0;
    	}

    	if (_.options.centerMode === true && _.options.infinite === true) {
    		_.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
    	} else if (_.options.centerMode === true) {
    		_.slideOffset = 0;
    		_.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
    	}

    	if (_.options.vertical === false) {
    		targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
    	} else {
    		targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
    	}

    	if (_.options.variableWidth === true) {

    		if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
    			targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
    		} else {
    			targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
    		}

    		if (_.options.rtl === true) {
    			if (targetSlide[0]) {
    				targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
    			} else {
    				targetLeft =  0;
    			}
    		} else {
    			targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
    		}

    		if (_.options.centerMode === true) {
    			if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
    				targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
    			} else {
    				targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
    			}

    			if (_.options.rtl === true) {
    				if (targetSlide[0]) {
    					targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
    				} else {
    					targetLeft =  0;
    				}
    			} else {
    				targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
    			}

    			targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
    		}
    	}

    	return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

    	var _ = this;

    	return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

    	var _ = this,
    	breakPoint = 0,
    	counter = 0,
    	indexes = [],
    	max;

    	if (_.options.infinite === false) {
    		max = _.slideCount;
    	} else {
    		breakPoint = _.options.slidesToScroll * -1;
    		counter = _.options.slidesToScroll * -1;
    		max = _.slideCount * 2;
    	}

    	while (breakPoint < max) {
    		indexes.push(breakPoint);
    		breakPoint = counter + _.options.slidesToScroll;
    		counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
    	}

    	return indexes;

    };

    Slick.prototype.getSlick = function() {

    	return this;

    };

    Slick.prototype.getSlideCount = function() {

    	var _ = this,
    	slidesTraversed, swipedSlide, centerOffset;

    	centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

    	if (_.options.swipeToSlide === true) {
    		_.$slideTrack.find('.slick-slide').each(function(index, slide) {
    			if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
    				swipedSlide = slide;
    				return false;
    			}
    		});

    		slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

    		return slidesTraversed;

    	} else {
    		return _.options.slidesToScroll;
    	}

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

    	var _ = this;

    	_.changeSlide({
    		data: {
    			message: 'index',
    			index: parseInt(slide)
    		}
    	}, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

    	var _ = this;

    	if (!$(_.$slider).hasClass('slick-initialized')) {

    		$(_.$slider).addClass('slick-initialized');

    		_.buildRows();
    		_.buildOut();
    		_.setProps();
    		_.startLoad();
    		_.loadSlider();
    		_.initializeEvents();
    		_.updateArrows();
    		_.updateDots();
    		_.checkResponsive(true);
    		_.focusHandler();

    	}

    	if (creation) {
    		_.$slider.trigger('init', [_]);
    	}

    	if (_.options.accessibility === true) {
    		_.initADA();
    	}

    	if ( _.options.autoplay ) {

    		_.paused = false;
    		_.autoPlay();

    	}

    };

    Slick.prototype.initADA = function() {
    	var _ = this;
    	_.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
    		'aria-hidden': 'true',
    		'tabindex': '-1'
    	}).find('a, input, button, select').attr({
    		'tabindex': '-1'
    	});

    	_.$slideTrack.attr('role', 'listbox');

    	_.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
    		$(this).attr({
    			'role': 'option',
    			'aria-describedby': 'slick-slide' + _.instanceUid + i + ''
    		});
    	});

    	if (_.$dots !== null) {
    		_.$dots.attr('role', 'tablist').find('li').each(function(i) {
    			$(this).attr({
    				'role': 'presentation',
    				'aria-selected': 'false',
    				'aria-controls': 'navigation' + _.instanceUid + i + '',
    				'id': 'slick-slide' + _.instanceUid + i + ''
    			});
    		})
    		.first().attr('aria-selected', 'true').end()
    		.find('button').attr('role', 'button').end()
    		.closest('div').attr('role', 'toolbar');
    	}
    	_.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

    	var _ = this;

    	if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
    		_.$prevArrow
    		.off('click.slick')
    		.on('click.slick', {
    			message: 'previous'
    		}, _.changeSlide);
    		_.$nextArrow
    		.off('click.slick')
    		.on('click.slick', {
    			message: 'next'
    		}, _.changeSlide);
    	}

    };

    Slick.prototype.initDotEvents = function() {

    	var _ = this;

    	if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
    		$('li', _.$dots).on('click.slick', {
    			message: 'index'
    		}, _.changeSlide);
    	}

    	if ( _.options.dots === true && _.options.pauseOnDotsHover === true ) {

    		$('li', _.$dots)
    		.on('mouseenter.slick', $.proxy(_.interrupt, _, true))
    		.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

    	}

    };

    Slick.prototype.initSlideEvents = function() {

    	var _ = this;

    	if ( _.options.pauseOnHover ) {

    		_.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
    		_.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

    	}

    };

    Slick.prototype.initializeEvents = function() {

    	var _ = this;

    	_.initArrowEvents();

    	_.initDotEvents();
    	_.initSlideEvents();

    	_.$list.on('touchstart.slick mousedown.slick', {
    		action: 'start'
    	}, _.swipeHandler);
    	_.$list.on('touchmove.slick mousemove.slick', {
    		action: 'move'
    	}, _.swipeHandler);
    	_.$list.on('touchend.slick mouseup.slick', {
    		action: 'end'
    	}, _.swipeHandler);
    	_.$list.on('touchcancel.slick mouseleave.slick', {
    		action: 'end'
    	}, _.swipeHandler);

    	_.$list.on('click.slick', _.clickHandler);

    	$(document).on(_.visibilityChange, $.proxy(_.visibility, _));

    	if (_.options.accessibility === true) {
    		_.$list.on('keydown.slick', _.keyHandler);
    	}

    	if (_.options.focusOnSelect === true) {
    		$(_.$slideTrack).children().on('click.slick', _.selectHandler);
    	}

    	$(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

    	$(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

    	$('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

    	$(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
    	$(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.initUI = function() {

    	var _ = this;

    	if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

    		_.$prevArrow.show();
    		_.$nextArrow.show();

    	}

    	if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

    		_.$dots.show();

    	}

    };

    Slick.prototype.keyHandler = function(event) {

    	var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
         if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
         	if (event.keyCode === 37 && _.options.accessibility === true) {
         		_.changeSlide({
         			data: {
         				message: _.options.rtl === true ? 'next' :  'previous'
         			}
         		});
         	} else if (event.keyCode === 39 && _.options.accessibility === true) {
         		_.changeSlide({
         			data: {
         				message: _.options.rtl === true ? 'previous' : 'next'
         			}
         		});
         	}
         }

     };

     Slick.prototype.lazyLoad = function() {

     	var _ = this,
     	loadRange, cloneRange, rangeStart, rangeEnd;

     	function loadImages(imagesScope) {

     		$('img[data-lazy]', imagesScope).each(function() {

     			var image = $(this),
     			imageSource = $(this).attr('data-lazy'),
     			imageToLoad = document.createElement('img');

     			imageToLoad.onload = function() {

     				image
     				.animate({ opacity: 0 }, 100, function() {
     					image
     					.attr('src', imageSource)
     					.animate({ opacity: 1 }, 200, function() {
     						image
     						.removeAttr('data-lazy')
     						.removeClass('slick-loading');
     					});
     					_.$slider.trigger('lazyLoaded', [_, image, imageSource]);
     				});

     			};

     			imageToLoad.onerror = function() {

     				image
     				.removeAttr( 'data-lazy' )
     				.removeClass( 'slick-loading' )
     				.addClass( 'slick-lazyload-error' );

     				_.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

     			};

     			imageToLoad.src = imageSource;

     		});

     	}

     	if (_.options.centerMode === true) {
     		if (_.options.infinite === true) {
     			rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
     			rangeEnd = rangeStart + _.options.slidesToShow + 2;
     		} else {
     			rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
     			rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
     		}
     	} else {
     		rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
     		rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
     		if (_.options.fade === true) {
     			if (rangeStart > 0) rangeStart--;
     			if (rangeEnd <= _.slideCount) rangeEnd++;
     		}
     	}

     	loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
     	loadImages(loadRange);

     	if (_.slideCount <= _.options.slidesToShow) {
     		cloneRange = _.$slider.find('.slick-slide');
     		loadImages(cloneRange);
     	} else
     	if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
     		cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
     		loadImages(cloneRange);
     	} else if (_.currentSlide === 0) {
     		cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
     		loadImages(cloneRange);
     	}

     };

     Slick.prototype.loadSlider = function() {

     	var _ = this;

     	_.setPosition();

     	_.$slideTrack.css({
     		opacity: 1
     	});

     	_.$slider.removeClass('slick-loading');

     	_.initUI();

     	if (_.options.lazyLoad === 'progressive') {
     		_.progressiveLazyLoad();
     	}

     };

     Slick.prototype.next = Slick.prototype.slickNext = function() {

     	var _ = this;

     	_.changeSlide({
     		data: {
     			message: 'next'
     		}
     	});

     };

     Slick.prototype.orientationChange = function() {

     	var _ = this;

     	_.checkResponsive();
     	_.setPosition();

     };

     Slick.prototype.pause = Slick.prototype.slickPause = function() {

     	var _ = this;

     	_.autoPlayClear();
     	_.paused = true;

     };

     Slick.prototype.play = Slick.prototype.slickPlay = function() {

     	var _ = this;

     	_.autoPlay();
     	_.options.autoplay = true;
     	_.paused = false;
     	_.focussed = false;
     	_.interrupted = false;

     };

     Slick.prototype.postSlide = function(index) {

     	var _ = this;

     	if( !_.unslicked ) {

     		_.$slider.trigger('afterChange', [_, index]);

     		_.animating = false;

     		_.setPosition();

     		_.swipeLeft = null;

     		if ( _.options.autoplay ) {
     			_.autoPlay();
     		}

     		if (_.options.accessibility === true) {
     			_.initADA();
     		}

     	}

     };

     Slick.prototype.prev = Slick.prototype.slickPrev = function() {

     	var _ = this;

     	_.changeSlide({
     		data: {
     			message: 'previous'
     		}
     	});

     };

     Slick.prototype.preventDefault = function(event) {

     	event.preventDefault();

     };

     Slick.prototype.progressiveLazyLoad = function( tryCount ) {

     	tryCount = tryCount || 1;

     	var _ = this,
     	$imgsToLoad = $( 'img[data-lazy]', _.$slider ),
     	image,
     	imageSource,
     	imageToLoad;

     	if ( $imgsToLoad.length ) {

     		image = $imgsToLoad.first();
     		imageSource = image.attr('data-lazy');
     		imageToLoad = document.createElement('img');

     		imageToLoad.onload = function() {

     			image
     			.attr( 'src', imageSource )
     			.removeAttr('data-lazy')
     			.removeClass('slick-loading');

     			if ( _.options.adaptiveHeight === true ) {
     				_.setPosition();
     			}

     			_.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
     			_.progressiveLazyLoad();

     		};

     		imageToLoad.onerror = function() {

     			if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                     setTimeout( function() {
                     	_.progressiveLazyLoad( tryCount + 1 );
                     }, 500 );

                 } else {

                 	image
                 	.removeAttr( 'data-lazy' )
                 	.removeClass( 'slick-loading' )
                 	.addClass( 'slick-lazyload-error' );

                 	_.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                 	_.progressiveLazyLoad();

                 }

             };

             imageToLoad.src = imageSource;

         } else {

         	_.$slider.trigger('allImagesLoaded', [ _ ]);

         }

     };

     Slick.prototype.refresh = function( initializing ) {

     	var _ = this, currentSlide, lastVisibleIndex;

     	lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
        	_.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
        	_.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

        	_.changeSlide({
        		data: {
        			message: 'index',
        			index: currentSlide
        		}
        	}, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

    	var _ = this, breakpoint, currentBreakpoint, l,
    	responsiveSettings = _.options.responsive || null;

    	if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

    		_.respondTo = _.options.respondTo || 'window';

    		for ( breakpoint in responsiveSettings ) {

    			l = _.breakpoints.length-1;
    			currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

    			if (responsiveSettings.hasOwnProperty(breakpoint)) {

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                    	if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                    		_.breakpoints.splice(l,1);
                    	}
                    	l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
            	return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

    	var _ = this;

    	_.$slides =
    	_.$slideTrack
    	.children(_.options.slide)
    	.addClass('slick-slide');

    	_.slideCount = _.$slides.length;

    	if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
    		_.currentSlide = _.currentSlide - _.options.slidesToScroll;
    	}

    	if (_.slideCount <= _.options.slidesToShow) {
    		_.currentSlide = 0;
    	}

    	_.registerBreakpoints();

    	_.setProps();
    	_.setupInfinite();
    	_.buildArrows();
    	_.updateArrows();
    	_.initArrowEvents();
    	_.buildDots();
    	_.updateDots();
    	_.initDotEvents();
    	_.cleanUpSlideEvents();
    	_.initSlideEvents();

    	_.checkResponsive(false, true);

    	if (_.options.focusOnSelect === true) {
    		$(_.$slideTrack).children().on('click.slick', _.selectHandler);
    	}

    	_.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    	_.setPosition();
    	_.focusHandler();

    	_.paused = !_.options.autoplay;
    	_.autoPlay();

    	_.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

    	var _ = this;

    	if ($(window).width() !== _.windowWidth) {
    		clearTimeout(_.windowDelay);
    		_.windowDelay = window.setTimeout(function() {
    			_.windowWidth = $(window).width();
    			_.checkResponsive();
    			if( !_.unslicked ) { _.setPosition(); }
    		}, 50);
    	}
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

    	var _ = this;

    	if (typeof(index) === 'boolean') {
    		removeBefore = index;
    		index = removeBefore === true ? 0 : _.slideCount - 1;
    	} else {
    		index = removeBefore === true ? --index : index;
    	}

    	if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
    		return false;
    	}

    	_.unload();

    	if (removeAll === true) {
    		_.$slideTrack.children().remove();
    	} else {
    		_.$slideTrack.children(this.options.slide).eq(index).remove();
    	}

    	_.$slides = _.$slideTrack.children(this.options.slide);

    	_.$slideTrack.children(this.options.slide).detach();

    	_.$slideTrack.append(_.$slides);

    	_.$slidesCache = _.$slides;

    	_.reinit();

    };

    Slick.prototype.setCSS = function(position) {

    	var _ = this,
    	positionProps = {},
    	x, y;

    	if (_.options.rtl === true) {
    		position = -position;
    	}
    	x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
    	y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

    	positionProps[_.positionProp] = position;

    	if (_.transformsEnabled === false) {
    		_.$slideTrack.css(positionProps);
    	} else {
    		positionProps = {};
    		if (_.cssTransitions === false) {
    			positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
    			_.$slideTrack.css(positionProps);
    		} else {
    			positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
    			_.$slideTrack.css(positionProps);
    		}
    	}

    };

    Slick.prototype.setDimensions = function() {

    	var _ = this;

    	if (_.options.vertical === false) {
    		if (_.options.centerMode === true) {
    			_.$list.css({
    				padding: ('0px ' + _.options.centerPadding)
    			});
    		}
    	} else {
    		_.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
    		if (_.options.centerMode === true) {
    			_.$list.css({
    				padding: (_.options.centerPadding + ' 0px')
    			});
    		}
    	}

    	_.listWidth = _.$list.width();
    	_.listHeight = _.$list.height();


    	if (_.options.vertical === false && _.options.variableWidth === false) {
    		_.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
    		_.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

    	} else if (_.options.variableWidth === true) {
    		_.$slideTrack.width(5000 * _.slideCount);
    	} else {
    		_.slideWidth = Math.ceil(_.listWidth);
    		_.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
    	}

    	var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
    	if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

    	var _ = this,
    	targetLeft;

    	_.$slides.each(function(index, element) {
    		targetLeft = (_.slideWidth * index) * -1;
    		if (_.options.rtl === true) {
    			$(element).css({
    				position: 'relative',
    				right: targetLeft,
    				top: 0,
    				zIndex: _.options.zIndex - 2,
    				opacity: 0
    			});
    		} else {
    			$(element).css({
    				position: 'relative',
    				left: targetLeft,
    				top: 0,
    				zIndex: _.options.zIndex - 2,
    				opacity: 0
    			});
    		}
    	});

    	_.$slides.eq(_.currentSlide).css({
    		zIndex: _.options.zIndex - 1,
    		opacity: 1
    	});

    };

    Slick.prototype.setHeight = function() {

    	var _ = this;

    	if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
    		var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
    		_.$list.css('height', targetHeight);
    	}

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

         var _ = this, l, item, option, value, refresh = false, type;

         if( $.type( arguments[0] ) === 'object' ) {

         	option =  arguments[0];
         	refresh = arguments[1];
         	type = 'multiple';

         } else if ( $.type( arguments[0] ) === 'string' ) {

         	option =  arguments[0];
         	value = arguments[1];
         	refresh = arguments[2];

         	if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

         		type = 'responsive';

         	} else if ( typeof arguments[1] !== 'undefined' ) {

         		type = 'single';

         	}

         }

         if ( type === 'single' ) {

         	_.options[option] = value;


         } else if ( type === 'multiple' ) {

         	$.each( option , function( opt, val ) {

         		_.options[opt] = val;

         	});


         } else if ( type === 'responsive' ) {

         	for ( item in value ) {

         		if( $.type( _.options.responsive ) !== 'array' ) {

         			_.options.responsive = [ value[item] ];

         		} else {

         			l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                    	if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                    		_.options.responsive.splice(l,1);

                    	}

                    	l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

        	_.unload();
        	_.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

    	var _ = this;

    	_.setDimensions();

    	_.setHeight();

    	if (_.options.fade === false) {
    		_.setCSS(_.getLeft(_.currentSlide));
    	} else {
    		_.setFade();
    	}

    	_.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

    	var _ = this,
    	bodyStyle = document.body.style;

    	_.positionProp = _.options.vertical === true ? 'top' : 'left';

    	if (_.positionProp === 'top') {
    		_.$slider.addClass('slick-vertical');
    	} else {
    		_.$slider.removeClass('slick-vertical');
    	}

    	if (bodyStyle.WebkitTransition !== undefined ||
    		bodyStyle.MozTransition !== undefined ||
    		bodyStyle.msTransition !== undefined) {
    		if (_.options.useCSS === true) {
    			_.cssTransitions = true;
    		}
    	}

    	if ( _.options.fade ) {
    		if ( typeof _.options.zIndex === 'number' ) {
    			if( _.options.zIndex < 3 ) {
    				_.options.zIndex = 3;
    			}
    		} else {
    			_.options.zIndex = _.defaults.zIndex;
    		}
    	}

    	if (bodyStyle.OTransform !== undefined) {
    		_.animType = 'OTransform';
    		_.transformType = '-o-transform';
    		_.transitionType = 'OTransition';
    		if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    	}
    	if (bodyStyle.MozTransform !== undefined) {
    		_.animType = 'MozTransform';
    		_.transformType = '-moz-transform';
    		_.transitionType = 'MozTransition';
    		if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
    	}
    	if (bodyStyle.webkitTransform !== undefined) {
    		_.animType = 'webkitTransform';
    		_.transformType = '-webkit-transform';
    		_.transitionType = 'webkitTransition';
    		if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    	}
    	if (bodyStyle.msTransform !== undefined) {
    		_.animType = 'msTransform';
    		_.transformType = '-ms-transform';
    		_.transitionType = 'msTransition';
    		if (bodyStyle.msTransform === undefined) _.animType = false;
    	}
    	if (bodyStyle.transform !== undefined && _.animType !== false) {
    		_.animType = 'transform';
    		_.transformType = 'transform';
    		_.transitionType = 'transition';
    	}
    	_.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

    	var _ = this,
    	centerOffset, allSlides, indexOffset, remainder;

    	allSlides = _.$slider
    	.find('.slick-slide')
    	.removeClass('slick-active slick-center slick-current')
    	.attr('aria-hidden', 'true');

    	_.$slides
    	.eq(index)
    	.addClass('slick-current');

    	if (_.options.centerMode === true) {

    		centerOffset = Math.floor(_.options.slidesToShow / 2);

    		if (_.options.infinite === true) {

    			if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {

    				_.$slides
    				.slice(index - centerOffset, index + centerOffset + 1)
    				.addClass('slick-active')
    				.attr('aria-hidden', 'false');

    			} else {

    				indexOffset = _.options.slidesToShow + index;
    				allSlides
    				.slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
    				.addClass('slick-active')
    				.attr('aria-hidden', 'false');

    			}

    			if (index === 0) {

    				allSlides
    				.eq(allSlides.length - 1 - _.options.slidesToShow)
    				.addClass('slick-center');

    			} else if (index === _.slideCount - 1) {

    				allSlides
    				.eq(_.options.slidesToShow)
    				.addClass('slick-center');

    			}

    		}

    		_.$slides
    		.eq(index)
    		.addClass('slick-center');

    	} else {

    		if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

    			_.$slides
    			.slice(index, index + _.options.slidesToShow)
    			.addClass('slick-active')
    			.attr('aria-hidden', 'false');

    		} else if (allSlides.length <= _.options.slidesToShow) {

    			allSlides
    			.addClass('slick-active')
    			.attr('aria-hidden', 'false');

    		} else {

    			remainder = _.slideCount % _.options.slidesToShow;
    			indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

    			if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

    				allSlides
    				.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
    				.addClass('slick-active')
    				.attr('aria-hidden', 'false');

    			} else {

    				allSlides
    				.slice(indexOffset, indexOffset + _.options.slidesToShow)
    				.addClass('slick-active')
    				.attr('aria-hidden', 'false');

    			}

    		}

    	}

    	if (_.options.lazyLoad === 'ondemand') {
    		_.lazyLoad();
    	}

    };

    Slick.prototype.setupInfinite = function() {

    	var _ = this,
    	i, slideIndex, infiniteCount;

    	if (_.options.fade === true) {
    		_.options.centerMode = false;
    	}

    	if (_.options.infinite === true && _.options.fade === false) {

    		slideIndex = null;

    		if (_.slideCount > _.options.slidesToShow) {

    			if (_.options.centerMode === true) {
    				infiniteCount = _.options.slidesToShow + 1;
    			} else {
    				infiniteCount = _.options.slidesToShow;
    			}

    			for (i = _.slideCount; i > (_.slideCount -
    				infiniteCount); i -= 1) {
    				slideIndex = i - 1;
    			$(_.$slides[slideIndex]).clone(true).attr('id', '')
    			.attr('data-slick-index', slideIndex - _.slideCount)
    			.prependTo(_.$slideTrack).addClass('slick-cloned');
    		}
    		for (i = 0; i < infiniteCount; i += 1) {
    			slideIndex = i;
    			$(_.$slides[slideIndex]).clone(true).attr('id', '')
    			.attr('data-slick-index', slideIndex + _.slideCount)
    			.appendTo(_.$slideTrack).addClass('slick-cloned');
    		}
    		_.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
    			$(this).attr('id', '');
    		});

    	}

    }

};

Slick.prototype.interrupt = function( toggle ) {

	var _ = this;

	if( !toggle ) {
		_.autoPlay();
	}
	_.interrupted = toggle;

};

Slick.prototype.selectHandler = function(event) {

	var _ = this;

	var targetElement =
	$(event.target).is('.slick-slide') ?
	$(event.target) :
	$(event.target).parents('.slick-slide');

	var index = parseInt(targetElement.attr('data-slick-index'));

	if (!index) index = 0;

	if (_.slideCount <= _.options.slidesToShow) {

		_.setSlideClasses(index);
		_.asNavFor(index);
		return;

	}

	_.slideHandler(index);

};

Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

	var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
	_ = this, navTarget;

	sync = sync || false;

	if (_.animating === true && _.options.waitForAnimate === true) {
		return;
	}

	if (_.options.fade === true && _.currentSlide === index) {
		return;
	}

	if (_.slideCount <= _.options.slidesToShow) {
		return;
	}

	if (sync === false) {
		_.asNavFor(index);
	}

	targetSlide = index;
	targetLeft = _.getLeft(targetSlide);
	slideLeft = _.getLeft(_.currentSlide);

	_.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

	if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
		if (_.options.fade === false) {
			targetSlide = _.currentSlide;
			if (dontAnimate !== true) {
				_.animateSlide(slideLeft, function() {
					_.postSlide(targetSlide);
				});
			} else {
				_.postSlide(targetSlide);
			}
		}
		return;
	} else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
		if (_.options.fade === false) {
			targetSlide = _.currentSlide;
			if (dontAnimate !== true) {
				_.animateSlide(slideLeft, function() {
					_.postSlide(targetSlide);
				});
			} else {
				_.postSlide(targetSlide);
			}
		}
		return;
	}

	if ( _.options.autoplay ) {
		clearInterval(_.autoPlayTimer);
	}

	if (targetSlide < 0) {
		if (_.slideCount % _.options.slidesToScroll !== 0) {
			animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
		} else {
			animSlide = _.slideCount + targetSlide;
		}
	} else if (targetSlide >= _.slideCount) {
		if (_.slideCount % _.options.slidesToScroll !== 0) {
			animSlide = 0;
		} else {
			animSlide = targetSlide - _.slideCount;
		}
	} else {
		animSlide = targetSlide;
	}

	_.animating = true;

	_.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

	oldSlide = _.currentSlide;
	_.currentSlide = animSlide;

	_.setSlideClasses(_.currentSlide);

	if ( _.options.asNavFor ) {

		navTarget = _.getNavTarget();
		navTarget = navTarget.slick('getSlick');

		if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
			navTarget.setSlideClasses(_.currentSlide);
		}

	}

	_.updateDots();
	_.updateArrows();

	if (_.options.fade === true) {
		if (dontAnimate !== true) {

			_.fadeSlideOut(oldSlide);

			_.fadeSlide(animSlide, function() {
				_.postSlide(animSlide);
			});

		} else {
			_.postSlide(animSlide);
		}
		_.animateHeight();
		return;
	}

	if (dontAnimate !== true) {
		_.animateSlide(targetLeft, function() {
			_.postSlide(animSlide);
		});
	} else {
		_.postSlide(animSlide);
	}

};

Slick.prototype.startLoad = function() {

	var _ = this;

	if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

		_.$prevArrow.hide();
		_.$nextArrow.hide();

	}

	if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

		_.$dots.hide();

	}

	_.$slider.addClass('slick-loading');

};

Slick.prototype.swipeDirection = function() {

	var xDist, yDist, r, swipeAngle, _ = this;

	xDist = _.touchObject.startX - _.touchObject.curX;
	yDist = _.touchObject.startY - _.touchObject.curY;
	r = Math.atan2(yDist, xDist);

	swipeAngle = Math.round(r * 180 / Math.PI);
	if (swipeAngle < 0) {
		swipeAngle = 360 - Math.abs(swipeAngle);
	}

	if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
		return (_.options.rtl === false ? 'left' : 'right');
	}
	if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
		return (_.options.rtl === false ? 'left' : 'right');
	}
	if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
		return (_.options.rtl === false ? 'right' : 'left');
	}
	if (_.options.verticalSwiping === true) {
		if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
			return 'down';
		} else {
			return 'up';
		}
	}

	return 'vertical';

};

Slick.prototype.swipeEnd = function(event) {

	var _ = this,
	slideCount,
	direction;

	_.dragging = false;
	_.interrupted = false;
	_.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

	if ( _.touchObject.curX === undefined ) {
		return false;
	}

	if ( _.touchObject.edgeHit === true ) {
		_.$slider.trigger('edge', [_, _.swipeDirection() ]);
	}

	if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

		direction = _.swipeDirection();

		switch ( direction ) {

			case 'left':
			case 'down':

			slideCount =
			_.options.swipeToSlide ?
			_.checkNavigable( _.currentSlide + _.getSlideCount() ) :
			_.currentSlide + _.getSlideCount();

			_.currentDirection = 0;

			break;

			case 'right':
			case 'up':

			slideCount =
			_.options.swipeToSlide ?
			_.checkNavigable( _.currentSlide - _.getSlideCount() ) :
			_.currentSlide - _.getSlideCount();

			_.currentDirection = 1;

			break;

			default:


		}

		if( direction != 'vertical' ) {

			_.slideHandler( slideCount );
			_.touchObject = {};
			_.$slider.trigger('swipe', [_, direction ]);

		}

	} else {

		if ( _.touchObject.startX !== _.touchObject.curX ) {

			_.slideHandler( _.currentSlide );
			_.touchObject = {};

		}

	}

};

Slick.prototype.swipeHandler = function(event) {

	var _ = this;

	if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
		return;
	} else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
		return;
	}

	_.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
	event.originalEvent.touches.length : 1;

	_.touchObject.minSwipe = _.listWidth / _.options
	.touchThreshold;

	if (_.options.verticalSwiping === true) {
		_.touchObject.minSwipe = _.listHeight / _.options
		.touchThreshold;
	}

	switch (event.data.action) {

		case 'start':
		_.swipeStart(event);
		break;

		case 'move':
		_.swipeMove(event);
		break;

		case 'end':
		_.swipeEnd(event);
		break;

	}

};

Slick.prototype.swipeMove = function(event) {

	var _ = this,
	edgeWasHit = false,
	curLeft, swipeDirection, swipeLength, positionOffset, touches;

	touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

	if (!_.dragging || touches && touches.length !== 1) {
		return false;
	}

	curLeft = _.getLeft(_.currentSlide);

	_.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
	_.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

	_.touchObject.swipeLength = Math.round(Math.sqrt(
		Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

	if (_.options.verticalSwiping === true) {
		_.touchObject.swipeLength = Math.round(Math.sqrt(
			Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
	}

	swipeDirection = _.swipeDirection();

	if (swipeDirection === 'vertical') {
		return;
	}

	if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
		event.preventDefault();
	}

	positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
	if (_.options.verticalSwiping === true) {
		positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
	}


	swipeLength = _.touchObject.swipeLength;

	_.touchObject.edgeHit = false;

	if (_.options.infinite === false) {
		if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
			swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
			_.touchObject.edgeHit = true;
		}
	}

	if (_.options.vertical === false) {
		_.swipeLeft = curLeft + swipeLength * positionOffset;
	} else {
		_.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
	}
	if (_.options.verticalSwiping === true) {
		_.swipeLeft = curLeft + swipeLength * positionOffset;
	}

	if (_.options.fade === true || _.options.touchMove === false) {
		return false;
	}

	if (_.animating === true) {
		_.swipeLeft = null;
		return false;
	}

	_.setCSS(_.swipeLeft);

};

Slick.prototype.swipeStart = function(event) {

	var _ = this,
	touches;

	_.interrupted = true;

	if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
		_.touchObject = {};
		return false;
	}

	if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
		touches = event.originalEvent.touches[0];
	}

	_.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
	_.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

	_.dragging = true;

};

Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

	var _ = this;

	if (_.$slidesCache !== null) {

		_.unload();

		_.$slideTrack.children(this.options.slide).detach();

		_.$slidesCache.appendTo(_.$slideTrack);

		_.reinit();

	}

};

Slick.prototype.unload = function() {

	var _ = this;

	$('.slick-cloned', _.$slider).remove();

	if (_.$dots) {
		_.$dots.remove();
	}

	if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
		_.$prevArrow.remove();
	}

	if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
		_.$nextArrow.remove();
	}

	_.$slides
	.removeClass('slick-slide slick-active slick-visible slick-current')
	.attr('aria-hidden', 'true')
	.css('width', '');

};

Slick.prototype.unslick = function(fromBreakpoint) {

	var _ = this;
	_.$slider.trigger('unslick', [_, fromBreakpoint]);
	_.destroy();

};

Slick.prototype.updateArrows = function() {

	var _ = this,
	centerOffset;

	centerOffset = Math.floor(_.options.slidesToShow / 2);

	if ( _.options.arrows === true &&
		_.slideCount > _.options.slidesToShow &&
		!_.options.infinite ) {

		_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
	_.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

	if (_.currentSlide === 0) {

		_.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
		_.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

	} else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

		_.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
		_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

	} else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

		_.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
		_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

	}

}

};

Slick.prototype.updateDots = function() {

	var _ = this;

	if (_.$dots !== null) {

		_.$dots
		.find('li')
		.removeClass('slick-active')
		.attr('aria-hidden', 'true');

		_.$dots
		.find('li')
		.eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
		.addClass('slick-active')
		.attr('aria-hidden', 'false');

	}

};

Slick.prototype.visibility = function() {

	var _ = this;

	if ( _.options.autoplay ) {

		if ( document[_.hidden] ) {

			_.interrupted = true;

		} else {

			_.interrupted = false;

		}

	}

};

$.fn.slick = function() {
	var _ = this,
	opt = arguments[0],
	args = Array.prototype.slice.call(arguments, 1),
	l = _.length,
	i,
	ret;
	for (i = 0; i < l; i++) {
		if (typeof opt == 'object' || typeof opt == 'undefined')
			_[i].slick = new Slick(_[i], opt);
		else
			ret = _[i].slick[opt].apply(_[i].slick, args);
		if (typeof ret != 'undefined') return ret;
	}
	return _;
};

}));






/*
 * jQuery Tabs plugin
 */

 ;(function($, $win) {
 	'use strict';

 	function Tabset($holder, options) {
 		this.$holder = $holder;
 		this.options = options;

 		this.init();
 	}

 	Tabset.prototype = {
 		init: function() {
 			this.$tabLinks = this.$holder.find(this.options.tabLinks);

 			this.setStartActiveIndex();
 			this.setActiveTab();

 			if (this.options.autoHeight) {
 				this.$tabHolder = $(this.$tabLinks.eq(0).attr(this.options.attrib)).parent();
 			}
 		},

 		setStartActiveIndex: function() {
 			var $classTargets = this.getClassTarget(this.$tabLinks);
 			var $activeLink = $classTargets.filter('.' + this.options.activeClass);
 			var $hashLink = this.$tabLinks.filter('[' + this.options.attrib + '="' + location.hash + '"]');
 			var activeIndex;

 			if (this.options.checkHash && $hashLink.length) {
 				$activeLink = $hashLink;
 			}

 			activeIndex = $classTargets.index($activeLink);

 			this.activeTabIndex = this.prevTabIndex = (activeIndex === -1 ? (this.options.defaultTab ? 0 : null) : activeIndex);
 		},

 		setActiveTab: function() {
 			var self = this;

 			this.$tabLinks.each(function(i, link) {
 				var $link = $(link);
 				var $classTarget = self.getClassTarget($link);
 				var $tab = $($link.attr(self.options.attrib));

 				if (i !== self.activeTabIndex) {
 					$classTarget.removeClass(self.options.activeClass);
 					$tab.addClass(self.options.tabHiddenClass).removeClass(self.options.activeClass);
 				} else {
 					$classTarget.addClass(self.options.activeClass);
 					$tab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);
 				}

 				self.attachTabLink($link, i);
 			});
 		},

 		attachTabLink: function($link, i) {
 			var self = this;

 			$link.on(this.options.event + '.tabset', function(e) {
 				e.preventDefault();

 				if (self.activeTabIndex === self.prevTabIndex && self.activeTabIndex !== i) {
 					self.activeTabIndex = i;
 					self.switchTabs();
 				}
 			});
 		},

 		resizeHolder: function(height) {
 			var self = this;

 			if (height) {
 				this.$tabHolder.height(height);
 				setTimeout(function() {
 					self.$tabHolder.addClass('transition');
 				}, 10);
 			} else {
 				self.$tabHolder.removeClass('transition').height('');
 			}
 		},

 		switchTabs: function() {
 			var self = this;

 			var $prevLink = this.$tabLinks.eq(this.prevTabIndex);
 			var $nextLink = this.$tabLinks.eq(this.activeTabIndex);

 			var $prevTab = this.getTab($prevLink);
 			var $nextTab = this.getTab($nextLink);

 			$prevTab.removeClass(this.options.activeClass);

 			if (self.haveTabHolder()) {
 				this.resizeHolder($prevTab.outerHeight());
 			}

 			setTimeout(function() {
 				self.getClassTarget($prevLink).removeClass(self.options.activeClass);

 				$prevTab.addClass(self.options.tabHiddenClass);
 				$nextTab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);

 				self.getClassTarget($nextLink).addClass(self.options.activeClass);

 				if (self.haveTabHolder()) {
 					self.resizeHolder($nextTab.outerHeight());

 					setTimeout(function() {
 						self.resizeHolder();
 						self.prevTabIndex = self.activeTabIndex;
 					}, self.options.animSpeed);
 				} else {
 					self.prevTabIndex = self.activeTabIndex;
 				}
 			}, this.options.autoHeight ? this.options.animSpeed : 1);
 		},

 		getClassTarget: function($link) {
 			return this.options.addToParent ? $link.parent() : $link;
 		},

 		getActiveTab: function() {
 			return this.getTab(this.$tabLinks.eq(this.activeTabIndex));
 		},

 		getTab: function($link) {
 			return $($link.attr(this.options.attrib));
 		},

 		haveTabHolder: function() {
 			return this.$tabHolder && this.$tabHolder.length;
 		},

 		destroy: function() {
 			var self = this;

 			this.$tabLinks.off('.tabset').each(function() {
 				var $link = $(this);

 				self.getClassTarget($link).removeClass(self.options.activeClass);
 				$($link.attr(self.options.attrib)).removeClass(self.options.activeClass + ' ' + self.options.tabHiddenClass);
 			});

 			this.$holder.removeData('Tabset');
 		}
 	};

 	$.fn.tabset = function(options) {
 		options = $.extend({
 			activeClass: 'active',
 			addToParent: false,
 			autoHeight: false,
 			checkHash: false,
 			defaultTab: true,
 			animSpeed: 500,
 			tabLinks: 'a',
 			attrib: 'href',
 			event: 'click',
 			tabHiddenClass: 'js-hidden'
 		}, options);
 		options.autoHeight = options.autoHeight && $.support.opacity;

 		return this.each(function() {
 			var $holder = $(this);

 			if (!$holder.data('Tabset')) {
 				$holder.data('Tabset', new Tabset($holder, options));
 			}
 		});
 	};
 }(jQuery, jQuery(window)));




/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
;(function(r,G,f,v){var J=f("html"),n=f(r),p=f(G),b=f.fancybox=function(){b.open.apply(this,arguments)},I=navigator.userAgent.match(/msie/i),B=null,s=G.createTouch!==v,t=function(a){return a&&a.hasOwnProperty&&a instanceof f},q=function(a){return a&&"string"===f.type(a)},E=function(a){return q(a)&&0<a.indexOf("%")},l=function(a,d){var e=parseInt(a,10)||0;d&&E(a)&&(e*=b.getViewport()[d]/100);return Math.ceil(e)},w=function(a,b){return l(a,b)+"px"};f.extend(b,{version:"2.1.5",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!s,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+(I?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,d){if(a&&(f.isPlainObject(d)||(d={}),!1!==b.close(!0)))return f.isArray(a)||(a=t(a)?f(a).get():[a]),f.each(a,function(e,c){var k={},g,h,j,m,l;"object"===f.type(c)&&(c.nodeType&&(c=f(c)),t(c)?(k={href:c.data("fancybox-href")||c.attr("href"),title:c.data("fancybox-title")||c.attr("title"),isDom:!0,element:c},f.metadata&&f.extend(!0,k,c.metadata())):k=c);g=d.href||k.href||(q(c)?c:null);h=d.title!==v?d.title:k.title||"";m=(j=d.content||k.content)?"html":d.type||k.type;!m&&k.isDom&&(m=c.data("fancybox-type"),m||(m=(m=c.prop("class").match(/fancybox\.(\w+)/))?m[1]:null));q(g)&&(m||(b.isImage(g)?m="image":b.isSWF(g)?m="swf":"#"===g.charAt(0)?m="inline":q(c)&&(m="html",j=c)),"ajax"===m&&(l=g.split(/\s+/,2),g=l.shift(),l=l.shift()));j||("inline"===m?g?j=f(q(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):k.isDom&&(j=c):"html"===m?j=g:!m&&(!g&&k.isDom)&&(m="inline",j=c));f.extend(k,{href:g,type:m,content:j,title:h,selector:l});a[e]=k}),b.opts=f.extend(!0,{},b.defaults,d),d.keys!==v&&(b.opts.keys=d.keys?f.extend({},b.defaults.keys,d.keys):!1),b.group=a,b._start(b.opts.index)},cancel:function(){var a=b.coming;a&&!1!==b.trigger("onCancel")&&(b.hideLoading(),b.ajaxLoad&&b.ajaxLoad.abort(),b.ajaxLoad=null,b.imgPreload&&(b.imgPreload.onload=b.imgPreload.onerror=null),a.wrap&&a.wrap.stop(!0,!0).trigger("onReset").remove(),b.coming=null,b.current||b._afterZoomOut(a))},close:function(a){b.cancel();!1!==b.trigger("beforeClose")&&(b.unbindEvents(),b.isActive&&(!b.isOpen||!0===a?(f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),b._afterZoomOut()):(b.isOpen=b.isOpened=!1,b.isClosing=!0,f(".fancybox-item, .fancybox-nav").remove(),b.wrap.stop(!0,!0).removeClass("fancybox-opened"),b.transitions[b.current.closeMethod]())))},play:function(a){var d=function(){clearTimeout(b.player.timer)},e=function(){d();b.current&&b.player.isActive&&(b.player.timer=setTimeout(b.next,b.current.playSpeed))},c=function(){d();p.unbind(".player");b.player.isActive=!1;b.trigger("onPlayEnd")};if(!0===a||!b.player.isActive&&!1!==a){if(b.current&&(b.current.loop||b.current.index<b.group.length-1))b.player.isActive=!0,p.bind({"onCancel.player beforeClose.player":c,"onUpdate.player":e,"beforeLoad.player":d}),e(),b.trigger("onPlayStart")}else c()},next:function(a){var d=b.current;d&&(q(a)||(a=d.direction.next),b.jumpto(d.index+1,a,"next"))},prev:function(a){var d=b.current;d&&(q(a)||(a=d.direction.prev),b.jumpto(d.index-1,a,"prev"))},jumpto:function(a,d,e){var c=b.current;c&&(a=l(a),b.direction=d||c.direction[a>=c.index?"next":"prev"],b.router=e||"jumpto",c.loop&&(0>a&&(a=c.group.length+a%c.group.length),a%=c.group.length),c.group[a]!==v&&(b.cancel(),b._start(a)))},reposition:function(a,d){var e=b.current,c=e?e.wrap:null,k;c&&(k=b._getPosition(d),a&&"scroll"===a.type?(delete k.position,c.stop(!0,!0).animate(k,200)):(c.css(k),e.pos=f.extend({},e.dim,k)))},update:function(a){var d=a&&a.type,e=!d||"orientationchange"===d;e&&(clearTimeout(B),B=null);b.isOpen&&!B&&(B=setTimeout(function(){var c=b.current;c&&!b.isClosing&&(b.wrap.removeClass("fancybox-tmp"),(e||"load"===d||"resize"===d&&c.autoResize)&&b._setDimension(),"scroll"===d&&c.canShrink||b.reposition(a),b.trigger("onUpdate"),B=null)},e&&!s?0:300))},toggle:function(a){b.isOpen&&(b.current.fitToView="boolean"===f.type(a)?a:!b.current.fitToView,s&&(b.wrap.removeAttr("style").addClass("fancybox-tmp"),b.trigger("onUpdate")),b.update())},hideLoading:function(){p.unbind(".loading");f("#fancybox-loading").remove()},showLoading:function(){var a,d;b.hideLoading();a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");p.bind("keydown.loading",function(a){if(27===(a.which||a.keyCode))a.preventDefault(),b.cancel()});b.defaults.fixed||(d=b.getViewport(),a.css({position:"absolute",top:0.5*d.h+d.y,left:0.5*d.w+d.x}))},getViewport:function(){var a=b.current&&b.current.locked||!1,d={x:n.scrollLeft(),y:n.scrollTop()};a?(d.w=a[0].clientWidth,d.h=a[0].clientHeight):(d.w=s&&r.innerWidth?r.innerWidth:n.width(),d.h=s&&r.innerHeight?r.innerHeight:n.height());return d},unbindEvents:function(){b.wrap&&t(b.wrap)&&b.wrap.unbind(".fb");p.unbind(".fb");n.unbind(".fb")},bindEvents:function(){var a=b.current,d;a&&(n.bind("orientationchange.fb"+(s?"":" resize.fb")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update),(d=a.keys)&&p.bind("keydown.fb",function(e){var c=e.which||e.keyCode,k=e.target||e.srcElement;if(27===c&&b.coming)return!1;!e.ctrlKey&&(!e.altKey&&!e.shiftKey&&!e.metaKey&&(!k||!k.type&&!f(k).is("[contenteditable]")))&&f.each(d,function(d,k){if(1<a.group.length&&k[c]!==v)return b[d](k[c]),e.preventDefault(),!1;if(-1<f.inArray(c,k))return b[d](),e.preventDefault(),!1})}),f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(d,c,k,g){for(var h=f(d.target||null),j=!1;h.length&&!j&&!h.is(".fancybox-skin")&&!h.is(".fancybox-wrap");)j=h[0]&&!(h[0].style.overflow&&"hidden"===h[0].style.overflow)&&(h[0].clientWidth&&h[0].scrollWidth>h[0].clientWidth||h[0].clientHeight&&h[0].scrollHeight>h[0].clientHeight),h=f(h).parent();if(0!==c&&!j&&1<b.group.length&&!a.canShrink){if(0<g||0<k)b.prev(0<g?"down":"left");else if(0>g||0>k)b.next(0>g?"up":"right");d.preventDefault()}}))},trigger:function(a,d){var e,c=d||b.coming||b.current;if(c){f.isFunction(c[a])&&(e=c[a].apply(c,Array.prototype.slice.call(arguments,1)));if(!1===e)return!1;c.helpers&&f.each(c.helpers,function(d,e){if(e&&b.helpers[d]&&f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0,{},b.helpers[d].defaults,e),c)});p.trigger(a)}},isImage:function(a){return q(a)&&a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(a){return q(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var d={},e,c;a=l(a);e=b.group[a]||null;if(!e)return!1;d=f.extend(!0,{},b.opts,e);e=d.margin;c=d.padding;"number"===f.type(e)&&(d.margin=[e,e,e,e]);"number"===f.type(c)&&(d.padding=[c,c,c,c]);d.modal&&f.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=b.group;d.index=a;b.coming=d;if(!1===b.trigger("beforeLoad"))b.coming=null;else{c=d.type;e=d.href;if(!c)return b.coming=null,b.current&&b.router&&"jumpto"!==b.router?(b.current.index=a,b[b.router](b.direction)):!1;b.isActive=!0;if("image"===c||"swf"===c)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===c&&(d.aspectRatio=!0);"iframe"===c&&s&&(d.scrolling="scroll");d.wrap=f(d.tpl.wrap).addClass("fancybox-"+(s?"mobile":"desktop")+" fancybox-type-"+c+" fancybox-tmp "+d.wrapCSS).appendTo(d.parent||"body");f.extend(d,{skin:f(".fancybox-skin",d.wrap),outer:f(".fancybox-outer",d.wrap),inner:f(".fancybox-inner",d.wrap)});f.each(["Top","Right","Bottom","Left"],function(a,b){d.skin.css("padding"+b,w(d.padding[a]))});b.trigger("onReady");if("inline"===c||"html"===c){if(!d.content||!d.content.length)return b._error("content")}else if(!e)return b._error("href");"image"===c?b._loadImage():"ajax"===c?b._loadAjax():"iframe"===c?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=this.width/b.opts.pixelRatio;b.coming.height=this.height/b.opts.pixelRatio;b._afterLoad()};a.onerror=function(){this.onload=this.onerror=null;b._error("image")};a.src=b.coming.href;!0!==a.complete&&b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(a,e){b.coming&&"abort"!==e?b._error("ajax",a):b.hideLoading()},success:function(d,e){"success"===e&&(a.content=d,b._afterLoad())}}))},_loadIframe:function(){var a=b.coming,d=f(a.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",s?"auto":a.iframe.scrolling).attr("src",a.href);f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(a){}});a.iframe.preload&&(b.showLoading(),d.one("load",function(){f(this).data("ready",1);s||f(this).bind("load.fb",b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()}));a.content=d.appendTo(a.inner);a.iframe.preload||b._afterLoad()},_preloadImages:function(){var a=b.group,d=b.current,e=a.length,c=d.preload?Math.min(d.preload,e-1):0,f,g;for(g=1;g<=c;g+=1)f=a[(d.index+g)%e],"image"===f.type&&f.href&&((new Image).src=f.href)},_afterLoad:function(){var a=b.coming,d=b.current,e,c,k,g,h;b.hideLoading();if(a&&!1!==b.isActive)if(!1===b.trigger("afterLoad",a,d))a.wrap.stop(!0).trigger("onReset").remove(),b.coming=null;else{d&&(b.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());b.unbindEvents();e=a.content;c=a.type;k=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,outer:a.outer,inner:a.inner,current:a,previous:d});g=a.href;switch(c){case "inline":case "ajax":case "html":a.selector?e=f("<div>").html(e).find(a.selector):t(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case "image":e=a.tpl.image.replace("{href}",g);break;case "swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+g+'"></param>',h="",f.each(a.swf,function(a,b){e+='<param name="'+a+'" value="'+b+'"></param>';h+=" "+a+'="'+b+'"'}),e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+h+"></embed></object>"}(!t(e)||!e.parent().is(a.inner))&&a.inner.append(e);b.trigger("beforeShow");a.inner.css("overflow","yes"===k?"scroll":"no"===k?"hidden":k);b._setDimension();b.reposition();b.isOpen=!1;b.coming=null;b.bindEvents();if(b.isOpened){if(d.prevMethod)b.transitions[d.prevMethod]()}else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),d=0,e=!1,c=!1,e=b.wrap,k=b.skin,g=b.inner,h=b.current,c=h.width,j=h.height,m=h.minWidth,u=h.minHeight,n=h.maxWidth,p=h.maxHeight,s=h.scrolling,q=h.scrollOutside?h.scrollbarWidth:0,x=h.margin,y=l(x[1]+x[3]),r=l(x[0]+x[2]),v,z,t,C,A,F,B,D,H;e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");x=l(k.outerWidth(!0)-k.width());v=l(k.outerHeight(!0)-k.height());z=y+x;t=r+v;C=E(c)?(a.w-z)*l(c)/100:c;A=E(j)?(a.h-t)*l(j)/100:j;if("iframe"===h.type){if(H=h.content,h.autoHeight&&1===H.data("ready"))try{H[0].contentWindow.document.location&&(g.width(C).height(9999),F=H.contents().find("body"),q&&F.css("overflow-x","hidden"),A=F.outerHeight(!0))}catch(G){}}else if(h.autoWidth||h.autoHeight)g.addClass("fancybox-tmp"),h.autoWidth||g.width(C),h.autoHeight||g.height(A),h.autoWidth&&(C=g.width()),h.autoHeight&&(A=g.height()),g.removeClass("fancybox-tmp");c=l(C);j=l(A);D=C/A;m=l(E(m)?l(m,"w")-z:m);n=l(E(n)?l(n,"w")-z:n);u=l(E(u)?l(u,"h")-t:u);p=l(E(p)?l(p,"h")-t:p);F=n;B=p;h.fitToView&&(n=Math.min(a.w-z,n),p=Math.min(a.h-t,p));z=a.w-y;r=a.h-r;h.aspectRatio?(c>n&&(c=n,j=l(c/D)),j>p&&(j=p,c=l(j*D)),c<m&&(c=m,j=l(c/D)),j<u&&(j=u,c=l(j*D))):(c=Math.max(m,Math.min(c,n)),h.autoHeight&&"iframe"!==h.type&&(g.width(c),j=g.height()),j=Math.max(u,Math.min(j,p)));if(h.fitToView)if(g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height(),h.aspectRatio)for(;(a>z||y>r)&&(c>m&&j>u)&&!(19<d++);)j=Math.max(u,Math.min(p,j-10)),c=l(j*D),c<m&&(c=m,j=l(c/D)),c>n&&(c=n,j=l(c/D)),g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height();else c=Math.max(m,Math.min(c,c-(a-z))),j=Math.max(u,Math.min(j,j-(y-r)));q&&("auto"===s&&j<A&&c+x+q<z)&&(c+=q);g.width(c).height(j);e.width(c+x);a=e.width();y=e.height();e=(a>z||y>r)&&c>m&&j>u;c=h.aspectRatio?c<F&&j<B&&c<C&&j<A:(c<F||j<B)&&(c<C||j<A);f.extend(h,{dim:{width:w(a),height:w(y)},origWidth:C,origHeight:A,canShrink:e,canExpand:c,wPadding:x,hPadding:v,wrapSpace:y-k.outerHeight(!0),skinSpace:k.height()-j});!H&&(h.autoHeight&&j>u&&j<p&&!c)&&g.height("auto")},_getPosition:function(a){var d=b.current,e=b.getViewport(),c=d.margin,f=b.wrap.width()+c[1]+c[3],g=b.wrap.height()+c[0]+c[2],c={position:"absolute",top:c[0],left:c[3]};d.autoCenter&&d.fixed&&!a&&g<=e.h&&f<=e.w?c.position="fixed":d.locked||(c.top+=e.y,c.left+=e.x);c.top=w(Math.max(c.top,c.top+(e.h-g)*d.topRatio));c.left=w(Math.max(c.left,c.left+(e.w-f)*d.leftRatio));return c},_afterZoomIn:function(){var a=b.current;a&&(b.isOpen=b.isOpened=!0,b.wrap.css("overflow","visible").addClass("fancybox-opened"),b.update(),(a.closeClick||a.nextClick&&1<b.group.length)&&b.inner.css("cursor","pointer").bind("click.fb",function(d){!f(d.target).is("a")&&!f(d.target).parent().is("a")&&(d.preventDefault(),b[a.closeClick?"close":"next"]())}),a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",function(a){a.preventDefault();b.close()}),a.arrows&&1<b.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(b.outer).bind("click.fb",b.prev),(a.loop||a.index<b.group.length-1)&&f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)),b.trigger("afterShow"),!a.loop&&a.index===a.group.length-1?b.play(!1):b.opts.autoPlay&&!b.player.isActive&&(b.opts.autoPlay=!1,b.play()))},_afterZoomOut:function(a){a=a||b.current;f(".fancybox-wrap").trigger("onReset").remove();f.extend(b,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,d=a.element,e=a.orig,c={},f=50,g=50,h=a.hPadding,j=a.wPadding,m=b.getViewport();!e&&(a.isDom&&d.is(":visible"))&&(e=d.find("img:first"),e.length||(e=d));t(e)?(c=e.offset(),e.is("img")&&(f=e.outerWidth(),g=e.outerHeight())):(c.top=m.y+(m.h-g)*a.topRatio,c.left=m.x+(m.w-f)*a.leftRatio);if("fixed"===b.wrap.css("position")||a.locked)c.top-=m.y,c.left-=m.x;return c={top:w(c.top-h*a.topRatio),left:w(c.left-j*a.leftRatio),width:w(f+j),height:w(g+h)}},step:function(a,d){var e,c,f=d.prop;c=b.current;var g=c.wrapSpace,h=c.skinSpace;if("width"===f||"height"===f)e=d.end===d.start?1:(a-d.start)/(d.end-d.start),b.isClosing&&(e=1-e),c="width"===f?c.wPadding:c.hPadding,c=a-c,b.skin[f](l("width"===f?c:c-g*e)),b.inner[f](l("width"===f?c:c-g*e-h*e))},zoomIn:function(){var a=b.current,d=a.pos,e=a.openEffect,c="elastic"===e,k=f.extend({opacity:1},d);delete k.position;c?(d=this.getOrigPosition(),a.openOpacity&&(d.opacity=0.1)):"fade"===e&&(d.opacity=0.1);b.wrap.css(d).animate(k,{duration:"none"===e?0:a.openSpeed,easing:a.openEasing,step:c?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,d=a.closeEffect,e="elastic"===d,c={opacity:0.1};e&&(c=this.getOrigPosition(),a.closeOpacity&&(c.opacity=0.1));b.wrap.animate(c,{duration:"none"===d?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,complete:b._afterZoomOut})},changeIn:function(){var a=b.current,d=a.nextEffect,e=a.pos,c={opacity:1},f=b.direction,g;e.opacity=0.1;"elastic"===d&&(g="down"===f||"up"===f?"top":"left","down"===f||"right"===f?(e[g]=w(l(e[g])-200),c[g]="+=200px"):(e[g]=w(l(e[g])+200),c[g]="-=200px"));"none"===d?b._afterZoomIn():b.wrap.css(e).animate(c,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},changeOut:function(){var a=b.previous,d=a.prevEffect,e={opacity:0.1},c=b.direction;"elastic"===d&&(e["down"===c||"up"===c?"top":"left"]=("up"===c||"left"===c?"-":"+")+"=200px");a.wrap.animate(e,{duration:"none"===d?0:a.prevSpeed,easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!s,fixed:!0},overlay:null,fixed:!1,el:f("html"),create:function(a){a=f.extend({},this.defaults,a);this.overlay&&this.close();this.overlay=f('<div class="fancybox-overlay"></div>').appendTo(b.coming?b.coming.parent:a.parent);this.fixed=!1;a.fixed&&b.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(a){var d=this;a=f.extend({},this.defaults,a);this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(a);this.fixed||(n.bind("resize.overlay",f.proxy(this.update,this)),this.update());a.closeClick&&this.overlay.bind("click.overlay",function(a){if(f(a.target).hasClass("fancybox-overlay"))return b.isActive?b.close():d.close(),!1});this.overlay.css(a.css).show()},close:function(){var a,b;n.unbind("resize.overlay");this.el.hasClass("fancybox-lock")&&(f(".fancybox-margin").removeClass("fancybox-margin"),a=n.scrollTop(),b=n.scrollLeft(),this.el.removeClass("fancybox-lock"),n.scrollTop(a).scrollLeft(b));f(".fancybox-overlay").remove().hide();f.extend(this,{overlay:null,fixed:!1})},update:function(){var a="100%",b;this.overlay.width(a).height("100%");I?(b=Math.max(G.documentElement.offsetWidth,G.body.offsetWidth),p.width()>b&&(a=p.width())):p.width()>n.width()&&(a=p.width());this.overlay.width(a).height(p.height())},onReady:function(a,b){var e=this.overlay;f(".fancybox-overlay").stop(!0,!0);e||this.create(a);a.locked&&(this.fixed&&b.fixed)&&(e||(this.margin=p.height()>n.height()?f("html").css("margin-right").replace("px",""):!1),b.locked=this.overlay.append(b.wrap),b.fixed=!1);!0===a.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,b){var e,c;b.locked&&(!1!==this.margin&&(f("*").filter(function(){return"fixed"===f(this).css("position")&&!f(this).hasClass("fancybox-overlay")&&!f(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),e=n.scrollTop(),c=n.scrollLeft(),this.el.addClass("fancybox-lock"),n.scrollTop(e).scrollLeft(c));this.open(a)},onUpdate:function(){this.fixed||this.update()},afterClose:function(a){this.overlay&&!b.coming&&this.overlay.fadeOut(a.speedOut,f.proxy(this.close,this))}};b.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(a){var d=b.current,e=d.title,c=a.type;f.isFunction(e)&&(e=e.call(d.element,d));if(q(e)&&""!==f.trim(e)){d=f('<div class="fancybox-title fancybox-title-'+c+'-wrap">'+e+"</div>");switch(c){case "inside":c=b.skin;break;case "outside":c=b.wrap;break;case "over":c=b.inner;break;default:c=b.skin,d.appendTo("body"),I&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),b.current.margin[2]+=Math.abs(l(d.css("margin-bottom")))}d["top"===a.position?"prependTo":"appendTo"](c)}}};f.fn.fancybox=function(a){var d,e=f(this),c=this.selector||"",k=function(g){var h=f(this).blur(),j=d,k,l;!g.ctrlKey&&(!g.altKey&&!g.shiftKey&&!g.metaKey)&&!h.is(".fancybox-wrap")&&(k=a.groupAttr||"data-fancybox-group",l=h.attr(k),l||(k="rel",l=h.get(0)[k]),l&&(""!==l&&"nofollow"!==l)&&(h=c.length?f(c):e,h=h.filter("["+k+'="'+l+'"]'),j=h.index(this)),a.index=j,!1!==b.open(h,a)&&g.preventDefault())};a=a||{};d=a.index||0;!c||!1===a.live?e.unbind("click.fb-start").bind("click.fb-start",k):p.undelegate(c,"click.fb-start").delegate(c+":not('.fancybox-item, .fancybox-nav')","click.fb-start",k);this.filter("[data-fancybox-start=1]").trigger("click");return this};p.ready(function(){var a,d;f.scrollbarWidth===v&&(f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});if(f.support.fixedPosition===v){a=f.support;d=f('<div style="position:fixed;top:20px;"></div>').appendTo("body");var e=20===d[0].offsetTop||15===d[0].offsetTop;d.remove();a.fixedPosition=e}f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),fixed:f.support.fixedPosition,parent:f("body")});a=f(r).width();J.addClass("fancybox-lock-test");d=f(r).width();J.removeClass("fancybox-lock-test");f("<style type='text/css'>.fancybox-margin{margin-right:"+(d-a)+"px;}</style>").appendTo("head")})})(window,document,jQuery);


/*
 * jQuery SameHeight plugin
 */
 ;(function($){
 	$.fn.sameHeight = function(opt) {
 		var options = $.extend({
 			skipClass: 'same-height-ignore',
 			leftEdgeClass: 'same-height-left',
 			rightEdgeClass: 'same-height-right',
 			elements: '>*',
 			flexible: false,
 			multiLine: false,
 			useMinHeight: false,
 			biggestHeight: false
 		},opt);
 		return this.each(function(){
 			var holder = $(this), postResizeTimer, ignoreResize;
 			var elements = holder.find(options.elements).not('.' + options.skipClass);
 			if(!elements.length) return;

			// resize handler
			function doResize() {
				elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
				if(options.multiLine) {
					// resize elements row by row
					resizeElementsByRows(elements, options);
				} else {
					// resize elements by holder
					resizeElements(elements, holder, options);
				}
			}
			doResize();

			// handle flexible layout / font resize
			var delayedResizeHandler = function() {
				if(!ignoreResize) {
					ignoreResize = true;
					doResize();
					clearTimeout(postResizeTimer);
					postResizeTimer = setTimeout(function() {
						doResize();
						setTimeout(function(){
							ignoreResize = false;
						}, 10);
					}, 100);
				}
			};

			// handle flexible/responsive layout
			if(options.flexible) {
				$(window).bind('resize orientationchange fontresize', delayedResizeHandler);
			}

			// handle complete page load including images and fonts
			$(window).bind('load', delayedResizeHandler);
		});
 	};

	// detect css min-height support
	var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';

	// get elements by rows
	function resizeElementsByRows(boxes, options) {
		var currentRow = $(), maxHeight, maxCalcHeight = 0, firstOffset = boxes.eq(0).offset().top;
		boxes.each(function(ind){
			var curItem = $(this);
			if(curItem.offset().top === firstOffset) {
				currentRow = currentRow.add(this);
			} else {
				maxHeight = getMaxHeight(currentRow);
				maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
				currentRow = curItem;
				firstOffset = curItem.offset().top;
			}
		});
		if(currentRow.length) {
			maxHeight = getMaxHeight(currentRow);
			maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
		}
		if(options.biggestHeight) {
			boxes.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', maxCalcHeight);
		}
	}

	// calculate max element height
	function getMaxHeight(boxes) {
		var maxHeight = 0;
		boxes.each(function(){
			maxHeight = Math.max(maxHeight, $(this).outerHeight());
		});
		return maxHeight;
	}

	// resize helper function
	function resizeElements(boxes, parent, options) {
		var calcHeight;
		var parentHeight = typeof parent === 'number' ? parent : parent.height();
		boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i){
			var element = $(this);
			var depthDiffHeight = 0;
			var isBorderBox = element.css('boxSizing') === 'border-box' || element.css('-moz-box-sizing') === 'border-box' || element.css('-webkit-box-sizing') === 'border-box';

			if(typeof parent !== 'number') {
				element.parents().each(function(){
					var tmpParent = $(this);
					if(parent.is(this)) {
						return false;
					} else {
						depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
					}
				});
			}
			calcHeight = parentHeight - depthDiffHeight;
			calcHeight -= isBorderBox ? 0 : element.outerHeight() - element.height();

			if(calcHeight > 0) {
				element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
			}
		});
		boxes.filter(':first').addClass(options.leftEdgeClass);
		boxes.filter(':last').addClass(options.rightEdgeClass);
		return calcHeight;
	}
}(jQuery));

/*
 * jQuery FontResize Event
 */
 jQuery.onFontResize = (function($) {
 	$(function() {
 		var randomID = 'font-resize-frame-' + Math.floor(Math.random() * 1000);
 		var resizeFrame = $('<iframe>').attr('id', randomID).addClass('font-resize-helper');

		// required styles
		resizeFrame.css({
			width: '100em',
			height: '10px',
			position: 'absolute',
			borderWidth: 0,
			top: '-9999px',
			left: '-9999px'
		}).appendTo('body');

		// use native IE resize event if possible
		if (window.attachEvent && !window.addEventListener) {
			resizeFrame.bind('resize', function () {
				$.onFontResize.trigger(resizeFrame[0].offsetWidth / 100);
			});
		}
		// use script inside the iframe to detect resize for other browsers
		else {
			var doc = resizeFrame[0].contentWindow.document;
			doc.open();
			doc.write('<scri' + 'pt>window.onload = function(){var em = parent.jQuery("#' + randomID + '")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</scri' + 'pt>');
			doc.close();
		}
		jQuery.onFontResize.initialSize = resizeFrame[0].offsetWidth / 100;
	});
 	return {
		// public method, so it can be called from within the iframe
		trigger: function (em) {
			$(window).trigger("fontresize", [em]);
		}
	};
}(jQuery));

/*
 * jQuery Accordion plugin
 */
 ;(function($){
 	$.fn.slideAccordion = function(opt){
		// default options
		var options = $.extend({
			addClassBeforeAnimation: false,
			allowClickWhenExpanded: false,
			activeClass:'accordion-active',
			opener:'.opener',
			slider:'.slide',
			animSpeed: 300,
			collapsible:true,
			event:'click'
		},opt);

		return this.each(function(){
			// options
			var accordion = $(this);
			var items = accordion.find(':has('+options.slider+')');

			items.each(function(){
				var item = $(this);
				var opener = item.find(options.opener);
				var slider = item.find(options.slider);
				opener.bind(options.event, function(e){
					if(!slider.is(':animated')) {
						if(item.hasClass(options.activeClass)) {
							if(options.allowClickWhenExpanded) {
								return;
							} else if(options.collapsible) {
								slider.slideUp(options.animSpeed, function(){
									hideSlide(slider);
									item.removeClass(options.activeClass);
								});
							}
						} else {
							// show active
							var levelItems = item.siblings('.'+options.activeClass);
							var sliderElements = levelItems.find(options.slider);
							item.addClass(options.activeClass);
							showSlide(slider).hide().slideDown(options.animSpeed);

							// collapse others
							sliderElements.slideUp(options.animSpeed, function(){
								levelItems.removeClass(options.activeClass);
								hideSlide(sliderElements);
							});
						}
					}
					e.preventDefault();
				});
				if(item.hasClass(options.activeClass)) showSlide(slider); else hideSlide(slider);
			});
		});
	};

	// accordion slide visibility
	var showSlide = function(slide) {
		return slide.css({position:'', top: '', left: '', width: '' });
	};
	var hideSlide = function(slide) {
		return slide.show().css({position:'absolute', top: -9999, left: -9999, width: slide.width() });
	};
}(jQuery));



 /*
 * Utility module has dropdown
 */
 lib = {
 	hasClass: function(el,cls) {
 		return el && el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
 	},
 	addClass: function(el,cls) {
 		if (el && !this.hasClass(el,cls)) el.className += " "+cls;
 	},
 	removeClass: function(el,cls) {
 		if (el && this.hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
 	},
 	extend: function(obj) {
 		for(var i = 1; i < arguments.length; i++) {
 			for(var p in arguments[i]) {
 				if(arguments[i].hasOwnProperty(p)) {
 					obj[p] = arguments[i][p];
 				}
 			}
 		}
 		return obj;
 	},
 	each: function(obj, callback) {
 		var property, len;
 		if(typeof obj.length === 'number') {
 			for(property = 0, len = obj.length; property < len; property++) {
 				if(callback.call(obj[property], property, obj[property]) === false) {
 					break;
 				}
 			}
 		} else {
 			for(property in obj) {
 				if(obj.hasOwnProperty(property)) {
 					if(callback.call(obj[property], property, obj[property]) === false) {
 						break;
 					}
 				}
 			}
 		}
 	},
 	event: (function() {
 		var fixEvent = function(e) {
 			e = e || window.event;
 			if(e.isFixed) return e; else e.isFixed = true;
 			if(!e.target) e.target = e.srcElement;
 			e.preventDefault = e.preventDefault || function() {this.returnValue = false;};
 			e.stopPropagation = e.stopPropagation || function() {this.cancelBubble = true;};
 			return e;
 		};
 		return {
 			add: function(elem, event, handler) {
 				if(!elem.events) {
 					elem.events = {};
 					elem.handle = function(e) {
 						var ret, handlers = elem.events[e.type];
 						e = fixEvent(e);
 						for(var i = 0, len = handlers.length; i < len; i++) {
 							if(handlers[i]) {
 								ret = handlers[i].call(elem, e);
 								if(ret === false) {
 									e.preventDefault();
 									e.stopPropagation();
 								}
 							}
 						}
 					};
 				}
 				if(!elem.events[event]) {
 					elem.events[event] = [];
 					if(elem.addEventListener) elem.addEventListener(event, elem.handle, false);
 					else if(elem.attachEvent) elem.attachEvent('on'+event, elem.handle);
 				}
 				elem.events[event].push(handler);
 			},
 			remove: function(elem, event, handler) {
 				var handlers = elem.events[event];
 				for(var i = handlers.length - 1; i >= 0; i--) {
 					if(handlers[i] === handler) {
 						handlers.splice(i,1);
 					}
 				}
 				if(!handlers.length) {
 					delete elem.events[event];
 					if(elem.removeEventListener) elem.removeEventListener(event, elem.handle, false);
 					else if(elem.detachEvent) elem.detachEvent('on'+event, elem.handle);
 				}
 			}
 		};
 	}()),
 	queryElementsBySelector: function(selector, scope) {
 		scope = scope || document;
 		if(!selector) return [];
 		if(selector === '>*') return scope.children;
 		if(typeof document.querySelectorAll === 'function') {
 			return scope.querySelectorAll(selector);
 		}
 		var selectors = selector.split(',');
 		var resultList = [];
 		for(var s = 0; s < selectors.length; s++) {
 			var currentContext = [scope || document];
 			var tokens = selectors[s].replace(/^\s+/,'').replace(/\s+$/,'').split(' ');
 			for (var i = 0; i < tokens.length; i++) {
 				token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');
 				if (token.indexOf('#') > -1) {
 					var bits = token.split('#'), tagName = bits[0], id = bits[1];
 					var element = document.getElementById(id);
 					if (element && tagName && element.nodeName.toLowerCase() != tagName) {
 						return [];
 					}
 					currentContext = element ? [element] : [];
 					continue;
 				}
 				if (token.indexOf('.') > -1) {
 					var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
 					for (var h = 0; h < currentContext.length; h++) {
 						var elements;
 						if (tagName == '*') {
 							elements = currentContext[h].getElementsByTagName('*');
 						} else {
 							elements = currentContext[h].getElementsByTagName(tagName);
 						}
 						for (var j = 0; j < elements.length; j++) {
 							found[foundCount++] = elements[j];
 						}
 					}
 					currentContext = [];
 					var currentContextIndex = 0;
 					for (var k = 0; k < found.length; k++) {
 						if (found[k].className && found[k].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
 							currentContext[currentContextIndex++] = found[k];
 						}
 					}
 					continue;
 				}
 				if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
 					var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
 					if(attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
 						attrName = 'htmlFor';
 					}
 					var found = [], foundCount = 0;
 					for (var h = 0; h < currentContext.length; h++) {
 						var elements;
 						if (tagName == '*') {
 							elements = currentContext[h].getElementsByTagName('*');
 						} else {
 							elements = currentContext[h].getElementsByTagName(tagName);
 						}
 						for (var j = 0; elements[j]; j++) {
 							found[foundCount++] = elements[j];
 						}
 					}
 					currentContext = [];
 					var currentContextIndex = 0, checkFunction;
 					switch (attrOperator) {
 						case '=': checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue) }; break;
 						case '~': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('(\\s|^)'+attrValue+'(\\s|$)'))) }; break;
 						case '|': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))) }; break;
 						case '^': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0) }; break;
 						case '$': checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length) }; break;
 						case '*': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1) }; break;
 						default : checkFunction = function(e) { return e.getAttribute(attrName) };
 					}
 					currentContext = [];
 					var currentContextIndex = 0;
 					for (var k = 0; k < found.length; k++) {
 						if (checkFunction(found[k])) {
 							currentContext[currentContextIndex++] = found[k];
 						}
 					}
 					continue;
 				}
 				tagName = token;
 				var found = [], foundCount = 0;
 				for (var h = 0; h < currentContext.length; h++) {
 					var elements = currentContext[h].getElementsByTagName(tagName);
 					for (var j = 0; j < elements.length; j++) {
 						found[foundCount++] = elements[j];
 					}
 				}
 				currentContext = found;
 			}
 			resultList = [].concat(resultList,currentContext);
 		}
 		return resultList;
 	},
 	trim: function (str) {
 		return str.replace(/^\s+/, '').replace(/\s+$/, '');
 	},
 	bind: function(f, scope, forceArgs){
 		return function() {return f.apply(scope, typeof forceArgs !== 'undefined' ? [forceArgs] : arguments);};
 	}
 };

// DOM ready handler
function bindReady(handler){
	var called = false;
	var ready = function() {
		if (called) return;
		called = true;
		handler();
	};
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', ready, false);
	} else if (document.attachEvent) {
		if (document.documentElement.doScroll && window == window.top) {
			var tryScroll = function(){
				if (called) return;
				if (!document.body) return;
				try {
					document.documentElement.doScroll('left');
					ready();
				} catch(e) {
					setTimeout(tryScroll, 0);
				}
			};
			tryScroll();
		}
		document.attachEvent('onreadystatechange', function(){
			if (document.readyState === 'complete') {
				ready();
			}
		});
	}
	if (window.addEventListener) window.addEventListener('load', ready, false);
	else if (window.attachEvent) window.attachEvent('onload', ready);
}

/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
 ;(function(root, factory) {
 	'use strict';
 	if (typeof define === 'function' && define.amd) {
 		define(['jquery'], factory);
 	} else if (typeof exports === 'object') {
 		module.exports = factory(require('jquery'));
 	} else {
 		root.jcf = factory(jQuery);
 	}
 }(this, function($) {
 	'use strict';

	// define version
	var version = '1.1.3';

	// private variables
	var customInstances = [];

	// default global options
	var commonOptions = {
		optionsKey: 'jcf',
		dataKey: 'jcf-instance',
		rtlClass: 'jcf-rtl',
		focusClass: 'jcf-focus',
		pressedClass: 'jcf-pressed',
		disabledClass: 'jcf-disabled',
		hiddenClass: 'jcf-hidden',
		resetAppearanceClass: 'jcf-reset-appearance',
		unselectableClass: 'jcf-unselectable'
	};

	// detect device type
	var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
	isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
	commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);

	var isIOS = /(iPad|iPhone).*OS ([0-9_]*) .*/.exec(navigator.userAgent);
	if(isIOS) isIOS = parseFloat(isIOS[2].replace(/_/g, '.'));
	commonOptions.ios = isIOS;

	// create global stylesheet if custom forms are used
	var createStyleSheet = function() {
		var styleTag = $('<style>').appendTo('head'),
		styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet');

		// crossbrowser style handling
		var addCSSRule = function(selector, rules, index) {
			if (styleSheet.insertRule) {
				styleSheet.insertRule(selector + '{' + rules + '}', index);
			} else {
				styleSheet.addRule(selector, rules, index);
			}
		};

		// add special rules
		addCSSRule('.' + commonOptions.hiddenClass, 'position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none');
		addCSSRule('.' + commonOptions.rtlClass + ' .' + commonOptions.hiddenClass, 'right:-9999px !important; left: auto !important');
		addCSSRule('.' + commonOptions.unselectableClass, '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);');
		addCSSRule('.' + commonOptions.resetAppearanceClass, 'background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);');

		// detect rtl pages
		var html = $('html'), body = $('body');
		if (html.css('direction') === 'rtl' || body.css('direction') === 'rtl') {
			html.addClass(commonOptions.rtlClass);
		}

		// handle form reset event
		html.on('reset', function() {
			setTimeout(function() {
				api.refreshAll();
			}, 0);
		});

		// mark stylesheet as created
		commonOptions.styleSheetCreated = true;
	};

	// simplified pointer events handler
	(function() {
		var pointerEventsSupported = navigator.pointerEnabled || navigator.msPointerEnabled,
		touchEventsSupported = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
		eventList, eventMap = {}, eventPrefix = 'jcf-';

		// detect events to attach
		if (pointerEventsSupported) {
			eventList = {
				pointerover: navigator.pointerEnabled ? 'pointerover' : 'MSPointerOver',
				pointerdown: navigator.pointerEnabled ? 'pointerdown' : 'MSPointerDown',
				pointermove: navigator.pointerEnabled ? 'pointermove' : 'MSPointerMove',
				pointerup: navigator.pointerEnabled ? 'pointerup' : 'MSPointerUp'
			};
		} else {
			eventList = {
				pointerover: 'mouseover',
				pointerdown: 'mousedown' + (touchEventsSupported ? ' touchstart' : ''),
				pointermove: 'mousemove' + (touchEventsSupported ? ' touchmove' : ''),
				pointerup: 'mouseup' + (touchEventsSupported ? ' touchend' : '')
			};
		}

		// create event map
		$.each(eventList, function(targetEventName, fakeEventList) {
			$.each(fakeEventList.split(' '), function(index, fakeEventName) {
				eventMap[fakeEventName] = targetEventName;
			});
		});

		// jQuery event hooks
		$.each(eventList, function(eventName, eventHandlers) {
			eventHandlers = eventHandlers.split(' ');
			$.event.special[eventPrefix + eventName] = {
				setup: function() {
					var self = this;
					$.each(eventHandlers, function(index, fallbackEvent) {
						if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
						else self['on' + fallbackEvent] = fixEvent;
					});
				},
				teardown: function() {
					var self = this;
					$.each(eventHandlers, function(index, fallbackEvent) {
						if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
						else self['on' + fallbackEvent] = null;
					});
				}
			};
		});

		// check that mouse event are not simulated by mobile browsers
		var lastTouch = null;
		var mouseEventSimulated = function(e) {
			var dx = Math.abs(e.pageX - lastTouch.x),
			dy = Math.abs(e.pageY - lastTouch.y),
			rangeDistance = 25;

			if (dx <= rangeDistance && dy <= rangeDistance) {
				return true;
			}
		};

		// normalize event
		var fixEvent = function(e) {
			var origEvent = e || window.event,
			touchEventData = null,
			targetEventName = eventMap[origEvent.type];

			e = $.event.fix(origEvent);
			e.type = eventPrefix + targetEventName;

			if (origEvent.pointerType) {
				switch (origEvent.pointerType) {
					case 2: e.pointerType = 'touch'; break;
					case 3: e.pointerType = 'pen'; break;
					case 4: e.pointerType = 'mouse'; break;
					default: e.pointerType = origEvent.pointerType;
				}
			} else {
				e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
			}

			if (!e.pageX && !e.pageY) {
				touchEventData = origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent;
				e.pageX = touchEventData.pageX;
				e.pageY = touchEventData.pageY;
			}

			if (origEvent.type === 'touchend') {
				lastTouch = { x: e.pageX, y: e.pageY };
			}
			if (e.pointerType === 'mouse' && lastTouch && mouseEventSimulated(e)) {
				return;
			} else {
				return ($.event.dispatch || $.event.handle).call(this, e);
			}
		};
	}());

	// custom mousewheel/trackpad handler
	(function() {
		var wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll').split(' '),
		shimEventName = 'jcf-mousewheel';

		$.event.special[shimEventName] = {
			setup: function() {
				var self = this;
				$.each(wheelEvents, function(index, fallbackEvent) {
					if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
					else self['on' + fallbackEvent] = fixEvent;
				});
			},
			teardown: function() {
				var self = this;
				$.each(wheelEvents, function(index, fallbackEvent) {
					if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
					else self['on' + fallbackEvent] = null;
				});
			}
		};

		var fixEvent = function(e) {
			var origEvent = e || window.event;
			e = $.event.fix(origEvent);
			e.type = shimEventName;

			// old wheel events handler
			if ('detail'      in origEvent) { e.deltaY = -origEvent.detail;      }
			if ('wheelDelta'  in origEvent) { e.deltaY = -origEvent.wheelDelta;  }
			if ('wheelDeltaY' in origEvent) { e.deltaY = -origEvent.wheelDeltaY; }
			if ('wheelDeltaX' in origEvent) { e.deltaX = -origEvent.wheelDeltaX; }

			// modern wheel event handler
			if ('deltaY' in origEvent) {
				e.deltaY = origEvent.deltaY;
			}
			if ('deltaX' in origEvent) {
				e.deltaX = origEvent.deltaX;
			}

			// handle deltaMode for mouse wheel
			e.delta = e.deltaY || e.deltaX;
			if (origEvent.deltaMode === 1) {
				var lineHeight = 16;
				e.delta *= lineHeight;
				e.deltaY *= lineHeight;
				e.deltaX *= lineHeight;
			}

			return ($.event.dispatch || $.event.handle).call(this, e);
		};
	}());

	// extra module methods
	var moduleMixin = {
		// provide function for firing native events
		fireNativeEvent: function(elements, eventName) {
			$(elements).each(function() {
				var element = this, eventObject;
				if (element.dispatchEvent) {
					eventObject = document.createEvent('HTMLEvents');
					eventObject.initEvent(eventName, true, true);
					element.dispatchEvent(eventObject);
				} else if (document.createEventObject) {
					eventObject = document.createEventObject();
					eventObject.target = element;
					element.fireEvent('on' + eventName, eventObject);
				}
			});
		},
		// bind event handlers for module instance (functions beggining with "on")
		bindHandlers: function() {
			var self = this;
			$.each(self, function(propName, propValue) {
				if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
					// dont use $.proxy here because it doesn't create unique handler
					self[propName] = function() {
						return propValue.apply(self, arguments);
					};
				}
			});
		}
	};

	// public API
	var api = {
		version: version,
		modules: {},
		getOptions: function() {
			return $.extend({}, commonOptions);
		},
		setOptions: function(moduleName, moduleOptions) {
			if (arguments.length > 1) {
				// set module options
				if (this.modules[moduleName]) {
					$.extend(this.modules[moduleName].prototype.options, moduleOptions);
				}
			} else {
				// set common options
				$.extend(commonOptions, moduleName);
			}
		},
		addModule: function(proto) {
			// add module to list
			var Module = function(options) {
				// save instance to collection
				if (!options.element.data(commonOptions.dataKey)) {
					options.element.data(commonOptions.dataKey, this);
				}
				customInstances.push(this);

				// save options
				this.options = $.extend({}, commonOptions, this.options, getInlineOptions(options.element), options);

				// bind event handlers to instance
				this.bindHandlers();

				// call constructor
				this.init.apply(this, arguments);
			};

			// parse options from HTML attribute
			var getInlineOptions = function(element) {
				var dataOptions = element.data(commonOptions.optionsKey),
				attrOptions = element.attr(commonOptions.optionsKey);

				if (dataOptions) {
					return dataOptions;
				} else if (attrOptions) {
					try {
						return $.parseJSON(attrOptions);
					} catch (e) {
						// ignore invalid attributes
					}
				}
			};

			// set proto as prototype for new module
			Module.prototype = proto;

			// add mixin methods to module proto
			$.extend(proto, moduleMixin);
			if (proto.plugins) {
				$.each(proto.plugins, function(pluginName, plugin) {
					$.extend(plugin.prototype, moduleMixin);
				});
			}

			// override destroy method
			var originalDestroy = Module.prototype.destroy;
			Module.prototype.destroy = function() {
				this.options.element.removeData(this.options.dataKey);

				for (var i = customInstances.length - 1; i >= 0; i--) {
					if (customInstances[i] === this) {
						customInstances.splice(i, 1);
						break;
					}
				}

				if (originalDestroy) {
					originalDestroy.apply(this, arguments);
				}
			};

			// save module to list
			this.modules[proto.name] = Module;
		},
		getInstance: function(element) {
			return $(element).data(commonOptions.dataKey);
		},
		replace: function(elements, moduleName, customOptions) {
			var self = this,
			instance;

			if (!commonOptions.styleSheetCreated) {
				createStyleSheet();
			}

			$(elements).each(function() {
				var moduleOptions,
				element = $(this);

				instance = element.data(commonOptions.dataKey);
				if (instance) {
					instance.refresh();
				} else {
					if (!moduleName) {
						$.each(self.modules, function(currentModuleName, module) {
							if (module.prototype.matchElement.call(module.prototype, element)) {
								moduleName = currentModuleName;
								return false;
							}
						});
					}
					if (moduleName) {
						moduleOptions = $.extend({ element: element }, customOptions);
						instance = new self.modules[moduleName](moduleOptions);
					}
				}
			});
			return instance;
		},
		refresh: function(elements) {
			$(elements).each(function() {
				var instance = $(this).data(commonOptions.dataKey);
				if (instance) {
					instance.refresh();
				}
			});
		},
		destroy: function(elements) {
			$(elements).each(function() {
				var instance = $(this).data(commonOptions.dataKey);
				if (instance) {
					instance.destroy();
				}
			});
		},
		replaceAll: function(context) {
			var self = this;
			$.each(this.modules, function(moduleName, module) {
				$(module.prototype.selector, context).each(function() {
					if (this.className.indexOf('jcf-ignore') < 0) {
						self.replace(this, moduleName);
					}
				});
			});
		},
		refreshAll: function(context) {
			if (context) {
				$.each(this.modules, function(moduleName, module) {
					$(module.prototype.selector, context).each(function() {
						var instance = $(this).data(commonOptions.dataKey);
						if (instance) {
							instance.refresh();
						}
					});
				});
			} else {
				for (var i = customInstances.length - 1; i >= 0; i--) {
					customInstances[i].refresh();
				}
			}
		},
		destroyAll: function(context) {
			if (context) {
				$.each(this.modules, function(moduleName, module) {
					$(module.prototype.selector, context).each(function(index, element) {
						var instance = $(element).data(commonOptions.dataKey);
						if (instance) {
							instance.destroy();
						}
					});
				});
			} else {
				while (customInstances.length) {
					customInstances[0].destroy();
				}
			}
		}
	};

	// always export API to the global window object
	window.jcf = api;

	return api;
}));

/*!
 * JavaScript Custom Forms : Select Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
 ;(function($, window) {
 	'use strict';

 	jcf.addModule({
 		name: 'Select',
 		selector: 'select',
 		options: {
 			element: null,
 			multipleCompactStyle: false
 		},
 		plugins: {
 			ListBox: ListBox,
 			ComboBox: ComboBox,
 			SelectList: SelectList
 		},
 		matchElement: function(element) {
 			return element.is('select');
 		},
 		init: function() {
 			this.element = $(this.options.element);
 			this.createInstance();
 		},
 		isListBox: function() {
 			return this.element.is('[size]:not([jcf-size]), [multiple]');
 		},
 		createInstance: function() {
 			if (this.instance) {
 				this.instance.destroy();
 			}
 			if (this.isListBox() && !this.options.multipleCompactStyle) {
 				this.instance = new ListBox(this.options);
 			} else {
 				this.instance = new ComboBox(this.options);
 			}
 		},
 		refresh: function() {
 			var typeMismatch = (this.isListBox() && this.instance instanceof ComboBox) ||
 			(!this.isListBox() && this.instance instanceof ListBox);

 			if (typeMismatch) {
 				this.createInstance();
 			} else {
 				this.instance.refresh();
 			}
 		},
 		destroy: function() {
 			this.instance.destroy();
 		}
 	});

	// combobox module
	function ComboBox(options) {
		this.options = $.extend({
			wrapNative: true,
			wrapNativeOnMobile: true,
			fakeDropInBody: true,
			useCustomScroll: true,
			flipDropToFit: true,
			maxVisibleItems: 10,
			fakeAreaStructure: '<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',
			fakeDropStructure: '<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',
			optionClassPrefix: 'jcf-option-',
			selectClassPrefix: 'jcf-select-',
			dropContentSelector: '.jcf-select-drop-content',
			selectTextSelector: '.jcf-select-text',
			dropActiveClass: 'jcf-drop-active',
			flipDropClass: 'jcf-drop-flipped'
		}, options);
		this.init();
	}
	$.extend(ComboBox.prototype, {
		init: function() {
			this.initStructure();
			this.bindHandlers();
			this.attachEvents();
			this.refresh();
		},
		initStructure: function() {
			// prepare structure
			this.win = $(window);
			this.doc = $(document);
			this.realElement = $(this.options.element);
			this.fakeElement = $(this.options.fakeAreaStructure).insertAfter(this.realElement);
			this.selectTextContainer = this.fakeElement.find(this.options.selectTextSelector);
			this.selectText = $('<span></span>').appendTo(this.selectTextContainer);
			makeUnselectable(this.fakeElement);

			// copy classes from original select
			this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));

			// handle compact multiple style
			if (this.realElement.prop('multiple')) {
				this.fakeElement.addClass('jcf-compact-multiple');
			}

			// detect device type and dropdown behavior
			if (this.options.isMobileDevice && this.options.wrapNativeOnMobile && !this.options.wrapNative) {
				this.options.wrapNative = true;
			}

			if (this.options.wrapNative) {
				// wrap native select inside fake block
				this.realElement.prependTo(this.fakeElement).css({
					position: 'absolute',
					height: '100%',
					width: '100%'
				}).addClass(this.options.resetAppearanceClass);
			} else {
				// just hide native select
				this.realElement.addClass(this.options.hiddenClass);
				this.fakeElement.attr('title', this.realElement.attr('title'));
				this.fakeDropTarget = this.options.fakeDropInBody ? $('body') : this.fakeElement;
			}
		},
		attachEvents: function() {
			// delayed refresh handler
			var self = this;
			this.delayedRefresh = function() {
				setTimeout(function() {
					self.refresh();
					if (self.list) {
						self.list.refresh();
						self.list.scrollToActiveOption();
					}
				}, 1);
			};

			// native dropdown event handlers
			if (this.options.wrapNative) {
				this.realElement.on({
					focus: this.onFocus,
					change: this.onChange,
					click: this.onChange,
					keydown: this.onChange
				});
			} else {
				// custom dropdown event handlers
				this.realElement.on({
					focus: this.onFocus,
					change: this.onChange,
					keydown: this.onKeyDown
				});
				this.fakeElement.on({
					'jcf-pointerdown': this.onSelectAreaPress
				});
			}
		},
		onKeyDown: function(e) {
			if (e.which === 13) {
				this.toggleDropdown();
			} else if (this.dropActive) {
				this.delayedRefresh();
			}
		},
		onChange: function() {
			this.refresh();
		},
		onFocus: function() {
			if (!this.pressedFlag || !this.focusedFlag) {
				this.fakeElement.addClass(this.options.focusClass);
				this.realElement.on('blur', this.onBlur);
				this.toggleListMode(true);
				this.focusedFlag = true;
			}
		},
		onBlur: function() {
			if (!this.pressedFlag) {
				this.fakeElement.removeClass(this.options.focusClass);
				this.realElement.off('blur', this.onBlur);
				this.toggleListMode(false);
				this.focusedFlag = false;
			}
		},
		onResize: function() {
			if (this.dropActive) {
				this.hideDropdown();
			}
		},
		onSelectDropPress: function() {
			this.pressedFlag = true;
		},
		onSelectDropRelease: function(e, pointerEvent) {
			this.pressedFlag = false;
			if (pointerEvent.pointerType === 'mouse') {
				this.realElement.focus();
			}
		},
		onSelectAreaPress: function(e) {
			// skip click if drop inside fake element or real select is disabled
			var dropClickedInsideFakeElement = !this.options.fakeDropInBody && $(e.target).closest(this.dropdown).length;
			if (dropClickedInsideFakeElement || e.button > 1 || this.realElement.is(':disabled')) {
				return;
			}

			// toggle dropdown visibility
			this.selectOpenedByEvent = e.pointerType;
			this.toggleDropdown();

			// misc handlers
			if (!this.focusedFlag) {
				if (e.pointerType === 'mouse') {
					this.realElement.focus();
				} else {
					this.onFocus(e);
				}
			}
			this.pressedFlag = true;
			this.fakeElement.addClass(this.options.pressedClass);
			this.doc.on('jcf-pointerup', this.onSelectAreaRelease);
		},
		onSelectAreaRelease: function(e) {
			if (this.focusedFlag && e.pointerType === 'mouse') {
				this.realElement.focus();
			}
			this.pressedFlag = false;
			this.fakeElement.removeClass(this.options.pressedClass);
			this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
		},
		onOutsideClick: function(e) {
			var target = $(e.target),
			clickedInsideSelect = target.closest(this.fakeElement).length || target.closest(this.dropdown).length;

			if (!clickedInsideSelect) {
				this.hideDropdown();
			}
		},
		onSelect: function() {
			this.refresh();

			if (this.realElement.prop('multiple')) {
				this.repositionDropdown();
			} else {
				this.hideDropdown();
			}

			this.fireNativeEvent(this.realElement, 'change');
		},
		toggleListMode: function(state) {
			if (!this.options.wrapNative) {
				if (state) {
					// temporary change select to list to avoid appearing of native dropdown
					this.realElement.attr({
						size: 4,
						'jcf-size': ''
					});
				} else {
					// restore select from list mode to dropdown select
					if (!this.options.wrapNative) {
						this.realElement.removeAttr('size jcf-size');
					}
				}
			}
		},
		createDropdown: function() {
			// destroy previous dropdown if needed
			if (this.dropdown) {
				this.list.destroy();
				this.dropdown.remove();
			}

			// create new drop container
			this.dropdown = $(this.options.fakeDropStructure).appendTo(this.fakeDropTarget);
			this.dropdown.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
			makeUnselectable(this.dropdown);

			// handle compact multiple style
			if (this.realElement.prop('multiple')) {
				this.dropdown.addClass('jcf-compact-multiple');
			}

			// set initial styles for dropdown in body
			if (this.options.fakeDropInBody) {
				this.dropdown.css({
					position: 'absolute',
					top: -9999
				});
			}

			// create new select list instance
			this.list = new SelectList({
				useHoverClass: true,
				handleResize: false,
				alwaysPreventMouseWheel: true,
				maxVisibleItems: this.options.maxVisibleItems,
				useCustomScroll: this.options.useCustomScroll,
				holder: this.dropdown.find(this.options.dropContentSelector),
				multipleSelectWithoutKey: this.realElement.prop('multiple'),
				element: this.realElement
			});
			$(this.list).on({
				select: this.onSelect,
				press: this.onSelectDropPress,
				release: this.onSelectDropRelease
			});
		},
		repositionDropdown: function() {
			var selectOffset = this.fakeElement.offset(),
			selectWidth = this.fakeElement.outerWidth(),
			selectHeight = this.fakeElement.outerHeight(),
			dropHeight = this.dropdown.css('width', selectWidth).outerHeight(),
			winScrollTop = this.win.scrollTop(),
			winHeight = this.win.height(),
			calcTop, calcLeft, bodyOffset, needFlipDrop = false;

			// check flip drop position
			if (selectOffset.top + selectHeight + dropHeight > winScrollTop + winHeight && selectOffset.top - dropHeight > winScrollTop) {
				needFlipDrop = true;
			}

			if (this.options.fakeDropInBody) {
				bodyOffset = this.fakeDropTarget.css('position') !== 'static' ? this.fakeDropTarget.offset().top : 0;
				if (this.options.flipDropToFit && needFlipDrop) {
					// calculate flipped dropdown position
					calcLeft = selectOffset.left;
					calcTop = selectOffset.top - dropHeight - bodyOffset;
				} else {
					// calculate default drop position
					calcLeft = selectOffset.left;
					calcTop = selectOffset.top + selectHeight - bodyOffset;
				}

				// update drop styles
				this.dropdown.css({
					width: selectWidth,
					left: calcLeft,
					top: calcTop
				});
			}

			// refresh flipped class
			this.dropdown.add(this.fakeElement).toggleClass(this.options.flipDropClass, this.options.flipDropToFit && needFlipDrop);
		},
		showDropdown: function() {
			// do not show empty custom dropdown
			if (!this.realElement.prop('options').length) {
				return;
			}

			// create options list if not created
			if (!this.dropdown) {
				this.createDropdown();
			}

			// show dropdown
			this.dropActive = true;
			this.dropdown.appendTo(this.fakeDropTarget);
			this.fakeElement.addClass(this.options.dropActiveClass);
			this.refreshSelectedText();
			this.repositionDropdown();
			this.list.setScrollTop(this.savedScrollTop);
			this.list.refresh();

			// add temporary event handlers
			this.win.on('resize', this.onResize);
			this.doc.on('jcf-pointerdown', this.onOutsideClick);
		},
		hideDropdown: function() {
			if (this.dropdown) {
				this.savedScrollTop = this.list.getScrollTop();
				this.fakeElement.removeClass(this.options.dropActiveClass + ' ' + this.options.flipDropClass);
				this.dropdown.removeClass(this.options.flipDropClass).detach();
				this.doc.off('jcf-pointerdown', this.onOutsideClick);
				this.win.off('resize', this.onResize);
				this.dropActive = false;
				if (this.selectOpenedByEvent === 'touch') {
					this.onBlur();
				}
			}
		},
		toggleDropdown: function() {
			if (this.dropActive) {
				this.hideDropdown();
			} else {
				this.showDropdown();
			}
		},
		refreshSelectedText: function() {
			// redraw selected area
			var selectedIndex = this.realElement.prop('selectedIndex'),
			selectedOption = this.realElement.prop('options')[selectedIndex],
			selectedOptionImage = selectedOption ? selectedOption.getAttribute('data-image') : null,
			selectedOptionText = '',
			selectedOptionClasses,
			self = this;

			if (this.realElement.prop('multiple')) {
				$.each(this.realElement.prop('options'), function(index, option) {
					if (option.selected) {
						selectedOptionText += (selectedOptionText ? ', ' : '') + option.innerHTML;
					}
				});
				if (!selectedOptionText) {
					selectedOptionText = self.realElement.attr('placeholder') || '';
				}
				this.selectText.removeAttr('class').html(selectedOptionText);
			} else if (!selectedOption) {
				if (this.selectImage) {
					this.selectImage.hide();
				}
				this.selectText.removeAttr('class').empty();
			} else if (this.currentSelectedText !== selectedOption.innerHTML || this.currentSelectedImage !== selectedOptionImage) {
				selectedOptionClasses = getPrefixedClasses(selectedOption.className, this.options.optionClassPrefix);
				this.selectText.attr('class', selectedOptionClasses).html(selectedOption.innerHTML);

				if (selectedOptionImage) {
					if (!this.selectImage) {
						this.selectImage = $('<img>').prependTo(this.selectTextContainer).hide();
					}
					this.selectImage.attr('src', selectedOptionImage).show();
				} else if (this.selectImage) {
					this.selectImage.hide();
				}

				this.currentSelectedText = selectedOption.innerHTML;
				this.currentSelectedImage = selectedOptionImage;
			}
		},
		refresh: function() {
			// refresh fake select visibility
			if (this.realElement.prop('style').display === 'none') {
				this.fakeElement.hide();
			} else {
				this.fakeElement.show();
			}

			// refresh selected text
			this.refreshSelectedText();

			// handle disabled state
			this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
		},
		destroy: function() {
			// restore structure
			if (this.options.wrapNative) {
				this.realElement.insertBefore(this.fakeElement).css({
					position: '',
					height: '',
					width: ''
				}).removeClass(this.options.resetAppearanceClass);
			} else {
				this.realElement.removeClass(this.options.hiddenClass);
				if (this.realElement.is('[jcf-size]')) {
					this.realElement.removeAttr('size jcf-size');
				}
			}

			// removing element will also remove its event handlers
			this.fakeElement.remove();

			// remove other event handlers
			this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
			this.realElement.off({
				focus: this.onFocus
			});
		}
	});

	// listbox module
	function ListBox(options) {
		this.options = $.extend({
			wrapNative: true,
			useCustomScroll: true,
			fakeStructure: '<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',
			selectClassPrefix: 'jcf-select-',
			listHolder: '.jcf-list-wrapper'
		}, options);
		this.init();
	}
	$.extend(ListBox.prototype, {
		init: function() {
			this.bindHandlers();
			this.initStructure();
			this.attachEvents();
		},
		initStructure: function() {
			this.realElement = $(this.options.element);
			this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
			this.listHolder = this.fakeElement.find(this.options.listHolder);
			makeUnselectable(this.fakeElement);

			// copy classes from original select
			this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
			this.realElement.addClass(this.options.hiddenClass);

			this.list = new SelectList({
				useCustomScroll: this.options.useCustomScroll,
				holder: this.listHolder,
				selectOnClick: false,
				element: this.realElement
			});
		},
		attachEvents: function() {
			// delayed refresh handler
			var self = this;
			this.delayedRefresh = function(e) {
				if (e && e.which === 16) {
					// ignore SHIFT key
					return;
				} else {
					clearTimeout(self.refreshTimer);
					self.refreshTimer = setTimeout(function() {
						self.refresh();
						self.list.scrollToActiveOption();
					}, 1);
				}
			};

			// other event handlers
			this.realElement.on({
				focus: this.onFocus,
				click: this.delayedRefresh,
				keydown: this.delayedRefresh
			});

			// select list event handlers
			$(this.list).on({
				select: this.onSelect,
				press: this.onFakeOptionsPress,
				release: this.onFakeOptionsRelease
			});
		},
		onFakeOptionsPress: function(e, pointerEvent) {
			this.pressedFlag = true;
			if (pointerEvent.pointerType === 'mouse') {
				this.realElement.focus();
			}
		},
		onFakeOptionsRelease: function(e, pointerEvent) {
			this.pressedFlag = false;
			if (pointerEvent.pointerType === 'mouse') {
				this.realElement.focus();
			}
		},
		onSelect: function() {
			this.fireNativeEvent(this.realElement, 'change');
			this.fireNativeEvent(this.realElement, 'click');
		},
		onFocus: function() {
			if (!this.pressedFlag || !this.focusedFlag) {
				this.fakeElement.addClass(this.options.focusClass);
				this.realElement.on('blur', this.onBlur);
				this.focusedFlag = true;
			}
		},
		onBlur: function() {
			if (!this.pressedFlag) {
				this.fakeElement.removeClass(this.options.focusClass);
				this.realElement.off('blur', this.onBlur);
				this.focusedFlag = false;
			}
		},
		refresh: function() {
			this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
			this.list.refresh();
		},
		destroy: function() {
			this.list.destroy();
			this.realElement.insertBefore(this.fakeElement).removeClass(this.options.hiddenClass);
			this.fakeElement.remove();
		}
	});

	// options list module
	function SelectList(options) {
		this.options = $.extend({
			holder: null,
			maxVisibleItems: 10,
			selectOnClick: true,
			useHoverClass: false,
			useCustomScroll: false,
			handleResize: true,
			multipleSelectWithoutKey: false,
			alwaysPreventMouseWheel: false,
			indexAttribute: 'data-index',
			cloneClassPrefix: 'jcf-option-',
			containerStructure: '<span class="jcf-list"><span class="jcf-list-content"></span></span>',
			containerSelector: '.jcf-list-content',
			captionClass: 'jcf-optgroup-caption',
			disabledClass: 'jcf-disabled',
			optionClass: 'jcf-option',
			groupClass: 'jcf-optgroup',
			hoverClass: 'jcf-hover',
			selectedClass: 'jcf-selected',
			scrollClass: 'jcf-scroll-active'
		}, options);
		this.init();
	}
	$.extend(SelectList.prototype, {
		init: function() {
			this.initStructure();
			this.refreshSelectedClass();
			this.attachEvents();
		},
		initStructure: function() {
			this.element = $(this.options.element);
			this.indexSelector = '[' + this.options.indexAttribute + ']';
			this.container = $(this.options.containerStructure).appendTo(this.options.holder);
			this.listHolder = this.container.find(this.options.containerSelector);
			this.lastClickedIndex = this.element.prop('selectedIndex');
			this.rebuildList();
		},
		attachEvents: function() {
			this.bindHandlers();
			this.listHolder.on('jcf-pointerdown', this.indexSelector, this.onItemPress);
			this.listHolder.on('jcf-pointerdown', this.onPress);

			if (this.options.useHoverClass) {
				this.listHolder.on('jcf-pointerover', this.indexSelector, this.onHoverItem);
			}
		},
		onPress: function(e) {
			$(this).trigger('press', e);
			this.listHolder.on('jcf-pointerup', this.onRelease);
		},
		onRelease: function(e) {
			$(this).trigger('release', e);
			this.listHolder.off('jcf-pointerup', this.onRelease);
		},
		onHoverItem: function(e) {
			var hoverIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute));
			this.fakeOptions.removeClass(this.options.hoverClass).eq(hoverIndex).addClass(this.options.hoverClass);
		},
		onItemPress: function(e) {
			if (e.pointerType === 'touch' || this.options.selectOnClick) {
				// select option after "click"
				this.tmpListOffsetTop = this.list.offset().top;
				this.listHolder.on('jcf-pointerup', this.indexSelector, this.onItemRelease);
			} else {
				// select option immediately
				this.onSelectItem(e);
			}
		},
		onItemRelease: function(e) {
			// remove event handlers and temporary data
			this.listHolder.off('jcf-pointerup', this.indexSelector, this.onItemRelease);

			// simulate item selection
			if (this.tmpListOffsetTop === this.list.offset().top) {
				this.listHolder.on('click', this.indexSelector, { savedPointerType: e.pointerType }, this.onSelectItem);
			}
			delete this.tmpListOffsetTop;
		},
		onSelectItem: function(e) {
			var clickedIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute)),
			pointerType = e.data && e.data.savedPointerType || e.pointerType || 'mouse',
			range;

			// remove click event handler
			this.listHolder.off('click', this.indexSelector, this.onSelectItem);

			// ignore clicks on disabled options
			if (e.button > 1 || this.realOptions[clickedIndex].disabled) {
				return;
			}

			if (this.element.prop('multiple')) {
				if (e.metaKey || e.ctrlKey || pointerType === 'touch' || this.options.multipleSelectWithoutKey) {
					// if CTRL/CMD pressed or touch devices - toggle selected option
					this.realOptions[clickedIndex].selected = !this.realOptions[clickedIndex].selected;
				} else if (e.shiftKey) {
					// if SHIFT pressed - update selection
					range = [this.lastClickedIndex, clickedIndex].sort(function(a, b) {
						return a - b;
					});
					this.realOptions.each(function(index, option) {
						option.selected = (index >= range[0] && index <= range[1]);
					});
				} else {
					// set single selected index
					this.element.prop('selectedIndex', clickedIndex);
				}
			} else {
				this.element.prop('selectedIndex', clickedIndex);
			}

			// save last clicked option
			if (!e.shiftKey) {
				this.lastClickedIndex = clickedIndex;
			}

			// refresh classes
			this.refreshSelectedClass();

			// scroll to active item in desktop browsers
			if (pointerType === 'mouse') {
				this.scrollToActiveOption();
			}

			// make callback when item selected
			$(this).trigger('select');
		},
		rebuildList: function() {
			// rebuild options
			var self = this,
			rootElement = this.element[0];

			// recursively create fake options
			this.storedSelectHTML = rootElement.innerHTML;
			this.optionIndex = 0;
			this.list = $(this.createOptionsList(rootElement));
			this.listHolder.empty().append(this.list);
			this.realOptions = this.element.find('option');
			this.fakeOptions = this.list.find(this.indexSelector);
			this.fakeListItems = this.list.find('.' + this.options.captionClass + ',' + this.indexSelector);
			delete this.optionIndex;

			// detect max visible items
			var maxCount = this.options.maxVisibleItems,
			sizeValue = this.element.prop('size');
			if (sizeValue > 1 && !this.element.is('[jcf-size]')) {
				maxCount = sizeValue;
			}

			// handle scrollbar
			var needScrollBar = this.fakeOptions.length > maxCount;
			this.container.toggleClass(this.options.scrollClass, needScrollBar);
			if (needScrollBar) {
				// change max-height
				this.listHolder.css({
					maxHeight: this.getOverflowHeight(maxCount),
					overflow: 'auto'
				});

				if (this.options.useCustomScroll && jcf.modules.Scrollable) {
					// add custom scrollbar if specified in options
					jcf.replace(this.listHolder, 'Scrollable', {
						handleResize: this.options.handleResize,
						alwaysPreventMouseWheel: this.options.alwaysPreventMouseWheel
					});
					return;
				}
			}

			// disable edge wheel scrolling
			if (this.options.alwaysPreventMouseWheel) {
				this.preventWheelHandler = function(e) {
					var currentScrollTop = self.listHolder.scrollTop(),
					maxScrollTop = self.listHolder.prop('scrollHeight') - self.listHolder.innerHeight();

					// check edge cases
					if ((currentScrollTop <= 0 && e.deltaY < 0) || (currentScrollTop >= maxScrollTop && e.deltaY > 0)) {
						e.preventDefault();
					}
				};
				this.listHolder.on('jcf-mousewheel', this.preventWheelHandler);
			}
		},
		refreshSelectedClass: function() {
			var self = this,
			selectedItem,
			isMultiple = this.element.prop('multiple'),
			selectedIndex = this.element.prop('selectedIndex');

			if (isMultiple) {
				this.realOptions.each(function(index, option) {
					self.fakeOptions.eq(index).toggleClass(self.options.selectedClass, !!option.selected);
				});
			} else {
				this.fakeOptions.removeClass(this.options.selectedClass + ' ' + this.options.hoverClass);
				selectedItem = this.fakeOptions.eq(selectedIndex).addClass(this.options.selectedClass);
				if (this.options.useHoverClass) {
					selectedItem.addClass(this.options.hoverClass);
				}
			}
		},
		scrollToActiveOption: function() {
			// scroll to target option
			var targetOffset = this.getActiveOptionOffset();
			if (typeof targetOffset === 'number') {
				this.listHolder.prop('scrollTop', targetOffset);
			}
		},
		getSelectedIndexRange: function() {
			var firstSelected = -1, lastSelected = -1;
			this.realOptions.each(function(index, option) {
				if (option.selected) {
					if (firstSelected < 0) {
						firstSelected = index;
					}
					lastSelected = index;
				}
			});
			return [firstSelected, lastSelected];
		},
		getChangedSelectedIndex: function() {
			var selectedIndex = this.element.prop('selectedIndex'),
			targetIndex;

			if (this.element.prop('multiple')) {
				// multiple selects handling
				if (!this.previousRange) {
					this.previousRange = [selectedIndex, selectedIndex];
				}
				this.currentRange = this.getSelectedIndexRange();
				targetIndex = this.currentRange[this.currentRange[0] !== this.previousRange[0] ? 0 : 1];
				this.previousRange = this.currentRange;
				return targetIndex;
			} else {
				// single choice selects handling
				return selectedIndex;
			}
		},
		getActiveOptionOffset: function() {
			// calc values
			var dropHeight = this.listHolder.height(),
			dropScrollTop = this.listHolder.prop('scrollTop'),
			currentIndex = this.getChangedSelectedIndex(),
			fakeOption = this.fakeOptions.eq(currentIndex),
			fakeOptionOffset = fakeOption.offset().top - this.list.offset().top,
			fakeOptionHeight = fakeOption.innerHeight();

			// scroll list
			if (fakeOptionOffset + fakeOptionHeight >= dropScrollTop + dropHeight) {
				// scroll down (always scroll to option)
				return fakeOptionOffset - dropHeight + fakeOptionHeight;
			} else if (fakeOptionOffset < dropScrollTop) {
				// scroll up to option
				return fakeOptionOffset;
			}
		},
		getOverflowHeight: function(sizeValue) {
			var item = this.fakeListItems.eq(sizeValue - 1),
			listOffset = this.list.offset().top,
			itemOffset = item.offset().top,
			itemHeight = item.innerHeight();

			return itemOffset + itemHeight - listOffset;
		},
		getScrollTop: function() {
			return this.listHolder.scrollTop();
		},
		setScrollTop: function(value) {
			this.listHolder.scrollTop(value);
		},
		createOption: function(option) {
			var newOption = document.createElement('span');
			newOption.className = this.options.optionClass;
			newOption.innerHTML = option.innerHTML;
			newOption.setAttribute(this.options.indexAttribute, this.optionIndex++);

			var optionImage, optionImageSrc = option.getAttribute('data-image');
			if (optionImageSrc) {
				optionImage = document.createElement('img');
				optionImage.src = optionImageSrc;
				newOption.insertBefore(optionImage, newOption.childNodes[0]);
			}
			if (option.disabled) {
				newOption.className += ' ' + this.options.disabledClass;
			}
			if (option.className) {
				newOption.className += ' ' + getPrefixedClasses(option.className, this.options.cloneClassPrefix);
			}
			return newOption;
		},
		createOptGroup: function(optgroup) {
			var optGroupContainer = document.createElement('span'),
			optGroupName = optgroup.getAttribute('label'),
			optGroupCaption, optGroupList;

			// create caption
			optGroupCaption = document.createElement('span');
			optGroupCaption.className = this.options.captionClass;
			optGroupCaption.innerHTML = optGroupName;
			optGroupContainer.appendChild(optGroupCaption);

			// create list of options
			if (optgroup.children.length) {
				optGroupList = this.createOptionsList(optgroup);
				optGroupContainer.appendChild(optGroupList);
			}

			optGroupContainer.className = this.options.groupClass;
			return optGroupContainer;
		},
		createOptionContainer: function() {
			var optionContainer = document.createElement('li');
			return optionContainer;
		},
		createOptionsList: function(container) {
			var self = this,
			list = document.createElement('ul');

			$.each(container.children, function(index, currentNode) {
				var item = self.createOptionContainer(currentNode),
				newNode;

				switch (currentNode.tagName.toLowerCase()) {
					case 'option': newNode = self.createOption(currentNode); break;
					case 'optgroup': newNode = self.createOptGroup(currentNode); break;
				}
				list.appendChild(item).appendChild(newNode);
			});
			return list;
		},
		refresh: function() {
			// check for select innerHTML changes
			if (this.storedSelectHTML !== this.element.prop('innerHTML')) {
				this.rebuildList();
			}

			// refresh custom scrollbar
			var scrollInstance = jcf.getInstance(this.listHolder);
			if (scrollInstance) {
				scrollInstance.refresh();
			}

			// refresh selectes classes
			this.refreshSelectedClass();
		},
		destroy: function() {
			this.listHolder.off('jcf-mousewheel', this.preventWheelHandler);
			this.listHolder.off('jcf-pointerdown', this.indexSelector, this.onSelectItem);
			this.listHolder.off('jcf-pointerover', this.indexSelector, this.onHoverItem);
			this.listHolder.off('jcf-pointerdown', this.onPress);
		}
	});

	// helper functions
	var getPrefixedClasses = function(className, prefixToAdd) {
		return className ? className.replace(/[\s]*([\S]+)+[\s]*/gi, prefixToAdd + '$1 ') : '';
	};
	var makeUnselectable = (function() {
		var unselectableClass = jcf.getOptions().unselectableClass;
		function preventHandler(e) {
			e.preventDefault();
		}
		return function(node) {
			node.addClass(unselectableClass).on('selectstart', preventHandler);
		};
	}());

}(jQuery, this));


/*!
 * SmoothScroll module
 */
 ;(function($, exports) {
	// private variables
	var page,
	win = $(window),
	activeBlock, activeWheelHandler,
	wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll');

	// animation handlers
	function scrollTo(offset, options, callback) {
		// initialize variables
		var scrollBlock;
		if (document.body) {
			if (typeof options === 'number') {
				options = { duration: options };
			} else {
				options = options || {};
			}
			page = page || $('html, body');
			scrollBlock = options.container || page;
		} else {
			return;
		}

		// treat single number as scrollTop
		if (typeof offset === 'number') {
			offset = { top: offset };
		}

		// handle mousewheel/trackpad while animation is active
		if (activeBlock && activeWheelHandler) {
			activeBlock.off(wheelEvents, activeWheelHandler);
		}
		if (options.wheelBehavior && options.wheelBehavior !== 'none') {
			activeWheelHandler = function(e) {
				if (options.wheelBehavior === 'stop') {
					scrollBlock.off(wheelEvents, activeWheelHandler);
					scrollBlock.stop();
				} else if (options.wheelBehavior === 'ignore') {
					e.preventDefault();
				}
			};
			activeBlock = scrollBlock.on(wheelEvents, activeWheelHandler);
		}

		// start scrolling animation
		scrollBlock.stop().animate({
			scrollLeft: offset.left,
			scrollTop: offset.top
		}, options.duration, function() {
			if (activeWheelHandler) {
				scrollBlock.off(wheelEvents, activeWheelHandler);
			}
			if ($.isFunction(callback)) {
				callback();
			}
		});
	}

	// smooth scroll contstructor
	function SmoothScroll(options) {
		this.options = $.extend({
			anchorLinks: 'a[href^="#"]',	// selector or jQuery object
			container: null,		// specify container for scrolling (default - whole page)
			extraOffset: null,		// function or fixed number
			activeClasses: null,	// null, "link", "parent"
			easing: 'swing',		// easing of scrolling
			animMode: 'duration',	// or "speed" mode
			animDuration: 800,		// total duration for scroll (any distance)
			animSpeed: 1500,		// pixels per second
			anchorActiveClass: 'anchor-active',
			sectionActiveClass: 'section-active',
			wheelBehavior: 'stop', // "stop", "ignore" or "none"
			useNativeAnchorScrolling: false // do not handle click in devices with native smooth scrolling
		}, options);
		this.init();
	}
	SmoothScroll.prototype = {
		init: function() {
			this.initStructure();
			this.attachEvents();
		},
		initStructure: function() {
			var self = this;

			this.container = this.options.container ? $(this.options.container) : $('html,body');
			this.scrollContainer = this.options.container ? this.container : win;
			this.anchorLinks = jQuery(this.options.anchorLinks).filter(function() {
				return document.getElementById(this.getAttribute('href').slice(1));
			});
		},
		getAnchorTarget: function(link) {
			// get target block from link href
			var targetId = $(link).attr('href');
			return $(targetId.length > 1 ? targetId : 'html');
		},
		getTargetOffset: function(block) {
			// get target offset
			var blockOffset = block.offset().top;
			if (this.options.container) {
				blockOffset -= this.container.offset().top - this.container.prop('scrollTop');
			}

			// handle extra offset
			if (typeof this.options.extraOffset === 'number') {
				blockOffset -= this.options.extraOffset;
			} else if (typeof this.options.extraOffset === 'function') {
				blockOffset -= this.options.extraOffset(block);
			}
			return { top: blockOffset };
		},
		attachEvents: function() {
			var self = this;

			// handle active classes
			if (this.options.activeClasses && this.anchorLinks.length) {
				// cache structure
				this.anchorData = [];

				for (var i = 0; i < this.anchorLinks.length; i++) {
					var link = jQuery(this.anchorLinks[i]),
					targetBlock = self.getAnchorTarget(link),
					anchorDataItem;

					$.each(self.anchorData, function(index, item) {
						if (item.block[0] === targetBlock[0]) {
							anchorDataItem = item;
						}
					});

					if (anchorDataItem) {
						anchorDataItem.link = anchorDataItem.link.add(link);
					} else {
						self.anchorData.push({
							link: link,
							block: targetBlock
						});
					}
				};

				// add additional event handlers
				this.resizeHandler = function() {
					self.recalculateOffsets();
				};
				this.scrollHandler = function() {
					self.refreshActiveClass();
				};

				this.recalculateOffsets();
				this.scrollContainer.on('scroll', this.scrollHandler);
				win.on('resize', this.resizeHandler);
			}

			// handle click event
			this.clickHandler = function(e) {
				self.onClick(e);
			};
			if (!this.options.useNativeAnchorScrolling) {
				this.anchorLinks.on('click', this.clickHandler);
			}
		},
		recalculateOffsets: function() {
			var self = this;
			$.each(this.anchorData, function(index, data) {
				data.offset = self.getTargetOffset(data.block);
				data.height = data.block.outerHeight();
			});
			this.refreshActiveClass();
		},
		refreshActiveClass: function() {
			var self = this,
			foundFlag = false,
			containerHeight = this.container.prop('scrollHeight'),
			viewPortHeight = this.scrollContainer.height(),
			scrollTop = this.options.container ? this.container.prop('scrollTop') : win.scrollTop();

			// user function instead of default handler
			if (this.options.customScrollHandler) {
				this.options.customScrollHandler.call(this, scrollTop, this.anchorData);
				return;
			}

			// sort anchor data by offsets
			this.anchorData.sort(function(a, b) {
				return a.offset.top - b.offset.top;
			});
			function toggleActiveClass(anchor, block, state) {
				anchor.toggleClass(self.options.anchorActiveClass, state);
				block.toggleClass(self.options.sectionActiveClass, state);
			}

			// default active class handler
			$.each(this.anchorData, function(index) {
				var reverseIndex = self.anchorData.length - index - 1,
				data = self.anchorData[reverseIndex],
				anchorElement = (self.options.activeClasses === 'parent' ? data.link.parent() : data.link);

				if (scrollTop >= containerHeight - viewPortHeight) {
					// handle last section
					if (reverseIndex === self.anchorData.length - 1) {
						toggleActiveClass(anchorElement, data.block, true);
					} else {
						toggleActiveClass(anchorElement, data.block, false);
					}
				} else {
					// handle other sections
					if (!foundFlag && (scrollTop >= data.offset.top - 1 || reverseIndex === 0)) {
						foundFlag = true;
						toggleActiveClass(anchorElement, data.block, true);
					} else {
						toggleActiveClass(anchorElement, data.block, false);
					}
				}
			});
		},
		calculateScrollDuration: function(offset) {
			var distance;
			if (this.options.animMode === 'speed') {
				distance = Math.abs(this.scrollContainer.scrollTop() - offset.top);
				return (distance / this.options.animSpeed) * 1000;
			} else {
				return this.options.animDuration;
			}
		},
		onClick: function(e) {
			var targetBlock = this.getAnchorTarget(e.currentTarget),
			targetOffset = this.getTargetOffset(targetBlock);

			e.preventDefault();
			scrollTo(targetOffset, {
				container: this.container,
				wheelBehavior: this.options.wheelBehavior,
				duration: this.calculateScrollDuration(targetOffset)
			});
		},
		destroy: function() {
			if (this.options.activeClasses) {
				win.off('resize', this.resizeHandler);
				this.scrollContainer.off('scroll', this.scrollHandler);
			}
			this.anchorLinks.off('click', this.clickHandler);
		}
	};

	// public API
	$.extend(SmoothScroll, {
		scrollTo: function(blockOrOffset, durationOrOptions, callback) {
			scrollTo(blockOrOffset, durationOrOptions, callback);
		}
	});

	// export module
	exports.SmoothScroll = SmoothScroll;
}(jQuery, this));

// add class on click module
function AddClass(opt) {
	this.options = lib.extend({
		item: null,
		classAdd: 'add-class',
		addToParent: false,
		event: 'click'
	}, opt);
	if(this.options.item) {
		this.item = this.options.item;
		this.classItem = this.item;
		if(this.options.addToParent) {
			if(typeof this.options.addToParent === 'boolean') {
				this.classItem = this.item.parentNode;
			} else {
				while(this.classItem.parentNode) {
					if(lib.hasClass(this.classItem.parentNode, this.options.addToParent)) {
						this.classItem = this.classItem.parentNode;
						break;
					}
					this.classItem = this.classItem.parentNode;
				}
			}
		}
		this.attachEvents();
	}
}
AddClass.prototype = {
	attachEvents: function() {
		var self = this;
		lib.event.add(this.item, this.options.event, function(e){
			self.toggleClass();
			e.preventDefault();
		});
	},
	toggleClass: function() {
		if(lib.hasClass(this.classItem, this.options.classAdd)) {
			lib.removeClass(this.classItem, this.options.classAdd);
		} else {
			lib.addClass(this.classItem, this.options.classAdd);
		}
	}
};

/*
 * Utility module
 */
 lib = {
 	hasClass: function(el,cls) {
 		return el && el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
 	},
 	addClass: function(el,cls) {
 		if (el && !this.hasClass(el,cls)) el.className += " "+cls;
 	},
 	removeClass: function(el,cls) {
 		if (el && this.hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
 	},
 	extend: function(obj) {
 		for(var i = 1; i < arguments.length; i++) {
 			for(var p in arguments[i]) {
 				if(arguments[i].hasOwnProperty(p)) {
 					obj[p] = arguments[i][p];
 				}
 			}
 		}
 		return obj;
 	},
 	each: function(obj, callback) {
 		var property, len;
 		if(typeof obj.length === 'number') {
 			for(property = 0, len = obj.length; property < len; property++) {
 				if(callback.call(obj[property], property, obj[property]) === false) {
 					break;
 				}
 			}
 		} else {
 			for(property in obj) {
 				if(obj.hasOwnProperty(property)) {
 					if(callback.call(obj[property], property, obj[property]) === false) {
 						break;
 					}
 				}
 			}
 		}
 	},
 	event: (function() {
 		var fixEvent = function(e) {
 			e = e || window.event;
 			if(e.isFixed) return e; else e.isFixed = true;
 			if(!e.target) e.target = e.srcElement;
 			e.preventDefault = e.preventDefault || function() {this.returnValue = false;};
 			e.stopPropagation = e.stopPropagation || function() {this.cancelBubble = true;};
 			return e;
 		};
 		return {
 			add: function(elem, event, handler) {
 				if(!elem.events) {
 					elem.events = {};
 					elem.handle = function(e) {
 						var ret, handlers = elem.events[e.type];
 						e = fixEvent(e);
 						for(var i = 0, len = handlers.length; i < len; i++) {
 							if(handlers[i]) {
 								ret = handlers[i].call(elem, e);
 								if(ret === false) {
 									e.preventDefault();
 									e.stopPropagation();
 								}
 							}
 						}
 					};
 				}
 				if(!elem.events[event]) {
 					elem.events[event] = [];
 					if(elem.addEventListener) elem.addEventListener(event, elem.handle, false);
 					else if(elem.attachEvent) elem.attachEvent('on'+event, elem.handle);
 				}
 				elem.events[event].push(handler);
 			},
 			remove: function(elem, event, handler) {
 				var handlers = elem.events[event];
 				for(var i = handlers.length - 1; i >= 0; i--) {
 					if(handlers[i] === handler) {
 						handlers.splice(i,1);
 					}
 				}
 				if(!handlers.length) {
 					delete elem.events[event];
 					if(elem.removeEventListener) elem.removeEventListener(event, elem.handle, false);
 					else if(elem.detachEvent) elem.detachEvent('on'+event, elem.handle);
 				}
 			}
 		};
 	}()),
 	queryElementsBySelector: function(selector, scope) {
 		scope = scope || document;
 		if(!selector) return [];
 		if(selector === '>*') return scope.children;
 		if(typeof document.querySelectorAll === 'function') {
 			return scope.querySelectorAll(selector);
 		}
 		var selectors = selector.split(',');
 		var resultList = [];
 		for(var s = 0; s < selectors.length; s++) {
 			var currentContext = [scope || document];
 			var tokens = selectors[s].replace(/^\s+/,'').replace(/\s+$/,'').split(' ');
 			for (var i = 0; i < tokens.length; i++) {
 				token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');
 				if (token.indexOf('#') > -1) {
 					var bits = token.split('#'), tagName = bits[0], id = bits[1];
 					var element = document.getElementById(id);
 					if (element && tagName && element.nodeName.toLowerCase() != tagName) {
 						return [];
 					}
 					currentContext = element ? [element] : [];
 					continue;
 				}
 				if (token.indexOf('.') > -1) {
 					var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
 					for (var h = 0; h < currentContext.length; h++) {
 						var elements;
 						if (tagName == '*') {
 							elements = currentContext[h].getElementsByTagName('*');
 						} else {
 							elements = currentContext[h].getElementsByTagName(tagName);
 						}
 						for (var j = 0; j < elements.length; j++) {
 							found[foundCount++] = elements[j];
 						}
 					}
 					currentContext = [];
 					var currentContextIndex = 0;
 					for (var k = 0; k < found.length; k++) {
 						if (found[k].className && found[k].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
 							currentContext[currentContextIndex++] = found[k];
 						}
 					}
 					continue;
 				}
 				if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
 					var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
 					if(attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
 						attrName = 'htmlFor';
 					}
 					var found = [], foundCount = 0;
 					for (var h = 0; h < currentContext.length; h++) {
 						var elements;
 						if (tagName == '*') {
 							elements = currentContext[h].getElementsByTagName('*');
 						} else {
 							elements = currentContext[h].getElementsByTagName(tagName);
 						}
 						for (var j = 0; elements[j]; j++) {
 							found[foundCount++] = elements[j];
 						}
 					}
 					currentContext = [];
 					var currentContextIndex = 0, checkFunction;
 					switch (attrOperator) {
 						case '=': checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue) }; break;
 						case '~': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('(\\s|^)'+attrValue+'(\\s|$)'))) }; break;
 						case '|': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))) }; break;
 						case '^': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0) }; break;
 						case '$': checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length) }; break;
 						case '*': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1) }; break;
 						default : checkFunction = function(e) { return e.getAttribute(attrName) };
 					}
 					currentContext = [];
 					var currentContextIndex = 0;
 					for (var k = 0; k < found.length; k++) {
 						if (checkFunction(found[k])) {
 							currentContext[currentContextIndex++] = found[k];
 						}
 					}
 					continue;
 				}
 				tagName = token;
 				var found = [], foundCount = 0;
 				for (var h = 0; h < currentContext.length; h++) {
 					var elements = currentContext[h].getElementsByTagName(tagName);
 					for (var j = 0; j < elements.length; j++) {
 						found[foundCount++] = elements[j];
 					}
 				}
 				currentContext = found;
 			}
 			resultList = [].concat(resultList,currentContext);
 		}
 		return resultList;
 	},
 	trim: function (str) {
 		return str.replace(/^\s+/, '').replace(/\s+$/, '');
 	},
 	bind: function(f, scope, forceArgs){
 		return function() {return f.apply(scope, typeof forceArgs !== 'undefined' ? [forceArgs] : arguments);};
 	}
 };

// DOM ready handler
function bindReady(handler){
	var called = false;
	var ready = function() {
		if (called) return;
		called = true;
		handler();
	};
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', ready, false);
	} else if (document.attachEvent) {
		if (document.documentElement.doScroll && window == window.top) {
			var tryScroll = function(){
				if (called) return;
				if (!document.body) return;
				try {
					document.documentElement.doScroll('left');
					ready();
				} catch(e) {
					setTimeout(tryScroll, 0);
				}
			};
			tryScroll();
		}
		document.attachEvent('onreadystatechange', function(){
			if (document.readyState === 'complete') {
				ready();
			}
		});
	}
	if (window.addEventListener) window.addEventListener('load', ready, false);
	else if (window.attachEvent) window.attachEvent('onload', ready);
}


// Sticky Plugin v1.0.4 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 02/14/2011
// Date: 07/20/2015
// Website: http://stickyjs.com/
// Description: Makes an element on the page stick on the screen as you scroll
//              It will only set the 'top' and 'position' of your element, you
//              might need to adjust the width in some cases.

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var slice = Array.prototype.slice; // save ref to original slice()
    var splice = Array.prototype.splice; // save ref to original slice()

  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      wrapperClassName: 'sticky-wrapper',
      center: false,
      getWidthFrom: '',
      widthFromWrapper: true, // works only when .getWidthFrom is empty
      responsiveWidth: false,
      zIndex: 'auto'
    },
    $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function() {
      var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

      for (var i = 0, l = sticked.length; i < l; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;

        //update height in case of dynamic content
        s.stickyWrapper.css('height', s.stickyElement.outerHeight());

        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement
              .css({
                'width': '',
                'position': '',
                'top': '',
                'z-index': ''
              });
            s.stickyElement.parent().removeClass(s.className);
            s.stickyElement.trigger('sticky-end', [s]);
            s.currentTop = null;
          }
        }
        else {
          var newTop = documentHeight - s.stickyElement.outerHeight()
            - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          if (newTop < 0) {
            newTop = newTop + s.topSpacing;
          } else {
            newTop = s.topSpacing;
          }
          if (s.currentTop !== newTop) {
            var newWidth;
            if (s.getWidthFrom) {
                newWidth = $(s.getWidthFrom).width() || null;
            } else if (s.widthFromWrapper) {
                newWidth = s.stickyWrapper.width();
            }
            if (newWidth == null) {
                newWidth = s.stickyElement.width();
            }
            s.stickyElement
              .css('width', newWidth)
              .css('position', 'fixed')
              .css('top', newTop)
              .css('z-index', s.zIndex);

            s.stickyElement.parent().addClass(s.className);

            if (s.currentTop === null) {
              s.stickyElement.trigger('sticky-start', [s]);
            } else {
              // sticky is started but it have to be repositioned
              s.stickyElement.trigger('sticky-update', [s]);
            }

            if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) {
              // just reached bottom || just started to stick but bottom is already reached
              s.stickyElement.trigger('sticky-bottom-reached', [s]);
            } else if(s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) {
              // sticky is started && sticked at topSpacing && overflowing from top just finished
              s.stickyElement.trigger('sticky-bottom-unreached', [s]);
            }

            s.currentTop = newTop;
          }

          // Check if sticky has reached end of container and stop sticking
          var stickyWrapperContainer = s.stickyWrapper.parent();
          var unstick = (s.stickyElement.offset().top + s.stickyElement.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight()) && (s.stickyElement.offset().top <= s.topSpacing);

          if( unstick ) {
            s.stickyElement
              .css('position', 'absolute')
              .css('top', '')
              .css('bottom', 0)
              .css('z-index', '');
          } else {
            s.stickyElement
              .css('position', 'fixed')
              .css('top', newTop)
              .css('bottom', '')
              .css('z-index', s.zIndex);
          }
        }
      }
    },
    resizer = function() {
      windowHeight = $window.height();

      for (var i = 0, l = sticked.length; i < l; i++) {
        var s = sticked[i];
        var newWidth = null;
        if (s.getWidthFrom) {
            if (s.responsiveWidth) {
                newWidth = $(s.getWidthFrom).width();
            }
        } else if(s.widthFromWrapper) {
            newWidth = s.stickyWrapper.width();
        }
        if (newWidth != null) {
            s.stickyElement.css('width', newWidth);
        }
      }
    },
    methods = {
      init: function(options) {
        return this.each(function() {
          var o = $.extend({}, defaults, options);
          var stickyElement = $(this);

          var stickyId = stickyElement.attr('id');
          var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName;
          var wrapper = $('<div></div>')
            .attr('id', wrapperId)
            .addClass(o.wrapperClassName);

          stickyElement.wrapAll(function() {
            if ($(this).parent("#" + wrapperId).length == 0) {
                    return wrapper;
            }
});

          var stickyWrapper = stickyElement.parent();

          if (o.center) {
            stickyWrapper.css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
          }

          if (stickyElement.css("float") === "right") {
            stickyElement.css({"float":"none"}).parent().css({"float":"right"});
          }

          o.stickyElement = stickyElement;
          o.stickyWrapper = stickyWrapper;
          o.currentTop    = null;

          sticked.push(o);

          methods.setWrapperHeight(this);
          methods.setupChangeListeners(this);
        });
      },

      setWrapperHeight: function(stickyElement) {
        var element = $(stickyElement);
        var stickyWrapper = element.parent();
        if (stickyWrapper) {
          stickyWrapper.css('height', element.outerHeight());
        }
      },

      setupChangeListeners: function(stickyElement) {
        if (window.MutationObserver) {
          var mutationObserver = new window.MutationObserver(function(mutations) {
            if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
              methods.setWrapperHeight(stickyElement);
            }
          });
          mutationObserver.observe(stickyElement, {subtree: true, childList: true});
        } else {
          if (window.addEventListener) {
            stickyElement.addEventListener('DOMNodeInserted', function() {
              methods.setWrapperHeight(stickyElement);
            }, false);
            stickyElement.addEventListener('DOMNodeRemoved', function() {
              methods.setWrapperHeight(stickyElement);
            }, false);
          } else if (window.attachEvent) {
            stickyElement.attachEvent('onDOMNodeInserted', function() {
              methods.setWrapperHeight(stickyElement);
            });
            stickyElement.attachEvent('onDOMNodeRemoved', function() {
              methods.setWrapperHeight(stickyElement);
            });
          }
        }
      },
      update: scroller,
      unstick: function(options) {
        return this.each(function() {
          var that = this;
          var unstickyElement = $(that);

          var removeIdx = -1;
          var i = sticked.length;
          while (i-- > 0) {
            if (sticked[i].stickyElement.get(0) === that) {
                splice.call(sticked,i,1);
                removeIdx = i;
            }
          }
          if(removeIdx !== -1) {
            unstickyElement.unwrap();
            unstickyElement
              .css({
                'width': '',
                'position': '',
                'top': '',
                'float': '',
                'z-index': ''
              })
            ;
          }
        });
      }
    };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };

  $.fn.unstick = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.unstick.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };
  $(function() {
    setTimeout(scroller, 0);
  });
}));
