require('dotenv').config();
const { verify } = require('jsonwebtoken');
const { HttpException } = require('../exceptions/HttpsException');
const userModel = require('../models/user.model');
const { mongoose } = require('mongoose');

const authMiddleware = async (req, res, next) => {
    try {
        // console.log(req.cookies['Authorization'], "<-----------cookies----------------", req.header("Authorization"), "<--------------header ------------->");
        const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

        if (Authorization) {

            const secretKey = process.env.SECRET_KEY;
            const verificationResponse = await verify(Authorization, secretKey);

            if (!verificationResponse) {
                next(HttpException(401, 'Wrong authentication token'));
            }
            const userId = verificationResponse._id;
            const findUser = await userModel.findOne({ _id: new mongoose.Types.ObjectId(userId) });

            if (findUser) {
                req.user = findUser;
                next();
            } else {

                next(HttpException(401, 'Wrong authentication token'));
            }
        } else {
            next(HttpException(404, 'Token Expiry or Login First...... '));
        }
    } catch (error) {
        next(error);
    }
};

module.exports = authMiddleware;
