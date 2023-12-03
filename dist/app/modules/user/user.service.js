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
exports.userCrontorler = void 0;
const config_1 = __importDefault(require("../../config"));
const student_model_1 = require("../studens/student.model");
const user_model_1 = require("./user.model");
const createStudentIntoDD = (student, password) => __awaiter(void 0, void 0, void 0, function* () {
    //   if (await StudentModel.isStudentExsits(student.id)) {
    //     throw new Error('student alredy exists !!')
    //   }
    // const user: NewUser = {}
    const user = {};
    user.password = password || config_1.default.password;
    user.id = '20300100001';
    user.role = 'student';
    const newUser = yield user_model_1.User.create(user);
    if (Object.keys(newUser).length) {
        student.id = newUser.id;
        student.user = newUser._id;
        const newStudent = yield student_model_1.StudentModel.create(student);
        return newStudent;
    }
});
exports.userCrontorler = {
    createStudentIntoDD,
};
