// Filename: api-routes.js

let router = require('express').Router();

var accountController = require("./controllers/accountController");


router.get('/', (req, res) => {
    res.json({
        status: "Success!",
        message: "Welcome to COMP3022 Project 1 API"
    });
});


router.route('/accounts')
	.get(accountController.index)
	.post(accountController.new);


router.route('/accounts/:account_id')
	.get(accountController.view)
    .put(accountController.update)
    .patch(accountController.update)
    .delete(accountController.delete);


// Exports API Routes
module.exports = router;
