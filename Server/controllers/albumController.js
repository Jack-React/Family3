Album = require("../models/albumModel");
Photo = require("../models/photoModel");

const {ObjectId} = require('mongodb'); // or ObjectID 


exports.index = (req, res) => {
    Album.get((err, albums) => {
        if (err){
            res.json({
                status: 'error',
                message: err
            })
        }
        res.json({
            status: 'success',
            message: 'Successfuly retrieved albums',
            data: albums
        })
    })
}

exports.new = (req, res) => {
    var album = new Album();
    album._id = req.body._id;

    album.save((err) => {
        if (err){
            res.json(err);
        }
        res.json({
            message: "New album created!",
            data: album
        });
    });
};

exports.delete = (req, res) => {
    Album.remove({
        _id: req.body._id
    }, 
    (err, album) => {
        if (err) 
            res.send(err);
        res.json({
            status: "Success",
            message: "Album Deleted",
        });
    });
    
}

exports.addPhoto = (req, res) => {
    data = {
        photoID: req.body.photoID,
        name: req.body.name,
        description: req.body.description
    }

    Album.findOneAndUpdate(
        {_id: req.params.album_id},
        { $push: { photos: data }},
        (err, success) => {
            if (err)
                res.json({status: 'error', message: err})
            res.json({status: 'success', message: 'successfully added photo'})
        }
    )

    // res.json({
    //     status: 'success'
    // })
};


exports.deletePhoto = (req, res) => {

}


exports.view = (req, res) => {
    Album.findById(req.params.album_id, (err, album) => {
        if (err){
            res.send(err);
        }
        res.json({
            message: "Account details loading..",
            data: album
        });
    });
};