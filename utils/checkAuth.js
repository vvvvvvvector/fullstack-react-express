// middleware
// in get('/auth/me', checkAuth, ... );
// checkAuth will decide if we should go forward and execute (res, req) => {}
// if yes -> next() function

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// we should parse token and decode it in this func
export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            req.userId = decoded._id;

            next();
        } catch (error) {
            console.log(error);

            return res.status(403).json({
                success: false,
                message: "no access."
            });
        }
    } else {
        return res.status(403).json({
            success: false,
            message: "no access."
        });
    }
};