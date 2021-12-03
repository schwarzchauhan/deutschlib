const Post = require('./../models/post')
const path = require('path')

exports.postOnSite = (req, res) => {
    const multer = require('multer')

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            // console.log(`in desti`, file);
            cb(null, './public/uploads/pics')
        },
        filename: function(req, file, cb) {
            // console.log(`in filename`, file);
            const ext = path.extname(file.originalname) // https://nodejs.org/api/path.html#pathextnamepath
                // console.log(ext);
            const uniqueSuffix = Date.now() + '';
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
        }
    })
    const upload = multer({ storage: storage }).single('postImg')

    upload(req, res, async(err) => {
        if (err) { return console.log(err); }
        console.log(`in upload`, req.body);
        const timeNow = new Date(Date.now());
        const user = req.params._id; // later replace this by username
        console.log(`posted by ${user} on ${timeNow.toString()}`);

        const postImgUrl = `${req.file.destination}/${req.file.filename}`;
        const postText = `${req.body.postText}`;
        console.log(postImgUrl, postText);

        const newPost = new Post({
            postImgUrl,
            postText
        })
        await newPost.save();
        console.log(newPost);

        // const timeCheck = new Date(newPost.createdAt)
        // console.log(timeCheck.toString());

        return res.json(req.file);
    })
}

exports.viewPost = async(req, res) => {
    try {
        // https://expressjs.com/en/api.html#req.query
        console.log(`req.query`, req.query);
        const posts = await Post.find({}); // https://mongoosejs.com/docs/queries.html#executing read this 
        // return res.json(posts)
        return res.send('show all posts here')
    } catch (err) {
        console.log(err);
        return res.send(err.message)
    }
}