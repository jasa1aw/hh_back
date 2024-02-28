const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'olzhaszholayev@gmail.com',
        pass: 'hhcopsreyklsjuzh'
    }
});

function sendEmail(to, subject, text){
    const mailOptions = {
        from: 'olzhaszholayev@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error) console.error(error);
        else console.log(`Email sent: ${info.response}`);
    });
}

module.exports = sendEmail;