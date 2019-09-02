Family = require("../models/familyModel");

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
    family.children = req.body.children;
    family.parent = req.body.parent;

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

exports.view = (req, res) => {
    Family.findById(req.params.account_id, (err, family) => {
        if (err){ res.status(400).send(err); }
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
