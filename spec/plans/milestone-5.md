# Plan – Milestone 5: GitHub ופריסה אוטומטית לאינטרנט

## 1. מטרה והיקף

האתר מתפרסם ב-GitHub Pages ומתעדכן מעצמו בכל Push לענף `main`: GitHub בונה את האתר ומעלה אותו, בלי העלאה ידנית של קבצים.

**כתובת האתר הצפויה:** `https://assaffink.github.io/spec-driven-development-prompter/`

**בפנים:** הגדרת `base` ב-Vite, קובץ Workflow של GitHub Actions, הפעלת Pages (על ידי המשתמש), ובדיקת האתר המפורסם.

**בחוץ:** דומיין מותאם אישית, סביבות נוספות, בדיקות אוטומטיות ב-CI מעבר ל-Build. אין שינוי בהתנהגות האתר.

## 2. מצב קיים

- ה-Repository `AssafFink/spec-driven-development-prompter` קיים, **ציבורי**, והענף הראשי הוא `main`. מוגדר מקומית כ-`origin`.
- ה-Repository כבר מכיל את קוד המקור, `package-lock.json` ואת כל 14 קובצי הפרומפטים.
- **GitHub Pages עדיין לא מופעל** ב-Repository.
- הקוד כבר בונה את כתובות הפרומפטים מ-`import.meta.env.BASE_URL` (`catalog.ts`), ולכן שינוי ה-`base` לא דורש שינוי בקוד האפליקציה.
- `vite.config.ts` – בלי `base` (ברירת מחדל `/`).

## 3. החלטות מימוש

1. **`base` רק בבנייה, לא בפיתוח.** האתר יושב ב-GitHub Pages תחת `/spec-driven-development-prompter/`, ולכן הבנייה חייבת לדעת את הנתיב הזה. בפיתוח מקומי הכתובת נשארת `http://localhost:5173/` כמו היום:
   `base: command === 'build' ? '/spec-driven-development-prompter/' : '/'`
2. **Workflow לפי המתכון הרשמי של Vite ל-GitHub Pages**, עם ה-Actions הרשמיים של GitHub (`checkout`, `setup-node`, `configure-pages`, `upload-pages-artifact`, `deploy-pages`). את מספרי הגרסאות העדכניים של ה-Actions אאמת מול התיעוד הרשמי בזמן הבנייה, ולא אכתוב מהזיכרון.
3. **Node.js 22 ב-CI** – אותה גרסה ראשית שמותקנת אצלך, כדי שהבנייה בענן תתנהג כמו הבנייה המקומית. עם `npm ci` ומטמון npm.
4. **הרשאות מינימליות:** `contents: read`, `pages: write`, `id-token: write`. קבוצת `concurrency` בשם `pages` כדי ששתי פריסות לא יתנגשו.
5. **הפעלה:** `push` ל-`main`, וגם `workflow_dispatch` – כפתור הרצה ידנית בלשונית Actions, שימושי אם פריסה נכשלת בלי קשר לקוד.
6. **אין סודות ואין משתני סביבה.** ה-Workflow משתמש רק בהרשאות המובנות של GitHub.
7. **סופי שורות:** אצלך הקבצים שמורים עם סופי שורות של Windows, וב-GitHub – עם סופי שורות רגילים (כך Git מוגדר אצלך). לכן באתר המפורסם הטקסט המועתק יכיל סופי שורות רגילים. התוכן זהה, וזו הצורה המקובלת; לא משנים דבר.

## 4. קבצים

**חדש:**
- `.github/workflows/deploy.yml`

**משתנים:**
- `vite.config.ts` – הוספת `base`.
- `CLAUDE.md` – בסעיף „פקודות הרצה”: כתובת האתר המפורסם ושורה שמציינת שפריסה נעשית ב-Push ל-`main`.
- `spec/MILESTONES.md` – סימון ✅ בסיום.

### `.github/workflows/deploy.yml` – מבנה
```
name: Deploy to GitHub Pages
on:
  push: { branches: [main] }
  workflow_dispatch:
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: <deployment page_url> }
    steps:
      - checkout
      - setup-node (node 22, cache npm)
      - npm ci
      - npm run build          # includes the TypeScript check
      - configure-pages
      - upload-pages-artifact (path: dist)
      - deploy-pages
```

## 5. מה נדרש ממך

