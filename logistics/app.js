'use strict';

angular.module('post', [
        'ngRoute',
        'post.Controller',
        'post.Model',
        'Pagination',
        'ADM-dateTimePicker'
])

    .config([
       '$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
           //$locationProvider.html5Mode(true);
           $locationProvider.hashPrefix('!');

           $routeProvider.
               when("/", { templateUrl: "View/login.html", controller: "HomeCtrl" }).
               when("/logout", { templateUrl: "View/logout.html", controller: "HomeCtrl" }).
               when("/request-count", { templateUrl: "View/request-count.html", controller: "CompanyCtrl" }).
               when("/request-price", { templateUrl: "View/request-price.html", controller: "CompanyCtrl" }).
               when("/request-search", { templateUrl: "View/request-search.html", controller: "CompanyCtrl" }).
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
                            user = '�����'
                        }
                        $('.firstHide').show();
                        Auth.setUser(user);
                        $('.firstHide').show();

                        if ($location.path() != "/!#/" && $location.path() != "/") {
                            window.location.href = '/logistics/#!' + $location.path();
                        }
                        else {
                            //$('.firstHide').hide();
                            //window.location.href = '/print/#!/';
                            window.location.href = '#!/request-count';

                        }
                    } else {
                        event.preventDefault();
                        $('.firstHide').hide();
                        Auth.setCheckedTrue();
                        window.location.href = '/logistics/#!/';
                    }
                }, function (error) {
                    event.preventDefault();
                    $('.firstHide').hide();
                    Auth.setCheckedTrue();
                    window.location.href = '/logistics/#!/';

                }).finally(function () {

                });

            }
            else {
                if ($location.path() != "/!#/" || $location.path() != "/") {
                    if (!Auth.isLoggedIn()) {
                        $('.firstHide').hide();
                        window.location.href = '/logistics/#!/';
                    }
                    else {
                        $('.firstHide').show();
                        //window.location.href = '#!/request-count';

                    }
                }
                else {
                    $('.firstHide').hide();
                }
            }



        });
    }]);


