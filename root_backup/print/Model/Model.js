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


        //---------------------------print Api---------------------------------------



        //printRequestChangeStatus
        Model.printRequestChangeStatus = function (chunk_id, unique_id, status_id) {



            var data = 'status_id=' + status_id;

            'chunk_id=' + chunk_id +
            '&unique_id=' + unique_id;

            if (chunk_id != '') {

                for (var i = 0; i < chunk_id.length; i++) {
                    if (chunk_id[i] != '') {
                        data += "&chunk_id=" + chunk_id[i];
                    }
                }
            }
            else if (unique_id != '') {

                for (var i = 0; i < unique_id.length; i++) {
                    if (unique_id[i] != '') {
                        data += "&unique_id=" + unique_id[i];
                    }
                }
            }


            return $http({
                url: apiBaseUrl + 'print/request/change-status',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                //transformRequest: function (obj) {
                //    var str = [];
                //    for (var p in obj)
                //        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                //    return str.join("&");
                //},
                data: data

            }).then(function (result) { return result.data; });
        };

        //printRequestList
        Model.printRequestList = function (chunk_id, unique_id, from, to, status_id) {
            return $http({
                url: apiBaseUrl + 'print/request/list',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    chunk_id: chunk_id,
                    unique_id: unique_id,
                    creation_time_from: from,
                    creation_time_to: to,
                    status_id: status_id
                }
            }).then(function (result) { return result.data; });
        };

        //printRequestList
        Model.printChunkList = function (chunk_id, unique_id, from, to, status_id) {
            return $http({
                url: apiBaseUrl + 'print/chunk/list',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    chunk_id: chunk_id,
                    unique_id: unique_id,
                    creation_time_from: from,
                    creation_time_to: to,
                    status_id: status_id
                }
            }).then(function (result) { return result.data; });
        };


        return Model;
    }]);






























