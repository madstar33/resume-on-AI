/*
 EN: File: ../../../../home/sandbox/
     This file is auto-annotated with bilingual (EN/FA) educational comments to help beginners.
 FA: فایل: ../../../../home/sandbox/
     این فایل با کامنت‌های آموزشی دو‌زبانه (انگلیسی/فارسی) برای آموزش بهتر افراد مبتدی حاشیه‌نویسی شده است.
*/
// EN: Importing external package '~/components/ScoreGauge' from node_modules.
// FA: ایمپورت پکیج خارجی '~/components/ScoreGauge' از node_modules.
// npm install ~/components/ScoreGauge   ← اگر نصب نبود
import ScoreGauge from "~/components/ScoreGauge";
// EN: Importing external package '~/components/ScoreBadge' from node_modules.
// FA: ایمپورت پکیج خارجی '~/components/ScoreBadge' از node_modules.
// npm install ~/components/ScoreBadge   ← اگر نصب نبود
import ScoreBadge from "~/components/ScoreBadge";

/* EN: React functional component `Category` using arrow function.
   FA: کامپوننت تابعی ری‌اکت `Category` با تابع پیکانی تعریف شده است. */
const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-green-600'
            : score > 49
        ? 'text-yellow-600' : 'text-red-600';

    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p className="text-2xl">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-2xl">
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    )
}

/* EN: React functional component `Summary` using arrow function.
   FA: کامپوننت تابعی ری‌اکت `Summary` با تابع پیکانی تعریف شده است. */
const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex flex-row items-center p-4 gap-8">
                <ScoreGauge score={feedback.overallScore} />

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Your Resume Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>

            <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
            <Category title="Content" score={feedback.content.score} />
            <Category title="Structure" score={feedback.structure.score} />
            <Category title="Skills" score={feedback.skills.score} />
        </div>
    )
}
export default Summary