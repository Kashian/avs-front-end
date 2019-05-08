'use strict';

angular.module('post', [
        'post.Controller',
        'post.Model',
        'pascalprecht.translate'
])

    //for translate
    .config(['$translateProvider', function ($translateProvider) {

        $translateProvider
        .useStaticFilesLoader({
            prefix: 'js/',
            suffix: '.json'
        })
        .preferredLanguage('fa')
        .useMissingTranslationHandlerLog();
    }])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.lang = 'fa';
        $rootScope.font = 'IranSans';
        $rootScope.directon = 'rtl';
        $rootScope.float = 'right';
        $rootScope.h1 = '30px';
        $rootScope.h2 = '25px';
        $rootScope.h3 = '20px';
        $rootScope.h4 = '15px';
        $rootScope.h5 = '10px';
        $rootScope.h5 = '5px';
       // $rootScope.default_float = 'right';
       // $rootScope.opposite_float = 'left';

       // $rootScope.default_direction = 'rtl';
       // $rootScope.opposite_direction = 'ltr';
    }])
// end translate

