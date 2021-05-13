'use strict';

// Declare app level module which depends on views, and core components
var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      redirectTo: 'main'
    })
    .when("/main", {
      templateUrl : "pages/main.html",
      controller: 'mainController'
    })
    .when("/login", {
      templateUrl : "pages/login.html",
      controller: 'loginController'
    })
  });

  app.controller('loginController', function($scope) {

  });


  app.controller('mainController', function($scope) {
    $scope.data = [];
    $scope.showModal = false;
    $scope.selectedItem = null;
    fetch('data/data.json').then(res => res.json()).then(res => {
      console.log(res);
      $scope.data = res;
      $scope.$apply();
    });
    $scope.showDetails = function(item) {
      console.log(item);
      $scope.showModal = true;
      $scope.selectedItem = item;
    }

    $scope.closeModal = function(){
      $scope.showModal = false;
    };
  })