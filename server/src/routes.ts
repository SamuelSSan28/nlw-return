import express from 'express';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackService } from './services/submit-feedback-service';
import { NodeMailerAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router()

routes.post("/feedbacks", async (req, res) => {
    const { comment, type, screenshot } = req.body;

    const prismaFeedbackRepository = new PrismaFeedbackRepository();
    const nodeMailerAdapter = new NodeMailerAdapter();
    
    const submitFeedbackService = new SubmitFeedbackService(prismaFeedbackRepository,nodeMailerAdapter)
    await submitFeedbackService.execute({ comment, type, screenshot });

    return res.status(201).send();
})