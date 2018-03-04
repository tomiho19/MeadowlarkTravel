// let express = require('express');
//
// let app = express();
//
// app.set('port', process.env.PORT || 3000)
function sayHi() {
    return ()=> console.log('hello');
}

let say = sayHi();
say();