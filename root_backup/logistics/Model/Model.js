/// <reference path="Model.js" />
'use strict';

angular.module('post.Model', [])
 .factory('Model', ['$http',
    function ($http) {

        var Model = {};

        var apiBaseUrl = "/infra/core/";


        //---------------------------0- User Management ------------------------------

        //SignOut
        Model.SignOut = function () {
            return $http({
                url: apiBaseUrl + 'user/logout',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                method: "get"
            }).then(function (result) { return result.data; });
        };

        //SignIn
        Model.SignIn = function (email, password) {
            return $http({
                url: apiBaseUrl + 'user/login',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                method: "POST",
                data: {
                    email: email,
                    password: password
                }
            }).then(function (result) { return result.data; });
        };


        //userChangePassword
        Model.userChangePassword = function (current_password, password, password_retype) {
            return $http({
                url: apiBaseUrl + 'user/change-password ',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    current_password: current_password,
                    password: password,
                    password_retype: password_retype

                }
            }).then(function (result) { return result.data; });
        };


        //userForgetPassword
        Model.userForgetPassword = function (name, email, cell, organizational_position_id) {
            return $http({
                url: apiBaseUrl + 'user/forgot-password',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    name: name,
                    email: email,
                    cell: cell,
                    organizational_position_id: organizational_position_id

                }
            }).then(function (result) { return result.data; });
        };


        //userInfo
        Model.userInfo = function () {
            return $http({
                url: apiBaseUrl + 'user/info',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) { return result.data; });
        };


        //---------------------------Basic Api---------------------------------------


        //requestTypeList
        Model.requestTypeList = function () {
            return $http({
                url: apiBaseUrl + 'request-type/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };

        //companyRequestTypeList
        Model.companyRequestTypeList = function () {
            return $http({
                url: apiBaseUrl + 'company/request-type/list',
                method: "POST",
                data: {
                    api_key: '0cc8912b-fd99-4ac3-8b5b-38b262c3a93f'
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };

        //companyList
        Model.companyList = function () {
            return $http({
                url: apiBaseUrl + 'company/list',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };

        //dispatchCenters
        Model.dispatchCenters = function () {
            return $http({
                url: apiBaseUrl + 'dispatch-centers/list',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };

        
        //---------------------------logistics Api---------------------------------------


         
        //requestList
        Model.requestList = function (customer, dateFrom, dateTo, sendStation, sendType) {

            var data = 'creation_time_from=' + dateFrom +
              '&creation_time_to=' + dateTo;

             if (customer != '') {
                var a = (customer+'').split(',');

                for (var i = 0; i < a.length; i++) {
                    if (a[i] != '') {
                        data += "&company_id=" + a[i];
                    }
                }
            }

            if (sendType != '') {
                var a = (sendType+'').split(',');

                for (var i = 0; i < a.length; i++) {
                    if (a[i] != '') {
                        data += "&request_type_id=" + a[i];
                    }
                }
            }

            if (sendStation != '') {
                var a = (sendStation+'').split(',');

                for (var i = 0; i < a.length; i++) {
                    if (a[i] != '') {
                        data += "&dispatch_center_id=" + a[i];
                    }
                }
            }
            return $http({
                url: apiBaseUrl + 'request/list-per-company',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: data
            }).then(function (result) { return result.data; });
        };

      

        return Model;
    }]);






























