"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    needsPasswordChange: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    role: { type: String, enum: ['admin', 'student', 'academicFaculty'] },
    status: { type: String, enum: ['in-progress', 'blocked'] },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
