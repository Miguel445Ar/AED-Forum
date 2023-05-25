import { EmailDetailsRequest } from "../resources/request/email-details.request";
import EmailService from "../services/email.service";
import { HTTP_STATUS } from "../utils/http-status.enum";

const sendMailToAdmin = async (req,res): Promise<void> => {
    const body: EmailDetailsRequest = res.body as EmailDetailsRequest;
    const [response, status]: (object | HTTP_STATUS)[] = await EmailService.sendMail(body);
    res.status(status).send(response)
}

export default { sendMailToAdmin }