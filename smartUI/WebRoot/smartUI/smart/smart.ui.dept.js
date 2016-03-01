/* smart.ui.comn.js
 * date: 2016-02-22
 */
(function ($) {
"use strict";
$.smart.dept = $.smart.dept || {version : "6.0"};
$.extend($.smart.dept, {
	nodes: '[]'
});
$.smart.extend({
	selectDept : function (options) {
		options = $.extend(true, {
			multi : false, // 是否多选
			type  : "dept" // 单位-unit  部门-dept
		}, $.smart.user, options);
		var $input = $(this);
		var deptCount = $("div[id^='smart_ui_dept_div']").length;
		var deptDiv = 'smart_ui_dept_div' + deptCount;
		var deptUl = 'smart_ui_dept_ul' + deptCount;
		var deptop = 'smart_ui_dept_op' + deptCount;
		$('body').append($('<div>', {id: deptDiv, "class": 'kySelectUserDiv1'}));
		$("#"+deptDiv).append($('<ul>', {id: deptUl, "class": 'ztree kySelectUserUl2'}));
		$input.hide();
		var $pan = $("<div>")
		$pan.addClass("smart-ui").addClass("dept-panel");
		$pan.append($.smart.comn.templateProcess(options.itemTemplate, options.itemBlank));
		$input.after($pan);
		if(deptCount == 0){ // 第一个请求数据
			$.ajax({
		   		type: 'POST',
		   		url: $.smart.path + 'rpms/admin/AdminSmartAction/getNodes4dept.do',
		   		data: "type=" + options.type,
		  		success:function(zNodes){
		  			$.smart.dept.nodes = zNodes;
				},
		   		error: function(zNodes){
		    	}
			}); 
		}
		var zTreeTools, zTree;
		var setting = {
			check: {
				enable: true,
				chkStyle: "radio",
				radioType: "all"
			},
			view: {
				dblClickExpand: false
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onClick: function (e, treeId, treeNode) {
					var zTree = $.fn.zTree.getZTreeObj(treeId);
					zTree.checkNode(treeNode, !treeNode.checked, null, true);
					return false;
				},
				onCheck: function (e, treeId, treeNode) {
					var zTree = $.fn.zTree.getZTreeObj(treeId);
					var nodes = zTree.getCheckedNodes(true);
					if(nodes.length > 0){
						$input.val(nodes[0].id);
					} else {
						$input.val('');
					}
					//$($name).change();
				}
			}
		};
		$input.after($('<span>', {id: deptop, "class": 'kySelectDept1 kySelectSpan',title: "点击选择"}));
		$("#"+deptop).bind('click', function(){
			var objOffset = $(this).offset();
			$("#"+deptDiv).css({left:objOffset.left + "px", top:objOffset.top + $(this).outerHeight() + "px"});
			$(this).attr('class', function(){
				var c = $(this).attr('class');
				if(c == 'kySelectDept1 kySelectSpan'){
					$(".kySelectSpan[class*='2']").each(function(){
						$(this).click();
					});
					
					if($("li", "#"+deptUl).length == 0){
						// 加载节点
						zTreeTools = $.fn.zTree.init($("#"+deptUl), setting, $.smart.user.nodes);
						zTree = $.fn.zTree.getZTreeObj("#"+deptUl);
						// 选中默认
						var node = zTreeTools.getNodeByParam('id', $input.val());
						if(node){
							zTree.checkNode(node, true, null, false);
						}
						// 查询
						$("#"+deptUl).prepend("筛选：<input type='text' size='15'/>");
						$("input:text", "#"+deptUl).bind('propertychange input', function(){
							var text = $(this).val();
							var nodesAll = zTreeTools.getNodes();
							var node;
							var nodes = zTreeTools.getNodesByParamFuzzy("name", text, null);
							if(nodes.length>0){
								zTreeTools.hideNodes(nodesAll);
								for(var i = 0; i < nodes.length; i++){
									node = nodes[i];
									zTreeTools.showNode(node);
								}
							} else {
								zTreeTools.showNodes(nodesAll);
							}
						});
					}
					
					$("#"+deptDiv).slideDown("fast");
					$("body").bind("mousedown", function(e){
						if (!( e.target.id == deptop || $(e.target).parents('#'+deptDiv).length>0)) {
							$(".kySelectSpan[class*='2']").each(function(){
								$(this).click();
							});
						}
					});
					return 'kySelectDept2 kySelectSpan';
				} else {
					$("#"+deptDiv).slideUp("fast");
					$("body").unbind("mousedown");
					return 'kySelectDept1 kySelectSpan';
				}
			});
		});
	}
});
})(jQuery);