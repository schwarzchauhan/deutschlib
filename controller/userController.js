const User = require('./../models/user')
const Skill = require('./../models/skill');
const mongoose = require('mongoose');

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
                console.log(`newly created `, s);
                await s.save();
            }

            console.log(s);
            // https://mongoosejs.com/docs/populate.html#saving-refs
            u.skill = s._id
            await u.save()
            console.log(`before populating `, u);
            await u.populate('skill') // https://mongoosejs.com/docs/populate.html#populate_an_existing_mongoose_document
            console.log(`after populating `, u);
        }
        return res.send('patched user');
    } catch (err) {
        return console.log(err);
    }
}