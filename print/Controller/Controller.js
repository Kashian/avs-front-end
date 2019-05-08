'use strict';

var module = angular.module('post.Controller', []);


//-------------------------Home-------------------------


//Home Controler
module.controller('HomeCtrl', ['$scope', '$rootScope', '$routeParams', 'Model', 'Auth', function ($scope, $rootScope, $routeParams, Model, Auth) {

    $scope.userChangePassword = function (password, password_retype) {

        Model.userChangePassword(password, password_retype).then(function (data) {

        }, function (error) {

        }).finally(function () {

        });
    };

    $rootScope.signIn = function (userName, password) {
        Model.SignIn(userName, password).then(function (data) {
            var user = userName;
            Auth.setUser(user);
            window.location.href = '#!/print-list';

        }, function (error) {
            alert('نام کاربری یا رمز عبور اشتباه است')
        }).finally(function () {

        });
    };


    $rootScope.signOut = function () {
        Model.SignOut().then(function (data) {

        }, function (error) {
        }).finally(function () {
            Auth.clearUser();
            window.location.href = '#!/';
        });


    };

}]);





//--------------------------Company---------------------------------------


//Company Controler
module.controller('CompanyCtrl', ['$scope', '$rootScope', '$routeParams', 'Model', function ($scope, $rootScope, $routeParams, Model) {

    var request = false;

     $scope.printRequestList = function (request) {

        var date = SetDate(request.creation_time);

        Model.printRequestList(request.batch_id, request.unique_id, date.from, date.to, request.status_id)
            .then(function (data) {
                $scope.ApiListResult = data;

            }, function (error) {

            }).finally(function () {

            });
    }

    $scope.printChangeStatus = function (statusId) {

        if (request) return;

        request = true;
        $scope.successfulAddingApi = false;
        $scope.errorChangeStatus = false;

        var ids = [];
        $.each($scope.ApiListResult, function (index, value) {
            if (value.Selected == true) {
                ids.push(value.unique_id)
            }
        })

        Model.printRequestChangeStatus('', ids, statusId)
                    .then(function (data) {
                        $scope.successfulAddingApi = true;
                    }, function (error) {
                        $scope.errorChangeStatus = true;
                    }).finally(function () {
                        request = false;
                    });
    }

    $scope.printChunkList = function (request) {

        var date = SetDate(request.creation_time);

        Model.printChunkList(request.chunk_id, request.unique_id, date.from, date.to, request.status_id)
            .then(function (data) {
                $scope.chunkListResult = data;

            }, function (error) {

            }).finally(function () {

            });
    }

    $scope.printChangeChunkStatus = function (statusId) {

        if (request) return;

        request = true;
        $scope.successfulAddingApi = false;
        $scope.errorChangeStatus = false;

        var ids = [];

        $.each($scope.chunkListResult, function (index, value) {
            if (value.Selected == true) {
                ids.push(value.id)
            }
        })

        Model.printRequestChangeStatus(ids, '', statusId)
                    .then(function (data) {
                        $scope.successfulAddingApi = true;
                    }, function (error) {
                        $scope.errorChangeStatus = true;
                    }).finally(function () {
                        request = false;
                    });
    }


    function SetDate(id) {
        var timestampFrom = '';
        var timestampTo = '';

        if (id == '') return { 'from': '', 'to': '' };
        else if (id == undefined) return { 'from': '', 'to': '' };

        var currentDate = new Date();
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        var todayTimeStamp = Date.now(currentDate) / 1000 | 0;

        switch (id) {
            case '1'://3 month before
                timestampTo = Date.now() / 1000 | 0;
                timestampFrom = timestampTo - (60 * 60 * 24 * 30 * 3);
                break;
            case '2'://1 month before
                timestampTo = Date.now() / 1000 | 0;
                timestampFrom = timestampTo - (60 * 60 * 24 * 30);
                break;
            case '3'://1 weak before

                timestampTo = Date.now() / 1000 | 0;
                timestampFrom = timestampTo - (60 * 60 * 24 * 7);
                break;
            case '4'://1 day before
                timestampTo = Date.now() / 1000 | 0;
                timestampFrom = timestampTo - (60 * 60 * 24);
                break;
            case '5'://today
                timestampFrom = todayTimeStamp;
                timestampTo = timestampFrom + (60 * 60 * 24);
                break;
            case '6'://tomarrow
                timestampFrom = todayTimeStamp + (60 * 60 * 24);
                timestampTo = timestampFrom + (60 * 60 * 24);

                break;
            case '7'://next weak
                timestampFrom = Date.now() / 1000 | 0;
                timestampTo = timestampFrom + (60 * 60 * 24 * 7);

                break;
            case '8'://next month
                timestampFrom = Date.now() / 1000 | 0;
                timestampTo = timestampFrom + (60 * 60 * 24 * 30);

                break;
            case '9':// next 3 month 
                timestampFrom = Date.now() / 1000 | 0;
                timestampTo = timestampFrom + (60 * 60 * 24 * 30 * 3);

                break;
            case '10':// this month 
                var tempDate = new Date();
                var tempDate2 = ToShamsi(tempDate.getFullYear(), (tempDate.getMonth() + 1), tempDate.getDate()).split('/');
                tempDate = ToMiladi(tempDate2[0], tempDate2[1], 1);
                tempDate = new Date(tempDate).getTime()
                timestampFrom = tempDate / 1000 | 0;
                timestampTo = timestampFrom + (60 * 60 * 24 * 30);

                break;
        }

        // return timestampFrom + ":" + timestampTo; //return time stamp  1466579126:1469257526

        var from = new Date(timestampFrom * 1000)
        var to = new Date(timestampTo * 1000)
        var x = {
            'from': ToShamsi(from.getFullYear(), (from.getMonth() + 1), from.getDate()),
            'to': ToShamsi(to.getFullYear(), (to.getMonth() + 1), to.getDate())
        };
        return x; //return date  from "1394/8/15" to  "1395/8/16"
    }

    function ToShamsi(gy, gm, gd) {
        var g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        var jy = (gy <= 1600) ? 0 : 979;
        gy -= (gy <= 1600) ? 621 : 1600;
        var gy2 = (gm > 2) ? (gy + 1) : gy;
        var days = (365 * gy) + (parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100))
       + (parseInt((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
        jy += 33 * (parseInt(days / 12053));
        days %= 12053;
        jy += 4 * (parseInt(days / 1461));
        days %= 1461;
        jy += parseInt((days - 1) / 365);
        if (days > 365) days = (days - 1) % 365;
        var jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
        var jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
        return jy + "/" + jm + "/" + jd;
    }

    function ToMiladi(jy, jm, jd) {
        var gy = (jy <= 979) ? 621 : 1600;
        jy -= (jy <= 979) ? 0 : 979;
        var days = (365 * jy) + ((parseInt(jy / 33)) * 8) + (parseInt(((jy % 33) + 3) / 4))
       + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
        gy += 400 * (parseInt(days / 146097));
        days %= 146097;
        if (days > 36524) {
            gy += 100 * (parseInt(--days / 36524));
            days %= 36524;
            if (days >= 365) days++;
        }
        gy += 4 * (parseInt((days) / 1461));
        days %= 1461;
        gy += parseInt((days - 1) / 365);
        if (days > 365) days = (days - 1) % 365;
        var gd = days + 1;
        var sal_a = [0, 31, ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for (var gm = 0; gm < 13; gm++) {
            var v = sal_a[gm];
            if (gd <= v) break;
            gd -= v;
        }
        return gy + "/" + gm + "/" + gd;
    }


}]);





module.factory('Auth', function () {
    var user;
    var checked = false;
    return {
        setUser: function (aUser) {
            user = aUser;
        },
        clearUser: function () {
            user = '';
        },
        isLoggedIn: function () {
            return (user) ? user : false;
        },
        infoChecked: function () {
            return checked;
        },
        setCheckedTrue: function () {
            checked = true;
        }
    }
})

