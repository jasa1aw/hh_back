const express = require('express')
const router = express.Router();
const {getExperiences, getMyVacancies, createVacancy, getVacancy, deleteVacancy, editVacancy, searchVacancy, getAllVacancies} = require('./controllers')
const passport = require('passport')
const {isManager} = require('../auth/middlewares')
const {validateVacancy, isAuthorOfVacancy} = require('./middlewares')
router.get('/api/experiences', getExperiences)

router.post('/api/vacancy', passport.authenticate('jwt', { session: false }), isManager, validateVacancy, createVacancy)
router.get('/api/vacancy', passport.authenticate('jwt', { session: false }), isManager, getMyVacancies)
router.get('/api/vacancy/search', searchVacancy)
router.get('/api/vacancy/:id', getVacancy)
router.delete('/api/vacancy/:id', passport.authenticate('jwt', { session: false }), isManager, isAuthorOfVacancy, deleteVacancy)
router.put('/api/vacancy', passport.authenticate('jwt', { session: false }), isManager, isAuthorOfVacancy, validateVacancy, editVacancy)
router.get('/api/allVacancies', getAllVacancies)



module.exports = router;