Family = require("../models/familyModel");
Account = require("../models/accountModel");

exports.index = (req, res) => {
    Family.get((err, family) => {
        if (err){
            res.json({
                status: "Error",
                message: "Unable to obtain family details",
            });
        }
        res.json({
            status: "Success",
            message: "Family info retrieved successfully!",
            data: family
        });
    });
};

exports.new = (req, res) => {
    var family = new Family();
    family.name = req.body.name;

    family.save((err) => {
        if (err){
            res.json(err);
        }
        res.status(201).json({
            message: "New Family created!",
            data: family
        });
    });
};

// TODO: Create relation schema and push it into family
exports.addrelationship = (req, res) => { 
};

exports.view = (req, res) => {
    Family.findById(req.params.family_id, (err, family) => {
        if (err) {
            res.send(err);
        }
        res.json({
            message: "Family details loading..",
            data: family
        });
    });
};


exports.update = (req, res) => {
    Family.findById(req.params.family_id, (err, family) => {
        if (err) res.status(400).send(err);

        family.children = req.body.children;
        family.parent = req.body.parent;

        family.save((err => {
            if (err){
                res.json(err);
            }
            res.json({
                message: "Account info updated",
                data: family
            });
        }));
    });
};



exports.delete = (req, res) => {
    Family.remove({
        _id: req.params.family_id
    }, (err, family) => {
        if (err) res.send(err);

        res.json({
            status: "Success",
            message: "Family Deleted"
        });
    });
};

exports.getmembers = (req, res) => {
    Family.findById(req.params.family_id, (err, family) => { 
        if (err) {
            res.send(err);
        }
        
        var people1 = family.map((e) => { return e.person1; });
        var people2 = family.map((e) => { return e.person2; });
        var members = people1.concat(people2);
            
        var arrayUnique = function (arr) {
            return arr.filter(function (item, index) {
                return arr.indexOf(item) >= index;
            });
        };

        var membersid =  arrayUnique(members);

        Account.find({
            '_id': {
                $in: membersid
            }
        }, (err, results) => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: "Find all family members",
                data: results
            });
        });
    });
};