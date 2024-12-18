const Resume = require('./models/Resume')
const WorkingHistory = require('./models/WorkingHistory') 
const Education = require('./models/Education') 
const ForeignLanguage = require('./models/ForeignLanguage') 
const ResumeEmploymentType = require('./models/ResumeEmploymentType') 
const EmploymentType = require('../employment-type/EmploymentType')
const City = require('../region/City')
const Country = require('../region/Country')
const User = require('../auth/User')
const Specialization = require('../specializations/models/Specialization')
const { Op } = require('sequelize');


const createResume = async (req, res) => {
    try {
        // Fetch user data based on the user ID from the request
        const user = await User.findByPk(req.user.id, {
            attributes: ['first_name', 'last_name', 'phone', 'birthday', 'gender']
        });

        if (!user) {
            return res.status(404).send({ error: "User not found." });
        }

        // Create the resume with user details
        const resume = await Resume.create({
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone,
            birthday: user.birthday,
            gender: user.gender,
            specializationId: req.body.specializationId,
            about: req.body.about,
            salary: req.body.salary,
            salary_type: req.body.salary_type,
            main_language: req.body.main_language,
            skills: req.body.skills,
            cityId: req.body.cityId,
            citizenship: req.body.citizenship,
            contact: req.body.contact,
            userId: req.user.id
        });

        // Add working history, education, foreign languages, employment types
        if (req.body.workingHistories) {
            await Promise.all(req.body.workingHistories.map(async (history) => {
                await WorkingHistory.create({ resumeId: resume.id, ...history });
            }));
        }

        if (req.body.education) {
            await Promise.all(req.body.education.map(async (edu) => {
                await Education.create({ resumeId: resume.id, ...edu });
            }));
        }

        if (req.body.foreignLanguages) {
            await Promise.all(req.body.foreignLanguages.map(async (ln) => {
                await ForeignLanguage.create({ resumeId: resume.id, ...ln });
            }));
        }

        if (req.body.employmentTypes) {
            await Promise.all(req.body.employmentTypes.map(async (employmentTypeId) => {
                await ResumeEmploymentType.create({ resumeId: resume.id, employmentTypeId });
            }));
        }

        res.status(200).send(resume);
    } catch (error) {
        console.error("Error creating resume:", error);
        res.status(500).send({ error: "An error occurred while creating the resume." });
    }
};


