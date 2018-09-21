	function ExpandSlide(el,cfg){
		return new ExpandSlide.prototype.init(el,cfg);
	}

	var __browser = {
		msie: (function(){
			var userAgent = navigator.userAgent.toLowerCase();
			return /msie/.test(userAgent) && !/opera/.test(userAgent)
		})(),
		version: (function(){
			var rv = -1;
			var userAgent = navigator.userAgent.toLowerCase();
			var re = new RegExp(/msie ([0-9]{1,}[\.0-9]{0,})/);
				if (re.exec(userAgent) !== null)
					rv = parseFloat(RegExp.$1);
			return rv
		})()
	}

	ExpandSlide.prototype = {
		constructor : ExpandSlide,
		init : function(el,cfg){
			var dfs = {
				autoplay : false,
				duration : 500,
				nextBtn : null,
				prevBtn : null,
				wrapper : '.swiper-wrapper',
				panels : '.swiper-slide',
				pagination : '.pagination',
				callback : function(){}
			}

			if(!el){
				throw Error("请设置wrapper");
			}

			this.cfg = $.extend(dfs,cfg);

			this.container = $(el);
			this.wrapper = $(el).find(this.cfg.wrapper);
			this.cachePanels = this.wrapper.find(this.cfg.panels);
			this.activeIndex = 0;
			this.initWrapper();

		},
		initWrapper : function(){
			var self = this,
				items = this.wrapper.find(this.cfg.panels),
				len = items.length,
				itemWidth = items.eq(0).width();

			this.itemCount = len;
			this.itemWidth = itemWidth;

			if(len<3){
				//throw Error("slideItem小于3个");
				return;
			}

			items.width(itemWidth);
			this.wrapper.width((len+4)*itemWidth);

			//拷贝节点
			this.wrapper.prepend(items.eq(len-1).clone());
			this.wrapper.prepend(items.eq(len-2).clone());
			this.wrapper.append(items.eq(0).clone());
			this.wrapper.append(items.eq(1).clone());
			
			this.setTranslate(this.wrapper[0],{x:-2*itemWidth},0);

			this.createPagination(len);
			this.bind();
		},
		createPagination : function(len){
			var tpl = '',cls = '';
			for(var i=0;i<len;i++){
				if(i == 0){
					cls = 'swiper-visible-switch swiper-active-switch';
				}else{
					cls = '';
				}
				tpl += '<span class="swiper-pagination-switch '+cls+'"></span>';
			}
			this.container.find(this.cfg.pagination).append(tpl);
		},
		bind : function(){
			var self = this;

			var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
		    if (self.browser.ie10) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
		    if (self.browser.ie11) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];

		    self.touchEvents = {
		        touchStart : self.support.touch || !self.cfg.simulateTouch  ? 'touchstart' : desktopEvents[0],
		        touchMove : self.support.touch || !self.cfg.simulateTouch ? 'touchmove' : desktopEvents[1],
		        touchEnd : self.support.touch || !self.cfg.simulateTouch ? 'touchend' : desktopEvents[2]
		    };

		    var bind = self.addEventListener,
		    	delegateTarget = self.wrapper[0];
	        //Touch Events
	        if (! (self.browser.ie10 || self.browser.ie11)) {
	            if (self.support.touch) {
	            	bind(delegateTarget,'touchstart',onTouchStart);
	            	bind(delegateTarget,'touchmove',onTouchMove);
	            	bind(delegateTarget,'touchend',onTouchEnd);
	            }else if (self.cfg.simulateTouch) {
	            	self.wrapper.on('mousedown',onTouchStart);
	                $(document).on('mousemove', onTouchMove);
	                $(document).on('mouseup', onTouchEnd);
	            }
	        }
	        else {
	            self.wrapper.on(self.touchEvents.touchStart, onTouchStart);
	            $(document).on(self.touchEvents.touchMove, onTouchMove);
	            $(document).on(self.touchEvents.touchEnd, onTouchEnd);
	        }

	        self.touches = {};

	        function onTouchStart(e){
	        	self.touches.startLeft = self.get3DTranslateLeft(self.wrapper[0]);
	        	self.touches.dragable = true;
	        	if (!self.support.touch){
	        		self.touches.startX = e.pageX;
	        		self.touches.startY = e.pageY;
	        	}else{
	        		self.touches.startX = e.targetTouches[0].pageX;
	        		self.touches.startY = e.targetTouches[0].pageY;
	        	}
	        	self.stopPlay()
	        	//e.preventDefault();
	        }
	        function onTouchMove(e){
	        	if(self.touches.dragable){
	        		var curX = self.touches.startLeft;
	        		var toX = 0, movedX = 0, movedY = 0;
	        		if (!self.support.touch){
		        		// toX = curX-self.touches.startX+e.pageX;
		        		movedX = self.touches.startX - e.pageX;
		        		movedY = self.touches.startY - e.pageY;
		        	}else{
		        		// toX = curX-self.touches.startX+e.targetTouches[0].pageX;
		        		movedX = self.touches.startX - e.targetTouches[0].pageX;
		        		movedY = self.touches.startY - e.targetTouches[0].pageY;
		        	}

		        	if(Math.abs(movedY) < Math.abs(movedX)){
		        		toX = curX - movedX;
	        			self.setTranslate(self.wrapper[0],{x:toX},0);
	        			e.preventDefault();
		        	}
	        	}
	        }
	        function onTouchEnd(e){
	        	if (!self.support.touch){
	        		self.touches.startX = e.pageX
	        	}else{
	        		self.touches.startX = e.changedTouches[0].pageX;
	        	}
	        	self.touches.dragable = false;
	        	var curLeft = self.get3DTranslateLeft(self.wrapper[0]);
	        	if(self.touches.startLeft - curLeft<-self.itemWidth/10){
	        		self.prev();
	        	}else if(self.touches.startLeft - curLeft>self.itemWidth/10){
	        		self.next();
	        	}else{
	        		self.restore();
	        	}
	        	self.startPlay();
	        	e.preventDefault();
	        }


			this.cfg.nextBtn&&this.cfg.nextBtn.click(function(){
				self.next();
			}).on('mouseenter',function(){
				self.stopPlay()
			}).on('mouseleave',function(){
				if(self.cfg.autoplay){
					self.startPlay();
				}
			})
			
			this.cfg.prevBtn&&this.cfg.prevBtn.click(function(){
				self.prev();
			}).on('mouseenter',function(){
				self.stopPlay()
			}).on('mouseleave',function(){
				if(self.cfg.autoplay){
					self.startPlay();
				}
			})

			this.wrapper.on('mouseenter',function(){
				self.stopPlay()
			}).on('mouseleave',function(){
				if(self.cfg.autoplay){
					self.startPlay();
				}
			})
			this.container.find(self.cfg.pagination).on('click','span',function(){
				self.swipeTo($(this).index())
				return false;
			})

			if(this.cfg.autoplay){
				this.startPlay();
			}
		},
		startPlay : function(){
			var self = this;
			this.stopPlay();
			this.autoInterval = setInterval(function(){
				self.next();
			},this.cfg.autoplay*1000)
		},
		stopPlay : function(){
			clearInterval(this.autoInterval);
		},
		destroy:function(){
			clearInterval(this.autoInterval);
		},
		restore : function(){
			var self = this;

			this.setTranslate(this.wrapper[0],{x:-(2+this.activeIndex)*this.itemWidth}, this.cfg.duration, function(){});
		},
		moving : false,
		next : function(){
			var self = this;
			if(this.moving) return;
			this.moving = true;
			this.activeIndex++;

			this.doSwipe();
		},
		prev : function(){
			var self = this;

			if(this.moving) return;
			this.moving = true;
			this.activeIndex--;

			this.doSwipe();
		},
		swipeTo : function(activeIndex){
			var self = this;

			if(this.moving) return;
			this.moving = true;
			this.activeIndex = activeIndex;

			this.doSwipe();
		},
		doSwipe : function(){
			var self = this;
			this.setTranslate(this.wrapper[0],{x:-(2+this.activeIndex)*this.itemWidth},this.cfg.duration,function(){
				if(self.activeIndex <= -1){
					self.activeIndex = self.itemCount-1;
					self.setTranslate(self.wrapper[0],{x:-(2+self.activeIndex)*self.itemWidth},0);
				}
				if(self.activeIndex >= self.itemCount){
					self.activeIndex = 0;
					self.setTranslate(self.wrapper[0],{x:-(2+self.activeIndex)*self.itemWidth},0);
				}
				self.moving = false;
				self.container.find(self.cfg.pagination).find('span').removeClass('swiper-visible-switch swiper-active-switch').eq(self.activeIndex).addClass('swiper-visible-switch swiper-active-switch');
				self.cfg.callback(self);
			});
		},
		wrapperTransitionEnd : function (callback) {
	        'use strict';
	        var a = this,
	            el = a.wrapper[0],
	            events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
	            i;

	        function fireCallBack(e) {
	            if (e.target !== el) return;
	            callback(a);
                for (i = 0; i < events.length; i++) {
                    a.removeEventListener(el, events[i], fireCallBack);
                }
	        }

	        if (callback) {
	            for (i = 0; i < events.length; i++) {
	                this.addEventListener(el, events[i], fireCallBack);
	            }
	        }
	    },
		setTranslate : function (el, translate, duration, fcallback) {
	        'use strict';
	        var callback = fcallback||function(){};
	        var es = el.style;
	        var pos = {
	            x : translate.x || 0,
	            y : translate.y || 0,
	            z : translate.z || 0
	        };
	        
	        this.setTransition(el,duration);
	        var transformString = this.support.transforms3d ? 'translate3d(' + (pos.x) + 'px,' + (pos.y) + 'px,' + (pos.z) + 'px)' : 'translate(' + (pos.x) + 'px,' + (pos.y) + 'px)';
	        if(this.support.transforms) {es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = transformString;}
	        //alert(this.support.transforms)
	        if (!this.support.transforms) {
	            $(el).animate({
	                left: pos.x,
	                top: pos.y
	            }, duration, callback)
	        }else{
	        	if(duration){
	        		this.wrapperTransitionEnd(function(){
						callback()
					})
	        	}else{
	        		callback()
	        	}
	        }
	    },
	    get3DTranslateLeft: function(el){
	    	'use strict';
	        var es = el.style;
	        if (!this.support.transforms) {
	            return $(el).css('left');
	        }else{
	        	var translateStr = es.webkitTransform || es.MsTransform || es.msTransform || es.MozTransform || es.OTransform || es.transform;
	        	return translateStr.match(/translate3d\((-*\d*)px/)[1];
	        }
	    },
		setTransition : function (el, duration) {
	        'use strict';
	        var es = el.style;
	        es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = duration + 'ms';
	    },
	    support: {

	        touch : (window.Modernizr && Modernizr.touch === true) || (function () {
	            'use strict';
	            return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	        })(),

	        transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
	            'use strict';
	            var div = document.createElement('div').style;
	            var ret = ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
	            ret = !__browser.msie || (__browser.msie && Number(__browser.version)>9);
	            return ret;
	        })(),

	        transforms : (window.Modernizr && Modernizr.csstransforms === true) || (function () {
	            'use strict';
	            var div = document.createElement('div').style;
	            var ret = ('transform' in div || 'WebkitTransform' in div || 'MozTransform' in div || 'msTransform' in div || 'MsTransform' in div || 'OTransform' in div);
	            ret = !__browser.msie || (__browser.msie && Number(__browser.version)>9);
	            return ret;
	        })(),

	        transitions : (window.Modernizr && Modernizr.csstransitions === true) || (function () {
	            'use strict';
	            var div = document.createElement('div').style;
	            var ret = ('transition' in div || 'WebkitTransition' in div || 'MozTransition' in div || 'msTransition' in div || 'MsTransition' in div || 'OTransition' in div);
	            ret = !__browser.msie || (__browser.msie && Number(__browser.version)>9);
	            return ret;
	        })(),

	        classList : (function () {
	            'use strict';
	            var div = document.createElement('div').style;
	            return 'classList' in div;
	        })()
	    },
	    browser : {
			msie: (function(){
				var userAgent = navigator.userAgent.toLowerCase();
				return /msie/.test(userAgent) && !/opera/.test(userAgent)
			})(),
			version: (function(){
				var rv = -1;
				var userAgent = navigator.userAgent.toLowerCase();
				var re = new RegExp(/msie ([0-9]{1,}[\.0-9]{0,})/);
	                if (re.exec(userAgent) !== null)
	                    rv = parseFloat(RegExp.$1);
				return rv
			})(),
	        ie8 : (function () {
	            'use strict';
	            var rv = -1; // Return value assumes failure.
	            if (navigator.appName === 'Microsoft Internet Explorer') {
	                var ua = navigator.userAgent;
	                var re = new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/);
	                if (re.exec(ua) !== null)
	                    rv = parseFloat(RegExp.$1);
	            }
	            return rv !== -1 && rv < 9;
	        })(),

	        ie10 : window.navigator.msPointerEnabled,
	        ie11 : window.navigator.pointerEnabled
	    },
	    addEventListener : function (el, event, listener, useCapture) {
            'use strict';
            if (typeof useCapture === 'undefined') {
                useCapture = false;
            }

            if (el.addEventListener) {
                el.addEventListener(event, listener, useCapture);
            }
            else if (el.attachEvent) {
                el.attachEvent('on' + event, listener);
            }
        },

        removeEventListener : function (el, event, listener, useCapture) {
            'use strict';
            if (typeof useCapture === 'undefined') {
                useCapture = false;
            }

            if (el.removeEventListener) {
                el.removeEventListener(event, listener, useCapture);
            }
            else if (el.detachEvent) {
                el.detachEvent('on' + event, listener);
            }
        }
	}

	ExpandSlide.prototype.init.prototype = ExpandSlide.prototype;

	module.exports = ExpandSlide;