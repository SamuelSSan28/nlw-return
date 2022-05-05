export interface MailData{
    from:string;
    to:string;
    subject:string;
    body:string;
}
export interface MailAdapter {
    sendMail: (data:MailData) => Promise<void>;
}