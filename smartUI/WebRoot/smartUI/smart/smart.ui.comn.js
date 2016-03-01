/* smart.ui.comn.js
 * date: 2016-02-22
 */
(function ($) {
"use strict";
$.smart.comn = $.smart.comn || {version : "6.0"};
$.extend($.smart.comn, {
	/**
	 * 模板处理：item-模板html代码，data-json数据
	 */
	templateProcess : function (item, data){
		for (var key in data) {
			item = item.replace(new RegExp('\\\${' + key + '}', 'g'), data[key]);
		}
		return item;
	},
	/**
	 * 字符串处理：特定符号(默认逗号)分隔的字符串，拼接不重复
	 */
	stringAppend : function (src, str, ch){
		src = src || "";
		str = str || "";
		ch  =  ch || ",";
		var dest = src.trim();
		if(dest.length > 0){
			dest = ch + dest + ch;
			dest = dest.replace(new RegExp(ch + str +ch, "gm"), ch);
			dest += str;
			// 去掉首尾ch
			dest = dest.replace(new RegExp("^["+ch+"]"),"").replace(new RegExp("["+ch+"]$"),"");
			//console.log(s.replace(/^[\,]/,"").replace(/[\,]$/,""));
	      	//console.log(s.replace(new RegExp("^[,]"),"").replace(new RegExp("[,]$"),""));
	      	//alert(s.replace(/^\,(.*)\,$/, "$1"));
			//console.log(s.replace(new RegExp("^,(.*),$"), "$1"));
		} else {
			dest = str;
		}
		return dest;
	},
	/**
	 * 字符串处理：特定符号(默认逗号)分隔的多个字符串，删除一个
	 */
	stringDelete : function (src, str, ch){
		src = src || "";
		str = str || "";
		ch  =  ch || ",";
		var dest = src.trim();
		if(str.length > 0){
			dest = ch + dest + ch;
			dest = dest.replace(new RegExp(ch + str +ch, "gm"), ch);
			// 去掉首尾ch
			dest = dest.replace(new RegExp("^["+ch+"]"),"").replace(new RegExp("["+ch+"]$"),"");
		}
		return dest;
	}

});
$.smart.extend({
	test : function(options) {
		var id = $(this).attr("id");
		console.log("smart-test:" + id);
		console.log("options-s:" + options.name);
	},
	test1 : function(options) {
		var id = $(this).attr("id");
		console.log("smart-test1:" + id);
		console.log("options1-s:" + options.name);
	}
});
})(jQuery);