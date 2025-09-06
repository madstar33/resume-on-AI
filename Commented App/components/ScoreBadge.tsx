/*
 EN: File: ../../../../home/sandbox/
     This file is auto-annotated with bilingual (EN/FA) educational comments to help beginners.
 FA: فایل: ../../../../home/sandbox/
     این فایل با کامنت‌های آموزشی دو‌زبانه (انگلیسی/فارسی) برای آموزش بهتر افراد مبتدی حاشیه‌نویسی شده است.
*/
/* EN: Props interface `ScoreBadgeProps` — documents what props this component expects.
   FA: اینترفیس پراپس `ScoreBadgeProps` — مشخص می‌کند این کامپوننت چه پراپس‌هایی می‌پذیرد. */
interface ScoreBadgeProps {
	score: number;
  }
  
  const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
	let badgeColor = '';
	let badgeText = '';
  
	if (score > 70) {
	  badgeColor = 'bg-badge-green text-green-600';
	  badgeText = 'Strong';
	} else if (score > 49) {
	  badgeColor = 'bg-badge-yellow text-yellow-600';
	  badgeText = 'Good Start';
	} else {
	  badgeColor = 'bg-badge-red text-red-600';
	  badgeText = 'Needs Work';
	}
  
	return (
	  <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
		<p className="text-sm font-medium">{badgeText}</p>
	  </div>
	);
  };
  
  export default ScoreBadge;