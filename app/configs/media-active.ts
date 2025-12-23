/**
 * Active Media Configuration
 * 
 * ⚠️ קובץ זה קובע איזו גרסת מדיה פעילה כרגע באתר! ⚠️
 * 
 * כל הקומפוננטות באתר משתמשות ב-landingMedia שמגיע מהקובץ הזה.
 * כדי להחליף לגרסה אחרת, פשוט שנה את השורה של ה-import.
 * 
 * 🎯 הקובץ הנוכחי: v1-original.ts - זה הקובץ הקובע הראשי!
 * כל שינוי ב-v1-original.ts ישנה את כל האתר אוטומטית!
 * 
 * דוגמה: import { media } from './media/v2-new-photos';
 */

import { media } from './media/v1-original';

/**
 * המדיה הפעילה - מייצא את כל התמונות, הסרטונים והאייקונים
 */
export const landingMedia = media;

/**
 * טייפ של המבנה - לשימוש ב-TypeScript
 */
export type LandingMedia = typeof media;

