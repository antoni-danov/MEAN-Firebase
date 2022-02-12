const router = require('express').Router();
const User = require('../models/User');

router.post('/create', async (req, res) => {

    try {
        const user = await new User({
            uid: req.body.uid,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            address: {
                strNumber: req.body.strNumber,
                addressLine: req.body.addressLine,
                city: req.body.city,
                zipCode: req.body.zipCode
            },
            role: req.body.role
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

        const check = await User.findOne({ email: req.params.email }, checkForEmail);

        if (check != null && check.email === req.params.email) {
            isMatch = true;
        }

        return res.json(isMatch)

    } catch (error) {
        console.log(error);
    }
});
router.get('/profile/:id', async (req, res) => {

    var user;

    const userId = req.params.id;

    const userInfo = {
        _id: 0,
        firstname: 1,
        lastname: 1,
        email: 1,
        phonenumber: 1,
        address: {
            strNumber: 1,
            addressLine: 1,
            city: 1,
            zipCode: 1
        }
    };

    try {
        if (userId) {
            await User.findOne({ uid: userId }, userInfo).then(data => {
                user = data;
            });

            res.json(user);
        }
    } catch (error) {
        console.log(error.message);
    }
});
router.put('/edit/:id', async (req, res) => {
    const userId = req.params.id;
    try {

        return await User.updateOne({ uid: userId }, {

            phonenumber: req.body.phonenumber,
            address: {
                strNumber: req.body.address.strNumber,
                addressLine: req.body.address.addressLine,
                city: req.body.address.city,
                zipCode: req.body.address.zipCode
            }
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
    const userId = req.params.id;

    return await User.deleteOne({ 'uid': userId }, (err, data) => {
        if (err) {
            return console.log(err);
        } else {
            return res.status(200).json('User delete sucessfully.');
        }
    });

});

module.exports = router;