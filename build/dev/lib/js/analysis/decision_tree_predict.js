"use strict";define(["../chart/tree_chart","../../vendor/d3.min","../util/utils","ng!$q"],function(t,e,a,r){return{createCube:function(t,e){var r=e.layout,s=a.validateDimension(r.props.dimensions[0]),n=[{qDef:{qFieldDefs:[s]}}],d=r.props.measures.length,o=a.validateMeasure(r.props.measures[0])+" as mea0, "+a.validateMeasure(r.props.measures[1])+" as mea1",l="mea0 ~ mea1",p="SS";e.paramNames=["mea0","mea1"],e.measureLabels=[r.props.measures[0].label,r.props.measures[1].label];for(var i=2;i<d;i++){var h=a.validateMeasure(r.props.measures[i]);if(h.length>0){var u=","+h+" as mea"+i;o+=u,l+=" + mea"+i,p+="S",e.paramNames.push("mea"+i),e.measureLabels.push(r.props.measures[i].label)}}var c=a.splitData(!0,r.props.splitPercentage,d),m="class",b="";"anova"===r.props.rpartMethod&&(m="vector",b=",mean(abs(test_data$mea0-pred))"),a.displayDebugModeMessage(r.props.debugMode);var f=a.getDebugSaveDatasetScript(r.props.debugMode,"debug_decision_tree_predict.rda"),q="R.ScriptEvalExStr('"+p+"','"+f+" library(rpart);library(jsonlite);set.seed(10);\n              q<-lapply(q, function(x){ ifelse(!is.na(as.numeric(x)), as.numeric(x), x) }); "+c+"\n              res<-rpart("+l+', data=training_data, method="'+r.props.rpartMethod+'", control=list(minsplit='+r.props.minSplit+", minbucket="+r.props.minBucket+", cp="+r.props.cp+", maxdepth="+r.props.maxDepth+'));\n              pred <- predict(res, test_data, type="'+m+'"); conf.mat <- table(pred, test_data$mea0);\n              json<-toJSON(list(list(attributes(conf.mat)$dimnames[[1]], attributes(conf.mat)$dimnames[[2]]), unname(split(conf.mat, seq(nrow(conf.mat)))), c(length(training_data$mea0), length(test_data$mea0))'+b+")); json;',"+o+")";a.displayRScriptsToConsole(r.props.debugMode,[q]);var g=[{qDef:{qDef:q}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}}];return e.backendApi.applyPatches([{qPath:"/qHyperCubeDef/qDimensions",qOp:"replace",qValue:JSON.stringify(n)},{qPath:"/qHyperCubeDef/qMeasures",qOp:"replace",qValue:JSON.stringify(g)}],!1),e.patchApplied=!0,null},drawChart:function(t,e){var s=r.defer(),n=t.layout,d=[{qTop:0,qLeft:0,qWidth:6,qHeight:1}];return t.backendApi.getData(d).then(function(e){if(0===e[0].qMatrix[0][1].qText.length||"-"==e[0].qMatrix[0][1].qText)a.displayConnectionError(t.extId);else{a.displayReturnedDatasetToConsole(n.props.debugMode,e[0]);for(var r=JSON.parse(e[0].qMatrix[0][1].qText),d=r[0][0],o=r[0][1],l=r[1],p=r[2],i=function(t,e){return Math.round(t*Math.pow(10,e))/Math.pow(10,e)},h='\n            <h2>Confusion matrix:</h2>\n            <table class="simple" >\n              <thead>\n                <tr>\n                  <th rowspan="2" style="border-right:none;"></th><th rowspan="2"></th><th colspan="'+(o.length+1)+'" style="text-align:center">Actual class</th>\n                </tr>\n                <tr>\n                  ',u=0;u<o.length;u++)h+="<th>"+o[u]+"</th>";h+="<th>Precision</th></tr>\n            </thead>\n            <tbody>";for(var c=0,m=0,b=[],f=[],q=[],g=[],y=0;y<o.length;y++)f[y]=0,q[y]=0;for(var v=0;v<d.length;v++){h+=0===v?'<tr><td rowspan="'+(d.length+1)+'" style="font-weight:bold; white-space:nowrap; width:20px">Predicted class</td><td style="font-weight:bold">'+d[v]+"</td>":'<tr><td style="font-weight:bold">'+d[v]+"</td>";for(var M=0,D=0,x=0;x<o.length;x++)m+=l[v][x],D+=l[v][x],q[x]+=l[v][x],d[v]===o[x]&&(c+=l[v][x],M+=l[v][x],f[x]+=l[v][x]),h+="<td>"+l[v][x]+"</td>";b.push(M/D),h+="class"===n.props.rpartMethod?"<td>"+i(M/D*100,3)+"%</td></tr>":"<td>-</td></tr>"}h+='<tr><td style="font-weight:bold;">Recall</td>';for(var w=0;w<f.length;w++)h+="class"===n.props.rpartMethod?"<td>"+i(f[w]/q[w]*100,3)+"%</td>":"<td>-</td>",g.push(f[w]/q[w]);h+="<td></td></tr>",h+="</tbody>\n                  </table>";var S=function(t){return t.reduce(function(t,e,a,r){return t+e})},_=function(t,e){return S(t,e)/t.length};h+="anova"===n.props.rpartMethod?'<h2>Performance measures:</h2>\n                  <table class="simple" style="table-layout:fixed;">\n                    <thead>\n                      <tr>\n                        <th>Measures</th><th>Results</th>\n                      </tr>\n                    </thead>\n                    <tbody>\n                      <tr><td>Mean absolute error (MAE)</td><td>'+r[3]+"</td></tr>\n                    </tbody>\n                  </table>\n                ":'<h2>Performance measures:</h2>\n                  <table class="simple" style="table-layout:fixed;">\n                    <thead>\n                      <tr>\n                        <th>Measures</th><th>Results</th>\n                      </tr>\n                    </thead>\n                    <tbody>\n                      <tr><td>Accuracy</td><td>'+("class"===n.props.rpartMethod?i(c/m*100,3)+"%":"-")+"</td></tr>\n                      <tr><td>Average precision</td><td>"+("class"===n.props.rpartMethod?i(100*_(b),3)+"%":"-")+"</td></tr>\n                      <tr><td>Average recall</td><td>"+("class"===n.props.rpartMethod?i(100*_(g),3)+"%":"-")+"</td></tr>\n                    </tbody>\n                  </table>\n                ",h+='<h2>Number of rows:</h2>\n                  <table class="simple" style="table-layout:fixed;">\n                    <thead>\n                      <tr>\n                        <th>Datasets</th><th>Number of rows</th>\n                      </tr>\n                    </thead>\n                    <tbody>\n                      <tr><td>Training data</td><td>'+p[0]+"</td></tr>\n                      <tr><td>Test data</td><td>"+p[1]+"</td></tr>\n                      <tr><td>Total</td><td>"+(p[0]+p[1])+"</td></tr>\n                    </tbody>\n                  </table>\n                ",$(".advanced-analytics-toolsets-"+t.extId).html(h)}return s.resolve()}),s.promise}}});
//# sourceMappingURL=../../maps/analysis/decision_tree_predict.js.map
