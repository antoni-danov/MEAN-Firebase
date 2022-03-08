const router = require('express').Router();
const Professional = require('../models/Professional');


router.post('/create', async (req, res) => {

    try {
        const user = await new Professional({
            uid: req.body.uid,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            profession: req.body.profession,
            phonenumber: req.body.phonenumber,
            address: {
                strNumber: req.body.strNumber,
                addressLine: req.body.addressLine,
                city: req.body.city,
                zipCode: req.body.zipCode
            },
            role: 'Professional'
        });

        user.save((err, data) => {
            if (err) {
                return console.log(err);
            }
            res.json(data);
        });
    } catch (error) {
        console.log(error.message);
    }

    return this.user;
});
router.get('/find/:email/:role', async (req, res) => {

    var isMatch = false;

    try {

        const checkForEmail = {
            _id: 0,
            email: 1
        };

        const check = await Professional.findOne({ email: req.params.email }, checkForEmail);

        if (check != null && check.email === req.params.email) {
            isMatch = true;
        }

        return res.json(isMatch)

    } catch (error) {
        console.log(error);
    }
});
router.get('/all', async (req, res) => {
    return res.json(await Professional.find({}).lean());
});
router.get('/profession/:profession', async (req, res) => {
    return res.json(await Professional.find({ profession: req.params.profession }).lean());
});
router.get('/profile/:id', async (req, res) => {

    var user;

    const professionalId = req.params.id;

    const userProfile = {
        _id: 0,
        firstname: 1,
        lastname: 1,
        phonenumber: 1,
        profession: 1,
        address: {
            city: 1,
            addressLine: 1,
            strNumber: 1,
            zipCode: 1,
        },
        email: 1,
    };

    try {
        if (professionalId) {
            await Professional.findOne({ uid: professionalId }, userProfile).then(data => {
                user = data;
            });

            res.json(user);
        }
    } catch (error) {
        console.log(error.message);
    }
});
router.get('/publicProfile/:id', async (req, res) => {
    var user;

    const professionalId = req.params.id;
    const userProfile = {
        _id: 0,
        firstname: 1,
        lastname: 1,
        profession: 1,
        address: { city: 1 },
        email: 1,
        phonenumber: 1,
    };

    try {
        if (professionalId) {
            await Professional.findOne({ uid: professionalId }, userProfile).then(data => {
                user = data;
            });

            res.json(user);
        }
    } catch (error) {
        console.log(error.message);
    }
});
router.put('/edit/:id', async (req, res) => {
    const professionalId = req.params.id;
    try {

        return await Professional.updateOne({ uid: professionalId }, {

            phonenumber: req.body.phonenumber,
            address: {
                strNumber: req.body.strNumber,
                addressLine: req.body.addressLine,
                city: req.body.city,
                zipCode: req.body.zipCode
            },
            profession: req.body.profession
        }, (err, data) => {
            if (err) {
                return console.log(err.message);
            } else {
                return res.status(200).json(data);
            }
        });
    } catch (error) {
        console.log(error.message);
    }
});
router.delete('/delete/:id', async (req, res) => {
    const professionalId = req.params.id;

    return await Professional.deleteOne({ 'uid': professionalId }, (err, data) => {
        if (err) {
            return console.log(err);
        } else {
            return res.status(200).json('Professional profile delete sucessfully.');
        }
    });

});


module.exports = router;