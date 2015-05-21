"use strict";

function StatisticCtrl(StatisticService){

    this.data = {};
    this.chart = null;

    this.onChangeType = function(){
        this.data.date = '';
    }

    this.getStatistics = function(){
        StatisticService.get({date:this.data.date}, this.onGetStatisticsSuccess.bind(this), this.onGetStatisticsError.bind(this));
    }

    this.onGetStatisticsSuccess = function(response){
        if(response.data != null){
            console.log(response)
            this.updateChart(response.data.visitas);
        }
    }

    this.onGetStatisticsError = function(response){
        console.log(response)
    }

    this.updateChart = function(response){
        var monts = {
            1:'Enero',
            2:'Febrero',
            3:'Marzo',
            4:'Abril',
            5:'Mayo',
            6:'Junio',
            7:'Julio',
            8:'Agosto',
            9:'Septiembre',
            10:'Octubre',
            11:'Noviembre',
            12:'Diciembre',
        }
        var new_data = [];
        var element = 'hora'

        if( this.data.type == 'month'){
            element = 'dia'
        }
        if( this.data.type == 'year'){
            element = 'mes'
        }

        for (var key in response[element]){
            if(this.data.type == 'year'){ 
                new_data.push({
                    'key':monts[key],
                    'value':parseInt(response['mes'][key]),
                });
            }

            if(this.data.type == 'month'){ 
                new_data.push({
                    'key':key,
                    'value':parseInt(response[element][key]),
                });
            }

            if(this.data.type == 'day'){ 
                new_data.push({
                    'key': (parseInt(key) < 10) ? '0' + key +':00' : key+':00',
                    'value':parseInt(response[element][key]),
                });
            }

        }

        this.chart.setData(new_data);
    }

    this.chart = new Morris.Area({
        // ID of the element in which to draw the chart.
        element: 'time-chart',
        data: [
            { key: '2012 02 24 15:00', value: 10 },
            { key: '2012 02 24 16:00', value: 2 },
            { key: '2012 02 24 17:00', value: 6 },
            { key: '2012 02 24 18:00', value: 3 },
            { key: '2012 02 24 19:00', value: 10 }
        ],
        xkey: 'key',
        ykeys: ['value'],
        labels: ['Visitas'],
        resize: true,
        parseTime: false,
        lineWidth: 1,
        hideHover: 'auto',
        lineColors: ['#ff4400', '#22aa22'],
        pointSize: 4,
        fillOpacity: 0.02,
        // smooth: false,
        // grid: true,
        // axes: true,
        // behaveLikeLine: false,
        // goalStrokeWidth :1,
        // yLabelFormat: function (y) { return y.toString().split(".")[0]}
    });

    $('.date.year').datepicker({
        format: " yyyy",
        viewMode: "years", 
        minViewMode: "years"
    });

    $('.date.month').datepicker({
        format: "yyyy/mm",
        viewMode: "months", 
        minViewMode: "months"
    });

    $('.date.day').datepicker({
        format: "yyyy/mm/dd",
    });
}

angular
    .module('app.statistic.controllers')
    .controller('StatisticCtrl', StatisticCtrl)
