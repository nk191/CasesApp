/// <reference path="node_modules/angular/angular.js" />
 
 
/// <reference path="module.js" />
    //var myApp = angular.module('myApp', []);

    crudModule.controller('myController',
        function ($scope, $http, crudService) {
             $scope.IsNewRecord = 1; 
 
    loadRecords(); 

    function loadRecords() {
        var promiseGet = crudService.getCases(); 
 
        promiseGet.then(function (pl) { $scope.Cases = pl.data },
              function (errorPl) {
                  $log.error('failure loading cases', errorPl);
              });
    }
     /*function getCases() {
        return $http.get("http://localhost:1743/api/Cases/"); 
    }*/
   $scope.save = function () {
        var Cases = {
            caseId: $scope.caseId,
            title: $scope.title,
            status: $scope.status,
            date: $scope.date,
            resolveDate: $scope.resolveDate
            /*caseId: document.getElementById("caseId"),
            title: document.getElementById("title"),
            status: document.getElementById("status"),
            date: document.getElementById("date"),
            resolveDate: document.getElementById("resolveDate")*/
        };
        
        Perform_CRUD('SAVE', 0)
        Perform_CRUD('UPDATE', $scope.caseId);       
          // ClearInput();
          // loadRecords();
        }
    
           /* $scope.save = function () {
                Perform_CRUD('SAVE', 1)
                ClearInput();
                loadRecords();
            };*/
           

            $scope.edit = function (cases) {
                $scope.caseId = cases.caseId;
                $scope.title = cases.title;
                $scope.status = cases.status;
                $scope.date = cases.date;
                $scope.resolveDate=cases.resolveDate;

                $scope.isDisabled = true;
            };

            $scope.update = function () {
                Perform_CRUD('UPDATE', $scope.caseId);
                $scope.isDisabled = false;
                loadRecords();
                ClearInput();
            };

            $scope.del = function (cases) {
                //Perform_CRUD('DELETE', cases.caseId)
                var request = $http({
                method: "delete",
                url: "http://localhost:1743/api/Cases/" + cases.caseId
                });
                request.then(function (pl) {
                $scope.Message = "Deleted Successfully";
                $scope.caseId = "";
                $scope.title = "";
                $scope.status = "";
                $scope.date = "";
                $scope.resolveDate = "";
                loadRecords();
                },function (err) {
                console.log("Error" + err);
                });
            }
            function Perform_CRUD(ops, id) {

                var request = {
                    method: 'post',
                    url: 'http://localhost:1743/api/cases/',
                    data: {
                        caseId: id,
                        title: $scope.title,
                        status: $scope.status,
                        date: $scope.date,
                        resolveDate: $scope.resolveDate,
                        Operation: ops
                    },
                    dataType: 'json',
                    contentType: "application/json"
                };
           if(ops=='UPDATE')
           {
           var request1 = $http({
                method: "delete",
                url: "http://localhost:1743/api/Cases/" + id
                });
                request1.then(function (pl) {
                $scope.Message = "Deleted Successfully";
                $scope.caseId = "";
                $scope.title = "";
                $scope.status = "";
                $scope.date = "";
                $scope.resolveDate = "";
                loadRecords();
                },function (err) {
                console.log("Error" + err);
                });
           }
                $http(request)
                    .success(function (data) {

                        var i = 0;     
                        $scope.Cases = new Array;

                        // LOOP THROUGH EACH DATA.
                        $.map(data, function () {
                            var b = {
                                caseId: data[i].caseId,
                                title: data[i].title,
                                status: data[i].status,
                                date: data[i].date,
                                resolveDate: data[i].resolveDate
                            };

                            $scope.Cases.push(b);    
                            i += 1;
                        });
                    })
                    .error(function () {

                    });
                    
                    loadRecords();
                    ClearInput();

            };

            
            function ClearInput() {
                $scope.caseId = '';
                $scope.title = '';
                $scope.status = '';
                $scope.date = '';
                $scope.resolveDate = '';
            }
        });
