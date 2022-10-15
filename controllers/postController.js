import PostModel from '../models/post.js'

export const removeOne = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete({
            _id: postId
        }, (err, doc) => {
            if (err) {
                console.log(error);

                return res.status(500).json({
                    success: false,
                    message: "error while deleting post."
                });
            }

            if (!doc) {
                return res.status(500).json({
                    success: false,
                    message: "post to delete not found."
                });
            }

            res.json({
                success: true,
                message: "post was successfully deleted."
            });
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "error while deleting post."
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        // if i dont want to increment viewsCount -> findOne(), findOneById()

        PostModel.findOneAndUpdate({
            _id: postId
        }, {
            $inc: {
                viewsCount: 1
            }
        }, {
            returnDocument: 'after'
        }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "error while getting post."
                });
            }

            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: "post not found."
                });
            }

            res.json({
                success: true,
                doc
            });
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "error while getting post."
        });
    }
};

export const getAll = async (_, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json({
            success: true,
            posts
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "error while getting all posts."
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