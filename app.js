const express = require('express');
//require the data.json file
const projectData = require('./data.json').projects;
const app = express();

//set view engine
app.set('view engine', 'pug');

//Middleware
app.use('/static', express.static('public'));

//routes
//Home Page
app.get('/', (req, res) => {
    res.render('index', {
        projects: projectData
    });
});

//About Page
app.get('/about', (req, res) => {
    res.render('about');
});


//projects
app.get('/project', (req, res) => {
    res.render('project');
});












app.listen(3000, () => {
    console.log("App listening on port 3000...");
});