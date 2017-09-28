"use strict";define(["../chart/tree_chart","../../vendor/d3.min","../util/utils","ng!$q"],function(e,a,t,r){return{createCube:function(e,a){var r=a.layout,s=t.validateDimension(r.props.dimensions[0]),i=[{qDef:{qFieldDefs:[s]}}],p=r.props.measures.length,n=t.validateMeasure(r.props.measures[0])+" as mea0, "+t.validateMeasure(r.props.measures[1])+" as mea1",o="mea0 ~ mea1",l="SS";a.paramNames=["mea0","mea1"],a.measureLabels=[r.props.measures[0].label,r.props.measures[1].label];for(var d=2;d<p;d++){var u=t.validateMeasure(r.props.measures[d]);if(u.length>0){var m=","+u+" as mea"+d;n+=m,o+=" + mea"+d,l+="S",a.paramNames.push("mea"+d),a.measureLabels.push(r.props.measures[d].label)}}var c=t.splitData(r.props.splitDataset,r.props.splitPercentage,p);t.displayDebugModeMessage(r.props.debugMode);var q=t.getDebugSaveDatasetScript(r.props.debugMode,"debug_decision_tree.rda"),f="R.ScriptEvalExStr('"+l+"','"+q+" library(rpart);library(partykit);library(d3r);library(jsonlite);set.seed(10);\n              q<-lapply(q, function(x){ ifelse(!is.na(as.numeric(x)), as.numeric(x), x) }); "+c+"\n              res<-rpart("+o+', data=training_data, method="'+r.props.rpartMethod+'", control=list(minsplit='+r.props.minSplit+", minbucket="+r.props.minBucket+", cp="+r.props.cp+", maxdepth="+r.props.maxDepth+'));\n              pa<-partykit::as.party(res); if(length(pa) > 0) {node<-d3_party(res);} else {node <- c("root");}\n              json<-toJSON(list(levels(factor(training_data$mea0)),node)); json;\','+n+")";t.displayRScriptsToConsole(r.props.debugMode,[f]);var h=[{qDef:{qDef:f}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}}];return a.backendApi.applyPatches([{qPath:"/qHyperCubeDef/qDimensions",qOp:"replace",qValue:JSON.stringify(i)},{qPath:"/qHyperCubeDef/qMeasures",qOp:"replace",qValue:JSON.stringify(h)}],!1),a.patchApplied=!0,null},drawChart:function(a,s){var i=r.defer(),p=a.layout,n=(t.validateDimension(p.props.dimensions[0]),[{qTop:0,qLeft:0,qWidth:6,qHeight:1}]);return a.backendApi.getData(n).then(function(r){if(0===r[0].qMatrix[0][1].qText.length||"-"==r[0].qMatrix[0][1].qText)t.displayConnectionError(a.extId);else{t.displayReturnedDatasetToConsole(p.props.debugMode,r[0]);var n=JSON.parse(r[0].qMatrix[0][1].qText);if("root"==n[1][0])$(".advanced-analytics-toolsets-"+a.extId).html('<div id="aat-chart-'+a.extId+'" style="width:100%;height:100%;">\n              <p style="width:100%;text-align:center;position:relative;top:50%;transform:translateY(-50%);">Only root node is returned. More information needs to be provided to grow the decision tree.\n              </div>');else{a.levelsList=n[0];var o=JSON.parse(n[1]);$(".advanced-analytics-toolsets-"+a.extId).html('<div id="aat-chart-'+a.extId+'" style="width:100%;height:100%;"></div>'),e.draw(a,s,o,"aat-chart-"+a.extId,null)}}return i.resolve()}),i.promise}}});
//# sourceMappingURL=../../maps/analysis/decision_tree.js.map
