import { FeedbackType, feedbackTypes } from ".."
import { CloseButton } from "../../CloseButton"

interface FeedbackTypeStepProps {
    onFeedBackTypeChange: (type: FeedbackType) => void;
}


export function FeedbackTypeStep({ onFeedBackTypeChange }: FeedbackTypeStepProps) {
    return (
        <>
            <header>
                <span className="text-xl leading-6"> Deixe se feedback</span>
                <CloseButton />
            </header>

            <div className="flex py-8 gap-2 w-full">
                {Object.entries(feedbackTypes).map(([key, item]) => {
                    return (
                        <button onClick={() => onFeedBackTypeChange(key as FeedbackType)} key={key} className="bg-zinc-800 rounded-lg py-5 w-24 flex flex-1 flex-col gap-2 items-center border-2 border-transparent hover:border-brand-500  focus:border-x-brand-500 focus:outline-none">
                            <img src={item.image.src} alt={item.image.alt} />
                            <span>{item.title}</span>
                        </button>
                    )
                })}
            </div>
        </>
    )
}