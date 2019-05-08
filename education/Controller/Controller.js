'use strict';

var module = angular.module('post.Controller', []);


//-------------------------Home-------------------------


//Home Controler
module.controller('HomeCtrl', ['$scope', '$rootScope', 'Model', function ($scope, $rootScope, Model) {
 
    $('.firstHide').show();
    var request = false;

   
    //when the page loaded , this function call automaticlly
    $scope.initFunction = function () {

        //this function get list of all state
        Model.stateList().then(function (data) {

            //save all state to this parameter
            $scope.states = data.data;
            $("#state option:selected").val(0)

            //this function get list of all videos
            Model.videoList().then(function (data) {

                $scope.data=data;
                $scope.videoUrl='http://avs.post.ir'+data[0].file; 


            }, function (error) {
            }).finally(function () {
                //$(".form-control").prop("selectedIndex", 1);
            });


        }, function (error) {
        }).finally(function () {
        });

    };



  
    //if state change , citys must be loaded
    $("#state").on("change", function () {

        Model.cityList($("#state option:selected").val()).then(function (data) {
            //save all city to this parameter
            $scope.citys = data.data;

            $("#city option:selected").val(0)

        }, function (error) {

        }).finally(function () {

        });

    });


    $scope.saveWatchers = function () {
 
        $('#nationalError').hide();
        $('#cityError').hide();
        
        if($scope.watchers+''==''){
            $('#nationalError').show();
            return;
        }
        else if($scope.city.trim()==''){
            $('#cityError').show();      
            return;
        };
 

        var id= $scope.data[0].id;
        var national_ids=$scope.watchers.replace(/ /g ,',').replace(/-/g ,',').replace(/_/g ,',').replace(/\+/g ,',').replace(/\#/g ,',').replace(/\//g ,',').replace(/\\/g ,',').replace(/(?:\r\n|\r|\n)/g, ',')
        national_ids=national_ids.split(',')
        national_ids=national_ids.filter(function (val) {if(val)return val;}).join(',')

        $scope.watchers='';
        var separator=','
        Model.saveWatchersList(id , national_ids, $scope.city , separator).then(function (data) {
        
            $('#saveWatcherBox').slideUp();
            $('#tryAgain').slideDown();

        }, function (error) {

        }).finally(function () {

        }); 
    } 

    $scope.tryAnother=function(){
        $('#saveWatcherBox').slideDown();
        $('#tryAgain').slideUp(); 
    }  
                        
 



 
}])
.filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}]);


