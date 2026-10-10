# ARCHITECTURE — Spec-Driven Development Prompter

> מסמך ארכיטקטורה טכנית המבוסס על PRD(4).md. תאריך בדיקת מקורות: 10 באוקטובר 2026.

## 1. תקציר ארכיטקטוני

המוצר הוא **Single-Page Static Web Application** לשימוש ב-Desktop, ב-Chrome וב-Edge. הוא מאפשר לבחור אחד משבעה פרומפטים, להציג את קובץ ה-Markdown בעברית או באנגלית כ-Rendered Markdown, ולהעתיק את המקור המלא או מקטע ממנו. **אין Backend, Database, Authentication או שירותי Cloud נוספים**. היישום נבנה לקבצים סטטיים ונפרס אוטומטית מ-GitHub אל GitHub Pages.

עקרון יסוד: **14 קובצי ה-Markdown הקיימים הם מקור האמת היחיד לתוכן הפרומפטים**. האתר אינו משנה אותם, אינו מייצר תוכן חלופי ואינו שומר אותם במסד נתונים.

## 2. Technology Stack

| רכיב | בחירה | תפקיד |
|---|---|---|
| UI | React | ממשק ו-Components לעמוד היחיד |
| שפת פיתוח | TypeScript | טיפוסים ל-IDs, מצבי ממשק, שפות ותוצאות טעינה |
| Build / Dev Server | Vite | פיתוח מקומי והפקת קבצים סטטיים לתיקיית `dist` |
| עיצוב | CSS רגיל | פריסת שתי עמודות, טיפוגרפיה, RTL/LTR ומצבי כפתורים; ללא UI Framework נוסף |
| Markdown | `react-markdown` + `remark-gfm` | רינדור בטוח יחסית של CommonMark וטבלאות/רשימות בסגנון GFM |
| תוכן | 14 קובצי `.md` סטטיים | שבעה פרומפטים בכל שפה; טעינה דרך `fetch` בעת בחירה |
| העתקה אוטומטית | Browser Clipboard API (`navigator.clipboard.writeText`) | העתקת טקסט המקור המלא בעקבות לחיצה |
| העתקה ידנית | `textarea` מסוג read-only לבחירת המקור | סימון והעתקת מקור Markdown מלא או חלקי עם סימני העיצוב המקוריים |
| העדפת שפה | `localStorage` | שמירת `he` או `en` בין ביקורים |
| Version Control | Git + GitHub | אחסון קוד ו-14 קובצי המקור |
| CI / Deployment | GitHub Actions + GitHub Pages | Build ופריסה אוטומטיים ב-Push ל-`main` |
| Package Manager | npm + `package-lock.json` | התקנות עקביות באמצעות `npm ci` |

### נימוקים מרכזיים

- **React + TypeScript + Vite**: פתרון Mainstream בעל תיעוד רב, חלוקה פשוטה ל-Components ופלט סטטי המתאים ל-GitHub Pages. חלופות שנבחנו: Vanilla TypeScript (מעט קל יותר, אך פחות נוח לניהול מצבי UI) ו-Vue (מתאים אך לא מעניק יתרון מהותי במקרה הזה). אין צורך ב-Next.js או Server-Side Rendering.
- **`react-markdown` + `remark-gfm`**: ממירים Markdown ל-React elements בלי להזריק HTML ישירות לדף; עדיפים כאן על שימוש ישיר ב-`marked`/`markdown-it` עם `innerHTML`. `remark-gfm` נדרש לטבלאות וסימון GFM. אין צורך ב-MDX.
- **CSS רגיל**: המסך היחיד והיקף הרכיבים המצומצם אינם מצדיקים Tailwind, Material UI או ספריית עיצוב מורכבת.
- **GitHub Pages**: Hosting סטטי עם HTTPS ו-GitHub Actions מתאים למוצר, ללא צורך ב-Vercel, Supabase או שרת משלו. חלופות סבירות הן Vercel Static ו-Netlify; אינן מספקות יתרון הכרחי למקרה זה.
- **`localStorage`**: שומר רק העדפת שפה; לא נדרש חשבון משתמש או סנכרון בין מכשירים.

