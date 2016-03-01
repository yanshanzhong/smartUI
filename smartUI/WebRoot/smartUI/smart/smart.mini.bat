 set DIR = D:\WorkSpaces\ZJCourt\zjcourt\WebRoot\js_src\smart
 
 %DIR% uglifyjs ../jquery/jquery-1.9.0.js ../jquery/jquery.cookie.js ../jquery/jquery.form.js ^
 ../jquery/jquery-ui.js ../jquery/jquery.jqGrid.js ^
 ../jquery/jquery.uploadify.js ../jquery/jquery.ztree.all-3.5.js ../rpms/kandytabs.pack.js ^
 ../rpms/rpms.export.js ../rpms/rpms.grid.common.js ../rpms/rpms.grid.fmatter.js ^
 ../rpms/rpms.grid.js ../rpms/rpms.grid.setcolumn.js ../rpms/rpms.grid.tabs.js ^
 ../rpms/rpms.tree.js ../rpms/rpms.ui.js ../rpms/rpms.upload.js ../rpms/rpms.validate.js ^
 ../rpms/rpms.wdatePicker.js ^
 smart.ui.base.js smart.ui.comn.js smart.ui.dept.js smart.ui.form.js smart.ui.prototype.js ^
 smart.ui.tabs.js smart.ui.user.js ^
 -o  ../../js/jquery.rpms.all.js  -c drop_console=true -m