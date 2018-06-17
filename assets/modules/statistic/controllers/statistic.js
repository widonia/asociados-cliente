"use strict";

function StatisticCtrl($rootScope, StatisticService, CooperativeService, AuthManager){

    this.data = {};
    this.stats = {};
    this.chart = null;
    this.cooperative = AuthManager.get('cooperative');
    
    this.init = function(){
        this.data = {
            start: moment().startOf('month').format('YYYY-MM-DD'),
            end: moment().endOf("month").format('YYYY-MM-DD'),
        }
        this.getStatistics();
    }

    this.getStatistics = function(){
        $rootScope.$broadcast('loading-show2');
        CooperativeService.stats({id:this.cooperative}, this.onGetStatsSuccess.bind(this), this.onGetStatsError.bind(this));
        StatisticService.get({start:this.data.start, end:this.data.end, cooperative:this.cooperative}, this.onGetStatisticsSuccess.bind(this), this.onGetStatisticsError.bind(this));
    }

    this.onGetStatsSuccess = function(response){
        this.stats = response;
    }

    this.onGetStatsError = function(response){
        $rootScope.$broadcast('loading-hide2');
    }

    this.onGetStatisticsSuccess = function(response){
        $rootScope.$broadcast('loading-hide2');
        if(response.data != null){
            this.updateChart(response.data);
        }
    }

    this.onGetStatisticsError = function(response){
        $rootScope.$broadcast('loading-hide2');
    }

    this.updateChart = function(data){
        var new_data = [];

        for (var login in data.login){
            new_data.push({
                'key':login,
                'value':parseInt(data.login[login]),
            });
        }

        this.chart.setData(new_data);
    }

    this.chart = new Morris.Area({
        // ID of the element in which to draw the chart.
        element: 'time-chart',
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

    $('.input-daterange input').datepicker({
        autoclose:true,
        format: "yyyy/mm/dd",
    });

    // $('.date.start').datepicker({
    //     orientation: "bottom",
    //     format: "yyyy/mm/dd",
    // });

    // $('.date.end').datepicker({
    //     format: "yyyy/mm/dd",
    // });

    this.init();
}

angular
    .module('app.statistic.controllers')
    .controller('StatisticCtrl', StatisticCtrl)
