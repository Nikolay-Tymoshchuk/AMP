import data from '@/data/data.json';
import Joi from 'joi';

import { USER_ROLE } from '@/interfaces/enums';

const {
  authFormTextData: {
    notification: {
      required,
      email: { maxLengthMessage, minLengthMessage, patternMessage },
      password: {
        maxLengthMessage: passMaxLengthMessage,
        minLengthMessage: passMinLengthMessage,
        patternMessage: passPatternMessage,
      },
      name: {
        maxLengthMessage: nameMaxLengthMessage,
        minLengthMessage: nameMinLengthMessage,
      },
      confirmPasswordMessage,
    },
  },
} = data;

const loginSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(63)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': required,
      'string.email': patternMessage,
      'string.min': minLengthMessage,
      'string.max': maxLengthMessage,
    }),
  password: Joi.string().required().messages({
    'string.empty': required,
  }),
});

const registerSchema = loginSchema.keys({
  password: Joi.string()
    .min(6)
    .max(32)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).*$/)
    .required()
    .messages({
      'string.empty': required,
      'string.min': passMinLengthMessage,
      'string.pattern.base': passPatternMessage,
      'string.max': passMaxLengthMessage,
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': confirmPasswordMessage,
  }),
  name: Joi.string().min(2).max(32).required().messages({
    'string.empty': required,
    'string.min': nameMinLengthMessage,
    'string.max': nameMaxLengthMessage,
  }),
  role: Joi.string()
    .required()
    .valid(...Object.values(USER_ROLE)),
});

export { loginSchema, registerSchema };
