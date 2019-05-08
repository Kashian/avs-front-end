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


    $scope.initFunction = function () {

        Model.companyList()
           .then(function (data) {
               $scope.companyList = data;

               Model.requestTypeList()
                 .then(function (data) {
                     $scope.requestTypeList = data;

                     Model.dispatchCenters()
                        .then(function (data) {
                            $scope.dispatchCenters = data;
                            $scope.setMultiDrop();
                        }, function (error) {
                        }).finally(function () {
                        });
                 }, function (error) {
                 }).finally(function () {
                 });

           }, function (error) {
           }).finally(function () {
           });
    }


    $scope.requestList = function (value) {

        if (request === true) return;
        request = true;
        $scope.showLoading = true;
        var dateFrom = '';
        var dataTo = '';
        if (value.date != undefined) {
            dateFrom = value.date;
            dataTo = value.date;
        }
        else {
            dateFrom = value.dateFrom;
            dataTo = value.dateTo;
        }
        if (dateFrom == '' || dateFrom == undefined || dateFrom == null) {
            dateFrom = '';
        }
        if (dataTo == '' || dataTo == undefined || dataTo == null) {
            dataTo = '';
        }
        Model.requestList(value.customer, dateFrom, dataTo, value.sendStation, value.sendType)
            .then(function (data) {
                $scope.RequestListResult = data;
                $scope.showResult = true;
            }, function (error) {

            }).finally(function () {
                $scope.showLoading = false;
                request = false;
            });
    }


    $scope.setMultiDrop = function () {
        setTimeout(function () {

            $('.sendTypeSlectBox').SumoSelect({
                csvDispCount: 1,
                placeholder: 'همه موارد',
                floatWidth: '100%',
                captionFormat: ' تعداد ' + '{0}' + ' نوع ارسال انتخاب شد ',
                okCancelInMulti: false,
                triggerChangeCombined: true,
                selectAll: true,
                selectAlltext: 'انتخاب همه'

            });
            $('.CustomerSlectBox').SumoSelect({
                csvDispCount: 2,
                placeholder: 'همه موارد',
                floatWidth: '100%',
                captionFormat: ' تعداد ' + '{0}' + ' مشتری انتخاب شد ',
                okCancelInMulti: false,
                triggerChangeCombined: true,
                selectAll: true,
                selectAlltext: 'انتخاب همه'

            });
            $('.sendStationSlectBox').SumoSelect({
                csvDispCount: 1,
                placeholder: 'همه موارد',
                floatWidth: '100%',
                captionFormat: ' تعداد ' + '{0}' + ' مرکز ارسال انتخاب شد ',
                okCancelInMulti: false,
                triggerChangeCombined: true,
                selectAll: true,
                selectAlltext: 'انتخاب همه'

            });
        }, 1);
    };

    $scope.allCount = function (value) {
        var allCount=0
        $.each(value, function (index, value) {
            allCount += value.count;
        });
         return allCount;
    }

    $scope.allCancelledCount = function (value) {
        var allCancelledCount = 0
        $.each(value, function (index, value) {
            allCancelledCount += value.count;
        });
         return allCancelledCount;
    }

    $scope.allPrice=function( value)
    {
        var allPrice = 0
        $.each(value, function (index, value) {
            allPrice += value.total_price;
        });
        return allPrice;
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

module.filter('charSeperator', function () {
    return function (x) {
        return (x + '').replace(/,/g, '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
     };
});
    
