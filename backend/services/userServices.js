const User = require('../models/User');

const userProfile = async (userId) => {

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
        },
    };

    return await User.findOne({ uid: userId }, userInfo);

};
const userEmailMatch = async (email) => {
    const checkForEmail = {
        _id: 0,
        email: 1
    };

    return await User.findOne({ email: email }, checkForEmail);
};
const createUser = async (user) => {

    return await user.save();
};
const editUserInfo = async (userId, userInfo) => {

    var user = await User.updateOne({ uid: userId }, userInfo);
    return user;
};
const deleteUserProfile = async (userId) => {

    return await User.deleteOne({ 'uid': userId });
};

module.exports = {
    userEmailMatch,
    userProfile,
    createUser,
    editUserInfo,
    deleteUserProfile
};