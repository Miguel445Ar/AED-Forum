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
const router = (0, express_1.Router)();
router.get("/account-verification/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const token: string = req.params.token;
    // const result: [object, HTTP_STATUS] = await ConfirmationTokenService.updateConfirmationToken(token);
    // res.status(result[1]).json(result[0]);
}));
exports.default = router;
//# sourceMappingURL=confirmation-token.controller.js.map