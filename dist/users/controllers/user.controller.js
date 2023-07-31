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
const express_1 = require("express");
const user_service_1 = require("../services/user.service");
const router = (0, express_1.Router)();
router.post("/auth/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield user_service_1.UserService.saveUser(req.body);
    res.status(response[1]).json(response[0]);
}));
router.post("/auth/sign-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield user_service_1.UserService.logIn(req.body);
    res.status(response[1]).json(response[0]);
}));
router.get("/verification/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.params.token;
}));
exports.default = router;
//# sourceMappingURL=user.controller.js.map