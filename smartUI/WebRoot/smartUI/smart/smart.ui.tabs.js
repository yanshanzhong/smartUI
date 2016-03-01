/* smart.ui.comn.js
 * date: 2016-02-22
 */
(function ($) {
"use strict";
$.smart.tabs = $.smart.tabs || {version : "6.0"};
$.smart.extend({
	/*
	 * 页签、标签
	 */
	kandyTabs : function(options) {
		options = $.extend({
			// Required Settings
			trigger:"click",
			groups : []
		}, options);
		var $this = $(this);
		$this.KandyTabs(options);
		for(var i = 0; options.groups && i < options.groups.length; i++){
			var group = options.groups[i];
			$("dt span:eq("+group.index+")", $this).before("<b class='tabGroup'>"+group.text+"&nbsp;</b>");
		}
		//alert($("dt span", $this).length);
		
	}
});
})(jQuery);