const editResume = async (req, res) => {
    try {
        const resumeId = req.body.id;

        // Найти существующее резюме
        const existingResume = await Resume.findByPk(resumeId);

        if (!existingResume) {
            return res.status(404).send({ error: "Резюме не найдено." });
        }

        // Обновляем только специфичные для резюме поля, игнорируя данные пользователя
        const updatedFields = {
            about: req.body.about || existingResume.about,
            position: req.body.position || existingResume.position,
            salary: req.body.salary || existingResume.salary,
            salary_type: req.body.salary_type || existingResume.salary_type,
            main_language: req.body.main_language || existingResume.main_language,
            skills: req.body.skills || existingResume.skills,
            cityId: req.body.cityId || existingResume.cityId,
            specializationId: req.body.specializationId || existingResume.specializationId,
            citizenship: req.body.citizenship || existingResume.citizenship,
            contact: req.body.contact,
            userId: req.user.id  // userId не должен изменяться
        };

        await Resume.update(updatedFields, { where: { id: resumeId } });

        // Обновление связанных данных (например, истории работы и образования)
        if (req.body.workingHistories) {
            await Promise.all(req.body.workingHistories.map(async (history) => {
                if (history.id) {
                    await WorkingHistory.update(history, { where: { id: history.id, resumeId } });
                } else {
                    await WorkingHistory.create({ resumeId, ...history });
                }
            }));
        }

        if (req.body.education) {
            await Promise.all(req.body.education.map(async (edu) => {
                if (edu.university_name && edu.faculty && edu.major && edu.end_date) {
                    await Education.create({
                        resumeId,
                        level: edu.level,
                        university_name: edu.university_name,
                        faculty: edu.faculty,
                        major: edu.major,
                        end_date: edu.end_date
                    });
                } else {
                    console.warn("Skipping incomplete education entry:", edu);
                }
            }));
        }

        if (req.body.foreignLanguages) {
            await Promise.all(req.body.foreignLanguages.map(async (ln) => {
                if (ln.id) {
                    await ForeignLanguage.update(ln, { where: { id: ln.id, resumeId } });
                } else {
                    await ForeignLanguage.create({ resumeId, ...ln });
                }
            }));
        }

        if (req.body.employmentTypes) {
            await ResumeEmploymentType.destroy({ where: { resumeId } });
            await Promise.all(req.body.employmentTypes.map(async (employmentTypeId) => {
                await ResumeEmploymentType.create({ resumeId, employmentTypeId });
            }));
        }

        const updatedResume = await Resume.findByPk(resumeId, {
            include: [
                { model: WorkingHistory, as: 'workingHistories' },
                { model: Education, as: 'education' },
                { model: EmploymentType, as: 'employmentTypes' },
                { model: ForeignLanguage, as: 'foreignLanguages' },
                { model: City, as: 'city' },
                { model: Country, as: 'citizenshipObj' },
                { model: User, attributes: ['first_name', 'last_name', 'phone', 'birthday', 'gender'], as: 'user' }
            ]
        });

        res.status(200).send(updatedResume);
    } catch (error) {
        console.error("Ошибка при редактировании резюме:", error);
        res.status(500).send({ error: "Произошла ошибка при редактировании резюме." });
    }
};


// const editResume = async (req, res) => {
//     try {
//         const resumeId = req.body.id;

//         // Fetch the existing resume to get current data
//         const existingResume = await Resume.findByPk(resumeId);

//         if (!existingResume) {
//             return res.status(404).send({ error: "Resume not foundn." });
//         }

//         // Prepare the updated fields, retaining existing values for unspecified fields
//         const updatedFields = {
//             first_name: req.body.first_name || existingResume.first_name,
//             last_name: req.body.last_name || existingResume.last_name,
//             phone: req.body.phone || existingResume.phone,
//             birthday: req.body.birthday || existingResume.birthday,
//             gender: req.body.gender || existingResume.gender,
//             about: req.body.about || existingResume.about,
//             specializationId: req.body.specializationId || existingResume.specializationId,
//             salary: req.body.salary || existingResume.salary,
//             salary_type: req.body.salary_type || existingResume.salary_type,
//             main_language: req.body.main_language || existingResume.main_language,
//             skills: req.body.skills || existingResume.skills,
//             cityId: req.body.cityId || existingResume.cityId,
//             citizenship: req.body.citizenship || existingResume.citizenship,
//             userId: req.user.id // Assuming userId should not change
//         };

//         // Update the main Resume table
//         await Resume.update(updatedFields, { where: { id: resumeId } });

//         // Update associated data
//         // For WorkingHistory
//         if (req.body.workingHistories) {
//             await Promise.all(req.body.workingHistories.map(async (history) => {
//                 // Logic to create or update each WorkingHistory entry based on your requirements
//                 if (history.id) { // If an ID exists, update
//                     await WorkingHistory.update(history, { where: { id: history.id, resumeId } });
//                 } else { // Create new entry
//                     await WorkingHistory.create({ resumeId, ...history });
//                 }
//             }));
//         }

//         // For Education
//         if (req.body.education) {
//             await Promise.all(req.body.education.map(async (edu) => {
//                 // Check for required fields
//                 if (edu.university_name && edu.faculty && edu.major && edu.end_date) {
//                     await Education.create({
//                         resumeId,
//                         level: edu.level,
//                         university_name: edu.university_name,
//                         faculty: edu.faculty,
//                         major: edu.major,
//                         end_date: edu.end_date
//                     });
//                     console.log("Added education entry:", edu);
//                 } else {
//                     console.warn("Skipping incomplete education entry:", edu);
//                 }
//             }));
//         }

