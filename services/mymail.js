// Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');


const sendEmail = async options => {
    try {
        // console.log(options);
        // https://mailtrap.io/blog/nodemailer-gmail/
        const transporter = nodemailer.createTransport({
            // host: process.env.NODEMAILER_HOST,
            // port: process.env.NODEMAILER_PORT,
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });

        // activate in gmail "less secure app" option

        // email options
        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: options.email,
            // to: options.email + ', harshchauhan0994gmail.com',
            // cc: 'harsh_11913052@nitkkr.ac.in',
            // bcc: 'harsh_11913052@nitkkr.ac.in',
            subject: options.subject,
            // text: options.text,
            html: options.html
        };
        // console.log(mailOptions);

        await transporter.sendMail(mailOptions, function(err, data) {
            if (err) { return console.log(err) }
            // console.log('email sent');
            console.log(data);
        });
    } catch (err) {
        return console.log(err);
    }
}
exports.sendEmail = sendEmail;