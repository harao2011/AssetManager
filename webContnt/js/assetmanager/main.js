$(function() {

    //csv control section

    var AssetManager = {};

    AssetManager.file;
    AssetManager.loadedData = [];//json

    AssetManager.CONST = {
        LINE_DIVISION_DEFINE: 0,
        LINE_HEADER_COLUMN: 1
    }

    $('#inputSelectFile').bind('change', function(event) {
        AssetManager.file = event.target.files[0];//multi off
    });

    $('#inputLoadFile').bind('click', function() {
        if (!AssetManager.file || !AssetManager.file.type.match('text/csv')) {
            alert('CSVファイルを選択してください。');
        }
        var reader = new FileReader();
        reader.onload = function(event) {
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

                //TODO: column headerとbodyの長さが違った場合の制御

                //line loop
                for (var j = 2; j < lineArray.length; j++) {
                    var record = new Object();
                    var csvArray = lineArray[j].split(',');
                    //csv loop
                    for (var k = 0; k < csvArray.length; k++) {
                        record[colItems[j]] = csvArray[k];
                    }
                    divObj.records.push(record);
                }
                resultJsonObject.push(divObj);
            }
            AssetManager.loadedData.push(resultJsonObject);
        };
        reader.readAsBinaryString(AssetManager.file);

    });


    //grid control section
    var colModelSettings= [
        {name:"date",index:"date",width:70,align:"center",classes:"date_class"},
        {name:"target",index:"target",width:70,align:"center",classes:"target_class"},
        {name:"result",index:"result",width:200,align:"center",classes:"name_class"}
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
    $("#tableGridTotal").jqGrid({
        data:date,
        datatype : "local",
        colNames : colNames,
        colModel : colModelSettings,
        rowNum : 10,
        rowList : [1, 10, 20],
        caption : "Sample Display",
        height : 200,
        width : 500,
        pager : 'divPagerTotal',
        shrinkToFit : true,
        viewrecords: true
    });

    $("#tableGridCash").jqGrid({
        data:date,
        datatype : "local",
        colNames : colNames,
        colModel : colModelSettings,
        rowNum : 10,
        rowList : [1, 10, 20],
        caption : "Sample Display",
        height : 200,
        width : 500,
        pager : 'pager',
        shrinkToFit : true,
        viewrecords: true
    });

    $("#tableGridInvestment").jqGrid({
        data:date,
        datatype : "local",
        colNames : colNames,
        colModel : colModelSettings,
        rowNum : 10,
        rowList : [1, 10, 20],
        caption : "Sample Display",
        height : 200,
        width : 500,
        pager : 'pager',
        shrinkToFit : true,
        viewrecords: true
    });

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