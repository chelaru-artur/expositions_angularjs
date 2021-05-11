'use strict';

// Declare app level module which depends on views, and core components
var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : "main/main.html"
    })
    .when("/login", {
      templateUrl : "/login/login.html"
    })
  });