const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    dni:Joi.string().min(8).max(8).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const updateSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required()
});

module.exports = { registerSchema, loginSchema, updateSchema };
