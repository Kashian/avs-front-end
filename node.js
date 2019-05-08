//pm2 stop node.js 
//pm2 start node.js 

var express = require('express');
var cookieParser = require('cookie-parser');
var url = require('url');
var i18n = require('i18n');
var path = require('path');
var fs = require('fs')

var globalTranslate = {};

var app = express();
app.use(cookieParser());
app.use(i18n.init);

i18n.configure({
    locales: ['en', 'fa'],
    cookie: 'lang',
    defaultLocale: 'fa',
    register: globalTranslate,
    directory: __dirname + '/locales'
});



//when call root 
app.get('/', function (req, res) {

    //set cookie
    res.cookie('lang', 'fa', { maxAge: 900000, httpOnly: true });
    i18n.setLocale('fa');

    //serve static files
    app.use(express.static('./'));

    //load translate function
    loadText(req, res);


});

//when change root to en
app.get('/en', function (req, res) {

    //serve static files
    app.use(express.static('./'));

    //set cookie
    res.cookie('lang', 'en', { maxAge: 900000, httpOnly: true });
    i18n.setLocale('en');


    //load translate function
    setTimeout(function () {
        loadText(req, res);
    }, app.getDelay(req, res));

});

//when change root to fa
app.get('/fa', function (req, res) {

    //serve static files
    app.use(express.static('./'));

    //set cookie
    res.cookie('lang', 'fa', { maxAge: 900000, httpOnly: true });
    i18n.setLocale('fa');

    //load translate function
    setTimeout(function () {
        loadText(req, res)
    }, app.getDelay(req, res));

});

// simple param parsing
app.getDelay = function (req, res) {
    return url.parse(req.url, true).query.delay || 0;
};


// startup
app.listen(8090);

//load and set translate text in to the html
function loadText(req, res) {

    var allLocaleWords = globalTranslate.getCatalog()
    var result = '';

    fs.readFile(path.join(__dirname + '/index.html'), 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        result = data + "";
        for (var item in allLocaleWords) {
            if (item != '---') {
                var replaceText = "{{'" + item + "' = translate}}";
                var regex = new RegExp(replaceText, "g");
                result = result.replace(regex, allLocaleWords[item]);
            }
        }

        result = result.replace(/{{lang}}/g, globalTranslate.getLocale());
        result = result.replace(/{{font}}/g, allLocaleWords['font']);
        result = result.replace(/{{direction}}/g, allLocaleWords['direction']);
        result = result.replace(/{{float}}/g, allLocaleWords['float']);
        result = result.replace(/{{h1}}/g, allLocaleWords['h1']);
        result = result.replace(/{{h2}}/g, allLocaleWords['h2']);
        result = result.replace(/{{h3}}/g, allLocaleWords['h3']);
        result = result.replace(/{{h4}}/g, allLocaleWords['h4']);
        result = result.replace(/{{h5}}/g, allLocaleWords['h5']);
        result = result.replace(/{{h6}}/g, allLocaleWords['h6']);

        if (allLocaleWords['float'] == 'left') {
            result = result.replace(/{{mirrorFloat}}/g, 'right');
        } else {
            result = result.replace(/{{mirrorFloat}}/g, 'left');
        }
        if (allLocaleWords['float'] == 'rtl') {
            result = result.replace(/{{mirrorDirection}}/g, 'ltr');
        } else {
            result = result.replace(/{{mirrorDirection}}/g, 'rtl');
        }

        if ((globalTranslate.getLocale() + "") == 'en') {
            result = result.replace(/{{otherlang}}/g, 'fa');
        } else {
            result = result.replace(/{{otherlang}}/g, 'en');
        }

        res.send(result);

    })

}
