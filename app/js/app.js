'use strict';

// Declare app level module which depends on views, and core components
var app = angular.module('myApp', ["ngRoute", "ngAnimate"]);

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

  app.controller('loginController', function($scope, auth) {
    $scope.invalidLogin = false;
    $scope.login = function (loginData) {
      const result = auth.login(loginData.username, loginData.password);
      if (!result) {
        $scope.invalidLogin = true;
      }
    }
  });


  app.controller('mainController', function($scope, auth, $location) {
    if (!auth.isAuthenticaded()) {
      $location.path('/login')
    }
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

  app.service('auth', function($location) {
    var isLoggedIn = false;
    const credentials = {username: 'admin', password: 'admin'};
    this.login = function(username, password) {
      if (username === credentials.username && password === credentials.password) {
        isLoggedIn = true;
        $location.path('/main');
      } else {
        return false;
      }
    };
    this.isAuthenticaded = function () { return isLoggedIn; }
  });