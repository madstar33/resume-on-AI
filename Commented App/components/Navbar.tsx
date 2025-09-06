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

/* EN: React functional component `Navbar` using arrow function.
   FA: کامپوننت تابعی ری‌اکت `Navbar` با تابع پیکانی تعریف شده است. */
const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/">
                <p className="text-2xl font-bold text-gradient">RESUMIND</p>
            </Link>
            <Link to="/upload" className="primary-button w-fit">
                Upload Resume
            </Link>
        </nav>
    )
}
export default Navbar