שתי פעולות, שתיהן באתר GitHub. אדריך אותך בזמן הבנייה.

1. **הפעלת GitHub Pages – לפני ה-Push הראשון של ה-Workflow:**
   ב-Repository: `Settings` ← `Pages` ← תחת `Build and deployment`, בשדה `Source`, לבחור **GitHub Actions**. אין כפתור שמירה; הבחירה נשמרת מיד. בלי הצעד הזה הפריסה הראשונה תיכשל.
2. **אישור ל-Push.** לפי כללי העבודה שלנו אני לא דוחף בלי אישורך. אבן הדרך הזו דורשת Push כדי להיבדק, ולכן אעצור ואבקש אישור אחרי שהקבצים מוכנים ונבדקו מקומית.

**תקלה אפשרית:** GitHub דורש הרשאה מיוחדת כדי לדחוף קובצי Workflow. אם ה-Push יידחה בגלל זה, אעצור ואסביר איך לאשר את ההרשאה – זו פעולה שלך, כי היא נוגעת לחשבון.

## 6. סדר הבנייה

1. `vite.config.ts` – הוספת `base`.
2. `npm run build`, ואז `npm run preview` – בדיקה מקומית שהאתר עובד תחת `/spec-driven-development-prompter/`: הדף נטען, כל 14 הקבצים נטענים מהנתיב הנכון, שתי השפות פועלות. בנוסף בדיקה ש-`npm run dev` עדיין עובד ב-`/`.
3. כתיבת `deploy.yml`, אחרי אימות גרסאות ה-Actions.
4. **עצירה:** בקשה ממך להפעיל Pages (סעיף 5.1) ולאשר Push.
5. אחרי האישור: commit ו-Push, מעקב אחרי ריצת ה-Workflow עד לסיומה, וטיפול בכשל אם יהיה.
6. בדיקת האתר המפורסם לפי סעיף 7.
7. עדכון `CLAUDE.md` וסימון ✅ ב-`MILESTONES.md`. השינויים האלה יידחפו ב-Push השני – שהוא גם הבדיקה ש-Push נוסף מפרסם גרסה מעודכנת.

## 7. בדיקה מול ה-Definition of Done

| תנאי | איך נבדק |
|---|---|
| ה-Repository מכיל את הקוד ואת כל 14 קובצי המקור | רשימת הקבצים ב-`origin/main` אחרי ה-Push: שבעה ב-`public/prompts/he/` ושבעה ב-`public/prompts/en/` |
| GitHub Actions מבצע Build ו-Deployment מוצלחים, בלי פריסה ידנית | סטטוס ריצת ה-Workflow (באמצעות `gh`); התיקייה `dist` אינה נכנסת ל-Repository |
| הכתובת נפתחת ב-HTTPS, והעמוד נטען לאחר רענון ישיר | פתיחת הכתובת בדפדפן, רענון, ובדיקה שאין שגיאות ב-Console |
| כל 14 הקבצים נטענים מהנתיבים הנכונים, ושבעת הלחצנים פועלים בשתי השפות | בקשה לכל 14 הכתובות תחת `/spec-driven-development-prompter/prompts/…` – סטטוס 200 ותוכן זהה למקור; לחיצה על כל שבעת הלחצנים בכל שפה |
| באתר המפורסם: תצוגת Markdown, העתקה אוטומטית, העתקה ידנית, RTL/LTR, שמירת שפה, מצב כשל | תצוגה, כיווניות, שמירת שפה ותיבת המקור – אבדוק בדפדפן המובנה. **העתקה אמיתית ל-Clipboard – בדיקה שלך ב-Chrome וב-Edge**, כי היא חסומה בחלונית כאן. מצב כשל: הדמיית קובץ חסר בדפדפן, באותה שיטה כמו באבן הדרך הרביעית |
| Push נוסף ל-`main` מפעיל Workflow ומפרסם גרסה מעודכנת | ה-Push השני (שלב 7 בסדר הבנייה): ריצה חדשה של ה-Workflow מסתיימת בהצלחה, והאתר מגיש את הגרסה החדשה |

## 8. אחרי אבן הדרך

זו אבן הדרך האחרונה ב-`MILESTONES.md`. מכאן והלאה כל „שמור שינויים בגיטהאב” גם מפרסם את השינוי באתר החי, בתוך דקה-שתיים.
