//typed.js

!function (t) { "use strict"; var s = function (s, e) { this.el = t(s), this.options = t.extend({}, t.fn.typed.defaults, e), this.isInput = this.el.is("input"), this.attr = this.options.attr, this.showCursor = this.isInput ? !1 : this.options.showCursor, this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(), this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, this.stringsElement = this.options.stringsElement, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build() }; s.prototype = { constructor: s, init: function () { var t = this; t.timeout = setTimeout(function () { for (var s = 0; s < t.strings.length; ++s) t.sequence[s] = s; t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos) }, t.startDelay) }, build: function () { var s = this; if (this.showCursor === !0 && (this.cursor = t('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor)), this.stringsElement) { this.strings = [], this.stringsElement.hide(), console.log(this.stringsElement.children()); var e = this.stringsElement.children(); t.each(e, function (e, i) { s.strings.push(t(i).html()) }) } this.init() }, typewrite: function (t, s) { if (this.stop !== !0) { var e = Math.round(70 * Math.random()) + this.typeSpeed, i = this; i.timeout = setTimeout(function () { var e = 0, r = t.substr(s); if ("^" === r.charAt(0)) { var o = 1; /^\^\d+/.test(r) && (r = /\d+/.exec(r)[0], o += r.length, e = parseInt(r)), t = t.substring(0, s) + t.substring(s + o) } if ("html" === i.contentType) { var n = t.substr(s).charAt(0); if ("<" === n || "&" === n) { var a = "", h = ""; for (h = "<" === n ? ">" : ";"; t.substr(s + 1).charAt(0) !== h && (a += t.substr(s).charAt(0), s++, !(s + 1 > t.length)) ;); s++, a += h } } i.timeout = setTimeout(function () { if (s === t.length) { if (i.options.onStringTyped(i.arrayPos), i.arrayPos === i.strings.length - 1 && (i.options.callback(), i.curLoop++, i.loop === !1 || i.curLoop === i.loopCount)) return; i.timeout = setTimeout(function () { i.backspace(t, s) }, i.backDelay) } else { 0 === s && i.options.preStringTyped(i.arrayPos); var e = t.substr(0, s + 1); i.attr ? i.el.attr(i.attr, e) : i.isInput ? i.el.val(e) : "html" === i.contentType ? i.el.html(e) : i.el.text(e), s++, i.typewrite(t, s) } }, e) }, e) } }, backspace: function (t, s) { if (this.stop !== !0) { var e = Math.round(70 * Math.random()) + this.backSpeed, i = this; i.timeout = setTimeout(function () { if ("html" === i.contentType && ">" === t.substr(s).charAt(0)) { for (var e = ""; "<" !== t.substr(s - 1).charAt(0) && (e -= t.substr(s).charAt(0), s--, !(0 > s)) ;); s--, e += "<" } var r = t.substr(0, s); i.attr ? i.el.attr(i.attr, r) : i.isInput ? i.el.val(r) : "html" === i.contentType ? i.el.html(r) : i.el.text(r), s > i.stopNum ? (s--, i.backspace(t, s)) : s <= i.stopNum && (i.arrayPos++, i.arrayPos === i.strings.length ? (i.arrayPos = 0, i.shuffle && (i.sequence = i.shuffleArray(i.sequence)), i.init()) : i.typewrite(i.strings[i.sequence[i.arrayPos]], s)) }, e) } }, shuffleArray: function (t) { var s, e, i = t.length; if (i) for (; --i;) e = Math.floor(Math.random() * (i + 1)), s = t[e], t[e] = t[i], t[i] = s; return t }, reset: function () { var t = this; clearInterval(t.timeout); this.el.attr("id"); this.el.empty(), "undefined" != typeof this.cursor && this.cursor.remove(), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, this.options.resetCallback() } }, t.fn.typed = function (e) { return this.each(function () { var i = t(this), r = i.data("typed"), o = "object" == typeof e && e; r && r.reset(), i.data("typed", r = new s(this, o)), "string" == typeof e && r[e]() }) }, t.fn.typed.defaults = { strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"], stringsElement: null, typeSpeed: 0, startDelay: 0, backSpeed: 0, shuffle: !1, backDelay: 500, loop: !1, loopCount: !1, showCursor: !0, cursorChar: "|", attr: null, contentType: "html", callback: function () { }, preStringTyped: function () { }, onStringTyped: function () { }, resetCallback: function () { } } }(window.jQuery);


//app.js
angular.module('post', [
        'post.Controller',
        'post.Model',
        'pascalprecht.translate'
])

    //for translate
    .config(['$translateProvider', function ($translateProvider) {

        $translateProvider
        //.useStaticFilesLoader({
        //    prefix: 'js/',
        //    suffix: '.json'
        //})
        .translations('en', translationsEN)
        .translations('fa', translationsFA)
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


//controller.js

var module = angular.module('post.Controller', []);


//-------------------------Home-------------------------


//Home Controler
module.controller('HomeCtrl', ['$scope', '$rootScope', 'Model', '$translate', function ($scope, $rootScope, Model, $translate) {

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

    })

    $scope.verifyRequestFunction = function (value) {

        if (request == true) return;
        request = true;

        $scope.verify.success = '';
        $scope.verify.error = '';

        Model.rquestVerify(value).then(function (data) {
            $scope.verify.success = rootScope.lang == 'fa' ? 'تایید نشانی شما با موفقیت انجام شد  ، با تشکر از همکاری شما' : 'Your address confirmation was successful, thank you for your cooperation';
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
    }

    $scope.checkPostal = function () {
        // if ($scope.truePostalAddress == '') {
        //    $scope.addNewRequest.error = 'استان و شهر وارد شده منطبق با کد پستی نیست، لطفا یا کد پستی و یا استان و شهر متناظر را تصحیح کنید.';
        //    $scope.addNewRequest.postKind = false;
        //     return;
        // }
        // else
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
        else {
            $scope.addNewRequest.error = false;
        }
    }

    $scope.beforeAddNewRequest = function () {
        if (($scope.addNewRequest.MainRoadDrop === '' || $scope.addNewRequest.MainRoadTxt === '') && ($scope.addNewRequest.SecondaryRoadDrop1 === '' || $scope.addNewRequest.SecondaryRoadTxt1 === '') && ($scope.addNewRequest.SecondaryRoadDrop2 === '' || $scope.addNewRequest.SecondaryRoadTxt2 === '')) {
            $scope.addNewRequest.error = $rootScope.lang == 'fa' ? ' لطفا معبر اصلی یا معبر فرعی خود را مشخص کنید' : 'Please specify your main crossing or crossing subsidiary';
            $scope.addNewRequest.postKind = false;
            return;
        }
        else if (($scope.addNewRequest.Gender == '' || $scope.addNewRequest.Gender == undefined) && $scope.addNewRequest.personType == 'natural_person') {
            $scope.addNewRequest.error = $rootScope.lang == 'fa' ? 'لطفا جنسیت خود را مشخص نمایید' : 'Please specify your gender';
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
    }

    $('input').on('input', function () {
        var value = $(this).val();
        $(this).val(value.toEnDigit());
    })



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
              var language = data.language;

 
              $translate(['font', 'direction', 'float', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'floor']).then(function (translations) {

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
                  $scope.floor = translations.floor;
                  if (translations.float == 'right') {
                      $('input').css({ 'text-align': 'right' })
                      document.head.insertAdjacentHTML('beforeend', '<style>.select2-search__field:-moz-placeholder { text-align: right;color: #b1afaf;}.select2-search__field:-ms-input-placeholder { text-align: right;color: #b1afaf;} .select2-search__field::-webkit-input-placeholder { text-align: right;color: #b1afaf;} </style>');

                  } else {
                      $('input').css({ 'text-align': 'left' })
                      document.head.insertAdjacentHTML('beforeend', '<style>.select2-search__field:-moz-placeholder { text-align: left;color: #b1afaf;}.select2-search__field:-ms-input-placeholder { text-align: left;color: #b1afaf;} .select2-search__field::-webkit-input-placeholder { text-align: left;color: #b1afaf;} </style>');
                  }


                  setTimeout(function () {
                      $scope.initLib();
                  },10)

              }, function (translationIds) { });
 
          });


          $scope.initLib = function () {

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
                  placeholder: $scope.floor,
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
                  errorMessage: $rootScope.lang == 'fa' ? 'کد ملی وارد شده صحیح نیست' : 'National code is not correct',
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


          }

       }]);


//model.js

angular.module('post.Model', [])
 .factory('Model', ['$http',
    function ($http) {

        var Model = {};

        var apiBaseUrl = "/infra/core/";


        //--------------------------1- User Management ------------------------------


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


        //--------------------------2-Basic Api---------------------------------------


        //organizationTypeList
        Model.organizationTypeList = function () {
            return $http({
                url: apiBaseUrl + 'company/organization-type/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };

        //requestTypeList
        Model.requestTypeList = function () {
            return $http({
                url: apiBaseUrl + 'request-type/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };

        //companyRequestTypeList
        Model.companyRequestTypeList = function (cityId) {
            return $http({
                url: apiBaseUrl + 'default-company/request-type/list',
                method: "POST",
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, data: {
                    city_id: cityId
                }
            }).then(function (result) { return result.data; });
        };

        //genderList
        Model.genderList = function () {
            return $http({
                url: apiBaseUrl + 'gender/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };

        //passTypeList
        Model.passTypeList = function () {
            return $http({
                url: apiBaseUrl + 'pass-type/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };

        //personTypeList
        Model.personTypeList = function () {
            return $http({
                url: apiBaseUrl + 'person-type/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };

        //stateList
        Model.stateList = function () {
            return $http({
                url: apiBaseUrl + 'province/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };

        //districtList
        Model.districtList = function () {
            return $http({
                url: apiBaseUrl + 'district-type/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };

        //cityList
        Model.cityList = function (stateId) {
            return $http({
                url: apiBaseUrl + 'city/list',
                method: "POST",
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: {
                    province_id: stateId
                }
            }).then(function (result) { return result.data; });
        };

        //checkPostalCode
        Model.checkPostalcode = function (PostalCode) {
            return $http({
                url: apiBaseUrl + 'default-company/request/postcode-info?postcode=' + PostalCode,
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) { return result.data; });
        };

        //districtTypeList
        Model.districtTypeList = function () {
            return $http({
                url: apiBaseUrl + 'district-type/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };

        //personTypeList
        Model.personTypeList = function () {
            return $http({
                url: apiBaseUrl + 'person-type/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };

        //organizationalPositionList
        Model.organizationalPositionList = function () {
            return $http({
                url: apiBaseUrl + 'organizational-position/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };

        //floorList
        Model.floorList = function () {
            return $http({
                url: apiBaseUrl + 'floor/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (result) { return result.data; });
        };


        //--------------------------3-request Api---------------------------------------



        //requestNew
        Model.requestNew = function (Value) {
            return $http({
                url: apiBaseUrl + 'default-company/request/new',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    first_name: Value.FirstName,
                    last_name: Value.LastName,
                    gender_id: Value.Gender,
                    national_id: Value.NationalCode,
                    cell: Value.PhoneNumber,
                    email: Value.Email,
                    postcode: Value.PostalCode1,
                    // national_card_postcode: Value.PostalCode2,
                    city_id: Value.City,
                    district_type_id: Value.VillageDrop,
                    district: Value.VillageTxt,
                    pass_type_1_id: Value.MainRoadDrop,
                    pass_1: Value.MainRoadTxt,
                    pass_type_2_id: Value.SecondaryRoadDrop1,
                    pass_2: Value.SecondaryRoadTxt1,
                    pass_type_3_id: Value.SecondaryRoadDrop2,
                    pass_3: Value.SecondaryRoadTxt2,
                    plaque: Value.Plaque,
                    floor_id: Value.Floor,
                    unit_no: Value.Unit,
                    company_request_type_id: Value.companyRequestTypeId,
                    template_id: 1,
                    duration: 12,
                    resend_period: 13,
                    resend_expiration_time: '',
                    building: Value.BuildingName,
                    person_type_id: Value.personType,
                    api_key: '4b3025ca-357a-4ffb-aa68-6655e4b617d7``'

                }
            }).then(function (result) { return result.data; });
        };

        //rquestVerify
        Model.rquestVerify = function (value) {

            return $http({
                url: apiBaseUrl + 'request/verify',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    national_id: value.national_id,
                    secret_code: value.secret_code

                }
            }).then(function (result) { return result.data; });
        };

        //rquestGet
        Model.rquestGet = function (value) {

            return $http({
                url: apiBaseUrl + 'request/get',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    unique_id: value.uniqeId
                }
            }).then(function (result) { return result.data; });
        };

        //rquestResend
        Model.rquestResend = function (value) {

            return $http({
                url: apiBaseUrl + 'request/resend',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    unique_id: value.uniqeId,
                    company_request_type_id: value.KindSend
                }
            }).then(function (result) { return result.data; });
        };

        //rquestReport
        Model.rquestReport = function (value) {

            return $http({
                url: apiBaseUrl + 'request/report',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    unique_id: value.uniqeId
                }
            }).then(function (result) { return result.data; });
        };

        //messageNew
        Model.messageNew = function (value) {

            return $http({
                url: apiBaseUrl + 'message/new',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    email: value.email,
                    name: value.name,
                    cell: value.cell,
                    unique_id: value.uniqId,
                    message: value.text
                }
            }).then(function (result) { return result.data; });
        };

        //newsletter
        Model.newsletter = function (email) {
            return $http({
                url: apiBaseUrl + 'newsletter/new-email',
                method: "POST",
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: {
                    email: email
                }
            }).then(function (result) { return result.data; });
        };




        return Model;
    }]);




//translate

!function (a, b) { "function" == typeof define && define.amd ? define([], function () { return b() }) : "object" == typeof exports ? module.exports = b() : b() }(this, function () { function a(a) { "use strict"; var b = a.storageKey(), c = a.storage(), d = function () { var d = a.preferredLanguage(); angular.isString(d) ? a.use(d) : c.put(b, a.use()) }; d.displayName = "fallbackFromIncorrectStorageValue", c ? c.get(b) ? a.use(c.get(b))["catch"](d) : d() : angular.isString(a.preferredLanguage()) && a.use(a.preferredLanguage()) } function b() { "use strict"; var a, b, c = null, d = !1, e = !1; b = { sanitize: function (a, b) { return "text" === b && (a = g(a)), a }, escape: function (a, b) { return "text" === b && (a = f(a)), a }, sanitizeParameters: function (a, b) { return "params" === b && (a = h(a, g)), a }, escapeParameters: function (a, b) { return "params" === b && (a = h(a, f)), a } }, b.escaped = b.escapeParameters, this.addStrategy = function (a, c) { return b[a] = c, this }, this.removeStrategy = function (a) { return delete b[a], this }, this.useStrategy = function (a) { return d = !0, c = a, this }, this.$get = ["$injector", "$log", function (f, g) { var h = {}, i = function (a, c, d) { return angular.forEach(d, function (d) { if (angular.isFunction(d)) a = d(a, c); else if (angular.isFunction(b[d])) a = b[d](a, c); else { if (!angular.isString(b[d])) throw new Error("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '" + d + "'"); if (!h[b[d]]) try { h[b[d]] = f.get(b[d]) } catch (e) { throw h[b[d]] = function () { }, new Error("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '" + d + "'") } a = h[b[d]](a, c) } }), a }, j = function () { d || e || (g.warn("pascalprecht.translate.$translateSanitization: No sanitization strategy has been configured. This can have serious security implications. See http://angular-translate.github.io/docs/#/guide/19_security for details."), e = !0) }; return f.has("$sanitize") && (a = f.get("$sanitize")), { useStrategy: function (a) { return function (b) { a.useStrategy(b) } }(this), sanitize: function (a, b, d) { if (c || j(), arguments.length < 3 && (d = c), !d) return a; var e = angular.isArray(d) ? d : [d]; return i(a, b, e) } } }]; var f = function (a) { var b = angular.element("<div></div>"); return b.text(a), b.html() }, g = function (b) { if (!a) throw new Error("pascalprecht.translate.$translateSanitization: Error cannot find $sanitize service. Either include the ngSanitize module (https://docs.angularjs.org/api/ngSanitize) or use a sanitization strategy which does not depend on $sanitize, such as 'escape'."); return a(b) }, h = function (a, b) { if (angular.isObject(a)) { var c = angular.isArray(a) ? [] : {}; return angular.forEach(a, function (a, d) { c[d] = h(a, b) }), c } return angular.isNumber(a) ? a : b(a) } } function c(a, b, c, d) { "use strict"; var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t = {}, u = [], v = a, w = [], x = "translate-cloak", y = !1, z = !1, A = ".", B = !1, C = 0, D = !0, E = "default", F = { "default": function (a) { return (a || "").split("-").join("_") }, java: function (a) { var b = (a || "").split("-").join("_"), c = b.split("_"); return c.length > 1 ? c[0].toLowerCase() + "_" + c[1].toUpperCase() : b }, bcp47: function (a) { var b = (a || "").split("_").join("-"), c = b.split("-"); return c.length > 1 ? c[0].toLowerCase() + "-" + c[1].toUpperCase() : b } }, G = "2.9.0", H = function () { if (angular.isFunction(d.getLocale)) return d.getLocale(); var a, c, e = b.$get().navigator, f = ["language", "browserLanguage", "systemLanguage", "userLanguage"]; if (angular.isArray(e.languages)) for (a = 0; a < e.languages.length; a++) if (c = e.languages[a], c && c.length) return c; for (a = 0; a < f.length; a++) if (c = e[f[a]], c && c.length) return c; return null }; H.displayName = "angular-translate/service: getFirstBrowserLanguage"; var I = function () { var a = H() || ""; return F[E] && (a = F[E](a)), a }; I.displayName = "angular-translate/service: getLocale"; var J = function (a, b) { for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c; return -1 }, K = function () { return this.toString().replace(/^\s+|\s+$/g, "") }, L = function (a) { if (a) { for (var b = [], c = angular.lowercase(a), d = 0, e = u.length; e > d; d++) b.push(angular.lowercase(u[d])); if (J(b, c) > -1) return a; if (f) { var g; for (var h in f) { var i = !1, j = Object.prototype.hasOwnProperty.call(f, h) && angular.lowercase(h) === angular.lowercase(a); if ("*" === h.slice(-1) && (i = h.slice(0, -1) === a.slice(0, h.length - 1)), (j || i) && (g = f[h], J(b, angular.lowercase(g)) > -1)) return g } } var k = a.split("_"); return k.length > 1 && J(b, angular.lowercase(k[0])) > -1 ? k[0] : void 0 } }, M = function (a, b) { if (!a && !b) return t; if (a && !b) { if (angular.isString(a)) return t[a] } else angular.isObject(t[a]) || (t[a] = {}), angular.extend(t[a], N(b)); return this }; this.translations = M, this.cloakClassName = function (a) { return a ? (x = a, this) : x }, this.nestedObjectDelimeter = function (a) { return a ? (A = a, this) : A }; var N = function (a, b, c, d) { var e, f, g, h; b || (b = []), c || (c = {}); for (e in a) Object.prototype.hasOwnProperty.call(a, e) && (h = a[e], angular.isObject(h) ? N(h, b.concat(e), c, e) : (f = b.length ? "" + b.join(A) + A + e : e, b.length && e === d && (g = "" + b.join(A), c[g] = "@:" + f), c[f] = h)); return c }; N.displayName = "flatObject", this.addInterpolation = function (a) { return w.push(a), this }, this.useMessageFormatInterpolation = function () { return this.useInterpolation("$translateMessageFormatInterpolation") }, this.useInterpolation = function (a) { return n = a, this }, this.useSanitizeValueStrategy = function (a) { return c.useStrategy(a), this }, this.preferredLanguage = function (a) { return a ? (O(a), this) : e }; var O = function (a) { return a && (e = a), e }; this.translationNotFoundIndicator = function (a) { return this.translationNotFoundIndicatorLeft(a), this.translationNotFoundIndicatorRight(a), this }, this.translationNotFoundIndicatorLeft = function (a) { return a ? (q = a, this) : q }, this.translationNotFoundIndicatorRight = function (a) { return a ? (r = a, this) : r }, this.fallbackLanguage = function (a) { return P(a), this }; var P = function (a) { return a ? (angular.isString(a) ? (h = !0, g = [a]) : angular.isArray(a) && (h = !1, g = a), angular.isString(e) && J(g, e) < 0 && g.push(e), this) : h ? g[0] : g }; this.use = function (a) { if (a) { if (!t[a] && !o) throw new Error("$translateProvider couldn't find translationTable for langKey: '" + a + "'"); return i = a, this } return i }; var Q = function (a) { return a ? (v = a, this) : l ? l + v : v }; this.storageKey = Q, this.useUrlLoader = function (a, b) { return this.useLoader("$translateUrlLoader", angular.extend({ url: a }, b)) }, this.useStaticFilesLoader = function (a) { return this.useLoader("$translateStaticFilesLoader", a) }, this.useLoader = function (a, b) { return o = a, p = b || {}, this }, this.useLocalStorage = function () { return this.useStorage("$translateLocalStorage") }, this.useCookieStorage = function () { return this.useStorage("$translateCookieStorage") }, this.useStorage = function (a) { return k = a, this }, this.storagePrefix = function (a) { return a ? (l = a, this) : a }, this.useMissingTranslationHandlerLog = function () { return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog") }, this.useMissingTranslationHandler = function (a) { return m = a, this }, this.usePostCompiling = function (a) { return y = !!a, this }, this.forceAsyncReload = function (a) { return z = !!a, this }, this.uniformLanguageTag = function (a) { return a ? angular.isString(a) && (a = { standard: a }) : a = {}, E = a.standard, this }, this.determinePreferredLanguage = function (a) { var b = a && angular.isFunction(a) ? a() : I(); return e = u.length ? L(b) || b : b, this }, this.registerAvailableLanguageKeys = function (a, b) { return a ? (u = a, b && (f = b), this) : u }, this.useLoaderCache = function (a) { return a === !1 ? s = void 0 : a === !0 ? s = !0 : "undefined" == typeof a ? s = "$translationCache" : a && (s = a), this }, this.directivePriority = function (a) { return void 0 === a ? C : (C = a, this) }, this.statefulFilter = function (a) { return void 0 === a ? D : (D = a, this) }, this.$get = ["$log", "$injector", "$rootScope", "$q", function (a, b, c, d) { var f, l, u, E = b.get(n || "$translateDefaultInterpolation"), F = !1, H = {}, I = {}, R = function (a, b, c, h, j) { var m = j && j !== i ? L(j) || j : i; if (angular.isArray(a)) { var n = function (a) { for (var e = {}, f = [], g = function (a) { var f = d.defer(), g = function (b) { e[a] = b, f.resolve([a, b]) }; return R(a, b, c, h, j).then(g, g), f.promise }, i = 0, k = a.length; k > i; i++) f.push(g(a[i])); return d.all(f).then(function () { return e }) }; return n(a) } var o = d.defer(); a && (a = K.apply(a)); var p = function () { var a = e ? I[e] : I[m]; if (l = 0, k && !a) { var b = f.get(v); if (a = I[b], g && g.length) { var c = J(g, b); l = 0 === c ? 1 : 0, J(g, e) < 0 && g.push(e) } } return a }(); if (p) { var q = function () { j || (m = i), ca(a, b, c, h, m).then(o.resolve, o.reject) }; q.displayName = "promiseResolved", p["finally"](q, o.reject) } else ca(a, b, c, h, m).then(o.resolve, o.reject); return o.promise }, S = function (a) { return q && (a = [q, a].join(" ")), r && (a = [a, r].join(" ")), a }, T = function (a) { i = a, k && f.put(R.storageKey(), i), c.$emit("$translateChangeSuccess", { language: a }), E.setLocale(i); var b = function (a, b) { H[b].setLocale(i) }; b.displayName = "eachInterpolatorLocaleSetter", angular.forEach(H, b), c.$emit("$translateChangeEnd", { language: a }) }, U = function (a) { if (!a) throw "No language key specified for loading."; var e = d.defer(); c.$emit("$translateLoadingStart", { language: a }), F = !0; var f = s; "string" == typeof f && (f = b.get(f)); var g = angular.extend({}, p, { key: a, $http: angular.extend({}, { cache: f }, p.$http) }), h = function (b) { var d = {}; c.$emit("$translateLoadingSuccess", { language: a }), angular.isArray(b) ? angular.forEach(b, function (a) { angular.extend(d, N(a)) }) : angular.extend(d, N(b)), F = !1, e.resolve({ key: a, table: d }), c.$emit("$translateLoadingEnd", { language: a }) }; h.displayName = "onLoaderSuccess"; var i = function (a) { c.$emit("$translateLoadingError", { language: a }), e.reject(a), c.$emit("$translateLoadingEnd", { language: a }) }; return i.displayName = "onLoaderError", b.get(o)(g).then(h, i), e.promise }; if (k && (f = b.get(k), !f.get || !f.put)) throw new Error("Couldn't use storage '" + k + "', missing get() or put() method!"); if (w.length) { var V = function (a) { var c = b.get(a); c.setLocale(e || i), H[c.getInterpolationIdentifier()] = c }; V.displayName = "interpolationFactoryAdder", angular.forEach(w, V) } var W = function (a) { var b = d.defer(); if (Object.prototype.hasOwnProperty.call(t, a)) b.resolve(t[a]); else if (I[a]) { var c = function (a) { M(a.key, a.table), b.resolve(a.table) }; c.displayName = "translationTableResolver", I[a].then(c, b.reject) } else b.reject(); return b.promise }, X = function (a, b, c, e) { var f = d.defer(), g = function (d) { if (Object.prototype.hasOwnProperty.call(d, b)) { e.setLocale(a); var g = d[b]; "@:" === g.substr(0, 2) ? X(a, g.substr(2), c, e).then(f.resolve, f.reject) : f.resolve(e.interpolate(d[b], c)), e.setLocale(i) } else f.reject() }; return g.displayName = "fallbackTranslationResolver", W(a).then(g, f.reject), f.promise }, Y = function (a, b, c, d) { var e, f = t[a]; if (f && Object.prototype.hasOwnProperty.call(f, b)) { if (d.setLocale(a), e = d.interpolate(f[b], c), "@:" === e.substr(0, 2)) return Y(a, e.substr(2), c, d); d.setLocale(i) } return e }, Z = function (a, c) { if (m) { var d = b.get(m)(a, i, c); return void 0 !== d ? d : a } return a }, $ = function (a, b, c, e, f) { var h = d.defer(); if (a < g.length) { var i = g[a]; X(i, b, c, e).then(h.resolve, function () { $(a + 1, b, c, e, f).then(h.resolve) }) } else f ? h.resolve(f) : h.resolve(Z(b, c)); return h.promise }, _ = function (a, b, c, d) { var e; if (a < g.length) { var f = g[a]; e = Y(f, b, c, d), e || (e = _(a + 1, b, c, d)) } return e }, aa = function (a, b, c, d) { return $(u > 0 ? u : l, a, b, c, d) }, ba = function (a, b, c) { return _(u > 0 ? u : l, a, b, c) }, ca = function (a, b, c, e, f) { var h = d.defer(), i = f ? t[f] : t, j = c ? H[c] : E; if (i && Object.prototype.hasOwnProperty.call(i, a)) { var k = i[a]; "@:" === k.substr(0, 2) ? R(k.substr(2), b, c, e, f).then(h.resolve, h.reject) : h.resolve(j.interpolate(k, b)) } else { var l; m && !F && (l = Z(a, b)), f && g && g.length ? aa(a, b, j, e).then(function (a) { h.resolve(a) }, function (a) { h.reject(S(a)) }) : m && !F && l ? e ? h.resolve(e) : h.resolve(l) : e ? h.resolve(e) : h.reject(S(a)) } return h.promise }, da = function (a, b, c, d) { var e, f = d ? t[d] : t, h = E; if (H && Object.prototype.hasOwnProperty.call(H, c) && (h = H[c]), f && Object.prototype.hasOwnProperty.call(f, a)) { var i = f[a]; e = "@:" === i.substr(0, 2) ? da(i.substr(2), b, c, d) : h.interpolate(i, b) } else { var j; m && !F && (j = Z(a, b)), d && g && g.length ? (l = 0, e = ba(a, b, h)) : e = m && !F && j ? j : S(a) } return e }, ea = function (a) { j === a && (j = void 0), I[a] = void 0 }; R.preferredLanguage = function (a) { return a && O(a), e }, R.cloakClassName = function () { return x }, R.nestedObjectDelimeter = function () { return A }, R.fallbackLanguage = function (a) { if (void 0 !== a && null !== a) { if (P(a), o && g && g.length) for (var b = 0, c = g.length; c > b; b++) I[g[b]] || (I[g[b]] = U(g[b])); R.use(R.use()) } return h ? g[0] : g }, R.useFallbackLanguage = function (a) { if (void 0 !== a && null !== a) if (a) { var b = J(g, a); b > -1 && (u = b) } else u = 0 }, R.proposedLanguage = function () { return j }, R.storage = function () { return f }, R.negotiateLocale = L, R.use = function (a) { if (!a) return i; var b = d.defer(); c.$emit("$translateChangeStart", { language: a }); var e = L(a); return e && (a = e), !z && t[a] || !o || I[a] ? j === a && I[a] ? I[a].then(function (a) { return b.resolve(a.key), a }, function (a) { return b.reject(a), d.reject(a) }) : (b.resolve(a), T(a)) : (j = a, I[a] = U(a).then(function (c) { return M(c.key, c.table), b.resolve(c.key), j === a && T(c.key), c }, function (a) { return c.$emit("$translateChangeError", { language: a }), b.reject(a), c.$emit("$translateChangeEnd", { language: a }), d.reject(a) }), I[a]["finally"](function () { ea(a) })), b.promise }, R.storageKey = function () { return Q() }, R.isPostCompilingEnabled = function () { return y }, R.isForceAsyncReloadEnabled = function () { return z }, R.refresh = function (a) { function b() { f.resolve(), c.$emit("$translateRefreshEnd", { language: a }) } function e() { f.reject(), c.$emit("$translateRefreshEnd", { language: a }) } if (!o) throw new Error("Couldn't refresh translation table, no loader registered!"); var f = d.defer(); if (c.$emit("$translateRefreshStart", { language: a }), a) if (t[a]) { var h = function (c) { M(c.key, c.table), a === i && T(i), b() }; h.displayName = "refreshPostProcessor", U(a).then(h, e) } else e(); else { var j = [], k = {}; if (g && g.length) for (var l = 0, m = g.length; m > l; l++) j.push(U(g[l])), k[g[l]] = !0; i && !k[i] && j.push(U(i)); var n = function (a) { t = {}, angular.forEach(a, function (a) { M(a.key, a.table) }), i && T(i), b() }; n.displayName = "refreshPostProcessor", d.all(j).then(n, e) } return f.promise }, R.instant = function (a, b, c, d) { var f = d && d !== i ? L(d) || d : i; if (null === a || angular.isUndefined(a)) return a; if (angular.isArray(a)) { for (var h = {}, j = 0, k = a.length; k > j; j++) h[a[j]] = R.instant(a[j], b, c, d); return h } if (angular.isString(a) && a.length < 1) return a; a && (a = K.apply(a)); var l, n = []; e && n.push(e), f && n.push(f), g && g.length && (n = n.concat(g)); for (var o = 0, p = n.length; p > o; o++) { var s = n[o]; if (t[s] && "undefined" != typeof t[s][a] && (l = da(a, b, c, f)), "undefined" != typeof l) break } return l || "" === l || (q || r ? l = S(a) : (l = E.interpolate(a, b), m && !F && (l = Z(a, b)))), l }, R.versionInfo = function () { return G }, R.loaderCache = function () { return s }, R.directivePriority = function () { return C }, R.statefulFilter = function () { return D }, R.isReady = function () { return B }; var fa = d.defer(); fa.promise.then(function () { B = !0 }), R.onReady = function (a) { var b = d.defer(); return angular.isFunction(a) && b.promise.then(a), B ? b.resolve() : fa.promise.then(b.resolve), b.promise }; var ga = c.$on("$translateReady", function () { fa.resolve(), ga(), ga = null }), ha = c.$on("$translateChangeEnd", function () { fa.resolve(), ha(), ha = null }); if (o) { if (angular.equals(t, {}) && R.use() && R.use(R.use()), g && g.length) for (var ia = function (a) { return M(a.key, a.table), c.$emit("$translateChangeEnd", { language: a.key }), a }, ja = 0, ka = g.length; ka > ja; ja++) { var la = g[ja]; (z || !t[la]) && (I[la] = U(la).then(ia)) } } else c.$emit("$translateReady", { language: R.use() }); return R }] } function d(a, b) { "use strict"; var c, d = {}, e = "default"; return d.setLocale = function (a) { c = a }, d.getInterpolationIdentifier = function () { return e }, d.useSanitizeValueStrategy = function (a) { return b.useStrategy(a), this }, d.interpolate = function (c, d) { d = d || {}, d = b.sanitize(d, "params"); var e = a(c)(d); return e = b.sanitize(e, "text") }, d } function e(a, b, c, d, e, g) { "use strict"; var h = function () { return this.toString().replace(/^\s+|\s+$/g, "") }; return { restrict: "AE", scope: !0, priority: a.directivePriority(), compile: function (b, i) { var j = i.translateValues ? i.translateValues : void 0, k = i.translateInterpolation ? i.translateInterpolation : void 0, l = b[0].outerHTML.match(/translate-value-+/i), m = "^(.*)(" + c.startSymbol() + ".*" + c.endSymbol() + ")(.*)", n = "^(.*)" + c.startSymbol() + "(.*)" + c.endSymbol() + "(.*)"; return function (b, o, p) { b.interpolateParams = {}, b.preText = "", b.postText = "", b.translateNamespace = f(b); var q = {}, r = function (a, c, d) { if (c.translateValues && angular.extend(a, e(c.translateValues)(b.$parent)), l) for (var f in d) if (Object.prototype.hasOwnProperty.call(c, f) && "translateValue" === f.substr(0, 14) && "translateValues" !== f) { var g = angular.lowercase(f.substr(14, 1)) + f.substr(15); a[g] = d[f] } }, s = function (a) { if (angular.isFunction(s._unwatchOld) && (s._unwatchOld(), s._unwatchOld = void 0), angular.equals(a, "") || !angular.isDefined(a)) { var d = h.apply(o.text()), e = d.match(m); if (angular.isArray(e)) { b.preText = e[1], b.postText = e[3], q.translate = c(e[2])(b.$parent); var f = d.match(n); angular.isArray(f) && f[2] && f[2].length && (s._unwatchOld = b.$watch(f[2], function (a) { q.translate = a, y() })) } else q.translate = d ? d : void 0 } else q.translate = a; y() }, t = function (a) { p.$observe(a, function (b) { q[a] = b, y() }) }; r(b.interpolateParams, p, i); var u = !0; p.$observe("translate", function (a) { "undefined" == typeof a ? s("") : "" === a && u || (q.translate = a, y()), u = !1 }); for (var v in p) p.hasOwnProperty(v) && "translateAttr" === v.substr(0, 13) && t(v); if (p.$observe("translateDefault", function (a) { b.defaultText = a, y() }), j && p.$observe("translateValues", function (a) { a && b.$parent.$watch(function () { angular.extend(b.interpolateParams, e(a)(b.$parent)) }) }), l) { var w = function (a) { p.$observe(a, function (c) { var d = angular.lowercase(a.substr(14, 1)) + a.substr(15); b.interpolateParams[d] = c }) }; for (var x in p) Object.prototype.hasOwnProperty.call(p, x) && "translateValue" === x.substr(0, 14) && "translateValues" !== x && w(x) } var y = function () { for (var a in q) q.hasOwnProperty(a) && void 0 !== q[a] && z(a, q[a], b, b.interpolateParams, b.defaultText, b.translateNamespace) }, z = function (b, c, d, e, f, g) { c ? (g && "." === c.charAt(0) && (c = g + c), a(c, e, k, f, d.translateLanguage).then(function (a) { A(a, d, !0, b) }, function (a) { A(a, d, !1, b) })) : A(c, d, !1, b) }, A = function (b, c, e, f) { if ("translate" === f) { e || "undefined" == typeof c.defaultText || (b = c.defaultText), o.empty().append(c.preText + b + c.postText); var g = a.isPostCompilingEnabled(), h = "undefined" != typeof i.translateCompile, j = h && "false" !== i.translateCompile; (g && !h || j) && d(o.contents())(c) } else { e || "undefined" == typeof c.defaultText || (b = c.defaultText); var k = p.$attr[f]; "data-" === k.substr(0, 5) && (k = k.substr(5)), k = k.substr(15), o.attr(k, b) } }; (j || l || p.translateDefault) && b.$watch("interpolateParams", y, !0), b.$watch("translateLanguage", y); var B = g.$on("$translateChangeSuccess", y); o.text().length ? s(p.translate ? p.translate : "") : p.translate && s(p.translate), y(), b.$on("$destroy", B) } } } } function f(a) { "use strict"; return a.translateNamespace ? a.translateNamespace : a.$parent ? f(a.$parent) : void 0 } function g(a, b) { "use strict"; return { compile: function (c) { var d = function () { c.addClass(a.cloakClassName()) }, e = function () { c.removeClass(a.cloakClassName()) }; return a.onReady(function () { e() }), d(), function (c, f, g) { g.translateCloak && g.translateCloak.length && (g.$observe("translateCloak", function (b) { a(b).then(e, d) }), b.$on("$translateChangeSuccess", function () { a(g.translateCloak).then(e, d) })) } } } } function h() { "use strict"; return { restrict: "A", scope: !0, compile: function () { return { pre: function (a, b, c) { a.translateNamespace = f(a), a.translateNamespace && "." === c.translateNamespace.charAt(0) ? a.translateNamespace += c.translateNamespace : a.translateNamespace = c.translateNamespace } } } } } function f(a) { "use strict"; return a.translateNamespace ? a.translateNamespace : a.$parent ? f(a.$parent) : void 0 } function i() { "use strict"; return { restrict: "A", scope: !0, compile: function () { return function (a, b, c) { c.$observe("translateLanguage", function (b) { a.translateLanguage = b }) } } } } function j(a, b) { "use strict"; var c = function (c, d, e, f) { return angular.isObject(d) || (d = a(d)(this)), b.instant(c, d, e, f) }; return b.statefulFilter() && (c.$stateful = !0), c } function k(a) { "use strict"; return a("translations") } return angular.module("pascalprecht.translate", ["ng"]).run(a), a.$inject = ["$translate"], a.displayName = "runTranslate", angular.module("pascalprecht.translate").provider("$translateSanitization", b), angular.module("pascalprecht.translate").constant("pascalprechtTranslateOverrider", {}).provider("$translate", c), c.$inject = ["$STORAGE_KEY", "$windowProvider", "$translateSanitizationProvider", "pascalprechtTranslateOverrider"], c.displayName = "displayName", angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation", d), d.$inject = ["$interpolate", "$translateSanitization"], d.displayName = "$translateDefaultInterpolation", angular.module("pascalprecht.translate").constant("$STORAGE_KEY", "NG_TRANSLATE_LANG_KEY"), angular.module("pascalprecht.translate").directive("translate", e), e.$inject = ["$translate", "$q", "$interpolate", "$compile", "$parse", "$rootScope"], e.displayName = "translateDirective", angular.module("pascalprecht.translate").directive("translateCloak", g), g.$inject = ["$translate", "$rootScope"], g.displayName = "translateCloakDirective", angular.module("pascalprecht.translate").directive("translateNamespace", h), h.displayName = "translateNamespaceDirective", angular.module("pascalprecht.translate").directive("translateLanguage", i), i.displayName = "translateLanguageDirective", angular.module("pascalprecht.translate").filter("translate", j), j.$inject = ["$parse", "$translate"], j.displayName = "translateFilterFactory", angular.module("pascalprecht.translate").factory("$translationCache", k), k.$inject = ["$cacheFactory"], k.displayName = "$translationCache", "pascalprecht.translate" });
!function (a, b) { "function" == typeof define && define.amd ? define([], function () { return b() }) : "object" == typeof exports ? module.exports = b() : b() }(this, function () { function a(a, b) { "use strict"; return function (c) { if (!(c && (angular.isArray(c.files) || angular.isString(c.prefix) && angular.isString(c.suffix)))) throw new Error("Couldn't load static files, no files and prefix or suffix specified!"); c.files || (c.files = [{ prefix: c.prefix, suffix: c.suffix }]); for (var d = function (d) { if (!d || !angular.isString(d.prefix) || !angular.isString(d.suffix)) throw new Error("Couldn't load static file, no prefix or suffix specified!"); var e = [d.prefix, c.key, d.suffix].join(""); return angular.isObject(c.fileMap) && c.fileMap[e] && (e = c.fileMap[e]), b(angular.extend({ url: e, method: "GET", params: "" }, c.$http)).then(function (a) { return a.data }, function () { return a.reject(c.key) }) }, e = [], f = c.files.length, g = 0; g < f; g++) e.push(d({ prefix: c.files[g].prefix, key: c.key, suffix: c.files[g].suffix })); return a.all(e).then(function (a) { for (var b = a.length, c = {}, d = 0; d < b; d++) for (var e in a[d]) c[e] = a[d][e]; return c }) } } return a.$inject = ["$q", "$http"], angular.module("pascalprecht.translate").factory("$translateStaticFilesLoader", a), a.displayName = "$translateStaticFilesLoader", "pascalprecht.translate" });

//bootstrap 3.1.1
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); +function (a) { "use strict"; function b() { var a = document.createElement("bootstrap"), b = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" }; for (var c in b) if (void 0 !== a.style[c]) return { end: b[c] }; return !1 } a.fn.emulateTransitionEnd = function (b) { var c = !1, d = this; a(this).one(a.support.transition.end, function () { c = !0 }); var e = function () { c || a(d).trigger(a.support.transition.end) }; return setTimeout(e, b), this }, a(function () { a.support.transition = b() }) }(jQuery), +function (a) { "use strict"; var b = '[data-dismiss="alert"]', c = function (c) { a(c).on("click", b, this.close) }; c.prototype.close = function (b) { function c() { f.trigger("closed.bs.alert").remove() } var d = a(this), e = d.attr("data-target"); e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, "")); var f = a(e); b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one(a.support.transition.end, c).emulateTransitionEnd(150) : c()) }; var d = a.fn.alert; a.fn.alert = function (b) { return this.each(function () { var d = a(this), e = d.data("bs.alert"); e || d.data("bs.alert", e = new c(this)), "string" == typeof b && e[b].call(d) }) }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function () { return a.fn.alert = d, this }, a(document).on("click.bs.alert.data-api", b, c.prototype.close) }(jQuery), +function (a) { "use strict"; var b = function (c, d) { this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.isLoading = !1 }; b.DEFAULTS = { loadingText: "loading..." }, b.prototype.setState = function (b) { var c = "disabled", d = this.$element, e = d.is("input") ? "val" : "html", f = d.data(); b += "Text", f.resetText || d.data("resetText", d[e]()), d[e](f[b] || this.options[b]), setTimeout(a.proxy(function () { "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c)) }, this), 0) }, b.prototype.toggle = function () { var a = !0, b = this.$element.closest('[data-toggle="buttons"]'); if (b.length) { var c = this.$element.find("input"); "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change") } a && this.$element.toggleClass("active") }; var c = a.fn.button; a.fn.button = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.button"), f = "object" == typeof c && c; e || d.data("bs.button", e = new b(this, f)), "toggle" == c ? e.toggle() : c && e.setState(c) }) }, a.fn.button.Constructor = b, a.fn.button.noConflict = function () { return a.fn.button = c, this }, a(document).on("click.bs.button.data-api", "[data-toggle^=button]", function (b) { var c = a(b.target); c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle"), b.preventDefault() }) }(jQuery), +function (a) { "use strict"; var b = function (b, c) { this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this)) }; b.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0 }, b.prototype.cycle = function (b) { return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this }, b.prototype.getActiveIndex = function () { return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active) }, b.prototype.to = function (b) { var c = this, d = this.getActiveIndex(); return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () { c.to(b) }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b])) }, b.prototype.pause = function (b) { return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this }, b.prototype.next = function () { return this.sliding ? void 0 : this.slide("next") }, b.prototype.prev = function () { return this.sliding ? void 0 : this.slide("prev") }, b.prototype.slide = function (b, c) { var d = this.$element.find(".item.active"), e = c || d[b](), f = this.interval, g = "next" == b ? "left" : "right", h = "next" == b ? "first" : "last", i = this; if (!e.length) { if (!this.options.wrap) return; e = this.$element.find(".item")[h]() } if (e.hasClass("active")) return this.sliding = !1; var j = a.Event("slide.bs.carousel", { relatedTarget: e[0], direction: g }); return this.$element.trigger(j), j.isDefaultPrevented() ? void 0 : (this.sliding = !0, f && this.pause(), this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel", function () { var b = a(i.$indicators.children()[i.getActiveIndex()]); b && b.addClass("active") })), a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function () { e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function () { i.$element.trigger("slid.bs.carousel") }, 0) }).emulateTransitionEnd(1e3 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid.bs.carousel")), f && this.cycle(), this) }; var c = a.fn.carousel; a.fn.carousel = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c), g = "string" == typeof c ? c : f.slide; e || d.data("bs.carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle() }) }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function () { return a.fn.carousel = c, this }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (b) { var c, d = a(this), e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")), f = a.extend({}, e.data(), d.data()), g = d.attr("data-slide-to"); g && (f.interval = !1), e.carousel(f), (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g), b.preventDefault() }), a(window).on("load", function () { a('[data-ride="carousel"]').each(function () { var b = a(this); b.carousel(b.data()) }) }) }(jQuery), +function (a) { "use strict"; var b = function (c, d) { this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle() }; b.DEFAULTS = { toggle: !0 }, b.prototype.dimension = function () { var a = this.$element.hasClass("width"); return a ? "width" : "height" }, b.prototype.show = function () { if (!this.transitioning && !this.$element.hasClass("in")) { var b = a.Event("show.bs.collapse"); if (this.$element.trigger(b), !b.isDefaultPrevented()) { var c = this.$parent && this.$parent.find("> .panel > .in"); if (c && c.length) { var d = c.data("bs.collapse"); if (d && d.transitioning) return; c.collapse("hide"), d || c.data("bs.collapse", null) } var e = this.dimension(); this.$element.removeClass("collapse").addClass("collapsing")[e](0), this.transitioning = 1; var f = function () { this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse") }; if (!a.support.transition) return f.call(this); var g = a.camelCase(["scroll", e].join("-")); this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g]) } } }, b.prototype.hide = function () { if (!this.transitioning && this.$element.hasClass("in")) { var b = a.Event("hide.bs.collapse"); if (this.$element.trigger(b), !b.isDefaultPrevented()) { var c = this.dimension(); this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1; var d = function () { this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse") }; return a.support.transition ? void this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this) } } }, b.prototype.toggle = function () { this[this.$element.hasClass("in") ? "hide" : "show"]() }; var c = a.fn.collapse; a.fn.collapse = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.collapse"), f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c); !e && f.toggle && "show" == c && (c = !c), e || d.data("bs.collapse", e = new b(this, f)), "string" == typeof c && e[c]() }) }, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function () { return a.fn.collapse = c, this }, a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (b) { var c, d = a(this), e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""), f = a(e), g = f.data("bs.collapse"), h = g ? "toggle" : d.data(), i = d.attr("data-parent"), j = i && a(i); g && g.transitioning || (j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(d).addClass("collapsed"), d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), f.collapse(h) }) }(jQuery), +function (a) { "use strict"; function b(b) { a(d).remove(), a(e).each(function () { var d = c(a(this)), e = { relatedTarget: this }; d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e)) }) } function c(b) { var c = b.attr("data-target"); c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, "")); var d = c && a(c); return d && d.length ? d : b.parent() } var d = ".dropdown-backdrop", e = "[data-toggle=dropdown]", f = function (b) { a(b).on("click.bs.dropdown", this.toggle) }; f.prototype.toggle = function (d) { var e = a(this); if (!e.is(".disabled, :disabled")) { var f = c(e), g = f.hasClass("open"); if (b(), !g) { "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b); var h = { relatedTarget: this }; if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return; f.toggleClass("open").trigger("shown.bs.dropdown", h), e.focus() } return !1 } }, f.prototype.keydown = function (b) { if (/(38|40|27)/.test(b.keyCode)) { var d = a(this); if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) { var f = c(d), g = f.hasClass("open"); if (!g || g && 27 == b.keyCode) return 27 == b.which && f.find(e).focus(), d.click(); var h = " li:not(.divider):visible a", i = f.find("[role=menu]" + h + ", [role=listbox]" + h); if (i.length) { var j = i.index(i.filter(":focus")); 38 == b.keyCode && j > 0 && j--, 40 == b.keyCode && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).focus() } } } }; var g = a.fn.dropdown; a.fn.dropdown = function (b) { return this.each(function () { var c = a(this), d = c.data("bs.dropdown"); d || c.data("bs.dropdown", d = new f(this)), "string" == typeof b && d[b].call(c) }) }, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function () { return a.fn.dropdown = g, this }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function (a) { a.stopPropagation() }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu], [role=listbox]", f.prototype.keydown) }(jQuery), +function (a) { "use strict"; var b = function (b, c) { this.options = c, this.$element = a(b), this.$backdrop = this.isShown = null, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () { this.$element.trigger("loaded.bs.modal") }, this)) }; b.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }, b.prototype.toggle = function (a) { return this[this.isShown ? "hide" : "show"](a) }, b.prototype.show = function (b) { var c = this, d = a.Event("show.bs.modal", { relatedTarget: b }); this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () { var d = a.support.transition && c.$element.hasClass("fade"); c.$element.parent().length || c.$element.appendTo(document.body), c.$element.show().scrollTop(0), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus(); var e = a.Event("shown.bs.modal", { relatedTarget: b }); d ? c.$element.find(".modal-dialog").one(a.support.transition.end, function () { c.$element.focus().trigger(e) }).emulateTransitionEnd(300) : c.$element.focus().trigger(e) })) }, b.prototype.hide = function (b) { b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal()) }, b.prototype.enforceFocus = function () { a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) { this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus() }, this)) }, b.prototype.escape = function () { this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) { 27 == a.which && this.hide() }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal") }, b.prototype.hideModal = function () { var a = this; this.$element.hide(), this.backdrop(function () { a.removeBackdrop(), a.$element.trigger("hidden.bs.modal") }) }, b.prototype.removeBackdrop = function () { this.$backdrop && this.$backdrop.remove(), this.$backdrop = null }, b.prototype.backdrop = function (b) { var c = this.$element.hasClass("fade") ? "fade" : ""; if (this.isShown && this.options.backdrop) { var d = a.support.transition && c; if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) { a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this)) }, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return; d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b() } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b() }; var c = a.fn.modal; a.fn.modal = function (c, d) { return this.each(function () { var e = a(this), f = e.data("bs.modal"), g = a.extend({}, b.DEFAULTS, e.data(), "object" == typeof c && c); f || e.data("bs.modal", f = new b(this, g)), "string" == typeof c ? f[c](d) : g.show && f.show(d) }) }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function () { return a.fn.modal = c, this }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (b) { var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("bs.modal") ? "toggle" : a.extend({ remote: !/#/.test(d) && d }, e.data(), c.data()); c.is("a") && b.preventDefault(), e.modal(f, this).one("hide", function () { c.is(":visible") && c.focus() }) }), a(document).on("show.bs.modal", ".modal", function () { a(document.body).addClass("modal-open") }).on("hidden.bs.modal", ".modal", function () { a(document.body).removeClass("modal-open") }) }(jQuery), +function (a) { "use strict"; var b = function (a, b) { this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b) }; b.DEFAULTS = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1 }, b.prototype.init = function (b, c, d) { this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d); for (var e = this.options.trigger.split(" "), f = e.length; f--;) { var g = e[f]; if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) { var h = "hover" == g ? "mouseenter" : "focusin", i = "hover" == g ? "mouseleave" : "focusout"; this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this)) } } this.options.selector ? this._options = a.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle() }, b.prototype.getDefaults = function () { return b.DEFAULTS }, b.prototype.getOptions = function (b) { return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = { show: b.delay, hide: b.delay }), b }, b.prototype.getDelegateOptions = function () { var b = {}, c = this.getDefaults(); return this._options && a.each(this._options, function (a, d) { c[a] != d && (b[a] = d) }), b }, b.prototype.enter = function (b) { var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type); return clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () { "in" == c.hoverState && c.show() }, c.options.delay.show)) : c.show() }, b.prototype.leave = function (b) { var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type); return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () { "out" == c.hoverState && c.hide() }, c.options.delay.hide)) : c.hide() }, b.prototype.show = function () { var b = a.Event("show.bs." + this.type); if (this.hasContent() && this.enabled) { if (this.$element.trigger(b), b.isDefaultPrevented()) return; var c = this, d = this.tip(); this.setContent(), this.options.animation && d.addClass("fade"); var e = "function" == typeof this.options.placement ? this.options.placement.call(this, d[0], this.$element[0]) : this.options.placement, f = /\s?auto?\s?/i, g = f.test(e); g && (e = e.replace(f, "") || "top"), d.detach().css({ top: 0, left: 0, display: "block" }).addClass(e), this.options.container ? d.appendTo(this.options.container) : d.insertAfter(this.$element); var h = this.getPosition(), i = d[0].offsetWidth, j = d[0].offsetHeight; if (g) { var k = this.$element.parent(), l = e, m = document.documentElement.scrollTop || document.body.scrollTop, n = "body" == this.options.container ? window.innerWidth : k.outerWidth(), o = "body" == this.options.container ? window.innerHeight : k.outerHeight(), p = "body" == this.options.container ? 0 : k.offset().left; e = "bottom" == e && h.top + h.height + j - m > o ? "top" : "top" == e && h.top - m - j < 0 ? "bottom" : "right" == e && h.right + i > n ? "left" : "left" == e && h.left - i < p ? "right" : e, d.removeClass(l).addClass(e) } var q = this.getCalculatedOffset(e, h, i, j); this.applyPlacement(q, e), this.hoverState = null; var r = function () { c.$element.trigger("shown.bs." + c.type) }; a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, r).emulateTransitionEnd(150) : r() } }, b.prototype.applyPlacement = function (b, c) { var d, e = this.tip(), f = e[0].offsetWidth, g = e[0].offsetHeight, h = parseInt(e.css("margin-top"), 10), i = parseInt(e.css("margin-left"), 10); isNaN(h) && (h = 0), isNaN(i) && (i = 0), b.top = b.top + h, b.left = b.left + i, a.offset.setOffset(e[0], a.extend({ using: function (a) { e.css({ top: Math.round(a.top), left: Math.round(a.left) }) } }, b), 0), e.addClass("in"); var j = e[0].offsetWidth, k = e[0].offsetHeight; if ("top" == c && k != g && (d = !0, b.top = b.top + g - k), /bottom|top/.test(c)) { var l = 0; b.left < 0 && (l = -2 * b.left, b.left = 0, e.offset(b), j = e[0].offsetWidth, k = e[0].offsetHeight), this.replaceArrow(l - f + j, j, "left") } else this.replaceArrow(k - g, k, "top"); d && e.offset(b) }, b.prototype.replaceArrow = function (a, b, c) { this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "") }, b.prototype.setContent = function () { var a = this.tip(), b = this.getTitle(); a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right") }, b.prototype.hide = function () { function b() { "in" != c.hoverState && d.detach(), c.$element.trigger("hidden.bs." + c.type) } var c = this, d = this.tip(), e = a.Event("hide.bs." + this.type); return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), this.hoverState = null, this) }, b.prototype.fixTitle = function () { var a = this.$element; (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "") }, b.prototype.hasContent = function () { return this.getTitle() }, b.prototype.getPosition = function () { var b = this.$element[0]; return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : { width: b.offsetWidth, height: b.offsetHeight }, this.$element.offset()) }, b.prototype.getCalculatedOffset = function (a, b, c, d) { return "bottom" == a ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 } : "top" == a ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 } : "left" == a ? { top: b.top + b.height / 2 - d / 2, left: b.left - c } : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width } }, b.prototype.getTitle = function () { var a, b = this.$element, c = this.options; return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title) }, b.prototype.tip = function () { return this.$tip = this.$tip || a(this.options.template) }, b.prototype.arrow = function () { return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow") }, b.prototype.validate = function () { this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null) }, b.prototype.enable = function () { this.enabled = !0 }, b.prototype.disable = function () { this.enabled = !1 }, b.prototype.toggleEnabled = function () { this.enabled = !this.enabled }, b.prototype.toggle = function (b) { var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this; c.tip().hasClass("in") ? c.leave(c) : c.enter(c) }, b.prototype.destroy = function () { clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type) }; var c = a.fn.tooltip; a.fn.tooltip = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof c && c; (e || "destroy" != c) && (e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]()) }) }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function () { return a.fn.tooltip = c, this } }(jQuery), +function (a) { "use strict"; var b = function (a, b) { this.init("popover", a, b) }; if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js"); b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, { placement: "right", trigger: "click", content: "", template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, b.prototype.getDefaults = function () { return b.DEFAULTS }, b.prototype.setContent = function () { var a = this.tip(), b = this.getTitle(), c = this.getContent(); a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide() }, b.prototype.hasContent = function () { return this.getTitle() || this.getContent() }, b.prototype.getContent = function () { var a = this.$element, b = this.options; return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content) }, b.prototype.arrow = function () { return this.$arrow = this.$arrow || this.tip().find(".arrow") }, b.prototype.tip = function () { return this.$tip || (this.$tip = a(this.options.template)), this.$tip }; var c = a.fn.popover; a.fn.popover = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.popover"), f = "object" == typeof c && c; (e || "destroy" != c) && (e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]()) }) }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function () { return a.fn.popover = c, this } }(jQuery), +function (a) { "use strict"; function b(c, d) { var e, f = a.proxy(this.process, this); this.$element = a(a(c).is("body") ? window : c), this.$body = a("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = a([]), this.targets = a([]), this.activeTarget = null, this.refresh(), this.process() } b.DEFAULTS = { offset: 10 }, b.prototype.refresh = function () { var b = this.$element[0] == window ? "offset" : "position"; this.offsets = a([]), this.targets = a([]); { var c = this; this.$body.find(this.selector).map(function () { var d = a(this), e = d.data("target") || d.attr("href"), f = /^#./.test(e) && a(e); return f && f.length && f.is(":visible") && [[f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]] || null }).sort(function (a, b) { return a[0] - b[0] }).each(function () { c.offsets.push(this[0]), c.targets.push(this[1]) }) } }, b.prototype.process = function () { var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, d = c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget; if (b >= d) return g != (a = f.last()[0]) && this.activate(a); if (g && b <= e[0]) return g != (a = f[0]) && this.activate(a); for (a = e.length; a--;) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a]) }, b.prototype.activate = function (b) { this.activeTarget = b, a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active"); var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active"); d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy") }; var c = a.fn.scrollspy; a.fn.scrollspy = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c; e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]() }) }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () { return a.fn.scrollspy = c, this }, a(window).on("load", function () { a('[data-spy="scroll"]').each(function () { var b = a(this); b.scrollspy(b.data()) }) }) }(jQuery), +function (a) { "use strict"; var b = function (b) { this.element = a(b) }; b.prototype.show = function () { var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.data("target"); if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) { var e = c.find(".active:last a")[0], f = a.Event("show.bs.tab", { relatedTarget: e }); if (b.trigger(f), !f.isDefaultPrevented()) { var g = a(d); this.activate(b.parent("li"), c), this.activate(g, g.parent(), function () { b.trigger({ type: "shown.bs.tab", relatedTarget: e }) }) } } }, b.prototype.activate = function (b, c, d) { function e() { f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d() } var f = c.find("> .active"), g = d && a.support.transition && f.hasClass("fade"); g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), f.removeClass("in") }; var c = a.fn.tab; a.fn.tab = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.tab"); e || d.data("bs.tab", e = new b(this)), "string" == typeof c && e[c]() }) }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function () { return a.fn.tab = c, this }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (b) { b.preventDefault(), a(this).tab("show") }) }(jQuery), +function (a) { "use strict"; var b = function (c, d) { this.options = a.extend({}, b.DEFAULTS, d), this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(c), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition() }; b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = { offset: 0 }, b.prototype.getPinnedOffset = function () { if (this.pinnedOffset) return this.pinnedOffset; this.$element.removeClass(b.RESET).addClass("affix"); var a = this.$window.scrollTop(), c = this.$element.offset(); return this.pinnedOffset = c.top - a }, b.prototype.checkPositionWithEventLoop = function () { setTimeout(a.proxy(this.checkPosition, this), 1) }, b.prototype.checkPosition = function () { if (this.$element.is(":visible")) { var c = a(document).height(), d = this.$window.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.top, h = f.bottom; "top" == this.affixed && (e.top += d), "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top(this.$element)), "function" == typeof h && (h = f.bottom(this.$element)); var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1; if (this.affixed !== i) { this.unpin && this.$element.css("top", ""); var j = "affix" + (i ? "-" + i : ""), k = a.Event(j + ".bs.affix"); this.$element.trigger(k), k.isDefaultPrevented() || (this.affixed = i, this.unpin = "bottom" == i ? this.getPinnedOffset() : null, this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))), "bottom" == i && this.$element.offset({ top: c - h - this.$element.height() })) } } }; var c = a.fn.affix; a.fn.affix = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.affix"), f = "object" == typeof c && c; e || d.data("bs.affix", e = new b(this, f)), "string" == typeof c && e[c]() }) }, a.fn.affix.Constructor = b, a.fn.affix.noConflict = function () { return a.fn.affix = c, this }, a(window).on("load", function () { a('[data-spy="affix"]').each(function () { var b = a(this), c = b.data(); c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c) }) }) }(jQuery);


//jq form validator
!function (a, b) { "function" == typeof define && define.amd ? define(["jquery"], function (a) { return b(a) }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery) }(this, function (a) { !function (a, b) { "use strict"; function c(b) { b && "custom" === b.errorMessagePosition && "function" == typeof b.errorMessageCustom && (a.formUtils.warn("Use of deprecated function errorMessageCustom, use config.submitErrorMessageCallback instead"), b.submitErrorMessageCallback = function (a, c) { b.errorMessageCustom(a, b.language.errorTitle, c, b) }) } function d(b) { if (b.errorMessagePosition && "object" == typeof b.errorMessagePosition) { a.formUtils.warn("Deprecated use of config parameter errorMessagePosition, use config.submitErrorMessageCallback instead"); var c = b.errorMessagePosition; b.errorMessagePosition = "top", b.submitErrorMessageCallback = function () { return c } } } function e(b) { var c = b.find("[data-validation-if-checked]"); c.length && a.formUtils.warn('Detected use of attribute "data-validation-if-checked" which is deprecated. Use "data-validation-depends-on" provided by module "logic"'), c.on("beforeValidation", function () { var c = a(this), d = c.valAttr("if-checked"), e = a('input[name="' + d + '"]', b), f = e.is(":checked"), g = (a.formUtils.getValue(e) || "").toString(), h = c.valAttr("if-checked-value"); (!f || h && h !== g) && c.valAttr("skipped", !0) }) } a.fn.validateForm = function (b, c) { return a.formUtils.warn("Use of deprecated function $.validateForm, use $.isValid instead"), this.isValid(b, c, !0) }, a(window).on("validatorsLoaded formValidationSetup", function (b, f, g) { f || (f = a("form")), c(g), d(g), e(f) }) }(a), function (a) { "use strict"; var b = { resolveErrorMessage: function (a, b, c, d, e) { var f = d.validationErrorMsgAttribute + "-" + c.replace("validate_", ""), g = a.attr(f); return g || (g = a.attr(d.validationErrorMsgAttribute), g || (g = "function" != typeof b.errorMessageKey ? e[b.errorMessageKey] : e[b.errorMessageKey(d)], g || (g = b.errorMessage))), g }, getParentContainer: function (b) { if (b.valAttr("error-msg-container")) return a(b.valAttr("error-msg-container")); var c = b.parent(); if (!c.hasClass("form-group") && !c.closest("form").hasClass("form-horizontal")) { var d = c.closest(".form-group"); if (d.length) return d.eq(0) } return c }, applyInputErrorStyling: function (a, b) { a.addClass(b.errorElementClass).removeClass("valid"), this.getParentContainer(a).addClass(b.inputParentClassOnError).removeClass(b.inputParentClassOnSuccess), "" !== b.borderColorOnError && a.css("border-color", b.borderColorOnError) }, applyInputSuccessStyling: function (a, b) { a.addClass("valid"), this.getParentContainer(a).addClass(b.inputParentClassOnSuccess) }, removeInputStylingAndMessage: function (a, c) { a.removeClass("valid").removeClass(c.errorElementClass).css("border-color", ""); var d = b.getParentContainer(a); if (d.removeClass(c.inputParentClassOnError).removeClass(c.inputParentClassOnSuccess), "function" == typeof c.inlineErrorMessageCallback) { var e = c.inlineErrorMessageCallback(a, !1, c); e && e.html("") } else d.find("." + c.errorMessageClass).remove() }, removeAllMessagesAndStyling: function (c, d) { if ("function" == typeof d.submitErrorMessageCallback) { var e = d.submitErrorMessageCallback(c, d); e && e.html("") } else c.find("." + d.errorMessageClass + ".alert").remove(); c.find("." + d.errorElementClass + ",.valid").each(function () { b.removeInputStylingAndMessage(a(this), d) }) }, setInlineMessage: function (b, c, d) { this.applyInputErrorStyling(b, d); var e, f = document.getElementById(b.attr("name") + "_err_msg"), g = !1, h = function (d) { a.formUtils.$win.trigger("validationErrorDisplay", [b, d]), d.html(c) }, i = function () { var f = !1; g.find("." + d.errorMessageClass).each(function () { if (this.inputReferer === b[0]) return f = a(this), !1 }), f ? c ? h(f) : f.remove() : "" !== c && (e = a('<div class="' + d.errorMessageClass + ' alert"></div>'), h(e), e[0].inputReferer = b[0], g.prepend(e)) }; if (f) a.formUtils.warn("Using deprecated element reference " + f.id), g = a(f), i(); else if ("function" == typeof d.inlineErrorMessageCallback) { if (g = d.inlineErrorMessageCallback(b, c, d), !g) return; i() } else { var j = this.getParentContainer(b); e = j.find("." + d.errorMessageClass + ".help-block"), 0 === e.length && (e = a("<span></span>").addClass("help-block").addClass(d.errorMessageClass), e.appendTo(j)), h(e) } }, setMessageInTopOfForm: function (b, c, d, e) { var f = '<div class="{errorMessageClass} alert alert-danger"><strong>{errorTitle}</strong><ul>{fields}</ul></div>', g = !1; if ("function" != typeof d.submitErrorMessageCallback || (g = d.submitErrorMessageCallback(b, c, d))) { var h = { errorTitle: e.errorTitle, fields: "", errorMessageClass: d.errorMessageClass }; a.each(c, function (a, b) { h.fields += "<li>" + b + "</li>" }), a.each(h, function (a, b) { f = f.replace("{" + a + "}", b) }), g ? g.html(f) : b.children().eq(0).before(a(f)) } } }; a.formUtils = a.extend(a.formUtils || {}, { dialogs: b }) }(a), function (a, b, c) { "use strict"; var d = 0; a.fn.validateOnBlur = function (b, c) { var d = this, e = this.find("*[data-validation]"); return e.each(function () { var e = a(this); if (e.is("[type=radio]")) { var f = d.find('[type=radio][name="' + e.attr("name") + '"]'); f.bind("blur.validation", function () { e.validateInputOnBlur(b, c, !0, "blur") }), c.validateCheckboxRadioOnClick && f.bind("click.validation", function () { e.validateInputOnBlur(b, c, !0, "click") }) } }), e.bind("blur.validation", function () { a(this).validateInputOnBlur(b, c, !0, "blur") }), c.validateCheckboxRadioOnClick && this.find("input[type=checkbox][data-validation],input[type=radio][data-validation]").bind("click.validation", function () { a(this).validateInputOnBlur(b, c, !0, "click") }), this }, a.fn.validateOnEvent = function (b, c) { var d = "FORM" === this[0].nodeName ? this.find("*[data-validation-event]") : this; return d.each(function () { var d = a(this), e = d.valAttr("event"); e && d.unbind(e + ".validation").bind(e + ".validation", function (d) { 9 !== (d || {}).keyCode && a(this).validateInputOnBlur(b, c, !0, e) }) }), this }, a.fn.showHelpOnFocus = function (b) { return b || (b = "data-validation-help"), this.find("textarea,input").each(function () { var c = a(this), e = "jquery_form_help_" + ++d, f = c.attr(b); c.removeClass("has-help-text").unbind("focus.help").unbind("blur.help"), f && c.addClass("has-help-txt").bind("focus.help", function () { var b = c.parent().find("." + e); 0 === b.length && (b = a("<span />").addClass(e).addClass("help").addClass("help-block").text(f).hide(), c.after(b)), b.fadeIn() }).bind("blur.help", function () { a(this).parent().find("." + e).fadeOut("slow") }) }), this }, a.fn.validate = function (b, c, d) { var e = a.extend({}, a.formUtils.LANG, d || {}); this.each(function () { var d = a(this), f = d.closest("form").get(0).validationConfig || {}; d.one("validation", function (a, c) { "function" == typeof b && b(c, this, a) }), d.validateInputOnBlur(e, a.extend({}, f, c || {}), !0) }) }, a.fn.willPostponeValidation = function () { return (this.valAttr("suggestion-nr") || this.valAttr("postpone") || this.hasClass("hasDatepicker")) && !b.postponedValidation }, a.fn.validateInputOnBlur = function (c, d, e, f) { if (a.formUtils.eventType = f, this.willPostponeValidation()) { var g = this, h = this.valAttr("postpone") || 200; return b.postponedValidation = function () { g.validateInputOnBlur(c, d, e, f), b.postponedValidation = !1 }, setTimeout(function () { b.postponedValidation && b.postponedValidation() }, h), this } c = a.extend({}, a.formUtils.LANG, c || {}), a.formUtils.dialogs.removeInputStylingAndMessage(this, d); var i = this, j = i.closest("form"), k = a.formUtils.validateInput(i, c, d, j, f); return e && i.removeKeyUpValidation(), k.shouldChangeDisplay && (k.isValid ? a.formUtils.dialogs.applyInputSuccessStyling(i, d) : a.formUtils.dialogs.setInlineMessage(i, k.errorMsg, d)), !k.isValid && e && i.validateOnKeyUp(c, d), this }, a.fn.validateOnKeyUp = function (b, c) { return this.each(function () { var d = a(this); d.valAttr("has-keyup-event") || d.valAttr("has-keyup-event", "true").bind("keyup.validation", function (a) { 9 !== a.keyCode && d.validateInputOnBlur(b, c, !1, "keyup") }) }), this }, a.fn.removeKeyUpValidation = function () { return this.each(function () { a(this).valAttr("has-keyup-event", !1).unbind("keyup.validation") }), this }, a.fn.valAttr = function (a, b) { return b === c ? this.attr("data-validation-" + a) : b === !1 || null === b ? this.removeAttr("data-validation-" + a) : (a = a.length > 0 ? "-" + a : "", this.attr("data-validation" + a, b)) }, a.fn.isValid = function (b, c, d) { if (a.formUtils.isLoadingModules) { var e = this; return setTimeout(function () { e.isValid(b, c, d) }, 200), null } c = a.extend({}, a.formUtils.defaultConfig(), c || {}), b = a.extend({}, a.formUtils.LANG, b || {}), d = d !== !1, a.formUtils.errorDisplayPreventedWhenHalted && (delete a.formUtils.errorDisplayPreventedWhenHalted, d = !1), a.formUtils.isValidatingEntireForm = !0, a.formUtils.haltValidation = !1; var f = function (b, e) { a.inArray(b, h) < 0 && h.push(b), i.push(e), e.attr("current-error", b), d && a.formUtils.dialogs.applyInputErrorStyling(e, c) }, g = [], h = [], i = [], j = this, k = function (b, d) { return "submit" === d || "button" === d || "reset" === d || a.inArray(b, c.ignore || []) > -1 }; if (d && a.formUtils.dialogs.removeAllMessagesAndStyling(j, c), j.find("input,textarea,select").filter(':not([type="submit"],[type="button"])').each(function () { var d = a(this), e = d.attr("type"), h = "radio" === e || "checkbox" === e, i = d.attr("name"); if (!k(i, e) && (!h || a.inArray(i, g) < 0)) { h && g.push(i); var l = a.formUtils.validateInput(d, b, c, j, "submit"); l.isValid ? l.isValid && l.shouldChangeDisplay && (d.valAttr("current-error", !1), a.formUtils.dialogs.applyInputSuccessStyling(d, c)) : f(l.errorMsg, d) } }), "function" == typeof c.onValidate) { var l = c.onValidate(j); a.isArray(l) ? a.each(l, function (a, b) { f(b.message, b.element) }) : l && l.element && l.message && f(l.message, l.element) } return a.formUtils.isValidatingEntireForm = !1, !a.formUtils.haltValidation && i.length > 0 ? (d && ("top" === c.errorMessagePosition ? a.formUtils.dialogs.setMessageInTopOfForm(j, h, c, b) : a.each(i, function (b, d) { a.formUtils.dialogs.setInlineMessage(d, d.attr("current-error"), c) }), c.scrollToTopOnError && a.formUtils.$win.scrollTop(j.offset().top - 20)), !1) : (!d && a.formUtils.haltValidation && (a.formUtils.errorDisplayPreventedWhenHalted = !0), !a.formUtils.haltValidation) }, a.fn.restrictLength = function (b) { return new a.formUtils.lengthRestriction(this, b), this }, a.fn.addSuggestions = function (b) { var c = !1; return this.find("input").each(function () { var d = a(this); c = a.split(d.attr("data-suggestions")), c.length > 0 && !d.hasClass("has-suggestions") && (a.formUtils.suggest(d, c, b), d.addClass("has-suggestions")) }), this } }(a, window), function (a) { "use strict"; a.formUtils = a.extend(a.formUtils || {}, { isLoadingModules: !1, loadedModules: {}, loadModules: function (b, c, d) { if (a.formUtils.isLoadingModules) return void setTimeout(function () { a.formUtils.loadModules(b, c, d) }, 10); var e = !1, f = function (b, c) { var f = a.split(b), g = f.length, h = function () { g--, 0 === g && (a.formUtils.isLoadingModules = !1, d && e && "function" == typeof d && d()) }; g > 0 && (a.formUtils.isLoadingModules = !0); var i = "?_=" + (new Date).getTime(), j = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]; a.each(f, function (b, d) { if (d = a.trim(d), 0 === d.length) h(); else { var f = c + d + (".js" === d.slice(-3) ? "" : ".js"), g = document.createElement("SCRIPT"); f in a.formUtils.loadedModules ? h() : (a.formUtils.loadedModules[f] = 1, e = !0, g.type = "text/javascript", g.onload = h, g.src = f + (".dev.js" === f.slice(-7) ? i : ""), g.onerror = function () { a.formUtils.warn("Unable to load form validation module " + f) }, g.onreadystatechange = function () { "complete" !== this.readyState && "loaded" !== this.readyState || (h(), this.onload = null, this.onreadystatechange = null) }, j.appendChild(g)) } }) }; if (c) f(b, c); else { var g = function () { var c = !1; return a('script[src*="form-validator"]').each(function () { var a = this.src.split("form-validator")[1].split("node_modules").length > 1; if (!a) return c = this.src.substr(0, this.src.lastIndexOf("/")) + "/", "/" === c && (c = ""), !1 }), c !== !1 && (f(b, c), !0) }; g() || a(g) } } }) }(a), function (a) { "use strict"; a.split = function (b, c, d) { d = void 0 === d || d === !0; var e = "[,|-" + (d ? "\\s" : "") + "]\\s*", f = new RegExp(e, "g"); if ("function" != typeof c) { if (!b) return []; var g = []; return a.each(b.split(c ? c : f), function (b, c) { c = a.trim(c), c.length && g.push(c) }), g } b && a.each(b.split(f), function (b, d) { if (d = a.trim(d), d.length) return c(d, b) }) }, a.validate = function (b) { var c = a.extend(a.formUtils.defaultConfig(), { form: "form", validateOnEvent: !1, validateOnBlur: !0, validateCheckboxRadioOnClick: !0, showHelpOnFocus: !0, addSuggestions: !0, modules: "", onModulesLoaded: null, language: !1, onSuccess: !1, onError: !1, onElementValidate: !1 }); if (b = a.extend(c, b || {}), b.lang && "en" !== b.lang) { var d = "lang/" + b.lang + ".js"; b.modules += b.modules.length ? "," + d : d } a(b.form).each(function (c, d) { d.validationConfig = b; var e = a(d); e.trigger("formValidationSetup", [e, b]), e.find(".has-help-txt").unbind("focus.validation").unbind("blur.validation"), e.removeClass("has-validation-callback").unbind("submit.validation").unbind("reset.validation").find("input[data-validation],textarea[data-validation]").unbind("blur.validation"), e.bind("submit.validation", function (c) { var d = a(this), e = function () { return c.stopImmediatePropagation(), !1 }; if (a.formUtils.haltValidation) return e(); if (a.formUtils.isLoadingModules) return setTimeout(function () { d.trigger("submit.validation") }, 200), e(); var f = d.isValid(b.language, b); if (a.formUtils.haltValidation) return e(); if (!f || "function" != typeof b.onSuccess) return f || "function" != typeof b.onError ? !!f || e() : (b.onError(d), e()); var g = b.onSuccess(d); return g === !1 ? e() : void 0 }).bind("reset.validation", function () { a.formUtils.dialogs.removeAllMessagesAndStyling(e, b) }).addClass("has-validation-callback"), b.showHelpOnFocus && e.showHelpOnFocus(), b.addSuggestions && e.addSuggestions(), b.validateOnBlur && (e.validateOnBlur(b.language, b), e.bind("html5ValidationAttrsFound", function () { e.validateOnBlur(b.language, b) })), b.validateOnEvent && e.validateOnEvent(b.language, b) }), "" !== b.modules && a.formUtils.loadModules(b.modules, !1, function () { "function" == typeof b.onModulesLoaded && b.onModulesLoaded(); var c = "string" == typeof b.form ? a(b.form) : b.form; a.formUtils.$win.trigger("validatorsLoaded", [c, b]) }) } }(a), function (a, b) { "use strict"; var c = a(b); a.formUtils = a.extend(a.formUtils || {}, { $win: c, defaultConfig: function () { return { ignore: [], errorElementClass: "error", borderColorOnError: "#b94a48", errorMessageClass: "form-error", validationRuleAttribute: "data-validation", validationErrorMsgAttribute: "data-validation-error-msg", errorMessagePosition: "inline", errorMessageTemplate: { container: '<div class="{errorMessageClass} alert alert-danger">{messages}</div>', messages: "<strong>{errorTitle}</strong><ul>{fields}</ul>", field: "<li>{msg}</li>" }, scrollToTopOnError: !0, dateFormat: "yyyy-mm-dd", addValidClassOnAll: !1, decimalSeparator: ".", inputParentClassOnError: "has-error", inputParentClassOnSuccess: "has-success", validateHiddenInputs: !1, inlineErrorMessageCallback: !1, submitErrorMessageCallback: !1 } }, validators: {}, _events: { load: [], valid: [], invalid: [] }, haltValidation: !1, isValidatingEntireForm: !1, addValidator: function (a) { var b = 0 === a.name.indexOf("validate_") ? a.name : "validate_" + a.name; void 0 === a.validateOnKeyUp && (a.validateOnKeyUp = !0), this.validators[b] = a }, warn: function (a) { "console" in b ? "function" == typeof b.console.warn ? b.console.warn(a) : "function" == typeof b.console.log && b.console.log(a) : alert(a) }, getValue: function (a, b) { var c = b ? b.find(a) : a; if (c.length > 0) { var d = c.eq(0).attr("type"); return "radio" === d || "checkbox" === d ? c.filter(":checked").val() || "" : c.val() || "" } return !1 }, validateInput: function (b, c, d, e, f) { d = d || a.formUtils.defaultConfig(), c = c || a.formUtils.LANG; var g = this.getValue(b); b.valAttr("skipped", !1).one("beforeValidation", function () { (b.attr("disabled") || !b.is(":visible") && !d.validateHiddenInputs) && b.valAttr("skipped", 1) }).trigger("beforeValidation", [g, d, c]); var h = "true" === b.valAttr("optional"), i = !g && h, j = b.attr(d.validationRuleAttribute), k = !0, l = "", m = { isValid: !0, shouldChangeDisplay: !0, errorMsg: "" }; if (!j || i || b.valAttr("skipped")) return m.shouldChangeDisplay = d.addValidClassOnAll, m; var n = b.valAttr("ignore"); return n && a.each(n.split(""), function (a, b) { g = g.replace(new RegExp("\\" + b, "g"), "") }), a.split(j, function (h) { 0 !== h.indexOf("validate_") && (h = "validate_" + h); var i = a.formUtils.validators[h]; if (!i) throw new Error('Using undefined validator "' + h + '". Maybe you have forgotten to load the module that "' + h + '" belongs to?'); if ("validate_checkbox_group" === h && (b = e.find('[name="' + b.attr("name") + '"]:eq(0)')), ("keyup" !== f || i.validateOnKeyUp) && (k = i.validatorFunction(g, b, d, c, e)), !k) return d.validateOnBlur && b.validateOnKeyUp(c, d), l = a.formUtils.dialogs.resolveErrorMessage(b, i, h, d, c), !1 }), k === !1 ? (b.trigger("validation", !1), m.errorMsg = l, m.isValid = !1, m.shouldChangeDisplay = !0) : null === k ? m.shouldChangeDisplay = !1 : (b.trigger("validation", !0), m.shouldChangeDisplay = !0), "function" == typeof d.onElementValidate && null !== l && d.onElementValidate(m.isValid, b, e, l), b.trigger("afterValidation", [m, f]), m }, parseDate: function (b, c, d) { var e, f, g, h, i = c.replace(/[a-zA-Z]/gi, "").substring(0, 1), j = "^", k = c.split(i || null); if (a.each(k, function (a, b) { j += (a > 0 ? "\\" + i : "") + "(\\d{" + b.length + "})" }), j += "$", d) { var l = []; a.each(b.split(i), function (a, b) { 1 === b.length && (b = "0" + b), l.push(b) }), b = l.join(i) } if (e = b.match(new RegExp(j)), null === e) return !1; var m = function (b, c, d) { for (var e = 0; e < c.length; e++) if (c[e].substring(0, 1) === b) return a.formUtils.parseDateInt(d[e + 1]); return -1 }; return g = m("m", k, e), f = m("d", k, e), h = m("y", k, e), !(2 === g && f > 28 && (h % 4 !== 0 || h % 100 === 0 && h % 400 !== 0) || 2 === g && f > 29 && (h % 4 === 0 || h % 100 !== 0 && h % 400 === 0) || g > 12 || 0 === g) && (!(this.isShortMonth(g) && f > 30 || !this.isShortMonth(g) && f > 31 || 0 === f) && [h, g, f]) }, parseDateInt: function (a) { return 0 === a.indexOf("0") && (a = a.replace("0", "")), parseInt(a, 10) }, isShortMonth: function (a) { return a % 2 === 0 && a < 7 || a % 2 !== 0 && a > 7 }, lengthRestriction: function (b, c) { var d = parseInt(c.text(), 10), e = 0, f = function () { var a = b.val().length; if (a > d) { var f = b.scrollTop(); b.val(b.val().substring(0, d)), b.scrollTop(f) } e = d - a, e < 0 && (e = 0), c.text(e) }; a(b).bind("keydown keyup keypress focus blur", f).bind("cut paste", function () { setTimeout(f, 100) }), a(document).bind("ready", f) }, numericRangeCheck: function (b, c) { var d = a.split(c), e = parseInt(c.substr(3), 10); return 1 === d.length && c.indexOf("min") === -1 && c.indexOf("max") === -1 && (d = [c, c]), 2 === d.length && (b < parseInt(d[0], 10) || b > parseInt(d[1], 10)) ? ["out", d[0], d[1]] : 0 === c.indexOf("min") && b < e ? ["min", e] : 0 === c.indexOf("max") && b > e ? ["max", e] : ["ok"] }, _numSuggestionElements: 0, _selectedSuggestion: null, _previousTypedVal: null, suggest: function (b, d, e) { var f = { css: { maxHeight: "150px", background: "#FFF", lineHeight: "150%", textDecoration: "underline", overflowX: "hidden", overflowY: "auto", border: "#CCC solid 1px", borderTop: "none", cursor: "pointer" }, activeSuggestionCSS: { background: "#E9E9E9" } }, g = function (a, b) { var c = b.offset(); a.css({ width: b.outerWidth(), left: c.left + "px", top: c.top + b.outerHeight() + "px" }) }; e && a.extend(f, e), f.css.position = "absolute", f.css["z-index"] = 9999, b.attr("autocomplete", "off"), 0 === this._numSuggestionElements && c.bind("resize", function () { a(".jquery-form-suggestions").each(function () { var b = a(this), c = b.attr("data-suggest-container"); g(b, a(".suggestions-" + c).eq(0)) }) }), this._numSuggestionElements++; var h = function (b) { var c = b.valAttr("suggestion-nr"); a.formUtils._selectedSuggestion = null, a.formUtils._previousTypedVal = null, a(".jquery-form-suggestion-" + c).fadeOut("fast") }; return b.data("suggestions", d).valAttr("suggestion-nr", this._numSuggestionElements).unbind("focus.suggest").bind("focus.suggest", function () { a(this).trigger("keyup"), a.formUtils._selectedSuggestion = null }).unbind("keyup.suggest").bind("keyup.suggest", function () { var c = a(this), d = [], e = a.trim(c.val()).toLocaleLowerCase(); if (e !== a.formUtils._previousTypedVal) { a.formUtils._previousTypedVal = e; var i = !1, j = c.valAttr("suggestion-nr"), k = a(".jquery-form-suggestion-" + j); if (k.scrollTop(0), "" !== e) { var l = e.length > 2; a.each(c.data("suggestions"), function (a, b) { var c = b.toLocaleLowerCase(); return c === e ? (d.push("<strong>" + b + "</strong>"), i = !0, !1) : void ((0 === c.indexOf(e) || l && c.indexOf(e) > -1) && d.push(b.replace(new RegExp(e, "gi"), "<strong>$&</strong>"))) }) } i || 0 === d.length && k.length > 0 ? k.hide() : d.length > 0 && 0 === k.length ? (k = a("<div></div>").css(f.css).appendTo("body"), b.addClass("suggestions-" + j), k.attr("data-suggest-container", j).addClass("jquery-form-suggestions").addClass("jquery-form-suggestion-" + j)) : d.length > 0 && !k.is(":visible") && k.show(), d.length > 0 && e.length !== d[0].length && (g(k, c), k.html(""), a.each(d, function (b, d) { a("<div></div>").append(d).css({ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "5px" }).addClass("form-suggest-element").appendTo(k).click(function () { c.focus(), c.val(a(this).text()), c.trigger("change"), h(c) }) })) } }).unbind("keydown.validation").bind("keydown.validation", function (b) { var c, d, e = b.keyCode ? b.keyCode : b.which, g = a(this); if (13 === e && null !== a.formUtils._selectedSuggestion) { if (c = g.valAttr("suggestion-nr"), d = a(".jquery-form-suggestion-" + c), d.length > 0) { var i = d.find("div").eq(a.formUtils._selectedSuggestion).text(); g.val(i), g.trigger("change"), h(g), b.preventDefault() } } else { c = g.valAttr("suggestion-nr"), d = a(".jquery-form-suggestion-" + c); var j = d.children(); if (j.length > 0 && a.inArray(e, [38, 40]) > -1) { 38 === e ? (null === a.formUtils._selectedSuggestion ? a.formUtils._selectedSuggestion = j.length - 1 : a.formUtils._selectedSuggestion--, a.formUtils._selectedSuggestion < 0 && (a.formUtils._selectedSuggestion = j.length - 1)) : 40 === e && (null === a.formUtils._selectedSuggestion ? a.formUtils._selectedSuggestion = 0 : a.formUtils._selectedSuggestion++, a.formUtils._selectedSuggestion > j.length - 1 && (a.formUtils._selectedSuggestion = 0)); var k = d.innerHeight(), l = d.scrollTop(), m = d.children().eq(0).outerHeight(), n = m * a.formUtils._selectedSuggestion; return (n < l || n > l + k) && d.scrollTop(n), j.removeClass("active-suggestion").css("background", "none").eq(a.formUtils._selectedSuggestion).addClass("active-suggestion").css(f.activeSuggestionCSS), b.preventDefault(), !1 } } }).unbind("blur.suggest").bind("blur.suggest", function () { h(a(this)) }), b }, LANG: { errorTitle: "Form submission failed!", requiredField: "This is a required field", requiredFields: "You have not answered all required fields", badTime: "You have not given a correct time", badEmail: "You have not given a correct e-mail address", badTelephone: "You have not given a correct phone number", badSecurityAnswer: "You have not given a correct answer to the security question", badDate: "You have not given a correct date", lengthBadStart: "The input value must be between ", lengthBadEnd: " characters", lengthTooLongStart: "The input value is longer than ", lengthTooShortStart: "The input value is shorter than ", notConfirmed: "Input values could not be confirmed", badDomain: "Incorrect domain value", badUrl: "The input value is not a correct URL", badCustomVal: "The input value is incorrect", andSpaces: " and spaces ", badInt: "The input value was not a correct number", badSecurityNumber: "Your social security number was incorrect", badUKVatAnswer: "Incorrect UK VAT Number", badUKNin: "Incorrect UK NIN", badUKUtr: "Incorrect UK UTR Number", badStrength: "The password isn't strong enough", badNumberOfSelectedOptionsStart: "You have to choose at least ", badNumberOfSelectedOptionsEnd: " answers", badAlphaNumeric: "The input value can only contain alphanumeric characters ", badAlphaNumericExtra: " and ", wrongFileSize: "The file you are trying to upload is too large (max %s)", wrongFileType: "Only files of type %s is allowed", groupCheckedRangeStart: "Please choose between ", groupCheckedTooFewStart: "Please choose at least ", groupCheckedTooManyStart: "Please choose a maximum of ", groupCheckedEnd: " item(s)", badCreditCard: "The credit card number is not correct", badCVV: "The CVV number was not correct", wrongFileDim: "Incorrect image dimensions,", imageTooTall: "the image can not be taller than", imageTooWide: "the image can not be wider than", imageTooSmall: "the image was too small", min: "min", max: "max", imageRatioNotAccepted: "Image ratio is not be accepted", badBrazilTelephoneAnswer: "The phone number entered is invalid", badBrazilCEPAnswer: "The CEP entered is invalid", badBrazilCPFAnswer: "The CPF entered is invalid", badPlPesel: "The PESEL entered is invalid", badPlNip: "The NIP entered is invalid", badPlRegon: "The REGON entered is invalid", badreCaptcha: "Please confirm that you are not a bot" } }) }(a, window), function (a) { a.formUtils.addValidator({ name: "email", validatorFunction: function (b) { var c = b.toLowerCase().split("@"), d = c[0], e = c[1]; if (d && e) { if (0 === d.indexOf('"')) { var f = d.length; if (d = d.replace(/\"/g, ""), d.length !== f - 2) return !1 } return a.formUtils.validators.validate_domain.validatorFunction(c[1]) && 0 !== d.indexOf(".") && "." !== d.substring(d.length - 1, d.length) && d.indexOf("..") === -1 && !/[^\w\+\.\-\#\-\_\~\!\$\&\'\(\)\*\+\,\;\=\:]/.test(d) } return !1 }, errorMessage: "", errorMessageKey: "badEmail" }), a.formUtils.addValidator({ name: "domain", validatorFunction: function (a) { return a.length > 0 && a.length <= 253 && !/[^a-zA-Z0-9]/.test(a.slice(-2)) && !/[^a-zA-Z0-9]/.test(a.substr(0, 1)) && !/[^a-zA-Z0-9\.\-]/.test(a) && 1 === a.split("..").length && a.split(".").length > 1 }, errorMessage: "", errorMessageKey: "badDomain" }), a.formUtils.addValidator({ name: "required", validatorFunction: function (b, c, d, e, f) { switch (c.attr("type")) { case "checkbox": return c.is(":checked"); case "radio": return f.find('input[name="' + c.attr("name") + '"]').filter(":checked").length > 0; default: return "" !== a.trim(b) } }, errorMessage: "", errorMessageKey: function (a) { return "top" === a.errorMessagePosition || "function" == typeof a.errorMessagePosition ? "requiredFields" : "requiredField" } }), a.formUtils.addValidator({ name: "length", validatorFunction: function (b, c, d, e) { var f = c.valAttr("length"), g = c.attr("type"); if (void 0 === f) return alert('Please add attribute "data-validation-length" to ' + c[0].nodeName + " named " + c.attr("name")), !0; var h, i = "file" === g && void 0 !== c.get(0).files ? c.get(0).files.length : b.length, j = a.formUtils.numericRangeCheck(i, f); switch (j[0]) { case "out": this.errorMessage = e.lengthBadStart + f + e.lengthBadEnd, h = !1; break; case "min": this.errorMessage = e.lengthTooShortStart + j[1] + e.lengthBadEnd, h = !1; break; case "max": this.errorMessage = e.lengthTooLongStart + j[1] + e.lengthBadEnd, h = !1; break; default: h = !0 } return h }, errorMessage: "", errorMessageKey: "" }), a.formUtils.addValidator({ name: "url", validatorFunction: function (b) { var c = /^(https?|ftp):\/\/((((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|\[|\]|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i; if (c.test(b)) { var d = b.split("://")[1], e = d.indexOf("/"); return e > -1 && (d = d.substr(0, e)), a.formUtils.validators.validate_domain.validatorFunction(d) } return !1 }, errorMessage: "", errorMessageKey: "badUrl" }), a.formUtils.addValidator({ name: "number", validatorFunction: function (a, b, c) { if ("" !== a) { var d, e, f = b.valAttr("allowing") || "", g = b.valAttr("decimal-separator") || c.decimalSeparator, h = !1, i = b.valAttr("step") || "", j = !1, k = b.attr("data-sanitize") || "", l = k.match(/(^|[\s])numberFormat([\s]|$)/i); if (l) { if (!window.numeral) throw new ReferenceError("The data-sanitize value numberFormat cannot be used without the numeral library. Please see Data Validation in http://www.formvalidator.net for more information."); a.length && (a = String(numeral().unformat(a))) } if (f.indexOf("number") === -1 && (f += ",number"), f.indexOf("negative") === -1 && 0 === a.indexOf("-")) return !1; if (f.indexOf("range") > -1 && (d = parseFloat(f.substring(f.indexOf("[") + 1, f.indexOf(";"))), e = parseFloat(f.substring(f.indexOf(";") + 1, f.indexOf("]"))), h = !0), "" !== i && (j = !0), "," === g) { if (a.indexOf(".") > -1) return !1; a = a.replace(",", ".") } if ("" === a.replace(/[0-9-]/g, "") && (!h || a >= d && a <= e) && (!j || a % i === 0)) return !0; if (f.indexOf("float") > -1 && null !== a.match(new RegExp("^([0-9-]+)\\.([0-9]+)$")) && (!h || a >= d && a <= e) && (!j || a % i === 0)) return !0 } return !1 }, errorMessage: "", errorMessageKey: "badInt" }), a.formUtils.addValidator({ name: "alphanumeric", validatorFunction: function (b, c, d, e) { var f = "^([a-zA-Z0-9", g = "]+)$", h = c.valAttr("allowing"), i = ""; if (h) { i = f + h + g; var j = h.replace(/\\/g, ""); j.indexOf(" ") > -1 && (j = j.replace(" ", ""), j += e.andSpaces || a.formUtils.LANG.andSpaces), this.errorMessage = e.badAlphaNumeric + e.badAlphaNumericExtra + j } else i = f + g, this.errorMessage = e.badAlphaNumeric; return new RegExp(i).test(b) }, errorMessage: "", errorMessageKey: "" }), a.formUtils.addValidator({ name: "custom", validatorFunction: function (a, b) { var c = new RegExp(b.valAttr("regexp")); return c.test(a) }, errorMessage: "", errorMessageKey: "badCustomVal" }), a.formUtils.addValidator({ name: "date", validatorFunction: function (b, c, d) { var e = c.valAttr("format") || d.dateFormat || "yyyy-mm-dd", f = "false" === c.valAttr("require-leading-zero"); return a.formUtils.parseDate(b, e, f) !== !1 }, errorMessage: "", errorMessageKey: "badDate" }), a.formUtils.addValidator({ name: "checkbox_group", validatorFunction: function (b, c, d, e, f) { var g = !0, h = c.attr("name"), i = a('input[type=checkbox][name^="' + h + '"]', f), j = i.filter(":checked").length, k = c.valAttr("qty"); if (void 0 === k) { var l = c.get(0).nodeName; alert('Attribute "data-validation-qty" is missing from ' + l + " named " + c.attr("name")) } var m = a.formUtils.numericRangeCheck(j, k); switch (m[0]) { case "out": this.errorMessage = e.groupCheckedRangeStart + k + e.groupCheckedEnd, g = !1; break; case "min": this.errorMessage = e.groupCheckedTooFewStart + m[1] + e.groupCheckedEnd, g = !1; break; case "max": this.errorMessage = e.groupCheckedTooManyStart + m[1] + e.groupCheckedEnd, g = !1; break; default: g = !0 } if (!g) { var n = function () { i.unbind("click", n), i.filter("*[data-validation]").validateInputOnBlur(e, d, !1, "blur") }; i.bind("click", n) } return g } }) }(a) });




//Singlenav.js

/**
 * Single Page Nav Plugin
 * Copyright (c) 2013 Chris Wojcik <hello@chriswojcik.net>
 * Dual licensed under MIT and GPL.
 * @author Chris Wojcik
 * @version 1.1.0
 */

// Utility
if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        function F() { }
        F.prototype = obj;
        return new F();
    };
}

(function ($, window, document, undefined) {
    "use strict";

    var SinglePageNav = {

        init: function (options, container) {

            this.options = $.extend({}, $.fn.singlePageNav.defaults, options);

            this.container = container;
            this.$container = $(container);
            this.$links = this.$container.find('a');

            if (this.options.filter !== '') {
                this.$links = this.$links.filter(this.options.filter);
            }

            this.$window = $(window);
            this.$htmlbody = $('html, body');

            this.$links.on('click.singlePageNav', $.proxy(this.handleClick, this));

            this.didScroll = false;
            this.checkPosition();
            this.setTimer();
        },

        handleClick: function (e) {
            var self = this,
                link = e.currentTarget,
                $elem = $(link.hash);

            e.preventDefault();

            if ($elem.length) { // Make sure the target elem exists


                // Prevent active link from cycling during the scroll
                self.clearTimer();

                // Before scrolling starts
                if (typeof self.options.beforeStart === 'function') {
                    self.options.beforeStart();
                }

                self.setActiveLink(link.hash);

                self.scrollTo($elem, function () {

                    if (self.options.updateHash) {
                        document.location.hash = link.hash;
                    }

                    self.setTimer();

                    // After scrolling ends
                    if (typeof self.options.onComplete === 'function') {
                        self.options.onComplete();
                    }
                });
            }
        },

        scrollTo: function ($elem, callback) {
            var self = this;
            var target = self.getCoords($elem).top;
            var called = false;

            self.$htmlbody.stop().animate(
                { scrollTop: target },
                {
                    duration: self.options.speed,
                    complete: function () {
                        if (typeof callback === 'function' && !called) {
                            callback();
                        }
                        called = true;
                    }
                }
            );
        },

        setTimer: function () {
            var self = this;

            self.$window.on('scroll.singlePageNav', function () {
                self.didScroll = true;
            });

            self.timer = setInterval(function () {
                if (self.didScroll) {
                    self.didScroll = false;
                    self.checkPosition();
                }
            }, 250);
        },

        clearTimer: function () {
            clearInterval(this.timer);
            this.$window.off('scroll.singlePageNav');
            this.didScroll = false;
        },

        // Check the scroll position and set the active section
        checkPosition: function () {
            var scrollPos = this.$window.scrollTop();
            var currentSection = this.getCurrentSection(scrollPos);
            this.setActiveLink(currentSection);
        },

        getCoords: function ($elem) {
            return {
                top: Math.round($elem.offset().top) - this.options.offset
            };
        },

        setActiveLink: function (href) {
            var $activeLink = this.$container.find("a[href='" + href + "']");
            var $parent = $activeLink.parent();
            this.$container.find('.' + this.options.currentClass).removeClass(this.options.currentClass);
            $parent.addClass(this.options.currentClass);
        },

        getCurrentSection: function (scrollPos) {
            var i, hash, coords, section;

            for (i = 0; i < this.$links.length; i++) {
                hash = this.$links[i].hash;

                if ($(hash).length) {
                    coords = this.getCoords($(hash));

                    if (scrollPos >= coords.top - this.options.threshold) {
                        section = hash;
                    }
                }
            }

            // The current section or the first link
            return section || this.$links[0].hash;
        }
    };

    $.fn.singlePageNav = function (options) {
        return this.each(function () {
            var singlePageNav = Object.create(SinglePageNav);
            singlePageNav.init(options, this);
        });
    };

    $.fn.singlePageNav.defaults = {
        offset: 0,
        threshold: 120,
        speed: 400,
        currentClass: 'current',
        updateHash: false,
        filter: '',
        onComplete: false,
        beforeStart: false
    };

})(jQuery, window, document);



//Select2.js

/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */!function (a) { "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery) }(function (a) {
    var b = function () {
        if (a && a.fn && a.fn.select2 && a.fn.select2.amd) var b = a.fn.select2.amd; var b; return function () { if (!b || !b.requirejs) { b ? c = b : b = {}; var a, c, d; !function (b) { function e(a, b) { return u.call(a, b) } function f(a, b) { var c, d, e, f, g, h, i, j, k, l, m, n = b && b.split("/"), o = s.map, p = o && o["*"] || {}; if (a && "." === a.charAt(0)) if (b) { for (a = a.split("/"), g = a.length - 1, s.nodeIdCompat && w.test(a[g]) && (a[g] = a[g].replace(w, "")), a = n.slice(0, n.length - 1).concat(a), k = 0; k < a.length; k += 1) if (m = a[k], "." === m) a.splice(k, 1), k -= 1; else if (".." === m) { if (1 === k && (".." === a[2] || ".." === a[0])) break; k > 0 && (a.splice(k - 1, 2), k -= 2) } a = a.join("/") } else 0 === a.indexOf("./") && (a = a.substring(2)); if ((n || p) && o) { for (c = a.split("/"), k = c.length; k > 0; k -= 1) { if (d = c.slice(0, k).join("/"), n) for (l = n.length; l > 0; l -= 1) if (e = o[n.slice(0, l).join("/")], e && (e = e[d])) { f = e, h = k; break } if (f) break; !i && p && p[d] && (i = p[d], j = k) } !f && i && (f = i, h = j), f && (c.splice(0, h, f), a = c.join("/")) } return a } function g(a, c) { return function () { var d = v.call(arguments, 0); return "string" != typeof d[0] && 1 === d.length && d.push(null), n.apply(b, d.concat([a, c])) } } function h(a) { return function (b) { return f(b, a) } } function i(a) { return function (b) { q[a] = b } } function j(a) { if (e(r, a)) { var c = r[a]; delete r[a], t[a] = !0, m.apply(b, c) } if (!e(q, a) && !e(t, a)) throw new Error("No " + a); return q[a] } function k(a) { var b, c = a ? a.indexOf("!") : -1; return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [b, a] } function l(a) { return function () { return s && s.config && s.config[a] || {} } } var m, n, o, p, q = {}, r = {}, s = {}, t = {}, u = Object.prototype.hasOwnProperty, v = [].slice, w = /\.js$/; o = function (a, b) { var c, d = k(a), e = d[0]; return a = d[1], e && (e = f(e, b), c = j(e)), e ? a = c && c.normalize ? c.normalize(a, h(b)) : f(a, b) : (a = f(a, b), d = k(a), e = d[0], a = d[1], e && (c = j(e))), { f: e ? e + "!" + a : a, n: a, pr: e, p: c } }, p = { require: function (a) { return g(a) }, exports: function (a) { var b = q[a]; return "undefined" != typeof b ? b : q[a] = {} }, module: function (a) { return { id: a, uri: "", exports: q[a], config: l(a) } } }, m = function (a, c, d, f) { var h, k, l, m, n, s, u = [], v = typeof d; if (f = f || a, "undefined" === v || "function" === v) { for (c = !c.length && d.length ? ["require", "exports", "module"] : c, n = 0; n < c.length; n += 1) if (m = o(c[n], f), k = m.f, "require" === k) u[n] = p.require(a); else if ("exports" === k) u[n] = p.exports(a), s = !0; else if ("module" === k) h = u[n] = p.module(a); else if (e(q, k) || e(r, k) || e(t, k)) u[n] = j(k); else { if (!m.p) throw new Error(a + " missing " + k); m.p.load(m.n, g(f, !0), i(k), {}), u[n] = q[k] } l = d ? d.apply(q[a], u) : void 0, a && (h && h.exports !== b && h.exports !== q[a] ? q[a] = h.exports : l === b && s || (q[a] = l)) } else a && (q[a] = d) }, a = c = n = function (a, c, d, e, f) { if ("string" == typeof a) return p[a] ? p[a](c) : j(o(a, c).f); if (!a.splice) { if (s = a, s.deps && n(s.deps, s.callback), !c) return; c.splice ? (a = c, c = d, d = null) : a = b } return c = c || function () { }, "function" == typeof d && (d = e, e = f), e ? m(b, a, c, d) : setTimeout(function () { m(b, a, c, d) }, 4), n }, n.config = function (a) { return n(a) }, a._defined = q, d = function (a, b, c) { if ("string" != typeof a) throw new Error("See almond README: incorrect module build, no module name"); b.splice || (c = b, b = []), e(q, a) || e(r, a) || (r[a] = [a, b, c]) }, d.amd = { jQuery: !0 } }(), b.requirejs = a, b.require = c, b.define = d } }(), b.define("almond", function () { }), b.define("jquery", [], function () { var b = a || $; return null == b && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), b }), b.define("select2/utils", ["jquery"], function (a) { function b(a) { var b = a.prototype, c = []; for (var d in b) { var e = b[d]; "function" == typeof e && "constructor" !== d && c.push(d) } return c } var c = {}; c.Extend = function (a, b) { function c() { this.constructor = a } var d = {}.hasOwnProperty; for (var e in b) d.call(b, e) && (a[e] = b[e]); return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a }, c.Decorate = function (a, c) { function d() { var b = Array.prototype.unshift, d = c.prototype.constructor.length, e = a.prototype.constructor; d > 0 && (b.call(arguments, a.prototype.constructor), e = c.prototype.constructor), e.apply(this, arguments) } function e() { this.constructor = d } var f = b(c), g = b(a); c.displayName = a.displayName, d.prototype = new e; for (var h = 0; h < g.length; h++) { var i = g[h]; d.prototype[i] = a.prototype[i] } for (var j = (function (a) { var b = function () { }; a in d.prototype && (b = d.prototype[a]); var e = c.prototype[a]; return function () { var a = Array.prototype.unshift; return a.call(arguments, b), e.apply(this, arguments) } }), k = 0; k < f.length; k++) { var l = f[k]; d.prototype[l] = j(l) } return d }; var d = function () { this.listeners = {} }; return d.prototype.on = function (a, b) { this.listeners = this.listeners || {}, a in this.listeners ? this.listeners[a].push(b) : this.listeners[a] = [b] }, d.prototype.trigger = function (a) { var b = Array.prototype.slice, c = b.call(arguments, 1); this.listeners = this.listeners || {}, null == c && (c = []), 0 === c.length && c.push({}), c[0]._type = a, a in this.listeners && this.invoke(this.listeners[a], b.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments) }, d.prototype.invoke = function (a, b) { for (var c = 0, d = a.length; d > c; c++) a[c].apply(this, b) }, c.Observable = d, c.generateChars = function (a) { for (var b = "", c = 0; a > c; c++) { var d = Math.floor(36 * Math.random()); b += d.toString(36) } return b }, c.bind = function (a, b) { return function () { a.apply(b, arguments) } }, c._convertData = function (a) { for (var b in a) { var c = b.split("-"), d = a; if (1 !== c.length) { for (var e = 0; e < c.length; e++) { var f = c[e]; f = f.substring(0, 1).toLowerCase() + f.substring(1), f in d || (d[f] = {}), e == c.length - 1 && (d[f] = a[b]), d = d[f] } delete a[b] } } return a }, c.hasScroll = function (b, c) { var d = a(c), e = c.style.overflowX, f = c.style.overflowY; return e !== f || "hidden" !== f && "visible" !== f ? "scroll" === e || "scroll" === f ? !0 : d.innerHeight() < c.scrollHeight || d.innerWidth() < c.scrollWidth : !1 }, c.escapeMarkup = function (a) { var b = { "\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;" }; return "string" != typeof a ? a : String(a).replace(/[&<>"'\/\\]/g, function (a) { return b[a] }) }, c.appendMany = function (b, c) { if ("1.7" === a.fn.jquery.substr(0, 3)) { var d = a(); a.map(c, function (a) { d = d.add(a) }), c = d } b.append(c) }, c }), b.define("select2/results", ["jquery", "./utils"], function (a, b) { function c(a, b, d) { this.$element = a, this.data = d, this.options = b, c.__super__.constructor.call(this) } return b.Extend(c, b.Observable), c.prototype.render = function () { var b = a('<ul class="select2-results__options" role="tree"></ul>'); return this.options.get("multiple") && b.attr("aria-multiselectable", "true"), this.$results = b, b }, c.prototype.clear = function () { this.$results.empty() }, c.prototype.displayMessage = function (b) { var c = this.options.get("escapeMarkup"); this.clear(), this.hideLoading(); var d = a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'), e = this.options.get("translations").get(b.message); d.append(c(e(b.args))), d[0].className += " select2-results__message", this.$results.append(d) }, c.prototype.hideMessages = function () { this.$results.find(".select2-results__message").remove() }, c.prototype.append = function (a) { this.hideLoading(); var b = []; if (null == a.results || 0 === a.results.length) return void (0 === this.$results.children().length && this.trigger("results:message", { message: "noResults" })); a.results = this.sort(a.results); for (var c = 0; c < a.results.length; c++) { var d = a.results[c], e = this.option(d); b.push(e) } this.$results.append(b) }, c.prototype.position = function (a, b) { var c = b.find(".select2-results"); c.append(a) }, c.prototype.sort = function (a) { var b = this.options.get("sorter"); return b(a) }, c.prototype.highlightFirstItem = function () { var a = this.$results.find(".select2-results__option[aria-selected]"), b = a.filter("[aria-selected=true]"); b.length > 0 ? b.first().trigger("mouseenter") : a.first().trigger("mouseenter"), this.ensureHighlightVisible() }, c.prototype.setClasses = function () { var b = this; this.data.current(function (c) { var d = a.map(c, function (a) { return a.id.toString() }), e = b.$results.find(".select2-results__option[aria-selected]"); e.each(function () { var b = a(this), c = a.data(this, "data"), e = "" + c.id; null != c.element && c.element.selected || null == c.element && a.inArray(e, d) > -1 ? b.attr("aria-selected", "true") : b.attr("aria-selected", "false") }) }) }, c.prototype.showLoading = function (a) { this.hideLoading(); var b = this.options.get("translations").get("searching"), c = { disabled: !0, loading: !0, text: b(a) }, d = this.option(c); d.className += " loading-results", this.$results.prepend(d) }, c.prototype.hideLoading = function () { this.$results.find(".loading-results").remove() }, c.prototype.option = function (b) { var c = document.createElement("li"); c.className = "select2-results__option"; var d = { role: "treeitem", "aria-selected": "false" }; b.disabled && (delete d["aria-selected"], d["aria-disabled"] = "true"), null == b.id && delete d["aria-selected"], null != b._resultId && (c.id = b._resultId), b.title && (c.title = b.title), b.children && (d.role = "group", d["aria-label"] = b.text, delete d["aria-selected"]); for (var e in d) { var f = d[e]; c.setAttribute(e, f) } if (b.children) { var g = a(c), h = document.createElement("strong"); h.className = "select2-results__group"; a(h); this.template(b, h); for (var i = [], j = 0; j < b.children.length; j++) { var k = b.children[j], l = this.option(k); i.push(l) } var m = a("<ul></ul>", { "class": "select2-results__options select2-results__options--nested" }); m.append(i), g.append(h), g.append(m) } else this.template(b, c); return a.data(c, "data", b), c }, c.prototype.bind = function (b, c) { var d = this, e = b.id + "-results"; this.$results.attr("id", e), b.on("results:all", function (a) { d.clear(), d.append(a.data), b.isOpen() && (d.setClasses(), d.highlightFirstItem()) }), b.on("results:append", function (a) { d.append(a.data), b.isOpen() && d.setClasses() }), b.on("query", function (a) { d.hideMessages(), d.showLoading(a) }), b.on("select", function () { b.isOpen() && (d.setClasses(), d.highlightFirstItem()) }), b.on("unselect", function () { b.isOpen() && (d.setClasses(), d.highlightFirstItem()) }), b.on("open", function () { d.$results.attr("aria-expanded", "true"), d.$results.attr("aria-hidden", "false"), d.setClasses(), d.ensureHighlightVisible() }), b.on("close", function () { d.$results.attr("aria-expanded", "false"), d.$results.attr("aria-hidden", "true"), d.$results.removeAttr("aria-activedescendant") }), b.on("results:toggle", function () { var a = d.getHighlightedResults(); 0 !== a.length && a.trigger("mouseup") }), b.on("results:select", function () { var a = d.getHighlightedResults(); if (0 !== a.length) { var b = a.data("data"); "true" == a.attr("aria-selected") ? d.trigger("close", {}) : d.trigger("select", { data: b }) } }), b.on("results:previous", function () { var a = d.getHighlightedResults(), b = d.$results.find("[aria-selected]"), c = b.index(a); if (0 !== c) { var e = c - 1; 0 === a.length && (e = 0); var f = b.eq(e); f.trigger("mouseenter"); var g = d.$results.offset().top, h = f.offset().top, i = d.$results.scrollTop() + (h - g); 0 === e ? d.$results.scrollTop(0) : 0 > h - g && d.$results.scrollTop(i) } }), b.on("results:next", function () { var a = d.getHighlightedResults(), b = d.$results.find("[aria-selected]"), c = b.index(a), e = c + 1; if (!(e >= b.length)) { var f = b.eq(e); f.trigger("mouseenter"); var g = d.$results.offset().top + d.$results.outerHeight(!1), h = f.offset().top + f.outerHeight(!1), i = d.$results.scrollTop() + h - g; 0 === e ? d.$results.scrollTop(0) : h > g && d.$results.scrollTop(i) } }), b.on("results:focus", function (a) { a.element.addClass("select2-results__option--highlighted") }), b.on("results:message", function (a) { d.displayMessage(a) }), a.fn.mousewheel && this.$results.on("mousewheel", function (a) { var b = d.$results.scrollTop(), c = d.$results.get(0).scrollHeight - b + a.deltaY, e = a.deltaY > 0 && b - a.deltaY <= 0, f = a.deltaY < 0 && c <= d.$results.height(); e ? (d.$results.scrollTop(0), a.preventDefault(), a.stopPropagation()) : f && (d.$results.scrollTop(d.$results.get(0).scrollHeight - d.$results.height()), a.preventDefault(), a.stopPropagation()) }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function (b) { var c = a(this), e = c.data("data"); return "true" === c.attr("aria-selected") ? void (d.options.get("multiple") ? d.trigger("unselect", { originalEvent: b, data: e }) : d.trigger("close", {})) : void d.trigger("select", { originalEvent: b, data: e }) }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function (b) { var c = a(this).data("data"); d.getHighlightedResults().removeClass("select2-results__option--highlighted"), d.trigger("results:focus", { data: c, element: a(this) }) }) }, c.prototype.getHighlightedResults = function () { var a = this.$results.find(".select2-results__option--highlighted"); return a }, c.prototype.destroy = function () { this.$results.remove() }, c.prototype.ensureHighlightVisible = function () { var a = this.getHighlightedResults(); if (0 !== a.length) { var b = this.$results.find("[aria-selected]"), c = b.index(a), d = this.$results.offset().top, e = a.offset().top, f = this.$results.scrollTop() + (e - d), g = e - d; f -= 2 * a.outerHeight(!1), 2 >= c ? this.$results.scrollTop(0) : (g > this.$results.outerHeight() || 0 > g) && this.$results.scrollTop(f) } }, c.prototype.template = function (b, c) { var d = this.options.get("templateResult"), e = this.options.get("escapeMarkup"), f = d(b, c); null == f ? c.style.display = "none" : "string" == typeof f ? c.innerHTML = e(f) : a(c).append(f) }, c }), b.define("select2/keys", [], function () { var a = { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 }; return a }), b.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (a, b, c) { function d(a, b) { this.$element = a, this.options = b, d.__super__.constructor.call(this) } return b.Extend(d, b.Observable), d.prototype.render = function () { var b = a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>'); return this._tabindex = 0, null != this.$element.data("old-tabindex") ? this._tabindex = this.$element.data("old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), b.attr("title", this.$element.attr("title")), b.attr("tabindex", this._tabindex), this.$selection = b, b }, d.prototype.bind = function (a, b) { var d = this, e = (a.id + "-container", a.id + "-results"); this.container = a, this.$selection.on("focus", function (a) { d.trigger("focus", a) }), this.$selection.on("blur", function (a) { d._handleBlur(a) }), this.$selection.on("keydown", function (a) { d.trigger("keypress", a), a.which === c.SPACE && a.preventDefault() }), a.on("results:focus", function (a) { d.$selection.attr("aria-activedescendant", a.data._resultId) }), a.on("selection:update", function (a) { d.update(a.data) }), a.on("open", function () { d.$selection.attr("aria-expanded", "true"), d.$selection.attr("aria-owns", e), d._attachCloseHandler(a) }), a.on("close", function () { d.$selection.attr("aria-expanded", "false"), d.$selection.removeAttr("aria-activedescendant"), d.$selection.removeAttr("aria-owns"), d.$selection.focus(), d._detachCloseHandler(a) }), a.on("enable", function () { d.$selection.attr("tabindex", d._tabindex) }), a.on("disable", function () { d.$selection.attr("tabindex", "-1") }) }, d.prototype._handleBlur = function (b) { var c = this; window.setTimeout(function () { document.activeElement == c.$selection[0] || a.contains(c.$selection[0], document.activeElement) || c.trigger("blur", b) }, 1) }, d.prototype._attachCloseHandler = function (b) { a(document.body).on("mousedown.select2." + b.id, function (b) { var c = a(b.target), d = c.closest(".select2"), e = a(".select2.select2-container--open"); e.each(function () { var b = a(this); if (this != d[0]) { var c = b.data("element"); c.select2("close") } }) }) }, d.prototype._detachCloseHandler = function (b) { a(document.body).off("mousedown.select2." + b.id) }, d.prototype.position = function (a, b) { var c = b.find(".selection"); c.append(a) }, d.prototype.destroy = function () { this._detachCloseHandler(this.container) }, d.prototype.update = function (a) { throw new Error("The `update` method must be defined in child classes.") }, d }), b.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (a, b, c, d) { function e() { e.__super__.constructor.apply(this, arguments) } return c.Extend(e, b), e.prototype.render = function () { var a = e.__super__.render.call(this); return a.addClass("select2-selection--single"), a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), a }, e.prototype.bind = function (a, b) { var c = this; e.__super__.bind.apply(this, arguments); var d = a.id + "-container"; this.$selection.find(".select2-selection__rendered").attr("id", d), this.$selection.attr("aria-labelledby", d), this.$selection.on("mousedown", function (a) { 1 === a.which && c.trigger("toggle", { originalEvent: a }) }), this.$selection.on("focus", function (a) { }), this.$selection.on("blur", function (a) { }), a.on("focus", function (b) { a.isOpen() || c.$selection.focus() }), a.on("selection:update", function (a) { c.update(a.data) }) }, e.prototype.clear = function () { this.$selection.find(".select2-selection__rendered").empty() }, e.prototype.display = function (a, b) { var c = this.options.get("templateSelection"), d = this.options.get("escapeMarkup"); return d(c(a, b)) }, e.prototype.selectionContainer = function () { return a("<span></span>") }, e.prototype.update = function (a) { if (0 === a.length) return void this.clear(); var b = a[0], c = this.$selection.find(".select2-selection__rendered"), d = this.display(b, c); c.empty().append(d), c.prop("title", b.title || b.text) }, e }), b.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (a, b, c) { function d(a, b) { d.__super__.constructor.apply(this, arguments) } return c.Extend(d, b), d.prototype.render = function () { var a = d.__super__.render.call(this); return a.addClass("select2-selection--multiple"), a.html('<ul class="select2-selection__rendered"></ul>'), a }, d.prototype.bind = function (b, c) { var e = this; d.__super__.bind.apply(this, arguments), this.$selection.on("click", function (a) { e.trigger("toggle", { originalEvent: a }) }), this.$selection.on("click", ".select2-selection__choice__remove", function (b) { if (!e.options.get("disabled")) { var c = a(this), d = c.parent(), f = d.data("data"); e.trigger("unselect", { originalEvent: b, data: f }) } }) }, d.prototype.clear = function () { this.$selection.find(".select2-selection__rendered").empty() }, d.prototype.display = function (a, b) { var c = this.options.get("templateSelection"), d = this.options.get("escapeMarkup"); return d(c(a, b)) }, d.prototype.selectionContainer = function () { var b = a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>'); return b }, d.prototype.update = function (a) { if (this.clear(), 0 !== a.length) { for (var b = [], d = 0; d < a.length; d++) { var e = a[d], f = this.selectionContainer(), g = this.display(e, f); f.append(g), f.prop("title", e.title || e.text), f.data("data", e), b.push(f) } var h = this.$selection.find(".select2-selection__rendered"); c.appendMany(h, b) } }, d }), b.define("select2/selection/placeholder", ["../utils"], function (a) { function b(a, b, c) { this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c) } return b.prototype.normalizePlaceholder = function (a, b) { return "string" == typeof b && (b = { id: "", text: b }), b }, b.prototype.createPlaceholder = function (a, b) { var c = this.selectionContainer(); return c.html(this.display(b)), c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), c }, b.prototype.update = function (a, b) { var c = 1 == b.length && b[0].id != this.placeholder.id, d = b.length > 1; if (d || c) return a.call(this, b); this.clear(); var e = this.createPlaceholder(this.placeholder); this.$selection.find(".select2-selection__rendered").append(e) }, b }), b.define("select2/selection/allowClear", ["jquery", "../keys"], function (a, b) { function c() { } return c.prototype.bind = function (a, b, c) { var d = this; a.call(this, b, c), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function (a) { d._handleClear(a) }), b.on("keypress", function (a) { d._handleKeyboardClear(a, b) }) }, c.prototype._handleClear = function (a, b) { if (!this.options.get("disabled")) { var c = this.$selection.find(".select2-selection__clear"); if (0 !== c.length) { b.stopPropagation(); for (var d = c.data("data"), e = 0; e < d.length; e++) { var f = { data: d[e] }; if (this.trigger("unselect", f), f.prevented) return } this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle", {}) } } }, c.prototype._handleKeyboardClear = function (a, c, d) { d.isOpen() || (c.which == b.DELETE || c.which == b.BACKSPACE) && this._handleClear(c) }, c.prototype.update = function (b, c) { if (b.call(this, c), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === c.length)) { var d = a('<span class="select2-selection__clear">&times;</span>'); d.data("data", c), this.$selection.find(".select2-selection__rendered").prepend(d) } }, c }), b.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (a, b, c) { function d(a, b, c) { a.call(this, b, c) } return d.prototype.render = function (b) { var c = a('<li class="select2-search select2-search--inline"><input class="select2-search__field" style="font-size: 13px;padding:0 13px;" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>'); this.$searchContainer = c, this.$search = c.find("input"); var d = b.call(this); return this._transferTabIndex(), d }, d.prototype.bind = function (a, b, d) { var e = this; a.call(this, b, d), b.on("open", function () { e.$search.trigger("focus") }), b.on("close", function () { e.$search.val(""), e.$search.removeAttr("aria-activedescendant"), e.$search.trigger("focus") }), b.on("enable", function () { e.$search.prop("disabled", !1), e._transferTabIndex() }), b.on("disable", function () { e.$search.prop("disabled", !0) }), b.on("focus", function (a) { e.$search.trigger("focus") }), b.on("results:focus", function (a) { e.$search.attr("aria-activedescendant", a.id) }), this.$selection.on("focusin", ".select2-search--inline", function (a) { e.trigger("focus", a) }), this.$selection.on("focusout", ".select2-search--inline", function (a) { e._handleBlur(a) }), this.$selection.on("keydown", ".select2-search--inline", function (a) { a.stopPropagation(), e.trigger("keypress", a), e._keyUpPrevented = a.isDefaultPrevented(); var b = a.which; if (b === c.BACKSPACE && "" === e.$search.val()) { var d = e.$searchContainer.prev(".select2-selection__choice"); if (d.length > 0) { var f = d.data("data"); e.searchRemoveChoice(f), a.preventDefault() } } }); var f = document.documentMode, g = f && 11 >= f; this.$selection.on("input.searchcheck", ".select2-search--inline", function (a) { return g ? void e.$selection.off("input.search input.searchcheck") : void e.$selection.off("keyup.search") }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function (a) { if (g && "input" === a.type) return void e.$selection.off("input.search input.searchcheck"); var b = a.which; b != c.SHIFT && b != c.CTRL && b != c.ALT && e.handleSearch(a) }) }, d.prototype._transferTabIndex = function (a) { this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1") }, d.prototype.createPlaceholder = function (a, b) { this.$search.attr("placeholder", b.text) }, d.prototype.update = function (a, b) { var c = this.$search[0] == document.activeElement; this.$search.attr("placeholder", ""), a.call(this, b), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), c && this.$search.focus() }, d.prototype.handleSearch = function () { if (this.resizeSearch(), !this._keyUpPrevented) { var a = this.$search.val(); this.trigger("query", { term: a }) } this._keyUpPrevented = !1 }, d.prototype.searchRemoveChoice = function (a, b) { this.trigger("unselect", { data: b }), this.$search.val(b.text), this.handleSearch() }, d.prototype.resizeSearch = function () { this.$search.css("width", "25px"); var a = ""; if ("" !== this.$search.attr("placeholder")) a = this.$selection.find(".select2-selection__rendered").innerWidth(); else { var b = this.$search.val().length + 1; a = .75 * b + "em" } this.$search.css("width", a) }, d }), b.define("select2/selection/eventRelay", ["jquery"], function (a) { function b() { } return b.prototype.bind = function (b, c, d) { var e = this, f = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"], g = ["opening", "closing", "selecting", "unselecting"]; b.call(this, c, d), c.on("*", function (b, c) { if (-1 !== a.inArray(b, f)) { c = c || {}; var d = a.Event("select2:" + b, { params: c }); e.$element.trigger(d), -1 !== a.inArray(b, g) && (c.prevented = d.isDefaultPrevented()) } }) }, b }), b.define("select2/translation", ["jquery", "require"], function (a, b) { function c(a) { this.dict = a || {} } return c.prototype.all = function () { return this.dict }, c.prototype.get = function (a) { return this.dict[a] }, c.prototype.extend = function (b) { this.dict = a.extend({}, b.all(), this.dict) }, c._cache = {}, c.loadPath = function (a) { if (!(a in c._cache)) { var d = b(a); c._cache[a] = d } return new c(c._cache[a]) }, c }), b.define("select2/diacritics", [], function () { var a = { "Ⓐ": "A", "Ａ": "A", "À": "A", "Á": "A", "Â": "A", "Ầ": "A", "Ấ": "A", "Ẫ": "A", "Ẩ": "A", "Ã": "A", "Ā": "A", "Ă": "A", "Ằ": "A", "Ắ": "A", "Ẵ": "A", "Ẳ": "A", "Ȧ": "A", "Ǡ": "A", "Ä": "A", "Ǟ": "A", "Ả": "A", "Å": "A", "Ǻ": "A", "Ǎ": "A", "Ȁ": "A", "Ȃ": "A", "Ạ": "A", "Ậ": "A", "Ặ": "A", "Ḁ": "A", "Ą": "A", "Ⱥ": "A", "Ɐ": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ⓑ": "B", "Ｂ": "B", "Ḃ": "B", "Ḅ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ɓ": "B", "Ⓒ": "C", "Ｃ": "C", "Ć": "C", "Ĉ": "C", "Ċ": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ƈ": "C", "Ȼ": "C", "Ꜿ": "C", "Ⓓ": "D", "Ｄ": "D", "Ḋ": "D", "Ď": "D", "Ḍ": "D", "Ḑ": "D", "Ḓ": "D", "Ḏ": "D", "Đ": "D", "Ƌ": "D", "Ɗ": "D", "Ɖ": "D", "Ꝺ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "ǲ": "Dz", "ǅ": "Dz", "Ⓔ": "E", "Ｅ": "E", "È": "E", "É": "E", "Ê": "E", "Ề": "E", "Ế": "E", "Ễ": "E", "Ể": "E", "Ẽ": "E", "Ē": "E", "Ḕ": "E", "Ḗ": "E", "Ĕ": "E", "Ė": "E", "Ë": "E", "Ẻ": "E", "Ě": "E", "Ȅ": "E", "Ȇ": "E", "Ẹ": "E", "Ệ": "E", "Ȩ": "E", "Ḝ": "E", "Ę": "E", "Ḙ": "E", "Ḛ": "E", "Ɛ": "E", "Ǝ": "E", "Ⓕ": "F", "Ｆ": "F", "Ḟ": "F", "Ƒ": "F", "Ꝼ": "F", "Ⓖ": "G", "Ｇ": "G", "Ǵ": "G", "Ĝ": "G", "Ḡ": "G", "Ğ": "G", "Ġ": "G", "Ǧ": "G", "Ģ": "G", "Ǥ": "G", "Ɠ": "G", "Ꞡ": "G", "Ᵹ": "G", "Ꝿ": "G", "Ⓗ": "H", "Ｈ": "H", "Ĥ": "H", "Ḣ": "H", "Ḧ": "H", "Ȟ": "H", "Ḥ": "H", "Ḩ": "H", "Ḫ": "H", "Ħ": "H", "Ⱨ": "H", "Ⱶ": "H", "Ɥ": "H", "Ⓘ": "I", "Ｉ": "I", "Ì": "I", "Í": "I", "Î": "I", "Ĩ": "I", "Ī": "I", "Ĭ": "I", "İ": "I", "Ï": "I", "Ḯ": "I", "Ỉ": "I", "Ǐ": "I", "Ȉ": "I", "Ȋ": "I", "Ị": "I", "Į": "I", "Ḭ": "I", "Ɨ": "I", "Ⓙ": "J", "Ｊ": "J", "Ĵ": "J", "Ɉ": "J", "Ⓚ": "K", "Ｋ": "K", "Ḱ": "K", "Ǩ": "K", "Ḳ": "K", "Ķ": "K", "Ḵ": "K", "Ƙ": "K", "Ⱪ": "K", "Ꝁ": "K", "Ꝃ": "K", "Ꝅ": "K", "Ꞣ": "K", "Ⓛ": "L", "Ｌ": "L", "Ŀ": "L", "Ĺ": "L", "Ľ": "L", "Ḷ": "L", "Ḹ": "L", "Ļ": "L", "Ḽ": "L", "Ḻ": "L", "Ł": "L", "Ƚ": "L", "Ɫ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ꝇ": "L", "Ꞁ": "L", "Ǉ": "LJ", "ǈ": "Lj", "Ⓜ": "M", "Ｍ": "M", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ɯ": "M", "Ⓝ": "N", "Ｎ": "N", "Ǹ": "N", "Ń": "N", "Ñ": "N", "Ṅ": "N", "Ň": "N", "Ṇ": "N", "Ņ": "N", "Ṋ": "N", "Ṉ": "N", "Ƞ": "N", "Ɲ": "N", "Ꞑ": "N", "Ꞥ": "N", "Ǌ": "NJ", "ǋ": "Nj", "Ⓞ": "O", "Ｏ": "O", "Ò": "O", "Ó": "O", "Ô": "O", "Ồ": "O", "Ố": "O", "Ỗ": "O", "Ổ": "O", "Õ": "O", "Ṍ": "O", "Ȭ": "O", "Ṏ": "O", "Ō": "O", "Ṑ": "O", "Ṓ": "O", "Ŏ": "O", "Ȯ": "O", "Ȱ": "O", "Ö": "O", "Ȫ": "O", "Ỏ": "O", "Ő": "O", "Ǒ": "O", "Ȍ": "O", "Ȏ": "O", "Ơ": "O", "Ờ": "O", "Ớ": "O", "Ỡ": "O", "Ở": "O", "Ợ": "O", "Ọ": "O", "Ộ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Ɔ": "O", "Ɵ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ȣ": "OU", "Ⓟ": "P", "Ｐ": "P", "Ṕ": "P", "Ṗ": "P", "Ƥ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝓ": "P", "Ꝕ": "P", "Ⓠ": "Q", "Ｑ": "Q", "Ꝗ": "Q", "Ꝙ": "Q", "Ɋ": "Q", "Ⓡ": "R", "Ｒ": "R", "Ŕ": "R", "Ṙ": "R", "Ř": "R", "Ȑ": "R", "Ȓ": "R", "Ṛ": "R", "Ṝ": "R", "Ŗ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꝛ": "R", "Ꞧ": "R", "Ꞃ": "R", "Ⓢ": "S", "Ｓ": "S", "ẞ": "S", "Ś": "S", "Ṥ": "S", "Ŝ": "S", "Ṡ": "S", "Š": "S", "Ṧ": "S", "Ṣ": "S", "Ṩ": "S", "Ș": "S", "Ş": "S", "Ȿ": "S", "Ꞩ": "S", "Ꞅ": "S", "Ⓣ": "T", "Ｔ": "T", "Ṫ": "T", "Ť": "T", "Ṭ": "T", "Ț": "T", "Ţ": "T", "Ṱ": "T", "Ṯ": "T", "Ŧ": "T", "Ƭ": "T", "Ʈ": "T", "Ⱦ": "T", "Ꞇ": "T", "Ꜩ": "TZ", "Ⓤ": "U", "Ｕ": "U", "Ù": "U", "Ú": "U", "Û": "U", "Ũ": "U", "Ṹ": "U", "Ū": "U", "Ṻ": "U", "Ŭ": "U", "Ü": "U", "Ǜ": "U", "Ǘ": "U", "Ǖ": "U", "Ǚ": "U", "Ủ": "U", "Ů": "U", "Ű": "U", "Ǔ": "U", "Ȕ": "U", "Ȗ": "U", "Ư": "U", "Ừ": "U", "Ứ": "U", "Ữ": "U", "Ử": "U", "Ự": "U", "Ụ": "U", "Ṳ": "U", "Ų": "U", "Ṷ": "U", "Ṵ": "U", "Ʉ": "U", "Ⓥ": "V", "Ｖ": "V", "Ṽ": "V", "Ṿ": "V", "Ʋ": "V", "Ꝟ": "V", "Ʌ": "V", "Ꝡ": "VY", "Ⓦ": "W", "Ｗ": "W", "Ẁ": "W", "Ẃ": "W", "Ŵ": "W", "Ẇ": "W", "Ẅ": "W", "Ẉ": "W", "Ⱳ": "W", "Ⓧ": "X", "Ｘ": "X", "Ẋ": "X", "Ẍ": "X", "Ⓨ": "Y", "Ｙ": "Y", "Ỳ": "Y", "Ý": "Y", "Ŷ": "Y", "Ỹ": "Y", "Ȳ": "Y", "Ẏ": "Y", "Ÿ": "Y", "Ỷ": "Y", "Ỵ": "Y", "Ƴ": "Y", "Ɏ": "Y", "Ỿ": "Y", "Ⓩ": "Z", "Ｚ": "Z", "Ź": "Z", "Ẑ": "Z", "Ż": "Z", "Ž": "Z", "Ẓ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ȥ": "Z", "Ɀ": "Z", "Ⱬ": "Z", "Ꝣ": "Z", "ⓐ": "a", "ａ": "a", "ẚ": "a", "à": "a", "á": "a", "â": "a", "ầ": "a", "ấ": "a", "ẫ": "a", "ẩ": "a", "ã": "a", "ā": "a", "ă": "a", "ằ": "a", "ắ": "a", "ẵ": "a", "ẳ": "a", "ȧ": "a", "ǡ": "a", "ä": "a", "ǟ": "a", "ả": "a", "å": "a", "ǻ": "a", "ǎ": "a", "ȁ": "a", "ȃ": "a", "ạ": "a", "ậ": "a", "ặ": "a", "ḁ": "a", "ą": "a", "ⱥ": "a", "ɐ": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ⓑ": "b", "ｂ": "b", "ḃ": "b", "ḅ": "b", "ḇ": "b", "ƀ": "b", "ƃ": "b", "ɓ": "b", "ⓒ": "c", "ｃ": "c", "ć": "c", "ĉ": "c", "ċ": "c", "č": "c", "ç": "c", "ḉ": "c", "ƈ": "c", "ȼ": "c", "ꜿ": "c", "ↄ": "c", "ⓓ": "d", "ｄ": "d", "ḋ": "d", "ď": "d", "ḍ": "d", "ḑ": "d", "ḓ": "d", "ḏ": "d", "đ": "d", "ƌ": "d", "ɖ": "d", "ɗ": "d", "ꝺ": "d", "ǳ": "dz", "ǆ": "dz", "ⓔ": "e", "ｅ": "e", "è": "e", "é": "e", "ê": "e", "ề": "e", "ế": "e", "ễ": "e", "ể": "e", "ẽ": "e", "ē": "e", "ḕ": "e", "ḗ": "e", "ĕ": "e", "ė": "e", "ë": "e", "ẻ": "e", "ě": "e", "ȅ": "e", "ȇ": "e", "ẹ": "e", "ệ": "e", "ȩ": "e", "ḝ": "e", "ę": "e", "ḙ": "e", "ḛ": "e", "ɇ": "e", "ɛ": "e", "ǝ": "e", "ⓕ": "f", "ｆ": "f", "ḟ": "f", "ƒ": "f", "ꝼ": "f", "ⓖ": "g", "ｇ": "g", "ǵ": "g", "ĝ": "g", "ḡ": "g", "ğ": "g", "ġ": "g", "ǧ": "g", "ģ": "g", "ǥ": "g", "ɠ": "g", "ꞡ": "g", "ᵹ": "g", "ꝿ": "g", "ⓗ": "h", "ｈ": "h", "ĥ": "h", "ḣ": "h", "ḧ": "h", "ȟ": "h", "ḥ": "h", "ḩ": "h", "ḫ": "h", "ẖ": "h", "ħ": "h", "ⱨ": "h", "ⱶ": "h", "ɥ": "h", "ƕ": "hv", "ⓘ": "i", "ｉ": "i", "ì": "i", "í": "i", "î": "i", "ĩ": "i", "ī": "i", "ĭ": "i", "ï": "i", "ḯ": "i", "ỉ": "i", "ǐ": "i", "ȉ": "i", "ȋ": "i", "ị": "i", "į": "i", "ḭ": "i", "ɨ": "i", "ı": "i", "ⓙ": "j", "ｊ": "j", "ĵ": "j", "ǰ": "j", "ɉ": "j", "ⓚ": "k", "ｋ": "k", "ḱ": "k", "ǩ": "k", "ḳ": "k", "ķ": "k", "ḵ": "k", "ƙ": "k", "ⱪ": "k", "ꝁ": "k", "ꝃ": "k", "ꝅ": "k", "ꞣ": "k", "ⓛ": "l", "ｌ": "l", "ŀ": "l", "ĺ": "l", "ľ": "l", "ḷ": "l", "ḹ": "l", "ļ": "l", "ḽ": "l", "ḻ": "l", "ſ": "l", "ł": "l", "ƚ": "l", "ɫ": "l", "ⱡ": "l", "ꝉ": "l", "ꞁ": "l", "ꝇ": "l", "ǉ": "lj", "ⓜ": "m", "ｍ": "m", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ɯ": "m", "ⓝ": "n", "ｎ": "n", "ǹ": "n", "ń": "n", "ñ": "n", "ṅ": "n", "ň": "n", "ṇ": "n", "ņ": "n", "ṋ": "n", "ṉ": "n", "ƞ": "n", "ɲ": "n", "ŉ": "n", "ꞑ": "n", "ꞥ": "n", "ǌ": "nj", "ⓞ": "o", "ｏ": "o", "ò": "o", "ó": "o", "ô": "o", "ồ": "o", "ố": "o", "ỗ": "o", "ổ": "o", "õ": "o", "ṍ": "o", "ȭ": "o", "ṏ": "o", "ō": "o", "ṑ": "o", "ṓ": "o", "ŏ": "o", "ȯ": "o", "ȱ": "o", "ö": "o", "ȫ": "o", "ỏ": "o", "ő": "o", "ǒ": "o", "ȍ": "o", "ȏ": "o", "ơ": "o", "ờ": "o", "ớ": "o", "ỡ": "o", "ở": "o", "ợ": "o", "ọ": "o", "ộ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "ɔ": "o", "ꝋ": "o", "ꝍ": "o", "ɵ": "o", "ƣ": "oi", "ȣ": "ou", "ꝏ": "oo", "ⓟ": "p", "ｐ": "p", "ṕ": "p", "ṗ": "p", "ƥ": "p", "ᵽ": "p", "ꝑ": "p", "ꝓ": "p", "ꝕ": "p", "ⓠ": "q", "ｑ": "q", "ɋ": "q", "ꝗ": "q", "ꝙ": "q", "ⓡ": "r", "ｒ": "r", "ŕ": "r", "ṙ": "r", "ř": "r", "ȑ": "r", "ȓ": "r", "ṛ": "r", "ṝ": "r", "ŗ": "r", "ṟ": "r", "ɍ": "r", "ɽ": "r", "ꝛ": "r", "ꞧ": "r", "ꞃ": "r", "ⓢ": "s", "ｓ": "s", "ß": "s", "ś": "s", "ṥ": "s", "ŝ": "s", "ṡ": "s", "š": "s", "ṧ": "s", "ṣ": "s", "ṩ": "s", "ș": "s", "ş": "s", "ȿ": "s", "ꞩ": "s", "ꞅ": "s", "ẛ": "s", "ⓣ": "t", "ｔ": "t", "ṫ": "t", "ẗ": "t", "ť": "t", "ṭ": "t", "ț": "t", "ţ": "t", "ṱ": "t", "ṯ": "t", "ŧ": "t", "ƭ": "t", "ʈ": "t", "ⱦ": "t", "ꞇ": "t", "ꜩ": "tz", "ⓤ": "u", "ｕ": "u", "ù": "u", "ú": "u", "û": "u", "ũ": "u", "ṹ": "u", "ū": "u", "ṻ": "u", "ŭ": "u", "ü": "u", "ǜ": "u", "ǘ": "u", "ǖ": "u", "ǚ": "u", "ủ": "u", "ů": "u", "ű": "u", "ǔ": "u", "ȕ": "u", "ȗ": "u", "ư": "u", "ừ": "u", "ứ": "u", "ữ": "u", "ử": "u", "ự": "u", "ụ": "u", "ṳ": "u", "ų": "u", "ṷ": "u", "ṵ": "u", "ʉ": "u", "ⓥ": "v", "ｖ": "v", "ṽ": "v", "ṿ": "v", "ʋ": "v", "ꝟ": "v", "ʌ": "v", "ꝡ": "vy", "ⓦ": "w", "ｗ": "w", "ẁ": "w", "ẃ": "w", "ŵ": "w", "ẇ": "w", "ẅ": "w", "ẘ": "w", "ẉ": "w", "ⱳ": "w", "ⓧ": "x", "ｘ": "x", "ẋ": "x", "ẍ": "x", "ⓨ": "y", "ｙ": "y", "ỳ": "y", "ý": "y", "ŷ": "y", "ỹ": "y", "ȳ": "y", "ẏ": "y", "ÿ": "y", "ỷ": "y", "ẙ": "y", "ỵ": "y", "ƴ": "y", "ɏ": "y", "ỿ": "y", "ⓩ": "z", "ｚ": "z", "ź": "z", "ẑ": "z", "ż": "z", "ž": "z", "ẓ": "z", "ẕ": "z", "ƶ": "z", "ȥ": "z", "ɀ": "z", "ⱬ": "z", "ꝣ": "z", "Ά": "Α", "Έ": "Ε", "Ή": "Η", "Ί": "Ι", "Ϊ": "Ι", "Ό": "Ο", "Ύ": "Υ", "Ϋ": "Υ", "Ώ": "Ω", "ά": "α", "έ": "ε", "ή": "η", "ί": "ι", "ϊ": "ι", "ΐ": "ι", "ό": "ο", "ύ": "υ", "ϋ": "υ", "ΰ": "υ", "ω": "ω", "ς": "σ" }; return a }), b.define("select2/data/base", ["../utils"], function (a) { function b(a, c) { b.__super__.constructor.call(this) } return a.Extend(b, a.Observable), b.prototype.current = function (a) { throw new Error("The `current` method must be defined in child classes.") }, b.prototype.query = function (a, b) { throw new Error("The `query` method must be defined in child classes.") }, b.prototype.bind = function (a, b) { }, b.prototype.destroy = function () { }, b.prototype.generateResultId = function (b, c) { var d = b.id + "-result-"; return d += a.generateChars(4), d += null != c.id ? "-" + c.id.toString() : "-" + a.generateChars(4) }, b }), b.define("select2/data/select", ["./base", "../utils", "jquery"], function (a, b, c) {
            function d(a, b) { this.$element = a, this.options = b, d.__super__.constructor.call(this) } return b.Extend(d, a), d.prototype.current = function (a) { var b = [], d = this; this.$element.find(":selected").each(function () { var a = c(this), e = d.item(a); b.push(e) }), a(b) }, d.prototype.select = function (a) {
                var b = this; if (a.selected = !0, c(a.element).is("option")) return a.element.selected = !0, void this.$element.trigger("change");
                if (this.$element.prop("multiple")) this.current(function (d) { var e = []; a = [a], a.push.apply(a, d); for (var f = 0; f < a.length; f++) { var g = a[f].id; -1 === c.inArray(g, e) && e.push(g) } b.$element.val(e), b.$element.trigger("change") }); else { var d = a.id; this.$element.val(d), this.$element.trigger("change") }
            }, d.prototype.unselect = function (a) { var b = this; if (this.$element.prop("multiple")) return a.selected = !1, c(a.element).is("option") ? (a.element.selected = !1, void this.$element.trigger("change")) : void this.current(function (d) { for (var e = [], f = 0; f < d.length; f++) { var g = d[f].id; g !== a.id && -1 === c.inArray(g, e) && e.push(g) } b.$element.val(e), b.$element.trigger("change") }) }, d.prototype.bind = function (a, b) { var c = this; this.container = a, a.on("select", function (a) { c.select(a.data) }), a.on("unselect", function (a) { c.unselect(a.data) }) }, d.prototype.destroy = function () { this.$element.find("*").each(function () { c.removeData(this, "data") }) }, d.prototype.query = function (a, b) { var d = [], e = this, f = this.$element.children(); f.each(function () { var b = c(this); if (b.is("option") || b.is("optgroup")) { var f = e.item(b), g = e.matches(a, f); null !== g && d.push(g) } }), b({ results: d }) }, d.prototype.addOptions = function (a) { b.appendMany(this.$element, a) }, d.prototype.option = function (a) { var b; a.children ? (b = document.createElement("optgroup"), b.label = a.text) : (b = document.createElement("option"), void 0 !== b.textContent ? b.textContent = a.text : b.innerText = a.text), a.id && (b.value = a.id), a.disabled && (b.disabled = !0), a.selected && (b.selected = !0), a.title && (b.title = a.title); var d = c(b), e = this._normalizeItem(a); return e.element = b, c.data(b, "data", e), d }, d.prototype.item = function (a) { var b = {}; if (b = c.data(a[0], "data"), null != b) return b; if (a.is("option")) b = { id: a.val(), text: a.text(), disabled: a.prop("disabled"), selected: a.prop("selected"), title: a.prop("title") }; else if (a.is("optgroup")) { b = { text: a.prop("label"), children: [], title: a.prop("title") }; for (var d = a.children("option"), e = [], f = 0; f < d.length; f++) { var g = c(d[f]), h = this.item(g); e.push(h) } b.children = e } return b = this._normalizeItem(b), b.element = a[0], c.data(a[0], "data", b), b }, d.prototype._normalizeItem = function (a) { c.isPlainObject(a) || (a = { id: a, text: a }), a = c.extend({}, { text: "" }, a); var b = { selected: !1, disabled: !1 }; return null != a.id && (a.id = a.id.toString()), null != a.text && (a.text = a.text.toString()), null == a._resultId && a.id && null != this.container && (a._resultId = this.generateResultId(this.container, a)), c.extend({}, b, a) }, d.prototype.matches = function (a, b) { var c = this.options.get("matcher"); return c(a, b) }, d
        }), b.define("select2/data/array", ["./select", "../utils", "jquery"], function (a, b, c) { function d(a, b) { var c = b.get("data") || []; d.__super__.constructor.call(this, a, b), this.addOptions(this.convertToOptions(c)) } return b.Extend(d, a), d.prototype.select = function (a) { var b = this.$element.find("option").filter(function (b, c) { return c.value == a.id.toString() }); 0 === b.length && (b = this.option(a), this.addOptions(b)), d.__super__.select.call(this, a) }, d.prototype.convertToOptions = function (a) { function d(a) { return function () { return c(this).val() == a.id } } for (var e = this, f = this.$element.find("option"), g = f.map(function () { return e.item(c(this)).id }).get(), h = [], i = 0; i < a.length; i++) { var j = this._normalizeItem(a[i]); if (c.inArray(j.id, g) >= 0) { var k = f.filter(d(j)), l = this.item(k), m = c.extend(!0, {}, j, l), n = this.option(m); k.replaceWith(n) } else { var o = this.option(j); if (j.children) { var p = this.convertToOptions(j.children); b.appendMany(o, p) } h.push(o) } } return h }, d }), b.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (a, b, c) { function d(a, b) { this.ajaxOptions = this._applyDefaults(b.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), d.__super__.constructor.call(this, a, b) } return b.Extend(d, a), d.prototype._applyDefaults = function (a) { var b = { data: function (a) { return c.extend({}, a, { q: a.term }) }, transport: function (a, b, d) { var e = c.ajax(a); return e.then(b), e.fail(d), e } }; return c.extend({}, b, a, !0) }, d.prototype.processResults = function (a) { return a }, d.prototype.query = function (a, b) { function d() { var d = f.transport(f, function (d) { var f = e.processResults(d, a); e.options.get("debug") && window.console && console.error && (f && f.results && c.isArray(f.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), b(f) }, function () { d.status && "0" === d.status || e.trigger("results:message", { message: "errorLoading" }) }); e._request = d } var e = this; null != this._request && (c.isFunction(this._request.abort) && this._request.abort(), this._request = null); var f = c.extend({ type: "GET" }, this.ajaxOptions); "function" == typeof f.url && (f.url = f.url.call(this.$element, a)), "function" == typeof f.data && (f.data = f.data.call(this.$element, a)), this.ajaxOptions.delay && null != a.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(d, this.ajaxOptions.delay)) : d() }, d }), b.define("select2/data/tags", ["jquery"], function (a) { function b(b, c, d) { var e = d.get("tags"), f = d.get("createTag"); void 0 !== f && (this.createTag = f); var g = d.get("insertTag"); if (void 0 !== g && (this.insertTag = g), b.call(this, c, d), a.isArray(e)) for (var h = 0; h < e.length; h++) { var i = e[h], j = this._normalizeItem(i), k = this.option(j); this.$element.append(k) } } return b.prototype.query = function (a, b, c) { function d(a, f) { for (var g = a.results, h = 0; h < g.length; h++) { var i = g[h], j = null != i.children && !d({ results: i.children }, !0), k = i.text === b.term; if (k || j) return f ? !1 : (a.data = g, void c(a)) } if (f) return !0; var l = e.createTag(b); if (null != l) { var m = e.option(l); m.attr("data-select2-tag", !0), e.addOptions([m]), e.insertTag(g, l) } a.results = g, c(a) } var e = this; return this._removeOldTags(), null == b.term || null != b.page ? void a.call(this, b, c) : void a.call(this, b, d) }, b.prototype.createTag = function (b, c) { var d = a.trim(c.term); return "" === d ? null : { id: d, text: d } }, b.prototype.insertTag = function (a, b, c) { b.unshift(c) }, b.prototype._removeOldTags = function (b) { var c = (this._lastTag, this.$element.find("option[data-select2-tag]")); c.each(function () { this.selected || a(this).remove() }) }, b }), b.define("select2/data/tokenizer", ["jquery"], function (a) { function b(a, b, c) { var d = c.get("tokenizer"); void 0 !== d && (this.tokenizer = d), a.call(this, b, c) } return b.prototype.bind = function (a, b, c) { a.call(this, b, c), this.$search = b.dropdown.$search || b.selection.$search || c.find(".select2-search__field") }, b.prototype.query = function (b, c, d) { function e(b) { var c = g._normalizeItem(b), d = g.$element.find("option").filter(function () { return a(this).val() === c.id }); if (!d.length) { var e = g.option(c); e.attr("data-select2-tag", !0), g._removeOldTags(), g.addOptions([e]) } f(c) } function f(a) { g.trigger("select", { data: a }) } var g = this; c.term = c.term || ""; var h = this.tokenizer(c, this.options, e); h.term !== c.term && (this.$search.length && (this.$search.val(h.term), this.$search.focus()), c.term = h.term), b.call(this, c, d) }, b.prototype.tokenizer = function (b, c, d, e) { for (var f = d.get("tokenSeparators") || [], g = c.term, h = 0, i = this.createTag || function (a) { return { id: a.term, text: a.term } }; h < g.length;) { var j = g[h]; if (-1 !== a.inArray(j, f)) { var k = g.substr(0, h), l = a.extend({}, c, { term: k }), m = i(l); null != m ? (e(m), g = g.substr(h + 1) || "", h = 0) : h++ } else h++ } return { term: g } }, b }), b.define("select2/data/minimumInputLength", [], function () { function a(a, b, c) { this.minimumInputLength = c.get("minimumInputLength"), a.call(this, b, c) } return a.prototype.query = function (a, b, c) { return b.term = b.term || "", b.term.length < this.minimumInputLength ? void this.trigger("results:message", { message: "inputTooShort", args: { minimum: this.minimumInputLength, input: b.term, params: b } }) : void a.call(this, b, c) }, a }), b.define("select2/data/maximumInputLength", [], function () { function a(a, b, c) { this.maximumInputLength = c.get("maximumInputLength"), a.call(this, b, c) } return a.prototype.query = function (a, b, c) { return b.term = b.term || "", this.maximumInputLength > 0 && b.term.length > this.maximumInputLength ? void this.trigger("results:message", { message: "inputTooLong", args: { maximum: this.maximumInputLength, input: b.term, params: b } }) : void a.call(this, b, c) }, a }), b.define("select2/data/maximumSelectionLength", [], function () { function a(a, b, c) { this.maximumSelectionLength = c.get("maximumSelectionLength"), a.call(this, b, c) } return a.prototype.query = function (a, b, c) { var d = this; this.current(function (e) { var f = null != e ? e.length : 0; return d.maximumSelectionLength > 0 && f >= d.maximumSelectionLength ? void d.trigger("results:message", { message: "maximumSelected", args: { maximum: d.maximumSelectionLength } }) : void a.call(d, b, c) }) }, a }), b.define("select2/dropdown", ["jquery", "./utils"], function (a, b) { function c(a, b) { this.$element = a, this.options = b, c.__super__.constructor.call(this) } return b.Extend(c, b.Observable), c.prototype.render = function () { var b = a('<span class="select2-dropdown"><span class="select2-results"></span></span>'); return b.attr("dir", this.options.get("dir")), this.$dropdown = b, b }, c.prototype.bind = function () { }, c.prototype.position = function (a, b) { }, c.prototype.destroy = function () { this.$dropdown.remove() }, c }), b.define("select2/dropdown/search", ["jquery", "../utils"], function (a, b) { function c() { } return c.prototype.render = function (b) { var c = b.call(this), d = a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" style="font-size: 13px; padding: 0 13px;" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>'); return this.$searchContainer = d, this.$search = d.find("input"), c.prepend(d), c }, c.prototype.bind = function (b, c, d) { var e = this; b.call(this, c, d), this.$search.on("keydown", function (a) { e.trigger("keypress", a), e._keyUpPrevented = a.isDefaultPrevented() }), this.$search.on("input", function (b) { a(this).off("keyup") }), this.$search.on("keyup input", function (a) { e.handleSearch(a) }), c.on("open", function () { e.$search.attr("tabindex", 0), e.$search.focus(), window.setTimeout(function () { e.$search.focus() }, 0) }), c.on("close", function () { e.$search.attr("tabindex", -1), e.$search.val("") }), c.on("focus", function () { c.isOpen() && e.$search.focus() }), c.on("results:all", function (a) { if (null == a.query.term || "" === a.query.term) { var b = e.showSearch(a); b ? e.$searchContainer.removeClass("select2-search--hide") : e.$searchContainer.addClass("select2-search--hide") } }) }, c.prototype.handleSearch = function (a) { if (!this._keyUpPrevented) { var b = this.$search.val(); this.trigger("query", { term: b }) } this._keyUpPrevented = !1 }, c.prototype.showSearch = function (a, b) { return !0 }, c }), b.define("select2/dropdown/hidePlaceholder", [], function () { function a(a, b, c, d) { this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c, d) } return a.prototype.append = function (a, b) { b.results = this.removePlaceholder(b.results), a.call(this, b) }, a.prototype.normalizePlaceholder = function (a, b) { return "string" == typeof b && (b = { id: "", text: b }), b }, a.prototype.removePlaceholder = function (a, b) { for (var c = b.slice(0), d = b.length - 1; d >= 0; d--) { var e = b[d]; this.placeholder.id === e.id && c.splice(d, 1) } return c }, a }), b.define("select2/dropdown/infiniteScroll", ["jquery"], function (a) { function b(a, b, c, d) { this.lastParams = {}, a.call(this, b, c, d), this.$loadingMore = this.createLoadingMore(), this.loading = !1 } return b.prototype.append = function (a, b) { this.$loadingMore.remove(), this.loading = !1, a.call(this, b), this.showLoadingMore(b) && this.$results.append(this.$loadingMore) }, b.prototype.bind = function (b, c, d) { var e = this; b.call(this, c, d), c.on("query", function (a) { e.lastParams = a, e.loading = !0 }), c.on("query:append", function (a) { e.lastParams = a, e.loading = !0 }), this.$results.on("scroll", function () { var b = a.contains(document.documentElement, e.$loadingMore[0]); if (!e.loading && b) { var c = e.$results.offset().top + e.$results.outerHeight(!1), d = e.$loadingMore.offset().top + e.$loadingMore.outerHeight(!1); c + 50 >= d && e.loadMore() } }) }, b.prototype.loadMore = function () { this.loading = !0; var b = a.extend({}, { page: 1 }, this.lastParams); b.page++, this.trigger("query:append", b) }, b.prototype.showLoadingMore = function (a, b) { return b.pagination && b.pagination.more }, b.prototype.createLoadingMore = function () { var b = a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'), c = this.options.get("translations").get("loadingMore"); return b.html(c(this.lastParams)), b }, b }), b.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (a, b) { function c(b, c, d) { this.$dropdownParent = d.get("dropdownParent") || a(document.body), b.call(this, c, d) } return c.prototype.bind = function (a, b, c) { var d = this, e = !1; a.call(this, b, c), b.on("open", function () { d._showDropdown(), d._attachPositioningHandler(b), e || (e = !0, b.on("results:all", function () { d._positionDropdown(), d._resizeDropdown() }), b.on("results:append", function () { d._positionDropdown(), d._resizeDropdown() })) }), b.on("close", function () { d._hideDropdown(), d._detachPositioningHandler(b) }), this.$dropdownContainer.on("mousedown", function (a) { a.stopPropagation() }) }, c.prototype.destroy = function (a) { a.call(this), this.$dropdownContainer.remove() }, c.prototype.position = function (a, b, c) { b.attr("class", c.attr("class")), b.removeClass("select2"), b.addClass("select2-container--open"), b.css({ position: "absolute", top: -999999 }), this.$container = c }, c.prototype.render = function (b) { var c = a("<span></span>"), d = b.call(this); return c.append(d), this.$dropdownContainer = c, c }, c.prototype._hideDropdown = function (a) { this.$dropdownContainer.detach() }, c.prototype._attachPositioningHandler = function (c, d) { var e = this, f = "scroll.select2." + d.id, g = "resize.select2." + d.id, h = "orientationchange.select2." + d.id, i = this.$container.parents().filter(b.hasScroll); i.each(function () { a(this).data("select2-scroll-position", { x: a(this).scrollLeft(), y: a(this).scrollTop() }) }), i.on(f, function (b) { var c = a(this).data("select2-scroll-position"); a(this).scrollTop(c.y) }), a(window).on(f + " " + g + " " + h, function (a) { e._positionDropdown(), e._resizeDropdown() }) }, c.prototype._detachPositioningHandler = function (c, d) { var e = "scroll.select2." + d.id, f = "resize.select2." + d.id, g = "orientationchange.select2." + d.id, h = this.$container.parents().filter(b.hasScroll); h.off(e), a(window).off(e + " " + f + " " + g) }, c.prototype._positionDropdown = function () { var b = a(window), c = this.$dropdown.hasClass("select2-dropdown--above"), d = this.$dropdown.hasClass("select2-dropdown--below"), e = null, f = this.$container.offset(); f.bottom = f.top + this.$container.outerHeight(!1); var g = { height: this.$container.outerHeight(!1) }; g.top = f.top, g.bottom = f.top + g.height; var h = { height: this.$dropdown.outerHeight(!1) }, i = { top: b.scrollTop(), bottom: b.scrollTop() + b.height() }, j = i.top < f.top - h.height, k = i.bottom > f.bottom + h.height, l = { left: f.left, top: g.bottom }, m = this.$dropdownParent; "static" === m.css("position") && (m = m.offsetParent()); var n = m.offset(); l.top -= n.top, l.left -= n.left, c || d || (e = "below"), k || !j || c ? !j && k && c && (e = "below") : e = "above", ("above" == e || c && "below" !== e) && (l.top = g.top - n.top - h.height), null != e && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + e), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + e)), this.$dropdownContainer.css(l) }, c.prototype._resizeDropdown = function () { var a = { width: this.$container.outerWidth(!1) + "px" }; this.options.get("dropdownAutoWidth") && (a.minWidth = a.width, a.position = "relative", a.width = "auto"), this.$dropdown.css(a) }, c.prototype._showDropdown = function (a) { this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown() }, c }), b.define("select2/dropdown/minimumResultsForSearch", [], function () { function a(b) { for (var c = 0, d = 0; d < b.length; d++) { var e = b[d]; e.children ? c += a(e.children) : c++ } return c } function b(a, b, c, d) { this.minimumResultsForSearch = c.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), a.call(this, b, c, d) } return b.prototype.showSearch = function (b, c) { return a(c.data.results) < this.minimumResultsForSearch ? !1 : b.call(this, c) }, b }), b.define("select2/dropdown/selectOnClose", [], function () { function a() { } return a.prototype.bind = function (a, b, c) { var d = this; a.call(this, b, c), b.on("close", function (a) { d._handleSelectOnClose(a) }) }, a.prototype._handleSelectOnClose = function (a, b) { if (b && null != b.originalSelect2Event) { var c = b.originalSelect2Event; if ("select" === c._type || "unselect" === c._type) return } var d = this.getHighlightedResults(); if (!(d.length < 1)) { var e = d.data("data"); null != e.element && e.element.selected || null == e.element && e.selected || this.trigger("select", { data: e }) } }, a }), b.define("select2/dropdown/closeOnSelect", [], function () { function a() { } return a.prototype.bind = function (a, b, c) { var d = this; a.call(this, b, c), b.on("select", function (a) { d._selectTriggered(a) }), b.on("unselect", function (a) { d._selectTriggered(a) }) }, a.prototype._selectTriggered = function (a, b) { var c = b.originalEvent; c && c.ctrlKey || this.trigger("close", { originalEvent: c, originalSelect2Event: b }) }, a }), b.define("select2/i18n/en", [], function () { return { errorLoading: function () { return "The results could not be loaded." }, inputTooLong: function (a) { var b = a.input.length - a.maximum, c = "Please delete " + b + " character"; return 1 != b && (c += "s"), c }, inputTooShort: function (a) { var b = a.minimum - a.input.length, c = "Please enter " + b + " or more characters"; return c }, loadingMore: function () { return "Loading more results…" }, maximumSelected: function (a) { var b = "You can only select " + a.maximum + " item"; return 1 != a.maximum && (b += "s"), b }, noResults: function () { return "No results found" }, searching: function () { return "Searching…" } } }), b.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C) { function D() { this.reset() } D.prototype.apply = function (l) { if (l = a.extend(!0, {}, this.defaults, l), null == l.dataAdapter) { if (null != l.ajax ? l.dataAdapter = o : null != l.data ? l.dataAdapter = n : l.dataAdapter = m, l.minimumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, r)), l.maximumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, s)), l.maximumSelectionLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, t)), l.tags && (l.dataAdapter = j.Decorate(l.dataAdapter, p)), (null != l.tokenSeparators || null != l.tokenizer) && (l.dataAdapter = j.Decorate(l.dataAdapter, q)), null != l.query) { var C = b(l.amdBase + "compat/query"); l.dataAdapter = j.Decorate(l.dataAdapter, C) } if (null != l.initSelection) { var D = b(l.amdBase + "compat/initSelection"); l.dataAdapter = j.Decorate(l.dataAdapter, D) } } if (null == l.resultsAdapter && (l.resultsAdapter = c, null != l.ajax && (l.resultsAdapter = j.Decorate(l.resultsAdapter, x)), null != l.placeholder && (l.resultsAdapter = j.Decorate(l.resultsAdapter, w)), l.selectOnClose && (l.resultsAdapter = j.Decorate(l.resultsAdapter, A))), null == l.dropdownAdapter) { if (l.multiple) l.dropdownAdapter = u; else { var E = j.Decorate(u, v); l.dropdownAdapter = E } if (0 !== l.minimumResultsForSearch && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, z)), l.closeOnSelect && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, B)), null != l.dropdownCssClass || null != l.dropdownCss || null != l.adaptDropdownCssClass) { var F = b(l.amdBase + "compat/dropdownCss"); l.dropdownAdapter = j.Decorate(l.dropdownAdapter, F) } l.dropdownAdapter = j.Decorate(l.dropdownAdapter, y) } if (null == l.selectionAdapter) { if (l.multiple ? l.selectionAdapter = e : l.selectionAdapter = d, null != l.placeholder && (l.selectionAdapter = j.Decorate(l.selectionAdapter, f)), l.allowClear && (l.selectionAdapter = j.Decorate(l.selectionAdapter, g)), l.multiple && (l.selectionAdapter = j.Decorate(l.selectionAdapter, h)), null != l.containerCssClass || null != l.containerCss || null != l.adaptContainerCssClass) { var G = b(l.amdBase + "compat/containerCss"); l.selectionAdapter = j.Decorate(l.selectionAdapter, G) } l.selectionAdapter = j.Decorate(l.selectionAdapter, i) } if ("string" == typeof l.language) if (l.language.indexOf("-") > 0) { var H = l.language.split("-"), I = H[0]; l.language = [l.language, I] } else l.language = [l.language]; if (a.isArray(l.language)) { var J = new k; l.language.push("en"); for (var K = l.language, L = 0; L < K.length; L++) { var M = K[L], N = {}; try { N = k.loadPath(M) } catch (O) { try { M = this.defaults.amdLanguageBase + M, N = k.loadPath(M) } catch (P) { l.debug && window.console && console.warn && console.warn('Select2: The language file for "' + M + '" could not be automatically loaded. A fallback will be used instead.'); continue } } J.extend(N) } l.translations = J } else { var Q = k.loadPath(this.defaults.amdLanguageBase + "en"), R = new k(l.language); R.extend(Q), l.translations = R } return l }, D.prototype.reset = function () { function b(a) { function b(a) { return l[a] || a } return a.replace(/[^\u0000-\u007E]/g, b) } function c(d, e) { if ("" === a.trim(d.term)) return e; if (e.children && e.children.length > 0) { for (var f = a.extend(!0, {}, e), g = e.children.length - 1; g >= 0; g--) { var h = e.children[g], i = c(d, h); null == i && f.children.splice(g, 1) } return f.children.length > 0 ? f : c(d, f) } var j = b(e.text).toUpperCase(), k = b(d.term).toUpperCase(); return j.indexOf(k) > -1 ? e : null } this.defaults = { amdBase: "./", amdLanguageBase: "./i18n/", closeOnSelect: !0, debug: !1, dropdownAutoWidth: !1, escapeMarkup: j.escapeMarkup, language: C, matcher: c, minimumInputLength: 0, maximumInputLength: 0, maximumSelectionLength: 0, minimumResultsForSearch: 0, selectOnClose: !1, sorter: function (a) { return a }, templateResult: function (a) { return a.text }, templateSelection: function (a) { return a.text }, theme: "default", width: "resolve" } }, D.prototype.set = function (b, c) { var d = a.camelCase(b), e = {}; e[d] = c; var f = j._convertData(e); a.extend(this.defaults, f) }; var E = new D; return E }), b.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function (a, b, c, d) { function e(b, e) { if (this.options = b, null != e && this.fromElement(e), this.options = c.apply(this.options), e && e.is("input")) { var f = a(this.get("amdBase") + "compat/inputData"); this.options.dataAdapter = d.Decorate(this.options.dataAdapter, f) } } return e.prototype.fromElement = function (a) { var c = ["select2"]; null == this.options.multiple && (this.options.multiple = a.prop("multiple")), null == this.options.disabled && (this.options.disabled = a.prop("disabled")), null == this.options.language && (a.prop("lang") ? this.options.language = a.prop("lang").toLowerCase() : a.closest("[lang]").prop("lang") && (this.options.language = a.closest("[lang]").prop("lang"))), null == this.options.dir && (a.prop("dir") ? this.options.dir = a.prop("dir") : a.closest("[dir]").prop("dir") ? this.options.dir = a.closest("[dir]").prop("dir") : this.options.dir = "rtl"), a.prop("disabled", this.options.disabled), a.prop("multiple", this.options.multiple), a.data("select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), a.data("data", a.data("select2Tags")), a.data("tags", !0)), a.data("ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), a.attr("ajax--url", a.data("ajaxUrl")), a.data("ajax--url", a.data("ajaxUrl"))); var e = {}; e = b.fn.jquery && "1." == b.fn.jquery.substr(0, 2) && a[0].dataset ? b.extend(!0, {}, a[0].dataset, a.data()) : a.data(); var f = b.extend(!0, {}, e); f = d._convertData(f); for (var g in f) b.inArray(g, c) > -1 || (b.isPlainObject(this.options[g]) ? b.extend(this.options[g], f[g]) : this.options[g] = f[g]); return this }, e.prototype.get = function (a) { return this.options[a] }, e.prototype.set = function (a, b) { this.options[a] = b }, e }), b.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (a, b, c, d) {
            var e = function (a, c) { null != a.data("select2") && a.data("select2").destroy(), this.$element = a, this.id = this._generateId(a), c = c || {}, this.options = new b(c, a), e.__super__.constructor.call(this); var d = a.attr("tabindex") || 0; a.data("old-tabindex", d), a.attr("tabindex", "-1"); var f = this.options.get("dataAdapter"); this.dataAdapter = new f(a, this.options); var g = this.render(); this._placeContainer(g); var h = this.options.get("selectionAdapter"); this.selection = new h(a, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, g); var i = this.options.get("dropdownAdapter"); this.dropdown = new i(a, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, g); var j = this.options.get("resultsAdapter"); this.results = new j(a, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown); var k = this; this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function (a) { k.trigger("selection:update", { data: a }) }), a.addClass("select2-hidden-accessible"), a.attr("aria-hidden", "true"), this._syncAttributes(), a.data("select2", this) }; return c.Extend(e, c.Observable), e.prototype._generateId = function (a) { var b = ""; return b = null != a.attr("id") ? a.attr("id") : null != a.attr("name") ? a.attr("name") + "-" + c.generateChars(2) : c.generateChars(4), b = b.replace(/(:|\.|\[|\]|,)/g, ""), b = "select2-" + b }, e.prototype._placeContainer = function (a) { a.insertAfter(this.$element); var b = this._resolveWidth(this.$element, this.options.get("width")); null != b && a.css("width", b) }, e.prototype._resolveWidth = function (a, b) { var c = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i; if ("resolve" == b) { var d = this._resolveWidth(a, "style"); return null != d ? d : this._resolveWidth(a, "element") } if ("element" == b) { var e = a.outerWidth(!1); return 0 >= e ? "auto" : e + "px" } if ("style" == b) { var f = a.attr("style"); if ("string" != typeof f) return null; for (var g = f.split(";"), h = 0, i = g.length; i > h; h += 1) { var j = g[h].replace(/\s/g, ""), k = j.match(c); if (null !== k && k.length >= 1) return k[1] } return null } return b }, e.prototype._bindAdapters = function () { this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container) }, e.prototype._registerDomEvents = function () { var b = this; this.$element.on("change.select2", function () { b.dataAdapter.current(function (a) { b.trigger("selection:update", { data: a }) }) }), this.$element.on("focus.select2", function (a) { b.trigger("focus", a) }), this._syncA = c.bind(this._syncAttributes, this), this._syncS = c.bind(this._syncSubtree, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._syncA); var d = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver; null != d ? (this._observer = new d(function (c) { a.each(c, b._syncA), a.each(c, b._syncS) }), this._observer.observe(this.$element[0], { attributes: !0, childList: !0, subtree: !1 })) : this.$element[0].addEventListener && (this.$element[0].addEventListener("DOMAttrModified", b._syncA, !1), this.$element[0].addEventListener("DOMNodeInserted", b._syncS, !1), this.$element[0].addEventListener("DOMNodeRemoved", b._syncS, !1)) }, e.prototype._registerDataEvents = function () { var a = this; this.dataAdapter.on("*", function (b, c) { a.trigger(b, c) }) }, e.prototype._registerSelectionEvents = function () { var b = this, c = ["toggle", "focus"]; this.selection.on("toggle", function () { b.toggleDropdown() }), this.selection.on("focus", function (a) { b.focus(a) }), this.selection.on("*", function (d, e) { -1 === a.inArray(d, c) && b.trigger(d, e) }) }, e.prototype._registerDropdownEvents = function () { var a = this; this.dropdown.on("*", function (b, c) { a.trigger(b, c) }) }, e.prototype._registerResultsEvents = function () { var a = this; this.results.on("*", function (b, c) { a.trigger(b, c) }) }, e.prototype._registerEvents = function () { var a = this; this.on("open", function () { a.$container.addClass("select2-container--open") }), this.on("close", function () { a.$container.removeClass("select2-container--open") }), this.on("enable", function () { a.$container.removeClass("select2-container--disabled") }), this.on("disable", function () { a.$container.addClass("select2-container--disabled") }), this.on("blur", function () { a.$container.removeClass("select2-container--focus") }), this.on("query", function (b) { a.isOpen() || a.trigger("open", {}), this.dataAdapter.query(b, function (c) { a.trigger("results:all", { data: c, query: b }) }) }), this.on("query:append", function (b) { this.dataAdapter.query(b, function (c) { a.trigger("results:append", { data: c, query: b }) }) }), this.on("keypress", function (b) { var c = b.which; a.isOpen() ? c === d.ESC || c === d.UP && b.altKey ? (a.close(), b.preventDefault()) : (c === d.ENTER || c === d.TAB) ? (a.trigger("results:select", {}), b.preventDefault()) : c === d.SPACE && b.ctrlKey ? (a.trigger("results:toggle", {}), b.preventDefault()) : c === d.UP ? (a.trigger("results:previous", {}), b.preventDefault()) : c === d.DOWN && (a.trigger("results:next", {}), b.preventDefault()) : (c === d.ENTER || c === d.SPACE || c === d.DOWN && b.altKey) && (a.open(), b.preventDefault()) }) }, e.prototype._syncAttributes = function () { this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {}) }, e.prototype._syncSubtree = function (a, b) { var c = !1, d = this; if (!a || !a.target || "OPTION" === a.target.nodeName || "OPTGROUP" === a.target.nodeName) { if (b) if (b.addedNodes && b.addedNodes.length > 0) for (var e = 0; e < b.addedNodes.length; e++) { var f = b.addedNodes[e]; f.selected && (c = !0) } else b.removedNodes && b.removedNodes.length > 0 && (c = !0); else c = !0; c && this.dataAdapter.current(function (a) { d.trigger("selection:update", { data: a }) }) } }, e.prototype.trigger = function (a, b) { var c = e.__super__.trigger, d = { open: "opening", close: "closing", select: "selecting", unselect: "unselecting" }; if (void 0 === b && (b = {}), a in d) { var f = d[a], g = { prevented: !1, name: a, args: b }; if (c.call(this, f, g), g.prevented) return void (b.prevented = !0) } c.call(this, a, b) }, e.prototype.toggleDropdown = function () { this.options.get("disabled") || (this.isOpen() ? this.close() : this.open()) }, e.prototype.open = function () { this.isOpen() || this.trigger("query", {}) }, e.prototype.close = function () { this.isOpen() && this.trigger("close", {}) }, e.prototype.isOpen = function () { return this.$container.hasClass("select2-container--open") }, e.prototype.hasFocus = function () { return this.$container.hasClass("select2-container--focus") }, e.prototype.focus = function (a) { this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {})) }, e.prototype.enable = function (a) { this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), (null == a || 0 === a.length) && (a = [!0]); var b = !a[0]; this.$element.prop("disabled", b) }, e.prototype.data = function () { this.options.get("debug") && arguments.length > 0 && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.'); var a = []; return this.dataAdapter.current(function (b) { a = b }), a }, e.prototype.val = function (b) { if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == b || 0 === b.length) return this.$element.val(); var c = b[0]; a.isArray(c) && (c = a.map(c, function (a) { return a.toString() })), this.$element.val(c).trigger("change") }, e.prototype.destroy = function () {
                this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._syncA), null != this._observer ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && (this.$element[0].removeEventListener("DOMAttrModified", this._syncA, !1), this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, !1), this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, !1)), this._syncA = null, this._syncS = null, this.$element.off(".select2"), this.$element.attr("tabindex", this.$element.data("old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null;
            }, e.prototype.render = function () { var b = a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>'); return b.attr("dir", this.options.get("dir")), this.$container = b, this.$container.addClass("select2-container--" + this.options.get("theme")), b.data("element", this.$element), b }, e
        }), b.define("jquery-mousewheel", ["jquery"], function (a) { return a }), b.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults"], function (a, b, c, d) { if (null == a.fn.select2) { var e = ["open", "close", "destroy"]; a.fn.select2 = function (b) { if (b = b || {}, "object" == typeof b) return this.each(function () { var d = a.extend(!0, {}, b); new c(a(this), d) }), this; if ("string" == typeof b) { var d, f = Array.prototype.slice.call(arguments, 1); return this.each(function () { var c = a(this).data("select2"); null == c && window.console && console.error && console.error("The select2('" + b + "') method was called on an element that is not using Select2."), d = c[b].apply(c, f) }), a.inArray(b, e) > -1 ? this : d } throw new Error("Invalid arguments for Select2: " + b) } } return null == a.fn.select2.defaults && (a.fn.select2.defaults = d), c }), { define: b.define, require: b.require }
    }(), c = b.require("jquery.select2"); return a.fn.select2.amd = b, c
});




