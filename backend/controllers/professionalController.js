const Professional = require('../models/Professional');
const service = require('../services/professionalServices');


const createProfessional = async (req, res) => {

    const professional = new Professional({
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

    await service.createProfessional(professional).then(data => {
        professional = data;
    });

    res.status(201).json(professional);
};
const professionalEmailMatch = async (req, res) => {

    var isMatch = false;
    var check;

    try {

        await service.checkEmailProfile(req.params.email).then(data => {
            check = data;
        });

        if (check != null && check.email === req.params.email) {
            isMatch = true;
        }

        return res.json(isMatch)

    } catch (error) {
        res.statusCode(404).json(error);
    }
};
const getProfessionals = async (req, res) => {
    var professionals;
    await service.getProfessionals().then(data => {
        professionals = data;
    });
    return res.status(200).json(professionals);
};
const getByProfession = async (req, res) => {

    var professionals;

    await service.getByProfession(req.params.profession).then(data => {
        professionals = data;
    });

    return res.status(200).json(professionals);
}
const professionalProfile = async (req, res) => {

    var professional;

    const professionalId = req.params.id;

    try {
        if (professionalId) {
            await service.professionalProfile(professionalId).then(data => {
                professional = data;
            });

            res.status(200).json(professional);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
};
const profPublicProfile = async (req, res) => {
    var professional;

    const professionalId = req.params.id;

    try {
        if (professionalId) {
            await service.profPublicProfile(professionalId).then(data => {
                professional = data;
            });

            res.status(200).json(professional);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
};
const editProfessionalProfile = async (req, res) => {
    const professionalId = req.params.id;
    var professional;

    const updateInfo = {

        phonenumber: req.body.phonenumber,
        address: {
            strNumber: req.body.strNumber,
            addressLine: req.body.addressLine,
            city: req.body.city,
            zipCode: req.body.zipCode
        },
        profession: req.body.profession
    };

    try {

        await service.editProfessionalInfo(professionalId, updateInfo).then(data => {
            professional = data;
        });


        return res.json(professional);
    } catch (error) {
        res.status(409).send(error.message);
    }
};
const deleteProfessionalProfile = async (req, res) => {
    const professionalId = req.params.id;

    await service.deleteProfessionalProfile(professionalId);
};


module.exports = {
    professionalEmailMatch,
    professionalProfile,
    profPublicProfile,
    getProfessionals,
    getByProfession,
    createProfessional,
    editProfessionalProfile,
    deleteProfessionalProfile
};