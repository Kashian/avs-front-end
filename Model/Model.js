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
        Model.companyRequestTypeList = function (cityId,companyApiKey) {
            console.log(companyApiKey);
            console.log(cityId);
            console.log('We got the city ID and api_key');
            var urlCallService;
            if (companyApiKey=='a4e67fc97f1b4ad0969c42942652ffad')  {
                urlCallService='default-company/request-type/list';
            }
            else {
                urlCallService='company/request-type/list';
            }
            console.log(apiBaseUrl+urlCallService+' '+companyApiKey+' '+defaultCompany);
            return $http({
                url: apiBaseUrl + urlCallService,
                method: "POST",
                dataType: "json",
                transformRequest: function (obj) {
                    var str = [];
                    // "generates city_id=X"
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, data: {
                    city_id: cityId,
                    api_key: companyApiKey
                }
            }).then(function (result) {
              console.log(result.data);
              return result.data });
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

        //stateList
        Model.addressStatus = function () {
            return $http({
                url: apiBaseUrl + 'address-status/list',
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


            // Url changed by alireza kashian for debug
             return $http({
                url: apiBaseUrl + 'default-company/request/postcode-info?postcode=' + PostalCode,
                // debug: url: 'http://avs.post.ir/postcode_result.txt',
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                }
            }).then(function (result) { return result.data; });
        };

        //checkDiscountCode
        Model.checkDiscountCode = function (DiscountCode) {
            return $http({
                url: apiBaseUrl + 'default-company/request/check-coupon?code=' + (DiscountCode).toLowerCase(),
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


        //requestNew :: New Letter Request Function
        Model.requestNew = function (Value,companyApiKey) {

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
                    has_no_plaque: Value.HasNoPlaque,
                    floor_id: Value.Floor,
                    unit_no: Value.Unit,
                    address_status_id:Value.AdressStatus,
                    company_request_type_id: Value.companyRequestTypeId,
                    template_id: 1,
                    duration: 12,
                    resend_period: 13,
                    resend_expiration_time: '',
                    building: Value.BuildingName,
                    person_type_id: Value.personType,
                    coupon_code:(Value.discountCode).toLowerCase(),
                    api_key: Value.api_key

                }
            }).then(function (result) { return result.data; });
        };

        //requestNew
        Model.requestEdit = function (Value) {
            return $http({
                url: apiBaseUrl + 'default-company/request/edit',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id: Value.uniqeId,
                    national_id: Value.nationalCode,
                    postcode: Value.PostalCode1,
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
                    has_no_plaque: Value.HasNoPlaque,
                    floor_id: Value.Floor,
                    unit_no: Value.Unit,
                   // address_status_id:Value.AdressStatus,
                   // company_request_type_id: Value.companyRequestTypeId,
                    // template_id: 1,
                    // duration: 12,
                    // resend_period: 13,
                    building: Value.BuildingName,
                    api_key: Value.api_key
                    // this is api key for Post Company of Iran

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


        //rquestEditLoad
        Model.rquestEditLoad = function (value) {

            return $http({
                url: apiBaseUrl + 'default-company/request/get',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id: value.uniqeId,
                    national_id: value.nationalCode
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


        //send sms
        Model.sendSms = function (national_id , cell) {
            return $http({
                url: apiBaseUrl + 'default-company/request/cell-verification',
                method: "POST",
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: {
                    national_id:national_id,
                    cell: cell
                }
            }).then(function (result) { return result.data; });
        };


        //send sms
        Model.sendSmsVerification = function (national_id , cell , secret_code) {
            return $http({
                url: apiBaseUrl + 'default-company/request/verify-cell',
                method: "POST",
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: {
                    national_id:national_id,
                    cell: cell,
                    secret_code:secret_code
                }
            }).then(function (result) { return result.data; });
        };




        return Model;
    }]);