//         // For ForeignLanguage
//         if (req.body.foreignLanguages) {
//             await Promise.all(req.body.foreignLanguages.map(async (ln) => {
//                 if (ln.id) { // If an ID exists, update
//                     await ForeignLanguage.update(ln, { where: { id: ln.id, resumeId } });
//                 } else { // Create new entry
//                     await ForeignLanguage.create({ resumeId, ...ln });
//                 }
//             }));
//         }

//         // For EmploymentType
//         if (req.body.employmentTypes) {
//             // Assuming you're allowing updates to employment types as well
//             await ResumeEmploymentType.destroy({ where: { resumeId } }); // Remove all existing employment types
//             await Promise.all(req.body.employmentTypes.map(async (employmentTypeId) => {
//                 await ResumeEmploymentType.create({ resumeId, employmentTypeId });
//             }));
//         }

//         // Fetch the updated resume to return full details, including associated data
//         const updatedResume = await Resume.findByPk(resumeId, {
//             include: [
//                 { model: WorkingHistory, as: 'workingHistories' },
//                 { model: Education, as: 'education' },
//                 { model: EmploymentType, as: 'employmentTypes' },
//                 { model: ForeignLanguage, as: 'foreignLanguages' },
//                 { model: City, as: 'city' },
//                 { model: Country, as: 'citizenshipObj' }
//             ]
//         });

//         res.status(200).send(updatedResume);
//     } catch (error) {
//         console.error("Error editing resume:", error);
//         res.status(500).send({ error: "An error occurred while editing the resume." });
//     }
// };


const getMyResumes = async (req, res) => {
    try {
        const resumes = await Resume.findAll({ where: { userId: req.user.id } });
        res.status(200).send(resumes);
    } catch (error) {
        console.error("Error fetching resumes:", error);
        res.status(500).send({ error: "An error occurred while fetching your resumes." });
    }
};

const getResume = async (req, res) => {
    try {
        const resume = await Resume.findByPk(req.params.id, {
            include: [
                { model: WorkingHistory, as: 'workingHistories' },
                { model: Education, as: 'education' },
                { model: EmploymentType, as: 'employmentTypes' },
                { model: ForeignLanguage, as: 'foreignLanguages' },
                { model: City, as: 'city' },
                { model: Country, as: 'citizenshipObj' },
                {model: Specialization, as: "specialization" },
                { model: User, attributes: ['first_name', 'last_name', 'phone', 'birthday', 'gender'], as: 'user' } // Include user details
            ]
        });

        if (!resume) {
            return res.status(404).send({ error: "Resume not found." });
        }

        res.status(200).send(resume);
    } catch (error) {
        console.error("Error fetching resume:", error);
        res.status(500).send({ error: "An error occurred while fetching the resume." });
    }
};


const deleteResume = async (req, res) => {
    try {
        await Resume.destroy({ where: { id: req.params.id } });
        res.status(200).end();
    } catch (error) {
        console.error("Error deleting resume:", error);
        res.status(500).send({ error: "An error occurred while deleting the resume." });
    }
};


const getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.findAll({
            include: [
                { model: WorkingHistory, as: 'workingHistories' },
                { model: Education, as: 'education' },
                { model: EmploymentType, as: 'employmentTypes' },
                { model: ForeignLanguage, as: 'foreignLanguages' },
                { model: City, as: 'city' },
                {model: Specialization, as: "specialization" },
                { model: Country, as: 'citizenshipObj' },// Include user details
            ]
        });
        res.status(200).send(resumes);
    } catch (error) {
        console.error("Error fetching resumes:", error);
        res.status(500).send({ error: "An error occurred while fetching your resumes." });
    }
};

module.exports = {
    createResume,
    getMyResumes,
    getResume,
    deleteResume,
    editResume,
    getAllResumes
};
