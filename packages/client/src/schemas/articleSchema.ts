import data from '@/data/data.json';
import Joi from 'joi';

const {
  articleFromTextData: {
    notification: { required, maxLength, minLength, notValidUrl },
  },
} = data;

export const articleSchema = Joi.object({
  title: Joi.string().min(10).max(300).required().messages({
    'string.empty': required,
    'string.min': minLength,
    'string.max': maxLength,
  }),
  description: Joi.string().min(10).max(300).required().messages({
    'string.empty': required,
    'string.min': minLength,
    'string.max': maxLength,
  }),
  enclosureUrl: Joi.string().empty('').uri().allow(null).messages({
    'string.uri': notValidUrl,
  }),
  updatePubDate: Joi.boolean(),
});
