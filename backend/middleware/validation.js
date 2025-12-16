import Joi from 'joi';

export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({ error: { message: 'Validation failed', errors } });
        }

        next();
    };
};

export const schemas = {
    register: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phone: Joi.string().optional(),
        dateOfBirth: Joi.date().optional(),
        gender: Joi.string().valid('male', 'female', 'other').optional()
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),

    updateProfile: Joi.object({
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        phone: Joi.string().optional(),
        dateOfBirth: Joi.date().optional(),
        gender: Joi.string().valid('male', 'female', 'other').optional()
    }),

    createBooking: Joi.object({
        sessionId: Joi.string().uuid().required()
    }),

    franchiseInquiry: Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        city: Joi.string().optional(),
        investmentCapacity: Joi.string().optional(),
        message: Joi.string().optional()
    })
};
