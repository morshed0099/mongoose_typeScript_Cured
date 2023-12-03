"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define Joi schemas for individual fields
const nameSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .trim()
        .max(20)
        .regex(/^[A-Z][a-zA-Z]*$/)
        .messages({
        'string.base': 'First name must be a string',
        'string.empty': 'First name is required',
        'string.max': 'First name length should not exceed {#limit} characters',
        'string.pattern.base': 'First name must start with a capital letter and contain only letters',
    }),
    middleName: joi_1.default.string().allow('').optional(),
    lastName: joi_1.default.string()
        .regex(/^[a-zA-Z]*$/)
        .messages({
        'string.base': 'Last name must be a string',
        'string.empty': 'Last name is required',
        'string.pattern.base': 'Last name should contain only letters',
    }),
});
const localGuardianSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.base': 'Name must be a string',
        'any.required': 'Name is required for the local guardian',
    }),
    occupation: joi_1.default.string().required().messages({
        'string.base': 'Occupation must be a string',
        'any.required': 'Occupation is required for the local guardian',
    }),
    address: joi_1.default.string().required().messages({
        'string.base': 'Address must be a string',
        'any.required': 'Address is required for the local guardian',
    }),
    contactNo: joi_1.default.string().required().messages({
        'string.base': 'Contact number must be a string',
        'any.required': 'Contact number is required for the local guardian',
    }),
});
const guardianSchema = joi_1.default.object({
    fatherName: joi_1.default.string().required().messages({
        'string.base': 'Father name must be a string',
        'any.required': 'Father name is required',
    }),
    fatherContactNo: joi_1.default.string().required().messages({
        'string.base': 'Father contact number must be a string',
        'any.required': 'Father contact number is required',
    }),
    motherContactNo: joi_1.default.string().required().messages({
        'string.base': 'Mother contact number must be a string',
        'any.required': 'Mother contact number is required',
    }),
    fatherOccupation: joi_1.default.string().required().messages({
        'string.base': 'Father occupation must be a string',
        'any.required': 'Father occupation is required',
    }),
    motherOccupation: joi_1.default.string().required().messages({
        'string.base': 'Mother occupation must be a string',
        'any.required': 'Mother occupation is required',
    }),
    motherName: joi_1.default.string().required().messages({
        'string.base': 'Mother name must be a string',
        'any.required': 'Mother name is required',
    }),
});
const studentJoiValid = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: nameSchema.required().messages({
        'any.required': 'Student name is required',
    }),
    gender: joi_1.default.string()
        .valid('Female', 'Male')
        .required()
        .messages({
        'any.only': 'Gender must be Female or Male',
        'any.required': 'Gender is required',
    }),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required',
    }),
    //... (other fields follow similar validations)
    guardian: guardianSchema.required().messages({
        'any.required': 'Guardian information is required',
    }),
    localGuardian: localGuardianSchema.required().messages({
        'any.required': 'Local guardian information is required',
    }),
});
exports.default = studentJoiValid;
