// Import Modules
let router = require('express').Router();
const accountController = require("./controllers/accountController");
const familyController = require("./controllers/familyController");

router.get('/', (_req, res) => {
    res.json({
        status: "Success!",
        message: "Welcome to COMP30022 Project 1 API"
    });
});

// Route to /family
router.route('/families')
    .get(familyController.index)
    .post(familyController.new)

router.route('/families/:family_id')
    .get(familyController.view)
    .put(familyController.update)
    .delete(familyController.delete);

router.route('/families/members/:family_id')
    .get(familyController.getmembers)
    .put(familyController.addRelation)
    .delete(familyController.deleteRelation);

// Route to family tree relations
router.route('/families/relations/:family_id')
    .get(familyController.findRelations);

router.route('/families/albums/:family_id')
    .put(familyController.addShareAlbum)
    // .delete(familyController.deleteShareAlbum);

router.route('/families/albums/:family_id/:album_id')
    .delete(familyController.deleteShareAlbum);

// Route to accounts
router.route('/accounts')
    .get(accountController.index)
    .post(accountController.new)

router.route('/accounts/:account_id')
	.get(accountController.view)
    .put(accountController.update)
    .delete(accountController.delete);

// Route to set family to account
router.route('/accounts/join/:account_id')
    .put(accountController.joinfamily);

router.route('/accounts/invite/:sender_id/:target_id')
    .put(accountController.invite);

router.route('/accounts/accept/:target_id')
    .put(accountController.accept);

router.route('accounts/decline/:target_id')
    .put(accountController.decline);
// router.route('/accounts/relationsinfo/:account_id')
//     .get(familyController.findRelationsInfo);

router.route('/test')
    .get(accountController.test);
// Exports API Routes
module.exports = router;
