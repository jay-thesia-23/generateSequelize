const Joi = require("joi");

/** this is the curring function same as below
 * (schema,payload) =>{
 * schema.validation(payload)
 * }
 * */

const validation = (schema) => (payload) => {
  return schema.validate(payload, { abortEarly: true });
};

const signupSchema = Joi.object({
  selectName: Joi.array().items(Joi.string()),
  type: Joi.array().items(Joi.string()),
});

exports.validationTable = validation(signupSchema);
