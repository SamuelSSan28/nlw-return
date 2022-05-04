import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from ".."
import { CloseButton } from "../../CloseButton"
import { ScreenshotButton } from "./ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedBackRestartRequesed: () => void;
    onFeedBackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, onFeedBackRestartRequesed, onFeedBackSent }: FeedbackContentStepProps) {
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [coment, setComent] = useState<string>('');

    function  handleSubmtFeedback(event:FormEvent) {
        event.preventDefault();
        console.log("AAAAAAAAAAAAAAAAA")
        onFeedBackSent();
    }

    return (
        <>
            <header>
                <button type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={onFeedBackRestartRequesed}>
                    <ArrowLeft />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img
                        src={feedbackTypeInfo.image.src}
                        alt={feedbackTypeInfo.image.alt}
                        className="w-6 h-6"
                    />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>

            <form className="my-4 w-full" onSubmit={handleSubmtFeedback} >
                <textarea
                    className=" min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-x-zinc-600 bg-transparent rounded-md focus:border-x-brand-500 focus:ring-brand-500 focus:ring-1 resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    value={coment}
                    onChange={event => setComent(event.target.value)}
                />

                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton onScreeshoTook={setScreenshot} screenshot={screenshot} />

                    <button
                        type="submit"
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:hover:bg-brand-500"
                        disabled={coment.length === 0}
                    >
                        Enviar feedback
                    </button>
                </footer>
            </form>
        </>
    )
}