'use strict';

var module = angular.module('post.Controller', []);


//-------------------------Home-------------------------


//Home Controler
module.controller('HomeCtrl', ['$scope', '$rootScope', 'Model', function ($scope, $rootScope, Model) {

    console.log('322332')

    $('.firstHide').show();
    var request = false;

    $scope.initFunction = function () {

        Model.stateList().then(function (data) {

            $scope.state = data.data;
            Model.passTypeList().then(function (data) {

                $scope.pass = data.data;
                Model.districtList().then(function (data) {

                    $scope.district = data.data;
                    Model.floorList().then(function (data) {

                        $scope.floor = data;
                        Model.personTypeList().then(function (data) {

                            $scope.PersonType = data;

                        }, function (error) {
                        }).finally(function () {
                            request = false;
                        });
                    }, function (error) {
                    }).finally(function () {
                        request = false;
                    });
                }, function (error) {
                }).finally(function () {
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

    $scope.loadPrice = function (cityId, provinceId) {
        Model.companyRequestTypeList(cityId).then(function (data) {
            $scope.sendType = data;
        }, function (error) {
        }).finally(function () {
        });
    }

    $("#addNewRequestState").on("change", function () {

        Model.cityList($("#addNewRequestState option:selected").val()).then(function (data) {
            $scope.city = data.data;
        }, function (error) {

        }).finally(function () {

        });

    });

    $scope.verifyRequestFunction = function (value) {

        if (request == true) return;
        request = true;

        $scope.verify.success = '';
        $scope.verify.error = '';

        Model.rquestVerify(value).then(function (data) {
            $scope.verify.success = rootScope.lang == 'fa' ? 'تایید نشانی شما با موفقیت انجام شد  ، با تشکر از همکاری شما':'Your address confirmation was successful, thank you for your cooperation';
        }, function (error) {
            if (error.error = 'NOT_FOUND') {
                $scope.verify.error = $rootScope.lang == 'fa' ? 'اطلاعات وارد شده صحیح نمی باشد ، لطفا مجددا اطلاعات را با دقت وارد نمایید ' : 'The information entered is incorrect, please re enter information carefully ';
            }
            else {
                $scope.verify.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
            }
        }).finally(function () {
            request = false;
        });
    }

    $scope.getRequestFunction = function (value) {

        if (request == true) return;
        request = true;

        $scope.get.success = '';
        $scope.get.error = '';

        Model.rquestGet(value).then(function (data) {
            $scope.get.success = true;

            var pass = '';
            if (data.pass_type_1)
            { if (data.pass_type_1 != '' && data.pass_1 != '') { pass += data.pass_type_1.label + ' ' + data.pass_1 + ' ' } }
            if (data.pass_type_2)
            { if (data.pass_type_2 != '' && data.pass_2 != '') { pass += data.pass_type_2.label + ' ' + data.pass_2 + ' ' } }
            if (data.pass_type_3)
            { if (data.pass_type_3 != '' && data.pass_3 != '') { pass += data.pass_type_3.label + ' ' + data.pass_3 + ' ' } }

            $scope.get.success1 = '  نامه اعتبار سنجی مورد نظر شما برای   ' + data.first_name + ' ' + data.last_name + '  می باشد  ';
            $scope.get.success2 = '  و به  نشانی   ' + data.city.label + ' ' + data.district_type.label + ' ' + data.district + ' ' + pass + ' پلاک ' + data.plaque + ' طبقه ' + data.floor.label;
            if (data.unit_no) {
                $scope.get.success2 += ' واحد ' + data.unit_no;
            }
            $scope.get.success2 += '   ارسال شده است.  ';
            $scope.get.success3 = 'وضعیت  نامه شما : ' + data.status.label;

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

    }

    $scope.loadPreview = function (id) {
        if ($scope.sendType) {
            $.each($scope.sendType, function (index, value) {
                if (value.id == id) {
                    $scope.SelectedPostMethod = value;
                }
            })
        }
    }

    $scope.beforeResendRequestFunction = function (value) {

        if (request == true) return;
        request = true;

        $scope.resendGet.success = '';
        $scope.resendGet.error = '';
        //$scope.resend.success = '';
        $scope.resend.error = '';

        Model.rquestGet(value).then(function (data) {

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

            var pass = '';
            if (data.pass_type_1)
            { if (data.pass_type_1 != '' && data.pass_1 != '') { pass += data.pass_type_1.label + ' ' + data.pass_1 + ' ' } }
            if (data.pass_type_2)
            { if (data.pass_type_2 != '' && data.pass_2 != '') { pass += data.pass_type_2.label + ' ' + data.pass_2 + ' ' } }
            if (data.pass_type_3)
            { if (data.pass_type_3 != '' && data.pass_3 != '') { pass += data.pass_type_3.label + ' ' + data.pass_3 + ' ' } }

            $scope.resendGet.success1 = '  نامه اعتبار سنجی مورد نظر شما برای   ' + data.first_name + ' ' + data.last_name + '  می باشد  ';
            $scope.resendGet.success2 = '  و به  نشانی   ' + data.city.label + ' ' + data.district_type.label + ' ' + data.district + ' ' + pass + ' پلاک ' + data.plaque + ' طبقه ' + data.floor.label;
            if (data.unit_no) {
                $scope.resendGet.success2 += ' واحد ' + data.unit_no;
            }
            $scope.resendGet.success2 += '   ارسال شده است.  ';
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
    }

    $scope.resendRequestFunction = function (value) {

        if (request == true) return;
        request = true;

        //$scope.resend.success = '';
        $scope.resend.error = '';

        Model.rquestResend(value).then(function (data) {
            //    $scope.resend.success = 'درخواست شما با موفقیت ثبت شد';
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
    }

    $scope.checkPostalCode = function () {
        Model.checkPostalcode($scope.addNewRequest.PostalCode1).then(function (data) {
            $scope.truePostalAddress = data;
            $scope.checkPostal();
        }, function (error) {
            $scope.truePostalAddress = '';
        }).finally(function () {

        });

    }

    $scope.reportRequestConfirmFunction = function (value) {

        if (request == true) return;
        request = true;

        $scope.confirm.success = '';

        $scope.confirm.error = '';
        $scope.report.success = '';
        $scope.report.error = '';
        // 5574633
        Model.rquestGet(value).then(function (data) {
            $scope.confirm.success = true;

            var pass = '';
            if (data.pass_type_1)
            { if (data.pass_type_1 != '' && data.pass_1 != '') { pass += data.pass_type_1.label + ' ' + data.pass_1 + ' ' } }
            if (data.pass_type_2)
            { if (data.pass_type_2 != '' && data.pass_2 != '') { pass += data.pass_type_2.label + ' ' + data.pass_2 + ' ' } }
            if (data.pass_type_3)
            { if (data.pass_type_3 != '' && data.pass_3 != '') { pass += data.pass_type_3.label + ' ' + data.pass_3 + ' ' } }

            $scope.confirm.success1 = '  نامه اعتبار سنجی مورد نظر شما برای   ' + data.first_name + ' ' + data.last_name + '  می باشد  ';
            $scope.confirm.success2 = '  و به  نشانی   ' + data.city.label + ' ' + data.district_type.label + ' ' + data.district + ' ' + pass + ' پلاک ' + data.plaque + ' طبقه ' + data.floor.label;
            if (data.unit_no) {
                $scope.confirm.success2 += ' واحد ' + data.unit_no;
            }
            $scope.confirm.success2 += ' ارسال شده است.  ';
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

    }

    $scope.reportRequestFunction = function (value) {

        if (request == true) return;
        request = true;

        $scope.report.success = '';
        $scope.report.error = '';

        Model.rquestReport(value).then(function (data) {
            $scope.report.success =  $rootScope.lang == 'fa' ?'گزارش شما با موفقیت ثبت شد  ، با تشکر از همکاری شما':'Your report has been registered, thank you for your cooperation';
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
    }

    $scope.checkPostal = function () {
        // if ($scope.truePostalAddress == '') {
        //    $scope.addNewRequest.error = 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا یا کد پستی و یا استان و شهر متناظر را تصحیح کنید.';
        //    $scope.addNewRequest.postKind = false;
        //     return;
        // }
        // else
        if ($scope.truePostalAddress && $scope.truePostalAddress.province_id != null && $scope.addNewRequest.State != "0" && ($scope.truePostalAddress.province_id != $scope.addNewRequest.State)) {
            $scope.addNewRequest.error =  $rootScope.lang == 'fa' ? 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا کد پستی و یا استان و شهر متناظر را تصحیح کنید' : 'The province and the city entered is not in accordance with postal code, postal Code or city and province the corresponding correct',
          $scope.addNewRequest.postKind = false;
            return;
        }
        else if ($scope.truePostalAddress && $scope.truePostalAddress.city_id != null && $scope.addNewRequest.City != "0" && ($scope.truePostalAddress.city_id != $scope.addNewRequest.City)) {
            $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا کد پستی و یا استان و شهر متناظر را تصحیح کنید' : 'The province and the city entered is not in accordance with postal code, postal Code or city and province the corresponding correct',
            $scope.addNewRequest.postKind = false;
            return;
        }
        else {
            $scope.addNewRequest.error = false;
        }
    }

    $scope.beforeAddNewRequest = function () {
        if (($scope.addNewRequest.MainRoadDrop === '' || $scope.addNewRequest.MainRoadTxt === '') && ($scope.addNewRequest.SecondaryRoadDrop1 === '' || $scope.addNewRequest.SecondaryRoadTxt1 === '') && ($scope.addNewRequest.SecondaryRoadDrop2 === '' || $scope.addNewRequest.SecondaryRoadTxt2 === '')) {
            $scope.addNewRequest.error = $rootScope.lang == 'fa' ?' لطفا معبر اصلی یا معبر فرعی خود را مشخص کنید':'Please specify your main crossing or crossing subsidiary';
            $scope.addNewRequest.postKind = false;
            return;
        }
        else if (($scope.addNewRequest.Gender == '' || $scope.addNewRequest.Gender == undefined) && $scope.addNewRequest.personType == 'natural_person') {
            $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'لطفا جنسیت خود را مشخص نمایید':'Please specify your gender';
            $scope.addNewRequest.postKind = false;
            return;
        }
            //else if (!isValidIranianNationalCode($scope.addNewRequest.NationalCode) && $scope.addNewRequest.personType == 'natural_person') {
            //    $scope.addNewRequest.error = 'کد ملی وارد شده معتبر نمی باشد ، لطفا کد ملی خود را با دقت وارد کنید';
            //    $scope.addNewRequest.postKind = false;
            //    return;
            //}
            //else if ($scope.truePostalAddress == '') {
            //    $scope.addNewRequest.error = 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا یا کد پستی و یا استان و شهر متناظر را تصحیح کنید.';
            //    $scope.addNewRequest.postKind = false;
            //    return;
            //}
        else if ($scope.truePostalAddress && $scope.truePostalAddress.province_id != null && $scope.addNewRequest.State != "0" && ($scope.truePostalAddress.province_id != $scope.addNewRequest.State)) {
            $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا کد پستی و یا استان و شهر متناظر را تصحیح کنید' : 'The province and the city entered is not in accordance with postal code, postal Code or city and province the corresponding correct',
            $scope.addNewRequest.postKind = false;
            return;
        }
        else if ($scope.truePostalAddress && $scope.truePostalAddress.city_id != null && $scope.addNewRequest.City != "0" && ($scope.truePostalAddress.city_id != $scope.addNewRequest.City)) {
            $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا کد پستی و یا استان و شهر متناظر را تصحیح کنید' : 'The province and the city entered is not in accordance with postal code, postal Code or city and province the corresponding correct',
            $scope.addNewRequest.postKind = false;
            return;
        }
        else {

            $scope.addNewRequest.postKind = true;
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

 
        }


    }

    $scope.cancelRequest = function () {
        if (($scope.addNewRequest.error == false || $scope.addNewRequest.error == '') && ($scope.addNewRequest.success == false || $scope.addNewRequest.success == '')) {
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
        }
    }

    $scope.addNewRequestFunction = function () {

        $('#addNewRequestSendBtn').attr('disabled', 'disabled');

        if (request == true) return;

        request = true;

        $scope.addNewRequest.success = '';
        $scope.addNewRequest.error = '';

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

        Model.requestNew($scope.addNewRequest).then(function (data) {
            // $scope.addNewRequest.success = '  آدرس شما با موفقیت ثبت شد و به زودی نامه اعتبار سنجی به دستتان میرسد ، کد رهگیری شما :  ' + data.id + '  با تشکر از همکاریتان ';
            window.location.href = data.redirect_url;
        }, function (error) {
            if (error.error = 'NOT_FOUND') {
                $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'اطلاعات وارد شده صحیح نمی باشد ، لطفا مجددا اطلاعات را با دقت وارد نمایید ' : 'The information entered is incorrect, please re enter information carefully ';
            }
            else {
                $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'با عرض پوزش ، خطایی رخ داده است ، لطفا کمی بعد مجددا اقدام نمایید. ' : 'Sorry, an error has occurred. Please try again later';
            }
        }).finally(function () {
            request = false;
        });
    }

    $scope.addNewMessageFunction = function (value) {

        if (request == true) return;
        request = true;

        $scope.addNewMessage.success = '';
        $scope.addNewMessage.error = '';

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
    }

    $scope.newsletterFunction = function (email) {

        if (request == true) return;
        if (!email) {
            $scope.newsletterResponse = 'لطفا ایمیل خود را وارد نمایید';
            return;
        }
        request = true;

        $scope.newsletterResponse = '';

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
    }

    $('#main').on('keydown', '#nationalCode , #addNewRequestNationalCode, #addNewRequestNationalCode1 ,#addNewRequestPostalCode1,#addNewRequestPostalCode2, #confirmCode , #trackingCode1, #trackingCode2, #trackingCode3 , #trackingCode2 ,#phoneNumber ,#phoneNumber2 , #postalCode1, #postalCode2', function (e) {
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
    $('input').on('input', function () {
        var value = $(this).val();
        $(this).val(value.toEnDigit());
    });

}])
    .controller('LanguageSwitchController', ['$scope', '$rootScope', '$translate',
      function ($scope, $rootScope, $translate, $filter) {
          $scope.changeLanguage = function (langKey) {
              $translate.use(langKey);
          };


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


          $rootScope.$on('$translateChangeSuccess', function (event, data) {
              alert('jmh')

              var language = data.language;

              $translate(['font', 'direction', 'float', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'floor']).then(function (translations) {
                  console.log('32')

                  alert('jmh3')

                  $rootScope.lang = language;

                  //  $rootScope.default_direction = language === 'fa' ? 'rtl' : 'ltr';
                  //    $rootScope.opposite_direction = language === 'fa' ? 'ltr' : 'rtl';

                  //  $rootScope.default_float = language === 'fa' ? 'right' : 'left';
                  // $rootScope.opposite_float = language === 'fa' ? 'left' : 'right';

                  $rootScope.font = translations.font + '';
                  $rootScope.direction = translations.direction + '';
                  $rootScope.float = translations.float + '';
                  if (translations.direction == 'rtl') {
                      $rootScope.mirrorDirection = 'ltr';
                  } else {
                      $rootScope.mirrorDirection = 'rtl';
                  }
                  if (translations.float == 'right') {
                      $rootScope.mirrorFloat = 'left';
                  } else {
                      $rootScope.mirrorFloat = 'right';
                  }
                  $rootScope.h1 = translations.h1;
                  $rootScope.h2 = translations.h2;
                  $rootScope.h3 = translations.h3;
                  $rootScope.h4 = translations.h4;
                  $rootScope.h5 = translations.h5;
                  $rootScope.h6 = translations.h6;

                  if (translations.float == 'right') {
                      $('input').css({ 'text-align': 'right' })
                      document.head.insertAdjacentHTML('beforeend', '<style>.select2-search__field:-moz-placeholder { text-align: right;}.select2-search__field:-ms-input-placeholder { text-align: right;} .select2-search__field::-webkit-input-placeholder { text-align: right;} </style>');

                  } else {
                      $('input').css({ 'text-align': 'left' })
                      document.head.insertAdjacentHTML('beforeend', '<style>.select2-search__field:-moz-placeholder { text-align: left;}.select2-search__field:-ms-input-placeholder { text-align: left;} .select2-search__field::-webkit-input-placeholder { text-align: left;} </style>');
                  }




                  //type.js
                  $("#typed").typed({
                      //strings: ["در صورتی که <strong>نامه اعتبار سنجی نشانی </strong>بدست شما رسیده است،<br /> لطفا کد ملی و کد رمز خود را در قسمت بالا وارد نمایید و دکمه تایید نشانی را فشار دهید.", "همچنین می توانید برای اعتبار سنجی نشانی، با شماره 02141924 تماس بگیرید<br/>و یا کدملی و کد رمز تایید را با درج یک فاصله بین آنها، به شماره 02141924 پیامک کنید.", "اگر از مدت زمان انقضا نامه شما گذشته باشد،<br/>  می توانید تقاضای ارسال مجدد کنید که نیاز به کد رهگیری نامه فعلی خواهید داشت."],
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


                  //select2
                  $('.js-example-basic-multiple-limit').select2({
                      maximumSelectionLength: 1,
                      //allowClear: true
                      placeholder: translations.floor,
                      dir: "rtl",
                      language: "fa"
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


                  // validation


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
                      errorMessage: $rootScope.lang == 'fa' ? 'کد ملی وارد شده صحیح نیست ' : 'National code is not correct',
                      errorMessageKey: 'IranNationalCode'
                  });

                  $.formUtils.addValidator({
                      name: 'CheckPostalCode',
                      validatorFunction: function (value, $el, config, language, $form) {

                          //if ($scope.truePostalAddress == '') {
                          // $scope.addNewRequest.error = 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا یا کد پستی و یا استان و شهر متناظر را تصحیح کنید.';
                          // $scope.addNewRequest.postKind = false;
                          //   return false;
                          // }
                          //else
                          if ($scope.truePostalAddress && $scope.truePostalAddress.province_id != null && $scope.addNewRequest.State != "0" && ($scope.truePostalAddress.province_id != $scope.addNewRequest.State)) {
                              //$scope.addNewRequest.error = 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا یا کد پستی و یا استان و شهر متناظر را تصحیح کنید.';
                              // $scope.addNewRequest.postKind = false;
                              return false;
                          }
                          else if ($scope.truePostalAddress && $scope.truePostalAddress.city_id != null && $scope.addNewRequest.City != "0" && ($scope.truePostalAddress.city_id != $scope.addNewRequest.City)) {
                              // $scope.addNewRequest.error = 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا یا کد پستی و یا استان و شهر متناظر را تصحیح کنید.';
                              // $scope.addNewRequest.postKind = false;
                              return false;
                          }
                          else {
                              // $scope.addNewRequest.error = false;
                              return true;
                          }
                      },
                      errorMessage: $rootScope.lang == 'fa' ? 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا کد پستی و یا استان و شهر متناظر را تصحیح کنید' : 'The province and the city entered is not in accordance with postal code, postal Code or city and province the corresponding correct',
                      errorMessageKey: 'CheckPostalCode'
                  });





                  $.validate({
                      language: $rootScope.lang == 'fa' ? myLanguage : '',
                      form: '#addNewRequestForm',
                      onSuccess: function () {
                          $scope.beforeAddNewRequest();
                      },
                      scrollToTopOnError: true
                  });
                  $.validate({
                      language: $rootScope.lang == 'fa' ? myLanguage : '',
                      form: '#verifyRequestForm',
                      onSuccess: function () {

                      },
                      scrollToTopOnError: false
                  });
                  $.validate({
                      language: $rootScope.lang == 'fa' ? myLanguage : '',
                      form: '#getRequestForm',
                      onSuccess: function () {

                      },
                      scrollToTopOnError: false
                  });
                  $.validate({
                      language: $rootScope.lang == 'fa' ? myLanguage : '',
                      form: '#resendRequestForm',
                      onSuccess: function () {

                      },
                      scrollToTopOnError: false
                  });
                  $.validate({
                      language: $rootScope.lang == 'fa' ? myLanguage : '',
                      form: '#reportRequestForm',
                      onSuccess: function () {

                      },
                      scrollToTopOnError: false
                  });
                  $.validate({
                      language: $rootScope.lang == 'fa' ? myLanguage : '',
                      form: '#addNewMessageForm',
                      onSuccess: function () {

                      },
                      scrollToTopOnError: false
                  });
                  $.validate({
                      language: $rootScope.lang == 'fa' ? myLanguage : '',
                      form: '#newslatterForm',
                      onSuccess: function () {

                      },
                      scrollToTopOnError: false
                  });

                  //end of validation




              }, function (translationIds) {
                  //$rootScope.font = translations.font + '';
                  //$rootScope.direction = translations.direction + '';
                  //$rootScope.float = translations.float + '';
                  //$rootScope.h1 = translations.h1;
                  //$rootScope.h2 = translations.h2;
                  //$rootScope.h3 = translations.h3;
                  //$rootScope.h4 = translations.h4;
                  //$rootScope.h5 = translations.h5;
                  //$rootScope.h6 = translations.h6;
              });




          });
      }]);


