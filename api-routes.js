// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
/*router.get('/users', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});*/
// Import contact controller
var contactController = require('./Controller/ContactController');
var userController = require('./Controller/UserController');
// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);
router.route('/authenticate')
    .post(userController.authenticate);
router.route('/users')
    .get(userController.index)
   .post(userController.new);
router.route('/users/:user_id')
    .get(userController.view)
  	.patch(userController.update)
    .put(userController.update)
 .delete(userController.delete);
// Export API routes
module.exports = router;