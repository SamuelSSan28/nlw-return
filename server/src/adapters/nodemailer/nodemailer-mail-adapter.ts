import { MailAdapter, MailData } from "../mail-adapter";
import nodemailer from 'nodemailer';


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "8abd8d01b93bfa",
        pass: "2861fe9c651923"
    }
});

export class NodeMailerAdapter implements MailAdapter {

    async sendMail({ subject, body, from, to }: MailData) {

        await transport.sendMail({
            from,
            to,
            subject,
            html: body
        })

    };

}