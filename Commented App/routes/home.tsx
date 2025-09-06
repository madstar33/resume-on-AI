/*
 EN: File: ../../../../home/sandbox/
     This file is auto-annotated with bilingual (EN/FA) educational comments to help beginners.
 FA: فایل: ../../../../home/sandbox/
     این فایل با کامنت‌های آموزشی دو‌زبانه (انگلیسی/فارسی) برای آموزش بهتر افراد مبتدی حاشیه‌نویسی شده است.
*/
// EN: Importing local module './+types/home' (a file from your project).
// FA: ایمپورت ماژول محلی './+types/home' (یکی از فایل‌های خود پروژه).
import type { Route } from "./+types/home";
// EN: Importing external package '~/components/Navbar' from node_modules.
// FA: ایمپورت پکیج خارجی '~/components/Navbar' از node_modules.
// npm install ~/components/Navbar   ← اگر نصب نبود
import Navbar from "~/components/Navbar";
// EN: Importing external package '~/components/ResumeCard' from node_modules.
// FA: ایمپورت پکیج خارجی '~/components/ResumeCard' از node_modules.
// npm install ~/components/ResumeCard   ← اگر نصب نبود
import ResumeCard from "~/components/ResumeCard";
// EN: Importing external package '~/lib/puter' from node_modules.
// FA: ایمپورت پکیج خارجی '~/lib/puter' از node_modules.
// npm install ~/lib/puter   ← اگر نصب نبود
import {usePuterStore} from "~/lib/puter";
// EN: Importing external package 'react-router' from node_modules.
// FA: ایمپورت پکیج خارجی 'react-router' از node_modules.
// npm install react-router   ← اگر نصب نبود
import {Link, useNavigate} from "react-router";
// EN: Importing external package 'react' from node_modules.
// FA: ایمپورت پکیج خارجی 'react' از node_modules.
// npm install react   ← اگر نصب نبود
import {useEffect, useState} from "react";

/* EN: Function `meta` definition — describes a reusable unit of logic.
   FA: تعریف تابع `meta` — یک واحد منطقی قابل‌استفاده‌ی مجدد. */
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume on AI" },
    { name: "description", content: "Smart feedback for your resume!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  /* EN: React state hook — declares reactive state for the component.
   FA: هوک state در ری‌اکت — وضعیت واکنشی کامپوننت را تعریف می‌کند. */
const [loadingResumes, setLoadingResumes] = useState(false);

  const bgMain = "/images/bg-main.svg";

  /* EN: Side-effect hook — runs after render (e.g., fetch, subscriptions).
   FA: هوک side-effect — بعد از رندر اجرا می‌شود (مثلاً fetch، اشتراک‌ها). */
useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  /* EN: Side-effect hook — runs after render (e.g., fetch, subscriptions).
   FA: هوک side-effect — بعد از رندر اجرا می‌شود (مثلاً fetch، اشتراک‌ها). */
useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);

  // we couldent set dynamic classes in TW so i used Style
  return <main style={{backgroundImage: `url(${bgMain})`}} className="bg-cover"> 
  <Navbar/>
  <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Resume Ratings</h1>
        {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
        ): (
          <h2>Review your submissions and check AI-powered feedback.</h2>
        )}
      </div>
      {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
      )}
  </section>

  
  </main>;
}
