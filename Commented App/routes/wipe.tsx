/*
 EN: File: ../../../../home/sandbox/
     This file is auto-annotated with bilingual (EN/FA) educational comments to help beginners.
 FA: فایل: ../../../../home/sandbox/
     این فایل با کامنت‌های آموزشی دو‌زبانه (انگلیسی/فارسی) برای آموزش بهتر افراد مبتدی حاشیه‌نویسی شده است.
*/
// EN: Importing external package 'react' from node_modules.
// FA: ایمپورت پکیج خارجی 'react' از node_modules.
// npm install react   ← اگر نصب نبود
import { useEffect, useState } from "react";
// EN: Importing external package 'react-router' from node_modules.
// FA: ایمپورت پکیج خارجی 'react-router' از node_modules.
// npm install react-router   ← اگر نصب نبود
import { useNavigate } from "react-router";
// EN: Importing external package '~/lib/puter' from node_modules.
// FA: ایمپورت پکیج خارجی '~/lib/puter' از node_modules.
// npm install ~/lib/puter   ← اگر نصب نبود
import { usePuterStore } from "~/lib/puter";

/* EN: React functional component `WipeApp` using arrow function.
   FA: کامپوننت تابعی ری‌اکت `WipeApp` با تابع پیکانی تعریف شده است. */
const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    /* EN: Side-effect hook — runs after render (e.g., fetch, subscriptions).
   FA: هوک side-effect — بعد از رندر اجرا می‌شود (مثلاً fetch، اشتراک‌ها). */
useEffect(() => {
        loadFiles();
    }, []);

    /* EN: Side-effect hook — runs after render (e.g., fetch, subscriptions).
   FA: هوک side-effect — بعد از رندر اجرا می‌شود (مثلاً fetch، اشتراک‌ها). */
useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        files.forEach(async (file) => {
            await fs.delete(file.path);
        });
        await kv.flush();
        loadFiles();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error {error}</div>;
    }

    return (
        <div>
            Authenticated as: {auth.user?.username}
            <div>Existing files:</div>
            <div className="flex flex-col gap-4">
                {files.map((file) => (
                    <div key={file.id} className="flex flex-row gap-4">
                        <p>{file.name}</p>
                    </div>
                ))}
            </div>
            <div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={() => handleDelete()}
                >
                    Wipe App Data
                </button>
            </div>
        </div>
    );
};

export default WipeApp;