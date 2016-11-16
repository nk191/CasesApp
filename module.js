/// <reference path="node_modules/angular/angular.js" />
/// <reference path="node_modules/adal-angular/dist/adal-angular.min.js" />
/// <reference path="node_modules/adal-angular/dist/adal.min.js" />


var crudModule = angular.module('crudModule', ['ngRoute', 'AdalAngular']);

crudModule.config(['$routeProvider', '$httpProvider',  'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalAuthenticationServiceProvider) {

    console.log("check route");
    $routeProvider
    .when("/", {
        controller:'myController',
        templateUrl: 'index.html',
        requireADLogin: true,
        redirectTo: "/Cases"
    })
    .when("/Cases", {
        controller:'myController',
        templateUrl: 'index1.html',
        //requireADLogin: true
    })
    .otherwise({ redirectTo: "/" });
    //$locationProvider.html5Mode(true);
    
    var endpoint = {
        "https://casesunauth.azurewebsites.net": "2669663e-1f73-44a9-99e1-d21bd835ed83",
        //"https://casespoc.azurewebsites.net": "2669663e-1f73-44a9-99e1-d21bd835ed83",
    };

    adalAuthenticationServiceProvider.init(
      {
          instance: "https://login.microsoftonline.com/",
          //tenant: 'a14b0395-8447-4971-9269-d1469e847259',
          tenant: 'microsoft.onmicrosoft.com',
          clientId: '5f317688-84b4-4ea0-a88d-4d0c2e9243f6',
          extraQueryParameter: 'nux=1',
          endpoints: endpoint,
          cacheLocation: 'localStorage'
      }, $httpProvider);

}]);



/*var serviceBase = 'http://localhost:1743/';
crudModule.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase
});*/