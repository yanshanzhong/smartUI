<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  	<script type="text/javascript" src="<%=path %>/smartUI/jquery/jquery-1.11.0.js"></script>
    <script type="text/javascript" src="<%=path %>/smartUI/smart/smart.debug-6.1.js"></script>
  </head>
  <body>
  	<table id="tree"></table>
    <div id="pager"></div>
    
    <script type="text/javascript"> 
    
        jQuery(document).ready(function($) {
			jQuery('#tree').jqGrid({
				"url":"/smartUI/smartUI/data/jqGrid/data.json",
				"colModel":[
					{
						"name":"category_id",
						"index":"accounts.account_id",
						"sorttype":"int",
						"key":true,
						"hidden":true,
						"width":50
					},{
						"name":"name",
						"index":"name",
						"sorttype":"string",
						"label":"Name",
						"width":170
					},{
						"name":"price",
						"index":"price",
						"sorttype":"numeric",
						"label":"Price",
						"width":90,
						"align":"right"
					},{
						"name":"qty_onhand",
						"index":"qty_onhand",
						"sorttype":"int",
						"label":"Qty",
						"width":90,
						"align":"right"
					},{
						"name":"color",
						"index":"color",
						"sorttype":"string",
						"label":"Color",
						"width":100
					},{
						"name":"lft",
						"hidden":true
					},{
						"name":"rgt",
						"hidden":true
					},{
						"name":"level",
						"hidden":true
					},{
						"name":"uiicon",
						"hidden":true
					}
				],
				"beforeRequest" : function() {
					if(this.p.postData.nodeid != null) {
						var nid = parseInt(this.p.postData.nodeid,10);
						console.log(nid);
						if( nid > -1 ) {
							switch(nid) {
								case 1 : 
									this.p.url = "/smartUI/smartUI/data/jqGrid/data1.json";
									break;
								case 2 : 
									this.p.url = "/smartUI/smartUI/data/jqGrid/data2.json";
									break;
								case 3 : 
									this.p.url = "/smartUI/smartUI/data/jqGrid/data3.json";
									break;
								case 23 : 
									this.p.url = "/smartUI/smartUI/data/jqGrid/data23.json";
									break;
							}
						}
					}
				},
				"width":"780",
				"hoverrows":false,
				"viewrecords":false,
				"gridview":true,
				"height":"auto",
				"sortname":"lft",
				"loadonce":false,
				"rowNum":100,
				"scrollrows":true,
				// enable tree grid
				"treeGrid":true,
				// which column is expandable
				"ExpandColumn":"name",
				// datatype
				"treedatatype":"json",
				// the model used
				"treeGridModel":"nested",
				// configuration of the data comming from server
				"treeReader":{
					"left_field":"lft",
					"right_field":"rgt",
					"level_field":"level",
					"leaf_field":"isLeaf",
					"expanded_field":"expanded",
					"loaded":"loaded",
					"icon_field":"icon"
				},
				"sortorder":"asc",
				"datatype":"json",
				"pager":"#pager"
			}); 
		});

    </script>
    
  </body>
</html>
