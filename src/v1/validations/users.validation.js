import DateExtension from '@hapi/joi-date';
import JoiImport from 'joi';

const Joi = JoiImport.extend(DateExtension);

export default {

  // CREATE USER
  createUser: {
    body: Joi.object({
      email: Joi.string()
        .email(),
      first_name: Joi.string().max(128).required(),
      last_name: Joi.string().max(128).required(),
      password: Joi.string()
        .required()
        .min(8)
        .max(128),
      age: Joi.number().min(0).required(),

    }),

  },

  // PATCH USER
  updateUser: {
    body: Joi.object({
      email: Joi.string()
      .email().required(),
    first_name: Joi.string().max(128).required(),
    last_name: Joi.string().max(128).required(),
    password: Joi.string()
      .required()
      .min(8)
      .max(128),
    age: Joi.number().min(0).required(),
    }),
  },

};
