/*
 EN: File: ../../../../home/sandbox/
     This file is auto-annotated with bilingual (EN/FA) educational comments to help beginners.
 FA: فایل: ../../../../home/sandbox/
     این فایل با کامنت‌های آموزشی دو‌زبانه (انگلیسی/فارسی) برای آموزش بهتر افراد مبتدی حاشیه‌نویسی شده است.
*/
// EN: Importing package package/module
// FA: ایمپورت کردن ماژول/پکیج package
// npm install package  ← اگر نصب نبود
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

// EN: Importing local module './+types/root' (a file from your project).
// FA: ایمپورت ماژول محلی './+types/root' (یکی از فایل‌های خود پروژه).
import type { Route } from "./+types/root";
// EN: Importing ./app.css package/module
// FA: ایمپورت کردن ماژول/پکیج ./app.css
// npm install ./app.css  ← اگر نصب نبود
import "./app.css";
// EN: Importing local module './lib/puter' (a file from your project).
// FA: ایمپورت ماژول محلی './lib/puter' (یکی از فایل‌های خود پروژه).
import { usePuterStore } from "./lib/puter";
// EN: Importing external package 'react' from node_modules.
// FA: ایمپورت پکیج خارجی 'react' از node_modules.
// npm install react   ← اگر نصب نبود
import { useEffect } from "react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

/* EN: Function `Layout` definition — describes a reusable unit of logic.
   FA: تعریف تابع `Layout` — یک واحد منطقی قابل‌استفاده‌ی مجدد. */
export function Layout({ children }: { children: React.ReactNode }) {
  const { init } = usePuterStore();

  /* EN: Side-effect hook — runs after render (e.g., fetch, subscriptions).
   FA: هوک side-effect — بعد از رندر اجرا می‌شود (مثلاً fetch، اشتراک‌ها). */
useEffect(() => {
    init()
  }, [init])
  

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <script src="https://js.puter.com/v2/"></script>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

/* EN: Function `ErrorBoundary` definition — describes a reusable unit of logic.
   FA: تعریف تابع `ErrorBoundary` — یک واحد منطقی قابل‌استفاده‌ی مجدد. */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
