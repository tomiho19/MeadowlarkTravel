let express = require('express');
let app = express();
let handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), ()=>{
    console.log('Server\'s running on http://localhost:' + app.get('port') + ' press Ctrl + C to exit');
});

app.get('/', (req, res)=>{
    res.render('home');
});
//////////////////////////////////////////////////////////////
let fortunes = [
    "Победи свои страхи, или они победят тебя.",
    "Рекам нужны истоки.",
    "Не бойся неведомого.",
    "Тебя ждет приятный сюрприз.",
    "Будь проще везде, где только можно.",
];
//////////////////////////////////////////////////////////////
app.get('/about', (req, res)=>{
    let randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune});
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
