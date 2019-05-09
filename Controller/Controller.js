/*
 site: avs.post.ir
 Address Verification System
 Developer by: Rojina Computer Ltd (+98 21 88522948)
 Main Author: Alireza Kashian
 Email: alireza.kashian@gmail.com
 © 1395-1398 (2016-2019)
 Website: rojina(www.rojina.com)
 */

'use strict';

var module = angular.module('post.Controller', []);



//-------------------------Home-------------------------


//Home controller : this is base controller for this madule
module.controller('HomeCtrl', ['$scope', '$rootScope', 'Model','$timeout','$interval', function ($scope, $rootScope, Model,$timeout,$interval) {

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

   
    
    if(getParameterByName('notShowInIframe')=="true"){
        $('.notShowInIframe').hide();
        $('.site-header').hide();
        $('#features').hide();
        $('#main').css({'padding': '0'});
        $('.meshim_widget_components_chatButton_Button rtl').remove();;
        $('.smooth-scroll').remove();
    } 
    if(getParameterByName('company')=="taxi"){
        $('.notShowInIframe').hide();
        $('#navigation').hide(); 
        $('#features').insertAfter('#register');  
        $('#main').css({'padding': '0'});
        $('.meshim_widget_components_chatButton_Button rtl').remove();;
        $('.smooth-scroll').remove();
        $('.translate').css({
            "border":"none"
        })
        $('.translate').html('<img style="width: 100px;margin: 0px 0 0px 0;" src="/img/taxi.jpg"><span style="padding: 6px;font-size: 20px;">سازمان تاکسیرانی</span>'); 
        $timeout(function(){
            $scope.addNewRequest.discountCode='tehrantaxi-s01-01-18'; 
        },2)  
    } 
    if(getParameterByName('company')=="tap30"){
        $('.notShowInIframe').hide();
        $('#navigation').hide();
        $('#features').insertAfter('#register');  
        $('#main').css({'padding': '0'});
        $('.meshim_widget_components_chatButton_Button rtl').remove();;
        $('.smooth-scroll').remove(); 
        $('.translate').css({
            "background-color": "black",
            "border":"none"
        })
        $('.translate').html('<img style="width: 150px;margin: 0px 0 0px 0;" src="/img/tap30.png"><span style="padding: 13px 6px;background-color: white;font-size: 20px;">TAP30 - سامانه هوشمند درخواست تاکسی</span>');
        $timeout(function(){
            $scope.addNewRequest.discountCode='tap30-s01-01-18'; 
        },2)  
    } 
    if(getParameterByName('company')=="enamad"){
        $('.notShowInIframe').hide();
        $('#navigation').hide();
        $('#features').insertAfter('#register');  
        $('#main').css({'padding': '0'});
        $('.meshim_widget_components_chatButton_Button rtl').remove();;
        $('.smooth-scroll').remove();
        $('.translate').css({
            "border":"none"
        })
        $('.translate').html('<img style="width: 70px;margin: 0px 0 0px 0;" src="/img/enamad.png"><span style="padding: 6px;font-size: 20px;">نماد اعتماد الکترونیکی</span>');
        $timeout(function(){
            $scope.addNewRequest.discountCode='etrust-s01-01-18'; 
        },2)  
    } 

   

     
    //hidden all angular element until angular.js loaded
    $('.firstHide').show();

    //donot show second form in register 
    $('#addNewRequestSubmit').hide();
     
    $timeout(function(){
          $scope.overlay1 =  PlainOverlay.show(document.getElementById('registerSecondBox'),{style: {backgroundColor: 'rgba(255, 255, 255, 0.72)',  cursor: 'not-allowed' ,zIndex: 9000}});    
    },10)
    
    //this parameter use for requesting to the server
    //if false: mean that no request in progress and you can run new request
    var request = false;
    var stateByPostal='';
    var stateByPostalForEdit='';  
    var cityByPostal='';
    var cityByPostalForEdit='';
    

    //dont load from server 
    var loadStatic=true;

    //set a global variable that show overal language
    $rootScope.lang = $('html').attr('lang');





    //when the page loaded , this function call automaticlly
    $scope.initFunction = function () {

        if(loadStatic){
            //load form controller/static.js
            $scope.state = stateStatic;
            $scope.pass = passStatic;
            $scope.district = districtStatic;
            $scope.floor = floorStatic;
            $scope.PersonType =  PersonTypeStatic; 
            $scope.AdressStatus =  adressStatusStatic;
        }
        else{
        
            //this function get list of all state
            Model.stateList().then(function (data) {

                //save all state to this parameter
                $scope.state = data.data;

                //this function get list of all passType
                Model.passTypeList().then(function (data) {

                    //save all passType to this parameter
                    $scope.pass = data.data;

                    //this function get list of all district
                    Model.districtList().then(function (data) {

                        //save all district to this parameter
                        $scope.district = data.data;

                        //this function get list of all floor
                        Model.floorList().then(function (data) {

                            //save all floor to this parameter
                            $scope.floor = data;

                            //this function get list of all personType
                            Model.personTypeList().then(function (data) {

                                //save all PersonType to this parameter
                                $scope.PersonType = data;

                                //this function get list of all addressStatus
                                Model.addressStatus().then(function (data) {
                                    
                                    //save all PersonType to this parameter
                                    $scope.AdressStatus = data;
 
                                }, function (error) {
                                }).finally(function () {
                                    //this mean : no requset in progress
                                    request = false;
                                });

                            }, function (error) {
                            }).finally(function () {
                                //this mean : no requset in progress
                                request = false;
                            });
                        }, function (error) {
                        }).finally(function () {
                            //this mean : no requset in progress
                            request = false;
                        });
                    }, function (error) {
                    }).finally(function () {
                        //this mean : no requset in progress
                        request = false;
                    });


                }, function (error) {
                }).finally(function () {
                    //$(".form-control").prop("selectedIndex", 1);
                });


            }, function (error) {
            }).finally(function () {
            });
        }
    };

    //load shipping price , base on city
    $scope.loadPrice = function (cityId, provinceId) {

        //load all shipping method
        Model.companyRequestTypeList(cityId).then(function (data) {

            //save all shipping method to this parameter
            $scope.sendType = data;
        }, function (error) {
        }).finally(function () {
        });
    };

    function loadCity(){

        var stateIdTemp=$("#addNewRequestState option:selected").val();
        if(loadStatic){
            $.each(stateStatic , function(index,value){
                if(value.id==stateIdTemp){
                    $scope.city = value.city_set;
                    if(cityByPostal != '0'&& cityByPostal != '' && cityByPostal && cityByPostal != undefined && cityByPostal!=null && cityByPostal!='null'){ 
                        $timeout(function(){ 
                            $("#addNewRequestCity").val(cityByPostal);
                            $("#addNewRequestCity").attr('disabled','disabled');
                            $scope.loadPrice(cityByPostal,stateByPostal);
                            $scope.checkPostal();

                        },50)
                    } 

                }
            })

        }
        else{  
            Model.cityList(stateIdTemp).then(function (data) {
                //save all city to this parameter
                $scope.city = data.data;

                if(cityByPostal != '0'&& cityByPostal != ''){ 
                    $timeout(function(){
                        $("#addNewRequestCity").val(cityByPostal);
                        $("#addNewRequestCity").attr('disabled','disabled');
                        $scope.loadPrice(cityByPostal,stateByPostal);
                        $scope.checkPostal()
                    },50)
                } 
                
            }, function (error) {

            }).finally(function () {

            });
        }
    }
 
    function loadCityForEdit(){

        var stateIdTemp=$("#editRequestState option:selected").val();
        if(loadStatic){
            $.each(stateStatic , function(index,value){
                if(value.id==stateIdTemp){
                    $scope.city = value.city_set;
                    console.log(cityByPostalForEdit)
                    if(cityByPostalForEdit != '0'&& cityByPostalForEdit != ''&& cityByPostalForEdit && cityByPostalForEdit != undefined &&  cityByPostalForEdit!=null && cityByPostalForEdit!='null'){ 
                        $timeout(function(){ 
                            $("#editRequestCity").val(cityByPostalForEdit);
                            $("#editRequestCity").attr('disabled','disabled');
                            $scope.checkPostalForEdit();

                        },50)
                    } 

                }
            })

        }
        else{  
            Model.cityList(stateIdTemp).then(function (data) {
                //save all city to this parameter
                $scope.city = data.data;

                if(cityByPostalForEdit != '0'&& cityByPostalForEdit != ''){ 
                    $timeout(function(){
                        $("#editRequestCity").val(cityByPostalForEdit);
                        $("#editRequestCity").attr('disabled','disabled');
                        $scope.loadPrice(cityByPostalForEdit,stateByPostalForEdit);
                        $scope.checkPostalForEdit()
                    },50)
                } 
                
            }, function (error) {

            }).finally(function () {

            });
        }
    }
 
    //if state change , citys must be loaded
    $("#addNewRequestState").on("change", function () {
        loadCity();
    });

    //if state change , citys must be loaded
    $("#editRequestState").on("change", function () {
        loadCityForEdit();
    });


    //verify letter with national code and unique code
    $scope.verifyRequestFunction = function (value) {

        // if any request in progress or verify code submit letter and dont change again , function not start
        if ($scope.changeVerifyRequestCode==false || request == true) return;
        request = true;

        //verify submit , when change the textbox , you can submit again
        $scope.changeVerifyRequestCode=false;

        //this messages shown when request finished
        $scope.verify.success = '';
        $scope.verify.error = '';

        //send data to the server to verify address
        Model.rquestVerify(value).then(function (data) {

            //if response have message , use this , else we added some message
            if(data.messasge){
                $scope.verify.success = $rootScope.lang == 'fa' ? data.messasge : 'Your address confirmation was successful, thank you for your cooperation';
            }else{
                $scope.verify.success = $rootScope.lang == 'fa' ? 'تایید نشانی شما با موفقیت انجام شد  ، با تشکر از همکاری شما' : 'Your address confirmation was successful, thank you for your cooperation';
            }
        }, function (error) {

            //show description of error to user
            if (error.error = 'NOT_FOUND') {
                $scope.verify.error = $rootScope.lang == 'fa' ? 'اطلاعات وارد شده صحیح نمی باشد ، لطفا مجددا اطلاعات را با دقت وارد نمایید ' : 'The information entered is incorrect, please re enter information carefully ';
            }
            else {
                $scope.verify.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
            }
        }).finally(function () {
            request = false;
        });
    };

    //get information and status of letter
    $scope.editLoadRequestFunction = function (value) {
 
        if (request == true) return;
        request = true;


        //message
        $scope.edit.success = '';
        $scope.edit.error = '';

        //get information and status of letter from server
        Model.rquestEditLoad(value).then(function (data) {
            $scope.edit.success = true;

            $('#editLoadRequestForm').hide();


            $scope.editRequest.PostalCode1 = data.postcode;

            $.each(stateStatic , function(index,value){
                $.each(value.city_set, function(index2 , value2){ 
                    if(value2.id==data.city.id){ 
                        $scope.editRequest.State = value.id;
                        stateByPostalForEdit = value.id; 
                        $scope.city = value.city_set;

                        $scope.editRequest.City = data.city.id;
                        cityByPostalForEdit = data.city.id;
                        $timeout(function(){  
                            $("#editRequestState").val(stateByPostalForEdit);
                            $("#editRequestState").attr('disabled','disabled'); 
                      
                            $("#editRequestCity").val(cityByPostalForEdit);
                            $("#editRequestCity").attr('disabled','disabled'); 
                        },250)  
                     }
                }) 
            })





            if(data.district_type && data.district_type.id){
                $scope.editRequest.VillageDrop = data.district_type.id;
                $timeout(function(){   
                    $('#editRequestVillageDrop').val(data.district_type.id)
                },250)   
            }else{
                $scope.editRequest.VillageDrop = '';
            } 

            $scope.editRequest.VillageTxt = data.district; 


            if(data.pass_type_1 && data.pass_type_1.id){
                $scope.editRequest.MainRoadDrop = data.pass_type_1.id;
                $timeout(function(){   
                    $('#editRequestMainRoadDrop').val(data.pass_type_1.id)
                },250)   
            }else{
                $scope.editRequest.MainRoadDrop = '';
            } 

            $scope.editRequest.MainRoadTxt = data.pass_1;

            
            if(data.pass_type_2 && data.pass_type_2.id){
                $scope.editRequest.SecondaryRoadDrop1 = data.pass_type_2.id;
                $timeout(function(){   
                    $('#editRequestSecondaryRoadDrop1').val(data.pass_type_2.id)
                },250)   
            }else{
                $scope.editRequest.SecondaryRoadDrop1 = '';
            }

            $scope.editRequest.SecondaryRoadTxt1 = data.pass_2;

            
            if(data.pass_type_3 && data.pass_type_3.id){
                $scope.editRequest.SecondaryRoadDrop2 = data.pass_type_3.id;
                $timeout(function(){   
                    $('#editRequestSecondaryRoadDrop2').val(data.pass_type_3.id)
                },250)  
            }else{
                $scope.editRequest.SecondaryRoadDrop2 = '';
            }

            $scope.editRequest.SecondaryRoadTxt2 = data.pass_3;

            if(data.has_no_plaque==true){
                $scope.editRequest.Plaque = '';
                $("#editRequestPlaque").val('عدم وجود پلاک')
                $("#editRequestPlaque").attr("disabled", "disabled"); 
                $scope.editRequest.HasNoPlaque = data.has_no_plaque;
            }else{
                $scope.editRequest.Plaque = data.plaque;
                $scope.editRequest.HasNoPlaque = false;
            }
 
            if(data.floor && data.floor.id){
                $scope.editRequest.Floor = data.floor.id; 
                $timeout(function(){   
                    $('#editRequestFloor').val(data.floor.id) 
                    $('#editRequestFloor').trigger('change'); 
                },250)  
            }else{
                $scope.editRequest.Floor = '';
            }

            $scope.editRequest.Unit = data.unit_no;  
            $scope.editRequest.BuildingName = data.building;
 
 
        }, function (error) {
           // if (error.error = 'NOT_FOUND') {
                $scope.edit.error = $rootScope.lang == 'fa' ? 'اطلاعات وارد شده صحیح نمی باشد ، لطفا مجددا اطلاعات را با دقت وارد نمایید ' : 'The information entered is incorrect, please re enter information carefully ';
         //   }
          //  else {
              //  $scope.edit.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
          //  }
        }).finally(function () {
            request = false;
        });

    };


    //get information and status of letter
    $scope.getRequestFunction = function (value) {

        if ($scope.changeTrackingCode1==false || request == true) return;
        request = true;
        $scope.changeTrackingCode1=false;

        //message
        $scope.get.success = '';
        $scope.get.error = '';

        //get information and status of letter from server
        Model.rquestGet(value).then(function (data) {
            $scope.get.success = true;

            //validate response name and bind to a string to show to user
            var pass = '';
            if (data.pass_type_1)
            { if (data.pass_type_1 != '' && data.pass_1 != '') { pass += data.pass_type_1.label + ' ' + data.pass_1 + ' ' } }
            if (data.pass_type_2)
            { if (data.pass_type_2 != '' && data.pass_2 != '') { pass += data.pass_type_2.label + ' ' + data.pass_2 + ' ' } }
            if (data.pass_type_3)
            { if (data.pass_type_3 != '' && data.pass_3 != '') { pass += data.pass_type_3.label + ' ' + data.pass_3 + ' ' } }

            $scope.get.success1 = $rootScope.lang == 'fa' ? ('  نامه اعتبار سنجی مورد نظر شما برای   ' + data.first_name + ' ' + data.last_name + '  می باشد  ') : ('  Verification letter for  ' + data.first_name + ' ' + data.last_name);

            //language check
            if ($rootScope.lang == 'fa') {

                //validate response address and bind to a string to show to user

                $scope.get.success2 = '  و به  نشانی   ' ;
                if(data.city){
                    $scope.get.success2+= data.city.label + ' ';
                } if(data.district_type){
                    $scope.get.success2+= data.district_type.label + ' ';
                }if(data.district){
                    $scope.get.success2+= data.district + ' ';
                }
                $scope.get.success2+=pass;
                if(data.district){
                    $scope.get.success2+= ' پلاک ' + data.plaque;
                }
                if(data.building){
                    $scope.get.success2 += ' ساختمان ' + data.building +' ';
                }
                if (data.floor) {
                    $scope.get.success2 += ' طبقه ' + data.floor.label;
                }
                 if (data.unit_no) {
                    $scope.get.success2 += ' واحد ' + data.unit_no;
                }

                $scope.get.success2 += '   ارسال شده است.  ';

                //if language is english
            } else {
                $scope.get.success2 = "Address: "
                if (data.unit_no) {
                    $scope.get.success2 += ' unit ' + data.unit_no;
                }
                if (data.floor) {
                    $scope.get.success2 += ' Apt ' + data.floor.label;
                }
                if(data.plaque)
                {
                    $scope.get.success2 += ' No. ' + data.plaque + ' ';
                }
                $scope.get.success2 +=  pass + ' ';

                if(data.district)
                {
                    $scope.get.success2 +=  data.district + ' ';
                }
                if(data.district_type)
                {
                    $scope.get.success2 += data.district_type.label + ' ';
                }
                if(data.city)
                {
                    $scope.get.success2 += data.city.label;
                }
            }

            //show this inform to thie user
            $scope.get.success3 = $rootScope.lang == 'fa' ? ('وضعیت  نامه شما : ' +$scope.status[data.status.id] ) : (' status of verification letter: ' + data.status.id);

        }, function (error) {
            if (error.error = 'NOT_FOUND') {
                $scope.get.error = $rootScope.lang == 'fa' ? 'اطلاعات وارد شده صحیح نمی باشد ، لطفا مجددا اطلاعات را با دقت وارد نمایید ' : 'The information entered is incorrect, please re enter information carefully ';
            }
            else {
                $scope.get.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
            }
        }).finally(function () {
            request = false;
        });

    };

    //this function show all information of selected option from send type
    $scope.loadPreview = function (id) {
        if ($scope.sendType) {
            $.each($scope.sendType, function (index, value) {
                if (value.id == id) {
                    //show name , price , id , .... in post preview
                    $scope.SelectedPostMethod = value;
                }
            })
        }
    };

    //before Resend leter Request , must be load previous letter
    $scope.beforeResendRequestFunction = function (value) {

        if ($scope.changeTrackingCode2==false || request == true) return;
        request = true;
        $scope.changeTrackingCode2=false;

        $scope.resendGet.success = '';
        $scope.resendGet.error = '';
        //$scope.resend.success = '';
        $scope.resend.error = '';

        //load letter information
        Model.rquestGet(value).then(function (data) {


            //load all shipping method base on city
            Model.companyRequestTypeList(data.city.id).then(function (data) {
                $scope.sendType2 = data;

            }, function (error) {
                if (error.error = 'NOT_FOUND') {
                    $scope.resendGet.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
                }
                else {
                    $scope.resendGet.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
                }
            }).finally(function () {
                request = false;
            });


            $scope.resendGet.success = true;

            //show previous letter information
            var pass = '';
            if (data.pass_type_1)
            { if (data.pass_type_1 != '' && data.pass_1 != '') { pass += data.pass_type_1.label + ' ' + data.pass_1 + ' ' } }
            if (data.pass_type_2)
            { if (data.pass_type_2 != '' && data.pass_2 != '') { pass += data.pass_type_2.label + ' ' + data.pass_2 + ' ' } }
            if (data.pass_type_3)
            { if (data.pass_type_3 != '' && data.pass_3 != '') { pass += data.pass_type_3.label + ' ' + data.pass_3 + ' ' } }

             $scope.resendGet.success1 = $rootScope.lang == 'fa' ? ('  نامه اعتبار سنجی مورد نظر شما برای   ' + data.first_name + ' ' + data.last_name + '  می باشد  ') : ('  Verification letter for  ' + data.first_name + ' ' + data.last_name);
             
            if ($rootScope.lang == 'fa') {

                $scope.resendGet.success2 = '  و به  نشانی   ' ;
                if(data.city){
                    $scope.resendGet.success2+= data.city.label + ' ';
                } if(data.district_type){
                    $scope.resendGet.success2+= data.district_type.label + ' ';
                }if(data.district){
                    $scope.resendGet.success2+= data.district + ' ';
                }
                $scope.resendGet.success2+=pass;
                if(data.district){
                    $scope.resendGet.success2+= ' پلاک ' + data.plaque;
                }
                if(data.building){
                    $scope.resendGet.success2 += ' ساختمان ' + data.building +' ';
                }
                if (data.floor) {
                    $scope.resendGet.success2 += ' طبقه ' + data.floor.label;
                }
                if (data.unit_no) {
                    $scope.resendGet.success2 += ' واحد ' + data.unit_no;
                }
                $scope.resendGet.success2 += '   ارسال شده است.  ';
            } else {
                $scope.resendGet.success2 = "Address: "
                if (data.unit_no) {
                    $scope.resendGet.success2 += ' unit ' + data.unit_no;
                }
                if (data.floor) {
                    $scope.resendGet.success2 += ' Apt ' + data.floor.label;
                }
                if(data.plaque)
                {
                    $scope.resendGet.success2 += ' No. ' + data.plaque + ' ';
                }
                $scope.resendGet.success2 +=  pass + ' ';

                if(data.district)
                {
                    $scope.resendGet.success2 +=  data.district + ' ';
                }
                if(data.district_type)
                {
                    $scope.resendGet.success2 += data.district_type.label + ' ';
                }
                if(data.city)
                {
                    $scope.resendGet.success2 += data.city.label;
                }
            }



        }, function (error) {
            if (error.error = 'NOT_FOUND') {
                $scope.resendGet.error = $rootScope.lang == 'fa' ? 'اطلاعات وارد شده صحیح نمی باشد ، لطفا مجددا اطلاعات را با دقت وارد نمایید ' : 'The information entered is incorrect, please re enter information carefully ';
            }
            else {
                $scope.resendGet.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
            }
        }).finally(function () {
            request = false;
        });
    };

    //resend letter requset
    $scope.resendRequestFunction = function (value) {

        if (request == true) return;
        request = true;
        $scope.resend.error = '';

        //resend letter requset to server
        Model.rquestResend(value).then(function (data) {

            //server response is url of bank , we redirect user to this url
             window.location.href = data.redirect_url;
        }, function (error) {
            if (error.error = 'NOT_FOUND') {
                $scope.resend.error = $rootScope.lang == 'fa' ? 'اطلاعات وارد شده صحیح نمی باشد ، لطفا مجددا اطلاعات را با دقت وارد نمایید ' : 'The information entered is incorrect, please re enter information carefully ';
            }
            else {
                $scope.resend.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
            }
        }).finally(function () {
            request = false;
        });
    };

    //get this postal code information(city and province)
    $scope.checkPostalCode = function () {
        $("#addNewRequestCity").removeAttr('disabled');
        $("#addNewRequestState").removeAttr('disabled');

        Model.checkPostalcode($scope.addNewRequest.PostalCode1).then(function (data) {
            $scope.truePostalAddress = data;
            $scope.checkPostal();
  
            var postalCodeText='<div> آدرس : '; 
            
            if(data.province){
                postalCodeText+=  data.province
            }
            if(data.town_ship){
                postalCodeText+= ' ، '+ data.town_ship
            }
            if(data.locality_name){
                postalCodeText+= ' ، '+ data.locality_name
            }
            if(data.village){
                postalCodeText+= ' ، '+ data.village
            }
            if(data.sub_locality){
                postalCodeText+= ' ، '+ data.sub_locality
            }
            if(data.street_1st){
                postalCodeText+= ' ، '+ data.street_1st
            }
            if(data.street_2nd){
                postalCodeText+= ' ، '+ data.street_2nd
            }
            if(data.house_number){
                postalCodeText+= ' ، پلاک '+ data.house_number
            } 
            if(data.building_name && !data.building_name.trim()==''){
                postalCodeText+= ' ، ساختمان '+ data.building_name
            } 
            if(data.floor){
                postalCodeText+= ' ، طبقه '+ data.floor
            } 
   
            postalCodeText+='</div>';
            

            $('#postalSelect').html(postalCodeText)
 

            if(data.province_id && data.province_id !=null && data.province_id!='null' && data.city_id && data.city_id!=null && data.city_id!="null" ){
                stateByPostal=data.province_id+'';
                $("#addNewRequestState").val(data.province_id+'');
                $("#addNewRequestState").attr('disabled','disabled'); 
                cityByPostal=data.city_id+'';      
                loadCity(); 
            }else{
                cityByPostal='';
                stateByPostal='';
            }
        
            // $scope.addNewRequest.MainRoadTxt=data.sub_locality;
            // $scope.addNewRequest.SecondaryRoadTxt1=data.street
            // $scope.addNewRequest.SecondaryRoadTxt2=data.street2;
            // if(data.house_number){
            //     $scope.addNewRequest.Plaque=data.house_number;
            // }else{
            //     $scope.addNewRequest.HasNoPlaque=true; 
            //     $("#addNewRequestPlaque").val('عدم وجود پلاک')
            //     $("#addNewRequestPlaque").attr("disabled", "disabled"); 
            // } 
            // $scope.addNewRequest.Floor=data.floor;
            // $scope.addNewRequest.BuildingName=data.building_name
 

        }, function (error) {
            $scope.truePostalAddress = '';
            cityByPostal ='';
            stateByPostal ='';
        }).finally(function () {

        });
    };
 
    //get this postal code information(city and province)
    $scope.checkPostalCodeForEdit = function () {
        $("#editRequestCity").removeAttr('disabled');
        $("#editRequestState").removeAttr('disabled');

        Model.checkPostalcode($scope.editRequest.PostalCode1).then(function (data) {
            $scope.truePostalAddressForEdit = data;
            $scope.checkPostalForEdit();
 
            // var postalCodeText='<div> آدرس : '; 
            
            // if(data.province){
            //     postalCodeText+=  data.province
            // }
            // if(data.town_ship){
            //     postalCodeText+= ' ، '+ data.town_ship
            // }
            // if(data.locality_name){
            //     postalCodeText+= ' ، '+ data.locality_name
            // }
            // if(data.village){
            //     postalCodeText+= ' ، '+ data.village
            // }
            // if(data.sub_locality){
            //     postalCodeText+= ' ، '+ data.sub_locality
            // }
            // if(data.street_1st){
            //     postalCodeText+= ' ، '+ data.street_1st
            // }
            // if(data.street_2nd){
            //     postalCodeText+= ' ، '+ data.street_2nd
            // }
            // if(data.house_number){
            //     postalCodeText+= ' ، پلاک '+ data.house_number
            // } 
            // if(data.building_name && !data.building_name.trim()==''){
            //     postalCodeText+= ' ، ساختمان '+ data.building_name
            // } 
            // if(data.floor){
            //     postalCodeText+= ' ، طبقه '+ data.floor
            // } 
   
            // postalCodeText+='</div>';
            

            // $('#postalSelect').html(postalCodeText)
 

            if(data.province_id && data.province_id !=null && data.province_id!='null' && data.city_id && data.city_id!=null && data.city_id!="null" ){
                stateByPostalForEdit=data.province_id+'';
                $("#editRequestState").val(data.province_id+'');
                $("#editRequestState").attr('disabled','disabled'); 
                cityByPostalForEdit=data.city_id+'';      
                loadCityForEdit(); 
            }else{
                cityByPostalForEdit='';
                stateByPostalForEdit='';
            }
        
        }, function (error) {
            $scope.truePostalAddressForEdit = '';
            cityByPostalForEdit='';
            stateByPostalForEdit='';
        }).finally(function () {

        });
    };
 
    //before reporting letter , must load letter information
    $scope.reportRequestConfirmFunction = function (value) {

        if ($scope.changeTrackingCode3==false || request == true) return;
        request = true;
        $scope.changeTrackingCode3=false;

        //message
        $scope.confirm.success = '';
        $scope.confirm.error = '';
        $scope.report.success = '';
        $scope.report.error = '';
        //get letter information
         Model.rquestGet(value).then(function (data) {
            $scope.confirm.success = true;

            //show letter information
            var pass = '';
            if (data.pass_type_1)
            { if (data.pass_type_1 != '' && data.pass_1 != '') { pass += data.pass_type_1.label + ' ' + data.pass_1 + ' ' } }
            if (data.pass_type_2)
            { if (data.pass_type_2 != '' && data.pass_2 != '') { pass += data.pass_type_2.label + ' ' + data.pass_2 + ' ' } }
            if (data.pass_type_3)
            { if (data.pass_type_3 != '' && data.pass_3 != '') { pass += data.pass_type_3.label + ' ' + data.pass_3 + ' ' } }

             $scope.confirm.success1 = $rootScope.lang == 'fa' ? ('  نامه اعتبار سنجی مورد نظر شما برای   ' + data.first_name + ' ' + data.last_name + '  می باشد  ') : ('  Verification letter for  ' + data.first_name + ' ' + data.last_name);
              
            if ($rootScope.lang == 'fa') {
                $scope.confirm.success2 = '  و به  نشانی   ' ;
                if(data.city){
                    $scope.confirm.success2+= data.city.label + ' ';
                } if(data.district_type){
                    $scope.confirm.success2+= data.district_type.label + ' ';
                }if(data.district){
                    $scope.confirm.success2+= data.district + ' ';
                }
                $scope.confirm.success2+=pass;
                if(data.district){
                    $scope.confirm.success2+= ' پلاک ' + data.plaque;
                }
                if(data.building){
                    $scope.confirm.success2 += ' ساختمان ' + data.building +' ';
                }
                if (data.floor) {
                    $scope.confirm.success2 += ' طبقه ' + data.floor.label;
                }
                if (data.unit_no) {
                    $scope.confirm.success2 += ' واحد ' + data.unit_no;
                }
                $scope.confirm.success2 += '   ارسال شده است.  ';
            } else {
                //if language be english
                $scope.confirm.success2 = "Address: "
                if (data.unit_no) {
                    $scope.confirm.success2 += ' unit ' + data.unit_no;
                }
                if (data.floor) {
                    $scope.confirm.success2 += ' Apt ' + data.floor.label;
                }
                if(data.plaque)
                {
                    $scope.confirm.success2 += ' No. ' + data.plaque + ' ';
                }
                $scope.confirm.success2 +=  pass + ' ';

                if(data.district)
                {
                    $scope.confirm.success2 +=  data.district + ' ';
                }
                if(data.district_type)
                {
                    $scope.confirm.success2 += data.district_type.label + ' ';
                }
                if(data.city)
                {
                    $scope.confirm.success2 += data.city.label;
                } 
            }

            $scope.confirm.success3 = $rootScope.lang == 'fa' ? " یا مایل هستید گزارش کنید که آدرس برای فرد مذکور اشتباه است ؟  " : 'Do you wish to report an address to the wrong person?';
        }, function (error) {
            if (error.error = 'NOT_FOUND') {
                $scope.confirm.error = $rootScope.lang == 'fa' ? 'اطلاعات وارد شده صحیح نمی باشد ، لطفا مجددا اطلاعات را با دقت وارد نمایید ' : 'The information entered is incorrect, please re enter information carefully ';
            }
            else {
                $scope.confirm.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
            }
        }).finally(function () {
            request = false;
        });

    };

    // report letter that is wrong
    $scope.reportRequestFunction = function (value) {

        if (request == true) return;
        request = true;

        $scope.report.success = '';
        $scope.report.error = '';

        // report letter to server
        Model.rquestReport(value).then(function (data) {
            $scope.report.success = $rootScope.lang == 'fa' ? 'گزارش شما با موفقیت ثبت شد  ، با تشکر از همکاری شما' : 'Your report has been registered, thank you for your cooperation';
        }, function (error) {
            if (error.error = 'NOT_FOUND') {
                $scope.report.error = $rootScope.lang == 'fa' ? 'اطلاعات وارد شده صحیح نمی باشد ، لطفا مجددا اطلاعات را با دقت وارد نمایید ' : 'The information entered is incorrect, please re enter information carefully ';
            }
            else {
                $scope.report.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
            }
        }).finally(function () {
            request = false;
        });
    };
 
    $scope.goToNextSectionWithoutVerification = function (){
        if($scope.sendSmsCount==2){
            //if 2 time dont send sms , skip verification and go to next step
            $scope.overlay1.hide();            
            $('#smsVerificationForm').slideUp('fast', function() {
                $scope.overlay2 = PlainOverlay.show(document.getElementById('registerFirstBox'),{style: {backgroundColor: 'rgba(255, 255, 255, 0.72)',  cursor: 'not-allowed' ,zIndex: 9000}});    
            });

            $scope.smsVerificationSuccess=true;
            $('#addNewRequestSubmit').show();
            
            return;
        }

    }
 
    $scope.sendSmsCount=0;

    //send sms for validation phone
    $scope.sendSms=function(){
        if(request==true){
            return;
        }
        request=true; 
        $scope.smsStatus= $rootScope.lang == 'fa' ?'لطفا کمی صبر کنید':'please wait...';
        if($scope.sendSmsCount==3){
            $scope.smsStatus='تعداد دفعات مجاز به پایان رسیده است ، لطفا 24 ساعت دیگر امتحان نمایید.'
            return;
        }
        $('#sendSms').hide();
        $('#smsVerificationForm').hide();
        
        //send new sms to user
        Model.sendSms($scope.addNewRequest.NationalCode , $scope.addNewRequest.PhoneNumber).then(function (data) {
         
            $scope.smsStatus=''; 
            $scope.overlay1.hide(); 

             if(data.is_verified){  
                $scope.overlay2 = PlainOverlay.show(document.getElementById('registerFirstBox'),{style: {backgroundColor: 'rgba(255, 255, 255, 0.72)',  cursor: 'not-allowed' ,zIndex: 9000}});    
                $scope.smsVerificationSuccess=true;
                $('#addNewRequestSubmit').show();
            }else{ 
                
                $('#smsVerificationForm').slideDown('fast', function() {
                    $scope.overlay1=PlainOverlay.show(document.getElementById('registerSecondBox'),{style: {backgroundColor: 'rgba(255, 255, 255, 0.72)',  cursor: 'not-allowed' ,zIndex: 9000}});    
                }); 
            
                $scope.sendSmsCount++; 
                $scope.sendAgain=false; 
                $scope.sendAgainTimer=120;
                var timer = $interval(function(){
                    $scope.sendAgainTimer= $scope.sendAgainTimer-1;
                    if($scope.sendAgainTimer===0){
                        $scope.sendAgain=true;
                        $interval.cancel(timer)
                    }
                },1000)
            } 


        }, function (error) {
            if(error.status==400){
                $scope.smsStatus=error.data.error_description;
            }else{
                $scope.smsStatus= $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
                $('#sendSms').show();
             } 
     
        }).finally(function () {
            request = false;
        }); 
    }
 
    //send secret code for validation phone
    $scope.sendSmsVerification=function(){
 
        Model.sendSmsVerification($scope.addNewRequest.NationalCode , $scope.addNewRequest.PhoneNumber ,$scope.phoneNumberValidation).then(function (data) {
              
            $scope.overlay1.hide();            
            $('#smsVerificationForm').slideUp('fast', function() {
                $scope.overlay2 = PlainOverlay.show(document.getElementById('registerFirstBox'),{style: {backgroundColor: 'rgba(255, 255, 255, 0.72)',  cursor: 'not-allowed' ,zIndex: 9000}});    
            });

            $scope.smsVerificationSuccess=true;
            $('#addNewRequestSubmit').show();
            
           
        }, function (error) {
 
            $scope.smsStatus='کد تایید وارد شده معتبر نمی باشد'//error.data.error_description;
            // if (error.error = 'NOT_FOUND') {
            //     $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'اطلاعات وارد شده صحیح نمی باشد ، لطفا مجددا اطلاعات را با دقت وارد نمایید ' : 'The information entered is incorrect, please re enter information carefully ';
            // }
            // else {
            //     $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
            // }
        }).finally(function () {
            request = false;
        }); 

    }
 
    //check city and province with postal code information
    $scope.checkPostal = function () { 
        if ($scope.truePostalAddress && $scope.truePostalAddress.province_id != null && $scope.addNewRequest.State != "0" && ($scope.truePostalAddress.province_id != $scope.addNewRequest.State)) {
            $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا کد پستی و یا استان و شهر متناظر را تصحیح کنید' : 'The province and the city entered is not in accordance with postal code, postal Code or city and province the corresponding correct',
          $scope.addNewRequest.postKind = false;
            return;
        }
        else if ($scope.truePostalAddress && $scope.truePostalAddress.city_id != null && $scope.addNewRequest.City != "0" && ($scope.truePostalAddress.city_id != $scope.addNewRequest.City)) {
            $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا کد پستی و یا استان و شهر متناظر را تصحیح کنید' : 'The province and the city entered is not in accordance with postal code, postal Code or city and province the corresponding correct',
            $scope.addNewRequest.postKind = false;
            return;
        }
            //if postall code not have information ( city code and province code ) or request failed , user can add all city and province ;
        else {
            $scope.addNewRequest.error = false;
        }
    };
 
    //check city and province with postal code information
    $scope.checkPostalForEdit = function () { 
        if ($scope.truePostalAddressForEdit && $scope.truePostalAddressForEdit.province_id != null && $scope.truePostalAddressForEdit.city_id != null && $scope.truePostalAddressForEdit.city_id != '' && $scope.editRequest.City != "0" && ($scope.truePostalAddressForEdit.city_id != $scope.editRequest.City) && $scope.truePostalAddressForEdit.province_id != '' && $scope.editRequest.State != "0" && ($scope.truePostalAddressForEdit.province_id != $scope.editRequest.State)) {
            $scope.editRequest.error = $rootScope.lang == 'fa' ? 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا کد پستی و یا استان و شهر متناظر را تصحیح کنید' : 'The province and the city entered is not in accordance with postal code, postal Code or city and province the corresponding correct',
          $scope.editRequest.postKind = false;
            return;
        } 
            //if no information found for postal code from POST serer (city code and province code) or the request failed , then user can provice city and province himself;
        else {
            $scope.editRequest.error = false;
        }
    };

    //before add new letter requset , call this function
    $scope.beforeAddNewRequest = function () {

        //check main road or Secondary road fill
        if (($scope.addNewRequest.MainRoadDrop === '' || $scope.addNewRequest.MainRoadTxt === '') && ($scope.addNewRequest.SecondaryRoadDrop1 === '' || $scope.addNewRequest.SecondaryRoadTxt1 === '') && ($scope.addNewRequest.SecondaryRoadDrop2 === '' || $scope.addNewRequest.SecondaryRoadTxt2 === '')) {
            $scope.addNewRequest.error = $rootScope.lang == 'fa' ? ' لطفا معبر اصلی یا معبر فرعی خود را مشخص کنید' : 'Please specify your main crossing or crossing subsidiary';
            $scope.addNewRequest.postKind = false;
            return;
        }
        //check Gender selected
        else if (($scope.addNewRequest.Gender == '' || $scope.addNewRequest.Gender == undefined) && $scope.addNewRequest.personType == 'natural_person') {
            $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'لطفا جنسیت خود را مشخص نمایید' : 'Please specify your gender';
            $scope.addNewRequest.postKind = false;
            return;
        }
        // check  province with postal code information
        else if ($scope.truePostalAddress && $scope.truePostalAddress.province_id != null && $scope.addNewRequest.State != "0" && ($scope.truePostalAddress.province_id != $scope.addNewRequest.State)) {
            $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا کد پستی و یا استان و شهر متناظر را تصحیح کنید' : 'The province and the city entered is not in accordance with postal code, postal Code or city and province the corresponding correct',
            $scope.addNewRequest.postKind = false;
            return;
        }
        //check city with postal code information
        else if ($scope.truePostalAddress && $scope.truePostalAddress.city_id != null && $scope.addNewRequest.City != "0" && ($scope.truePostalAddress.city_id != $scope.addNewRequest.City)) {
            $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا کد پستی و یا استان و شهر متناظر را تصحیح کنید' : 'The province and the city entered is not in accordance with postal code, postal Code or city and province the corresponding correct',
            $scope.addNewRequest.postKind = false;
            return;
        }
        else {
            //if the user has entered irpost as discount code, then disable all the form (new request form)
             if(($scope.addNewRequest.discountCode+'').toLowerCase().trim()=='irpost!!!!'){
                $scope.addNewRequest.companyRequestTypeId=$scope.sendType[$scope.sendType.length-1].id;
                $scope.loadPreview($scope.addNewRequest.companyRequestTypeId)
                $scope.notShowPostSendingPriceBox=true;
                $scope.addNewRequestFunction($scope.addNewRequest)
            }else{
				$log.info('We found irpost is not entered as discount code');
                $scope.notShowPostSendingPriceBox=false;                
            }

            $scope.addNewRequest.postKind = true; 
			$log.info('Now add new request kind = true');
            $scope.$apply();
            $scope.addNewRequest.error = false;
            $('#addNewRequestSubmit').attr('disabled', 'disabled');
            $('#addNewRequestFirstName').attr('disabled', 'disabled');
            $('#addNewRequestFirstName1').attr('disabled', 'disabled');
            $('#addNewRequestLastName').attr('disabled', 'disabled');
            $('.forDisableCheckBox').attr('disabled', 'disabled');
            $('#addNewRequestNationalCode').attr('disabled', 'disabled');
            $('#addNewRequestNationalCode1').attr('disabled', 'disabled');
            $('#addNewRequestPhoneNumber').attr('disabled', 'disabled');
            $('#addNewRequestPhoneNumber1').attr('disabled', 'disabled');
            $('#addNewRequestEmail').attr('disabled', 'disabled');
            $('#addNewRequestEmail1').attr('disabled', 'disabled');
            $('#addNewRequestPostalCode1').attr('disabled', 'disabled');
            $('#addNewRequestPostalCode2').attr('disabled', 'disabled');
            $('#addNewRequestState').attr('disabled', 'disabled');
            $('#addNewRequestCity').attr('disabled', 'disabled');
            $('#addNewRequestVillageDrop').attr('disabled', 'disabled');
            $('#addNewRequestVillageTxt').attr('disabled', 'disabled');
            $('#addNewRequestMainRoadDrop').attr('disabled', 'disabled');
            $('#addNewRequestMainRoadTxt').attr('disabled', 'disabled');
            $('#addNewRequestSecondaryRoadDrop1').attr('disabled', 'disabled');
            $('#addNewRequestSecondaryRoadTxt1').attr('disabled', 'disabled');
            $('#addNewRequestSecondaryRoadDrop2').attr('disabled', 'disabled');
            $('#addNewRequestSecondaryRoadTxt2').attr('disabled', 'disabled');
            $('#addNewRequestPlaque').attr('disabled', 'disabled');
            $('#addNewRequestFloor').attr('disabled', 'disabled');
            $('#addNewRequestUnit').attr('disabled', 'disabled');
            $('#addNewRequestBuildingName').attr('disabled', 'disabled');
            $('#addNewRequestSubmit').attr('disabled', 'disabled');

            // show overlay transparent layer
            //$('#overlay').show();
			$log.info('We are in Scope.overlay3');
            $scope.overlay3 = PlainOverlay.show(document.getElementById('overlay'),{style: {backgroundColor: 'rgba(255, 255, 255, 0.72)',  cursor: 'not-allowed' ,zIndex: 9000}});    
 
        } 
    };

    //cancel select post shipping
    $scope.cancelRequest = function () {
        if (($scope.addNewRequest.error == false || $scope.addNewRequest.error == '') && ($scope.addNewRequest.success == false || $scope.addNewRequest.success == '')) {

           //show all the form (new request form)
            $('#addNewRequestSubmit').removeAttr('disabled');
            $('#addNewRequestFirstName').removeAttr('disabled');
            $('#addNewRequestFirstName1').removeAttr('disabled');
            $('#addNewRequestLastName').removeAttr('disabled');
            $('.forDisableCheckBox').removeAttr('disabled');
            $('#addNewRequestNationalCode').removeAttr('disabled');
            $('#addNewRequestNationalCode1').removeAttr('disabled');
            $('#addNewRequestPhoneNumber').removeAttr('disabled');
            $('#addNewRequestPhoneNumber1').removeAttr('disabled');
            $('#addNewRequestEmail').removeAttr('disabled');
            $('#addNewRequestEmail1').removeAttr('disabled');
            $('#addNewRequestPostalCode1').removeAttr('disabled');
            $('#addNewRequestPostalCode2').removeAttr('disabled');
            $('#addNewRequestState').removeAttr('disabled');
            $('#addNewRequestCity').removeAttr('disabled');
            $('#addNewRequestVillageDrop').removeAttr('disabled');
            $('#addNewRequestVillageTxt').removeAttr('disabled');
            $('#addNewRequestMainRoadDrop').removeAttr('disabled');
            $('#addNewRequestMainRoadTxt').removeAttr('disabled');
            $('#addNewRequestSecondaryRoadDrop1').removeAttr('disabled');
            $('#addNewRequestSecondaryRoadTxt1').removeAttr('disabled');
            $('#addNewRequestSecondaryRoadDrop2').removeAttr('disabled');
            $('#addNewRequestSecondaryRoadTxt2').removeAttr('disabled');
            $('#addNewRequestPlaque').removeAttr('disabled');
            $('#addNewRequestFloor').removeAttr('disabled');
            $('#addNewRequestUnit').removeAttr('disabled');
            $('#addNewRequestBuildingName').removeAttr('disabled');
            $('#addNewRequestSubmit').removeAttr('disabled');

            // hide overlay transparent layer
            //$('#overlay').hide();
            $scope.overlay3.hide();
            
        }
    };

    //add new requset function
    $scope.addNewRequestFunction = function () {

        //disable new request button
        $('#addNewRequestSendBtn').attr('disabled', 'disabled');

        $('#addNewRequestSendStatus').html('لطفا کمی صبر کنید')
        if (request == true) return;

        request = true;

        $scope.addNewRequest.success = '';
        $scope.addNewRequest.error = '';

        //added default value of null parameters and fit data in right format
        if ($scope.addNewRequest.personType != 'natural_person') {
            $scope.addNewRequest.Gender = '0';
            $scope.addNewRequest.LastName = '';
            $scope.addNewRequest.PostalCode2 = $scope.addNewRequest.PostalCode1;
        }

        if ($scope.addNewRequest.Floor && $scope.addNewRequest.Floor[0]) {
            $scope.addNewRequest.Floor = $scope.addNewRequest.Floor[0]
        } else {
            $scope.addNewRequest.Floor = '';
        }
        
        if(cityByPostal && cityByPostal!=null && cityByPostal !='null'){
            $scope.addNewRequest.City = cityByPostal;
        }
        if(stateByPostal && stateByPostal!=null && stateByPostal!='null'){
            $scope.addNewRequest.State = stateByPostal;
        }

        if($scope.addNewRequest.Plaque =='0' || $scope.addNewRequest.Plaque==''){
            $scope.addNewRequest.Plaque='';
            $scope.addNewRequest.HasNoPlaque=true;
        }
             
        //send new requset to server
        Model.requestNew($scope.addNewRequest).then(function (data) {

            //server response is url of bank , we redirect user to this url
            window.location.href = data.redirect_url;
        }, function (error) {
            if (error.error = 'NOT_FOUND') {
                $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'اطلاعات وارد شده صحیح نمی باشد ، لطفا مجددا اطلاعات را با دقت وارد نمایید ' : 'The information entered is incorrect, please re enter information carefully ';
            }
            else {
                $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
            }
        }).finally(function () {
            $('#addNewRequestSendStatus').html('')
            
            request = false;
        });
    };
  
    //add Edit requset function
    $scope.editRequestFunction = function () {


        //check main road or Secondary road fill
        if (($scope.editRequest.MainRoadDrop === '' || $scope.editRequest.MainRoadTxt === '') && ($scope.editRequest.SecondaryRoadDrop1 === '' || $scope.editRequest.SecondaryRoadTxt1 === '') && ($scope.editRequest.SecondaryRoadDrop2 === '' || $scope.editRequest.SecondaryRoadTxt2 === '')) {
            $scope.editRequest.error = $rootScope.lang == 'fa' ? ' لطفا معبر اصلی یا معبر فرعی خود را مشخص کنید' : 'Please specify your main crossing or crossing subsidiary';
             return;
        }
        
        // check  province with postal code information
        else if ($scope.truePostalAddressForEdit && $scope.truePostalAddressForEdit.province_id != null  && $scope.truePostalAddressForEdit.city_id != null && $scope.truePostalAddressForEdit.city_id != '' && $scope.editRequest.City != "0" && ($scope.truePostalAddressForEdit.city_id != $scope.editRequest.City) && $scope.truePostalAddressForEdit.province_id != '' && $scope.editRequest.State != "0" && ($scope.truePostalAddressForEdit.province_id != $scope.editRequest.State)) {
            $scope.editRequest.error = $rootScope.lang == 'fa' ? 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا کد پستی و یا استان و شهر متناظر را تصحیح کنید' : 'The province and the city entered is not in accordance with postal code, postal Code or city and province the corresponding correct';
             return;
        } 

        //disable new request button
        $('#editRequestSubmit').attr('disabled', 'disabled');

        $('#editRequestSendStatus').html('لطفا کمی صبر کنید')
        if (request == true) return;

        request = true;


        $scope.editRequest.error = '';
 

        if ($scope.editRequest.Floor && $scope.editRequest.Floor[0]) {
            $scope.editRequest.Floor = $scope.editRequest.Floor[0]
        } else {
            $scope.editRequest.Floor = '';
        }
        
        if(cityByPostalForEdit && cityByPostalForEdit!=null && cityByPostalForEdit !='null'){
            $scope.editRequest.City = cityByPostalForEdit;
        }
        if(stateByPostalForEdit && stateByPostalForEdit!=null && stateByPostalForEdit!='null'){
            $scope.editRequest.State = stateByPostalForEdit;
        }

        if($scope.editRequest.Plaque =='0' || $scope.editRequest.Plaque==''){
            $scope.editRequest.Plaque='';
            $scope.editRequest.HasNoPlaque=true;
        }
             
        $scope.editRequest.success='';
        $scope.editRequest.error='';
        
        //send new requset to server
        Model.requestEdit($scope.editRequest).then(function (data) {

            //server response is url of bank , we redirect user to this url
           // window.location.href = data.redirect_url;

            $scope.editRequest.success ='تغییر آدرس شما با موفقیت انجام شد'


        }, function (error) {
            if (error.error = 'NOT_FOUND') {
                $scope.editRequest.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، امکان تغییر اطلاعات شما وجود ندارد' : 'The information entered is incorrect, please re enter information carefully ';
            }
            else {
                $scope.editRequest.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
            }
        }).finally(function () {
             
            request = false;
        });
    };
  
    //user can send message to us
    $scope.addNewMessageFunction = function (value) {

        if ($scope.changeNewMessage==false || request == true) return;
        request = true;
        $scope.changeNewMessage=false;
        $scope.addNewMessage.success = '';
        $scope.addNewMessage.error = '';

        //send message to server
        Model.messageNew(value).then(function (data) {
            $scope.addNewMessage.success = $rootScope.lang == 'fa' ? 'یکی از همکاران ما ظرف 48 ساعت آینده از طریق تلفن یا ایمیل پاسخگوی سوال شما خواهد بود' : 'One of our colleagues  will be contact you in the next 48 hours via phone or email to answer your question';
        }, function (error) {
            if (error.error = 'NOT_FOUND') {
                $scope.addNewMessage.error = $rootScope.lang == 'fa' ? 'اطلاعات وارد شده صحیح نمی باشد ، لطفا مجددا اطلاعات را با دقت وارد نمایید ' : 'The information entered is incorrect, please re enter information carefully ';
            }
            else {
                $scope.addNewMessage.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
            }
        }).finally(function () {
            request = false;
        });
    };

    //join to our newsletter
    $scope.newsletterFunction = function (email) {

        if ($scope.changeNewsLatter==false || request == true) return;
        if (!email) {
            $scope.newsletterResponse = 'لطفا ایمیل خود را وارد نمایید';
            return;
        }
        request = true;
        $scope.changeNewsLatter=false;
        $scope.newsletterResponse = '';

        //send joined email to server
        Model.newsletter(email).then(function (data) {
            $scope.newsletterResponse = 'ایمیل شما با موفقیت ثبت شد. با تشکر از شما';
        }, function (error) {
            if (error.error = 'NOT_FOUND') {
                $scope.newsletterResponse = $rootScope.lang == 'fa' ? 'اطلاعات وارد شده صحیح نمی باشد ، لطفا مجددا اطلاعات را با دقت وارد نمایید ' : 'The information entered is incorrect, please re enter information carefully ';
            }
            else {
                $scope.newsletterResponse = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
            }
        }).finally(function () {
            request = false;
        });
    };

    //check discount code
    $scope.checkDiscountCode=function (discountCode) {
        $scope.discountFailed=false;

        if((discountCode+'').toLowerCase().trim()=='irpost'){

            $scope.discount=100;
            
        }else{
            //if discount code length be 6 , checking start
            if(discountCode.length==6 && !request){
                request = true;

                //send discound code to server
                Model.checkDiscountCode(discountCode).then(function (data) {
                if(data && data.percentage){

                    //use this percent of discount code to price
                    $scope.discount= data.percentage*1;
                }else{
                    $scope.discountFailed=true;
                    $scope.discount=0;
                }
                }, function (error) {
                    $scope.discountFailed=true;
                    $scope.discount=0;
                }).finally(function () {
                    request = false;
                });
            }
        } 
    };

    // all validation status
    $scope.status= {
        'new': 'درخواست اولیه نامه اعتبارسنجی نشانی دریافت و در سیستم ثبت شده است.',
        'cancelled': 'تقاضای اولیه صدور نامه اعتبارسنجی نشانی لغو گردیده و نامه اعتبار سنجی تولید و چاپ نخواهد شد.',
        'strange': 'وضعیت فعلی نامه اعتبارسنجی نشانی مشخص نیست. لطفا با تلفن امور مشتریان تماس بگیرید.',
        'letter_generated': ' نامه اعتبارسنجی نشانی با موفقیت در سیستم ثبت شده است و در انتطار برای ارسال به مرحله چاپ می باشد',
        'to_print': 'نامه اعتبارسنجی نشانی وارد مرحله چاپ و پاکت گذاری شده است ولی هنوز تحویل شبکه پستی نشده است.',
        'print_problem': 'در مرحله چاپ نامه اعتبارسنجی نشانی مشکلاتی ایجاد شده است. اگر بعد از 2 روز این وضعیت تغییر نکرد، با امور مشتریان لطفا تماس بگیرید.',
        'to_post_problem': 'در مرحله تحویل نامه به شبکه پستی مشکلی ایجاد شده است. لطفا با تلفن امور مشتریان تماس بگیرید.',
        'to_post': 'نامه اعتبارسنجی نشانی چاپ شده و سپس تحویل شبکه پستی شده است. نامه هنوز تصدیق نشده است .',
        'verified': 'نامه اعتبارسنجی نشانی بطور موفقیت آمیز توسط شهروند تصدیق شده است و وسیکل اعتبارسنجی تکمیل و به پایان رسیده است.',
        'not_verified': 'نامه اعتبارسنجی نشانی هنوز تصدیق نشده است و به انتهای دوره انقضا نزدیک گردیده است.',
        'reported': 'گزارشی دریافت شده است مبنی بر خطای آدرس یا عدم حضور شهروند در نشانی قید شده در نامه اعتبارسنجی. لطفا با امور مشتریان فورا تماس تلفنی بگیرید.'
    };
 

    $('#addNewRequestHasNoPlaque').on('change',function () { 
        if( $('#addNewRequestHasNoPlaque').is(':checked')){
            $("#addNewRequestPlaque").val('عدم وجود پلاک')
            $("#addNewRequestPlaque").attr("disabled", "disabled");  
        }else{
            $("#addNewRequestPlaque").val('')
            $("#addNewRequestPlaque").removeAttr("disabled");  
        }
    });

    $('#editRequestHasNoPlaque').on('change',function () { 
        if( $('#editRequestHasNoPlaque').is(':checked')){
            $("#editRequestPlaque").val('عدم وجود پلاک')
            $("#editRequestPlaque").attr("disabled", "disabled");  
        }else{
            $("#editRequestPlaque").val('')
            $("#editRequestPlaque").removeAttr("disabled");  
        }
    });

    //if first request submited , another request dont submit until change text box
    $('#newslatter').on('change',function () {
        $scope.changeNewsLatter=true;
    });
    //if first request submited , another request dont submit until change text box
    $('#addNewMessageText').on('change',function () {
        $scope.changeNewMessage=true;
    });
    //if first request submited , another request dont submit until change text box
    $('#trackingCode1').on('change',function () {
        $scope.changeTrackingCode1=true;
    });
    //if first request submited , another request dont submit until change text box
    $('#trackingCode2').on('change',function () {
        $scope.changeTrackingCode2=true;
    });
    //if first request submited , another request dont submit until change text box
    $('#trackingCode3').on('change',function () {
        $scope.changeTrackingCode3=true;
    });
    //if first request submited , another request dont submit until change text box
    $('#nationalCode').on('change',function () {
        $scope.changeVerifyRequestCode=true;
    });
    //if first request submited , another request dont submit until change text box
    $('#confirmCode').on('change',function () {
        $scope.changeVerifyRequestCode=true;
    });

    // this ids are numeric , so we just put numbers in it;
    $('#main').on('keydown', '#nationalCode , #addNewRequestNationalCode, #addNewRequestNationalCode1 ,#addNewRequestPostalCode1,#addNewRequestPostalCode2,#editRequestNationalCode, #editRequestNationalCode1 ,#editRequestPostalCode1,#editRequestPostalCode2,#confirmCode , #trackingCode1, #trackingCode2, #trackingCode3 , #trackingCode2 ,#phoneNumber ,#phoneNumber2 , #postalCode1, #postalCode2', function (e) {
        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 37 == e.keyCode || 39 == e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault();
    });

    //change all iranian number to en
    String.prototype.toEnDigit = function () {
        return this.replace(/[\u06F0-\u06F9]+/g, function (digit) {
            var ret = '';
            for (var i = 0, len = digit.length; i < len; i++) {
                ret += String.fromCharCode(digit.charCodeAt(i) - 1728);
            }
            return ret;
        });
    };



    //change all arabic character to persian(fa)
    String.prototype.toFaCharaccter = function () {
        var arabicValue=this;
        if (!arabicValue) {
            return '';
        } 
        var arabicChars = ["ي", "ك", "‍", "دِ", "بِ", "زِ", "ذِ", "ِشِ", "ِسِ", "‌", "ى"],
            persianChars = ["ی", "ک", "", "د", "ب", "ز", "ذ", "ش", "س", "", "ی"];

        for (var i = 0, charsLen = arabicChars.length; i < charsLen; i++) {
            arabicValue = arabicValue.replace(new RegExp(arabicChars[i], "g"), persianChars[i]);
        }

        return arabicValue;

    };



    // when typing , real time change persion number to en number
    $('input').on('input', function () {
        var value = $(this).val();
        $(this).val(value.toEnDigit().toFaCharaccter());
    });


    //this function validate iranian nation number
    function isValidIranianNationalCode(input) {

        if (!/^\d{10}$/.test(input))
            return false;

        var check = parseInt(input[9]);
        var sum = 0;
        var i;
        for (i = 0; i < 9; ++i) {
            sum += parseInt(input[i]) * (10 - i);
        }
        sum %= 11;

         return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
    }

    // fix alignment of inputs
    if ($rootScope.lang == 'fa') {
        $('input').css({ 'text-align': 'right' })
        document.head.insertAdjacentHTML('beforeend', '<style>.select2-search__field:-moz-placeholder { text-align: right;color: #b1afaf;}.select2-search__field:-ms-input-placeholder { text-align: right;color: #b1afaf;} .select2-search__field::-webkit-input-placeholder { text-align: right;color: #b1afaf;} </style>');

    } else {
        $('input').css({ 'text-align': 'left' })
        document.head.insertAdjacentHTML('beforeend', '<style>.select2-search__field:-moz-placeholder { text-align: left;color: #b1afaf;}.select2-search__field:-ms-input-placeholder { text-align: left;color: #b1afaf;} .select2-search__field::-webkit-input-placeholder { text-align: left;color: #b1afaf;} </style>');
    }


    //type.js madule config: auto writing paragraph
    $("#typed").typed({
         stringsElement: $('#typed-strings'),
        typeSpeed: 18,
        backDelay: 1500,
        backSpeed: 0,
        loop: true,
        contentType: 'html', // or text
        // defaults to false for infinite loop
        loopCount: false,
        callback: function () { foo(); },
        resetCallback: function () { newTyped(); }
    });
    $(".reset").click(function () {
        $("#typed").typed('reset');
    });
    function newTyped() { /* A new typed object */ }
    function foo() { //console.log("Callback");
    }
    //end of type.js


    //select2 madule config
    $('.js-example-basic-multiple-limit').select2({
        maximumSelectionLength: 1,
        //allowClear: true
        placeholder: $rootScope.lang == 'fa' ? 'طبقه ( اختیاری)' : 'Floor',
        dir: "rtl",
        language: $rootScope.lang + ""
    })
      .on('select2:close', function (evt) {// Select by tab btn
          var context = $(evt.target);

          $(document).on('keydown.select2', function (e) {
              if (e.which === 9) { // tab
                  var highlighted = context
                                    .data('select2')
                                    .$dropdown
                                    .find('.select2-results__option--highlighted');
                  if (highlighted) {
                      var id = highlighted.data('data').id;
                      context.val(id).trigger('change');
                  }
              }
          });

          // unbind the event again to avoid binding multiple times
          setTimeout(function () {
              $(document).off('keydown.select2');
          }, 1);
      });
    //end of select 2

    // validation message
    var myLanguage = {
        requiredFields: 'لطفا همه های اجباری را پر نمایید',
        requiredField: 'لطفا این فیلد را پر نمایید',
        badEmail: 'لطفا آدرس ایمیل را به درستی وارد نمایید',
        lengthBadStart: 'لطفا  ',
        lengthBadEnd: ' کاراکتر وارد نمایید',
        lengthTooLongStart: 'لطفا حداکثر ',
        lengthTooShortStart: 'لطفا حداقل ',
        notConfirmed: 'مقدار وارد شده درست نمی باشد',
        badCustomVal: 'مقدار وارد شده صحیح نمی باشد',
        andSpaces: ' and spaces ',
        badInt: 'لطفا در این فیلد فقط از اعداد استفاده نمایید',
        badNumberOfSelectedOptionsStart: 'لطفا حداقل  ',
        badNumberOfSelectedOptionsEnd: ' گزینه را انتخاب نمایید',
        badAlphaNumeric: 'لطفا در این فیلد فقط از اعداد و حروف استفاده نمایید ',
        badAlphaNumericExtra: ' and ',
        groupCheckedRangeStart: 'شما باید  ',
        groupCheckedTooFewStart: 'شما باید حداقل ',
        groupCheckedTooManyStart: 'شما باید حداکثر ',
        groupCheckedEnd: ' مورد را انتخاب نمایید',
        min: 'حداقل',
        max: 'حداکثر'
    };
    $.formUtils.addValidator({
        name: 'IranNationalCode',
        validatorFunction: function (value, $el, config, language, $form) {
            return isValidIranianNationalCode($scope.addNewRequest.NationalCode);
        },
        errorMessage: $rootScope.lang == 'fa' ? 'کد ملی وارد شده صحیح نیست' : 'National code is not correct',
        errorMessageKey: 'IranNationalCode'
    });


    //CheckPostalCode real time validator
    $.formUtils.addValidator({
        name: 'CheckPostalCode',
        validatorFunction: function (value, $el, config, language, $form) {
             
            if ($scope.truePostalAddress && $scope.truePostalAddress.province_id != null && $scope.addNewRequest.State != "0" && ($scope.truePostalAddress.province_id != $scope.addNewRequest.State)) {
               return false;
            }
            else if ($scope.truePostalAddress && $scope.truePostalAddress.city_id != null && $scope.addNewRequest.City != "0" && ($scope.truePostalAddress.city_id != $scope.addNewRequest.City)) {
                  return false;
            }
            else {
                 return true;
            }
        },
        errorMessage: $rootScope.lang == 'fa' ? 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا کد پستی و یا استان و شهر متناظر را تصحیح کنید' : 'The province and the city entered is not in accordance with postal code, postal Code or city and province the corresponding correct',
        errorMessageKey: 'CheckPostalCode'
    });

 
    
    //CheckPostalCode real time validator for edit form
    $.formUtils.addValidator({
        name: 'CheckPostalCodeForEdit',
        validatorFunction: function (value, $el, config, language, $form) {
             
            if ($scope.truePostalAddressForEdit && $scope.truePostalAddressForEdit.province_id != null && $scope.truePostalAddressForEdit.city_id != null && $scope.editRequest.City != "0" && ($scope.truePostalAddressForEdit.city_id != $scope.editRequest.City) && $scope.editRequest.State != "0" && ($scope.truePostalAddressForEdit.province_id != $scope.editRequest.State)) {
           
                  return false;
            }
            else {
                 return true;
            }
        },
        errorMessage: $rootScope.lang == 'fa' ? 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا کد پستی و یا استان و شهر متناظر را تصحیح کنید' : 'The province and the city entered is not in accordance with postal code, postal Code or city and province the corresponding correct',
        errorMessageKey: 'CheckPostalCode'
    });

    //added validator to send Sms Form
    $.validate({
        language: $rootScope.lang == 'fa' ? myLanguage : '',
        form: '#sendSmsForm',
        onSuccess: function () {
            $scope.sendSms();
        },
        scrollToTopOnError: true
    });


    //added validator to sms Verification Form
    $.validate({
        language: $rootScope.lang == 'fa' ? myLanguage : '',
        form: '#smsVerificationForm',
        onSuccess: function () {
            $scope.sendSmsVerification();
        },
        scrollToTopOnError: true
    });


 

    //added validator to add New Request Form
    $.validate({
        language: $rootScope.lang == 'fa' ? myLanguage : '',
        form: '#addNewRequestForm',
        onSuccess: function () {
            $scope.beforeAddNewRequest();
        },
        scrollToTopOnError: true
    });

    //added validator to add edit Form
    $.validate({
        language: $rootScope.lang == 'fa' ? myLanguage : '',
        form: '#editLoadRequestForm',
        onSuccess: function () {

        },
        scrollToTopOnError: true
    });

    //added validator to add edit Form
    $.validate({
        language: $rootScope.lang == 'fa' ? myLanguage : '',
        form: '#editRequestFormSubmit',
        onSuccess: function () {
            $scope.editRequestFunction();
        },
        scrollToTopOnError: true
    });




    //added validator to verify Request Form
    $.validate({
        language: $rootScope.lang == 'fa' ? myLanguage : '',
        form: '#verifyRequestForm',
        onSuccess: function () {

        },
        scrollToTopOnError: false
    });

    //added validator to get Request Form
    $.validate({
        language: $rootScope.lang == 'fa' ? myLanguage : '',
        form: '#getRequestForm',
        onSuccess: function () {

        },
        scrollToTopOnError: false
    });

    
    //added validator to resend Request Form
    $.validate({
        language: $rootScope.lang == 'fa' ? myLanguage : '',
        form: '#resendRequestForm',
        onSuccess: function () {

        },
        scrollToTopOnError: false
    });

    //added validator to report Request Form
    $.validate({
        language: $rootScope.lang == 'fa' ? myLanguage : '',
        form: '#reportRequestForm',
        onSuccess: function () {

        },
        scrollToTopOnError: false
    });

    //added validator to add New Message Request Form
    $.validate({
        language: $rootScope.lang == 'fa' ? myLanguage : '',
        form: '#addNewMessageForm',
        onSuccess: function () {

        },
        scrollToTopOnError: false
    });

    //added validator to add newslatter Form
    $.validate({
        language: $rootScope.lang == 'fa' ? myLanguage : '',
        form: '#newslatterForm',
        onSuccess: function () {
        },
        onElementValidate :function(){

        },
        scrollToTopOnError: false
    });
    $('.btn-center').css({ 'text-align': 'center' });
    
    //end of validation


}]);

