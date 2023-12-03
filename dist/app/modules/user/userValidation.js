"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationScehma = void 0;
const zod_1 = require("zod");
exports.userValidationScehma = zod_1.z.object({
    password: zod_1.z
        .string({ invalid_type_error: 'password type will be string' })
        .max(20, { message: 'password is not more than 20 charecters' })
        .optional(),
});
