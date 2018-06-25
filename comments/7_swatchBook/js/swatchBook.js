(function($, window, undefined) {
	'use strict';
	jQuery.fn.reverse = [].reverse;
	$.SwatchBook=function(options,element){
		this.$el=$(element);
		console.log(0);
		this._init();
		//console.log(this)；
	};
	$.SwatchBook.defaults={
		center: 6,
		color:{'#ea2a29','#f16729','#f89322','#ffcf14','#ffea0d','#87b11d' }

	};
	$.SwatchBook.prototype = {
		_init: function() {
			this.page = this.$el.children('div');//$(".book>.page");
			this.page.css({
				'transition': 'all 700ms ease'
			});
			var self = this;
			var last_page = this.page.length;
			this.open_sta = false;
			this.transformStr="";
			this.page.on('click', function() {
				if ((last_page - 1) == $(this).index()) {
					if (self.open_sta) {
						self._close();

					} else {
						self._open(Math.round(last_page/ 2));
					}
				} else {
					self.set_transition($(this).index());
				}
			})
		},
		set_transition:function (activeId) {
			this.page.each(function(i) {
				if (i > activeId) {
					this.transformStr = 'rotate(' + (15 * (i - activeId) + 15) + 'deg';
				} else {
					this.transformStr = 'rotate(' + 15 * (i - activeId) + 'deg';
				}
				$(this).css({
					'transform': this.transformStr
				});
			});
		},

		_open:function (activeId) {
			this.page.each(function(i) {
				this.transformStr = 'rotate(' + 15 * (i - activeId) + 'deg';
				$(this).css({
					'transform': this.transformStr
				});
			});
			this.open_sta = true;
		},

		_close:function () {
			this.page.css({
				'transform': 'rotate(0deg)'
			});
			this.open_sta = false;
		}

	};
	$.fn.swatchbook = function(options) {
		//console.log(this);
		//console.log(options);
		var instance = $.data(this, 'swatchbook', new $.SwatchBook(options, this));
		return instance;
	};

})(jQuery, window);//立即执行的匿名函数
//$.SwatchBook.defaults.center=10;
//console.log($.SwatchBook.defaults.center);