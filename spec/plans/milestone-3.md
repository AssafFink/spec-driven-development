# Plan – Milestone 3: מעבר שפה ושמירת בחירה

## 1. מטרה והיקף

שני לחצני השפה פעילים: האתר עובד במלואו בעברית ובאנגלית, והשפה האחרונה שנבחרה נשמרת לביקור הבא.

**בפנים:** הפעלת `🇮🇱 עברית` / `🇺🇸 English`; כותרת, הנחיה והודעות בשפה הנבחרת; `lang` / `dir` והיפוך העמודות; טעינת שבעת הקבצים באנגלית; איפוס הבחירה בהחלפת שפה; שמירה ב-`localStorage`.

**בחוץ:** מסך שגיאת טעינה מלא (כותרת „Error” כמו ב-Wireframe) ובדיקות Race Conditions מקיפות – Milestone 4.

## 2. מצב קיים שעליו בונים

- שבעת הקבצים באנגלית **כבר נמצאים** ב-`public/prompts/en/`, באותם שמות כמו בעברית (`prd-prompt.md` … `milestones-prompt.md`). אין צורך בשינוי שמות.
- `catalog.ts`: `Language = 'he'` בלבד; `promptUrl(language, prompt)` כבר מקבל שפה.
- `i18n.ts`: מילון `STRINGS` עם `he` בלבד.
- `App.tsx`: `language` הוא קבוע; `sources` מחזיק את שבעת הקבצים בעברית.
- `LanguageToggle.tsx`: „English” מושבת.
- `styles.css`: הפריסה בנויה על `flex` ו-CSS logical properties, ולכן היפוך העמודות, היישור ומיקום ה-Toast יתהפכו מעצמם כשה-`dir` משתנה.

## 3. החלטות מימוש

1. **כל 14 הקבצים נטענים לזיכרון בפתיחת הדף** (ולא רק שבעה של השפה הפעילה). כך מיד אחרי החלפת שפה הטקסט כבר זמין, וההעתקה יכולה להתחיל ישירות מהלחיצה. זו הגישה המועדפת ב-ARCHITECTURE, והקבצים קטנים. כל תוצאה נשמרת תחת השפה שלה, ולכן קובץ של שפה אחת לא יכול להופיע תחת האחרת.
2. **לחיצה על השפה שכבר פעילה אינה עושה דבר** – היא אינה „החלפת שפה”, ולכן אינה מנקה את הפרומפט המוצג.
3. **החלפת שפה מבטלת ניסיון העתקה שעדיין רץ:** מקדמים את מונה הניסיונות, כך שתוצאה מאוחרת לא תקפיץ Toast אחרי ההחלפה. מעבר השפה עצמו אינו מעתיק דבר.
4. **`lang` ו-`dir` מוגדרים על `<html>`**, וכך כל הדף – כולל ה-Toast – מתהפך. גם כותרת הלשונית בדפדפן (`document.title`) מתעדכנת לשפה.
5. **השפה השמורה מוחלת לפני הציור הראשון** (ב-`main.tsx`, לפני `render`), כדי שמשתמש ששמר אנגלית לא יראה הבהוב של פריסה עברית בטעינה.
6. **`localStorage` עטוף ב-`try/catch`** בקריאה ובכתיבה. ערך חסר, ערך שאינו `he` / `en`, או Storage חסום ← עברית, והאתר ממשיך לעבוד. מפתח: `sdd-prompts-language`.
7. **גופן לפי שפה:** בעברית Heebo ראשון, באנגלית Inter ראשון – כפי שמוגדר ב-DESIGN 2.2. נעשה ב-CSS באמצעות `:lang(en)`.
8. **סדר לחצני השפה קבוע:** עברית ואז English, כמו בשני ה-Wireframes. הכיתוב והדגלים אינם משתנים; רק ההדגשה עוברת ללחצן הפעיל.
9. **שבע תוויות הפרומפטים אינן משתנות** – הן מגיעות מה-Catalog ולא ממילון הטקסטים.

## 4. קבצים

**חדש:**
- `src/language.ts` – `readStoredLanguage()`, `storeLanguage(language)`, `applyLanguage(language)`.

**משתנים:**
- `src/catalog.ts` – `Language = 'he' | 'en'`, וקבוע `LANGUAGES`.
- `src/i18n.ts` – מילון `en`.
- `src/main.tsx` – החלת השפה השמורה לפני `render`.
- `src/App.tsx` – `language` כ-State, טעינת 14 קבצים, `handleLanguageChange`.
- `src/components/LanguageToggle.tsx` – שני הלחצנים פעילים.
- `src/styles.css` – גופן לפי שפה; הסרת עיצוב הלחצן המושבת.
- `spec/MILESTONES.md` – סימון ✅ בסיום.

`index.html` נשאר `lang="he" dir="rtl"` כברירת מחדל; הקוד מעדכן אותו בטעינה.

## 5. מבנה הקוד

### `language.ts`
```
STORAGE_KEY = 'sdd-prompts-language'

readStoredLanguage(): Language
  try { value = localStorage.getItem(STORAGE_KEY) } catch { return 'he' }
  return value === 'en' ? 'en' : 'he'

storeLanguage(language): void
  try { localStorage.setItem(STORAGE_KEY, language) } catch { /* storage blocked */ }

applyLanguage(language): void
  document.documentElement.lang = language
  document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr'
  document.title = STRINGS[language].title
```

