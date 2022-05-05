import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../feedbacks-repository";

export class PrismaFeedbackRepository implements FeedbackRepository {

    async create({ comment, type, screenshot }: FeedbackCreateData) {
        const feedback = await prisma.feedback.create({
            data: {
                comment,
                type,
                screenshot
            }
        })
    }
}