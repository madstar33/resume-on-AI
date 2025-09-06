/*
 EN: File: ../../../../home/sandbox/
     This file is auto-annotated with bilingual (EN/FA) educational comments to help beginners.
 FA: فایل: ../../../../home/sandbox/
     این فایل با کامنت‌های آموزشی دو‌زبانه (انگلیسی/فارسی) برای آموزش بهتر افراد مبتدی حاشیه‌نویسی شده است.
*/
// EN: Importing external package 'react' from node_modules.
// FA: ایمپورت پکیج خارجی 'react' از node_modules.
// npm install react   ← اگر نصب نبود
import {type FormEvent, useState} from 'react'
// EN: Importing external package '~/components/Navbar' from node_modules.
// FA: ایمپورت پکیج خارجی '~/components/Navbar' از node_modules.
// npm install ~/components/Navbar   ← اگر نصب نبود
import Navbar from "~/components/Navbar";
// EN: Importing external package '~/components/FileUploader' from node_modules.
// FA: ایمپورت پکیج خارجی '~/components/FileUploader' از node_modules.
// npm install ~/components/FileUploader   ← اگر نصب نبود
import FileUploader from "~/components/FileUploader";
// EN: Importing external package '~/lib/puter' from node_modules.
// FA: ایمپورت پکیج خارجی '~/lib/puter' از node_modules.
// npm install ~/lib/puter   ← اگر نصب نبود
import {usePuterStore} from "~/lib/puter";
// EN: Importing external package 'react-router' from node_modules.
// FA: ایمپورت پکیج خارجی 'react-router' از node_modules.
// npm install react-router   ← اگر نصب نبود
import {useNavigate} from "react-router";
// EN: Importing external package '~/lib/pdf2img' from node_modules.
// FA: ایمپورت پکیج خارجی '~/lib/pdf2img' از node_modules.
// npm install ~/lib/pdf2img   ← اگر نصب نبود
import {convertPdfToImage} from "~/lib/pdf2img";
// EN: Importing external package '~/lib/utils' from node_modules.
// FA: ایمپورت پکیج خارجی '~/lib/utils' از node_modules.
// npm install ~/lib/utils   ← اگر نصب نبود
import {generateUUID} from "~/lib/utils";
// EN: Importing local module '../../constants' (a file from your project).
// FA: ایمپورت ماژول محلی '../../constants' (یکی از فایل‌های خود پروژه).
import {prepareInstructions} from "../../constants";

/* EN: React functional component `Upload` using arrow function.
   FA: کامپوننت تابعی ری‌اکت `Upload` با تابع پیکانی تعریف شده است. */
const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    /* EN: React state hook — declares reactive state for the component.
   FA: هوک state در ری‌اکت — وضعیت واکنشی کامپوننت را تعریف می‌کند. */
const [isProcessing, setIsProcessing] = useState(false);
    /* EN: React state hook — declares reactive state for the component.
   FA: هوک state در ری‌اکت — وضعیت واکنشی کامپوننت را تعریف می‌کند. */
const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full" />
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" placeholder="Job Title" id="job-title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button" type="submit">
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload