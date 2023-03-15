import { EmailDetailsRequest } from "../resources/request/email-details.request";
import { EmailDetailsResponse } from "../resources/response/email-details.response";
import { CustomResponse } from "../utils/custom-response";

export class EmailDetailsValidator {
    public static validate(request: EmailDetailsRequest): CustomResponse<EmailDetailsResponse> {
        const { mailSender, passwordSender, subject, description } = request;
        const response: CustomResponse<EmailDetailsResponse> = new CustomResponse<EmailDetailsResponse>();
        if(mailSender === null || mailSender === undefined || passwordSender === null ||
            passwordSender === undefined && subject === null || subject === undefined ||
            description === null || description === undefined) {
            response.addError("Is missing one or more properties, check api doc");
            return response;
        }
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if(regex.test(mailSender) === false) {
            response.addError("Mail does not match with the given format: example@sample.com");
        }
        regex = new RegExp('^([A-Za-z]|[0-9])+$');
        if(!(passwordSender.length > 0 && passwordSender.length <= 100)) {
            response.addError("Password length must be between 1 and 100 characters");
        }else if(regex.test(passwordSender) === false) {
            response.addError("Password must be sequence of characters that contains any valid\
            letter between A-Z (both lowercase and uppercase) or digits, in any combination");
        }
        if(!(subject.length > 0 && subject.length <= 100)) {
            response.addError("Subject length must be between 1 and 2000 characters");
        }
        if(!(description.length > 0 && description.length <= 2000)) {
            response.addError("Description length must be between 1 and 2000 characters");
        }
        if(response.hasErrors() === false) {
            response.resource = new EmailDetailsResponse("Mail was sended succesfully");
        }
        return response;
    }
}