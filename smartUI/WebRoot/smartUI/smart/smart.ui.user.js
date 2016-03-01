/* smart.ui.comn.js
 * date: 2016-02-22
 */
(function ($) {
"use strict";
$.smart.user = $.smart.user || {version : "6.0"};
$.extend($.smart.user, {
	nodes: '[]',
	itemTemplate: "<div class='user-item'><span title='$\{dept}' class='name'>$\{name}</span><span id='$\{id}' title='移除' class='del'>x</span></div>",
	itemBlank: {"dept":"请选择人员","name":"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;","id":""},
	
});
$.smart.extend({
	selectUser : function (options) { /* 单选人 */
		options = $.extend(true, {
			multi : false // 是否多选
		}, $.smart.user, options);
		var $input = $(this);
		$input.hide();
		var $pan = $("<div>")
		$pan.addClass("smart-ui").addClass("user-panel");
		$pan.append($.smart.comn.templateProcess(options.itemTemplate, options.itemBlank));
		$input.after($pan);
		var ssuser_div_count = $("div[id^='keyan_ssuser_div']").length;
		var ssuser_div = 'keyan_ssuser_div' + ssuser_div_count;
		var $ssuser_div = '#' + ssuser_div;
		$('body').append($('<div>', {id: ssuser_div, "class": 'kySelectUserDiv'}));
		$($ssuser_div).append(
			$("<div>", {"class": "kySelectUserUl_div"})
			.append(
				$('<ul>', {id: ssuser_div + '_tree_ul', "class": 'ztree kySelectUserUl'})	
			)
		);
		$($ssuser_div).append($('<table>', {id: ssuser_div+'kySelectUserDiv_search_list'}));
		
		$($ssuser_div).append($('<table>', {id: ssuser_div+'kySelectUserDiv_search_pager'}));
		$($ssuser_div+'kySelectUserDiv_search_list').jqGrid({
		 	caption:"人员选择",
		   	url: $.smart.path + 'rpms/admin/AdminSmartAction/queryPeop4user.do',
		   	mtype:'post',
			datatype: "json",
			colModel :[
				{name:'id',hidden:true,hidedlg:true,sortable:false,resizable:false,search:false },
				{name:'checkbox',hidden:true,hidedlg:true,sortable:false,resizable:false,search:false},
				{name:'name',label:'姓名', index:'name_S', width:60 ,align:'center', searchoptions:{sopt:['cn','eq'],fuzzys:true}},
				{name:'unitCourt',label:'单位', index:'unitCourt.courtShortName_S', width:70, align:'left', searchoptions:{sopt:['cn','eq'],fuzzys:true}},
				{name:'dept',label:'部门', index:'dept.departmentShortName_S', width:70 ,align:'center', searchoptions:{sopt:['cn','eq'],fuzzys:true}},
				{name:'dutyType',label:'岗位', index:'dutyType_S', width:60 ,align:'center', searchoptions:{sopt:['cn','eq'],fuzzys:true}}
			], 
			jsonReader:{
				root: "rows", page: "page", total: "total", records: "records", repeatitems:false 
			},
			height:250,
			width:365,
		   	rownumbers:true,
		   	pager: $ssuser_div+'kySelectUserDiv_search_pager',
		   	rowNum: 10,
		   	rowList:[10,15,20],
		    viewrecords: true,
		    sortorder: "asc",
		    sortname:'workDate',
		    multiselect:true,
		    loadComplete: function (data) {
		    	$("#cb_" + ssuser_div + 'kySelectUserDiv_search_list').remove();
		    	var id = $($input).val();
		    	if(id){
		    		for (var i = 0; i < data.rows.length; i++) {
					    var row = data.rows[i];
						if(row["autoId"] == id){
							$(this).setSelection(i+1, true);
							break;
						}
					}
		    	}
			},
			onSelectRow: function(id,status){
				if(options.multi){ // 多选
					// check
					var row = $(this).getRowData(id);
					if(status){
						var data = {};
						data["id"] = row["id"];
						data["name"] = row["name"];
						data["dept"] = row["unitCourt"] +" > "+ row["dept"];
						var item = $.smart.comn.templateProcess(options.itemTemplate, data);
						item = $(item);
						$(".del", item).bind("click", function(){
							$(".del[id='"+ data["id"] +"']", $pan).closest(".user-item").remove();
							if($(".user-item", $pan).length == 0) {
								$pan.append($.smart.comn.templateProcess(options.itemTemplate, options.itemBlank));
							}
							var ids = $input.val();
							ids = $.smart.comn.stringDelete(ids, data["id"]);
							$input.val(ids);
						});
						$(".del[id='']", $pan).closest(".user-item").remove();
						$pan.append(item);
						var ids = $input.val();
						ids = $.smart.comn.stringAppend(ids, data["id"]);
						$input.val(ids);
						//$($inptObj1).change();
					} else {
						$(".del[id='"+ row["id"] +"']", $pan).click();
						//$($inptObj1).change();
					}
				} else { // 单选
					// uncheck others
					var ids  = $(this).jqGrid("getGridParam","selarrrow");
					for(var i=ids.length-1; i>=0; i-=1){
						if(ids[i] != id){
							$(this).setSelection(ids[i], false);
						}
					}
					// check
					var row = $(this).getRowData(id);
					if(status){
						var data = {};
						data["id"] = row["id"];
						data["name"] = row["name"];
						data["dept"] = row["unitCourt"] + row["dept"];
						var item = $.smart.comn.templateProcess(options.itemTemplate, data);
						item = $(item);
						$(".del", item).bind("click", function(){
							$(this).closest(".user-item").remove();
							$pan.append($.smart.comn.templateProcess(options.itemTemplate, options.itemBlank));
							$input.val("");
						});
						$pan.empty();
						$pan.append(item);
						$input.val(data["id"]);
						//$($inptObj1).change();
					} else {
						$pan.empty();
						$pan.append($.smart.comn.templateProcess(options.itemTemplate, options.itemBlank));
						$input.val("");
						//$($inptObj1).change();
					}
				}
				//console.log($input.val());
			}
		}).navGrid($ssuser_div+'kySelectUserDiv_search_pager',{keyanSch1:true});
		
		if(ssuser_div_count == 0){ // 第一个时请求数据
			$.ajax({
		   		type: 'POST',
		   		url: $.smart.path + 'rpms/admin/AdminSmartAction/getNodes4user.do',
		  		data: '',
		  		success:function(zNodes){
		  			$.smart.user.nodes = zNodes;
				},
		   		error: function(zNodes){
		    			
		    	}
			}); 
		}
		var zTreeTools ;
		var zTree ;
		var setting = {
			check: {
				enable: true,
				chkboxType: {"Y":"", "N":""}
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
				beforeClick: function (treeId, node) {
					//var zTree = $.fn.zTree.getZTreeObj(treeId);
					zTree.checkNode(node, !node.checked, null, true);
					return false;
				},
				/*onClick: function (e, treeId, node, flag) {
					var zTree = $.fn.zTree.getZTreeObj(treeId);
					zTree.checkNode(node, !node.checked, null, true);
					return false;
				},*/
				onCheck: function (e, treeId, node) {
					var nodes = zTree.getCheckedNodes();
					var param = {}, ids = "";
					for(var i = 0; i < nodes.length; i++){
						if(ids == ""){
							ids = nodes[i].id;
						} else {
							ids += "," + nodes[i].id;
						}
					}
					param["unitId"] = ids;
					$($ssuser_div+'kySelectUserDiv_search_list').setGridPostData(param, true);
					return true;
				}
			}
		};
		var $selUserDiv = $('<div>', {id: ssuser_div + '_span', "class": 'kySelectUser1 kySelectSpan',title: "点击选择"});
		$pan.before($selUserDiv);
		$selUserDiv.bind('click', function(){
			// 定位div
			var objOffset = $selUserDiv.offset();
			if(objOffset.left<550){
				$($ssuser_div).css({left:objOffset.left + "px", top:objOffset.top + $selUserDiv.outerHeight() + "px"});
			}else{
				$($ssuser_div).css({left:(objOffset.left-400) + "px", top:objOffset.top + $selUserDiv.outerHeight() + "px"});
			}
			// 显示隐藏，替换按钮样式
			$($ssuser_div + '_span').attr('class', function(){
				var c = $(this).attr('class');
				if(c == 'kySelectUser1 kySelectSpan'){
					$(".kySelectSpan[class*='2']").each(function(){
						$(this).click();
					});
					if($("li", $ssuser_div + "_tree_ul").length == 0){
						// 加载节点
						zTreeTools = $.fn.zTree.init($($ssuser_div + "_tree_ul"), setting, $.smart.user.nodes);
						zTree = $.fn.zTree.getZTreeObj(ssuser_div + '_tree_ul');
						// 选中默认
						var node = zTreeTools.getNodeByParam('id', $($input).val());
						if(node){
							zTree.checkNode(node, true, null, false);
						}
					}
					
					//$("#kySelectUserUl_div").setGridPostData({"deptId":node.id},true);
					// 展开
					$($ssuser_div).slideDown("fast");
					
					$("body").bind("mousedown", function(e){
						if (!( e.target.id == ssuser_div + '_span' || $(e.target).parents($ssuser_div).length>0)) {
							
							$(".kySelectSpan[class*='2']").each(function(){
								$(this).click();
							});
						}
					});
					return 'kySelectUser2 kySelectSpan';
				} else {
					// 收起
					$($ssuser_div).slideUp("fast");
					$("body").unbind("mousedown");
					return 'kySelectUser1 kySelectSpan';
				}
			});
		});
		$($ssuser_div + '_span');
	}
});
})(jQuery);