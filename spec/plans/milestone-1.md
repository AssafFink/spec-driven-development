# Plan – Milestone 1: אתר עובד ובחירת פרומפט בעברית

## 1. מטרה והיקף

להעמיד את הדף היחיד, בעברית ו-RTL, כך שאפשר לבחור אחד משבעת הפרומפטים ולקרוא אותו כ-Markdown מעוצב.

**בפנים:** הקמת הפרויקט, שלד הדף, שבעת הלחצנים, טעינת קובצי ה-Markdown בעברית והצגתם, הדגשת הנבחר, חזרה לראש הדף בהחלפת פרומפט, עיצוב לפי DESIGN.

**בחוץ (אבני דרך מאוחרות):**
- העתקה ל-Clipboard, הודעות הצלחה/כישלון ושדה המקור `textarea` – Milestone 2.
- החלפת שפה, אנגלית ושמירה ב-`localStorage` – Milestone 3.
- מסך שגיאה מלא, מניעת Race Conditions ובדיקות נגישות – Milestone 4.
- `base` של GitHub Pages ו-Workflow – Milestone 5.

## 2. תנאי מקדים – קובצי המקור (באחריות המשתמש)

בפרויקט **אין כרגע אף אחד מ-14 קובצי הפרומפטים**. ל-Milestone הזה נדרשים שבעת הקבצים **בעברית**. אין לייצר או לשכתב את תוכנם.

המשתמש שם אותם בתיקייה `public/prompts/he/` בשמות הבאים (התיקייה תיווצר בבנייה):

| לחצן (תווית) | קובץ המקור |
|---|---|
| `PRD.md` | `public/prompts/he/prd.md` |
| `ARCHITECTURE.md` | `public/prompts/he/architecture.md` |
| `wireframes.png` | `public/prompts/he/wireframes.md` |
| `style-guide.png` | `public/prompts/he/style-guide.md` |
| `mockups.png` | `public/prompts/he/mockups.md` |
| `DESIGN.md` | `public/prompts/he/design.md` |
| `MILESTONES.md` | `public/prompts/he/milestones.md` |

אם הקבצים יגיעו בשמות אחרים – משנים את שמם לפי הטבלה (בלי לגעת בתוכן). לחצן שהקובץ שלו חסר יציג הודעת שגיאה פשוטה, והבדיקה שלו תושלם כשהקובץ יתקבל.

## 3. החלטות מימוש

1. **הקמה ידנית ולא דרך `npm create vite`** – התיקייה אינה ריקה, וכלי ההקמה עלול לדרוס את `.gitignore`. יוצרים את קובצי התצורה ידנית. את `.gitignore` הקיים לא מחליפים; רק מוודאים שיש בו `node_modules` ו-`dist` ומוסיפים אם חסר.
2. **גופנים (Heebo, Inter) נארזים עם האתר** באמצעות `@fontsource/heebo` ו-`@fontsource/inter` (משקלים 400/500/600/700), ולא נטענים מ-Google Fonts – כדי לעמוד בקביעת ה-ARCHITECTURE שכל קריאות הרשת הן לאותו Origin.
3. **טעינה מוקדמת של שבעת הקבצים לזיכרון בפתיחת הדף**, עם סטטוס לכל קובץ (`loading` / `ready` / `error`). זו הגישה המועדפת ב-ARCHITECTURE, והיא נדרשת ממילא ב-Milestone 2 כדי שההעתקה תתחיל ישירות מהלחיצה – כך לא נצטרך לכתוב מחדש את הטעינה.
4. **זיהוי קובץ חסר:** שרת הפיתוח של Vite מחזיר את `index.html` עם סטטוס 200 עבור נתיב שלא קיים. לכן הטעינה נחשבת כישלון אם `response.ok` שקרי **או** אם ה-`Content-Type` הוא `text/html`. בלי זה קובץ חסר היה מוצג כקוד HTML.
5. **נתיבי הקבצים** נבנים מ-`import.meta.env.BASE_URL` + `prompts/he/<file>.md`. `base` נשאר ברירת מחדל (`/`) עד Milestone 5.
6. **לחצני השפה:** שניהם מוצגים, „עברית” מסומן כפעיל, „English” מוצג אך מושבת (`disabled`) עד Milestone 3. מבנה הנתונים (`Language`, מילון טקסטים, נתיבים לפי שפה) נבנה כבר עכשיו עם `he` בלבד, כך שהוספת `en` תהיה תוספת ולא שכתוב.
7. **צבע ההדגשה: Technical Green**, לא הכחול שב-Mockups – כפי שנקבע ב-DESIGN סעיף 2.1.
8. **רקע שרטוט אדריכלי:** אין קובץ תמונה כזה בפרויקט, ו-DESIGN מגדיר אותו כרשות. מממשים רשת קווים עדינה ב-CSS בלבד על רקע הדף (לא מאחורי הטקסט), בלי להוסיף תמונות.
9. **אייקונים:** SVG קווי קטן בתוך הקוד (קו 1.5px) ליד כל תווית – אייקון מסמך ללחצני `.md` ואייקון תמונה ללחצני `.png`, כמו ב-Mockups. בלי ספריית אייקונים.
10. **חזרה לתחילת הפרומפט:** בכל בחירה `window.scrollTo(0, 0)`. הכותרת נמוכה, ולכן ראש הדף מציג את תחילת הפרומפט; כך הכותרת והלחצנים לא נעלמים.
11. **בלי ספריית State, בלי Router, בלי UI Framework** – `useState` / `useEffect` ו-CSS רגיל בלבד.

