/* smart.ui.base.js
 * date: 2016-02-22
 */
(function ($) {
"use strict";
$.smart = $.smart || {version : "6.0"};
$.extend($.smart, {
	path: '/' // 全局WebRootPath
});
$.extend($.smart,{
	getAccessor : function(obj, expr) {
		var ret,p,prm = [], i;
		if( typeof expr === 'function') { return expr(obj); }
		ret = obj[expr];
		if(ret===undefined) {
			try {
				if ( typeof expr === 'string' ) {
					prm = expr.split('.');
				}
				i = prm.length;
				if( i ) {
					ret = obj;
					while (ret && i--) {
						p = prm.shift();
						ret = ret[p];
					}
				}
			} catch (e) {}
		}
		return ret;
	},
	getMethod: function (name) {
        return this.getAccessor($.fn.smart, name);
	},
	extend : function(methods) {
		$.extend($.fn.smart, methods);
		if (!this.no_legacy_api) {
			$.fn.extend(methods);
		}
	}
});

$.fn.smart = function( pin ) {
	if (typeof pin === 'string') {
		var fn = $.smart.getMethod(pin);
		if (!fn) {
			throw ("smart - No such method: " + pin);
		}
		var args = $.makeArray(arguments).slice(1);
		return fn.apply(this,args);
	}
};
})(jQuery);