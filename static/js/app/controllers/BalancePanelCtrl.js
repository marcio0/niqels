'use strict';

function BalancePanelCtrl ($scope, $http, $rootScope, $filter) {
    $scope.updateBalance = function () {
        var today = moment();
        var reference_date, day, months;

        if ($rootScope.month == today.month()) {
            reference_date = today;
        }
        else {
            reference_date = today.endOf('month');
            reference_date.month($rootScope.month);
        }

        months = [reference_date];
        for (var i=0; i<2; i++) {
            var actual_date = months[i].clone().subtract('month', 1);
            months.push(actual_date);
        }

        months.reverse();

        for (var i in months) {
            months[i] = months[i].format('YYYY-MM');
        }

        months = angular.toJson(months);

        $http.get('/api/v1/data/balance/?months=' + months + '&up_to_day=' + reference_date.date()).then(function (result) {
            chartOptions;
            var categories = [],
                values = [];

            for(var k in result.data) {
                categories.push(k);
                var data = {};
                data.income = parseFloat(result.data[k].income);
                data.outcome = parseFloat(result.data[k].outcome)
                data.y = data.income + data.outcome;
                data.color = data.y < 0 ? 'red' : 'blue';
                values.push(data);
            }

            chartOptions.xAxis.categories = categories
            chartOptions.series = [{'data': values, name: 'asd'}];
            $scope.chartData = chartOptions;
        });
    };

    var chartOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
        },
        yAxis: {
            plotLines:[{
                value: 0,
                color: '#000',
                width: 1,
                zIndex: 4
            }]
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><div>',
            pointFormat:    '<p style="color:{series.color};">Income: <b>{point.income}</b></p>' +
                            '<p style="color:{series.color};">Outcome: <b>{point.outcome}</b></p>' +
                            '<p style="color:{series.color};">Total: <b>{point.y}</b></p>',
            footerFormat: '</div>',
            borderRadius: 0,
            shared: false,
            hideDelay: 50,
            animation: false,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        }
    };

    $rootScope.$on('transactionCreated', $scope.updateBalance);
    $rootScope.$on('transactionRemoved', $scope.updateBalance);
    $rootScope.$watch('month', $scope.updateBalance);

    $('#balance-help').popover();

    $('.side-panel').affix({offset: 40});
}

BalancePanelCtrl.$inject = ['$scope', '$http', '$rootScope', '$filter'];
