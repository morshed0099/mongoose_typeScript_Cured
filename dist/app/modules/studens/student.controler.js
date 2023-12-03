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
exports.StudentControler = void 0;
const student_service_1 = require("./student.service");
// import studentJoiValid from './dataVlidWithJoi'
// import { z } from "zod";
const getAllStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getStudenIntoDb();
        res.status(200).json({
            success: true,
            message: 'all student data fetched ',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const getSigleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.sutdentId;
        const result = yield student_service_1.StudentServices.getSingleStudenByID(id);
        res.status(200).json({
            success: true,
            message: 'studen fetch successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong !!',
            data: error,
        });
        console.log(error);
    }
});
exports.StudentControler = {
    getAllStudent,
    getSigleStudent,
};
