angular.module("iotApp")
  .controller("chartController", ['$scope', '$http', '$interval', '$location',
    function ($scope, $http, $interval, $location) {

      const axes = [{dataField: 'temp', yAxis: 1, type: 'line', label: 'Temp'},
        {dataField: 'humidity', yAxis: 1, type: 'line', label: 'Humidity'},
        {dataField: 'lux', yAxis: 2, type: 'line', label: 'Lux'},
        // {dataField: 'pressure', yAxis: 3, type: 'bar', label: 'Pressure'}
      ];

      function processData(result) {
        var data = [];

        for (var idx in axes) {

          var axis = axes[idx];
          var values = [];

          for (var x = 0; x < result.length; x++) {
            var dataPoint = result[x];
            var xValue = x;
            var yValue = dataPoint[axis.dataField];
            values.push({x: xValue, y: yValue})
          }

          var series = {
            key: axis.label,
            type: axis.type,
            yAxis: axis.yAxis,
            values: values
          };

          data.push(series);

        }

        $scope.data = data;
      }

      function loadData() {
        var dataHost = $location.host() === 'localhost' ? 'http://imp.rori.me' : '';
        $http.get(dataHost + '/api/message')
          .then(function (result) {
            $scope.rawData = JSON.stringify(result.data, undefined, 2);
            processData(result.data);
          })
          .catch(function (err) {
            $scope.message = "Unable to retrieve data. Please try again later.";
            console.error(err);
          })
      }


      $scope.options = {

        chart: {
          type: 'multiChart',
          height: 450,
          margin: {
            top: 30,
            right: 60,
            bottom: 50,
            left: 70
          },
          color: d3.scale.category10().range(),
          useInteractiveGuideline: true,
          transitionDuration: 300,
          xAxis: {},
          yAxis1: {},
          yAxis2: {},
          yAxis3: {}
        }
      };

      loadData();
      $interval(function () {
        loadData();
      }.bind(this), 5 * 60 * 1000);

    }]);