### מגבלות והסתייגויות

1. פעולת Clipboard עשויה להיחסם על ידי מדיניות דפדפן, הרשאות או הגדרות משתמש. לא מציגים הצלחה עד שה-`Promise` של `writeText` הסתיים בהצלחה.
2. **העתקה מתוך HTML מרונדר אינה שומרת אוטומטית Markdown**, ובפרט העתקת חלק ממשפט/טבלה/קישור אינה משחזרת באופן אמין סימני Markdown. לכן לצורך העתקה ידנית מדויקת מציגים *בתוך אותו אזור תצוגת פרומפט* גם שדה מקור `textarea` לקריאה בלבד, לצד התצוגה המרונדרת. המשתמש מסמן ומעתיק מתוך שדה המקור; אין לטעון שסימון באזור המרונדר מייצר Markdown מקורי. זהו פתרון UX ישיר ל-FR-06, לא פיצ'ר מוצר חדש. אם נדרש דווקא שסימון של ה-HTML המרונדר לבדו יניב Markdown, נדרשת דרישת מוצר שונה ופתרון מורכב בהרבה שאינו מובטח בכל מקרה קצה.
3. GitHub Pages נועד לאחסון סטטי וכפוף למכסות ולמדיניות השירות; אין להניח שהוא Backend או אחסון פרטי. כל 14 קובצי התוכן פומביים למבקרי האתר.
4. ה-PRD אינו כולל את תוכן 14 הקבצים עצמם. יש להשתמש בקבצים הקיימים שיסופקו לפרויקט; אין ליצור להם נוסחים חדשים. אם קובץ חסר, מטפלים בכך כשגיאת טעינה ולא ממציאים תוכן.

## 3. ארכיטקטורת המערכת

```text
GitHub Repository
 ├─ React + TypeScript + CSS + Vite
 ├─ 14 existing Markdown files (public assets)
 └─ GitHub Actions workflow
             │ push to main
             ▼
     npm ci → npm run build → dist/
             │
             ▼
       GitHub Pages (HTTPS)
             │
             ▼
    Desktop Chrome / Edge
       ├─ UI State (language, selection, load/copy status)
       ├─ fetch Markdown assets
       ├─ react-markdown + remark-gfm
       ├─ raw Markdown read-only textarea
       ├─ Clipboard API
       └─ localStorage (language only)
```

כל פעולות המשתמש מתבצעות בדפדפן. קריאות הרשת היחידות הדרושות הן טעינת האתר ונכסי ה-Markdown הסטטיים מאותו Origin. אין REST API עסקי, WebSocket, צד שרת או שירות AI.

### חלוקה ל-Modules לוגיים

| Module | אחריות |
|---|---|
| `App / Page Layout` | עמוד יחיד, כותרת, בחירת שפה, שתי עמודות וסטטוס |
| `Language State` | `he`/`en`, קביעת `dir`, טקסטי UI, קריאה/שמירה ב-`localStorage` |
| `Prompt Catalog` | רשימה קבועה ומסודרת של שבעה IDs, תוויות זהות בשתי השפות ומיפוי לקבצים |
| `Prompt Loader` | בניית כתובת נכונה עבור GitHub Pages, טעינת טקסט Markdown וטיפול בכישלון |
| `Prompt Viewer` | Rendered Markdown, תצוגת מקור selectable וגלילת עמוד |
| `Clipboard Controller` | ניסיון `writeText`, משוב אמיתי על הצלחה/כישלון והנחיית העתקה ידנית |

אין צורך ב-Global State Library: `useState`, `useEffect` ו-Props מספיקים. רשימות התוויות ומילון טקסטי UI הם קבועים מקומיים.

## 4. Data Model ואחסון

### מידע קבוע באפליקציה

- `Language = 'he' | 'en'`.
- `PromptId`: אחד משבעת IDs קבועים, בסדר: `PRD.md`, `ARCHITECTURE.md`, `wireframes.png`, `style-guide.png`, `mockups.png`, `DESIGN.md`, `MILESTONES.md`.
- כל פריט ב-Catalog מכיל `id`, `label` ונתיבי `.md` עבור `he` ו-`en`. תוויות `.png` אינן שמות קובצי תוכן ואינן מרמזות על טעינת תמונה.
- לכל אחד מ-14 קובצי המקור יש מיפוי חד-חד-ערכי לשילוב `(language, promptId)`; הסיומת בפועל היא `.md`.

