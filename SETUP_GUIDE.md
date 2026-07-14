# HTML Form → Google Sheets (with image upload) — Setup Guide

You have two files: `registration_form.html` (the page people fill out) and `Code.gs`
(the backend that saves everything). Total setup time: ~10 minutes.

## Step 1 — Create the Google Sheet
1. Go to sheets.google.com → **Blank spreadsheet**.
2. Rename it `YUVA 2026 Registrations`.
3. Go to **Extensions → Apps Script**. A code editor opens, bound to this sheet.

## Step 2 — Create the Drive folder for screenshots
1. Go to drive.google.com → **New → Folder** → name it `YUVA 2026 Payment Screenshots`.
2. Open the folder, copy the ID from the URL:
   `https://drive.google.com/drive/folders/`**`THIS_PART_IS_THE_ID`**

## Step 3 — Add the backend code
1. Back in the Apps Script editor, delete the placeholder code and paste in the
   full contents of `Code.gs`.
2. Replace `PASTE_YOUR_DRIVE_FOLDER_ID_HERE` with the folder ID from Step 2.
3. Click **Save** (disk icon).

## Step 4 — Deploy as a Web App
1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**. The first time, Google will ask you to **authorize** —
   click through the "unverified app" warning (this is your own script, it's safe)
   and grant Sheets/Drive access.
5. Copy the **Web app URL** shown (ends in `/exec`). This is your live API endpoint.

## Step 5 — Connect the HTML form to it
1. Open `registration_form.html` in a text editor.
2. Find this line near the bottom:
   ```js
   const SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
3. Replace it with the URL you copied in Step 4.
4. Save the file.

## Step 6 — Host the page so people can open it
Pick whichever is easiest for you:
- **Quickest / free**: Upload `registration_form.html` to Google Drive → right-click →
  Share → "Anyone with link." (Note: this gives a Drive preview link, not a clean
  webpage — fine for testing, not ideal for sharing widely.)
- **Best for sharing widely, still free**: Put it on **GitHub Pages** or **Netlify Drop**
  (netlify.com/drop — literally drag-and-drop the HTML file, get a live link instantly).
- **If you already have any web hosting**: just upload the file there.

## Step 7 — Test it end-to-end
1. Open the hosted page.
2. Fill it out as both a Team and an Individual registrant (test both paths).
3. Attach a small test image as the "screenshot."
4. Submit, then check:
   - A new row appeared in your Google Sheet ✅
   - The image link in the last column opens the uploaded screenshot in Drive ✅

## Notes & limitations
- **Every submission re-deploys nothing** — the Web App URL stays the same forever
  once deployed; you only need to redo Step 4 if you edit `Code.gs` later
  (use **Deploy → Manage deployments → Edit → New version**).
- **File size**: Apps Script web apps handle images up to a few MB comfortably;
  large photos may be slow. Screenshots are typically fine.
- **Security**: Since "Who has access" is set to Anyone, anyone with the URL can
  submit data — same as a public Google Form. That's expected for a public
  registration form.
- **If submissions aren't reaching the Sheet**: open the Apps Script editor →
  **Executions** (left sidebar) to see error logs for each attempt.
