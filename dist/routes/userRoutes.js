"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userControler_1 = require("../controllers/userControler");
const router = express_1.default.Router();
router.post('/create-user', userControler_1.userController.createUser);
router.get('/', userControler_1.userController.getAllUser);
router.get('/:id', userControler_1.userController.getSingleUser);
router.delete('/:id', userControler_1.userController.deleteUser);
router.patch('/:id', userControler_1.userController.updateUser);
exports.userRoutes = router;
