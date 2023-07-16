import { createTransport } from 'nodemailer';
import { EmailDetailsRequest } from '../resources/request/email-details.request';
import { EmailDetailsResponse } from '../resources/response/email-details.response';
import { CustomResponse } from '../utils/custom-response';
import { HTTP_STATUS } from '../../shared/utils/http-status.enum';
import { EmailDetailsValidator } from '../validators/email-details.validator';

const mailOptions = (emailDetails: EmailDetailsRequest) => {
    return {
        from: emailDetails.mailSender,
        to: 'gfbgbsjfdj@gmail.com',
        subject: emailDetails.subject,
        text: emailDetails.description
    }
};

const sendMail = async (emailDetailsDto: EmailDetailsRequest): Promise<(object | HTTP_STATUS)[]> => {
    const response: CustomResponse<EmailDetailsResponse> = EmailDetailsValidator.validate(emailDetailsDto);
    if(response.hasErrors()) {
        return [response.toDto(), HTTP_STATUS.BAD_REQUEST];
    }
    const transport = createTransport({
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

        })
    });
    return await sendMailPromise
        .then( info => [response.toDto(), HTTP_STATUS.OK ] )
        .catch( error => { return [{ errorDetails: error }, HTTP_STATUS.INTERNAL_ERROR ] } );
}

export default { sendMail }