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
app.get('/project/:id', (req, res) => {
    const project = projectData.find(project => project.id === parseInt(req.params.id));
    res.render('project', {
        title: project.project_name,
        description: project.description,
        technologies: project.technologies,
        live_link: project.live_link,
        github_repo: project.github_link,
        projectImages: project.images
    });
});












app.listen(3000, () => {
    console.log("App listening on port 3000...");
});