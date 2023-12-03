"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required'],
        maxlength: [20, 'firsname length is not more 20 carecter'],
        validate: {
            validator: function (value) {
                const firstName = value.charAt(0).toLocaleUpperCase() + value.slice(1);
                return firstName === value;
            },
            message: `{VALUE} must be capitazied `,
        },
    },
    middleName: { type: String },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        validate: {
            validator: (value) => validator_1.default.isAlpha(value),
            message: `{VALUE} is not valid, only a-z !!`,
        },
    },
});
const localGuardianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required for the local guardian'],
    },
    occupation: {
        type: String,
        required: [true, 'Occupation is required for the local guardian'],
    },
    address: {
        type: String,
        required: [true, 'Address is required for the local guardian'],
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required for the local guardian'],
    },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: { type: String, required: [true, 'Father name is required'] },
    fatherContactNo: {
        type: String,
        required: [true, 'Father contact number is required'],
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother contact number is required'],
    },
    fatherOccupation: {
        type: String,
        required: [true, 'Father occupation is required'],
    },
    motherOccupation: {
        type: String,
        required: [true, 'Mother occupation is required'],
    },
    motherName: { type: String, required: [true, 'Mother name is required'] },
});
const studentSchema = new mongoose_1.Schema({
    id: { type: String, unique: true },
    name: {
        type: userSchema,
        required: [true, 'Student name is required'],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'user id must be required'],
        unique: true,
        ref: 'User',
    },
    gender: {
        type: String,
        enum: {
            values: ['Female', 'Male'],
            message: '{VALUE} is not a valid gender',
        },
        required: [true, 'Gender is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: `{VALUE} is not email format!!`,
        },
    },
    dateOfBirth: { type: String },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
        required: [true, 'Blood group is required'],
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency contact number is required'],
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required'],
    },
    profileImage: { type: String },
    guardian: {
        type: guardianSchema,
        required: [true, 'Guardian information is required'],
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local guardian information is required'],
    },
});
studentSchema.statics.isStudentExsits = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExists = yield exports.StudentModel.findOne({ id });
        return isExists;
    });
};
exports.StudentModel = (0, mongoose_1.model)('Student', studentSchema);
