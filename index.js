let express = require('express');
let app = express();
let handlebars = require('express-handlebars').create({defaultLayout: 'main'});
let fortune = require('./lib/fortune');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), ()=>{
    console.log('Server\'s running on http://localhost:' + app.get('port') + ' press Ctrl + C to exit');
});

app.use((req, res, next)=>{
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
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

app.use((req, res, next)=>{
   res.status(404);
   res.render('404');
});

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
