let express = require('express');
let app = express();
let handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers:{
        section: function (name, options) {
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null
        }
    }
});
let fortune = require('./lib/fortune');
let weatherData = require('./lib/getWeather');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({extended: true}));

app.listen(app.get('port'), ()=>{
    console.log('Server\'s running on http://localhost:' + app.get('port') + ' press Ctrl + C to exit');
});

app.use((req, res, next)=>{
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.use((req, res, next)=>{
   if(!res.locals.partials) res.locals.partials = {};
   res.locals.partials.weatherContext = weatherData.getWeatherData();
   next();
});

app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/about', (req, res)=>{
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/vendor/ga/test_about.js'
    });
});

app.get('/newsletter', (req, res)=>{
   res.render('newsletter', {csrf: 'CSRF token goes here'})
});

app.post('/process', (req, res)=>{
    if(req.xhr || req.accepts('json, html') === 'json'){
        res.json({success: true})
    }else{
        res.status(303);
        res.render('thank-you');
    }
    console.log('Form (from querystring): ' + req.query.form);
    console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);

});

app.use('/tours/hood-river', (req, res)=>{
    res.render('tours/hood-river');
});

app.use('/tours/oregon-coast', (req, res)=>{
    res.render('tours/oregon-coast')
});

app.use('/tours/request-group-rate', (req, res)=>{
    res.render('tours/request-group-rate');
});

app.use('/test', (req, res)=>{
   res.render('jquery-test')
});

app.use((req, res, next)=>{
   res.status(404);
   res.render('404');
});

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
