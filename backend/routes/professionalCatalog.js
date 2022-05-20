const router = require('express').Router();
const {
    professionalEmailMatch,
    professionalProfile,
    profPublicProfile,
    getProfessionals,
    getByProfession,
    createProfessional,
    editProfessionalProfile,
    deleteProfessionalProfile
} = require('../controllers/professionalController');

router.get('/professional/:email/:role', professionalEmailMatch);
router.get('/profile/:id', professionalProfile);
router.get('/publicProfile/:id', profPublicProfile);
router.get('/professionals', getProfessionals);
router.get('/professionals/:profession', getByProfession);

router.post('/create', createProfessional);

router.put('/edit/:id', editProfessionalProfile);

router.delete('/delete/:id', deleteProfessionalProfile);

module.exports = router;