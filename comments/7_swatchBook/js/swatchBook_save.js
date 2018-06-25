var page=$(".book>.page");
page.css({'transition': 'all 700ms ease'});
var self = this;
var last_page=page.length;
var open_sta=false;
var transformStr;
page.on('click',function(){
	if((last_page-1)==$(this).index())
	{
		if(open_sta)
		{
			self._close();

		}
		else
		{
			self._open(Math.round(page.length/2));
		}
	}
	else
	{
		self.set_transition($(this).index());
	}
})
function set_transition(activeId) {
	page.each(function(i) {
		if (i > activeId) {
			transformStr = 'rotate(' + (15 * (i - activeId) + 15) + 'deg';
		} else {
			transformStr = 'rotate(' + 15 * (i - activeId) + 'deg';
		}
		$(this).css({
			'transform': transformStr
		});
	});
}
function _open (activeId) {
	page.each(function(i) {
		transformStr = 'rotate(' + 15 * (i - activeId) + 'deg';
		$(this).css({
			'transform': transformStr
		});
	});
	open_sta=true;
}
function _close () {
	page.css({'transform': 'rotate(0deg)'});
	open_sta=false;
}