/*
 EN: File: ../../../../home/sandbox/
     This file is auto-annotated with bilingual (EN/FA) educational comments to help beginners.
 FA: فایل: ../../../../home/sandbox/
     این فایل با کامنت‌های آموزشی دو‌زبانه (انگلیسی/فارسی) برای آموزش بهتر افراد مبتدی حاشیه‌نویسی شده است.
*/
// EN: Importing external package '@react-router/dev/routes' from node_modules.
// FA: ایمپورت پکیج خارجی '@react-router/dev/routes' از node_modules.
// npm install @react-router/dev/routes   ← اگر نصب نبود
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route('/auth','routes/auth.tsx'),
	route('/upload', 'routes/upload.tsx'),
	route('resume/:id', 'routes/resume.tsx'),
	route('wipe', 'routes/wipe.tsx')
] satisfies RouteConfig;
