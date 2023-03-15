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
router.post("/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_service_1.UserService.saveUser(req.body);
    res.send("Sign up service is not available yet");
}));
router.post("/sign-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Sign in service is not available yet");
}));
exports.default = router;
//# sourceMappingURL=user.controller.js.map