### `i18n.ts` – מילון `en`
| מפתח | טקסט |
|---|---|
| `title` | Spec-Driven Development Prompts |
| `hint` | Select a prompt from the list to view and copy it. |
| `loading` | Loading… |
| `loadError` | Prompt file could not be loaded. |
| `copySuccess` | Prompt copied to Clipboard successfully |
| `copyFailure` | Automatic copy failed. Select the text in the source box at the bottom of the panel and copy it manually (Ctrl+C). |
| `sourceLabel` | Markdown source for manual copy |
| `promptListLabel` | Prompt list |
| `languageLabel` | Language |

הכותרת וההנחיה – הנוסח המדויק מה-PRD. הודעת ההצלחה – הנוסח שב-Mockups. הודעת השגיאה – הנוסח שב-Wireframe.

### `App.tsx`
- `const [language, setLanguage] = useState<Language>(readStoredLanguage)`.
- `sources: Record<Language, Partial<Record<PromptId, PromptSource>>>` – התחלתי `{ he: {}, en: {} }`. ה-`useEffect` של הטעינה המוקדמת רץ פעם אחת, עובר על שתי השפות ושבעת הפרומפטים, ושומר כל תוצאה תחת `sources[language][id]`.
- בכל מקום שהקוד קורא היום `sources[id]` – יקרא `sources[language][id]` (בחירה, העתקה ממתינה, התוכן המוצג).
- חדש:
```
handleLanguageChange(next):
  if next === language -> return
  attemptRef.current++            // drop any in-flight copy result
  pendingCopyRef.current = null
  setLanguage(next); setSelectedId(null); setCopyStatus('idle')
  storeLanguage(next)
  window.scrollTo(0, 0)

useEffect on [language]: applyLanguage(language)
```
- `strings = STRINGS[language]` – כבר קיים, ועכשיו משתנה עם השפה.

### `main.tsx`
לפני `createRoot(...).render(...)`: `applyLanguage(readStoredLanguage())`.

### `LanguageToggle.tsx`
Props: `label`, `language`, `onChange`. שני `<button>` בסדר קבוע; ללחצן הפעיל `is-active` ו-`aria-pressed="true"`; בלי `disabled`.

## 6. עיצוב (`styles.css`)

- `:lang(en) body { font-family: Inter, Heebo, system-ui, sans-serif; }` – ברירת המחדל (Heebo ראשון) נשארת לעברית.
- הסרת הכלל `.language-button:disabled`; הוספת Hover עדין ללחצן שפה שאינו פעיל, כמו בלחצני הפרומפטים.
- אין שינוי בפריסה: טור הלחצנים ראשון ב-DOM, ולכן הוא מימין ב-RTL ומשמאל ב-LTR; `text-align: start`, `padding-inline` ו-`inset-inline` מטפלים ביישור, בריווח ובמיקום ה-Toast.
- בדיקה חזותית של Markdown באנגלית (רשימות, טבלאות, ציטוטים) – פס הציטוט והזחת הרשימות אמורים לעבור לצד שמאל מעצמם.

## 7. סדר הבנייה

1. `catalog.ts` ו-`i18n.ts`.
2. `language.ts` ו-`main.tsx`.
3. `App.tsx`.
4. `LanguageToggle.tsx`.
5. `styles.css`.
6. `npm run build`, ובדיקה בדפדפן לפי סעיף 8.
7. סימון ✅ ב-`MILESTONES.md`.

## 8. בדיקה מול ה-Definition of Done

| תנאי | איך נבדק |
|---|---|
| ביקור ראשון: עברית, RTL, הכותרת העברית | ניקוי `localStorage`, רענון, בדיקת `lang` / `dir` / הכותרת |
| מעבר לאנגלית: כותרת אנגלית, LTR, הטור משמאל, ההנחיה האנגלית | לחיצה על English; בדיקת הטקסטים, `dir`, ומיקום הטור ביחס לאזור התוכן |
| חזרה לעברית מחזירה הכול | לחיצה על עברית ובדיקה של אותם פרטים |
| מעבר שפה מנקה בחירה, הדגשה, תוכן והודעה, בלי העתקה | בחירת פרומפט ← החלפת שפה: אין לחצן מודגש, מוצגת ההנחיה, אין Toast, ומספר הקריאות ל-`writeText` לא גדל; כולל החלפה בזמן שהעתקה עדיין רצה |
| התוויות לא משתנות; בכל שפה נטען הקובץ המקביל וההעתקה עובדת | השוואת שבע התוויות בשתי השפות; לכל 14 הצירופים – הטקסט שנשלח להעתקה ותוכן תיבת המקור זהים לקובץ שבתיקיית השפה; Toast בשפה הפעילה ובצד הנכון |
| רענון משחזר שפה; ערך לא תקין או Storage חסום ← עברית, בלי קריסה | בחירת English ← רענון ← אנגלית; כתיבת ערך שגוי ל-Storage ← רענון ← עברית; הדמיית `localStorage` שזורק שגיאה ← האתר נטען בעברית והחלפת שפה עדיין עובדת |

**מגבלת בדיקה ידועה:** חלונית הדפדפן המובנית חוסמת Clipboard אמיתי, ולכן ההעתקה נבדקת בה מול Clipboard מדומה; הדבקה אמיתית בשתי השפות – לבדיקת המשתמש ב-Chrome או ב-Edge.