## 4. קבצים ליצירה

```
package.json              scripts: dev, build (tsc -b && vite build), preview
vite.config.ts            React plugin only
tsconfig.json
tsconfig.app.json
tsconfig.node.json
index.html                <html lang="he" dir="rtl">, title, #root
public/prompts/he/        7 source .md files (supplied by the user)
src/main.tsx              mounts <App />, imports fonts + styles
src/App.tsx               page layout + state
src/catalog.ts            Language, PromptId, ordered catalog, path mapping
src/i18n.ts               UI strings dictionary (he only for now)
src/promptLoader.ts       fetch + validation of one prompt file
src/components/LanguageToggle.tsx
src/components/PromptList.tsx
src/components/PromptViewer.tsx
src/components/icons.tsx  FileIcon, ImageIcon (inline SVG)
src/styles.css            design tokens, layout, markdown styles
src/vite-env.d.ts
```

**תלויות:** `react`, `react-dom`, `react-markdown`, `remark-gfm`, `@fontsource/heebo`, `@fontsource/inter`.
**תלויות פיתוח:** `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`.

קבצים קיימים שמשתנים: `.gitignore` (רק תוספת שורות אם חסר), `CLAUDE.md` (מילוי „פקודות הרצה”), `spec/MILESTONES.md` (סימון ✅ בסיום הבנייה).

## 5. מבנה הקוד

### `catalog.ts`
- `type Language = 'he'` (יורחב ל-`'he' | 'en'` ב-Milestone 3).
- `PROMPTS`: מערך קבוע של שבעה פריטים בסדר שב-PRD, כל אחד `{ id, label, kind: 'doc' | 'image', file }`. `id` ו-`label` הם התווית המדויקת (`PRD.md` … `MILESTONES.md`); `file` הוא שם הקובץ מהטבלה בסעיף 2; `kind` קובע רק איזה אייקון מוצג.
- `promptUrl(language, prompt)` – מחזיר `${import.meta.env.BASE_URL}prompts/${language}/${file}`.

### `i18n.ts`
מילון `he` עם: כותרת הדף **„פרומפטים עבור פיתוח מונחה מפרט”**, ההנחיה **„בחר פרומפט מהרשימה כדי להציג ולהעתיק אותו.”**, טקסט טעינה („טוען…”) והודעת שגיאה („לא ניתן לטעון את קובץ הפרומפט.”).

### `promptLoader.ts`
`loadPrompt(url): Promise<string>` – `fetch`, בדיקת `response.ok` ו-`Content-Type` (החלטה 4), החזרת `response.text()` **ללא שום שינוי בטקסט**. זורק שגיאה בכישלון.

### `App.tsx` – מצב
- `selectedId: PromptId | null` – התחלתי `null`.
- `sources: Record<PromptId, { status: 'loading' | 'ready' | 'error'; text?: string }>` – מתמלא ב-`useEffect` אחד בפתיחת הדף, שטוען את שבעת הקבצים במקביל ומעדכן כל אחד בנפרד.
- בחירת לחצן: מעדכן `selectedId` וגולל לראש הדף. התוכן המוצג נגזר תמיד מ-`sources[selectedId]`, ולכן תוכן של פרומפט קודם לא יכול להופיע תחת הפרומפט החדש.

### רכיבים
- **`LanguageToggle`** – שני `<button>`: `🇮🇱 עברית` (פעיל, `aria-pressed="true"`) ו-`🇺🇸 English` (`disabled`). סדר ב-DOM: עברית ואז English.
- **`PromptList`** – `<nav>` עם שבעה `<button>` אנכיים; הנבחר מקבל class מודגש ו-`aria-current="true"`. התוויות עטופות ב-`dir="ltr"` כדי ששמות הקבצים יוצגו נכון בתוך RTL.
- **`PromptViewer`** – מציג לפי המצב: הנחיה (אין בחירה) / „טוען…” / הודעת שגיאה / `<ReactMarkdown remarkPlugins={[remarkGfm]}>`. בלי `rehype-raw` ובלי `dangerouslySetInnerHTML`.

## 6. פריסה ועיצוב (`styles.css`)

**Design Tokens** כמשתני CSS: שמונת הצבעים מ-DESIGN 2.1, רדיוס `8px`, צל `0 2px 8px #0000000D`, מרווחים `8/16/24/32px`.

