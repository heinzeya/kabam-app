module.exports = exports = function (kabam) {
  kabam.app.get('/', function(request, response) {
    if (request.user) {
      return response.redirect('/home');
    }
    return response.render('index');
  });

  kabam.app.get('/home', function(request, response) {
    response.render('angular/index', { layout: false });
  });
};
