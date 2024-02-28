const EmploymentType = require('./EmploymentType')

const getEmploymentTypes = async (req, res) => {
    const employmentTypes = await EmploymentType.findAll()
    res.status(200).send(employmentTypes)
}


module.exports = {getEmploymentTypes}