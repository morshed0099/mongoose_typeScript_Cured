"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const student_route_1 = require("./app/modules/studens/student.route");
const app = (0, express_1.default)();
// const port = 3000
// perser
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application route
app.use('/api/v1/student', student_route_1.StudentRoute);
app.get('/', (req, res) => {
    const a = 10;
    res.send(a);
});
exports.default = app;
