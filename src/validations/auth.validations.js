const { Joi } = require('express-validation');
const JoiObjectId = require('joi-objectid');
Joi.objectId = JoiObjectId(Joi);


const createSignup = {
    body: Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        contactNo: Joi.number().integer().min(1000000000).max(9999999999)
            .messages({
                'number.base': 'Contact number must be a number',
                'number.integer': 'Contact number must be an integer',
                'number.min': 'Contact number must have 10 digits',
                'number.max': 'Contact number must have 10 digits',
            })
            .required(),
        photoProof: Joi.any().optional()
    })
};

const loginUser = {
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}

module.exports = { createSignup, loginUser }


