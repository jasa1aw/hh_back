const express = require('express')
const router = express.Router();
const {createResume, getMyResumes, getResume, deleteResume, editResume, getAllResumes} = require('./controllers')
const {isEmployee} = require('../auth/middlewares')
const passport = require('passport')
const {validateResume, isAuthorOfResume} = require('./middlewares')

router.post('/api/resume',  passport.authenticate('jwt', { session: false }), isEmployee, createResume)
router.get('/api/resume',  passport.authenticate('jwt', { session: false }), isEmployee, getMyResumes)
router.get('/api/resume/:id',  passport.authenticate('jwt', { session: false }), getResume)
router.delete('/api/resume/:id', passport.authenticate('jwt', { session: false }), isEmployee, isAuthorOfResume, deleteResume)
router.put('/api/resume', passport.authenticate('jwt', { session: false }), isEmployee, isAuthorOfResume, validateResume, editResume)
router.get('/api/allResumes', getAllResumes)

module.exports = router;