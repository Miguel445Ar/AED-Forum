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
const nodemailer_1 = require("nodemailer");
const http_status_enum_1 = require("../utils/http-status.enum");
const email_details_validator_1 = require("../validators/email-details.validator");
const mailOptions = (emailDetails) => {
    return {
        from: emailDetails.mailSender,
        to: 'gfbgbsjfdj@gmail.com',
        subject: emailDetails.subject,
        text: emailDetails.description
    };
};
const sendMail = (emailDetailsDto) => __awaiter(void 0, void 0, void 0, function* () {
    const response = email_details_validator_1.EmailDetailsValidator.validate(emailDetailsDto);
    if (response.hasErrors()) {
        return [response.toDto(), http_status_enum_1.HTTP_STATUS.BAD_REQUEST];
    }
    const transport = (0, nodemailer_1.createTransport)({
        service: 'hotmail',
        auth: {
            user: emailDetailsDto.mailSender,
            pass: emailDetailsDto.passwordSender
        }
    });
    const sendMailPromise = new Promise((resolve, reject) => {
        transport.sendMail(mailOptions(emailDetailsDto), (error, info) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(info);
        });
    });
    return yield sendMailPromise
        .then(info => [response.toDto(), http_status_enum_1.HTTP_STATUS.OK])
        .catch(error => { return [{ errorDetails: error }, http_status_enum_1.HTTP_STATUS.INTERNAL_ERROR]; });
});
exports.default = { sendMail };
//# sourceMappingURL=email.service.js.map