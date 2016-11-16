/// <reference path="node_modules/angular/angular.js" />
/// <reference path="module.js" />
 
 
crudModule.service('crudService', function ($http) {
 
     
    
    //Get All cases
    this.getCases = function () {
        return $http.get("http://localhost:1743/api/Cases/"); 
    }
 
 
    
});