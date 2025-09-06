/*
 EN: File: ../../../../home/sandbox/
     This file is auto-annotated with bilingual (EN/FA) educational comments to help beginners.
 FA: فایل: ../../../../home/sandbox/
     این فایل با کامنت‌های آموزشی دو‌زبانه (انگلیسی/فارسی) برای آموزش بهتر افراد مبتدی حاشیه‌نویسی شده است.
*/
// EN: Importing external package 'react-router' from node_modules.
// FA: ایمپورت پکیج خارجی 'react-router' از node_modules.
// npm install react-router   ← اگر نصب نبود
import {Link, useNavigate, useParams} from "react-router";
// EN: Importing external package 'react' from node_modules.
// FA: ایمپورت پکیج خارجی 'react' از node_modules.
// npm install react   ← اگر نصب نبود
import {useEffect, useState} from "react";
// EN: Importing external package '~/lib/puter' from node_modules.
// FA: ایمپورت پکیج خارجی '~/lib/puter' از node_modules.
// npm install ~/lib/puter   ← اگر نصب نبود
import {usePuterStore} from "~/lib/puter";
// EN: Importing external package '~/components/summary' from node_modules.
// FA: ایمپورت پکیج خارجی '~/components/summary' از node_modules.
// npm install ~/components/summary   ← اگر نصب نبود
import Summary from "~/components/summary";
// EN: Importing external package '~/components/Ats' from node_modules.
// FA: ایمپورت پکیج خارجی '~/components/Ats' از node_modules.
// npm install ~/components/Ats   ← اگر نصب نبود
import ATS from "~/components/Ats";
// EN: Importing external package '~/components/Details' from node_modules.
// FA: ایمپورت پکیج خارجی '~/components/Details' از node_modules.
// npm install ~/components/Details   ← اگر نصب نبود
import Details from "~/components/Details";

export const meta = () => ([
    { title: 'Resumind | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

/* EN: React functional component `Resume` using arrow function.
   FA: کامپوننت تابعی ری‌اکت `Resume` با تابع پیکانی تعریف شده است. */
const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    /* EN: React state hook — declares reactive state for the component.
   FA: هوک state در ری‌اکت — وضعیت واکنشی کامپوننت را تعریف می‌کند. */
const [imageUrl, setImageUrl] = useState('');
    /* EN: React state hook — declares reactive state for the component.
   FA: هوک state در ری‌اکت — وضعیت واکنشی کامپوننت را تعریف می‌کند. */
const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    /* EN: Side-effect hook — runs after render (e.g., fetch, subscriptions).
   FA: هوک side-effect — بعد از رندر اجرا می‌شود (مثلاً fetch، اشتراک‌ها). */
useEffect(() => {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading])

    /* EN: Side-effect hook — runs after render (e.g., fetch, subscriptions).
   FA: هوک side-effect — بعد از رندر اجرا می‌شود (مثلاً fetch، اشتراک‌ها). */
useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if(!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({resumeUrl, imageUrl, feedback: data.feedback });
        }

        loadResume();
    }, [id]);

    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                </Link>
            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {imageUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-2xl:h-fit w-fit">
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={imageUrl}
                                    className="w-full h-full object-contain rounded-2xl"
                                    title="resume"
                                />
                            </a>
                        </div>
                    )}
                </section>
                <section className="feedback-section">
                    <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            <Summary feedback={feedback} />
                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                            <Details feedback={feedback} />
                        </div>
                    ) : (
                        <img src="/images/resume-scan-2.gif" className="w-full" />
                    )}
                </section>
            </div>
        </main>
    )
}
export default Resume