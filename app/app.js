var iotApp = angular.module("iotApp", ['ui.router', 'nvd3']);

iotApp.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");

  $stateProvider

    .state('home', {
      url : "/home",
      templateUrl : "views/chart.html",
      controller: "chartController"
    });

});

iotApp.controller("appController", function($scope) {
});