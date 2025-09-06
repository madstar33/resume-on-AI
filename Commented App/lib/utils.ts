/*
 EN: File: ../../../../home/sandbox/
     This file is auto-annotated with bilingual (EN/FA) educational comments to help beginners.
 FA: فایل: ../../../../home/sandbox/
     این فایل با کامنت‌های آموزشی دو‌زبانه (انگلیسی/فارسی) برای آموزش بهتر افراد مبتدی حاشیه‌نویسی شده است.
*/
// EN: Importing external package 'clsx' from node_modules.
// FA: ایمپورت پکیج خارجی 'clsx' از node_modules.
// npm install clsx   ← اگر نصب نبود
import {type ClassValue, clsx} from "clsx";
// EN: Importing external package 'tailwind-merge' from node_modules.
// FA: ایمپورت پکیج خارجی 'tailwind-merge' از node_modules.
// npm install tailwind-merge   ← اگر نصب نبود
import {twMerge} from "tailwind-merge";

/* EN: Function `cn` definition — describes a reusable unit of logic.
   FA: تعریف تابع `cn` — یک واحد منطقی قابل‌استفاده‌ی مجدد. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* EN: Function `formatSize` definition — describes a reusable unit of logic.
   FA: تعریف تابع `formatSize` — یک واحد منطقی قابل‌استفاده‌ی مجدد. */
export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  // Determine the appropriate unit by calculating the log
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Format with 2 decimal places and round
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export const generateUUID = () => crypto.randomUUID();
