"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const transport = (0, nodemailer_1.createTransport)({
    service: 'hotmail',
    auth: {
        user: 'miguelangelcahuas@hotmail.com',
        pass: 'miguelitocahuas'
    }
});
const mailOptions = {
    from: 'miguelangelcahuas@hotmail.com',
    to: 'gfbgbsjfdj@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};
transport.sendMail(mailOptions, (error, info) => {
    // if (error) {
    // console.log(error);
    // } else {
    // console.log('Email sent: ' + info.response);
    // }
});
//# sourceMappingURL=emailSender.js.map