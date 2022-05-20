const Professional = require('../models/Professional');

const checkEmailProfile = async (email) => {

    const checkForEmail = {
        _id: 0,
        email: 1
    };

    return await Professional.findOne({ email: email }, checkForEmail);

};
const professionalProfile = async (professionalId) => {

    const profProfile = {
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
        email: 1
    };

    return await Professional.findOne({ uid: professionalId }, profProfile);
};
const profPublicProfile = async (professionalId) => {

    const userProfile = {
        _id: 0,
        firstname: 1,
        lastname: 1,
        profession: 1,
        address: { city: 1 },
        email: 1,
        phonenumber: 1,
    };

    return await Professional.findOne({ uid: professionalId }, userProfile);
};
const getProfessionals = async () => {
    return await Professional.find({}).sort({ 'lastname': 1 }).lean();
};
const getByProfession = async (profession) => {
    return await Professional.find({ profession: profession }).sort({ 'lastname': 1 }).lean();
};
const createProfessional = async (professional) => {

    return await professional.save();
};
const editProfessionalInfo = async (professionalId, professionalInfo) => {

    var professional = await Professional.updateOne({ uid: professionalId }, professionalInfo);
    return professional;
};
const deleteProfessionalProfile = async (professionalId) => {
    return await Professional.deleteOne({ 'uid': professionalId });
};

module.exports = {
    checkEmailProfile,
    professionalProfile,
    profPublicProfile,
    getProfessionals,
    getByProfession,
    createProfessional,
    editProfessionalInfo,
    deleteProfessionalProfile
};