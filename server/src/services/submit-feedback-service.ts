import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {
    private feedbackepository: FeedbackRepository;
    private mailAdapter: MailAdapter;

    constructor(feedbackepository: FeedbackRepository, mailAdapter: MailAdapter) {
        this.feedbackepository = feedbackepository;
        this.mailAdapter = mailAdapter;
    }

    async execute(request: SubmitFeedbackServiceRequest) {
        const { comment, type, screenshot } = request;

        if (!comment) {
            throw new Error("Comment is Required")
        }
        
        if (!type) {
            throw new Error("Type is Required")
        }

        if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error("Type is Required")
        }

        this.feedbackepository.create({ comment, type, screenshot })

        this.mailAdapter.sendMail({
            from: "Equipe Feedget <oi@feedget.com>",
            to: "Samuel Santos <samelssan28@gmail.com",
            subject: "Novo Feedback",
            body: [
                `<div style="font-fmaily: sans-serif; font-size: 16px; color:111;" >`,
                `<p>Tipo do Feedback: ${type} </p>`,
                `<p>Comentário: ${comment} </p>`,
                `</div>`
            ].join("")
        })

    }
}