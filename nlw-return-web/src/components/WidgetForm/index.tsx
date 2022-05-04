import { useState } from "react";
import { CloseButton } from "../CloseButton";

import bugImageuRL from "../../assets/Bug.svg"
import ideaImageuRL from "../../assets/Idea.svg"
import thoghtImageuRL from "../../assets/Thought.svg"
import { FeedbackTypeStep } from "./components/FeedBackTypeStep";
import { FeedbackContentStep } from "./components/FeedbackContentStep";
import { FeedbackSucessStep } from "./components/FeedbackSucessStep";

export const feedbackTypes = {
    BUG: {
        title: "Problema",
        image: {
            src: bugImageuRL,
            alt: "imagem de um inseto"
        }
    },
    IDEA: {
        title: "Ideia",
        image: {
            src: ideaImageuRL,
            alt: "imagem de uma lamada"
        }
    },
    OTHER: {
        title: "Outro",
        image: {
            src: thoghtImageuRL,
            alt: "imagem de um balão de pensamento"
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {

    const [feedbackType, setFeedBackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedBackSent] = useState(false);

    function handleRestartFeedback() {
        setFeedBackType(null)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feedbackSent ?
                <FeedbackSucessStep /> 
                :
                !feedbackType ?
                    <FeedbackTypeStep onFeedBackTypeChange={setFeedBackType} />
                    :
                    < FeedbackContentStep
                        feedbackType={feedbackType}
                        onFeedBackRestartRequesed={handleRestartFeedback}
                        onFeedBackSent={() => setFeedBackSent(true)}
                    />
            }



            <footer className="text-xs text-neutral-400">
                Feito com 💜 pela <a className="underline underline-offset-1" href="https://rocketseat.com.br">RocketSeat</a>
            </footer>
        </div>
    )
}