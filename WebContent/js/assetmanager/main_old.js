$(function() {
	
	var AssetManager = {};
    //列の表示名
    var colNames = ["","No.","name","age","local","hobby"];

    //列の設定
    var colModelSettings= [	{name:"radio",index:"radio",width:50,align:"center",classes:"radio_class"},
    {name:"no",index:"no",width:70,align:"center",classes:"no_class"},
    {name:"name",index:"name",width:200,align:"center",classes:"name_class"},
    {name:"age",index:"age",width:200,align:"center",classes:"age_class"},
    {name:"local",index:"local",width:200,align:"center",classes:"local_class"},
    {name:"hobby",index:"hobby",width:200,align:"center",classes:"hobby_class"}
    ];
    

    var date = [
        {no:1, name:"nakagawa", age:20, local:"Japan", hobby:"Tennis"},
        {no:2, name:"nakayama", age:20, local:"Japan", hobby:"Soccer"}];

//テーブルの作成
    $("#mainGrid").jqGrid({
        data:date,  //表示したいデータ
        datatype : "local",            //データの種別 他にjsonやxmlも選べます。
        //しかし、私はlocalが推奨です。
        colNames : colNames,           //列の表示名
        colModel : colModelSettings,   //列ごとの設定
        rowNum : 10,                   //一ページに表示する行数
        rowList : [1, 10, 20],         //変更可能な1ページ当たりの行数
        caption : "Sample Display",    //ヘッダーのキャプション
        height : 200,                  //高さ
        width : 500,                   //幅
        pager : 'mainPager',              //footerのページャー要素のid
        shrinkToFit : true,
        viewrecords: true              //footerの右下に表示する。
});


    $('#btnFileSelect').val('');
    AssetManager.file = undefined;
    AssetManager.reader = new FileReader();

//    var dataset = [5,10,15,20,25];

//    d3.select('body')
//        .append('p')
//        .text('新しいパラグラフ');

//    d3.select()
//        .data(dataset)
//        .enter()
//        .append('div')
//        .attr('class','bar')
//        .style('height', function(d) {
//            return d * 5 + 'px';
//        });
	
    $('#btnSave').bind('click', function() {
        var name = getFileName();
        var text = getCsvText();
        JobExecuter.getDownloadFile(name, text, function(data) {
            dwr.engine.openInDownload(data);
        });

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

        function getCsvText() {
            var saveText = '';
            $('body').find('.save').each(function(index) {
                var elem = $(this);
                if (saveText) {
                    saveText += ',';
                }
                saveText += elem.attr('id') + ':' + elem.text();
            });
            return saveText;
        }
    });

    $('#btnFileSelect').bind('change', function(event) {
        var file = event.target.files[0];
        if (canLoad(file))  {
            AssetManager.file = file;
        } else {
            //TODO: ファイル選択状態を初期化することはできるのか。たぶんできるだろ。
            throw new Error('Illegal File Error');
        }

        function canLoad(file) {
            return true;
        }
        });

    $('#btnFileLoad').bind('click', function() {
        AssetManager.reader.readAsText(AssetManager.file, "UTF-8");
    });

    AssetManager.reader.onload = function(event) {
        var values = [];
        var result = event.target.result;
        var dataArr = [];
        values = result.split(',');
        for(var i = 0; i < values.length; i++) {
            var value = values[i];
            var id = value.split(':')[0];
            var value = value.split(':')[1];

            var dataObj = {
                dateVal: undefined,
                planVal: undefined,
                realVal: undefined
            };

            $('#' + id).text(value);
        }
        loadChart();
    };

    $('#btnLoadChart').bind('click', function() {
        loadChart();


//        function loadChart() {
//            var canvas = d3.select('#chart');
//            var svg = canvas.append('svg')
//                .attr('width', 200)
//                .attr('height', 200);
//
//            var dataArr = [
//                {month: 1, count: 10},
//                {month: 2, count: 20},
//                {month: 3, count: 30},
//                {month: 4, count: 40},
//                {month: 5, count: 50},
//                {month: 6, count: 60},
//                {month: 7, count: 70},
//                {month: 8, count: 80}
//            ];
//
//            var scaleX = d3.scale.linear()
//                .domain([0, dataArr.length])
//                .range([0, 200]);
//            var scaleY = d3.scale.linear()
//                .domain([0, d3.max(dataArr, function(d) {return d.count;})])
//                .range([10, 200]);
//
//            var area = d3.svg.area()
//                .x(function(d, i) {
//                    return scaleX(i);
//                }).y0(function(d, i) {
//                    return scaleY(d3.max(dataArr, function(d) {return d.count;}) - d.count + 10);
//                }).y1(function(d, i) {
//                    return scaleY(d3.max(dataArr, function(d) {return d.count;}));
//                });
//
//            svg.append('path')
//                .attr('d', area(dataArr))
//                .attr('fill', 'aqua');
//
//            var line = d3.svg.line()
//                .x(function(d,i) {
//                    return scaleX(i);
//                }).y(function(d,i) {
//                    return scaleY(d3.max(dataArr, function(d){return d.count;}) - d.count + 10);
//                }).interpolate('linear');
//            svg.append('path')
//                .attr('d', line(dataArr))
//                .attr('stroke', 'blue')
//                .attr('stroke-width', 2)
//                .attr('fill', 'none');
//        }
    });

    function loadChart() {
        var dataArr = [];
        $('.tableAll tr').each(function(index) {
            var elem = $(this);
            var data = {
                date: undefined,
                planVal: undefined,
                realVal: undefined
            };
            if (elem.data('date')) {
                data.date = elem.data('date');
                data.planVal = parseInt(elem.children('.plan').text());
                data.realVal = parseInt(elem.children('.real').text());
                dataArr.push($.extend({}, data));
            }
        });
        dataArr.sort(
            function(a,b){
                if(a.date < b.date ) return -1;
                if( a.date > b.date ) return 1;
                return 0;
            }
        );

        var maxVal_X = d3.max(dataArr, function(d) {return d.planVal > d.realVal ? d.planVal : d.realVal;});

        var scaleX = d3.scale.linear()
            .domain([0, dataArr.length])
            .range([0, 500]);
        var scaleY = d3.scale.linear()
            .domain([0, maxVal_X])
            .range([0, 200]);

        var canvas = d3.select('#chart');
        var svg = canvas.append('svg')
            .attr('width', 500)
            .attr('height', 200);


        drowLine('plan', 'blue');
        drowLine('real','green');
//
//        svg.append('path')
//            .attr('d', lineReal)
////            .attr('d', linePlan)
//            .attr('stroke', 'blue')
//            .attr('stroke-width', 2)
//            .attr('fill', 'none');

        function drowLine(type, color) {
//
//        var area = d3.svg.area()
//            .x(function(d, i) {
//                return scaleX(i);
//            }).y0(function(d, i) {
//                return scaleY(d3.max(dataArr, function(d) {return d.realVal;}) - d.realVal);
//            }).y1(function(d, i) {
//                return scaleY(d3.max(dataArr, function(d) {return d.realVal;}));
//            });
//
//        svg.append('path')
//            .attr('d', area(dataArr))
//            .attr('fill', 'aqua');

            var line = d3.svg.line()
                .x(function(d,i) {
                    return scaleX(i);
                }).y(function(d,i) {
                    return scaleY(maxVal_X - getVal(d));
                }).interpolate('linear');

            svg.append('path')
                .attr('d', line(dataArr))
//            .attr('d', linePlan)
                .attr('stroke', color)
                .attr('stroke-width', 2)
                .attr('fill', 'none');

            return $.extend({}, line(dataArr));
//            return $.extend({}, line);

            function getVal(data) {
                if (type == 'plan') {
                    return data.planVal;
                } else if (type == 'real') {
                    return data.realVal;
                }
            }
        }
    }
});