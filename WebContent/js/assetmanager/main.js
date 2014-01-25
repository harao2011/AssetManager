$(function() {

    //csv control section

    var AssetManager = {};

    AssetManager.file;
    AssetManager.loadedData = [];//json
    AssetManager.dataHeader = ['target','result'];

    AssetManager.CONST = {
        LINE_DIVISION_DEFINE: 0,
        LINE_HEADER_COLUMN: 1
    };

    $('#inputSelectFile').bind('change', function(event) {
        AssetManager.file = event.target.files[0];//multi off
    });

    $('#inputLoadFile').bind('click', function() {
        if (!AssetManager.file || !AssetManager.file.type.match('text/csv')) {
            alert('CSVファイルを選択してください。');
        }
        var reader = new FileReader();
        reader.onload = function(event) {
            AssetManager.loadedData = [];
            var resultJsonObject = [];
            var divisionArray = event.target.result.split('#');
            //division loop
            for (var i = 0; i < divisionArray.length; i++) {
                if (!divisionArray[i] || divisionArray[i] == '') continue;
                var lineArray = divisionArray[i].split('¥n');
                var divObj = new Object();
                divObj.divisionName = lineArray[0].split(',')[0];
                if (lineArray[0].split(',')[1]) {
                    divObj.divisionClass = lineArray[0].split(',')[1];
                }

                var colItems = lineArray[1].split(',');
                if (!colItems || colItems.length == 0) continue;

                divObj.records = [];

                //TODO: column headerとbodyのカラム数が違った場合の制御

                //line loop
                for (var j = 2; j < lineArray.length; j++) {
                    var record = new Object();
                    var csvArray = lineArray[j].split(',');
                    //csv loop
                    for (var k = 0; k < csvArray.length; k++) {
                        record[colItems[k]] = csvArray[k];
                    }
                    if (canAdd(record)) {
                        divObj.records.push(record);
                    }
                }
                resultJsonObject.push(divObj);
            }
//            AssetManager.loadedData.push(resultJsonObject);
            
            for (var i = 0; i < resultJsonObject.length; i++) {
            	var tableName = resultJsonObject[i].divisionName;

                $("#" + tableName).jqGrid({
                    data:resultJsonObject[i].records,
                    datatype : "local",
                    colNames : colNames,
                    colModel : colModelSettings,
                    rowNum : 20,
                    rowList : [1, 10, 20],
                    caption : "Sample Display",
                    height : 200,
                    width : 400,
                    pager : getPagerName(tableName),
                    shrinkToFit : true,
                    viewrecords: true
                });
//                //TODO: ループして各テーブルに対応
//                loadChart('', resultJsonObject[i]);
            }
            //TODO: 基本的にはすぐ上のループの中に移動するはず
            //ここにIDを入れるところから=================================
            loadChart('divChartTotal', resultJsonObject[0].records, AssetManager.dataHeader);
        };
        reader.readAsText(AssetManager.file, "UTF-8");
        
        //TODO: 暫定ロジック
        function getPagerName(tableName) {
        	if (!tableName) throw new Error('Illigal Argment Error: tableName is null');
        	return tableName.replace('tableGrid', 'divPager');
        }

        function canAdd(record) {
            var colSet = AssetManager.dataHeader;
            for (var i = 0; i < colSet.length; i++) {
                var value = record[colSet[i]];
                if (!value || value == '') {
                    return false;
                }
            }
            return true;
        }

    });
    
    $('#inputSave').bind('click', function() {
    	var params = [];
    	var obj = {};
    	obj.id = '#tableGridTotal';
    	obj.header = $('#tableGridTotal').getGridParam('colNames');
    	obj.body = $('#tableGridTotal').getRowData(); 
    	params.push(obj);
    	
    	var paramsStr = JSON.stringify(params);
//    	var paramsStr = JSON.stringify(obj);

    	JobExecuter.getDownloadFile(getFileName(), paramsStr, function(data) {
            dwr.engine.openInDownload(data);
    	});

//        JobExecuter.getDownloadFile(name, text, function(data) {
//            dwr.engine.openInDownload(data);
//        });
    
    	//TODO: java化
        function getFileName() {
            return 'asset_manager_' + getDateString() + '.csv';

            function getDateString(date) {
                if (!date) {
                    date = new Date();
                }
                var yyyy =  date.getFullYear();
                var mm = toDoubleDigits(date.getMonth() + 1);
                var dd = toDoubleDigits(date.getDate());
                return yyyy + mm + dd;
            }

            function toDoubleDigits(num) {
                num += '';
                if (num.length === 1) {
                    num = '0' + num;
                }
                return num;
            }
        }

    });


    //grid control section
    var colModelSettings= [
        {name:"date",index:"date",width:40,align:"center",classes:"date_class"},
        {name:"target",index:"target",width:40,align:"center",classes:"target_class"},
        {name:"result",index:"result",width:40,align:"center",classes:"name_class"}
    ];

    var date = [
        {date:'2013/01',target:150000,result:150000},
        {date:'2013/02',target:300000,result:320000},
        {date:'2013/03',target:450000,result:460000},
        {date:'2013/04',target:600000,result:700000},
        {date:'2013/05',target:750000,result:800000},
        {date:'2013/06',target:900000,result:950000},
        {date:'2013/07',target:1050000,result:1230000},
        {date:'2013/08',target:1200000,result:1400000},
        {date:'2013/09',target:1350000,result:1590000},
        {date:'2013/10',target:1500000,result:1700000},
        {date:'2013/11',target:1650000,result:1800000},
        {date:'2013/12',target:1800000,result:2000000}

    ];

    var colNames = ["date","target","result"];
//    $("#tableGridTotal").jqGrid({
//        datatype : "local",
//        colNames : colNames,
//        colModel : colModelSettings,
//        rowNum : 10,
//        rowList : [1, 10, 20],
//        caption : "Sample Display",
//        height : 200,
//        width : 500,
//        pager : 'divPagerTotal',
//        shrinkToFit : true,
//        viewrecords:maxValue < dataArray[] true
//    });

//    $("#tableGridCash").jqGrid({
//        data:date,
//        datatype : "local",
//        colNames : colNames,
//        colModel : colModelSettings,
//        rowNum : 10,
//        rowList : [1, 10, 20],
//        caption : "Sample Display",
//        height : 200,
//        width : 400,
//        pager : 'pager',
//        shrinkToFit : true,
//        viewrecords: true
//    });
//
//    $("#tableGridInvestment").jqGrid({
//        data:date,
//        datatype : "local",
//        colNames : colNames,
//        colModel : colModelSettings,
//        rowNum : 10,
//        rowList : [1, 10, 20],
//        caption : "Sample Display",
//        height : 200,
//        width : 400,
//        pager : 'pager',
//        shrinkToFit : true,
//        viewrecords: true
//    });
    
    function loadChart(chartId, dataArray, keys) {
        var maxVal_Y = getMaxVal(dataArray);
        var scaleX = d3.scale.linear()
            .domain([0, dataArray.length])
            .range([0, 800]);
        var scaleY = d3.scale.linear()
            .domain([0, maxVal_Y])
            .range([0, 200]);

        var canvas = d3.select('#divChartTotal');

        var svg = canvas.append('svg')
            .attr('width', 800)
            .attr('height', 200);

        var lines = [];
        var colors = ['blue', 'red'];
        for (var idx = 0; idx < keys.length; idx++) {
            var line = d3.svg.line()
                .x(function(d, i) {
                    return scaleX(i);
                })
                .y(function(d, i) {
                    return scaleY((maxVal_Y - d[keys[idx]]));
                })
                .interpolate('linear');

            svg.append('path')
                .attr('d', line(dataArray))
                .attr('stroke', colors[idx])
                .attr('stroke-width', 2)
                .attr('fill', 'none');
        }

        //target, resultの最大値を返す
        function getMaxVal(dataArray) {
            var maxValue;
            for (var i = 0; i < dataArray.length; i++) {
                if ((!maxValue && maxValue != 0) || maxValue < dataArray[i].target) {
                    maxValue = dataArray[i].target;
                }
                if ((!maxValue && maxValue != 0) || maxValue < dataArray[i].result) {
                    maxValue = dataArray[i].result;
                }
            }
            return maxValue;
        }
    }

    var Initialize = function() {
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //All the File APIs are supported.
        } else {
            alert('In this Browser, You cannot use this application.');
        }
    };

    Initialize();
});