let { homeRender, aboutRender, searchController } = require('./controllers/homeController');
let { createRender, detailsRender, creteCube } = require('./controllers/productController');

module.exports = (app) => {
    app.get('/', homeRender);

    app
        .get('/create', createRender)
        .post('/create', creteCube);

    app.get('/about', aboutRender);

    app.get('/details/:id', detailsRender);

    app.get('/search', searchController);

    app.get('*', (req, res) => {
        res.render('404');
    });
};