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
exports.userController = void 0;
const userService_1 = require("../services/userService");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = yield userService_1.userService.crateUsers(user);
        res.status(200).json({
            status: 'success',
            message: 'user create seccessfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'falis',
            message: error.message || 'sometheing went wrong',
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userService_1.userService.getAllUser();
        res.status(200).json({
            status: 'success',
            message: 'user fetch seccessfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'falis',
            message: error.message || 'sometheing went wrong',
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield userService_1.userService.getSingleUser(id);
        res.status(200).json({
            status: 'success',
            message: 'single user fetch seccessfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'falis',
            message: error.message || 'sometheing went wrong',
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const id = req.params.id;
        const result = yield userService_1.userService.updateUser(id, userData);
        res.status(200).json({
            status: 'success',
            message: 'user information updated successfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'falis',
            message: error.message || 'sometheing went wrong',
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield userService_1.userService.deleteUser(id);
        res.status(200).json({
            status: 'success',
            message: 'user deleted succesfully',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'falis',
            message: error.message || 'sometheing went wrong',
        });
    }
});
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
};
