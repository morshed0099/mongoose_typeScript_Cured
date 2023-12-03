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
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, 'name is required'] },
    age: { type: Number, required: [true, 'age is required'] },
    email: { type: String, unique: true, required: [true, 'email is required'] },
    photo: { type: String, required: [true, 'photo is requires'] },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});
UserSchema.pre('find', function name(next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ status: { $eq: 'active' } });
        next();
    });
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
