import Joi from "joi";
import http from "./../services/httpService";

const schema = Joi.object({
  endpointAPI: Joi.string().uri().required(),
  endpointDashboard: Joi.string().uri().required(),
  authHeader: Joi.string()
    .regex(/Basic /)
    .min(114)
    .max(114)
    .required(),
  description: Joi.string().required(),
  price: Joi.number().greater(0).required(),
  accountsToPay: Joi.array()
    .min(1)
    .items(Joi.string().min(42).max(42))
    .required(),
});

export default async function validateFormData(formData) {
  try {
    //Parse price from string to int only for validation
    const parsedFormData = {
      ...formData,
      price: parseInt(formData.price),
    };

    const { error } = schema.validate(parsedFormData);
    if (error) throw error;

    const result = await checkEndpointApiAndHeader(
      formData.endpointAPI,
      formData.authHeader
    );

    if (result.status >= 200 && result.status < 300) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function checkEndpointApiAndHeader(endpointAPI, authorizationHeader) {
  try {
    return await http.get(endpointAPI, {
      headers: { Authorization: authorizationHeader },
    });
  } catch (error) {
    throw error;
  }
}
