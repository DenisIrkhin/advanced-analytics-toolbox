"use strict";define(["../chart/line_chart","../util/utils","ng!$q"],function(e,r,s){return{createCube:function(e,s){var a=s.layout,o=r.validateDimension(a.props.dimensions[0]),p=[{qDef:{qFieldDefs:[o],qSortCriterias:[{qSortByExpression:a.props.dimSort||!a.props.dimSortByExpression?0:a.props.dimSortByExpressionAsc,qSortByNumeric:a.props.dimSort?1:a.props.dimSortByNum?a.props.dimSortByNumAsc:0,qSortByAscii:a.props.dimSort||!a.props.dimSortByAlph?0:a.props.dimSortByAlphAsc,qExpression:{qv:a.props.dimSortByExpressionString}}]}}],t=a.props.measures.length;s.rowsLabel=["(Intercept)",r.validateMeasure(a.props.measures[1])];for(var i=r.validateMeasure(a.props.measures[0])+" as mea0, "+r.validateMeasure(a.props.measures[1])+" as mea1",l="q$mea0 ~ q$mea1",n=2;n<t;n++){var u=r.validateMeasure(a.props.measures[n]);if(u.length>0){var d=","+u+" as mea"+n;i+=d,l+=" + q$mea"+n,s.rowsLabel.push(r.validateMeasure(a.props.measures[n]))}}r.displayDebugModeMessage(a.props.debugMode);var m=r.getDebugSaveDatasetScript(a.props.debugMode,"debug_regression_analysis_line_chart.rda"),c="R.ScriptEval('"+m+" lm_result <- lm("+l+');predict(lm_result, interval="'+a.props.interval+'", level='+a.props.confidenceLevel+")[,1]',"+i+")",q="R.ScriptEval('lm_result <- lm("+l+');predict(lm_result, interval="'+a.props.interval+'", level='+a.props.confidenceLevel+")[,2]',"+i+")",v="R.ScriptEval('lm_result <- lm("+l+');predict(lm_result, interval="'+a.props.interval+'", level='+a.props.confidenceLevel+")[,3]',"+i+")";r.displayRScriptsToConsole(a.props.debugMode,[c,q,v]);var f=r.validateMeasure(a.props.measures[0]),y=[{qDef:{qDef:f}},{qDef:{qDef:c}},{qDef:{qDef:q}},{qDef:{qDef:v}},{qDef:{qLabel:"-",qDef:""}}];return s.backendApi.applyPatches([{qPath:"/qHyperCubeDef/qDimensions",qOp:"replace",qValue:JSON.stringify(p)},{qPath:"/qHyperCubeDef/qMeasures",qOp:"replace",qValue:JSON.stringify(y)}],!1),s.patchApplied=!0,null},drawChart:function(a,o){var p=s.defer(),t=a.layout,i=(r.validateDimension(t.props.dimensions[0]),[{qTop:0,qLeft:0,qWidth:6,qHeight:1500}]);return a.backendApi.getData(i).then(function(s){var i=a.layout.qHyperCube.qMeasureInfo;if(isNaN(i[1].qMin)&&isNaN(i[1].qMax)&&isNaN(i[2].qMin)&&isNaN(i[2].qMax)&&isNaN(i[3].qMin)&&isNaN(i[3].qMax))r.displayConnectionError(a.extId);else{r.displayReturnedDatasetToConsole(t.props.debugMode,s[0]);var l=r.getDefaultPaletteColor(),n=[],u=[],d=[],m=[],c=[],q=[];$.each(s[0].qMatrix,function(e,r){n.push(r[0].qElemNumber),u.push(r[0].qText),d.push(r[1].qNum),m.push(r[2].qNum),c.push(r[3].qNum),q.push(r[4].qNum)});var v=[{x:u,y:d,elemNum:n,name:"Observed",mode:"lines+markers",fill:t.props.line,fillcolor:t.props.colors?"rgba("+l[3]+",0.3)":"rgba("+l[t.props.colorForMain]+",0.3)",marker:{color:t.props.colors?"rgba("+l[3]+",1)":"rgba("+l[t.props.colorForMain]+",1)",size:t.props.datapoints?t.props.pointRadius:1},line:{width:t.props.borderWidth}},{x:u,y:m,name:"Fit",line:{color:"rgba("+l[t.props.colorForSub]+",1)"}},{x:u,y:c,name:"Lower",fill:"tonexty",fillcolor:"rgba("+l[t.props.colorForSub]+",0.3)",type:"scatter",mode:"none"},{x:u,y:q,name:"Upper",fill:"tonexty",fillcolor:"rgba("+l[t.props.colorForSub]+",0.3)",type:"scatter",mode:"none"}];$(".advanced-analytics-toolsets-"+a.extId).html('<div id="aat-chart-'+a.extId+'" style="width:100%;height:100%;"></div>');var f=e.draw(a,v,"aat-chart-"+a.extId,null);e.setEvents(f,a,o)}return p.resolve()}),p.promise}}});
//# sourceMappingURL=../../maps/analysis/regression_analysis_line_chart.js.map
