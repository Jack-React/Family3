// Filename: api-routes.js

// Import Modules
let router = require('express').Router();
const accountController = require("./controllers/accountController");
const familyController = require("./controllers/familyController");

router.get('/', (_req, res) => {
    res.json({
        status: "Success!",
        message: "Welcome to COMP3022 Project 1 API"
    });
});

// Route to /family
router.route('/families')
    .get(familyController.index)
    .post(familyController.new)

router.route('/families/:family_id')
    .get(familyController.view)
    .put(familyController.update)
    .patch(familyController.update)
    .delete(familyController.delete);

    
// Route to accounts
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
