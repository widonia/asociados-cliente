"use strict";

function HomeCtrl($rootScope, StatisticService, CooperativeService, AuthManager, Config){
    this.username = AuthManager.username;
    this.last_login = AuthManager.last_login;

    this.data = {};
    this.stats = {};
    this.chart = null;

    this.cooperative = AuthManager.get('cooperative');
    this.cooperative_data = {}
    this.MEDIA = Config.MEDIA;
    
    this.init = function(){
        this.data = {
            start: moment().startOf('month').format('YYYY-MM-DD'),
            end: moment().endOf("month").format('YYYY-MM-DD'),
        }
        this.getCooperative();
        this.getStatistics();
    }

    this.getStatistics = function(){
        $rootScope.$broadcast('loading-show2');
        CooperativeService.stats({id:this.cooperative}, this.onGetStatsSuccess.bind(this), this.onGetStatsError.bind(this));
        StatisticService.get({start:this.data.start, end:this.data.end, cooperative:this.cooperative}, this.onGetStatisticsSuccess.bind(this), this.onGetStatisticsError.bind(this));
    }

    this.getCooperative = function(){
        CooperativeService.get({id:this.cooperative}, this.onGetCooperativeSucces.bind(this), this.onGetCooperativeError.bind(this));
    }

    this.onGetCooperativeSucces = function(response){        
        this.cooperative_data = response;
    }

     this.onGetCooperativeError = function(response){
        $rootScope.$broadcast('loading-hide2');
    }

    this.onGetStatsSuccess = function(response){
        this.stats = response;
    }

    this.onGetStatsError = function(response){
        $rootScope.$broadcast('loading-hide2');
        // console.log(response)
    }

    this.onGetStatisticsSuccess = function(response){
        $rootScope.$broadcast('loading-hide2');
        if(response.data != null){
            // console.log(response)
            this.updateChart(response.data);
        }
    }

    this.onGetStatisticsError = function(response){
        $rootScope.$broadcast('loading-hide2');
        // console.log(response)
    }

    this.updateChart = function(data){
        var new_data = [];

        for (var login in data.login){
            // console.log(login);
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

    this.init();

}

angular
    .module('app.home.controllers')
    .controller('HomeCtrl', HomeCtrl)
