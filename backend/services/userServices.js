const User = require('../models/User');
// const User = require('../models/User');

exports.user_profile = async (userId) => {
    var user;

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

    await User.findOne({ uid: userId }, userInfo).then(data => {
        user = data;
    });
    return user;
};
exports.user_email_match = async (email) => {
    const checkForEmail = {
        _id: 0,
        email: 1
    };

    const check = await User.findOne({ email: email }, checkForEmail);

    return check;
};
exports.create_user = async (user) => {

    return await user.save();
};
exports.edit_user_info = async (userId, userInfo) => {

    var user = await User.updateOne({ uid: userId }, userInfo);
    return user;
};
exports.delete_user_profile = async (userId) => {

    return await User.deleteOne({ 'uid': userId });
};