var fortune = require('../lib/fortune');
var expect = require('chai').expect;
var weather = require('../lib/getWeather');

suite('Test of cookie', function () {
    test('fortune() must returns string', function () {
        expect(typeof fortune.getFortune() === 'string')
    })
});

suite('Test of weather', function () {
   test('getWeather must returns not empty object', function () {
       expect(weather.getWeatherData().locations)
   })
});