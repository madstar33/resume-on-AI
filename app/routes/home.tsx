import { resumes } from "constants";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume on AI" },
    { name: "description", content: "Smart feedback for your resume!" },
  ];
}

export default function Home() {
  const bgMain = "/images/bg-main.svg";

  // we couldent set dynamic classes in TW so i used Style
  return <main style={{backgroundImage: `url(${bgMain})`}} className="bg-cover"> 
  <Navbar/>
    <section className="main-section">
      <div className="page-heading">
        <h1>Track Your Application and Resume Ratings</h1>
        <h2>Review your submissions and check AI-powered feedback.</h2>
      </div>

      {resumes?.length > 0 && (
      <div className=" resumes-section">
        {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume}/>
        ))}
      </div>
      )}
    </section>

  
  </main>;
}
