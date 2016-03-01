/* smart.ui.prototype.js
 * date: 2016-02-22
 */
(function ($) {
	String.prototype.trim = function(){
		//console.log("smart.ui trim");
	    return this.replace(/^\s*|\s*$/g, '');
	}
})(jQuery);