'use strict';

var module = angular.module('post.Controller', []);


//-------------------------Home-------------------------


//Home Controler
module.controller('HomeCtrl', ['$scope', '$rootScope', '$routeParams', 'Model', 'Auth', function ($scope, $rootScope, $routeParams, Model, Auth) {

    var request = false;
    $scope.userChangePassword = function (current_password, password, password_retype) {
        if (request) return;
        request = true;
        $scope.successfullChangePassword = '';
        $scope.errorChangePassword = '';

        Model.userChangePassword(current_password, password, password_retype).then(function (data) {
            $scope.successfullChangePassword = true;
            setTimeout(function () {
                window.location.href = '/panel/#!/';
            }, 1000);

        }, function (error) {
            $scope.errorChangePassword = true;
        }).finally(function () {
            request = false;
        });
    };

    $rootScope.signIn = function (userName, password) {
        $scope.loginStatus = '';
        Model.SignIn(userName, password).then(function (data) {
            Model.companyInfo().then(function (data) {
                var user = '';
                if (data.name) {
                    user = data.name
                } else {
                    user = 'کاربر'
                }
                Auth.setUser(user);
                $rootScope.CompanyName = user;
                window.location.href = '#!/company-request-search';

            }, function (error) {
                $scope.loginStatus = 'نام کاربری یا رمز عبور اشتباه است';
            }).finally(function () {

            });

        }, function (error) {
            $scope.loginStatus = 'نام کاربری یا رمز عبور اشتباه است';
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

    $rootScope.forgetPassword = function (name, email, cell, position) {

        Model.userForgetPassword(name, email, cell, position).then(function (data) {
            $('#forgetBtn').attr('disabled', 'disabled');
            $scope.forgetStatus = 'درخواست شما با موفقیت ثبت شد ، همکاران ما به زودی با شما تماس خواهند گرفت';
        }, function (error) {
            $scope.forgetStatus = 'عملیات با خطا مواجه شد ، لطفا بعدا دوباره تلاش نمایید.';

        }).finally(function () {

        });
    };

    $rootScope.organizationalPositionList = function () {
        Model.organizationalPositionList().then(function (data) {
            $scope.positions = data;
        }, function (error) {
        }).finally(function () {
        });
    }

 
}]);





//--------------------------Company---------------------------------------


//Company Controler
module.controller('CompanyCtrl', ['$scope', '$rootScope', '$routeParams', 'Model', 'Auth',  function ($scope, $rootScope, $routeParams, Model, Auth) {



     $rootScope.CompanyName = Auth.isLoggedIn();

    $scope.SearchCompanyRequest = function (pageNumber) {
        $scope.ShowLoading = true;
        var limit = 25;
        var start = (parseInt(pageNumber) - 1) * limit;

        var date = SetDate($scope.request.creation_time);
        $scope.request.from = date.from;
        $scope.request.to = date.to;

        Model.companyRequestList($scope.request, start, limit).then(function (data) {
            $scope.SearchResult = data;
            $scope.ShowSearchResultBox = true;
            $scope.ShowLoading = false;

        }, function (error) {

        }).finally(function () {

        });

    };

    $scope.pageChanged = function (newPage) {
        $scope.SearchCompanyRequest(newPage);
    };

    $scope.companyRequestStatistics = function (request) {

        var date = SetDate(request.creation_time);

        request.from = date.from;
        request.to = date.to;


        $.each(request, function (index, value) {
            if (request[index] === null || request[index] === undefined) {
                request[index] = '';
                // delete conmpanyInfo[index];
            }

        });

        Model.companyRequestStatistics(request).then(function (data) {
            var temp = [];
            for (var i = 0; i < data.by_status.length; i++) {
                if (data.by_status[i.label] != '' && data.by_status[i].count !== '') {
                    temp[i] = [];
                    temp[i].push(data.by_status[i].label, data.by_status[i].count);
                }
            }
            $('#chartContainer').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'نمودار تعداد درخواست ها'
                },
                subtitle: {
                    text: 'با استفاده از گزینه های بالا میتوانید نمودار را فیلتر نمایید'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'IranSans'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'تعداد درخواست'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: ' <b>{point.y:.1f} </b> تعداد درخواست :'
                },
                series: [{
                    name: 'درخواست ها ',
                    data: temp,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'IranSans'
                        }
                    }
                }]
            });

        }, function (error) {

        }).finally(function () {

        });
    };

    $scope.companyRequestStatusList = function () {

        Model.companyRequestStatusList().then(function (data) {

            $scope.Status = data.data;
        }, function (error) {

        }).finally(function () {

        });
    };

    $scope.companyRequestMediaList = function () {

        Model.companyRequestMediaList().then(function (data) {

            $scope.Media = data.data;
        }, function (error) {

        }).finally(function () {

        });
    };

    $scope.editorOptions = {
        language: 'fa',
        uiColor: '#000000'
    };

    $scope.ckEditorCkeckLength = function () {
        var temp = $scope.template.body + '';
        if (temp && temp.length > 540) {
            temp = temp.substring(0, 525);
            $scope.template.body = $('<p/>').html(temp).text();
        }
    }

    $scope.companyTemplateNew = function () {

        $scope.template.body = ($scope.template.body + '').substring(0, 500);

        Model.companyTemplateNew($scope.template.body, $scope.template.name, $scope.template.isActive)
            .then(function (data) {

                $scope.successfulAddingTemplate = true;

            }, function (error) {

            }).finally(function () {

            });
    }
    $scope.companyTemplateList = function () {

        Model.companyTemplateList()
            .then(function (data) {
                $scope.templateListResult = data;
            }, function (error) {

            }).finally(function () {

            });
    }
    $scope.LoadTemplateInfo = function () {
        var id = $routeParams.id;

        Model.companyTemplateGet(id)
            .then(function (data) {

                $scope.template.id = data.id;

                $scope.template.body = $('<p/>').html(data.body).text();
                $scope.template.name = data.name;
                $scope.template.isActive = data.is_active;

            }, function (error) {

            }).finally(function () {

            });
    }
    $scope.companyTemplateEdit = function () {

        Model.companyTemplateEdit($scope.template.id, $scope.template.body, $scope.template.name, $scope.template.isActive)
            .then(function (data) {

                $scope.successfulAddingTemplate = true;

            }, function (error) {

            }).finally(function () {

            });
    }
    $scope.companyTemplateDeleteValueSet = function (value) {
        $scope.deleteTemplateId = value;
    }
    $scope.companyTemplateDelete = function () {

        Model.companyTemplateDelete($scope.deleteTemplateId)
            .then(function (data) {
                Model.companyTemplateList()
                    .then(function (data) {
                        $scope.templateListResult = data;
                    }, function (error) {

                    }).finally(function () {

                    });

            }, function (error) {

            }).finally(function () {

            });
    }

    $scope.companyApiNew = function () {

        Model.companyApiNew($scope.Api.ip, $scope.Api.isActive)
            .then(function (data) {

                $scope.successfulAddingApi = true;

            }, function (error) {

            }).finally(function () {

            });
    }
    $scope.companyApiList = function () {

        Model.companyApiList()
            .then(function (data) {

                $scope.ApiListResult = data;
            }, function (error) {

            }).finally(function () {

            });
    }
    $scope.LoadApiInfo = function () {
        var id = $routeParams.id;
        $scope.ApiId = id;

        Model.companyApiGet(id)
            .then(function (data) {
                $scope.Api.ip = data.ip;
                $scope.Api.isActive = data.is_active;

            }, function (error) {

            }).finally(function () {

            });
    }
    $scope.companyApiEdit = function () {

        Model.companyApiEdit($scope.ApiId, $scope.Api.ip, $scope.Api.isActive)
            .then(function (data) {

                $scope.successfulAddingApi = true;

            }, function (error) {

            }).finally(function () {

            });
    }
    $scope.companyApiDeleteValueSet = function (value) {
        $scope.deleteApiId = value;
    }
    $scope.companyApiDelete = function () {
        Model.companyApiDelete($scope.deleteApiId)
            .then(function (data) {
                Model.companyApiList()
                    .then(function (data) {
                        $scope.ApiListResult = data;
                    }, function (error) {

                    }).finally(function () {

                    });

            }, function (error) {

            }).finally(function () {

            });
    }


    $scope.companyInvoiceList = function () {

        Model.companyInvoiceList('', '', '', '')
            .then(function (data) {
                $scope.invoiceList = data;
            }, function (error) {

            }).finally(function () {

            });
    }

    $scope.initFunctionForEditInfo = function () {

        Model.stateList().then(function (data) {

            $scope.state = data.data;
            Model.passTypeList().then(function (data) {

                $scope.pass = data.data;
                Model.companyRequestTypeList().then(function (data) {

                    $scope.sendType = data;
                    Model.districtList().then(function (data) {

                        $scope.district = data.data;
                        Model.organizationTypeList().then(function (data) {

                            $scope.organizationType = data.data;
                            Model.companyInfo().then(function (data) {
                                $scope.companyInfo.Name = data.name;
                                $scope.companyInfo.Id = data.registration_id;
                                $scope.companyInfo.EconomicId = data.economic_id;
                                if (data.organization_type && data.organization_type.id)
                                { $scope.companyInfo.Type = data.organization_type.id; }
                                $scope.companyInfo.CeoName = data.ceo;
                                $scope.companyInfo.Tell = data.tel;
                                $scope.companyInfo.cell = data.cell;
                                $scope.companyInfo.NationalId = data.national_id;
                                $scope.companyInfo.Fax = data.fax;
                                $scope.companyInfo.email = data.email;
                                $scope.companyInfo.Site = data.website;
                                $scope.companyInfo.PostalCode1 = data.postcode;
                                if (data.province && data.province.id) {
                                    $scope.companyInfo.State = data.province.id + 0;
                                    if ($scope.companyInfo.State != '') {
                                        Model.cityList($scope.companyInfo.State).then(function (data2) {
                                            $scope.city = data2.data;

                                            if (data.city && data.city.id) {
                                                $scope.companyInfo.City = data.city.id + 0;
                                            }
                                        }, function (error) {

                                        }).finally(function () {

                                        });
                                    } 
                                }

                                if (data.district_type && data.district_type.id) {
                                    $scope.companyInfo.VillageDrop = data.district_type.id + '';
                                }
                                $scope.companyInfo.VillageTxt = data.district;
                                if (data.pass_type_1 && data.pass_type_1.id) {
                                    $scope.companyInfo.MainRoadDrop = data.pass_type_1.id + '';

                                }
                                $scope.companyInfo.MainRoadTxt = data.pass_1;
                                if (data.pass_type_2 && data.pass_type_2.id) {
                                    $scope.companyInfo.SecondaryRoadDrop1 = data.pass_type_2.id + '';
                                }
                                $scope.companyInfo.SecondaryRoadTxt1 = data.pass_2;
                                if (data.pass_type_3 && data.pass_type_3.id) {
                                    $scope.companyInfo.SecondaryRoadDrop2 = data.pass_type_3.id + '';
                                }
                                $scope.companyInfo.SecondaryRoadTxt2 = data.pass_3;
                                $scope.companyInfo.Plaque = data.plaque;
                                $scope.companyInfo.Floor = data.floor;
                                $scope.companyInfo.Unit = data.unit_no;
                                $scope.companyInfo.BuildingName = data.building;
                                $scope.companyInfo.Details = data.description;
                                $scope.companyInfo.ContacPersonName = data.contact_person;
                                $scope.companyInfo.ContacPersonTell = data.contact_person_cell;
                                $scope.companyInfo.ContacPersonEmail = data.contact_person_email;
                                $scope.companyInfo.Logo = data.logo_url;
                                $scope.companyInfo.LogoOld = data.logo_url;
                                $scope.companyInfo.Push = data.push_notification_url;



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

    $("#companyInfoState").on("change", function () {

        var state = $("#companyInfoState option:selected").val()
        state = state.replace(/number:/g, '')
        Model.cityList(state).then(function (data) {
            $scope.city = data.data;
        }, function (error) {

        }).finally(function () {

        });

    });
     $scope.companyInfoEdit = function (conmpanyInfo) {
        //value.Logo = $scope.file;

        $.each(conmpanyInfo, function (index, value) {
            if (conmpanyInfo[index] === null || conmpanyInfo[index] === undefined) {
                conmpanyInfo[index] = '';
               // delete conmpanyInfo[index];
            }

        });

        $scope.editInfoSuccess = '';
        $scope.editInfoError = '';
        Model.companyInfoEdit(conmpanyInfo).then(function (data) {
            $scope.editInfoSuccess = 'ویرایش اطلاعات شما با موفقیت انجام شد';
        }, function (error) {
            $scope.editInfoError = 'عملیات با خطا مواجه شد، لطفا کمی بعد مجددا سعی کنید';
        }).finally(function () {

        });
    };




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

    $.validate({
        language: myLanguage,
        //modules: 'location,  security',
        //validateOnBlur : false, // disable validation when input looses focus
        // errorMessagePosition : 'top', // Instead of 'inline' which is default
        scrollToTopOnError: false // Set this property to true on longer forms
    });

    $('.js-example-basic-multiple-limit').select2({
        maximumSelectionLength: 1,
        //allowClear: true
        placeholder: "طبقه",
        dir: "rtl",
        language: "fa"
    });

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
 