### מצב בזמן ריצה

- `language`: השפה הפעילה.
- `selectedPromptId`: `PromptId | null`.
- `markdownSource`: מחרוזת המקור שנטענה בהצלחה, או `null`.
- `loadStatus`: `idle | loading | ready | error`.
- `copyStatus`: `idle | success | failure` (אפשר לקשור ל-selection הנוכחי למניעת הודעות מיושנות).

המשתמש אינו יוצר או עורך נתוני פרומפטים. `localStorage` מכיל **אך ורק** מפתח ייעודי כגון `sdd-prompts-language` עם ערך `he` או `en`. בהיעדר ערך, ערך לא תקין או חסימת Storage, ברירת המחדל היא `he` והאפליקציה ממשיכה לפעול. אין Cookies, Database או שמירת Clipboard.

## 5. תוכן Markdown וטעינתו

- קובצי התוכן מאורגנים בתיקייה סטטית, למשל `public/prompts/he/` ו-`public/prompts/en/`; שמותיהם הפנימיים יכולים להיות קבועים מפורשים ושונים מתוויות הלחצנים, אך כל מיפוי חייב להצביע לקובץ Markdown קיים.
- כיוון שמדובר בנכסי `public` של Vite, הם מועתקים ל-`dist` ללא עיבוד. יש לבנות URL באמצעות `import.meta.env.BASE_URL` + נתיב יחסי ל-`prompts/...`; אין להשתמש בכתובת מוחלטת שמתחילה ב-`/prompts` ומתעלמת מנתיב ה-Repository.
- בוחרים פרומפט → מבצעים `fetch` ל-URL הסטטי המתאים → בודקים `response.ok` → קוראים `response.text()` → שומרים **את הטקסט המקורי ללא טרנספורמציה** → מעבירים עותק לרינדור ב-`react-markdown` ולשדה המקור → מנסים להעתיק את הטקסט המקורי.
- את ניסוי ההעתקה יש להתחיל בהקשר פעולת הלחיצה, ככל שמגבלות הדפדפן מאפשרות. מאחר ש-`fetch` אסינכרוני עלול לאבד User Activation, ניתן לטעון מראש את 14 הקבצים לזיכרון בזמן פתיחת הדף, עם סטטוס תקין/שגיאה לכל קובץ, כך שלחיצה על כפתור תוכל לקרוא ל-`writeText` **ישירות מתוך ה-Click Handler** ללא `await` מקדים. בכל מקרה יש לשמר טיפול בשגיאות טעינה, לרבות קובץ חסר; טעינה מוקדמת היא החלטת מימוש מועדפת עקב מספרם הקטן והקבוע של הקבצים.
- אם טעינה מוקדמת של קובץ טרם הושלמה בזמן הלחיצה, ניתן להשלים את ההצגה לאחר הגעת הנתונים ולנסות העתקה; **אין להבטיח הצלחת Clipboard** בעקבות פעולה אסינכרונית זו. מוצג משוב מדויק בהתאם לתוצאה, כולל חלופת העתקה ידנית.
- מניעת Race Conditions: מזהה בקשה או `AbortController` מבטיח שתשובה מאוחרת של בחירה קודמת או של שפה קודמת לא תדרוס את המצב העדכני.
- תצוגת Markdown משתמשת ב-`react-markdown` עם `remark-gfm`; אין לאפשר HTML גולמי (`rehype-raw`) ואין לשנות URL sanitization ברירת מחדל ללא צורך.

## 6. התנהגות UI ו-Data Flow

### פתיחת האתר

