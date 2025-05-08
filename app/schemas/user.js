const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    dni: Joi.string().length(8).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const updateSchema = Joi.object({
    username: Joi.string().min(3),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    dni: Joi.string().length(8)
}).min(1);

module.exports = { registerSchema, loginSchema, updateSchema };
