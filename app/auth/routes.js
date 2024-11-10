const express = require('express');
const router = express.Router();
const {sendVerificationEmail, verifyCode,registerApplicant, signUp, logIn, getAllUsers, editUser, profilePage} = require('./controllers');
const {validateSignUp} = require('./middlewares');
const {upload} = require('./utils');

router.post('/api/auth/sendmail', sendVerificationEmail);
router.post('/api/auth/verifycode', verifyCode);
router.get('/api/allUsers', getAllUsers)
router.post('/api/auth/signUpEmployer', registerApplicant);
router.post('/api/auth/signup', upload.single('company_logo'), validateSignUp, signUp);
router.post('/api/auth/login', logIn);
router.put('/api/user/:userId', editUser); // Route to edit user, cannot edit role
router.get('/api/profile/:userId', profilePage);

module.exports = router;