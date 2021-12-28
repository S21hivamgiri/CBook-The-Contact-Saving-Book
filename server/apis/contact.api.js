var express = require('express');
var httpStatus = require('http-status-codes');
var router = express.Router();
const user = require('../model/contact.model');


router.route('/').get((req, res) => {
    user.find({ emergency: "user" }).then(docs => {
        res.send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route('/chart').get((req, res) => {
    user.aggregate([{ $group: { _id: "$country", label: { $first: '$country' }, y: { $sum: 1 } } }]).then(docs => {
        res.send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route('/emergency').get((req, res) => {
    user.find({ emergency: "emergency" }).then(docs => {
        res.send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route('/add').post((req, res) => {
    const obj = req.body;
    user.create(obj).then(docs => {
        res.status(httpStatus.CREATED).send(obj);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        console.log(err);
    });
});

router.route('/delete/:id').delete((req, res) => {
    let id = req.params.id;
    user.findByIdAndDelete(id).then(docs => {
        res.status(httpStatus.OK).send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route('/:id').get((req, res) => {
    let id = req.params.id;
    user.findById(id).then(docs => {
        res.status(httpStatus.OK).send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.put('/edit/:id', (req, res) => {
    let id = req.params.id;
    const obj = req.body;
    console.log(obj)
    user.findByIdAndUpdate(id, { name: obj.name, email: obj.email, country: obj.country, code: obj.code, contact: obj.contact, address: obj.address, emergency: obj.emergency }, (err, doc) => {
        if (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        }
        else
            res.status(httpStatus.OK).send(doc);
    });
});

router.route('/search/:id').get((req, res) => {
    let id = req.params.id;
    user.find({ emergency: "user", $or: [{ name: { $regex: id } }, { contact: { $regex: id } }, { code: { $regex: id } }] }).then(docs => {
        res.status(httpStatus.OK).send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route('/search/emer/:id').get((req, res) => {
    let id = req.params.id;
    user.find(
        {
            emergency: "emergency", $or: [{ name: { $regex: id } }, { contact: { $regex: id } }, { code: { $regex: id } }]
        }
    ).then(docs => {
        res.status(httpStatus.OK).send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

});

router.route('/contact/:id').get((req, res) => {
    let id = req.params.id;
    user.find({ contact: id }).then(docs => {
        res.send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

router.route('/name/:id').get((req, res) => {
    let id = req.params.id;
    user.find({ name: id }).then(docs => {
        res.send(docs);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});

module.exports = router;
