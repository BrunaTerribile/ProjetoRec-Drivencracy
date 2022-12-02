import joi from "joi";

export const poolsSchema = joi.object({
  title: joi.string().min(3).required(),
  expireAt: joi.string().required()
});