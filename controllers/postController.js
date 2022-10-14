import PostModel from '../models/post.js'

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

        res.json({
            success: true,
            message: 'error while creating post.'
        });
    }
};