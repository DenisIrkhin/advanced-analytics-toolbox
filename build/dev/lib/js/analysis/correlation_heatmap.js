"use strict";define(["../chart/heatmap","../util/utils","ng!$q"],function(e,a,r){return{createCube:function(e,r){var t=r.layout,s=a.validateDimension(t.props.dimensions[0]),o=[{qDef:{qFieldDefs:[s]}}],i=t.props.measures.length;r.rowsLabel=[a.validateMeasure(t.props.measures[0])];for(var l=a.validateMeasure(t.props.measures[0])+" as mea0",n="q$mea0",p="N",d=1;d<i;d++){var u=a.validateMeasure(t.props.measures[d]);if(u.length>0){var q=","+u+" as mea"+d;l+=q,n+=", q$mea"+d,p+="N",r.rowsLabel.push(a.validateMeasure(t.props.measures[d]))}}a.displayDebugModeMessage(t.props.debugMode);var f=a.getDebugSaveDatasetScript(t.props.debugMode,"debug_correlation_heatmap.rda"),h="R.ScriptEvalExStr('"+p+"','"+f+" library(jsonlite);res<-cor(data.frame("+n+"));json<-toJSON(res);json;',"+l+")";a.displayRScriptsToConsole(t.props.debugMode,[h]);var b=[{qDef:{qDef:h}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}}];return r.backendApi.applyPatches([{qPath:"/qHyperCubeDef/qDimensions",qOp:"replace",qValue:JSON.stringify(o)},{qPath:"/qHyperCubeDef/qMeasures",qOp:"replace",qValue:JSON.stringify(b)}],!1),r.patchApplied=!0,null},drawChart:function(t){var s=r.defer(),o=t.layout,i=(a.validateDimension(o.props.dimensions[0]),[{qTop:0,qLeft:0,qWidth:6,qHeight:1}]);return t.backendApi.getData(i).then(function(r){t.layout.qHyperCube.qMeasureInfo;if(0===r[0].qMatrix[0][1].qText.length||"-"==r[0].qMatrix[0][1].qText)a.displayConnectionError(t.extId);else{a.displayReturnedDatasetToConsole(o.props.debugMode,r[0]);var i=(a.getDefaultPaletteColor(),JSON.parse(r[0].qMatrix[0][1].qText)),l=[{x:t.rowsLabel,y:t.rowsLabel,z:i,type:"heatmap",showscale:!0}],n=[];n.annotations=[];for(var p=0;p<t.rowsLabel.length;p++)for(var d=0;d<t.rowsLabel.length;d++){var u={xref:"x1",yref:"y1",x:t.rowsLabel[d],y:t.rowsLabel[p],text:i[p][d],showarrow:!1,font:{color:"white"}};n.annotations.push(u)}$(".advanced-analytics-toolsets-"+t.extId).html('<div id="aat-chart-'+t.extId+'" style="width:100%;height:100%;"></div>'),e.draw(t,l,"aat-chart-"+t.extId,n)}return s.resolve()}),s.promise}}});
//# sourceMappingURL=../../maps/analysis/correlation_heatmap.js.map
