/// <reference path="Model.js" />
'use strict';

angular.module('post.Model', [])
 .factory('Model', ['$http',
    function ($http) {

        var Model = {};

        var apiBaseUrl = "/infra/core/";


        //--------------------------- User Management ------------------------------

        //SignOut
        Model.SignOut = function () {
            return $http({
                url: apiBaseUrl + 'user/logout',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                method: "get"
            }).then(function (result) { return result.data; });
        };

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


        //userChangePassword
        Model.userChangePassword = function (current_password, password, password_retype) {
            return $http({
                url: apiBaseUrl + 'user/change-password ',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    current_password: current_password,
                    password: password,
                    password_retype: password_retype

                }
            }).then(function (result) { return result.data; });
        };


        //userForgetPassword
        Model.userForgetPassword = function (name, email, cell, organizational_position_id) {
            return $http({
                url: apiBaseUrl + 'user/forgot-password',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    name: name,
                    email: email,
                    cell: cell,
                    organizational_position_id: organizational_position_id

                }
            }).then(function (result) { return result.data; });
        };


        //--------------------------0-Basic Api---------------------------------------


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
        Model.companyRequestTypeList = function () {
            return $http({
                url: apiBaseUrl + 'default-company/request-type/list',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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



        //--------------------------1-company Api---------------------------------------



        //companyInfo
        Model.companyInfo = function () {
            return $http({
                url: apiBaseUrl + 'company/info',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) { return result.data; });
        };

        //companyUserList
        Model.companyUserList = function (start, limit, name) {
            return $http({
                url: apiBaseUrl + 'company/user/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    start: start,
                    limit: limit,
                    name: name

                }
            }).then(function (result) { return result.data; });
        };

        //companyUserNew
        Model.companyUserNew = function (first_name, last_name, email, password, password_retype, person_type_id, organizational_position_id, tel, cell, fax, website, description) {
            return $http({
                url: apiBaseUrl + 'company/user/new',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password,
                    password_retype: password_retype,
                    person_type_id: person_type_id,
                    organizational_position_id: organizational_position_id,
                    tel: tel,
                    cell: cell,
                    fax: fax,
                    website: website,
                    description: description
                }
            }).then(function (result) { return result.data; });
        };

        //companyUserEdit
        Model.companyUserEdit = function (id, first_name, last_name, email, password, password_retype, person_type_id, organizational_position_id, tel, cell, fax, website, description) {
            return $http({
                url: apiBaseUrl + 'company/user/new',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id: id,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password,
                    password_retype: password_retype,
                    person_type_id: person_type_id,
                    organizational_position_id: organizational_position_id,
                    tel: tel,
                    cell: cell,
                    fax: fax,
                    website: website,
                    description: description
                }
            }).then(function (result) { return result.data; });
        };

        //companyUserDelete
        Model.companyUserDelete = function (id) {
            return $http({
                url: apiBaseUrl + 'company/user/delete',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id: id
                }
            }).then(function (result) { return result.data; });
        };

        //--------------------------2-template Api---------------------------------------


        //companyTemplateNew
        Model.companyTemplateNew = function (body, name, isActive) {
            return $http({
                url: apiBaseUrl + 'company/template/new',
                method: "post",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    name: name,
                    body: body,
                    is_active: isActive

                }
            }).then(function (result) { return result.data; });
        };

        //companyTemplateList
        Model.companyTemplateList = function () {
            return $http({
                url: apiBaseUrl + 'company/template/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }).then(function (result) { return result.data; });
        };

        //companyTemplateGet
        Model.companyTemplateGet = function (id) {
            return $http({
                url: apiBaseUrl + 'company/template/get',
                method: "post",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id: id
                }
            }).then(function (result) { return result.data; });
        };

        //companyTemplateEdit
        Model.companyTemplateEdit = function (id, body, name, isActive) {
            return $http({
                url: apiBaseUrl + 'company/template/new',
                method: "post",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id: id,
                    name: name,
                    body: body,
                    is_active: isActive

                }
            }).then(function (result) { return result.data; });
        };

        //companyTemplateDelete
        Model.companyTemplateDelete = function (id) {
            return $http({
                url: apiBaseUrl + 'company/template/remove',
                method: "post",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id: id
                }
            }).then(function (result) { return result.data; });
        };



        //--------------------------2-Vlaid ip Api---------------------------------------


        //companyApiNew
        Model.companyApiNew = function (ip, isActive) {
            return $http({
                url: apiBaseUrl + 'company/valid-ip/new',
                method: "post",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    ip:ip,
                    is_active: isActive
                }
            }).then(function (result) { return result.data; });
        };

        //companyApiList
        Model.companyApiList = function () {
            return $http({
                url: apiBaseUrl + 'company/valid-ip/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }).then(function (result) { return result.data; });
        };

        //companyApiGet
        Model.companyApiGet = function (id) {
            return $http({
                url: apiBaseUrl + 'company/valid-ip/get',
                method: "post",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id: id
                }
            }).then(function (result) { return result.data; });
        };

        //companyApiEdit
        Model.companyApiEdit = function (id, ip, isActive) {
            return $http({
                url: apiBaseUrl + 'company/valid-ip/new',
                method: "post",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id: id,
                    ip: ip,
                    is_active: isActive
                }
            }).then(function (result) { return result.data; });
        };

        //companyApiDelete
        Model.companyApiDelete = function (id) {
            return $http({
                url: apiBaseUrl + 'company/valid-ip/remove',
                method: "post",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id: id
                }
            }).then(function (result) { return result.data; });
        };


        //--------------------------2-factor Api---------------------------------------


        //companyInvoiceList
        Model.companyInvoiceList = function (start, limit, from, to) {

            return $http({
                url: apiBaseUrl + 'company/invoice/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    start: start,
                    limit: limit,
                    from: from,
                    to: to

                }
            }).then(function (result) { return result.data; });
        };



        //--------------------------3-request Api---------------------------------------
 
        //companyRequestNew
        Model.companyRequestNew = function (first_name, last_name, gender_id, national_id, cell, email, postcode, national_card_postcode, city_id, district_type_id, district, pass_type_1_id, pass_1, pass_type_2_id, pass_2, pass_type_3_id, pass_3, plaque, floor, unit_no) {
            return $http({
                url: apiBaseUrl + 'company/request/new',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    first_name: first_name,
                    last_name: last_name,
                    gender_id: gender_id,
                    national_id: national_id,
                    cell: cell,
                    email: email,
                    postcode: postcode,
                    national_card_postcode: national_card_postcode,
                    city_id: city_id,
                    district_type_id: district_type_id,
                    district: district,
                    pass_type_1_id: pass_type_1_id,
                    pass_1: pass_1,
                    pass_type_2_id: pass_type_2_id,
                    pass_2: pass_2,
                    pass_type_3_id: pass_type_3_id,
                    pass_3: pass_3,
                    plaque: plaque,
                    floor: floor,
                    unit_no: unit_no,
                    company_request_type_id: 1,
                    template_id: 1,
                    duration: 12,
                    resend_period: 13,
                    resend_expiration_time: ''

                }
            }).then(function (result) { return result.data; });
        };

        //companyRequestList
        Model.companyRequestList = function (request,start,limit) {

            return $http({
                url: apiBaseUrl + 'company/request/list',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    start: start,
                    limit: limit,
                    from: request.from,
                    to: request.to,
                    first_name: request.fName,
                    last_name: request.lName,
                    national_id: request.nationalId,
                    postcode: request.postcode,
                    national_card_postcode: request.nationalCardPostcode,
                    unique_id: request.uniqueId,
                    tracking_id: request.trackingId,
                    cell: request.cell,
                    email: request.email,
                    status_id: request.status,
                    province_id: '',
                    city_id: '',
                    company_request_type_id: '',
                    verification_media_id: request.verificationMedia

                }
            }).then(function (result) { return result.data; });
        };

        //companyRequestGet
        Model.companyRequestGet = function (id) {
            return $http({
                url: apiBaseUrl + 'company/request/get',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id: id
                }
            }).then(function (result) { return result.data; });
        };

        //companyRequestCancel 
        Model.companyRequestCancel = function (id) {
            return $http({
                url: apiBaseUrl + 'company/request/cancel',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id: id
                }
            }).then(function (result) { return result.data; });
        };

        //companyRequestStatistics
        Model.companyRequestStatistics = function (request) {
            return $http({
                url: apiBaseUrl + 'company/request/statistics',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    start: '',
                    limit: '',
                    from: request.from,
                    to: request.to,
                    first_name: request.fName,
                    last_name: request.lName,
                    national_id: request.nationalId,
                    postcode: request.postcode,
                    national_card_postcode: request.nationalCardPostcode,
                    unique_id: request.uniqueId,
                    tracking_id: request.trackingId,
                    cell: request.cell,
                    email: request.email,
                    province_id: '',
                    city_id: '',
                    company_request_type_id: '',
                    status_id: request.status
                }
            }).then(function (result) { return result.data; });
        };

        //companyInfoEdit
        Model.companyInfoEdit = function (value) {
            return $http({
                url: apiBaseUrl + 'company/info/edit',
                method: "POST",
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                //transformRequest: function (obj) {
                //    var str = [];
                //    for (var p in obj)
                //        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                //    return str.join("&");
                //},
                headers: { 'Content-Type': undefined },
                transformRequest: function (data) {
                    var fd;
                    fd = new FormData();
                    angular.forEach(data, function (value, key) {
                        return fd.append(key, value);
                    });
                    return fd;
                },
                data: {
                    name: value.Name,
                    registration_id: '2',
                    economic_id: value.EconomicId,
                    organization_type_id: value.Type,
                    ceo: value.CeoName,
                    tel: value.Tell,
                    national_id: value.NationalId,
                    fax: value.Fax,
                    website: value.Site,
                    postcode: value.PostalCode1,
                    city_id: value.City,
                    district_type_id: value.VillageDrop,
                    district: value.VillageTxt,
                    pass_type_1_id: value.MainRoadDrop,
                    pass_1: value.MainRoadTxt,
                    pass_type_2_id: value.SecondaryRoadDrop1,
                    pass_2: value.SecondaryRoadTxt1,
                    pass_type_3_id: value.SecondaryRoadDrop2,
                    pass_3: value.SecondaryRoadTxt2,
                    plaque: value.Plaque,
                    floor: value.Floor,
                    unit_no: value.Unit,
                    building:value.BuildingName,
                    description: value.Details,
                    contact_person: value.ContacPersonName,
                    contact_person_cell: value.ContacPersonTell,
                    contact_person_email: value.ContacPersonEmail,
                    logo: value.Logo,
                    push_notification_url: value.Push
                }
            }).then(function (result) { return result.data; });
        };



        //--------------------------6-user Api---------------------------------------


        //userInfo
        Model.userInfo = function () {
            return $http({
                url: apiBaseUrl + 'user/info',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) { return result.data; });
        };

        //getCompanyUser
        Model.getCompanyUser = function (id) {
            return $http({
                url: apiBaseUrl + 'company/user/get',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id: id
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) { return result.data; });
        };

        //companyInfo
        Model.companyInfo = function () {
            return $http({
                url: apiBaseUrl + 'company/info/get',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) { return result.data; });
        };



        //--------------------------7-print Api---------------------------------------



        //companyRequestChangeStatus
        Model.companyRequestChangeStatus = function (id, status_id) {
            return $http({
                url: apiBaseUrl + 'company/request/change-status',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id: id,
                    status_id: status_id
                }
            }).then(function (result) { return result.data; });
        };

        //companyRequestStatusList
        Model.companyRequestStatusList = function () {
            return $http({
                url: apiBaseUrl + 'company/request/status/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) { return result.data; });
        };

        //companyRequestMediaList
        Model.companyRequestMediaList = function () {
            return $http({
                url: apiBaseUrl + 'verification-media/list',
                method: "GET",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) { return result.data; });
        };


        return Model;
    }]);






























