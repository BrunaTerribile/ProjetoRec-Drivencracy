import joi from "joi";

export const pollsSchema = joi.object({
  title: joi.string().min(3).required(),
  expireAt: joi.required()
});