**פריסה:**
- מעטפת ממורכזת, רוחב מרבי כ-`1200px`, ריפוד `32px`.
- כותרת עליונה: `flex`, הכותרת בצד ההתחלה (ימין בעברית) ולחצני השפה בצד הסוף, כמו ב-Wireframes.
- מתחתיה `flex` של שתי עמודות ברווח `24px`: טור הלחצנים ראשון ב-DOM ברוחב קבוע כ-`260px` (מופיע מימין ב-RTL), ואזור התוכן `flex: 1`.
- שימוש ב-CSS logical properties (`margin-inline`, `padding-inline`, `text-align: start`) כדי שהיפוך ל-LTR ב-Milestone 3 יקרה מעצמו.
- **אין** `position: sticky`, **אין** `overflow-y` ו**אין** גובה קבוע לאזור התוכן – הוא גדל עם התוכן והדף כולו נגלל. `min-height` לאזור התוכן כדי שמצב ההנחיה ייראה כמו ב-Wireframe, עם ההנחיה ממורכזת.

**רכיבים:**
- רקע הדף Paper White עם רשת קווים עדינה (החלטה 8).
- לחצן פרומפט: רקע בהיר, מסגרת `1px` Greige, רדיוס `8px`, רווח `8px` בין לחצנים, רוחב אחיד. Hover עדין. נבחר: רקע Pale Green, מסגרת Technical Green, משקל `600`. `:focus-visible` ברור.
- לחצן שפה פעיל: מילוי Pale Green ומסגרת Technical Green. מושבת: שקיפות מופחתת וסמן רגיל.
- אזור התוכן: רקע לבן-נייר, מסגרת Greige, רדיוס `8px`, הצל המוגדר, ריפוד `32px`.

**טיפוגרפיה:** `font-family: Heebo, Inter, sans-serif`; גוף `16px/400`; כותרת הדף `32px/700`; צבע טקסט Charcoal.

**Markdown בתוך אזור התוכן:**
- `h1` → `24px/700` עם קו מפריד תחתון דק; `h2` → `18px/600`; `h3` ומטה → `16px/600`. (כותרת הדף נשארת הגדולה ביותר, כמו ב-Mockups.)
- פסקאות ורשימות בגובה שורה נוח (כ-`1.7`) ומרווחים של `16px`; `24px` לפני כותרות.
- טבלאות: רוחב מלא, מסגרות Greige, כותרת טבלה על רקע Light Gray, ריפוד תאים `8px`.
- `code` ו-`pre`: גופן monospace, רקע Light Gray, `dir="ltr"`; ב-`pre` שבירת שורות (`white-space: pre-wrap`) כדי שלא תיווצר גלילה פנימית.
- ציטוטים (`blockquote`): פס צד ב-Technical Green.

## 7. סדר הבנייה

1. יצירת קובצי התצורה, `index.html` ו-`npm install`.
2. `catalog.ts`, `i18n.ts`, `promptLoader.ts`.
3. הרכיבים ו-`App.tsx`.
4. `styles.css`.
5. יצירת `public/prompts/he/` ובדיקה אילו קובצי מקור קיימים בה; דיווח על כל קובץ חסר.
6. `npm run build` ותיקון שגיאות; `npm run dev` ובדיקה בדפדפן.
7. מילוי „פקודות הרצה” ב-`CLAUDE.md` (dev: `npm run dev`; test: „אין”) וסימון ✅ ב-`MILESTONES.md`.

## 8. בדיקה מול ה-Definition of Done

| תנאי | איך נבדק |
|---|---|
| `npm run dev` עולה ו-`npm run build` עובר | הרצת שתי הפקודות; ה-Build כולל בדיקת TypeScript |
| הדף בעברית, RTL, כותרת, הנחיה ושבע תוויות בסדר | פתיחה בדפדפן; בדיקת `lang`/`dir` והטקסטים מול ה-PRD |
| כל לחצן מציג את קובץ ה-Markdown התואם | לחיצה על כל שבעת הלחצנים והשוואת תחילת התוכן לקובץ המקור; בדיקת כותרות, רשימות וטבלה |
| החלפת תוכן, לחצן מודגש אחד, חזרה לתחילת התוכן | בחירת פרומפט ארוך, גלילה למטה, בחירת פרומפט אחר; ספירת לחצנים מודגשים ובדיקת `scrollY === 0` |
| אין גלילה פנימית ואין Sticky | בדיקת הסגנונות המחושבים של אזור התוכן והטור, וגלילת דף עם פרומפט ארוך |
| התאמה למקורות, בלי תוספות | השוואה חזותית ל-Wireframes ול-Style Guide |
| קובץ חסר לא מציג תוכן מומצא או ישן | שינוי שם זמני של קובץ אחד בבדיקה מקומית ← הודעת שגיאה, שאר הלחצנים פועלים |

בדיקות התלויות בתוכן יושלמו רק עבור קבצים שסופקו; קובץ חסר ידווח במפורש ולא יוצג כעובר.
