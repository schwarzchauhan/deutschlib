const User = require('./../models/user')
const Skill = require('./../models/skill');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10;

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