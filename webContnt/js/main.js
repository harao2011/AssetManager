$(function() {

    //csv control section

    var AssetManager = {};

    AssetManager.file;
    AssetManager.loadedData;//json

    $('#inputSelectFile').bind('change', function(event) {
        AssetManager.file = event.target.files[0];//multi off
    });

    $('#inputLoadFile').bind('click', function() {
        if (!AssetManager.file || !AssetManager.file.type.match('text/csv')) {
            alert('CSVファイルを選択してください。');
        }
        var reader = new FileReader();
        reader.onload = function(event) {
            //通常のCSVはこれでいける
            //#の区切りで分割する仕組み
            var csvArray = [];
            event.target.result.split('¥n').each(function() {
                var line = [];
                this.split(',').each(function() {
                    var cell = this;
                    line.push(cell);
                });
                csvArray.push(line);
            });

        };
        reader.readAsText(AssetManager.file);

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