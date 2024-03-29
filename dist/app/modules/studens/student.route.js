"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoute = void 0;
const express_1 = __importDefault(require("express"));
const student_controler_1 = require("./student.controler");
const router = express_1.default.Router();
// will call controler function
router.get('/', student_controler_1.StudentControler.getAllStudent);
router.get('/:sutdentId', student_controler_1.StudentControler.getSigleStudent);
exports.StudentRoute = router;
