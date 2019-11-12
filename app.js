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


//projects with error handler for projects
app.get('/project/:id', (req, res, next) => {
    const project = projectData.find(project => project.id === parseInt(req.params.id));
    if (project) {
        res.render('project', {
            title: project.project_name,
            description: project.description,
            technologies: project.technologies,
            live_link: project.live_link,
            github_repo: project.github_link,
            projectImages: project.images
        });
    } else {
        const err = new Error('Project does not exist...');
        err.status = 404;
        next(err);
    }

});


//Create an error object
//Error page not found 404
app.use((req, res, next) => {
    const err = new Error('Page does not exist...');
    err.status = 404;
    next(err);
});

//Error handling
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});




app.listen(3000, () => {
    console.log("App listening on port 3000...");
});