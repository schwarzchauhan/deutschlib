const User = require('./../models/user')
const Skill = require('./../models/skill');
const fs = require('fs')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10;
const mymail = require('./../services/mymail')
const handlebars = require('handlebars')
const jwt = require('jsonwebtoken')
const myCreateExpire = require('./../modules/myCreateExpire')

// https://github.com/kelektiv/node.bcrypt.js#async-recommended
// https://github.com/kelektiv/node.bcrypt.js#api
const myCreateUser = async function(name, email, password, role) {
    try {
        // console.log(bcrypt.hash(password, saltRounds));
        const hash = await bcrypt.hash(password, saltRounds);
        // console.log(hash);
        const u = new User({
            name,
            email,
            password: hash,
            role
        })
        await u.save()
        return u;
    } catch (err) {
        return err;
    }
}

// to register new user
exports.createUser = async(req, res) => {
    try {
        // console.log(req.body);
        const { name, email, password, role } = req.body;
        if (!(name && email && password && role)) {
            return res.status(200).send('Credentials Missing !')
        }
        const u = await User.findOne({ email: email })
        if (u) {
            console.log('user with this email already registered 💀');
            return res.send('user with this email already registered 💀')
        }
        const newUser = await myCreateUser(name, email, password, role)
        console.log(newUser);
        return res.send('new user successfully registered into database ⭐')
    } catch (err) {
        console.log(err);
        return res.send('some error while registering new user 💀')
            // return res.json(err);
    }
}

exports.deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete({ _id: req.params._id })
        return res.send('deleted user');
    } catch (err) {
        return console.log(err);
    }
}

exports.patchUser = async(req, res) => {
    try {
        const u = await User.findById({ _id: req.params._id })

        console.log(req.body);
        const { language } = req.body
        if (language) {
            var s = await Skill.findOne({ language: language })
            console.log(s);

            if (!s) {
                s = new Skill({
                    _id: new mongoose.Types.ObjectId(),
                    language: language
                })
                await s.save();
                console.log(`newly created `, s);

                // https://mongoosejs.com/docs/populate.html#saving-refs
                u.skills.push(s._id)
                await u.save()
            }

            console.log(`before populating `, u);
            await u.populate('skills') // https://mongoosejs.com/docs/populate.html#populate_an_existing_mongoose_document
            console.log(`after populating `, u);
        }
        return res.send('patched user');
    } catch (err) {
        return console.log(err);
    }
}

// form to change password fields are name/oldpassword/newpassword
exports.changePassword = async(req, res) => {
    try {
        console.log(req.params);
        const u = await User.findOne({ _id: req.params._id })

        console.log(req.body);
        const { old_pwd, new_pwd } = req.body;

        if (!(old_pwd && new_pwd)) {
            return res.send('All fields are required 💀')
        }

        const match = await bcrypt.compare(old_pwd, u.password)
        console.log(match);
        if (match) {
            const hash = await bcrypt.hash(new_pwd, saltRounds)
            console.log(hash);
            u.password = hash
            await u.save()
            console.log(u);
            return res.send('Password changed successfully')
        } else {
            return res.send('Password does not match 💀')
        }
    } catch (err) {
        return console.log(err);
    }
}

// to mail password rest link to the user
exports.forgotPassword = async(req, res) => {
    try {
        // console.log(req.params._id);
        const u = await User.findOne({ email: req.body.email })

        if (!u) {
            return res.send('user not registered 💀')
        }
        console.log(u);

        // making token to store user email
        const privateKey = process.env.JWT_KEY + u.password
        console.log(`privateKey`, privateKey);
        const expSecs = 120;
        const token = jwt.sign({ email: u.email }, privateKey, { expiresIn: expSecs }) // A numeric value is interpreted as a seconds count. 
        console.log(`token`, token);
        console.log(`${process.env.APP_BASE_URL}/user/reset-password/${token}/${u._id}`);

        const passwordResetUrl = `${process.env.APP_BASE_URL}/user/reset-password/${token}/${u._id}`;
        const resetLinkValidityDuration = `${expSecs} seconds`;

        myCreateExpire(Date.now(), expSecs * 1000)

        // reading html file using handlebar template
        const emailFilePath = `${__dirname}/../public/html/reset-password-hbs.html`;
        // console.log(emailFilePath);
        const htmlFile = await fs.promises.readFile(emailFilePath, { encoding: 'utf8' }); // https://nodejs.org/api/fs.html#fspromisesreadfilepath-options
        // console.log(htmlFile);
        // return res.send(htmlFile)

        // https://github.com/handlebars-lang/handlebars.js#usage
        const htmlTemplate = handlebars.compile(htmlFile);
        const replacements = { name: u.name, passwordResetUrl, resetLinkValidityDuration };
        const htmlToSend = htmlTemplate(replacements);
        // console.log(htmlToSend);

        mymail.sendEmail({
            subject: 'Reset password for the app',
            email: u.email,
            // text: 'hello boi'
            html: htmlToSend
        });

        return res.send('password reset link sent to your email')

    } catch (err) {
        return console.log(err);
    }
}

// to navigate user to new password reset page when user clicks reset-link sent on mail
exports.resetPassword = async(req, res) => {
    try {
        const { token, _id } = req.params;
        console.log(req.params);

        const u = await User.findOne({ _id });
        if (!u) {
            return res.status(404).send('invalid url 💀')
        }
        console.log(u);
        const privateKey = process.env.JWT_KEY + u.password;

        const decoded = jwt.verify(token, privateKey);
        if (!decoded) {
            return res.send('password rest link expired 💀')
        }

        // make a logic to chk if the userchanged the password after pwd-reset-token was issued 

        console.log(decoded);
        return res.send('now in frontend make a form with the newpassword, confirmnew password filed'); // here we get user email 
        /*
            and action POST /user/reset-password/:token/:_id
        */
    } catch (err) {
        console.log(err);
        if (err instanceof mongoose.Error) {
            return res.status(404).send('invalid url 💀')
        }
        if (err.name === 'TokenExpiredError') {
            return res.send('Password Reset Link Expired 💀');
        }
        return res.json(err);
    }
}


// to save the password entered by user into the database
exports.setNewPassword = async(req, res) => {
    // make logic to set the new password entred by the user
    try {
        const { newPassword } = req.body;

        const { token, _id } = req.params;
        console.log(req.params);

        const u = await User.findById(_id);
        if (!u) {
            return res.status(404).send('invalid url 💀')
        }
        console.log(u);
        const privateKey = process.env.JWT_KEY + u.password;
        const decoded = jwt.verify(token, privateKey);
        console.log(decoded);
        if (!decoded) {
            return res.send('password rest link expired 💀')
        } else {
            const hash = await bcrypt.hash(newPassword, saltRounds);
            console.log(hash);
            u.password = hash;
            await u.save();
            console.log(u);
            return res.send('password reset successfully')
        }
    } catch (err) {
        console.log(err);
        if (err.name == 'JsonWebTokenError' && err.message == 'invalid signature') { // https://github.com/auth0/node-jsonwebtoken#jsonwebtokenerror
            return res.status(404).send('invalid url 💀')
        }
        if (err instanceof mongoose.Error) { // https://mongoosejs.com/docs/api/error.html#error_Error
            return res.status(404).send('invalid url 💀')
        }
        return res.json(err)
    }
}