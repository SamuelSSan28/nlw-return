import { resolveSoa } from "dns";
import { resolve } from "path";
import { SubmitFeedbackService } from "./submit-feedback-service"


const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe("Submit Feedback", () => {
    test("should be able to submit a feedback", async () => {
        const submitFeedback = new SubmitFeedbackService(
            { create: createFeedbackSpy },
            { sendMail: sendMailSpy }
        );

        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Socorroooo ta pegando fogo bixo!",
            screenshot: "data:image/png;base64,test.jpg"
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })

    test("should not be able to submit a feedback without a type", async () => {
        const submitFeedback = new SubmitFeedbackService(
            { create: async () => { } },
            { sendMail: async () => { } }
        );

        await expect(submitFeedback.execute({
            type: "",
            comment: "Socorroooo ta pegando fogo bixo!",
            screenshot: "data:image/png;base64,test.jpg"
        })).rejects.toThrow();

    })

    test("should not be able to submit a feedback without a comment", async () => {
        const submitFeedback = new SubmitFeedbackService(
            { create: async () => { } },
            { sendMail: async () => { } }
        );

        await expect(submitFeedback.execute({
            type: "aaaaa",
            comment: "",
            screenshot: "data:image/png;base64,test.jpg"
        })).rejects.toThrow();

    })

    test("should not be able to submit a feedback with a invalid screenshot", async () => {
        const submitFeedback = new SubmitFeedbackService(
            { create: async () => { } },
            { sendMail: async () => { } }
        );

        await expect(submitFeedback.execute({
            type: "aaaaa",
            comment: "aaaaaaaaaa",
            screenshot: "test.jpg"
        })).rejects.toThrow();

    })
})