var translationsFA = {
    "font": "IranSans",
    "direction": "rtl",
    "float": "right",
    "h1": "30",
    "h2": "25",
    "h3": "20",
    "h4": "15",
    "h5": "10",
    "h6": "5",
    "title": "سامانه اعتبار سنجی نشانی شهروند",
    "menu_1": "تایید نشانی",
    "menu_2": "راهنما",
    "menu_3": "درخواست جدید",
    "menu_4": "رهگیری",
    "menu_5": "گزارش اشتباه",
    "menu_6": "ارسال مجدد",
    "menu_7": "ثبت شکایات",
    "menu_8": "درباره ما",
    "text_1": "اعتبار سنجی نشانی شهروند،",
    "text_2": "خدمتی است که شرکت ملی پست با همکاری شرکت رایانه روژینا، به اشخاص حقیقی و حقوقی( دولتی و خصوصی) این امکان را می دهد تا بر اساس ساز و کار اجرایی، صحت نشانی پستی مشتریان و مخاطبان خود را اعتبار سنجی نمایند، در این خدمت، نامه ای حاوی رمز (کد) ۶ رقمی اعتبار نشانی فرد مورد نظر تولید و در چرخه پستی جهت توزیع قرار می گیرد و مخاطب جهت تایید نشانی خود می بایست با استفاده از ابزار های ارتباطی و الکترونیکی (وب سایت، تلفن و پیامک) کد اعتبار سنجی خود را به سامانه اعلام نماید.",
    "text_3": "فرایند اجرایی سامانه",
    "text_4": "ارسال درخواست",
    "text_5": "تقاضای اعتبار سنجی نشانی شهروند توسط موسسه یا  خود شهروند به صورت آنلاین به سیستم ارسال می شود.",
    "text_6": "تحویل نامه",
    "text_7": "شرکت ملی پست نامه ای را حاوی یک رمز عددی چاپ و  برای نشانی شهروند ارسال می کند.",
    "text_8": "تایید نامه",
    "text_9": "شهروند نامه را دریافت و پس از مطالعه، کد ۶ رقمی اعتبار سنجی را از طریق این وب سایت و یا تلفن 02141924 و یا پیامک به سامانه ارسال می کند.",
    "text_10": "درخواست مجدد",
    "text_11": "اگر شهروند نامه اعتبار سنجی را گم کرد و یا نامه بدست وی نرسید، می تواند تقاضای ارسال مجدد کند. پرداخت هزینه ارسال مجدد توسط شهروند الزامی است",
    "text_12": "مطلع شدن سازمان",
    "text_13": "اعتبار سنجی نشانی شهروند به سازمان یا موسسه متقاضی نیز جهت اطلاع فوری ارسال می شود.",
    "text_14": "اعتبار سنجی نشانی",
    "text_15": "در صورت صحت کد ۶ رقمی اعتبار سنجی، سامانه بلافاصله نشانی شهروند را اعتبار سنجی می کند و به وی اطلاع می دهد.",
    "text_16": " شرکت ملی پست قبول و توزیع نامه های حاوی رمز یکتای اعتبار سنجی نشانی شهروندان را به عهده دارد. و شهروندان می بایست پس از دریافت نامه حداکثر ظرف دو هفته جهت اعتبار سنجی نشانی خود « رمز ۶ رقمی اعتبار سنجی » را به یکی از طرق ۱- مراجعه به این سایت ۲- تماس با شماره تلفن ۰۲۱۴۱۹۲۴ و روش سوم ارسال کد تایید به همراه کد تایید به شماره پیامکی( 02141924) اقدام نمایند. عدم اعلام کد ارسالی در مهلت تعیین شده، به مفهوم عدم تایید اعتبار نشانی پستی فرد تلقی گردیده و منجر به عدم ارائه خدمات و سرویسهای رسمی به مخاطب خواهد بود.",
    "text_17": "درخواست جدید برای اعتبار سنجی نشانی شهروند",
    "text_18": "شهروند گرامی، شما می توانید با مراجعه به بخش درخواست جدید، نسبت به اعتبار سنجی نشانی خود اقدام نمایید. درصورت تایید، نشانی تایید شده به مدت سه ماه در سیستم معتبر خواهد بود، لذا با مراجعه آنی به بانکها ویا سایر موسساتی که نیاز به اعتبار سنجی نشانی شما می باشد،  دیگر نیازی به انتظار برای دریافت نامه اعتبار سنجی نشانی را نخواهید داشت و سیستم به طور خودکار نشانی شما را اعتبار سنجی خواهد نمود",
    "text_19": "لطفا فرم زیر را به دقت تکمیل نمایید تا نامه اعتبار سنجی به نشانی شما ارسال شود . بسته به نوع سرویس پستی ، هزینه ارسال متفاوت خواهد بود و در مرحله بعد قابل مشاهده است .",
    "text_20": "توجه : تکمیل گزینه های ستاره دار الزامی می باشد.",
    "text_21": "نوع شخصیت",
    "text_22": "جنسیت",
    "text_23": "مرد",
    "text_24": "زن",
    "text_25": "رهگیری و مشاهده آخرین وضعیت نامه اعتبار سنجی",
    "text_26": "مخاطبین محترم، چنانچه نامه اعتبار سنجی تاکنون در نشانی اعلام شده به دست شما نرسیده است، می توانید با وارد کردن کد رهگیری، آخرین وضعیت نامه ارسالی را مشاهده نمایید. ضمنا در زمان تولید نامه، کد رهگیری به شماره تلفن همراه شما ارسال خواهد شد.",
    "text_27": "اعلام توزیع اشتباه در نشانی گیرنده",
    "text_28": "هموطن گرامی: چنانچه نامه دریافتی، اشتباها در نشانی شما توزیع و تحویل شما گردیده است و یا مطمئین هستید شخص نامبرده در نشانی درج شده بر روی پاکت حضور دائمی و قانونی ندارد، لطفا کد رهگیری نامه را بعلت « توزیع اشتباه در نشانی » در ذیل وارد نمایید.",
    "text_29": "ثبت درخواست ارسال مجدد نامه اعتبار سنجی نشانی",
    "text_30": "چنانچه پس از گذشت بیش از یک هفته از ثبت درخواست، نامه اعتبار سنجی به دست شما نرسیده، یا مهلت زمانی نامه جهت ثبت کد رمز ارسالی منقضی و یا رمز ارسالی مفقود گردیده باشد، می توانید نسبت به درخواست ارسال مجدد نامه اقدام نمایید. جهت ثبت درخواست ارسال مجدد لطفا در قسمت زیر کد پیگیری خود را وارد نمایید.",
    "text_31": "بدیهی است درخواست مجدد، مشمول پرداخت هزینه ارسال پستی است",
    "text_32": "ثبت نظر، شکایت و یا انتقاد",
    "text_33": "چنانچه درخصوص این سرویس پرسشی دارید و یا در خصوص اعتبار سنجی و تکمیل نشانی دچار مشکل شده اید، لطفا فرم زیر را تکمیل نمایید و شماره رهگیری خود را در صورت وجود وارد نمایید",
    "text_34": "طرح اعتبار سنجی نشانی شهروند با مشارکت شرکت ملی پست و شرکت رایانه روژینا به بهره برداری رسیده است. در این طرح، کلیه سازمانها و ارگانها و حتی شرکتهای خصوصی می توانند ضمن تماس با واحد بازرگانی شرکت رایانه روژینا در تهران، نسبت به عقد قرارداد دریافت سرویس اقدام نمایند. وب سرویس اعتبار سنجی نشانی، به سازمانها کمک می کند که بدون نیاز به داشتن تجهیزات و برنامه ریزی های متعدد نرم افزاری، براحتی و با کمک شبکه وسیع حمل و نقل پستی، اقدام به ارسال نامه اعتبار سنجی به مقصد مشتری یا متقاضی مربوطه نمایند. نامه اعتبار سنجی ارسالی، دارای یک کد رمز 6 رقمی است که شهروند به همراه کد ملی خود می تواند از طریق سامانه وب (همین سامانه) یا از طریق تلفن و پیامک اقدام به اعتبار سنجی نماید.",
    "text_35": " شرکت ملی پست  :",
    "text_36": "نشانی : تهران ، خیابان دکتر بهشتی ، بعد از بزرگراه مدرس ، شماره 267 ، ساختمان مرکزی شرکت پست ، طبقه سوم ، دفتر روابط عمومی شرکت پست جمهوری اسلامی ایران",
    "text_37": " شرکت رایانه روژینا :",
    "text_38": " نشانی : تهران ، خیابان شریعتی ، بالا تر از هویزه، کوچه جهاد، پلاک3، طبقه اول شرقی",
    "text_39": "شماره تماس:  88522948 - 88733022",
    "text_40": "عضو خبرنامه ما شوید",
    "text_41": "قوانین و مقررات",
    "text_42": "برای مشاهده قوانین و مقررات سایت روی لینک قوانین سایت کلیک نمایید",
    "text_43": "تماس",
    "text_44": "نشانی : تهران ، خیابان شریعتی ، بالا تر از هویزه، کوچه جهاد، پلاک3، طبقه اول شرقی",
    "text_45": "تلفن",
    "text_46": "وبسایت",
    "text_47": " تمامی حقوق برای",
    "text_48": "شرکت ملی پست",
    "text_49": "و شرکت رایانه روژینا",
    "text_50": "محفوظ می باشد",
    "text_51": "کد تایید",
    "text_52": "شماره ملی",
    "text_53": "نام *",
    "text_54": "نام خانوادگی *",
    "text_55": "شماره تلفن همراه *",
    "text_56": "ایمیل",
    "text_57": "نام شرکت *",
    "text_58": "شماره ملی *",
    "text_59": "شماره تلفن شرکت *",
    "text_60": "ایمیل شرکت / موسسه",
    "text_61": "کد پستی مکان فعلی شما *",
    "text_62": "نام استان",
    "text_63": "نام شهرستان",
    "text_64": " بخش/محله/دهستان",
    "text_65": "نام بخش / محله  / دهستان *",
    "text_66": " نوع معبر اصلی",
    "text_67": "معبر اصلی *",
    "text_68": "نوع معبر فرعی 1 ",
    "text_69": "معبر فرعی 1",
    "text_70": "نوع معبر فرعی 2 ",
    "text_71": "معبر فرعی 2",
    "text_72": "پلاک / شماره *",
    "text_73": "شماره واحد",
    "text_74": "نام ساختمان",
    "text_75": " ادامه به مرحله بعد",
    "text_76": "کد رهگیری",
    "text_77": "کد رهگیری در صورت وجود",
    "text_78": "ارسال گزارش",
    "text_79": "ارسال مجدد نامه",
    "text_80": "ارسال ",
    "text_81": "ایمیل شما",
    "text_82": "نام و نام خانوادگی",
    "text_83": "ایمیل",
    "text_84": "شماره تلفن همراه ",
    "text_85": "پرسش خود را در اینجا تایپ کنید",
    "text_86": "در صورتی که  نامه اعتبار سنجی نشانی بدست شما رسیده است،<br />لطفا کد ملی و کد رمز خود را در قسمت بالا وارد نمایید و دکمه تایید نشانی را فشار دهید.",
    "text_87": "همچنین می توانید برای اعتبار سنجی نشانی، با شماره 02141924 تماس بگیرید<br />و یا کدملی و کد رمز تایید را با درج یک فاصله بین آنها، به شماره 02141924 پیامک کنید.",
    "text_88": "اگر از مدت زمان انقضا نامه شما گذشته باشد،<br />  می توانید تقاضای ارسال مجدد کنید که نیاز به کد رهگیری نامه فعلی خواهید داشت.",
    "text_89": "مشخصات نامه اعتبار سنجی شما :",
    "text_90": "شخص حقیقی",
    "text_91": "شخص حقوقی",
    "lisense": "© 1395",
    "floor": "طبقه",
    "successful": "موفقیت آمیز",
    "error": "خطا",
    "Confirm": "تایید",
    "validation_1": "لطفا کد ملی 10 رقمی خود را وارد نمایید",
    "validation_2": "لطفا کد ۶ رقمی اعتبار سنجی خود را وارد نمایید",
    "validation_3": "کد رهگیری 10 تا 20 رقم می باشد، لطفا 10رقم تا 20 رقم وارد کنید",
    "validation_4": "لطفا پرسش خود را وارد نمایید",
    "validation_5": "لطفا نام خود را وارد نمایید",
    "validation_6": "لطفا نام خانوادگی خود را وارد نمایید",
    "validation_7": "لطفا کد ملی خود را وارد نمایید",
    "validation_8": "لطفا شماره تلفن همراه خود که با  09 آغاز میشود را وارد نمایید  ",
    "validation_9": "لطفا ایمیل  خود را وارد نمایید",
    "validation_10": "لطفا نام شرکت را وارد نمایید",
    "validation_11": "لطفا شماره ملی 13 رقمی شرکت را وارد نمایید",
    "validation_12": "لطفا شماره تلفن 11 رقمی شرکت را وارد نمایید ",
    "validation_13": "لطفا ایمیل شرکت / موسسه را وارد نمایید",
    "validation_14": "لطفا کد پستی 10 رقمی مکان خود را وارد نمایید",
    "validation_15": "لطفا نام استان  خود را انتخاب نمایید",
    "validation_16": "لطفا نام شهرستان  خود را انتخاب نمایید",
    "validation_17": "لطفا بخش، محله یا دهستان را انتخاب نمایید",
    "validation_18": "لطفا نام محله یا بخش  خود را وارد نمایید",
    "validation_19": "لطفا شماره پلاک   خود را وارد کنید",
    "validation_20": "لطفا شماره طبقه  خود را وارد کنید ",
    "validation_21": "لطفا شماره واحد  خود را وارد کنید ",
    "validation_22": "لطفا نام ساختمان خود را وارد کنید ",
    "text_92": "اطلاعات شما ثبت شد، پس از انتخاب نوع ارسال و پرداخت وجه ، نامه اعتبار سنجی برایتان ارسال میشود"
};
var translationsEN = {
    "font": "sans-serif",
    "direction": "ltr",
    "float": "left",
    "h1": "30",
    "h2": "25",
    "h3": "20",
    "h4": "15",
    "h5": "10",
    "h6": "5",
    "title": "Address Verification System for Citizens ",
    "menu_1": "Address Verification",
    "menu_2": "Help",
    "menu_3": "New Request",
    "menu_4": "Tracking",
    "menu_5": "False report",
    "menu_6": "Resend",
    "menu_7": "Complaints registration",
    "menu_8": "About Us",
    "text_1": "Address Verification System ",
    "text_2": "A service of Iran's national Post collaborating with Rojina Computer Ltd allowing natural and legal persons (public and private) to verify the address of their customers based on enforcement mechanisms. The service provides a letter contains of a 6-digit code that is being entered to the post cycle for distribution. The receiver should submit the code using electronic communication tools (website, telephone, SMS) into the portals. ",
    "text_3": "System Execution Process",
    "text_4": "Sending Request",
    "text_5": "The address verification request is sent online to the system by the institution or citizen.",
    "text_6": "Delivery of letter",
    "text_7": "National Post Office print a letter with a numeric code and sent it to the citizen's address.",
    "text_8": "Verify letter",
    "text_9": "The Citizen receive the letter and after reading it submit the 6 digit code to the portal using one of these methods (website, phone (021-41924) and SMS).",
    "text_10": "Reapply",
    "text_11": "If citizen lost the letter or it didn't arrive to right address, it is possible to reapply for a new letter. Sending a new letter requirs payment of the fee. ",
    "text_12": "Notifiying the organization ",
    "text_13": "verification of citizen's address will be sent to applicant's organization or institution for instant information.",
    "text_14": "verifying Address",
    "text_15": "if the entered 6digit verification code is valid, then the citizen's address immediately is being verified and system notifies the applicant.",
    "text_16": "National Post Office is responsible for the acceptance and distribution of letters contains unique verification code. And citizens must apply for credentials own address using one of these methods (website, call 021-41924, or sending verification code with their national code to 021-41924) after receiving the verification letter within two weeks. Otherwise it means the address of them is not verifies and consequently results in lack of formal services to the them.",
    "text_17": "A new request for validation citizenship",
    "text_18": "Dear citizen, you can go to the section of New Request to validate your address. If your address verification process is successfully done, then the address would remain as a verified and valid address in the system for three months. Therefore, if you go to a bank or other institutions that are required to validate your address, the system automatically do that with no need for you to do it again.",
    "text_19": "For receiving the << Address Verification letter >> on your current address, please fill out the form below carefully. Depending on the type of service the cost will vary and it is noticeable at the next step.",
    "text_20": "Note: Completing options marked with an asterisk are mandatory.",
    "text_21": "Person-Type",
    "text_22": "Gender",
    "text_23": "Men",
    "text_24": "Wemen",
    "text_25": "Track and view the latest status of a submitted verification letter",
    "text_26": "Dear audience, if you didn't receive the verification letter, it is possible to track the latest status of your letter by entering your tracking code. In addition, the tracking code will be sent to your mobile at the time of letter production.",
    "text_27": "Declaration of a wrong distribution in reciever's address",
    "text_28": "Dear compatriots: If you received a letter by mistake or you are sure that the person named on the envelope has no permanent or legal presence on the address, please enter << verification code >> to report wrong address distribution bellow.",
    "text_29": "submission of the request for resending verification letter",
    "text_30": "If you didn't receive the verification letter after one week or the expiration date of submitting the verification code is passed or loss of verification code, you can reapply for the verification process. To submit another request (reapply) please enter your tracking code bellow.",
    "text_31": "Obiousely reapply requires the payment of mailing fee",
    "text_32": "Submit comments, complaints or criticism",
    "text_33": "Incase of having any question about the service or facing any problem with the process of verification, please fill the form bellow",
    "text_34": "Address Verification Web Service is a RESTFUL webservice which helps the organization to easily track and verify the costumer address by sending secure automated letters to their home or work address registered on the database. The Address verification letter includes a 6-digit secrect code which the client should use it in combination with his national ID to verify his address. There are 3 options for clients to connect to AVS which are Phone, Web and SMS.",
    "text_35": " National Post Company of IRAN :",
    "text_36": "Address: Customer Service Dept, 3rd Floor, Central Building of Post Company, No. 267, Beheshti Street, Tehran, IRAN",
    "text_37": " Rojina Computer Ltd :",
    "text_38": "Address: Apt 1st East, No. 3, Jahad Alley, Shariaty Street, Tehran , IRAN",
    "text_39": "Contact :  88522948 - 88733022",
    "text_40": "Join our newsletter",
    "text_41": "Terms and Conditions",
    "text_42": "Click on the rule's link to see terms and conditions",
    "text_43": "Contact",
    "text_44": "Address: Apt 1st East, No. 3, Jahad Alley, Shariaty Street, Tehran , IRAN",
    "text_45": "Contact",
    "text_46": "Website",
    "text_47": "All rights is reserved for",
    "text_48": "National Post Company of IRAN ",
    "text_49": "and Rojina Computer Ltd",
    "text_50": ".",
    "text_51": "Code",
    "text_52": "national code",
    "text_53": "* First Name",
    "text_54": "* Last Naame",
    "text_55": "* Phone Number",
    "text_56": "Email",
    "text_57": "* Company Name",
    "text_58": "* National Code",
    "text_59": "* Company Phone Number",
    "text_60": "Company Email",
    "text_61": "* Postal Code for your current location",
    "text_62": "Province Name",
    "text_63": "City Name",
    "text_64": "Section / district / village",
    "text_65": "* Name of Section / district / village",
    "text_66": "Type of main road",
    "text_67": "* Name of main road",
    "text_68": "Secondary road type 1",
    "text_69": "Secondary road Name 1",
    "text_70": "Secondary road type 2",
    "text_71": "Secondary road Name 2",
    "text_72": "* No",
    "text_73": "Unit",
    "text_74": "Building",
    "text_75": "Continue to next step",
    "text_76": "tracking code",
    "text_77": "if there are tracking code",
    "text_78": "report sending",
    "text_79": "Resend verification letter",
    "text_80": "Send ",
    "text_81": "Email",
    "text_82": "Full Name",
    "text_83": "Email",
    "text_84": "Phone Number ",
    "text_85": "Type in your question here",
    "text_86": "if you receive the letter,<br/> please enter your national ID and verification code above and press Address Verification bottun.",
    "text_87": "Also it is possible to call (021-41924) for verifying the address or sending either National Code or 6digit code with a <br/> between as an SMS to (021-41924).",
    "text_88": "If your letter expiration time is passed you can reapply and then you need to have the current tracking code.",
    "text_89": " Specifications of verification letter :",
    "text_90": "natural person",
    "text_91": "legal person",
    "lisense": "2016 ©",
    "floor": "Floor",
    "successful": "successful",
    "error": "error",
    "Confirm": "Confirm",
    "validation_1": "Please enter your 10-digit national code",
    "validation_2": "Please enter your 6-digit code validation",
    "validation_3": " tracking code is 10 to 20-digit, please enter the 10 digits to 20 digits",
    "validation_4": "Please enter your question",
    "validation_5": "لطفا نام خود را وارد نمایید",
    "validation_6": "لطفا نام خانوادگی خود را وارد نمایید",
    "validation_7": "لطفا کد ملی خود را وارد نمایید",
    "validation_8": "لطفا شماره تلفن همراه خود که با  09 آغاز میشود را وارد نمایید  ",
    "validation_9": "لطفا ایمیل  خود را وارد نمایید",
    "validation_10": "لطفا نام شرکت را وارد نمایید",
    "validation_11": "لطفا شماره ملی 13 رقمی شرکت را وارد نمایید",
    "validation_12": "لطفا شماره تلفن 11 رقمی شرکت را وارد نمایید ",
    "validation_13": "لطفا ایمیل شرکت / موسسه را وارد نمایید",
    "validation_14": "لطفا کد پستی 10 رقمی مکان خود را وارد نمایید",
    "validation_15": "لطفا نام استان  خود را انتخاب نمایید",
    "validation_16": "لطفا نام شهرستان  خود را انتخاب نمایید",
    "validation_17": "لطفا بخش، محله یا دهستان را انتخاب نمایید",
    "validation_18": "لطفا نام محله یا بخش  خود را وارد نمایید",
    "validation_19": "لطفا شماره پلاک   خود را وارد کنید",
    "validation_20": "لطفا شماره طبقه  خود را وارد کنید ",
    "validation_21": "لطفا شماره واحد  خود را وارد کنید ",
    "validation_22": "لطفا نام ساختمان خود را وارد کنید ",
    "text_92": "اطلاعات شما ثبت شد، پس از انتخاب نوع ارسال و پرداخت وجه ، نامه اعتبار سنجی برایتان ارسال میشود"

};




 