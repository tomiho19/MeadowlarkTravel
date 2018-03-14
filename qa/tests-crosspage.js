var Browser = require('zombie')
    assert  = require('chai').assert;
var browser;

suite('Pages tests', function () {
    setup(function () {
        browser = new Browser();
    });

    test('request price for groups by page type across Hood river', function (done) {
        var referrer = 'http://localhost:3000/tours/hood-river';
        browser.visit(referrer, function () {
            browser.clickLink('.requestGroupRate', function () {
                if(browser.field('referrer').value !== referrer) assert('referrer from hood river tour page required');
                done();
            })
        })
    });

    test('request price for groups from site pages', function (done) {
        var referrer = 'http://localhost:3000/tours/oregon-coast';
        browser.visit(referrer, function () {
            browser.clickLink('.requestGroupRate', function () {
                if(browser.field('referrer').value !== referrer) assert('referrer from oregon-coast tour page required');
                done();
            })
        })
    });

   test('visit to page "Request price for groups"', function (done) {
       browser.visit('http://localhost:3000/tours/request-group-rate', function () {
           assert(browser.field('referrer').value === '');
           done();
       })
   })

});