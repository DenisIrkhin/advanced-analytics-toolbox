"use strict";define(["../chart/line_chart","../chart/datatables","../util/utils","ng!$q","../../vendor/d3-format.min"],function(e,r,a,t,o){return{createCube:function(e,r){var t=r.layout,o=a.validateDimension(t.props.dimensions[0]),s=[{qNullSuppression:!1,qDef:{qFieldDefs:[o]}}],i=a.validateMeasure(t.props.measures[0]),p="";p=t.props.autoARIMA?"fit<-auto.arima(data);":"fit<-arima(data, order=c("+t.props.AROrder+","+t.props.DegreeOfDifferencing+","+t.props.MAOrder+")\n                      ,seasonal=list(order=c("+t.props.SeasonalAROrder+","+t.props.SeasonalDegreeOfDifferencing+","+t.props.SeasonalMAOrder+"), period="+t.props.frequency+"));";var l="";t.props.frequency>0&&(l=",frequency="+t.props.frequency),a.displayDebugModeMessage(t.props.debugMode);var n=a.getDebugSaveDatasetScript(t.props.debugMode,"debug_timeseries_forecast.rda"),d="R.ScriptEvalExStr('N', '"+n+" library(jsonlite);library(dplyr);library(forecast);data<-ts(na.omit(q$Measure) "+l+");"+p+"\n      res<-forecast(fit, level="+t.props.confidenceLevel+", h="+t.props.forecastingPeriods+");\n      json<-toJSON(list(as.double(res$mean),as.double(res$upper),as.double(res$lower),arimaorder(fit))); json;', "+i+" as Measure)";a.displayRScriptsToConsole(t.props.debugMode,[d]);var u=[{qDef:{qDef:i}},{qDef:{qDef:d}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}}];return r.backendApi.applyPatches([{qPath:"/qHyperCubeDef/qDimensions",qOp:"replace",qValue:JSON.stringify(s)},{qPath:"/qHyperCubeDef/qMeasures",qOp:"replace",qValue:JSON.stringify(u)}],!1),r.patchApplied=!0,null},drawChart:function(o,s){var i=t.defer(),p=o.layout,l=[{qTop:0,qLeft:0,qWidth:6,qHeight:1500}];return o.backendApi.getData(l).then(function(t){if(0===t[0].qMatrix[0][1].qText.length||"-"==t[0].qMatrix[0][1].qText)a.displayConnectionError(o.extId);else{a.displayReturnedDatasetToConsole(p.props.debugMode,t[0]);var l=a.getDefaultPaletteColor(),n=JSON.parse(t[0].qMatrix[0][2].qText),d=n[0],u=n[1],c=n[2],f=n[3];if("undefined"==typeof o.layout.props.displayTable||0==o.layout.props.displayTable){var h={},m=t[0].qMatrix.length,q=[],b=[],y=[];$.each(t[0].qMatrix,function(e,r){q.push(r[0].qElemNumber),b.push(r[0].qText),y.push(r[1].qNum)}),h.elemNum=q,h.dim1=b,h.mea1=y;for(var g=new Array(m),x=new Array(m),v=new Array(m),D=0;D<p.props.forecastingPeriods;D++)h.dim1.push("+"+(D+1)),g.push(d[D]),x.push(u[D]),v.push(c[D]);h.mea2=g,h.mea3=x,h.mea4=v;var M="";0<f.length&&f.length<=3?M="("+f[0]+","+f[1]+","+f[2]+")":f.length<=6?M="("+f[0]+","+f[1]+","+f[2]+")("+f[3]+","+f[4]+","+f[5]+")":6<f.length&&(M="("+f[0]+","+f[1]+","+f[2]+")("+f[3]+","+f[4]+","+f[5]+")["+f[6]+"]");var A=[{x:h.dim1,y:h.mea1,elemNum:h.elemNum,name:"Observed",mode:"lines+markers",fill:p.props.line,fillcolor:p.props.colors?"rgba("+l[3]+",0.3)":"rgba("+l[p.props.colorForMain]+",0.3)",marker:{color:p.props.colors?"rgba("+l[3]+",1)":"rgba("+l[p.props.colorForMain]+",1)",size:p.props.datapoints?p.props.pointRadius:1},line:{width:p.props.borderWidth}},{x:h.dim1,y:h.mea2,name:"Fit",mode:"lines+markers",marker:{color:p.props.colors?"rgba("+l[7]+",1)":"rgba("+l[p.props.colorForSub]+",1)",size:p.props.datapoints?p.props.pointRadius:1},line:{width:p.props.borderWidth}},{x:h.dim1,y:h.mea3,name:"Upper",fill:"tonexty",fillcolor:"rgba("+l[p.props.colorForSub]+",0.3)",type:"scatter",mode:"none"},{x:h.dim1,y:h.mea4,name:"Lower",fill:"tonexty",fillcolor:"rgba("+l[p.props.colorForSub]+",0.3)",type:"scatter",mode:"none"}],S={xaxis:{type:"category",title:o.layout.props.xLabelsAndTitle?o.layout.props.dimensions[0].label:"",showgrid:o.layout.props.xScale,side:o.layout.props.xAxisPosition}};p.props.displayARIMAParams?$(".advanced-analytics-toolsets-"+o.extId).html('\n                <div style="width:100%;height:5%;text-align:right;">ARIMA'+M+'</div>\n                <div id="aat-chart-'+o.extId+'" style="width:100%;height:95%;"></div>\n              '):$(".advanced-analytics-toolsets-"+o.extId).html('<div id="aat-chart-'+o.extId+'" style="width:100%;height:100%;"></div>');var w=e.draw(o,A,"aat-chart-"+o.extId,S);e.setEvents(w,o,s)}else{var N=a.getLocale(o,0),O=a.getNumberFormat(o,0),I=(t[0].qMatrix.length,[]);$.each(t[0].qMatrix,function(e,r){I.push([r[0].qElemNumber,r[0].qText,N.format(O)(r[1].qNum).replace(/G/,"B"),"","",""])});for(var T=0;T<p.props.forecastingPeriods;T++)I.push(["","+"+(T+1),"",N.format(O)(d[T]).replace(/G/,"B"),N.format(O)(u[T]).replace(/G/,"B"),N.format(O)(c[T]).replace(/G/,"B")]);var R='\n              <table id="aat-table-'+o.extId+'" class="display">\n                <thead>\n                  <tr>\n                    <th>qElemNumber</th>\n                    <th>'+o.layout.props.dimensions[0].label+"</th>\n                    <th>"+o.layout.props.measures[0].label+"</th>\n                    <th>Fit</th>\n                    <th>Lower</th>\n                    <th>Upper</th>\n                  </tr>\n                </thead>\n                <tbody>\n                </tbody>\n              </table>";r.draw(s,o,"#aat-table-"+o.extId,I,R,null).then(function(e){r.setEvents(e,o,s)})}}return i.resolve()}),i.promise}}});
//# sourceMappingURL=../../maps/analysis/timeseries_forecast.js.map
