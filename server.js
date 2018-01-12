const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

/* helpers */
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

/* middlewares */
app.use((req, res, next) => {
    let now = new Date().toString();

    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){ 
            console.log('Unable to append to server.log.'); 
        }
    });
    next();
});

// app.use((req, res) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

/* rotas */
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle : 'Home',
        welcomeMessage : 'Welcome to our website'
    })
});

app.get('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle : 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage : 'Unable to handle request'
    })
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});