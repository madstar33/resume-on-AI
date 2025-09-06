/*
 EN: File: ../../../../home/sandbox/
     This file is auto-annotated with bilingual (EN/FA) educational comments to help beginners.
 FA: فایل: ../../../../home/sandbox/
     این فایل با کامنت‌های آموزشی دو‌زبانه (انگلیسی/فارسی) برای آموزش بهتر افراد مبتدی حاشیه‌نویسی شده است.
*/
// EN: Importing external package 'react-router' from node_modules.
// FA: ایمپورت پکیج خارجی 'react-router' از node_modules.
// npm install react-router   ← اگر نصب نبود
import {Link} from "react-router";
// EN: Importing local module './ScoreCircle' (a file from your project).
// FA: ایمپورت ماژول محلی './ScoreCircle' (یکی از فایل‌های خود پروژه).
import ScoreCircle from "./ScoreCircle";
// EN: Importing external package 'react' from node_modules.
// FA: ایمپورت پکیج خارجی 'react' از node_modules.
// npm install react   ← اگر نصب نبود
import {useEffect, useState} from "react";
// import {usePuterStore} from "~/lib/puter";

/* EN: React functional component `ResumeCard` using arrow function.
   FA: کامپوننت تابعی ری‌اکت `ResumeCard` با تابع پیکانی تعریف شده است. */
const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    // const { fs } = usePuterStore();
    /* EN: React state hook — declares reactive state for the component.
   FA: هوک state در ری‌اکت — وضعیت واکنشی کامپوننت را تعریف می‌کند. */
const [resumeUrl, setResumeUrl] = useState('');

    // /* EN: Side-effect hook — runs after render (e.g., fetch, subscriptions).
   FA: هوک side-effect — بعد از رندر اجرا می‌شود (مثلاً fetch، اشتراک‌ها). */
useEffect(() => {
    //     const loadResume = async () => {
    //         const blob = await fs.read(imagePath);
    //         if(!blob) return;
    //         let url = URL.createObjectURL(blob);
    //         setResumeUrl(url);
    //     }

    //     loadResume();
    // }, [imagePath]);

    return (
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                    {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>
            {true && (
                <div className="gradient-border animate-in fade-in duration-1000">
                    <div className="w-full h-full">
                        <img
                            src={imagePath}
                            alt="resume"
                            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
                        />
                    </div>
                </div>
                )}
        </Link>
    )
}
export default ResumeCard