import PostModel from '../models/post.js'

export const getAll = async (_, res) => {
    try {
        const posts = await PostModel.find();

        res.json({
            success: true,
            posts
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "error while getting all posts"
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        });

        const post = await doc.save();

        res.json({
            success: true,
            message: 'post was created successfully.',
            post
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: true,
            message: 'error while creating post.'
        });
    }
};