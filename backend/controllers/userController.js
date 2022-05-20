const User = require('../models/User');
const service = require('../services/userServices');

const createUser = async (req, res) => {

    var user = new User({
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

    await service.createUser(user).then(data => {
        user = data;
    });

    return res.status(201).json(user);
};
const userEmailMatch = async (req, res) => {

    var isMatch = false;
    var check;

    try {

        await service.userEmailMatch(req.params.email).then(data => {
            check = data;
        });

        if (check != null && check.email === req.params.email) {
            isMatch = true;
        }

        return res.json(isMatch);

    } catch (error) {
        res.statusCode(404).json(error);
    }
};
const userProfile = async (req, res) => {

    var user;

    const userId = req.params.id;

    try {
        if (userId) {
            await service.user_profile(userId).then(data => {
                user = data;
            });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).send(error.message);
    }
};
const editUserProfile = async (req, res) => {

    const userId = req.params.id;
    var user;

    const updateInfo = {
        phonenumber: req.body.phonenumber,
        address: {
            strNumber: req.body.address.strNumber,
            addressLine: req.body.address.addressLine,
            city: req.body.address.city,
            zipCode: req.body.address.zipCode
        }
    };

    try {

        await service.editUserInfo(userId, updateInfo).then(data => {
            user = data;
        });

        return res.json(user);
    } catch (error) {
        res.status(409).send(error.message);
    }
};
const deleteUserProfile = async (req, res) => {
    const userId = req.params.id;

    await service.deleteUserProfile(userId);
};

module.exports = {
    userProfile,
    userEmailMatch,
    createUser,
    editUserProfile,
    deleteUserProfile
};