1. קוראים שפה שמורה ב-`localStorage` ומאמתים `he` או `en`; אם אין ערך תקין, משתמשים ב-`he`.
2. מעדכנים `lang` ו-`dir` ב-root המתאים; `RTL` לעברית ו-`LTR` לאנגלית.
3. מציגים את כותרת האתר, לחצני השפה ושבעת לחצני הבחירה בשמות הקבועים.
4. אין פרומפט נבחר: מציגים בעברית `בחר פרומפט מהרשימה כדי להציג ולהעתיק אותו.` או באנגלית `Select a prompt from the list to view and copy it.`

### בחירת פרומפט

1. המשתמש לוחץ על תווית אחת משבע התוויות; בחירה חוזרת באותה תווית היא ניסיון העתקה נוסף.
2. מעדכנים בחירה והדגשה, מנקים תוכן ומצב העתקה מיושנים ומחזירים את **גלילת הדף** לתחילת הפרומפט החדש לאחר שהאזור מתעדכן.
3. מציגים את המקור בתצוגה מרונדרת ובשדה מקור read-only באותו אזור תצוגה, ללא Scroller פנימי. יש להימנע מגלילה פנימית גם בשדה המקור, למשל באמצעות הרחבת גובהו לתוכן; גלילת העמוד היא הגלילה היחידה בתוכן ארוך.
4. מבצעים ניסיון העתקה של `markdownSource` באמצעות `navigator.clipboard.writeText`; רק לאחר השלמה/כישלון מציגים את ההודעה המתאימה בשפת הממשק.
5. אם Clipboard נכשל, שדה המקור מאפשר Select + `Ctrl+C`. בחירת טווח כלשהו בשדה המקור מעתיקה את התווים המדויקים בטווח, ולכן נשמרים כל סימני Markdown **המצויים בטווח שנבחר**. כיוון שבחירה חלקית יכולה לחצות תחביר Markdown, אין לייצר או להשלים סימנים שמחוץ לבחירה.
6. קובץ חסר או כשל בטעינה: מציגים הודעת שגיאה בשפה הפעילה; אין תוכן ישן ואין דיווח על הצלחת העתקה. יתר הכפתורים נשארים פעילים.

### מעבר שפה

1. לחיצה על `🇮🇱 עברית` או `🇺🇸 English` משנה `language`, `dir`, `lang`, יישור, סדר העמודות וטקסטי הממשק.
2. שומרים את הבחירה ב-`localStorage` כאשר הדבר אפשרי.
3. מנקים `selectedPromptId`, `markdownSource`, כל הודעת Clipboard והדגשה; מציגים את ההנחיה בשפה החדשה.
4. **אין העתקה אוטומטית בעקבות מעבר שפה בלבד**. שבע תוויות הפרומפטים נשארות ללא שינוי.

### Layout

- Desktop בלבד, שתי עמודות: בעברית פס כפתורים מימין ותצוגת הפרומפט משמאל; באנגלית פס הכפתורים משמאל והתצוגה מימין.
- תצוגה בעלת גבול ברור; אורך הטקסט מגדיל את גובה הדף. אין Sticky Sidebar, אין פנל עם `overflow-y: auto` לצפייה בפרומפט.
- יש להקפיד על כיווניות מקומית של טקסטים מעורבים (עברית, אנגלית, שמות קבצים וקוד) ועל נגישות בסיסית של Buttons, Focus, כותרות ומשוב סטטוס (`aria-live`).
- אין צורך ב-Routing או בדפים נוספים.

## 7. אבטחה ופרטיות

- גישה ציבורית ואנונימית; אין AuthN/AuthZ או נתונים אישיים.
- מקור התוכן הוא קובצי Markdown בבקרת גרסאות. רינדור ללא הזרקת HTML גולמי; יש להשאיר התנהגות בטוחה של קישורים ולא לבצע `dangerouslySetInnerHTML`.
- הכל פועל ב-HTTPS של GitHub Pages, תנאי בסיס לפעולת Async Clipboard API.
- אין טוקנים, API keys או Secrets בצד הלקוח. אם בעתיד יתווספו סודות, אין להכניס אותם ל-Vite env שנשלח לדפדפן.
- שמירת שפה אינה נחשבת מידע אישי, ואין לעקוב אחר תוכן Clipboard או להעביר אותו לשירות כלשהו.

## 8. GitHub, Build ו-Deployment

### Source Control

