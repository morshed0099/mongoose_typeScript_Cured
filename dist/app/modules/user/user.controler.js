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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControler = void 0;
const user_service_1 = require("./user.service");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student, password } = req.body;
        const result = yield user_service_1.userCrontorler.createStudentIntoDD(student, password);
        res.status(201).json({
            status: 'success',
            message: 'user created successfully !',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: 'user not created',
            description: error.message || 'something went wrong',
        });
    }
});
exports.userControler = {
    createStudent,
};
