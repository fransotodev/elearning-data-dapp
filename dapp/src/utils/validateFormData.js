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
  accountsToPay: Joi.array()
    .min(1)
    .items(Joi.string().min(42).max(42))
    .required(),
  price: Joi.number().greater(0).required(),
});

export default async function validateFormData(formData) {
  try {
    //Parse price from string to int only for validation
    const parsedFormData = {
      ...formData,
      price: parseInt(formData.price),
    };

    const validationResult = schema.validate(parsedFormData);

    const { error } = validationResult;
    if (error) return validationResult;

    const result = await checkEndpointApiAndHeader(
      formData.endpointAPI,
      formData.authHeader
    );
    if (result.status >= 200 && result.status < 300) {
      return validationResult;
    } else {
      return {
        details: {
          0: { path: "General Error", message: "There was an error" },
        },
      };
    }
  } catch (error) {
    return {
      error: {
        details: {
          0: {
            path: "General Error",
            message:
              'There was an error. Make sure "endpoint API" and "Authorization headers" are correct. Also make sure this header has permissions to read data',
          },
        },
      },
    };
  }
}

function checkEndpointApiAndHeader(endpointAPI, authorizationHeader) {
  return http.get(endpointAPI, {
    headers: { Authorization: authorizationHeader },
  });
}