- Repository יחיד ב-GitHub הכולל את קוד המקור, הגדרות Vite, `package.json`, `package-lock.json`, כל 14 קובצי ה-Markdown ו-Workflow הפריסה.
- `main` הוא ענף Production; שינויים שנדחפים אליו מפעילים Build ו-Deployment ללא העלאה ידנית של קבצים.

### Build ו-GitHub Pages

1. ב-GitHub Repository בוחרים `Settings → Pages → Build and deployment → Source: GitHub Actions`.
2. Workflow ב-`.github/workflows/deploy.yml` מופעל ב-`push` ל-`main` (ו-`workflow_dispatch` לפי הצורך).
3. ה-Job מבצע Checkout, התקנת Node.js LTS, `npm ci`, בדיקת TypeScript דרך פקודת ה-Build, `npm run build`, העלאת `dist` כ-Pages Artifact ו-Deployment ב-GitHub Actions הרשמיים.
4. ל-Workflow מוגדרות הרשאות מינימליות הנדרשות: `contents: read`, `pages: write`, `id-token: write`; מומלצת קבוצת `concurrency` כדי למנוע פריסות מתנגשות.
5. ב-Vite מגדירים `base: '/<REPOSITORY_NAME>/'` ל-Project Pages בכתובת `https://<USER>.github.io/<REPOSITORY_NAME>/`; ל-User Pages או Domain מותאם בשורש האתר מגדירים `base: '/'`.
6. תוצרים סטטיים והפרומפטים מועלים ל-GitHub Pages. בדיקת פריסה חייבת לוודא טעינת 14 הקבצים בנתיב ה-Base Path הנכון, כולל רענון העמוד.
7. אין שרת Node.js ב-Production: Node.js נדרש רק ל-Development ול-Build בתוך CI.

### Configuration וסביבות

- אין צורך במשתני סביבה או Secrets לפעולת האפליקציה.
- הגדרות בסיס הן `base` של Vite ומיפוי קובצי המקור.
- `npm run dev` לפיתוח; `npm run build` לבנייה; `npm run preview` לבדיקת התוצר הסטטי לפני פריסה.

## 9. החלטות התאמה קריטיות ל-PRD

| דרישה | החלטה טכנית |
|---|---|
| עמוד Desktop יחיד | React SPA ללא Router |
| 7 פרומפטים × 2 שפות | 14 `.md` סטטיים, Catalog קבוע ומיפוי מדויק |
| כותרת וכיווניות לפי שפה | מילון UI, `lang`/`dir`, CSS logical properties |
| ברירת מחדל עברית ושמירה | `localStorage` עם fallback ל-`he` |
| Markdown מעוצב כולל טבלאות | `react-markdown` + `remark-gfm` |
| העתקה אוטומטית של המקור | `writeText` עם משוב על תוצאת ה-Promise |
| העתקה ידנית מלאה או חלקית של מקור מדויק | בחירת טקסט ב-`textarea` read-only באותו אזור תצוגה |
| שגיאה בקובץ יחיד | מצב טעינה נפרד, ללא תוכן ישן; שאר הכפתורים פעילים |
| החלפת שפה מנקה בחירה | איפוס Selection, Viewer ו-Copy Status ללא העתקה |
| כל הדף נגלל | ללא Sticky וללא גלילה פנימית של תצוגה או מקור |
| Deployment אוטומטי | GitHub Actions → GitHub Pages |

## 10. מקורות רשמיים

- React: https://react.dev/learn/describing-the-ui
- Vite — Deploying a Static Site (GitHub Pages, Actions ו-`base`): https://vite.dev/guide/static-deploy.html
- Vite — Static Asset Handling (`public`): https://vite.dev/guide/assets.html
- Vite — Building for Production (`BASE_URL`): https://vite.dev/guide/build
- react-markdown — README ושיקולי אבטחה: https://github.com/remarkjs/react-markdown
- remark-gfm: https://github.com/remarkjs/remark-gfm
- MDN — Clipboard `writeText`: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
- MDN — Clipboard API and Events: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
- MDN — `copy` event: https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event
- MDN — Web Storage API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
- GitHub — Pages Limits: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
