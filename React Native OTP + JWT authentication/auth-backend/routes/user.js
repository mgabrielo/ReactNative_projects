const router = require('express').Router();


const { createUser, SignInUser, verifyEmail, forgotPassword, resetPassword } = require('../controllers/user');
const { isResetTokenValid } = require('../middlewares/user');
const { validateUserCreate, validate } = require('../middlewares/validators');


router.post('/create', validateUserCreate, validate, createUser);
router.post('/signin', SignInUser);
router.post('/verifyemail', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', isResetTokenValid, resetPassword);
router.get('/verify-token', isResetTokenValid, (req, res) => {
    res.json({ success: true, })
});

module.exports = router

