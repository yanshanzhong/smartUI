/* smart.debug-6.1.js
 * date: 2016-03-01
 */
(function ($) {

})(jQuery);

$.extend({
    includePath: '',
    include: function(file) {
       var files = typeof file == "string" ? [file]:file;
       for (var i = 0; i < files.length; i++) {
           var name = files[i].replace(/^\s|\s$/g, "");
           var att = name.split('.');
           var ext = att[att.length - 1].toLowerCase();
           var isCSS = ext == "css";
           var tag = isCSS ? "link" : "script";
           var attr = isCSS ? " type='text/css' rel='stylesheet' " : " type='text/javascript' ";
           var link = (isCSS ? "href" : "src") + "='" + $.includePath + name + "'";
           if ($(tag + "[" + link + "]").length == 0) document.write("<" + tag + attr + link + "></" + tag + ">");
       }
  }
});


$.includePath = '/smartUI/smartUI/jquery/css1.11.4/';
$.include(["jquery-ui.css"]);

$.includePath = '/smartUI/smartUI/jqGrid/';
$.include(["ui.jqgrid-5.0.2.css"]);
$.include(["jquery.jqGrid-5.0.2.js"]);

$.includePath = '/smartUI/smartUI/smart/';
$.include([]);
$.include([]);

