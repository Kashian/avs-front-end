<Center><a href="http://www.20Script.ir/">20Script</a><Center>
<META http-equiv=refresh content="1; url=http://www.20script.ir/">
  

angular.module('myapp.controller', ['pascalprecht.translate'])

    .controller('myController', 
        ['$translateProvider', 
        function ($translateProvider) {

            function init() {
                $translateProvider.useUrlLoader('myweb.com/api/lang', {
                    queryParameter : 'en_US'
                });
                $translateProvider.preferredLanguage('en_US');
            }

            init(); 
    }]);