var adressStatusStatic=[ { id: 8, name: "محل سکونت اقوام یا دوستان (در مکان یا شهر دیگری ساکن هستم)" }, { id: 5, name: "محل سکونت خودم (در عرض دو ماه آتی مکان من تغییر می کند)" }, { id: 4, name: "محل سکونت خودم و استیجاری (بیش از یکسال مستاجر)" }, { id: 3, name: "محل سکونت خودم و استیجاری (کمتر از یکسال مستاجر)" }, { id: 2, name: "محل سکونت خودم و غیر استیجاری (بیش از دو سال)" }, { id: 1, name: "محل سکونت خودم و غیر استیجاری (بیش از یکسال)" }, { id: 9, name: "محل سکونت موقت (بزودی تغییر مکان می دهم)" }, { id: 10, name: "محل سکونت موقت (در ایران زندگی نمی‌کنم)" }];
var passStatic=[{id:"1",name:"خیابان"},{id:"2",name:"کوچه"},{id:"3",name:"بن‌بست"},{id:"4",name:"بلوار"},{id:"5",name:"بزرگراه"},{id:"6",name:"آزادراه"},{id:"7",name:"میدان"},{id:"8",name:"پل"},{id:"9",name:"زیرگذر"},{id:"10",name:"کنارگذر"},{id:"11",name:"جاده"},{id:"12",name:"مسیر اختصاصی"},{id:"13",name:"کیلومتر"}],districtStatic=[{id:"1",name:"بخش"},{id:"2",name:"محله"},{id:"3",name:"دهستان"}],floorStatic=[{id:2,name:"1"},{id:76,name:"-1"},{id:11,name:"10"},{id:67,name:"-10"},{id:12,name:"11"},{id:66,name:"-11"},{id:13,name:"12"},{id:65,name:"-12"},{id:14,name:"13"},{id:64,name:"-13"},{id:15,name:"14"},{id:63,name:"-14"},{id:16,name:"15"},{id:62,name:"-15"},{id:17,name:"16"},{id:18,name:"17"},{id:19,name:"18"},{id:20,name:"19"},{id:3,name:"2"},{id:75,name:"-2"},{id:21,name:"20"},{id:22,name:"21"},{id:23,name:"22"},{id:24,name:"23"},{id:25,name:"24"},{id:26,name:"25"},{id:27,name:"26"},{id:28,name:"27"},{id:29,name:"28"},{id:30,name:"29"},{id:4,name:"3"},{id:74,name:"-3"},{id:31,name:"30"},{id:32,name:"31"},{id:33,name:"32"},{id:34,name:"33"},{id:35,name:"34"},{id:36,name:"35"},{id:37,name:"36"},{id:38,name:"37"},{id:39,name:"38"},{id:40,name:"39"},{id:5,name:"4"},{id:73,name:"-4"},{id:41,name:"40"},{id:42,name:"41"},{id:43,name:"42"},{id:44,name:"43"},{id:45,name:"44"},{id:46,name:"45"},{id:47,name:"46"},{id:48,name:"47"},{id:49,name:"48"},{id:50,name:"49"},{id:6,name:"5"},{id:72,name:"-5"},{id:51,name:"50"},{id:52,name:"51"},{id:53,name:"52"},{id:54,name:"53"},{id:55,name:"54"},{id:56,name:"55"},{id:57,name:"56"},{id:58,name:"57"},{id:59,name:"58"},{id:60,name:"59"},{id:7,name:"6"},{id:71,name:"-6"},{id:61,name:"60"},{id:8,name:"7"},{id:70,name:"-7"},{id:9,name:"8"},{id:69,name:"-8"},{id:10,name:"9"},{id:68,name:"-9"},{id:83,name:"اول"},{id:78,name:"پارکینگ"},{id:87,name:"پنجم"},{id:86,name:"چهارم"},{id:92,name:"دهم"},{id:84,name:"دوم"},{id:80,name:"زیرزمین"},{id:79,name:"زیر همکف"},{id:85,name:"سوم"},{id:88,name:"ششم"},{id:81,name:"نیم‌طبقه اول"},{id:82,name:"نیم‌طبقه دوم"},{id:91,name:"نهم"},{id:90,name:"هشتم"},{id:89,name:"هفتم"},{id:77,name:"همکف"}],PersonTypeStatic=[{id:"natural_person",name:"شخص حقیقی"},{id:"legal_person",name:"شخص حقوقی"}],stateStatic=[{city_set:[{id:54741,name:"ابرغان"},{id:54671,name:"آبش احمد"},{id:55771,name:"اتش بیگ"},{id:53431,name:"اچاچی"},{id:5371,name:"آذر شهر"},{id:54561,name:"اذغان (ازغان )"},{id:53541,name:"اربط"},{id:54791,name:"اردها"},{id:55831,name:"ارسگنای سفلی"},{id:53491,name:"ارموداق"},{id:55651,name:"اروق"},{id:54731,name:"اسبفروشان"},{id:54661,name:"اسکلو (اسگلو)"},{id:5351,name:"اسکو"},{id:5586,name:"اغچه ریش"},{id:55891,name:"اغ زیارت"},{id:54781,name:"اغمیون"},{id:54551,name:"افیل"},{id:54591,name:"اق براز"},{id:53391,name:"آقکند"},{id:55661,name:"اق منار"},{id:54961,name:"الانق"},{id:53581,name:"ایلخچی"},{id:55541,name:"القو"},{id:54391,name:"یامچی"},{id:53831,name:"امند"},{id:5451,name:"اهر"},{id:55731,name:"اوشندل"},{id:53661,name:"باسمنج"},{id:55641,name:"بایقوت"},{id:53951,name:"بخشایش"},{id:5491,name:"بستان آباد"},{id:53981,name:"بیلوردی"},{id:5551,name:"بناب"},{id:54351,name:"بناب جدید"},{id:53451,name:"پورسخلو"},{id:51,name:"تبریز"},{id:53331,name:"ترک"},{id:53351,name:"ترکمانچای"},{id:53881,name:"تسوج"},{id:54981,name:"تیکمه داش"},{id:54686,name:"تیل"},{id:53731,name:"تیمورلو"},{id:5441,name:"جلفا"},{id:54531,name:"چول قشلاقی"},{id:53361,name:"خاتون اباد-آذربایجان شرقی"},{id:54481,name:"خاروانا"},{id:53571,name:"خاص اباد (خاصبان )"},{id:53841,name:"خامنه"},{id:55471,name:"خانیان"},{id:55581,name:"خانه برق قدیم (شورخانه ب"},{id:55351,name:"خداجو"},{id:53740,name:"خراجو"},{id:53551,name:"خسرو شهر"},{id:55441,name:"خضرلو"},{id:53641,name:"خلجان"},{id:54641,name:"خمارلو"},{id:53991,name:"خواجه"},{id:55561,name:"خوشه مهر (خواجه امیر)"},{id:54441,name:"داران-آذربایجان شرقی"},{id:55361,name:"داش اتان"},{id:55371,name:"داش بلاغ بازار"},{id:55481,name:"دانالو"},{id:54750,name:"دوزدوزان"},{id:54371,name:"دولت اباد-آذربایجان شرقی"},{id:55871,name:"ذاکرکندی"},{id:55751,name:"ذوالبین"},{id:54771,name:"رازلیق"},{id:55491,name:"رحمانلو"},{id:55551,name:"روشت بزرگ"},{id:55531,name:"زاوشت"},{id:53971,name:"زرنق"},{id:54361,name:"زنوز"},{id:55571,name:"زوارق"},{id:5471,name:"سراب"},{id:53591,name:"سرای (سرای ده )"},{id:5361,name:"سردرود"},{id:53961,name:"سرند"},{id:53851,name:"سیس"},{id:54951,name:"سعیداباد-آذربایجان شرقی"},{id:55841,name:"سلطان اباد (س انمکزار"},{id:55781,name:"سلوک"},{id:54451,name:"سیه رود"},{id:54571,name:"سیه کلان"},{id:53671,name:"شادبادمشایخ (پینه شلوا"},{id:5381,name:"شبستر"},{id:54431,name:"شجاع"},{id:53371,name:"شیخدراباد"},{id:55431,name:"شیراز-آذربایجان شرقی"},{id:53771,name:"شیرامین"},{id:54751,name:"شربیان"},{id:53891,name:"شرفخانه"},{id:53871,name:"شند آباد"},{id:5331,name:"شهرجدیدسهند"},{id:54682,name:"شهرک صنعتی کاغذکنان"},{id:53861,name:"صوفیان"},{id:55381,name:"صومعه"},{id:55681,name:"طوراغای (طوراغایی )"},{id:54651,name:"عاشقلو"},{id:5541,name:"عجب شیر"},{id:55741,name:"علی ابادعلیا"},{id:55391,name:"علویان"},{id:53741,name:"قدمگاه (بادام یار)"},{id:5581,name:"قره آغاج"},{id:54941,name:"قره بابا"},{id:53381,name:"قره بلاغ-آذربایجان شرقی"},{id:54931,name:"قره چای حاج علی"},{id:54991,name:"قره چمن"},{id:55851,name:"قلعه حسین اباد"},{id:55881,name:"قوچ احمد"},{id:53481,name:"قویوجاق"},{id:54381,name:"یکان کهریز"},{id:53631,name:"کجوار"},{id:54971,name:"کردکندی"},{id:54471,name:"کشکسرای"},{id:5461,name:"کلیبر"},{id:53950,name:"کلوانق"},{id:53681,name:"کندرود"},{id:54685,name:"کندوان"},{id:53461,name:"کنگاور-آذربایجان شرقی"},{id:53531,name:"کهنمو"},{id:53840,name:"کوزه کنان"},{id:55341,name:"گل تپه-آذربایجان شرقی"},{id:54331,name:"گلین قیه"},{id:53761,name:"گوگان"},{id:53441,name:"گوندوغدی"},{id:54691,name:"لاریجان"},{id:53561,name:"لاهیجان-آذربایجان شرقی"},{id:55631,name:"لکلر"},{id:55671,name:"لیلان"},{id:53691,name:"مایان سفلی"},{id:531,name:"میانه"},{id:551,name:"مراغه-آذربایجان شرقی"},{id:541,name:"مرند"},{id:5561,name:"ملکان"},{id:53751,name:"ممقان"},{id:53941,name:"مینق"},{id:54761,name:"مهربان"},{id:55461,name:"مهماندار"},{id:54631,name:"مولان"},{id:55791,name:"نصیرابادسفلی"},{id:55761,name:"نظر کهریزی"},{id:53651,name:"ینگی اسپران (سفیدان جد"},{id:55451,name:"ینگجه"},{id:54461,name:"نوجه مهر"},{id:5431,name:"هادیشهر"},{id:54341,name:"هرزندجدید (چای هرزند)"},{id:5391,name:"هریس"},{id:5571,name:"هشترود"},{id:53791,name:"هفت چشمه-آذربایجان شرقی"},{id:54491,name:"هوراند"},{id:53811,name:"وایقان"},{id:55330,name:"ورجوی"},{id:54581,name:"ورزقان"},{id:54541,name:"ورگهان"},{id:54681,name:"یوزبند"}],id:3,name:"آذربايجان شرقي"},{city_set:[{id:58881,name:"ابگرم-آذربایجان غربی"},{id:57361,name:"ایبلو"},{id:59961,name:"احمدابادسفلی"},{id:57971,name:"احمدغریب"},{id:59551,name:"اختتر"},{id:571,name:"ارومیه"},{id:58471,name:"استران"},{id:59641,name:"اسلام اباد-آذربایجان غربی"},{id:5771,name:"اشنویه"},{id:58961,name:"اغ برزه"},{id:59951,name:"اقابیگ"},{id:59731,name:"اقبال"},{id:59471,name:"اگریقاش"},{id:59871,name:"الی چین"},{id:57551,name:"امام کندی"},{id:58661,name:"آواجیق"},{id:5831,name:"ایواوغلی"},{id:59481,name:"اوزون دره علیا"},{id:59931,name:"اوغول بیگ"},{id:57331,name:"باراندوز"},{id:59981,name:"باروق"},{id:58671,name:"بازرگان"},{id:59431,name:"باغچه"},{id:58431,name:"بدلان"},{id:58571,name:"بسطام-آذربایجان غربی"},{id:57861,name:"بیکوس"},{id:59761,name:"بگتاش"},{id:57681,name:"بیگم قلعه"},{id:58441,name:"بلسورسفلی"},{id:58341,name:"بیله وار"},{id:57541,name:"بهله"},{id:59651,name:"بیوران سفلی"},{id:5951,name:"بوکان"},{id:5781,name:"پیرانشهر"},{id:57951,name:"پسوه"},{id:58771,name:"پلدشت"},{id:5891,name:"تازه شهر"},{id:5991,name:"تکاب"},{id:59791,name:"تک اغاج"},{id:58871,name:"تمر"},{id:57471,name:"تویی"},{id:5791,name:"جلدیان"},{id:59541,name:"جوانمرد"},{id:57851,name:"چیانه"},{id:59771,name:"چهار برج"},{id:58931,name:"چهریق علیا"},{id:58551,name:"چورس"},{id:59351,name:"حاجی حسن"},{id:59381,name:"حاجی کند"},{id:59881,name:"حیدرباغی"},{id:58791,name:"حسن کندی"},{id:57641,name:"حسنلو"},{id:59891,name:"حمزه قاسم"},{id:59341,name:"خاتون باغ"},{id:59450,name:"خلیفان"},{id:581,name:"خوی"},{id:59441,name:"خورخوره-آذربایجان غربی"},{id:58941,name:"داراب-آذربایجان غربی"},{id:57451,name:"دیزج-آذربایجان غربی"},{id:5837,name:"دیزج دیز"},{id:57341,name:"دیزج دول"},{id:57371,name:"دستجرد-آذربایجان غربی"},{id:58951,name:"دلزی"},{id:57751,name:"ده شمس بزرگ"},{id:59941,name:"دورباش"},{id:57431,name:"راژان"},{id:57691,name:"راهدانه"},{id:59691,name:"ربط"},{id:58641,name:"ریحانلوی علیا"},{id:59571,name:"رحیم خان"},{id:57961,name:"ریگ اباد"},{id:58651,name:"زاویه سفلی"},{id:58450,name:"زرآباد"},{id:59681,name:"زمزیران"},{id:57461,name:"زیوه"},{id:59461,name:"سیاقول علیا"},{id:57781,name:"سیاوان"},{id:5961,name:"سردشت-آذربایجان غربی"},{id:58891,name:"سرنق"},{id:57571,name:"سرو"},{id:5881,name:"سلماس"},{id:57411,name:"سیلوانه"},{id:573,name:"سیلوه"},{id:59561,name:"سیمینه"},{id:58971,name:"سنجی"},{id:58331,name:"سیه باز"},{id:58716,name:"سیه چشمه"},{id:59361,name:"سوگلی تپه"},{id:5981,name:"شاهیندژ"},{id:57731,name:"شاهوانه"},{id:57671,name:"شیخ احمد"},{id:58531,name:"شیرین بلاغ"},{id:59631,name:"شلماش"},{id:57841,name:"شین اباد"},{id:58751,name:"شوط"},{id:57391,name:"طلاتپه"},{id:5841,name:"فیرورق"},{id:58731,name:"قرنقو"},{id:57531,name:"قره باغ"},{id:58631,name:"قره تپه"},{id:58516,name:"قره ضیاءالدین"},{id:58861,name:"قره قشلاق"},{id:58481,name:"قطور"},{id:58681,name:"قم قشلاق"},{id:58381,name:"قوروق"},{id:58561,name:"قورول علیا"},{id:59851,name:"قوزلوی افشار"},{id:5751,name:"قوشچی"},{id:57581,name:"کانسپی"},{id:59451,name:"کاولان علیا"},{id:59730,name:"کشاورز"},{id:59531,name:"یکشوه"},{id:57831,name:"کله کین"},{id:57651,name:"کهریزعجم"},{id:57941,name:"گردکشانه"},{id:57761,name:"گلاز"},{id:59581,name:"گل تپه قورمیش"},{id:59371,name:"گلیجه"},{id:5931,name:"گوگ تپه-آذربایجان غربی"},{id:59781,name:"گوگ تپه خالصه"},{id:59751,name:"للکلو"},{id:57771,name:"لولکان"},{id:5861,name:"ماکو"},{id:5971,name:"میاندوآب"},{id:57351,name:"میاوق"},{id:57661,name:"محمدیار"},{id:59861,name:"محمودآباد-آذربایجان غربی"},{id:59671,name:"میرآباد"},{id:58541,name:"مراکان"},{id:58761,name:"مرگنلر"},{id:59741,name:"ملاشهاب الدین"},{id:57591,name:"ممکان"},{id:591,name:"مهاباد-آذربایجان غربی"},{id:57481,name:"موانا"},{id:58781,name:"نازک علیا"},{id:57561,name:"نازلو"},{id:57741,name:"نالوس"},{id:5761,name:"نقده"},{id:57381,name:"نوشین"},{id:59831,name:"هاچاسو"},{id:57441,name:"هاشم اباد"},{id:58391,name:"هندوان"},{id:57871,name:"هنگ اباد"},{id:59841,name:"هولاسو"},{id:58831,name:"وردان"},{id:58691,name:"یولاگلدی"},{id:58361,name:"ولدیان"}],id:16,name:"آذربايجان غربي"},{city_set:[{id:56331,name:"آبی بیگلو"},{id:56491,name:"اراللوی بزرگ"},{id:561,name:"اردبیل"},{id:56381,name:"اردیموسی"},{id:56441,name:"اسلام اباد-اردبیل"},{id:56981,name:"اصلاندوز"},{id:56961,name:"اق قباق علیا"},{id:56741,name:"انجیرلو"},{id:56561,name:"انی علیا"},{id:56991,name:"بران علیا"},{id:56881,name:"برندق"},{id:56471,name:"بقراباد"},{id:5671,name:"بیله سوار"},{id:56481,name:"بودالالو"},{id:5691,name:"پارس آباد"},{id:56631,name:"پریخان"},{id:56581,name:"تازه کندانگوت"},{id:56931,name:"تازه کندجدید"},{id:56371,name:"ثمرین"},{id:56751,name:"جعفر آباد"},{id:56541,name:"حمزه خانلو"},{id:5681,name:"خلخال"},{id:56861,name:"خلفلو"},{id:56771,name:"خورخورسفلی"},{id:56531,name:"دیزج-اردبیل"},{id:56661,name:"رضی"},{id:56551,name:"زهرا"},{id:56391,name:"سرعین"},{id:56971,name:"شهرک غفاری"},{id:56781,name:"شورگل"},{id:56351,name:"عنبران"},{id:56651,name:"فخرآباد"},{id:56841,name:"فیروزاباد"},{id:56571,name:"قاسم کندی"},{id:56591,name:"قره اغاج پایین"},{id:56761,name:"قشلاق اغداش کلام"},{id:56641,name:"قصابه"},{id:56671,name:"قوشه سفلی"},{id:56891,name:"کلور"},{id:56431,name:"کورائیم"},{id:56361,name:"گرده"},{id:5651,name:"گرمی "},{id:56691,name:"گنجوبه"},{id:56851,name:"گیوی"},{id:56941,name:"گوشلو"},{id:56731,name:"گوگ تپه-اردبیل"},{id:56653,name:"لاهرود"},{id:56831,name:"لنبر"},{id:56681,name:"مرادلو"},{id:5661,name:"مشگین شهر"},{id:56451,name:"مهماندوست علیا"},{id:5641,name:"نیر-اردبیل"},{id:56791,name:"نظرعلی بلاغی"},{id:5631,name:"نمین"},{id:56341,name:"ننه کران"},{id:56461,name:"هیر"},{id:56871,name:"هشتجین"}],id:15,name:"اردبيل"},{city_set:[{id:87651,name:"ابیانه"},{id:81789,name:"ابریشم"},{id:87371,name:"اب شیرین"},{id:87481,name:"ابوزیدآباد"},{id:87591,name:"اذان"},{id:8741,name:"آران و بیدگل"},{id:8381,name:"اردستان"},{id:87641,name:"اریسمان"},{id:83781,name:"اژیه"},{id:87571,name:"اسحق اباد-اصفهان"},{id:8651,name:"اسفرجان"},{id:85751,name:"اسکندری"},{id:85961,name:"اسلام ابادموگویی"},{id:84971,name:"اشیان"},{id:83941,name:"اشکستان"},{id:85451,name:"اشن"},{id:81,name:"اصفهان"},{id:81799,name:"اصفهان-(سپاهان شهر)"},{id:86841,name:"اغداش"},{id:85711,name:"افوس"},{id:84651,name:"ایمانشهر"},{id:86531,name:"امین اباد"},{id:83971,name:"انارک"},{id:85791,name:"اورگان-اصفهان"},{id:87681,name:"اوره"},{id:87661,name:"بادرود"},{id:83671,name:"بیاضه"},{id:84761,name:"باغ بهادران"},{id:84851,name:"باغ ملک-اصفهان"},{id:83991,name:"بافران"},{id:87561,name:"برزک"},{id:85991,name:"برف انبار"},{id:83691,name:"بلان"},{id:85671,name:"بلطاق"},{id:84591,name:"بهاران شهر"},{id:81431,name:"بهارستان"},{id:85651,name:"بوئین و میاندشت"},{id:83341,name:"پادگان اموزشی امام ص"},{id:83351,name:"پالایشگاه اصفهان"},{id:84541,name:"پیربکران"},{id:86361,name:"پرزان"},{id:84871,name:"پلی اکریل"},{id:86341,name:"پوده"},{id:84991,name:"تاسیسات سدنکواباد"},{id:87971,name:"تیدجان"},{id:8531,name:"تیران"},{id:84331,name:"تیرانچی"},{id:87881,name:"تیکن"},{id:84481,name:"تلک اباد"},{id:81351,name:"تودشک"},{id:84461,name:"تورزن"},{id:83631,name:"جندق"},{id:84691,name:"جوجیل"},{id:85851,name:"جوزدان"},{id:8731,name:"جوشقان استرک"},{id:87551,name:"جوشقان و کامو"},{id:8571,name:"چادگان"},{id:85781,name:"چاه غلامرضارحیمی"},{id:84751,name:"چرمهین"},{id:86851,name:"چشمه رحمان"},{id:84781,name:"چمگردان"},{id:84951,name:"چم نور"},{id:86791,name:"چهارراه"},{id:83681,name:"چوپانان"},{id:85391,name:"حاجی اباد"},{id:83461,name:"حبیب آباد"},{id:83791,name:"حسن اباد-اصفهان"},{id:85531,name:"حسین اباد-اصفهان"},{id:8671,name:"حنا"},{id:87671,name:"خالدآ باد"},{id:85441,name:"خیراباد-اصفهان"},{id:83581,name:"خسرواباد-اصفهان"},{id:87981,name:"خشکرود-اصفهان"},{id:87951,name:"خم پیچ"},{id:841,name:"خمینی شهر"},{id:8791,name:"خوانسار"},{id:84531,name:"خوانسارک"},{id:81561,name:"خوراسگان"},{id:8361,name:"خور-اصفهان"},{id:83451,name:"خورزوق"},{id:85471,name:"خونداب"},{id:8561,name:"داران-اصفهان"},{id:85641,name:"دامنه"},{id:8431,name:"درچه پیاز"},{id:84441,name:"درقه"},{id:84831,name:"دیزیچه"},{id:81671,name:"دستجا"},{id:83431,name:"دستگرد-اصفهان"},{id:8641,name:"دهاقان"},{id:87351,name:"ده زیره"},{id:84861,name:"دهسرخ"},{id:8541,name:"دهق"},{id:86831,name:"ده نسا سفلی"},{id:8341,name:"دولت آباد-اصفهان"},{id:83561,name:"رباطاقاکمال"},{id:87361,name:"رحق"},{id:87941,name:"رحمت اباد"},{id:85761,name:"رزوه"},{id:85331,name:"رضوانشهر-اصفهان"},{id:81681,name:"زیار"},{id:84671,name:"زازران"},{id:84931,name:"زاینده رود"},{id:84841,name:"زیباشهر"},{id:87861,name:"زرنجان"},{id:8471,name:"زرین شهر"},{id:85661,name:"زرنه-اصفهان"},{id:8441,name:"زواره"},{id:85731,name:"سازمان عمران زاینده رود"},{id:84741,name:"سده لنجان"},{id:86881,name:"سعادت اباد"},{id:87741,name:"سعیداباد-اصفهان"},{id:87431,name:"سفیدشهر"},{id:81391,name:"سگزی"},{id:8661,name:"سمیرم"},{id:87331,name:"سن سن"},{id:87931,name:"سنگ سفید"},{id:84631,name:"سهروفیروزان"},{id:86551,name:"سولار"},{id:831,name:"شاهین شهر"},{id:84681,name:"شرودان"},{id:84451,name:"شهراب-اصفهان"},{id:861,name:"شهرضا"},{id:86391,name:"شهرک صنایع شیمیایی ر"},{id:84981,name:"طالخونچه"},{id:87631,name:"طرق رود"},{id:83841,name:"ظفرقند"},{id:85371,name:"عزیزاباد-اصفهان"},{id:85351,name:"عسگران"},{id:8551,name:"علویجه"},{id:85631,name:"غرغن"},{id:86891,name:"فتح اباد-اصفهان"},{id:83641,name:"فرخی"},{id:8591,name:"فریدونشهر"},{id:83891,name:"فسخود"},{id:8451,name:"فلاورجان"},{id:83931,name:"فوداز"},{id:8491,name:"فولادشهر"},{id:84881,name:"فولادمبارکه"},{id:87771,name:"قرغن"},{id:85691,name:"قره بلطاق"},{id:86471,name:"قصرچم"},{id:84371,name:"قلعه امیریه"},{id:85941,name:"قلعه سرخ"},{id:86331,name:"قمشلو"},{id:8751,name:"قمصر-اصفهان"},{id:83761,name:"قهجاورستان"},{id:8461,name:"قهدریجان"},{id:87541,name:"قهرود"},{id:871,name:"کاشان"},{id:87491,name:"کاغذی"},{id:83951,name:"کجان"},{id:83831,name:"کچومثقال"},{id:84961,name:"کچوییه"},{id:85681,name:"کرچ"},{id:84791,name:"کرچگان"},{id:84581,name:"کرسگان"},{id:84891,name:"کرکوند"},{id:84471,name:"کریم اباد-اصفهان"},{id:84561,name:"کلیشادوسودرجان"},{id:83361,name:"کلهرود"},{id:87831,name:"کلوچان"},{id:83591,name:"کمشچه"},{id:86771,name:"کمه"},{id:85861,name:"کهریزسنگ"},{id:86461,name:"کهرویه"},{id:86751,name:"کهنگان"},{id:87781,name:"کوچری"},{id:84341,name:"کوشک-اصفهان"},{id:8371,name:"کوهپایه"},{id:83371,name:"گرگاب"},{id:86631,name:"گرموک"},{id:83441,name:"گز برخوار"},{id:8771,name:"گلپایگان"},{id:85831,name:"گلدشت-اصفهان"},{id:86451,name:"گلشن-اصفهان"},{id:87841,name:"گلشهر"},{id:81594,name:"گورت"},{id:8781,name:"گوگد"},{id:83551,name:"لای بید"},{id:8481,name:"مبارکه-اصفهان"},{id:83731,name:"محمدآباد-اصفهان"},{id:85381,name:"میراباد-اصفهان"},{id:87751,name:"مرغ"},{id:87441,name:"مزرعه صدر"},{id:83651,name:"مزیک"},{id:87391,name:"مشکات"},{id:85741,name:"مشهدکاوه"},{id:85971,name:"مصیر"},{id:86541,name:"مقصودبیک"},{id:87731,name:"ملازجان"},{id:8351,name:"میمه-اصفهان"},{id:8161,name:"منطقه صنعتی محموداباد"},{id:86561,name:"منظریه"},{id:86371,name:"منوچهراباد"},{id:84431,name:"مهاباد-اصفهان"},{id:86351,name:"مهیار"},{id:87961,name:"مهراباد"},{id:83661,name:"مهرجان"},{id:8681,name:"مهرگرد"},{id:83531,name:"موته"},{id:8331,name:"مورچه خورت"},{id:86781,name:"مورک"},{id:84491,name:"موغار"},{id:87181,name:"نیاسر"},{id:8391,name:"نائین"},{id:851,name:"نجف آباد"},{id:83861,name:"نیسیان"},{id:83961,name:"نیستانک"},{id:87381,name:"نشلج"},{id:81751,name:"نصرآباد-اصفهان"},{id:8761,name:"نطنز"},{id:83771,name:"نیک آباد"},{id:85771,name:"نهرخلج"},{id:85931,name:"نهضت اباد"},{id:83851,name:"نهوج"},{id:87461,name:"نوش آباد"},{id:84771,name:"نوگوران"},{id:83741,name:"هرند"},{id:86651,name:"هست"},{id:83881,name:"همسار"},{id:86431,name:"همگین"},{id:87581,name:"وادقان"},{id:87871,name:"وانشان"},{id:85341,name:"ورپشت"},{id:83751,name:"ورزنه"},{id:86861,name:"ورق"},{id:84731,name:"ورنامخواست"},{id:83541,name:"وزوان"},{id:87991,name:"ویست"},{id:83871,name:"ومکان"},{id:86671,name:"ونک"}],id:6,name:"اصفهان"},{city_set:[{id:31541,name:"ادران"},{id:31551,name:"آسارا"},{id:31871,name:"اشتهارد"},{id:33351,name:"تنکمان"},{id:33661,name:"چهارباغ"},{id:33618,name:"شهرجدیدهشتگرد"},{id:33691,name:"طالقان"},{id:31656,name:"فردیس"},{id:31,name:"کرج"},{id:31836,name:"کرج-(مهرشهر)"},{id:31991,name:"کمالشهر"},{id:33651,name:"کوهسار"},{id:31638,name:"گرمدره-البرز"},{id:33611,name:"گلسار"},{id:31849,name:"ماهدشت"},{id:31778,name:"محمدشهر-البرز"},{id:31776,name:"مشکین دشت"},{id:3331,name:"نظرآباد"},{id:3361,name:"هشتگرد"}],id:31,name:"البرز"},{city_set:[{id:69781,name:"اب انار"},{id:6971,name:"آبدانان"},{id:69971,name:"ارکواز"},{id:69641,name:"ارمو"},{id:69561,name:"آسمان آباد"},{id:6931,name:"ایلام"},{id:6941,name:"ایوان"},{id:69371,name:"بانویزه"},{id:69671,name:"بدره"},{id:69341,name:"بیشه دراز"},{id:69541,name:"بلاوه تره سفلی"},{id:69991,name:"پاریاب"},{id:69871,name:"پهله"},{id:69531,name:"توحید"},{id:69661,name:"چشمه شیرین"},{id:69351,name:"چشمه کبود"},{id:69381,name:"چمن سیدمحمد"},{id:69831,name:"چم هندی"},{id:69331,name:"چنارباشی"},{id:69361,name:"چوار"},{id:6961,name:"دره شهر"},{id:69891,name:"دشت عباس"},{id:69970,name:"دلگشا"},{id:6981,name:"دهلران"},{id:69981,name:"دول کبودخوشادول"},{id:69471,name:"زرنه-ایلام"},{id:69741,name:"ژیور"},{id:69771,name:"سیاه گل"},{id:69751,name:"سراب باغ"},{id:69571,name:"سراب کارزان"},{id:6951,name:"سرآبله"},{id:69511,name:"شباب"},{id:69931,name:"شهرک اسلامیه"},{id:69581,name:"شهرک سرتنگ"},{id:69681,name:"شهرک ولیعصر"},{id:69441,name:"شورابه ملک"},{id:69951,name:"صالح آباد-ایلام"},{id:69591,name:"علی اباد-ایلام"},{id:69881,name:"عین خوش"},{id:69451,name:"کلان"},{id:69731,name:"گنداب"},{id:69851,name:"گولاب"},{id:69551,name:"لومار"},{id:69631,name:"ماژین"},{id:69861,name:"میمه-ایلام"},{id:69972,name:"مهر-ایلام"},{id:6991,name:"مهران"},{id:69761,name:"مورموری"},{id:69841,name:"موسیان"},{id:69391,name:"هفت چشمه-ایلام"}],id:27,name:"ايلام"},{city_set:[{id:75491,name:"اباد"},{id:75651,name:"آبپخش"},{id:75551,name:"آبدان"},{id:75591,name:"ابگرمک"},{id:75371,name:"امام حسن"},{id:75560,name:"انارستان-بوشهر"},{id:7551,name:"اهرم"},{id:75431,name:"بادوله"},{id:7561,name:"برازجان"},{id:75531,name:"بردخون"},{id:75540,name:"بردستان"},{id:75541,name:"بندردیر"},{id:75361,name:"بندر دیلم"},{id:75331,name:"بندر ریگ"},{id:75571,name:"بندرکنگان"},{id:7531,name:"بندرگناوه"},{id:75570,name:"بنک"},{id:75481,name:"بنه گز"},{id:751,name:"بوشهر"},{id:75681,name:"تنگ ارم"},{id:75581,name:"جم"},{id:75381,name:"چغادک"},{id:75341,name:"چهارروستایی"},{id:75461,name:"خارک"},{id:7541,name:"خورموج"},{id:75631,name:"دالکی"},{id:75471,name:"دلوار"},{id:75561,name:"ریز"},{id:75390,name:"سیراف"},{id:75661,name:"سعدآباد"},{id:75641,name:"شبانکاره"},{id:75441,name:"شنبه"},{id:75351,name:"شول"},{id:75391,name:"عسلویه"},{id:75451,name:"کاکی"},{id:75691,name:"کلمه-بوشهر"},{id:75111,name:"نخل تقی"},{id:75671,name:"وحدتیه"}],id:21,name:"بوشهر"},{city_set:[{id:33781,name:"ابباریک"},{id:18351,name:"ابراهیم اباد-تهران"},{id:39761,name:"آبسرد"},{id:39741,name:"آبعلی"},{id:33771,name:"ایجدان"},{id:37656,name:"احمدآبادجانسپار"},{id:33131,name:"احمدابادمستوفی"},{id:39851,name:"ارجمند"},{id:18641,name:"اسلام اباد-تهران"},{id:331,name:"اسلام شهر"},{id:37661,name:"اسماعیل آباد"},{id:39861,name:"امیریه-تهران"},{id:31686,name:"اندیشه"},{id:33761,name:"باغخواص"},{id:33541,name:"باغستان"},{id:18131,name:"باقر شهر"},{id:16551,name:"بومهن"},{id:33971,name:"پارچین"},{id:3391,name:"پاکدشت"},{id:16581,name:"پردیس"},{id:37611,name:"پرند"},{id:3381,name:"پیشوا"},{id:19338,name:"تجریش"},{id:1,name:"تهران"},{id:39720,name:"جابان"},{id:16531,name:"جاجرود(خسروآباد)"},{id:18141,name:"جعفرابادباقراف"},{id:33861,name:"جلیل اباد"},{id:33831,name:"جواد آباد"},{id:18361,name:"چرمشهر"},{id:33191,name:"چهاردانگه"},{id:18331,name:"حسن آباد-تهران"},{id:33981,name:"حصارامیر"},{id:39841,name:"حصاربن"},{id:37652,name:"حصارک بالا"},{id:37650,name:"حصارک پایین"},{id:33991,name:"خاتون اباد-تهران"},{id:18631,name:"خاورشهر"},{id:33841,name:"خاوه"},{id:18986,name:"خلازیر"},{id:33931,name:"داوداباد"},{id:39831,name:"درده"},{id:3971,name:"دماوند"},{id:33751,name:"دهماسین"},{id:1813,name:"ری"},{id:3761,name:"رباطکریم"},{id:39731,name:"رودهن"},{id:37653,name:"سبزدشت"},{id:39771,name:"سربندان"},{id:33361,name:"سعیدآباد"},{id:37631,name:"سلطان اباد-تهران"},{id:33186,name:"شاطره"},{id:33561,name:"شاهدشهر"},{id:33941,name:"شریف آباد"},{id:18341,name:"شمس اباد"},{id:3351,name:"شهریار"},{id:37614,name:"شهر صنعتی پرند"},{id:16571,name:"شهرصنعتی خرمدشت"},{id:31133,name:"شهرک صنعتی نصیرشهر"},{id:33930,name:"شهرک عباس آباد"},{id:31136,name:"شهرک قلعه میر"},{id:33171,name:"صالح آباد-تهران"},{id:33560,name:"صباشهر"},{id:31641,name:"صفادشت"},{id:18171,name:"طورقوزاباد"},{id:33741,name:"عسگرابادعباسی"},{id:33571,name:"فردوسیه"},{id:18381,name:"فرودگاه امام خمینی"},{id:33141,name:"فیروزبهرام"},{id:3981,name:"فیروزکوه"},{id:18471,name:"فرون اباد"},{id:33451,name:"فشم"},{id:18181,name:"قاسم ابادشوراباد"},{id:18661,name:"قیامدشت"},{id:3751,name:"قدس"},{id:18686,name:"قرچک"},{id:33881,name:"قلعه خواجه-تهران"},{id:33711,name:"قلعه سین"},{id:18371,name:"قلعه محمدعلی خان"},{id:18441,name:"قلعه نوخالصه"},{id:18191,name:"قمصر-تهران"},{id:18791,name:"قو,چ حصار"},{id:33871,name:"کریم اباد-تهران"},{id:39751,name:"کیلان"},{id:37581,name:"کلمه-تهران"},{id:18161,name:"کهریزک"},{id:31694,name:"گرمدره-تهران"},{id:18451,name:"گل تپه کبیر"},{id:33151,name:"گلدسته"},{id:37571,name:"گلستان"},{id:18651,name:"لپه زنگ"},{id:33591,name:"لم اباد"},{id:3341,name:"لواسان"},{id:33461,name:"لواسان بزرگ"},{id:18461,name:"محمودابادپیرزاده"},{id:39791,name:"مرا"},{id:18151,name:"مرقدامام ره"},{id:39781,name:"مشا"},{id:31691,name:"ملارد"},{id:1011,name:"منطقه ۱۱ پستی تهران"},{id:1013,name:"منطقه ۱۳ پستی تهران"},{id:1014,name:"منطقه ۱۴ پستی تهران"},{id:1015,name:"منطقه ۱۵ پستی تهران"},{id:1016,name:"منطقه ۱۶ پستی تهران"},{id:1017,name:"منطقه ۱۷ پستی تهران "},{id:1018,name:"منطقه ۱۸ پستی تهران "},{id:1019,name:"منطقه ۱۹ پستی تهران "},{id:39780,name:"مهرآباد"},{id:37651,name:"نسیم شهر"},{id:37551,name:"نصیرآباد"},{id:31130,name:"نصیرشهر"},{id:39811,name:"هرانده"},{id:33581,name:"وحیدیه"},{id:3371,name:"ورامین"},{id:18391,name:"وهن اباد"}],id:1,name:"تهران"},{city_set:[{id:8881,name:"اردل"},{id:88941,name:"آلونی"},{id:88791,name:"امام قیس"},{id:88771,name:"اورگان-چهارمحال و بختیاری"},{id:88631,name:"باباحیدر"},{id:8871,name:"بروجن"},{id:88761,name:"بلداجی"},{id:88581,name:"بن"},{id:88591,name:"پردنجان"},{id:88671,name:"جونقان"},{id:88651,name:"چلگرد"},{id:88961,name:"چمن بید"},{id:88861,name:"چوله دان"},{id:88351,name:"خراجی"},{id:8834,name:"دزک"},{id:88361,name:"دستناء"},{id:88881,name:"دشتک"},{id:8851,name:"سامان-چهارمحال و بختیاری"},{id:88971,name:"سردشت-چهارمحال و بختیاری"},{id:88751,name:"سفید دشت"},{id:88461,name:"سودجان"},{id:88431,name:"سورشجان"},{id:88371,name:"شلمزار"},{id:88661,name:"شهریاری"},{id:881,name:"شهر کرد"},{id:88331,name:"طاقانک"},{id:8861,name:"فارسان"},{id:88741,name:"فرادنبه"},{id:8831,name:"فرخ شهر"},{id:88139,name:"کیان"},{id:88841,name:"گل سفید"},{id:88781,name:"گندمان"},{id:88381,name:"گهرو"},{id:8891,name:"لردگان"},{id:88951,name:"مال خلیفه"},{id:88451,name:"مرغملک"},{id:88991,name:"منج"},{id:88831,name:"ناغان"},{id:88561,name:"نافچ"},{id:88731,name:"نقنه"},{id:8844,name:"هارونی"},{id:8841,name:"هفشجان"},{id:88571,name:"وردنجان"}],id:24,name:"چهارمحال و بختياري"},{city_set:[{id:97831,name:"ارسک"},{id:97631,name:"آرین شهر"},{id:97441,name:"اسدیه"},{id:97591,name:"اسفدن-خراسان جنوبی"},{id:97690,name:"اسفدن-خراسان جنوبی"},{id:97791,name:"آیسک"},{id:97731,name:"اسلامیه"},{id:971,name:"بیرجند"},{id:9781,name:"بشرویه"},{id:97641,name:"بیهود"},{id:97671,name:"حاجی آباد-خراسان جنوبی"},{id:97661,name:"خضری دشت بیاض"},{id:97351,name:"خوسف"},{id:97931,name:"دیهوک"},{id:97691,name:"زهان"},{id:97771,name:"سرایان"},{id:9741,name:"سربیشه-خراسان جنوبی"},{id:97891,name:"سه قلعه"},{id:97561,name:"شوسف"},{id:9791,name:"طبس"},{id:97440,name:"طبس مسینا"},{id:97981,name:"عشق آباد-خراسان جنوبی"},{id:9771,name:"فردوس"},{id:9761,name:"قاین"},{id:97471,name:"قهستان"},{id:97461,name:"گزیک"},{id:97991,name:"گزو"},{id:97350,name:"محمدشهر-خراسان جنوبی"},{id:97311,name:"مود"},{id:97443,name:"نیمبلوک"},{id:9751,name:"نهبندان"}],id:30,name:"خراسان جنوبي"},{city_set:[{id:95781,name:"ابدال اباد"},{id:95761,name:"احمدآبادصولت"},{id:93671,name:"ارداک"},{id:95891,name:"ازاده"},{id:96441,name:"ازادوار"},{id:93471,name:"اسحق اباد-خراسان رضوی"},{id:95581,name:"اسداباد-خراسان رضوی"},{id:95851,name:"یاقوتین جدید"},{id:94851,name:"امامقلی"},{id:96881,name:"انابد"},{id:96461,name:"انداده"},{id:96731,name:"اوندر"},{id:94861,name:"باجگیران"},{id:95971,name:"باخرز"},{id:93391,name:"بار"},{id:95481,name:"باسفر"},{id:95391,name:"بایک"},{id:96981,name:"بجستان"},{id:96941,name:"بیدخت"},{id:9681,name:"بردسکن"},{id:93371,name:"برزنون"},{id:96491,name:"برغمد"},{id:93871,name:"بزنگان"},{id:93681,name:"بقمج"},{id:96531,name:"بلاشی اباد"},{id:95881,name:"بنی تاک"},{id:96791,name:"بندقرا"},{id:93851,name:"پس کمر"},{id:9591,name:"تایباد"},{id:9571,name:"تربت جام"},{id:951,name:"تربت حیدریه"},{id:93791,name:"تقی اباد-خراسان رضوی"},{id:96581,name:"تندک"},{id:96991,name:"جزین"},{id:9641,name:"جغتای"},{id:95861,name:"جنت اباد-خراسان رضوی"},{id:95471,name:"جنگل"},{id:94841,name:"جوزان-خراسان رضوی"},{id:94961,name:"چاپشلو"},{id:93751,name:"چاهک"},{id:95431,name:"چخماق"},{id:95731,name:"چشمه گل"},{id:93361,name:"چکنه "},{id:95671,name:"چمن اباد"},{id:9361,name:"چناران"},{id:95681,name:"حسن اباد-خراسان رضوی"},{id:94931,name:"حسن ابادلایین نو"},{id:96481,name:"حکم اباد"},{id:93451,name:"خرو"},{id:96771,name:"خلیل آباد"},{id:9561,name:"خواف"},{id:93481,name:"خوجان"},{id:9631,name:"داورزن"},{id:95831,name:"درزاب"},{id:9491,name:"درگز"},{id:9341,name:"درود"},{id:96891,name:"درونه"},{id:94761,name:"دیزادیز"},{id:96431,name:"دستوران"},{id:94751,name:"یدک"},{id:96751,name:"دهنو-خراسان رضوی"},{id:94791,name:"دوغایی"},{id:95941,name:"دوقارون"},{id:95491,name:"دولت آباد-خراسان رضوی"},{id:93631,name:"رادکان"},{id:96451,name:"راه چمن"},{id:96551,name:"رباطجز"},{id:96341,name:"رباطسرپوشی"},{id:95571,name:"رباط سنگ"},{id:9541,name:"رشتخوار"},{id:91671,name:"رضویه"},{id:96861,name:"رکن اباد"},{id:96371,name:"روداب"},{id:95561,name:"رودخانه"},{id:96741,name:"ریوش"},{id:96691,name:"رویینی"},{id:96971,name:"زیبد"},{id:95461,name:"زرغری"},{id:93981,name:"زرکک"},{id:961,name:"سبزوار"},{id:93641,name:"سیداباد-خراسان رضوی"},{id:9381,name:"سرخس"},{id:93951,name:"سفید سنگ"},{id:95691,name:"سلامی"},{id:96561,name:"سلطان آباد-خراسان رضوی"},{id:93661,name:"سلوگرد"},{id:95641,name:"سنگان-خراسان رضوی"},{id:93941,name:"سنگ بست"},{id:95341,name:"سیوکی"},{id:95371,name:"شادمهر"},{id:96571,name:"شامکان"},{id:93561,name:"شاندیز"},{id:93841,name:"شیرتپه"},{id:9651,name:"ششتمد"},{id:94781,name:"شفیع"},{id:96851,name:"شفیع اباد"},{id:96871,name:"شهرآباد"},{id:93761,name:"شهرزو"},{id:94981,name:"شهرک زیندانلو"},{id:94731,name:"شهرکهنه"},{id:93331,name:"شوراب"},{id:9581,name:"صالح آباد-خراسان رضوی"},{id:9351,name:"طرقبه"},{id:93571,name:"طوس سفلی"},{id:95361,name:"عبدل اباد"},{id:93491,name:"عشق آباد-خراسان رضوی"},{id:96761,name:"فدافن"},{id:93381,name:"فدیشه"},{id:93441,name:"فرخک"},{id:9391,name:"فریمان"},{id:93971,name:"فرهادگرد"},{id:9331,name:"فیروزه"},{id:9531,name:"فیض آباد"},{id:95661,name:"قاسم آباد"},{id:93461,name:"قدمگاه-خراسان رضوی"},{id:93581,name:"قرقی سفلی (شهیدکاوه )"},{id:94741,name:"قریه شرف"},{id:95441,name:"قلعه اقاحسن"},{id:95981,name:"قلعه نو-خراسان رضوی"},{id:93961,name:"قلندر آباد"},{id:9471,name:"قوچان"},{id:96961,name:"کاخک"},{id:95931,name:"کاریز"},{id:95791,name:"کاریزنو"},{id:96831,name:"کاسف"},{id:9671,name:"کاشمر"},{id:95541,name:"کامه سفلی"},{id:96841,name:"کبودان"},{id:94951,name:"کپکان"},{id:93931,name:"کته شمشیرسفلی"},{id:93831,name:"کچولی"},{id:9551,name:"کدکن"},{id:95951,name:"کرات"},{id:9371,name:"کلات"},{id:95531,name:"یک لنگی علیا"},{id:96781,name:"کندر"},{id:93891,name:"کندک لی"},{id:93591,name:"کنه بیست"},{id:93551,name:"کورده"},{id:95991,name:"کوه سفید"},{id:96951,name:"گیسوربالا"},{id:93651,name:"گلبهار"},{id:93341,name:"گلبوی پایین"},{id:93691,name:"گلمکان"},{id:9691,name:"گناباد"},{id:93881,name:"گنبدلی"},{id:93771,name:"گوش"},{id:94941,name:"لطف آباد"},{id:93741,name:"میامی-خراسان رضوی"},{id:93351,name:"مبارکه-خراسان رضوی"},{id:94991,name:"محمدتقی"},{id:95841,name:"محموداباد-خراسان رضوی"},{id:93431,name:"میراباد-خراسان رضوی"},{id:93861,name:"مزدآوند"},{id:96391,name:"مزینان"},{id:95651,name:"مژن اباد"},{id:96351,name:"مشکان-خراسان رضوی"},{id:91,name:"مشهد"},{id:95961,name:"مشهدریزه"},{id:93541,name:"ملک آباد"},{id:96331,name:"مهر-خراسان رضوی"},{id:95351,name:"مهنه"},{id:95871,name:"موسی اباد-خراسان رضوی"},{id:96361,name:"نامن"},{id:93781,name:"نریمانی سفلی"},{id:931,name:"نیشابور"},{id:95631,name:"نشتیفان"},{id:95591,name:"نصر"},{id:95771,name:"نصرآباد-خراسان رضوی"},{id:96471,name:"نقاب"},{id:95751,name:"نیل شهر"},{id:94971,name:"نوخندان"},{id:96541,name:"نوده انقلاب"},{id:93161,name:"همت آباد"},{id:96931,name:"یونسی"}],id:7,name:"خراسان رضوي"},{city_set:[{id:9661,name:"اسفراین"},{id:9451,name:"آشخانه"},{id:94331,name:"ایور"},{id:941,name:"بجنورد"},{id:94551,name:"پیش قلعه"},{id:94831,name:"تیتکانلو"},{id:9441,name:"جاجرم"},{id:94581,name:"حصار گرمخان"},{id:94891,name:"خرق"},{id:94311,name:"درق"},{id:94651,name:"دوین"},{id:94561,name:"راز"},{id:94691,name:"رباط-خراسان شمالی"},{id:96671,name:"رزق اباد"},{id:94681,name:"زیارت"},{id:94481,name:"سنخواست"},{id:9461,name:"شیروان"},{id:94471,name:"شوقان"},{id:96651,name:"صفی آباد-خراسان شمالی"},{id:9481,name:"فاروج"},{id:94451,name:"قاضی"},{id:9431,name:"گرمه"},{id:94631,name:"لوجلی"}],id:29,name:"خراسان شمالي"},{city_set:[{id:631,name:"آبادان"},{id:64980,name:"آبژدان"},{id:64441,name:"ابوحمیظه"},{id:6391,name:"ایذه"},{id:6331,name:"اروندکنار"},{id:64830,name:"آزادی"},{id:63581,name:"اسیاب"},{id:6371,name:"آغاجاری"
},{id:61431,name:"الهائی"},{id:64761,name:"الوان"},{id:63451,name:"ام الطمیر (سیدیوسف )"},{id:64651,name:"امام"},{id:63731,name:"امیدیه"},{id:6481,name:"اندیمشک"},{id:61,name:"اهواز"},{id:63951,name:"باغ ملک-خوزستان"},{id:64850,name:"بیدروبه"},{id:64431,name:"بروایه یوسف"},{id:64481,name:"بستان"},{id:63561,name:"بندرامام خمینی"},{id:6351,name:"بندرماهشهر"},{id:6361,name:"بهبهان"},{id:64361,name:"بوزی سیف"},{id:63981,name:"پشت پیان"},{id:64560,name:"ترکالکی"},{id:63640,name:"تشان"},{id:64871,name:"تله زنگ پایین"},{id:63341,name:"تنگ یک"},{id:63881,name:"جایزان"},{id:64541,name:"جنت مکان"},{id:64640,name:"چغامیش"},{id:64681,name:"چلون"},{id:63541,name:"چمران-خوزستان"},{id:63531,name:"چم کلگه"},{id:64881,name:"چم گلک"},{id:63971,name:"چنارستان"},{id:63351,name:"چوئبده"},{id:64730,name:"حر"},{id:64851,name:"حسینیه"},{id:64381,name:"حفاری شرقی"},{id:63441,name:"حمیدیه"},{id:64641,name:"حمزه"},{id:641,name:"خرمشهر"},{id:64751,name:"خسرجی راضی حمد"},{id:64330,name:"خنافره"},{id:64841,name:"خواجوی"},{id:64341,name:"دارخوین"},{id:64951,name:"دره بوری"},{id:63891,name:"دره تونم نمی"},{id:64351,name:"درویشی"},{id:6461,name:"دزفول"},{id:63991,name:"دهدز"},{id:63871,name:"رامشیر"},{id:6381,name:"رامهرمز"},{id:64471,name:"رفیع"},{id:63831,name:"رودزرد"},{id:64931,name:"روستای عنبر"},{id:64461,name:"یزدنو"},{id:63771,name:"زهره"},{id:64691,name:"سالند"},{id:64652,name:"سیاه منصور"},{id:64491,name:"سیدعباس"},{id:64510,name:"سرداران"},{id:63681,name:"سردشت-خوزستان"},{id:64561,name:"سماله"},{id:6441,name:"سوسنگرد"},{id:6431,name:"شادگان"},{id:63651,name:"شاه غالب ده ابراهیم"},{id:64731,name:"شاوور"},{id:61481,name:"شیبان"},{id:64511,name:"شرافت"},{id:64650,name:"شمس آباد"},{id:64831,name:"شهرک انصار"},{id:64781,name:"شهرک بهرام"},{id:64571,name:"شهرک نورمحمدی"},{id:6471,name:"شوش"},{id:6451,name:"شوشتر"},{id:63571,name:"صالح شهر"},{id:63941,name:"صیدون"},{id:64631,name:"صفی آباد -خوزستان"},{id:64331,name:"عبودی"},{id:64591,name:"عرب حسن"},{id:64771,name:"علمه تیمورابوذرغفاری"},{id:63431,name:"عین دو"},{id:63491,name:"غیزانیه بزرگ"},{id:63331,name:"فیاضی"},{id:64791,name:"فتح المبین"},{id:63961,name:"قلعه تل"},{id:63471,name:"قلعه چنعان"},{id:64981,name:"قلعه خواجه-خوزستان"},{id:63481,name:"کریت برومی"},{id:63661,name:"کردستان بزرگ"},{id:64861,name:"کلگه دره دو"},{id:64440,name:"کوت سیدنعیم"},{id:63461,name:"کوت عبدالله"},{id:64971,name:"کوشکک-خوزستان"},{id:64581,name:"گاومیش اباد"},{id:64551,name:"گتوند"},{id:63641,name:"گروه پدافندهوایی بهبها"},{id:64991,name:"گلگیر"},{id:64531,name:"گوریه"},{id:64941,name:"لالی"},{id:64661,name:"میانرود"},{id:63751,name:"میانکوه"},{id:63931,name:"میداود"},{id:64741,name:"مزرعه یک"},{id:6491,name:"مسجدسلیمان"},{id:63861,name:"مشراگه"},{id:6341,name:"ملاثانی"},{id:63671,name:"منصوریه"},{id:64371,name:"مینوشهر"},{id:63851,name:"نفت سفید"},{id:63381,name:"نهرابطر"},{id:63361,name:"نهرسلیم"},{id:64961,name:"هفتگل"},{id:63591,name:"هندیجان"},{id:64451,name:"هویزه"},{id:61491,name:"ویس"}],id:4,name:"خوزستان"},{city_set:[{id:4591,name:"آب بر"},{id:4561,name:"ابهر"},{id:45381,name:"ارمغانخانه"},{id:45351,name:"اژدهاتو"},{id:45371,name:"اسفجین"},{id:45781,name:"اقبلاغ سفلی"},{id:45441,name:"اندابادعلیا"},{id:45861,name:"باش قشلاق"},{id:45341,name:"بوغداکندی"},{id:45431,name:"پری"},{id:45961,name:"چورزق"},{id:45971,name:"حلب"},{id:4571,name:"خرمدره"},{id:45981,name:"درام"},{id:45641,name:"درسجین"},{id:45941,name:"دستجرده"},{id:45471,name:"دندی"},{id:45651,name:"دولت اباد-زنجان"},{id:4531,name:"زرین آباد"},{id:45881,name:"زرین رود"},{id:451,name:"زنجان"},{id:45841,name:"سجاس"},{id:45951,name:"سعیداباد-زنجان"},{id:4551,name:"سلطانیه"},{id:45551,name:"سنبل اباد"},{id:45791,name:"سهرورد"},{id:45481,name:"سونتو"},{id:45741,name:"صائین قلعه"},{id:45391,name:"قبله بلاغی"},{id:4581,name:"قیدار"},{id:45451,name:"قره گل"},{id:45491,name:"قلتوق"},{id:45831,name:"کرسف"},{id:45661,name:"کینه ورس"},{id:45891,name:"کهلا"},{id:45871,name:"گرماب"},{id:45931,name:"گیلوان"},{id:45531,name:"گوزلدره"},{id:4541,name:"ماهنشان"},{id:45851,name:"محموداباد-زنجان"},{id:45461,name:"نیک پی"},{id:45731,name:"هیدج"},{id:45331,name:"همایون"}],id:12,name:"زنجان"},{city_set:[{id:3541,name:"ابخوری"},{id:36341,name:"ابراهیم اباد-سمنان"},{id:36431,name:"ابرسیج"},{id:35661,name:"ابگرم-سمنان"},{id:36661,name:"احمداباد"},{id:35861,name:"آرادان"},{id:36851,name:"استانه"},{id:35341,name:"ایستگاه میان دره"},{id:35541,name:"اسداباد-سمنان"},{id:35671,name:"افتر"},{id:3681,name:"امیریه-سمنان"},{id:35381,name:"اهوان"},{id:3591,name:"ایوانکی"},{id:35581,name:"بیابانک"},{id:3661,name:"بیارجمند"},{id:36561,name:"بدشت"},{id:36741,name:"برم"},{id:3641,name:"بسطام-سمنان"},{id:36351,name:"بکران"},{id:35881,name:"بن کوه"},{id:35431,name:"جام"},{id:36731,name:"جزن"},{id:36331,name:"جودانه"},{id:35761,name:"چاشم"},{id:36461,name:"چهلدخترپادگان"},{id:35931,name:"حسین ابادکوروس"},{id:35331,name:"خیراباد-سمنان"},{id:3671,name:"دامغان"},{id:35851,name:"داوراباد"},{id:36861,name:"دیباج"},{id:35641,name:"دربند"},{id:35631,name:"درجزین"},{id:36841,name:"دروار"},{id:36641,name:"دستجرد-سمنان"},{id:35741,name:"ده صوفیان"},{id:36541,name:"دهملا"},{id:35441,name:"دوزهیر"},{id:36551,name:"رویان-سمنان"},{id:36671,name:"زمان اباد"},{id:35561,name:"سیداباد-سمنان"},{id:3551,name:"سرخه"},{id:36571,name:"سطوه"},{id:36681,name:"سلمرود"},{id:351,name:"سمنان"},{id:36381,name:"سوداغلان"},{id:361,name:"شاهرود"},{id:3571,name:"شهمیرزاد"},{id:36871,name:"طرزه"},{id:36581,name:"طرود"},{id:35571,name:"عبدالله ابادپایین"},{id:3531,name:"علا"},{id:36781,name:"علیان"},{id:36791,name:"عمروان"},{id:36771,name:"فرات"},{id:36391,name:"فرومد"},{id:35731,name:"فولادمحله"},{id:36931,name:"قدرت اباد"},{id:36451,name:"قلعه نوخرقان"},{id:36831,name:"قوشه"},{id:36361,name:"کرداباد"},{id:35831,name:"کردوان"},{id:35941,name:"کرک"},{id:36471,name:"کلاته خیج"},{id:36891,name:"کلاته ملا"},{id:35891,name:"کهن آباد"},{id:3581,name:"گرمسار"},{id:35651,name:"گل رودبار"},{id:35951,name:"گلستانک"},{id:36631,name:"گیور"},{id:35551,name:"لاسجرد"},{id:35961,name:"لجران"},{id:3631,name:"میامی-سمنان"},{id:3651,name:"مجن"},{id:36751,name:"محمداباد"},{id:36651,name:"مسیح اباد"},{id:35451,name:"معدن نمک"},{id:36761,name:"معصوم اباد"},{id:36591,name:"مغان"},{id:36441,name:"میغان"},{id:35841,name:"مندولک"},{id:3561,name:"مهدیشهر"},{id:36881,name:"مهماندوست"},{id:35591,name:"مومن اباد-سمنان"},{id:36371,name:"نردین"},{id:35531,name:"نظامی"},{id:36531,name:"نگارمن"},{id:35751,name:"هیکو"}],id:9,name:"سمنان"},{city_set:[{id:98631,name:"ادیمی"},{id:99381,name:"ایرافشان"},{id:991,name:"ایرانشهر"},{id:99431,name:"اسپکه"},{id:99581,name:"اسفندک"},{id:99341,name:"اسماعیل کلگ"},{id:98991,name:"افضل اباد"},{id:98441,name:"انده قدیم"},{id:98861,name:"بالاقلعه"},{id:99771,name:"باهوکلات"},{id:98891,name:"بیت اباد"},{id:98561,name:"برجمیرگل"},{id:99491,name:"بزمان"},{id:9941,name:"بمپور"},{id:99451,name:"بنت"},{id:98691,name:"بنجار"},{id:99351,name:"پارود"},{id:99441,name:"پیپ"},{id:99791,name:"پیرسهراب"},{id:99781,name:"پسابندر"},{id:99641,name:"پسکوه"},{id:99371,name:"پیشین"},{id:99751,name:"پلان"},{id:98551,name:"تخت عدالت"},{id:99741,name:"تلنگ"},{id:98641,name:"تیموراباد"},{id:99561,name:"جالق"},{id:98731,name:"جزینک"},{id:98571,name:"جهان ابادعلیا"},{id:9971,name:"چابهار"},{id:99331,name:"چانف"},{id:99941,name:"چاهان"},{id:98341,name:"حرمک"},{id:9891,name:"خاش"},{id:98541,name:"خمک"},{id:9875,name:"خواجه احمد"},{id:99891,name:"دستگرد-سیستان و بلوچستان"},{id:98941,name:"ده پابید"},{id:98651,name:"دولت اباد-سیستان و بلوچستان"},{id:99361,name:"راسک"},{id:9861,name:"زابل"},{id:981,name:"زاهدان"},{id:99861,name:"زراباد"},{id:98881,name:"زیرکدان"},{id:9871,name:"زهک"},{id:98781,name:"ژاله ای"},{id:98531,name:"سیادک"},{id:99991,name:"ساربوک"},{id:9951,name:"سراوان-سیستان و بلوچستان"},{id:9931,name:"سرباز"},{id:99391,name:"سرداب"},{id:99551,name:"سردک"},{id:99571,name:"سیرکان"},{id:98671,name:"سکوهه"},{id:98971,name:"سنگان-سیستان و بلوچستان"},{id:9961,name:"سوران"},{id:99971,name:"شگیم بالا"},{id:99851,name:"شهدادکهیر"},{id:98761,name:"شهرک محمدشاه کرم"},{id:99731,name:"طیس"},{id:98640,name:"علی اکبر"},{id:99461,name:"فنوج"},{id:99961,name:"قصرقند"},{id:98741,name:"قلعه نو-سیستان و بلوچستان"},{id:98841,name:"کارواندر"},{id:99881,name:"کتیج"},{id:98791,name:"کرباسک"},{id:99981,name:"کشیک"},{id:9981,name:"کنارک"},{id:99531,name:"کوشکوک"},{id:98961,name:"کوشه"},{id:99591,name:"کوهک"},{id:99631,name:"گشت-سیستان و بلوچستان"},{id:99471,name:"گلمورتی"},{id:98381,name:"گلوگاه-سیستان و بلوچستان"},{id:98871,name:"گمن"},{id:98931,name:"گوهرکوه"},{id:98461,name:"لادیزعلیا"},{id:98661,name:"لوتک"},{id:99541,name:"محمدی"},{id:98681,name:"محمد آباد"},{id:99411,name:"محمدان"},{id:99931,name:"محنت"},{id:9841,name:"میرجاوه"},{id:99871,name:"مسکوتان"},{id:99661,name:"مهرستان"},{id:98951,name:"نازیل"},{id:98851,name:"ناصراباد-سیستان و بلوچستان"},{id:9831,name:"نصرت آباد-سیستان و بلوچستان"},{id:9991,name:"نیکشهر"},{id:99761,name:"نگور"},{id:98831,name:"نوراباد"},{id:98816,name:"نوک اباد"},{id:99951,name:"هیچان"},{id:99671,name:"هیدوچ"},{id:98516,name:"هیرمند"},{id:99481,name:"هودیان"}],id:26,name:"سيستان و بلوچستان"},{city_set:[{id:7391,name:"آباده"},{id:74931,name:"آباده طشک"},{id:74481,name:"ایج"},{id:7361,name:"اردکان-فارس"},{id:73761,name:"ارسنجان"},{id:73991,name:"ایزدخواست"},{id:73851,name:"اسپاس"},{id:7451,name:"استهبان"},{id:74410,name:"اسیر"},{id:74391,name:"اشکنان"},{id:74751,name:"افزر"},{id:7381,name:"اقلید"},{id:71651,name:"اکبراباد"},{id:73831,name:"امامزاده اسماعیل"},{id:74714,name:"امام شهر"},{id:73351,name:"انارستان-فارس"},{id:74390,name:"اهل"},{id:73541,name:"اهنگری"},{id:74331,name:"اوز-فارس"},{id:73531,name:"بابامنیر"},{id:74171,name:"باب انار"},{id:74711,name:"بایگان"},{id:73391,name:"بالاده"},{id:73681,name:"بانش"},{id:74381,name:"بیرم"},{id:73631,name:" بیضا"},{id:74361,name:"بنارویه"},{id:71431,name:"بندامیر"},{id:74161,name:"بندبست"},{id:74471,name:"بنوان"},{id:74591,name:"به جان"},{id:73611,name:"بهرغان"},{id:73911,name:"بهمن"},{id:73941,name:"بوانات"},{id:71781,name:"پاسگاه چنارراهدار"},{id:73551,name:"پرین"},{id:71591,name:"تفیهان"},{id:73381,name:"جره"},{id:74891,name:"جنت شهر"},{id:741,name:"جهرم"},{id:74791,name:"جوکان"},{id:74351,name:"جویم"},{id:74881,name:"چمن مروارید"},{id:74861,name:"حاجی آباد-فارس"},{id:73940,name:"حسامی"},{id:73561,name:"حسین ابادرستم"},{id:73841,name:"حسن آباد-فارس"},{id:73311,name:"حکیم باشی نصف میان (بالا)"},{id:73731,name:"خانیمن"},{id:71741,name:"خانه زنیان"},{id:74541,name:"خاوران"},{id:71451,name:"خیرابادتوللی"},{id:73441,name:"خرامه"},{id:73341,name:"خشت"},{id:74431,name:"خنج"},{id:73811,name:"خنجشت"},{id:74370,name:"خور-فارس"},{id:74414,name:"خوزی"},{id:73511,name:"خومه زار"},{id:7481,name:"داراب-فارس"},{id:71461,name:"داریان"},{id:74814,name:"دبیران"},{id:74491,name:"درب قلعه"},{id:73881,name:"دژکرد"},{id:74561,name:"دنیان"},{id:74781,name:"دهرم"},{id:71691,name:"ده شیب"},{id:74880,name:"دوبرجی"},{id:74110,name:"دوزه"},{id:73661,name:"راشک علیا"},{id:73471,name:"رامجرد"},{id:74841,name:"رستاق"},{id:74461,name:"رونیز "},{id:74671,name:"زاهدشهر"},{id:7341,name:"زرقان"},{id:73771,name:"سیدان"},{id:73861,name:"سده"},{id:73451,name:"سروستان"},{id:74571,name:"سروو"},{id:73741,name:"سعادت شهر"},{id:71581,name:"سلطان آباد-فارس"},{id:73981,name:"سورمق"},{id:71,name:"شیراز-فارس"},{id:74651,name:"ششده"},{id:74850,name:"شهرپیر"},{id:71991,name:"شهرجدیدصدرا"},{id:73891,name:"شهرمیان"},{id:71551,name:"شوریجه"},{id:74691,name:"صحرارود"},{id:73931,name:"صغاد"},{id:73951,name:"صفاشهر"},{id:71641,name:"طسوج"},{id:74441,name:"علامرودشت"},{id:74380,name:"عمادده"},{id:71681,name:"فتح اباد-فارس"},{id:74871,name:"فدامی"},{id:74771,name:"فراشبند"},{id:7471,name:"فیروز آباد-فارس"},{id:7461,name:"فسا"},{id:74311,name:"فیشور"},{id:73751,name:"قادرآباد"},{id:74661,name:"قاسم ابادسفلی"},{id:7331,name:"قائمیه"},{id:74760,name:"قیر"},{id:74650,name:"قره بلاغ-فارس"},{id:74941,name:"قطاربنه"},{id:74551,name:"قطب آباد"},{id:74981,name:"قطرویه"},{id:74761,name:"کارزین"},{id:731,name:"کازرون"},{id:73431,name:"کامفیروز"},{id:73942,name:"کره ای"},{id:73131,name:"کلاتون"},{id:73141,name:"کلانی"},{id:73151,name:"کمارج مرکزی"},{id:71491,name:"کم جان"},{id:73651,name:"کمهر"},{id:73331,name:"کنار تخته"},{id:74411,name:"کهنه"},{id:73461,name:"کوار"},{id:73560,name:"کوپن"},{id:71671,name:"کوشک بیدک"},{id:73711,name:"کوشک-فارس"},{id:74611,name:"کوشک قاضی"},{id:73791,name:"کوشکک-فارس"},{id:71571,name:"کوهنجان"},{id:7441,name:"گراش"},{id:74450,name:"گله دار"},{id:73491,name:"گویم"},{id:74911,name:"لای حنا"},{id:7431,name:"لار"},{id:74341,name:"لامرد"},{id:73411,name:"لپوئی"},{id:74371,name:"لطیفی"},{id:73840,name:"مادرسلیمان"},{id:74811,name:"مادوان-فارس"},{id:74581,name:"مانیان"},{id:74681,name:"میانده-فارس"},{id:74831,name:"ماه سالاری"},{id:74731,name:"مبارک آباد"},{id:7371,name:"مرودشت"},{id:73810,name:"مزایجان"},{id:73591,name:"میشان سفلی"},{id:74971,name:"مشکان-فارس"},{id:73571,name:"مصیری"},{id:71661,name:"مظفری"},{id:74741,name:"میمند-فارس"},{id:71561,name:"مهارلو"},{id:73161,name:"مهبودی علیا"},{id:74451,name:"مهر-فارس"},{id:73371,name:"مهرنجان"},{id:71881,name:"موردراز"},{id:7491,name:"نی ریز"},{id:74641,name:"نوبندگان"},{id:74780,name:"نوجین"},{id:73361,name:"نودان"},{id:7351,name:"نور آباد"},{id:73671,name:"هرایجان"},{id:74991,name:"هرگان"},{id:73641,name:"هماشهر-فارس"},{id:73171,name:"وراوی"}],id:5,name:"فارس"},{city_set:[{id:3441,name:"آبیک"},{id:34641,name:"آبگرم"},{id:34671,name:"ارداق"},{id:34651,name:"استبلخ"},{id:34561,name:"اسفرورین"},{id:34791,name:"اقابابا"},{id:34171,name:"اقبالیه"},{id:34331,name:"الولک"},{id:3431,name:"الوند"},{id:3461,name:"آوج"},{id:34151,name:"بیدستان"},{id:3451,name:"بوئین زهرا"},{id:3481,name:"تاکستان"},{id:34941,name:"یحیی اباد-قزوین"},{id:34871,name:"حسین اباد-قزوین"},{id:34691,name:"حصارولیعصر"},{id:34481,name:"خاکعلی"},{id:34551,name:"خرم اباد"},{id:34831,name:"خرمدشت"},{id:34581,name:"دانسفهان"},{id:34961,name:"رازمیان"},{id:34891,name:"رحیم اباد"},{id:34461,name:"رشتقون"},{id:34391,name:"زوارک"},{id:34761,name:"سیاهپوش"},{id:34741,name:"سیردان"},{id:34531,name:"سگز آباد"},{id:34571,name:"شال"},{id:34161,name:"شریفیه"},{id:34491,name:"شهرک صنعتی لیا (قدیم )"},{id:34431,name:"صمغ اباد"},{id:34851,name:"ضیاءآباد"},{id:34541,name:"عصمت اباد"},{id:34351,name:"فلار"},{id:341,name:"قزوین"},{id:34471,name:"قشلاق"},{id:34341,name:"کاکوهستان"},{id:34631,name:"کلنجین"},{id:34971,name:"کوهین-قزوین"},{id:34731,name:"ماهین"},{id:3491,name:"محمدیه"},{id:34131,name:"محمودآبادنمونه"},{id:34931,name:"معلم کلایه"},{id:34381,name:"مینودشت"},{id:34913,name:"مهرگان"},{id:34681,name:"نیارج"},{id:34781,name:"نیارک"},{id:34441,name:"ناصراباد-قزوین"},{id:34811,name:"نرجه"},{id:34313,name:"نصرت آباد-قزوین"},{id:34951,name:"نیکویه"}],id:8,name:"قزوين"},{city_set:[{id:37331,name:"امیرابادگنجی"},{id:37441,name:"جعفریه"},{id:37451,name:"جنداب"},{id:3741,name:"دستجرد-قم"},{id:37461,name:"سلفچگان"},{id:37431,name:"قاهان"},{id:37361,name:"قلعه چم"},{id:371,name:"قم"},{id:37341,name:"قمرود"},{id:3731,name:"قنوات"},{id:37351,name:"کهک-قم"}],id:10,name:"قم"},{city_set:[{id:66951,name:"آرمرده"},{id:66531,name:"یاسوکند"},{id:66551,name:"اق بلاغ طغامین"},{id:66791,name:"اورامان تخت"},{id:66561,name:"بابارشانی"},{id:6691,name:"بانه"},{id:6651,name:"بیجار"},{id:66741,name:"برده رشه"},{id:66771,name:"بیساران"},{id:66661,name:"بلبان آباد"},{id:66961,name:"بوالحسن"},{id:66941,name:"بوئین سفلی"},{id:66761,name:"پیرخضران"},{id:66851,name:"تیلکو"},{id:66541,name:"توپ اغاج"},{id:66591,name:"جعفراباد-کردستان"},{id:66751,name:"چناره"},{id:66381,name:"خامسان"},{id:66491,name:"خرکه"},{id:66571,name:"خسرواباد-کردستان"},{id:66871,name:"خورخوره-کردستان"},{id:66641,name:"دزج"},{id:66631,name:"دلبران"},{id:66671,name:"دهگلان"},{id:6641,name:"دیواندره"},{id:66461,name:"زرینه"},{id:66831,name:"سرا"},{id:66691,name:"سریش آباد"},{id:66781,name:"سروآباد"},{id:6681,name:"سقز"},{id:661,name:"سنندج"},{id:66331,name:"شاهینی"},{id:66431,name:"شریف اباد"},{id:66371,name:"شیروانه"},{id:66991,name:"شوی"},{id:66171,name:"شویشه"},{id:66861,name:"صاحب"},{id:66341,name:"طای"},{id:6661,name:"قروه"},{id:66681,name:"قوریچای"},{id:6631,name:"کامیاران"},{id:66711,name:"کانی دینار"},{id:66971,name:"کانی سور"},{id:66651,name:"کانی گنجی"},{id:66881,name:"کسنزان"},{id:66981,name:"کوخان"},{id:66441,name:"کوله"},{id:66351,name:"گازرخانی"},{id:66481,name:"گاوشله"},{id:66841,name:"گل تپه-کردستان"},{id:66471,name:"گورباباعلی"},{id:66891,name:"میرده"},{id:6671,name:"مریوان"},{id:66391,name:"موچش"},{id:66731,name:"نی"},{id:66361,name:"نشورسفلی"},{id:66931,name:"ننور"},{id:66451,name:"هزارکانیان"}],id:18,name:"كردستان"},{city_set:[{id:76841,name:"ابارق"},{id:76381,name:"اختیارآباد"},{id:78591,name:"ارزوئیه"},{id:78541,name:"امیراباد"},{id:77431,name:"امین شهر"},{id:7741,name:"انار"},{id:76451,name:"اندوهجرد"},{id:76371,name:"باغین"},{id:7851,name:"بافت"},{id:76771,name:"برج معاز"},{id:7841,name:"بردسیر"},{id:7671,name:"بروات"},{id:78551,name:"بزنجان"},{id:78331,name:"بلورد"},{id:78791,name:"بلوک"},{id:7661,name:"بم"},{id:77461,name:"بهرمان"},{id:7831,name:"پاریز"},{id:78571,name:"پتکان"},{id:76941,name:"تهرود"},{id:78631,name:"جبالبارز"},{id:77671,name:"جرجافک"},{id:7861,name:"جیرفت"},{id:77471,name:"جوادیه الهیه نوق"},{id:76361,name:"جوپار"},{id:77861,name:"جور"},{id:77581,name:"جوزم"},{id:76431,name:"جوشان"},{id:7791,name:"چترود"},{id:78481,name:"چناربرین"},{id:77651,name:"حتکن"},{id:77971,name:"حرجند"},{id:78781,name:"حسین ابادجدید"},{id:77511,name:"خاتون آباد"},{id:76831,name:"خانه خاتون"},{id:77761,name:"خانوک"},{id:77561,name:"خبر"},{id:78971,name:"خیراباد-کرمان"},{id:77341,name:"خنامان"},{id:77551,name:"خورسند"},{id:77331,name:"داوران"},{id:78661,name:"درب بهشت"},{id:76641,name:"دریجان"},{id:77631,name:"دشت خاک"},{id:76331,name:"ده بالا"},{id:77591,name:"دهج"},{id:78771,name:"دوساری"},{id:78561,name:"رابر"},{id:7681,name:"راین"},{id:7651,name:"راور"},{id:77661,name:"ریحان"},{id:78691,name:"رضی ابادبالا"},{id:771,name:"رفسنجان"},{id:78831,name:"رودبار-کرمان"},{id:78371,name:"زیدآباد"},{id:77691,name:"یزدان شهر"},{id:7761,name:"زرند"},{id:76391,name:"زنگی آباد"},{id:781,name:"سیرجان"},{id:7731,name:"سرچشمه"},{id:78941,name:"سرخ قلعه"},{id:77751,name:"سیریز"},{id:77731,name:"شعبجره"},{id:76461,name:"شهداد"},{id:7751,name:"شهربابک"},{id:77391,name:"صفائیه"},{id:78361,name:"عماداباد"},{id:7871,name:"عنبرآباد"},{id:78871,name:"فاریاب"},{id:76541,name:"فیض اباد"},{id:76741,name:"فهرج-کرمان"},{id:78461,name:"قلعه عسکر"},{id:78841,name:"قلعه گنج"},{id:77951,name:"کاظم آباد"},{id:7771,name:"کیانشهر"},{id:77351,name:"کبوترخان"},{id:761,name:"کرمان"},{id:76471,name:"کشیت"},{id:77371,name:"کشکوئیه"},{id:78491,name:"کمال اباد"},{id:77571,name:"کمسرخ"},{id:7881,name:"کهنوج"},{id:7781,name:"کوهبنان"},{id:76861,name:"گروه"},{id:76871,name:"گزک"},{id:7641,name:"گلباف"},{id:78441,name:"گلزار"},{id:77381,name:"گلشن-کرمان"},{id:78451,name:"لاله زار"},{id:7631,name:"ماهان"},{id:78731,name:"میجان علیا"},{id:76891,name:"محی آباد"},{id:77541,name:"محمدابادبرفه"},{id:7691,name:"محمدآباد-کرمان"},{id:76951,name:"میرابادارجمند"},{id:78761,name:"مردهک"},{id:78341,name:"ملک اباد"},{id:7891,name:"منوجان"},{id:78471,name:"مومن اباد-کرمان"},{id:78151,name:"نجف شهر"},{id:76731,name:"نرماشیر"},{id:76791,name:"نظام شهر"},{id:78431,name:"نگار"},{id:78851,name:"نودژ"},{id:77961,name:"هجدک"},{id:77361,name:"هرمزاباد"},{id:78380,name:"هماشهر-کرمان"},{id:77931,name:"هوتک"}],id:22,name:"كرمان"},{city_set:[{id:67761,name:"ازگله"},{id:6761,name:"اسلام آبادغرب"},{id:67551,name:"اگاه علیا"},{id:67931,name:"باینگان"},{id:67940,name:"بانوره"},{id:67531,name:"باوله"},{id:67371,name:"بیستون"},{id:6791,name:"پاوه"},{id:67771,name:"تازه آباد"},{id:67831,name:"تپه رش"},{id:67751,name:"ترک ویس"},{id:67381,name:"جعفراباد-کرمانشاه"},{id:67981,name:"جوانرود"},{id:67731,name:"حسن اباد-کرمانشاه"},{id:67641,name:"حمیل"},{id:67841,name:"خسروی"},{id:67491,name:"درکه"},{id:67481,name:"دهلقین"},{id:67351,name:"دوردشت"},{id:67971,name:"دولت اباد-کرمانشاه"},{id:67131,name:"رباط-کرمانشاه"},{id:67651,name:"ریجاب"},{id:67961,name:"روانسر"},{id:67631,name:"زاوله علیا"},{id:67741,name:"سراب ذهاب"},{id:6771,name:"سرپل ذهاب"},{id:67791,name:"سرمست"},{id:67561,name:"سطر"},{id:67451,name:"سلطان اباد-کرمانشاه"},{id:6751,name:"سنقر"},{id:67361,name:"سنقراباد"},{id:67861,name:"سومار"},{id:67911,name:"شاهو"},{id:67461,name:"صحنه"},{id:67441,name:"فرامان"},{id:67431,name:"فش"},{id:67471,name:"قزوینه"},{id:6781,name:"قصرشیرین"},{id:67891,name:"قیلان"},{id:67691,name:"قلعه شیان"},{id:67581,name:"کرکسار"},{id:671,name:"کرمانشاه"},{id:67661,name:"کرندغرب"},{id:67591,name:"کندوله"},{id:6741,name:"کنگاور-کرمانشاه"},{id:67681,name:"کوزران"},{id:67571,name:"کیوه نان"},{id:67541,name:"گردکانه علیا"},{id:67871,name:"گیلانغرب"},{id:67671,name:"گهواره"},{id:67580,name:"میان راهان"},{id:67991,name:"میراباد-کرمانشاه"},{id:67391,name:"مرزبانی"},{id:67781,name:"نساردیره"},{id:67951,name:"نودشه"},{id:67941,name:"نوسود"},{id:6731,name:"هرسین"},{id:67331,name:"هفت اشیان"},{id:67341,name:"هلشی"}],id:19,name:"كرمانشاه"},{city_set:[{id:33,name:"ایتالیا"},{id:30,name:"اتریش"},{id:124,name:"اتیوپی"},{id:57,name:"آذربایجان"},{id:223,name:"اریتره"},{id:100,name:"اردن"},{id:50,name:"آرژانتین"},{id:235,name:"ایرلند"},{id:2,name:"ارمنستان"},{id:206,name:"اروگوئه"},{id:58,name:"ازبکستان"},{id:224,name:"اسانسیون"},{id:9,name:"اسپانیا"},{id:20,name:"استرالیا"},{id:265,name:"استونی"},{id:105,name:"ایسلند"},{id:59,name:"اسلواکی"},{id:266,name:"اسلونی"},{id:130,name:"آفریقای‌ جنوبی"},{id:131,name:"آفریقای ‌مرکزی"},{id:7,name:"افغانستان"},{id:103,name:"اکراین"},{id:132,name:"اکوادور"},{id:104,name:"آلبانی"},{id:319,name:"الجزایر"},{id:133,name:"السالوادور"},{id:10,name:"آلمان"},{id:23,name:"امارات متحده عربی"},{id:6,name:"امریکا"},{id:60,name:"انتیگویا"},{id:1e3,name:"آندورا"},{id:32,name:"اندونزی"},{id:222,name:"انگیلا"},{id:16,name:"انگلستان"},{id:221,name:"انگولا"},{id:264,name:"اوگاندا"},{id:1005,name:"اونیون"},{id:135,name:"باربادوس"},{id:1001,name:"باربد"},{id:137,name:"باهاما"},{id:80,name:"بحرین"},{id:21,name:"برزیل"},{id:226,name:"برمودا"},{id:139,name:"بروندی"},{id:140,name:"برونئی دارالسلام"},{id:281,name:"بیلاروس"},{id:228,name:"بلیز"},{id:34,name:"بلژیک"},{id:227,name:"بلغارستان"},{id:142,name:"بنگلادش"},{id:136,name:"بنین"},{id:229,name:"بوتان"},{id:230,name:"بوتسوانا"},{id:54,name:"بورگینافاسو"},{id:8017,name:"بوسنی و هرزه گوین"},{id:141,name:"بولیوی"},{id:208,name:"پاراگوئه"},{id:24,name:"پاکستان"},{id:149,name:"پاناما"},{id:125,name:"پرتغال"},{id:150,name:"پرو"},{id:1002,name:"پلی نزی"},{id:555,name:"تاجیکستان"},{id:52,name:"تایلند"},{id:144,name:"تانزانیا"},{id:17,name:"تایوان"},{id:619,name:"ترکمنستان"},{id:3,name:"ترکیه"},{id:233,name:"ترینیدادوتوباکو"},{id:1004,name:"تیمور شرقی"},{id:147,name:"توگون"},{id:35,name:"تونس"},{id:207,name:"تونگا"},{id:234,name:"تووالو"},{id:151,name:"جامائیکا"},{id:239,name:"جبل الطارق"},{id:155,name:"جیبوتی"},{id:1003,name:"جزایر آنتیل"},{id:210,name:"جزایر سلیمان"},{id:126,name:"چاد"},{id:240,name:"چک"},{id:13,name:"چین"},{id:36,name:"دانمارک"},{id:156,name:"دومینیک"},{id:157,name:"دومینیکن"},{id:158,name:"رواندا"},{id:99,name:"روسیه"},{id:112,name:"رومانی"},{id:159,name:"زامبیا"},{id:243,name:"زیمباوه"},{id:242,name:"زئیر"},{id:37,name:"ژاپن"},{id:246,name:"ساحل‌عاج"},{id:62,name:"ساموای غربی"},{id:1006,name:"سائوتمه"},{id:167,name:"سیرالئون"},{id:160,name:"سریلانکا"},{id:168,name:"سیشل"},{id:1008,name:"سن پرومیگو"},{id:1009,name:"سن کریستوف"},{id:251,name:"سنگاپور"},{id:163,name:"سنگال"},{id:161,name:"سن لوئیس"},{id:1007,name:"سن نپال"},{id:1010,name:"سن هلن"},{id:164,name:"سوایزیلند"},{id:106,name:"سودان"},{id:165,name:"سورینام"},{id:25,name:"سوریه"},{id:176,name:"سومالی"},{id:38,name:"سوئد"},{id:39,name:"سوئیس"},{id:254,name:"شیلی"},{id:8018,name:"صربستان"},{id:107,name:"عراق"},{id:4,name:"عربستان"},{id:29,name:"عمان"},{id:169,name:"غنا"},{id:255,name:"فیجی"},{id:109,name:"فرانسه"},{id:127,name:"فیلیپین"},{id:170,name:"فنلاند"},{id:26,name:"قبرس"},{id:63,name:"قرقیزستان"},{id:64,name:"قزاقستان"},{id:27,name:"قطر"},{id:172,name:"کاستاریکا"},{id:173,name:"کامبوج"},{id:174,name:"کامرون"},{id:256,name:"کای من"},{id:519,name:"کانادا"},{id:65,name:"کپ ورد"},{id:259,name:"کریباتی"},{id:14,name:"کره‌جنوبی"},{id:212,name:"کره‌شمالی"},{id:282,name:"کرواسی"},{id:11,name:"کلمبیا"},{id:258,name:"کنیا"},{id:8015,name:"کنگو برازاویل"},{id:8016,name:"کنگو زئیر"},{id:175,name:"کنگو کینشازا"},{id:12,name:"کوبا"},{id:5,name:"کویت"},{id:8011,name:"کومور"},{id:177,name:"گابون"},{id:178,name:"گامبیا"},{id:179,name:"گرانادا"},{id:66,name:"گرجستان"},{id:183,name:"گینه"},{id:263,name:"گینه‌استوایی"},{id:184,name:"گینه‌بیسائو"},{id:180,name:"گواتمالا"},{id:8012,name:"گوادالوپ"},{id:182,name:"گویان"},{id:53,name:"گویان‌فرانسه"},{id:185,name:"لائوس"},{id:102,name:"لیبی"},{id:267,name:"لیبریا"},{id:101,name:"لبنان"},{id:68,name:"لیتوانی"},{id:67,name:"لتونی"},{id:268,name:"لیختن اشتاین"},{id:187,name:"لسوتو"},{id:8,name:"لهستان"},{id:116,name:"لوکزامبورگ"},{id:19,name:"ماداگاسکار"},{id:8013,name:"مارتینیک"},{id:276,name:"ماکائو"},{id:190,name:"مالی"},{id:191,name:"مالاوی"},{id:117,name:"مالت"},{id:270,name:"مالدیو"},{id:15,name:"مالزی"},{id:70,name:"میانمار(برمه)"},{id:118,name:"مجارستان"},{id:271,name:"مراکش"},{id:40,name:"مصر"},{id:272,name:"مغولستان"},{id:556,name:"مقدونیه"},{id:193,name:"مکزیک"},{id:122,name:"یمن"},{id:277,name:"موریتانی"},{id:195,name:"موریس"},{id:196,name:"موزامبیک"},{id:69,name:"مولداوی"},{id:119,name:"موناکو"},{id:8014,name:"مونترات"},{id:213,name:"نارو"},{id:274,name:"نامیبیا"},{id:197,name:"نپال"},{id:198,name:"نیجر"},{id:199,name:"نیجریه"},{id:120,name:"نروژ"},{id:200,name:"نیکاراگوئه"},{id:22,name:"نیوزیلند"},{id:203,name:"هائیتی"},{id:419,name:"هلند"},{id:204,name:"هندوراس"},{id:42,name:"هندوستان"},{id:43,name:"هنگ کنگ"},{id:121,name:"واتیکان"},{id:215,name:"وان واتو"},{id:202,name:"ویتنام"},{id:44,name:"یوگسلاوی"},{id:28,name:"یونان"},{id:201,name:"ونزوئلا"}],id:0,name:"كشورهاي خارجه"},{city_set:[{id:7591,name:"یاسوج"},{id:75831,name:"باباکلان"},{id:75881,name:"باشت"},{id:75981,name:"پاتاوه"},{id:75871,name:"چاه تلخاب علیا"},{id:75941,name:"چیتاب"},{id:75761,name:"چرام"},{id:75771,name:"دیشموک"},{id:75851,name:"دیل"},{id:7571,name:"دهدشت"},{id:7581,name:"دوگنبدان"},{id:75891,name:"سربیشه-کهگیلویه و بویراحمد"},{id:75991,name:"سی سخت"},{id:75731,name:"سوق"},{id:75861,name:"شاه بهرام"},{id:75791,name:"قلعه دختر"},{id:75781,name:"قلعه رییسی"},{id:75951,name:"گراب سفلی"},{id:75751,name:"لیکک"},{id:75741,name:"لنده"},{id:75911,name:"مادوان-کهگیلویه و بویراحمد"},{id:75961,name:"مارگون"},{id:75841,name:"مظفراباد"},{id:75971,name:"میمند-کهگیلویه و بویراحمد"}],id:28,name:"كهگيلويه و بويراحمد"},{city_set:[{id:4961,name:"آزاد شهر"},{id:4931,name:"آق قلا"},{id:49391,name:"انبار آلوم"},{id:49751,name:"اینچه برون"},{id:4891,name:"بندرترکمن"},{id:4871,name:"بندر گز"},{id:49680,name:"تاتارعلیا"},{id:49371,name:"تقی اباد-گلستان"},{id:49351,name:"جلین"},{id:49471,name:"حاجیکلاته"},{id:49531,name:"خان ببین"},{id:49541,name:"دلند"},{id:4951,name:"رامیان"},{id:49361,name:"سرخنکلاته"},{id:48971,name:"سیمین شهر"},{id:49981,name:"عزیزاباد-گلستان"},{id:4941,name:"علی آباد"},{id:49431,name:"فاضل آباد"},{id:4881,name:"کردکوی"},{id:49791,name:"کرند"},{id:4991,name:"کلاله"},{id:49831,name:"گالیکش"},{id:491,name:"گرگان"},{id:48961,name:"گمیش تپه"},{id:4971,name:"گنبد کاووس"},{id:48733,name:"مراوه تپه"},{id:4981,name:"مینو دشت"},{id:49631,name:"نگین شهر"},{id:49641,name:"نوده خاندوز"},{id:48731,name:"نوکنده"}],id:14,name:"گلستان"},{city_set:[{id:4331,name:"ابکنار"},{id:43591,name:"احمد سر گوراب"},{id:43891,name:"اسالم"},{id:4391,name:"آستارا"},{id:4441,name:"آستانه اشرفیه"},{id:44681,name:"اسکولک"},{id:44791,name:"اطاقور"},{id:44951,name:"املش"},{id:44361,name:"بارکوسرا"},{id:43811,name:"بازار جمعه"},{id:43771,name:"بازارخطبه سرا"},{id:44561,name:"بره سر"},{id:44941,name:"بلترک"},{id:43471,name:"بلسبنه"},{id:431,name:"بندرانزلی"},{id:44541,name:"بیورزین"},{id:44331,name:"پایین محله پاشاکی"},{id:44491,name:"پرگاپشت مهدی خانی"},{id:43861,name:"پره سر"},{id:44781,name:"پروش پایین"},{id:43791,name:"پلاسی"},{id:43871,name:"پلنگ پاره"},{id:44992,name:"پونل"},{id:44651,name:"توتکابن"},{id:43491,name:"جیرکویه"},{id:44551,name:"جیرنده"},{id:43341,name:"جیرهنده"},{id:44881,name:"جنگ سرا"},{id:43751,name:"جوکندان بزرگ"},{id:44871,name:"چابکسر"},{id:43481,name:"چاپارخانه"},{id:44741,name:"چاف وچمخاله"},{id:43561,name:"چوبر-گیلان"},{id:43780,name:"چوبر-گیلان"},{id:43991,name:"حیران"},{id:44841,name:"حسن سرا"},{id:43781,name:"حویق"},{id:44381,name:"خرارود"},{id:43391,name:"خشکبیجار"},{id:4341,name:"خمام"},{id:43451,name:"خواچکین"},{id:44481,name:"دستک"},{id:44391,name:"دیلمان"},{id:44461,name:"دهشال"},{id:44771,name:"دیوشل"},{id:44861,name:"رانکوه"},{id:44931,name:"رحیم آباد"},{id:44641,name:"رستم آباد"},{id:41,name:"رشت"},{id:43841,name:"رضوانشهر-گیلان"},{id:4461,name:"رودبار-گیلان"},{id:44141,name:"رودبنه"},{id:4481,name:"رودسر"},{id:4431,name:"سیاهکل"},{id:43951,name:"سیبلی"},{id:43381,name:"سراوان-گیلان"},{id:44731,name:"سلوش"},{id:43361,name:"سنگر"},{id:43931,name:"شیخ محله"},{id:44451,name:"شیرکوه چهارده"},{id:44371,name:"شیرین نسا"},{id:43541,name:"شفت"},{id:44751,name:"شلمان"},{id:43741,name:"شیله وشت"},{id:44991,name:"شوییل"},{id:4361,name:"صومعه سرا"},{id:43661,name:"ضیابر"},{id:43651,name:"طاهرگوراب"},{id:44851,name:"طول لات"},{id:44631,name:"علی اباد-گیلان"},{id:4351,name:"فومن"},{id:44471,name:"کیاشهر"},{id:43331,name:"کپورچال"},{id:44971,name:"کجید"},{id:44441,name:"کیسم"},{id:4491,name:"کلاچای"},{id:44661,name:"کلشتر"},{id:44591,name:"کلیشم"},{id:43981,name:"کوته کومه"},{id:43461,name:"کوچصفهان"},{id:44691,name:"کوکنه"},{id:44761,name:"کومله"},{id:44981,name:"گرمابدشت"},{id:44341,name:"گرماور"},{id:43581,name:"گشت-گیلان"},{id:43641,name:"گوراب زرمیخ"},{id:441,name:"لاهیجان-گیلان"},{id:43351,name:"لیچارکی حسن رود"},{id:43761,name:"لیسار"},{id:44431,name:"لسکوکلایه"},{id:44351,name:"لیش"},{id:43431,name:"لشت نشاء"},{id:4471,name:"لنگرود"},{id:44531,name:"لوشان"},{id:43531,name:"لولمان"},{id:43961,name:"لوندویل"},{id:4381,name:"ماسال"},{id:43571,name:"ماسوله"},{id:43513,name:"ماکلوان"},{id:43631,name:"مرجقل"},{id:43671,name:"مرکیه"},{id:43971,name:"مشند"},{id:43551,name:"ملاسرا"},{id:4451,name:"منجیل"},{id:43691,name:"نوخاله اکبری"},{id:4371,name:"هشتپر"},{id:43681,name:"هنده خاله"},{id:44891,name:"واجارگاه"},{id:43941,name:"ویرمونی"},{id:44581,name:"ویشان"}],id:2,name:"گيلان"},{city_set:[{id:6871,name:"ازنا"},{id:68881,name:"ایستگاه تنگ هفت"},{id:68971,name:"اشترینان"},{id:68441,name:"اشتره گل گل"},{id:68561,name:"افرینه"},{id:6891,name:"الشتر"},{id:6861,name:"الیگودرز"},{id:68181,name:"بیرانوند"},{id:68331,name:"برخوردار"},{id:691,name:"بروجرد"},{id:68981,name:"بندیزه"},{id:68531,name:"پاعلم (پل تنگ )"},{id:6851,name:"پلدختر"},{id:68591,name:"پل شوراب پایین"},{id:68391,name:"تقی اباد-لرستان"},{id:68851,name:"چالانچولان"},{id:68781,name:"چاه ذوالفقار"},{id:68371,name:"چشمه کیزاب علیا"},{id:68451,name:"چقابل"},{id:68791,name:"چم پلک"},{id:68871,name:"چم سنگر"},{id:68551,name:"چمشک زیرتنگ"},{id:68641,name:"چمن سلطان"},{id:68681,name:"حیه"},{id:681,name:"خرم آباد-لرستان"},{id:68431,name:"خوشناموند"},{id:68491,name:"درب گنبد"},{id:68991,name:"دره گرگ"},{id:68351,name:"دم باغ"},{id:68951,name:"ده رحم"},{id:6881,name:"دورود"},{id:68741,name:"رازان"},{id:68761,name:"زاغه"},{id:68831,name:"ژان"},{id:68751,name:"سیاه گوشی (پل هرو)"},{id:68861,name:"سپید دشت"},{id:68771,name:"سرابدوره"},{id:68931,name:"سراب سیاهپوش"},{id:68461,name:"سوری"},{id:68631,name:"شاهپوراباد"},{id:68671,name:"شول آباد"},{id:68341,name:"فرهاداباد"},{id:68961,name:"فیروز آباد-لرستان"},{id:68661,name:"قلعه بزنوید"},{id:68841,name:"کاغه"},{id:68651,name:"کیزاندره"},{id:68361,name:"کهریزوروشت"},{id:68471,name:"کونانی"},{id:6841,name:"کوهدشت"},{id:68481,name:"گراب"},{id:68141,name:"ماسور"},{id:68581,name:"میان تاگان"},{id:68691,name:"مرگ سر"},{id:68571,name:"معمولان"},{id:68891,name:"مکینه حکومتی"},{id:68731,name:"مومن آباد"},{id:6831,name:"نورآباد"},{id:68381,name:"هفت چشمه-لرستان"},{id:68541,name:"واشیان نصیرتپه"},{id:68580,name:"ویسیان"}],id:20,name:"لرستان"},{city_set:[{id:47861,name:"اتو"},{id:47691,name:"ارطه"},{id:48331,name:"اروست"},{id:46411,name:"ایزدشهر"},{id:48431,
name:"اسبوکلا"},{id:48451,name:"اسلام اباد-مازندران"},{id:46961,name:"اغوزکتی"},{id:47841,name:"آلاشت"},{id:47951,name:"امافت"},{id:4731,name:"امیرکلا"},{id:461,name:"آمل"},{id:47391,name:"اینج دان"},{id:47341,name:"اهنگرکلا"},{id:46461,name:"اوز-مازندران"},{id:471,name:"بابل"},{id:4741,name:"بابلسر"},{id:46381,name:"باییجان"},{id:48591,name:"بادابسر"},{id:47631,name:"بالاجنیدلاک پل"},{id:47741,name:"بالادسته رکن کنار"},{id:47961,name:"بالادواب"},{id:48391,name:"بالاهولار"},{id:47751,name:"بیزکی"},{id:48671,name:"بیشه بنه"},{id:47471,name:"بیشه سر"},{id:46471,name:"بلده"},{id:48872,name:"بندپی"},{id:46441,name:"بنفشه ده"},{id:4851,name:"بهشهر"},{id:47441,name:"بهنمیر"},{id:47881,name:"پالند"},{id:48571,name:"پایین زرندین"},{id:48390,name:"پایین هولار"},{id:4791,name:"پل سفید"},{id:46581,name:"پول"},{id:48371,name:"تاکام"},{id:46481,name:"تاکر"},{id:48631,name:"تیرتاش"},{id:46991,name:"تمل"},{id:4681,name:"تنکابن"},{id:46981,name:"جنت رودبار"},{id:46971,name:"جواهرده"},{id:4771,name:"جویبار"},{id:4661,name:"چالوس"},{id:47891,name:"چرات"},{id:48551,name:"چلمردی"},{id:46531,name:"چلندر"},{id:46431,name:"چمستان"},{id:47651,name:"حاجی کلاصنم"},{id:46851,name:"خرم آباد-مازندران"},{id:47941,name:"خشک دره"},{id:47641,name:"خطیرکلا"},{id:48641,name:"خلیل شهر"},{id:48531,name:"خورشید (امامیه )"},{id:47331,name:"خوشرودپی"},{id:46181,name:"دابودشت"},{id:48481,name:"دارابکلا"},{id:48691,name:"دامداری حاج عزیزمجریان"},{id:48661,name:"دامداری حسن ابوطالبی"},{id:47541,name:"درازکش"},{id:46681,name:"دلیر"},{id:47931,name:"ده میان"},{id:4691,name:"رامسر"},{id:48561,name:"رستم کلا"},{id:46451,name:"رییس کلا"},{id:47791,name:"رکابدارکلا"},{id:47681,name:"ریکنده"},{id:46361,name:"رینه"},{id:46561,name:"رویان-مازندران"},{id:48541,name:"زاغمرز"},{id:4781,name:"زیر آب"},{id:47581,name:"زرگرمحله"},{id:46931,name:"سادات محله"},{id:481,name:"ساری"},{id:46691,name:"سیاه بیشه"},{id:46341,name:"سرخرود"},{id:46751,name:"سرلنگا"},{id:48681,name:"سفیدچاه"},{id:46871,name:"سلیمان اباد"},{id:4671,name:"سلمانشهر"},{id:47781,name:"سنگتاب"},{id:48351,name:"سنگده"},{id:46371,name:"سوا"},{id:48441,name:"سورک"},{id:47831,name:"شیرکلا"},{id:47871,name:"شیرگاه"},{id:46861,name:"شیرود"},{id:47571,name:"شهیداباد"},{id:48461,name:"شهرک صنعتی گهرباران"},{id:47381,name:"شورکش"},{id:46541,name:"صلاح الدین کلا"},{id:46741,name:"عباس آباد"},{id:47431,name:"عرب خیل"},{id:48471,name:"فرح اباد (خزراباد)"},{id:4751,name:"فریدونکنار"},{id:48341,name:"فریم"},{id:48361,name:"قادیکلا"},{id:4761,name:"قائم شهر"},{id:46841,name:"قلعه گردن"},{id:4831,name:"کیاسر"},{id:47451,name:"کاسگرمحله"},{id:47731,name:"کیاکلا"},{id:46941,name:"کتالم وسادات شهر"},{id:46761,name:"کترا"},{id:47981,name:"کتی لته"},{id:46571,name:"کجور"},{id:46651,name:"کردیچال"},{id:46881,name:"کشکو"},{id:46731,name:"کلارآباد"},{id:46661,name:"کلاردشت"},{id:46671,name:"کلنو"},{id:47461,name:"کله بست"},{id:47761,name:"کوهی خیل"},{id:47351,name:"گاوانکلا"},{id:47491,name:"گتاب"},{id:47551,name:"گردرودبار"},{id:46391,name:"گزنک"},{id:46771,name:"گلعلی اباد"},{id:46491,name:"گلندرود"},{id:4861,name:"گلوگاه-مازندران"},{id:46891,name:"لاک تراشان"},{id:46591,name:"لشکنار"},{id:47851,name:"لفور (لفورک )"},{id:48491,name:"ماچک پشت"},{id:48841,name:"میان دره"},{id:46781,name:"میان کوه سادات"},{id:4631,name:"محمودآباد-مازندران"},{id:46791,name:"مران سه هزار"},{id:47561,name:"مرزی کلا"},{id:46641,name:"مرزن آباد"},{id:46331,name:"معلم کلا"},{id:46551,name:"نارنج بن"},{id:46831,name:"نشتارود"},{id:4841,name:"نکا"},{id:4641,name:"نور"},{id:4651,name:"نوشهر"},{id:46631,name:"هیچرود"},{id:47661,name:"واسکس"},{id:47971,name:"ورسک"},{id:46351,name:"وسطی کلا"}],id:13,name:"مازندران"},{city_set:[{id:38461,name:"ادشته"},{id:381,name:"اراک"},{id:3871,name:"آستانه"},{id:38471,name:"استوه"},{id:3961,name:"آشتیان"},{id:37741,name:"اصفهانک"},{id:39371,name:"الویر"},{id:38891,name:"امامزاده ورچه"},{id:38491,name:"اناج"},{id:39581,name:"اهنگران"},{id:39661,name:"اهو"},{id:37861,name:"باقراباد"},{id:39431,name:"بالقلو"},{id:37871,name:"بزیجان"},{id:3771,name:"پرندک"},{id:3951,name:"تفرش"},{id:38771,name:"تواندشت علیا"},{id:38661,name:"توره"},{id:38451,name:"جاورسیان"},{id:38951,name:"جزنق"},{id:39451,name:"چمران-مرکزی"},{id:38791,name:"چهارچریک"},{id:38841,name:"چهارچشمه"},{id:37781,name:"یحیی اباد-مرکزی"},{id:37751,name:"حسین اباد-مرکزی"},{id:37771,name:"حکیم اباد"},{id:38541,name:"خسروبیگ"},{id:37761,name:"خشکرود-مرکزی"},{id:3881,name:"خمین"},{id:3841,name:"خنداب"},{id:38961,name:"خوراوند"},{id:37891,name:"خورهه"},{id:38351,name:"داودآباد"},{id:39481,name:"دخان"},{id:3791,name:"دلیجان"},{id:38991,name:"دهنو-مرکزی"},{id:39381,name:"دوزج"},{id:39361,name:"رازقان"},{id:38931,name:"رباطکفسان"},{id:3891,name:"رباطمراد"},{id:38941,name:"ریحان علیا"},{id:39551,name:"زاغر"},{id:39441,name:"زاویه"},{id:38341,name:"ساروق"},{id:39471,name:"سامان-مرکزی"},{id:39651,name:"سیاوشان"},{id:391,name:"ساوه"},{id:38731,name:"سرسختی بالا"},{id:37731,name:"سلطان اباد-مرکزی"},{id:38561,name:"سمقاور"},{id:38481,name:"سنجان"},{id:3861,name:"شازند"},{id:39541,name:"شهراب-مرکزی"},{id:3991,name:"شهرجدیدمهاجران"},{id:39641,name:"صالح اباد"},{id:37791,name:"صدراباد"},{id:37881,name:"عیسی اباد"},{id:39391,name:"علیشار"},{id:3931,name:"غرق آباد"},{id:38881,name:"فرفهان"},{id:39531,name:"فرمهین"},{id:39571,name:"فشک"},{id:39461,name:"قاقان"},{id:38631,name:"قدمگاه-مرکزی"},{id:38861,name:"قورچی باشی"},{id:38361,name:"کارچان"},{id:38681,name:"کتیران بالا"},{id:3831,name:"کرهرود"},{id:38671,name:"کزاز"},{id:3851,name:"کمیجان"},{id:39561,name:"کهک-مرکزی"},{id:38981,name:"گلدشت-مرکزی"},{id:39351,name:"یل اباد"},{id:38851,name:"لکان"},{id:38651,name:"لنجرود"},{id:38741,name:"لوزدرعلیا"},{id:38781,name:"مالمیر"},{id:3941,name:"مامونیه"},{id:3781,name:"محلات"},{id:39491,name:"مراغه-مرکزی"},{id:39631,name:"مزرعه نو"},{id:38971,name:"میشیجان علیا"},{id:38551,name:"میلاجرد"},{id:37851,name:"نخجیروان"},{id:37961,name:"نراق"},{id:37841,name:"نیمور"},{id:38691,name:"نهرمیان"},{id:39331,name:"نوبران"},{id:38571,name:"هزاوه"},{id:38641,name:"هفته"},{id:38761,name:"هندودر"},{id:38871,name:"ورچه"},{id:38531,name:"وفس"}],id:11,name:"مركزي"},{city_set:[{id:79431,name:"ابگرم خورگو"},{id:79591,name:"ابوموسی"},{id:79381,name:"باغات"},{id:7961,name:"بستک"},{id:79911,name:"بیکاه"},{id:79831,name:"بندر"},{id:79791,name:"بندرجاسک"},{id:791,name:"بندرعباس"},{id:7971,name:"بندرلنگه"},{id:79741,name:"بندرمغویه"},{id:79981,name:"بندزرک"},{id:79771,name:"پارسیان"},{id:79631,name:"پدل"},{id:79331,name:"پشته ایسین"},{id:79341,name:"پل شرقی"},{id:79971,name:"تیاب"},{id:79450,name:"تخت"},{id:79581,name:"جزیره سیری"},{id:79561,name:"جزیره لارک شهری"},{id:79781,name:"جزیره لاوان"},{id:79931,name:"جغین"},{id:79611,name:"جناح"},{id:79751,name:"چارک"},{id:79391,name:"حاجی آباد-هرمزگان"},{id:79451,name:"حسن لنگی پایین"},{id:7931,name:"خمیر"},{id:79851,name:"درپهن"},{id:79531,name:"درگهان"},{id:79651,name:"دژگان"},{id:79761,name:"دشتی"},{id:7991,name:"دهبارز"},{id:79671,name:"دهنگ"},{id:79661,name:"رویدر"},{id:79941,name:"زیارت علی"},{id:79361,name:"سیاهو"},{id:79881,name:"سردشت-هرمزگان"},{id:79461,name:"سیریک"},{id:79370,name:"سرگز"},{id:79841,name:"سندرک"},{id:79541,name:"سوزا"},{id:79371,name:"فارغان"},{id:79351,name:"فین"},{id:7951,name:"قشم"},{id:79441,name:"قلعه قاضی"},{id:7941,name:"کیش"},{id:79861,name:"کلورجکدان"},{id:79691,name:"کمشک"},{id:79641,name:"کنگ"},{id:79711,name:"کوشکنار"},{id:79460,name:"گروک"},{id:79731,name:"گزیر"},{id:79961,name:"گوربند"},{id:79471,name:"گونمردی"},{id:79871,name:"گوهران"},{id:79491,name:"گوهرت"},{id:79951,name:"ماشنگی"},{id:7981,name:"میناب"},{id:79551,name:"هرمز"},{id:79991,name:"هشتبندی"},{id:79571,name:"هنگام جدید"}],id:23,name:"هرمزگان"},{city_set:[{id:65481,name:"آجین"},{id:65731,name:"ازناو"},{id:65995,name:"ازندریان"},{id:6541,name:"اسدآباد"},{id:65791,name:"اسلام اباد-همدان"},{id:65881,name:"اشتران"},{id:65561,name:"اکنلو"},{id:65771,name:"اورزمان"},{id:65891,name:"باباپیر"},{id:65951,name:"بابارستم"},{id:65941,name:"باباقاسم"},{id:65960,name:"برزول"},{id:6531,name:"بهار"},{id:66e3,name:"پادگان قهرمان"},{id:65992,name:"پایگاه نوژه"},{id:65371,name:"پرلوک"},{id:65641,name:"تجرک"},{id:6581,name:"تویسرکان"},{id:65831,name:"جعفریه (قلعه جعفربیک )"},{id:65441,name:"جنت اباد-همدان"},{id:65931,name:"جهان اباد"},{id:65181,name:"جورقان"},{id:65741,name:"جوزان-همدان"},{id:65781,name:"جوکار"},{id:65661,name:"چانگرین"},{id:65461,name:"چنارسفلی"},{id:65471,name:"چنارعلیا"},{id:65381,name:"حسین ابادبهارعاشوری"},{id:65591,name:"داق داق اباد"},{id:65671,name:"دمق"},{id:65341,name:"دیناراباد"},{id:65971,name:"دهفول"},{id:65681,name:"رزن"},{id:65751,name:"زنگنه"},{id:65761,name:"سامن"},{id:65841,name:"سرکان"},{id:65571,name:"شیرین سو"},{id:65991,name:"شهرک صنعتی بوعلی"},{id:65361,name:"صالح آباد-همدان"},{id:65491,name:"طویلان سفلی"},{id:65993,name:"علیصدر"},{id:6561,name:"فامنین"},{id:65861,name:"فرسفج"},{id:65981,name:"فیروزان"},{id:65691,name:"قروه درجزین"},{id:65631,name:"قهاوند"},{id:65551,name:"قهوردسفلی"},{id:6551,name:"کبودرآهنگ"},{id:65531,name:"کوریجان"},{id:65651,name:"کوزره"},{id:65541,name:"کوهین-همدان"},{id:65961,name:"گیان"},{id:65581,name:"گل تپه-همدان"},{id:65998,name:"گنبد"},{id:65331,name:"لالجین"},{id:65851,name:"میانده-همدان"},{id:65141,name:"مریانج"},{id:6571,name:"ملایر"},{id:65391,name:"مهاجران"},{id:65451,name:"موسی اباد-همدان"},{id:6591,name:"نهاوند"},{id:651,name:"همدان"},{id:65351,name:"همه کسی"},{id:65431,name:"ویرایی"},{id:65871,name:"ولاشجرد"}],id:17,name:"همدان"},{city_set:[{id:8931,name:"ابرکوه"},{id:89531,name:"احمد آباد"},{id:8951,name:"اردکان-یزد"},{id:89851,name:"ارنان"},{id:89731,name:"اسفیج"},{id:89361,name:"اسفنداباد"},{id:89416,name:"اشکذر"},{id:89571,name:"انارستان-یزد"},{id:8971,name:"بافق"},{id:89631,name:"بفروئیه"},{id:89781,name:"بنستان"},{id:89761,name:"بهاباد"},{id:89861,name:"بهادران"},{id:8991,name:"تفت"},{id:89831,name:"تنگ چنار (چنار)"},{id:89491,name:"حمیدیا"},{id:89451,name:"خضر آباد"},{id:89991,name:"دهشیر"},{id:89418,name:"زارچ"},{id:891,name:"یزد"},{id:89581,name:"زرین"},{id:89431,name:"شاهدیه"},{id:89551,name:"عقدا"},{id:89951,name:"علی اباد-یزد"},{id:89891,name:"فتح اباد-یزد"},{id:89331,name:"فراغه"},{id:89441,name:"فهرج-یزد"},{id:89771,name:"کوشک-یزد"},{id:89751,name:"مبارکه-یزد"},{id:8961,name:"میبد"},{id:89871,name:"مروست"},{id:89351,name:"مهردشت"},{id:8981,name:"مهریز"},{id:89931,name:"ناحیه صنعتی پیشکوه"},{id:89981,name:"ناحیه صنعتی گاریزات"},{id:89481,name:"ندوشن"},{id:89961,name:"نیر-یزد"},{id:89941,name:"نصراباد"},{id:89881,name:"هرات"}],id:25,name:"يزد"}];









$('#preloader').hide();