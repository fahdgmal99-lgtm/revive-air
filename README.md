# REVIVE AIR — Portfolio Website (ريفايف إير)

Production-ready, high-performance, bilingual (Arabic & English) company portfolio website built for **REVIVE AIR** (ريفايف إير), specialized in air conditioning, refrigeration, and water filtration services in Egypt.

---

## 🏢 Company Overview
- **Brand:** REVIVE AIR (ريفايف إير)
- **Founder:** Fahd Gamal (فهد جمال)
- **Experience:** 13+ years combined between founder and technical team
- **Service Model:** On-site mobile technical service across Egypt (No physical walk-in office)
- **Primary Coverage:** Cairo, Giza, North Coast (and larger project sites in other governorates)
- **Phone & WhatsApp:** `01028805759` / `+201028805759`
- **WhatsApp Link:** `https://wa.me/201028805759`
- **Social Media:**
  - Instagram: `https://www.instagram.com/reviveair.eg/?hl=ar`
  - Facebook: `https://www.facebook.com/profile.php?id=100088827357537`
  - TikTok: `https://www.tiktok.com/@reviveair.eg?lang=ar`

---

## 📁 Project Directory Structure

```text
├── index.html                   # Main semantic HTML5 webpage with structured data
├── netlify.toml                 # Netlify static deployment and security headers
├── robots.txt                   # Search crawler directives
├── sitemap.xml                  # XML sitemap with Arabic/English hreflang
├── README.md                    # Documentation & media management guide
└── assets/
    ├── css/
    │   └── style.css            # Complete design system (RTL/LTR, design tokens, animations)
    ├── js/
    │   ├── main.js              # UI controller (language switch, WhatsApp quote form, FAQs)
    │   ├── projects-data.js     # Project showcase & video database
    │   └── translations.js      # Complete Arabic & English bilingual dictionaries
    ├── images/
    │   ├── logo/
    │   │   ├── logo.svg         # Official vector brand logo
    │   │   └── icon.svg         # Favicon and icon badge
    │   └── projects/            # Real project photo folders
    │       ├── piping/          # AC Copper Piping photos
    │       ├── split-ac/        # Split AC installation photos
    │       ├── concealed-ac/    # Concealed AC installation photos
    │       ├── maintenance/     # AC Maintenance photos
    │       └── water-filters/   # Water filtration photos
    └── videos/
        └── projects/            # Real project video clips (.mp4)
```

---

## 📸 How to Add Real Project Photos

1. Save your project photos (.jpg, .png, or .webp) into the appropriate folder under `assets/images/projects/`:
   - **Copper Piping:** `assets/images/projects/piping/`
   - **Split AC:** `assets/images/projects/split-ac/`
   - **Concealed AC:** `assets/images/projects/concealed-ac/`
   - **AC Maintenance:** `assets/images/projects/maintenance/`
   - **Water Filters:** `assets/images/projects/water-filters/`

2. Open `assets/js/projects-data.js` in your editor.

3. Find the project you want to update (or add a new one), set `hasRealImage: true`, and specify the image file name:
   ```javascript
   {
     id: 'proj-piping-01',
     category: 'piping',
     projectType: 'residential',
     title: {
       ar: 'مشروع تأسيس مسارات نحاس تكييف لفيلا سكنية',
       en: 'AC Copper Piping Preparation for Residential Villa'
     },
     location: { ar: 'القاهرة', en: 'Cairo' },
     description: { ... },
     completionDate: '2024',
     image: 'assets/images/projects/piping/my-actual-photo.jpg', // <-- your photo path here
     hasRealImage: true,                                       // <-- set to true
     alt: {
       ar: 'تأسيس مواسير تكييف نحاس - ريفايف إير',
       en: 'AC copper piping installation - REVIVE AIR'
     }
   }
   ```

4. If `hasRealImage: false`, the website automatically displays an elegant, technical blueprint placeholder card clearly stating:
   - Arabic: `"سيتم إضافة صور المشروع لاحقًا"`
   - English: `"Project photos will be added later"`
   - Along with the exact file path where the image is expected.

---

## 🎥 How to Add Real Project Videos

1. Save your video file (.mp4) into `assets/videos/projects/`.
2. Open `assets/js/projects-data.js` and locate `VIDEOS_DATA`.
3. Set `hasRealVideo: true` and provide the file path:
   ```javascript
   {
     id: 'vid-01',
     category: 'piping',
     title: {
       ar: 'توثيق مرحلة تأسيس مواسير النحاس والعزل الهندسي',
       en: 'Field Documentation: AC Copper Piping & Insulation Setup'
     },
     videoUrl: 'assets/videos/projects/my-field-video.mp4',
     hasRealVideo: true
   }
   ```

---

## 🌐 Bilingual Support (Arabic & English)
- **Default Language:** Arabic (`lang="ar"` and `dir="rtl"`).
- **English Switch:** Clicking the language button toggles the entire website to English (`lang="en"` and `dir="ltr"`).
- Preference is saved in the visitor's `localStorage` and persists across sessions.
- All interface texts, form inputs, placeholders, and error messages are translated in `assets/js/translations.js`.
- The brand name **REVIVE AIR** remains untranslated in both languages.

---

## 💬 WhatsApp Integration & Quotation Generator
- All phone links dial `tel:+201028805759`.
- All WhatsApp buttons point to `https://wa.me/201028805759`.
- The quotation form validates visitor inputs (Name, Service, Project Type, Location) and constructs a pre-formatted message:
  ```text
  *طلب عرض سعر — ريفايف إير (REVIVE AIR)*
  👤 الاسم: ...
  📞 الهاتف: ...
  🔧 نوع الخدمة: تأسيس مواسير التكييف النحاس
  🏢 نوع المشروع: سكني (شقة / فيلا / شاليه)
  📍 الموقع: القاهرة
  📝 تفاصيل إضافية: ...
  ```
- The website opens WhatsApp directly with this text loaded, allowing the user to review and send it with one tap.

---

## 🚀 Deployment to Netlify
The project is 100% static with zero build dependencies.
1. Connect your Git repository to Netlify, or drag-and-drop the project folder to the Netlify Dashboard.
2. The included `netlify.toml` automatically configures headers, CSP, and static assets caching.
