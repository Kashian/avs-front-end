'use strict';

angular.module('post.Model', [])
 .factory('Model', ['$http',
    function ($http) {

        var Model = {};

        var apiBaseUrl = "/infra/core/";

  
        //videoList
        Model.videoList = function () {
            return $http({
                url: apiBaseUrl + 'default-company/video/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };
 
        //save watchers
        Model.saveWatchersList  = function (id , national_ids , city , separator) {
            return $http({
                url: apiBaseUrl + '/default-company/video/new',
                method: "POST",
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: {
                    id:id,
                    national_ids: national_ids,
                    city_id:city,
                    separator:separator
                }
            }).then(function (result) { return result.data; });
        };
        

        //stateList
        Model.stateList = function () {
            return $http({
                url: apiBaseUrl + 'province/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };


        //cityList
        Model.cityList = function (stateId) {
            return $http({
                url: apiBaseUrl + 'city/list',
                method: "POST",
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: {
                    province_id: stateId
                }
            }).then(function (result) { return result.data; });
        };


 
        return Model;
    }]);






























