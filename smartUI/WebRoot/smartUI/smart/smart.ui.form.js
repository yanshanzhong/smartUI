/* smart.ui.comn.js
 * date: 2016-02-22
 */
(function ($) {
"use strict";
$.smart.form = $.smart.form || {version : "6.0"};
$.smart.extend({
	/*
	 * 表单页面：添加按钮
	 */
	addButton : function(p) {
		var panel = $(this);
		var btn = $("<button></button>").addClass("ui-state-default ui-corner-all keyanButton")
		.click(function(){ p.fn.apply(this, arguments); })
		.hover(function(){$(this).addClass("ui-state-hover");},	function(){$(this).removeClass("ui-state-hover");})
		.focus(function(){$(this).addClass("ui-state-focus");})
		.blur(function(){$(this).removeClass("ui-state-focus");})
		.append($("<span>").addClass(p.icon))
		.append($("<span>").text(p.text));
		panel.addClass("keyanBtnPane").append(btn);
		return panel;
	}
});
})(jQuery);