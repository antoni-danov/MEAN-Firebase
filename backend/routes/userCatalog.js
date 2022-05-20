const router = require('express').Router();
const { userProfile,
    userEmailMatch,
    createUser,
    editUserProfile,
    deleteUserProfile }
    = require('../controllers/userController');


router.get('/profile/:id', userProfile);
router.get('/user/:email/:role', userEmailMatch);
router.post('/create', createUser);
router.put('/edit/:id', editUserProfile);
router.delete('/delete/:id', deleteUserProfile);

module.exports = router;