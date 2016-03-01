/* smart.debug-6.0.js
 * date: 2016-02-22
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
$.includePath = '/css/';
$.include(["index.css","jquery-ui.css","rpms.css","rpms.grid.css","ui.jqgrid.css"
          ,"uploadify.css","zTreeStyle.css","kandytabs.css","smart-ui.css"]);
$.includePath = '/js_src/';
$.include(["jquery/jquery.jqGrid.js","jquery/grid.treegrid.js"
          ,"rpms/rpms.tree.js"
          ,"smart.ui.base.js","smart.ui.comn.js","smart.ui.dept.js","smart.ui.form.js"
          ,"smart.ui.prototype.js","smart.ui.tabs.js","smart.ui.user.js"]);