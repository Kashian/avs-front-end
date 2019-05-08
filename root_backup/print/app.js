'use strict';

angular.module('post', [
        'ngRoute',
        'post.Controller',
        'post.Model'
])

    .config([
       '$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
           //$locationProvider.html5Mode(true);
           $locationProvider.hashPrefix('!');

           $routeProvider.
               when("/", { templateUrl: "View/login.html", controller: "HomeCtrl" }).
               when("/logout", { templateUrl: "View/logout.html", controller: "HomeCtrl" }).
                when("/print-list", { templateUrl: "View/print-list.html", controller: "CompanyCtrl" }).
                when("/chunk-list", { templateUrl: "View/chunk-list.html", controller: "CompanyCtrl" }).
              //when("/change-password", { templateUrl: "View/change-password.html", controller: "HomeCtrl" }).

               otherwise({ redirectTo: '/' });
       }
    ])

    .run(['$rootScope', '$location', 'Auth', 'Model', function ($rootScope, $location, Auth, Model) {
        $rootScope.$on('$routeChangeStart', function (event) {

            if (!Auth.isLoggedIn() && !Auth.infoChecked()) {
                Model.userInfo().then(function (data) {
                    if (data.is_loggedin) {
                        var user = '';
                        if (data.name) {
                            user = data.name
                        } else {
                            user = '˜ÇÑÈÑ'
                        }
                        $('.firstHide').show();
                        Auth.setUser(user);
                        $('.firstHide').show();

                        if ($location.path() != "/!#/" && $location.path() != "/") {
                            window.location.href = '/print/#!' + $location.path();
                        }
                        else {
                            //$('.firstHide').hide();
                            //window.location.href = '/print/#!/';
                            window.location.href = '#!/print-list';

                        }
                    } else {
                        event.preventDefault();
                        $('.firstHide').hide();
                        Auth.setCheckedTrue();
                        window.location.href = '/print/#!/';
                    }
                }, function (error) {
                    event.preventDefault();
                    $('.firstHide').hide();
                    Auth.setCheckedTrue();
                    window.location.href = '/print/#!/';
                }).finally(function () {

                });

            }
            else {
                if ($location.path() != "/!#/" || $location.path() != "/") {
                    if (!Auth.isLoggedIn()) {
                        $('.firstHide').hide();
                        window.location.href = '/panel/#!/';
                    }
                    else {
                        $('.firstHide').show();
                        window.location.href = '#!/print-list';
                    }
                }
                else {
                    $('.firstHide').hide();
                }
            }



        });
    }]);


