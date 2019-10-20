Family = require("../models/familyModel");
Account = require("../models/accountModel");

// get all families
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

// create new families
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

// added share albums
exports.addShareAlbum = (req, res) => { 
    Family.findById(req.params.family_id, (err, family) => {
        if (err) res.status(400).send(err);
        if (req.body.sharedAlbums !== null) {
            var data = {
                Album: req.body.sharedAlbums
            }
            family.sharedAlbums.push(data);
        }

        family.save(err => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: "Share Albums added",
                data: null
            });
        });
    });
}

// Create relation schema and push it into family
exports.addRelation = (req, res) => { 
    Family.findById(req.params.family_id, (err, family) => {
        if (err) res.status(400).send(err);

        var data = {
            person1: req.body.person1,
            person2: req.body.person2,
            relationship: req.body.relationship
        }

        family.relations.push(data);

        family.save(err => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: "successfully added family relationship",
                data: null
            });
        });
    });
}

// Delete a share albums of family
exports.deleteShareAlbum = (req, res) => { 
    Family.findById(req.params.family_id, (err, family) => {
        if (err) {
            res.send(err);
        }
        var originAlbums = family.sharedAlbums;
        family.sharedAlbums = originAlbums.filter(album => album._id != req.params.album_id);
        family.save((err => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: "Album delete successfully.",
                data: family
            });
        }));
    })
}

// Delete a relation of family
exports.deleteRelation = (req, res) => { 
    Family.findById(req.params.family_id, (err, family) => {
        if (err) {
            res.send(err);
        }
        if (req.body.relationid !== null) {
            var deleteid = req.body.relationid;
            var originRelations = family.relations;
            family.relations = originRelations.filter(relation => relation._id != deleteid);

            family.save((err => {
                if (err) {
                    res.json(err);
                }
                res.json({
                    message: "Relation delete successfully.",
                    data: family
                });
            }));
        } else { 
            res.send("[Warning] No relationid detected, please check again");
        }
    });
}

// View one family by id
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

// Update one family
exports.update = (req, res) => {
    Family.findById(req.params.family_id, (err, family) => {
        if (err) res.status(400).send(err);

        family.name = req.body.name;

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


// Delete one family
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

// find relations of one account
exports.findRelations = (req, res) => {
    var user_id = req.params.account_id;
    Account.findById(user_id, (err, account) => {
        if (err) {
            res.send(err);
        }

        if ((account == null) || (account.family == null)){
            res.json({
                message: "No relations found",
                data: account
            });
            return
        }

        var family_id = account.family;
        Family.findById(family_id, (err, family) => {
            if (err) {
                res.send(err);
            }
            var relations = family.relations.filter(relation => relation.person1 == user_id || relation.person2 == user_id);
            res.json({
                message: "Find all relations",
                data: relations
            });
        });
            // }
        // }
        // res.json({
        //     message: "Error getting relation",
        //     data: account
        // })
    });
}

// find relation info of one account
exports.findRelationsInfo = (req, res) => {
    var user_id = req.params.account_id;

    Account.findById(user_id, (err, account) => {
        if (err) {
            res.send(err);
        }
        if ((account == null) || (account.family == null)){
            res.json({
                message: "No Relation info found",
                data: account
            });
            return
        }
        
        var family_id = account.family;
        Family.findById(family_id, (err, family) => {
            if (err) {
                res.send(err);
            }

            var relations = family.relations.filter(relation => relation.person1 == user_id || relation.person2 == user_id);

            // get unique id from links
            var userids = [];

            for (var i = 0; i < relations.length; i++) {
                var person1id = relations[i].person1;
                var person2id = relations[i].person2;
                if (userids.indexOf(person1id) < 0)
                    userids.push(person1id);
                if (userids.indexOf(person2id) < 0)
                    userids.push(person2id);
            }

            Account.find({
                '_id': {
                    $in: userids
                }
            }, (err, results) => {
                    var output = results.map(e => { 
                        var data = {
                            _id: e._id,
                            name: e.firstName + " " + e.lastName
                        }
                        return data;
                    });
                if (err) {
                    res.json(err);
                }
                res.json({
                    message: "Find all relations info nodes",
                    data: output
                });
            });
        });
    });
}

// get all members in one family
exports.getmembers = (req, res) => {
    Account.find({
        family: req.params.family_id
    }, (err, results) => {
        if (err) {
            res.json(err);
        }
        res.json({
            message: "Find all family members",
            data: results
        });
    });
};