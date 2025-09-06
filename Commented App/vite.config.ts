/*
 EN: File: ../../../../home/sandbox/
     This file is auto-annotated with bilingual (EN/FA) educational comments to help beginners.
 FA: فایل: ../../../../home/sandbox/
     این فایل با کامنت‌های آموزشی دو‌زبانه (انگلیسی/فارسی) برای آموزش بهتر افراد مبتدی حاشیه‌نویسی شده است.
*/
// EN: Importing external package '@react-router/dev/vite' from node_modules.
// FA: ایمپورت پکیج خارجی '@react-router/dev/vite' از node_modules.
// npm install @react-router/dev/vite   ← اگر نصب نبود
import { reactRouter } from "@react-router/dev/vite";
// EN: Importing external package '@tailwindcss/vite' from node_modules.
// FA: ایمپورت پکیج خارجی '@tailwindcss/vite' از node_modules.
// npm install @tailwindcss/vite   ← اگر نصب نبود
import tailwindcss from "@tailwindcss/vite";
// EN: Importing external package 'vite' from node_modules.
// FA: ایمپورت پکیج خارجی 'vite' از node_modules.
// npm install vite   ← اگر نصب نبود
import { defineConfig } from "vite";
// EN: Importing external package 'vite-tsconfig-paths' from node_modules.
// FA: ایمپورت پکیج خارجی 'vite-tsconfig-paths' از node_modules.
// npm install vite-tsconfig-paths   ← اگر نصب نبود
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
