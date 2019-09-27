Account = require("../models/accountModel");
const {ObjectId} = require('mongodb'); // or ObjectID 


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

exports.new = (req, res) => {
    var account = new Account();
    account.firstName = req.body.firstName;
    account.lastName = req.body.lastName;
    account.email = req.body.email;
    account.album = req.body.album;
    account.family = req.body.family;
    account._id = req.body._id;
    account.dob = req.body.dob;
    account.gender = req.body.gender;
    
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


exports.update = (req, res) => {
    Account.findById(req.params.account_id, (err, account) => {
        if (err){
            res.send(err);
        };
        account.firstName = req.body.firstName;
        account.lastName = req.body.lastName;
        account.email = req.body.email;
        account.album = req.body.album;
        account.family = req.body.family;
        account.dob = req.body.dob;
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
