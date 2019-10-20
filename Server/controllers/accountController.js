Account = require("../models/accountModel");
const crypto = require('crypto');
const {ObjectId} = require('mongodb'); // or ObjectID 

// const hash = crypto.createHash('sha256').update('password').digest('hex');
// const salt = "test";

// ! for now we have no access to modify email, album, _id
// ? Do we need to add independent access later, 
// ? e.g.link register user to virtual account
exports.test = (req, res) => { 
    res.send('use to test');
}

// get all accounts
exports.index = (req, res) => {
    Account.get((err, accounts) => {
        if (err){
            res.json({
                status: "error",
                message: "error",
            });
        }
        res.json({
            status: "Success",
            message: "Account retrieved successfully!",
            data: accounts
        });
    });
};

// create new account
exports.new = (req, res) => {
    var account = new Account();

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const DOB = req.body.DOB;

    account.firstName = firstName;
    account.lastName = lastName;
    account.DOB = DOB;

    account.gender = req.body.gender;
    account.email = req.body.email;
    account.album = req.body.album;
    account.family = req.body.family;

    if (req.body._id == undefined) {
        var data = firstName + lastName + DOB;
        const hash = crypto.createHash('sha256').update(data).digest('hex');
        account._id = hash;
    } else { 
        account._id = req.body._id;
    }
    
    account.save((err) => {
        if (err){
            res.json(err);
        }
        res.json({
            message: "New Account created!",
            data: account
        });
    });
};

// view one account by id
exports.view = (req, res) => {
    Account.findById(req.params.account_id, (err, account) => {
        if (err){
            res.send(err);
        }
        res.json({
            message: "Account details loading..",
            data: account
        });
    });
};

// update one account
exports.update = (req, res) => {
    Account.findById(req.params.account_id, (err, account) => {
        if (err){
            res.send(err);
        };
        account.firstName = req.body.firstName;
        account.lastName = req.body.lastName;
        account.DOB = req.body.DOB;
        account.gender = req.body.gender;
        
        account.save((err => {
            if (err){
                res.json(err);
            }
            res.json({
                message: "Account info updated",
                data: account
            });
        }));
    });
};

// delete one account
exports.delete = (req, res) => {
    Account.remove({
        _id: req.params.account_id
    }, (err, account) => {
        if (err) res.send(err);

        res.json({
            status: "Success",
            message: "Account Deleted"
        });
    });
};

// set the family to given acount
exports.joinfamily = (req, res) => { 
    Account.findById(req.params.account_id, (err, account) => {
        if (err) {
            res.send(err);
        };
        account.family = req.body.family;

        account.save((err => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: "Join family Success!",
                data: account
            });
        }));
    });
}


// receive invitation
exports.invite = (req, res) => {
    Account.findById(req.params.sender_id, (err, sender) => {
        if (err) {
            res.send(err);
        };

        if (sender == null || sender.family == null) {
            res.json({
                message: "No invitation info found",
                data: null
            });
            return
        }
        const familyid = sender.family;
        Account.findById(req.params.target_id, (err, target) => {
            if (err) {
                res.json(err);
            }

            target.invitation = familyid;

            target.save(err => {
                if (err) {
                    res.json(err);
                }
                res.json({
                    message: "Set invitation Success!",
                    data: target
                });
            });
        });
    });
}

// accept invitation
exports.accept = (req, res) => {
    Account.findById(req.params.target_id, (err, target) => {
        if (err) {
            res.json(err);
        }

        if (target == null || target.invitation == null) {
            res.json({
                message: "No invitation info found",
                data: null
            });
            return
        }
        target.family = target.invitation;
        target.invitation = null;

        target.save(err => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: "Set invitation Success!",
                data: target
            });
        });
    });
}

