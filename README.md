# MergePDFFilesFree.com — Modern Next.js Architecture

A 100% client-side, in-browser PDF utilities suite built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS**. All operations (merging, splitting, compression, image conversions) execute entirely within the user's browser memory via WebAssembly and `pdf-lib`, with **zero server uploads** and **zero data retention**.

---

## 📁 Clean Directory Structure

```text
├── public/                     # Static assets served at root
│   ├── favicon.ico             # Global site favicon
│   ├── robots.txt              # Search engine crawler directives
│   ├── sitemap.xml             # XML Sitemap
│   ├── send-mail.php           # Optional PHP SMTP mailer for contact form
│   └── images/                 # Optimized brand assets & OpenGraph images
│       ├── logo.png            # Main header & footer logo
│       ├── og-images.png       # 1200x630 social share card
│       └── favicon.ico         # Apple touch icon fallback
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root HTML layout with self-hosted Google Font
│   │   ├── globals.css         # Tailwind base, utilities & accessibility styles
│   │   ├── page.tsx            # Root English Homepage (Merge PDF)
│   │   ├── [lang]/             # Dynamic localized routes for 10 languages
│   │   │   ├── layout.tsx      # Language layout with RTL/LTR & language switcher
│   │   │   ├── page.tsx        # Localized Homepage with full tool directory
│   │   │   ├── split-pdf/      # Split PDF Tool route
│   │   │   ├── compress-pdf/   # Compress PDF Tool route
│   │   │   ├── jpg-to-pdf/     # JPG to PDF Tool route
│   │   │   ├── merge-pdf/      # Merge PDF alias route
│   │   │   ├── about-us/       # About Us page
│   │   │   ├── contact/        # Contact Us page with interactive form
│   │   │   ├── faq/            # Comprehensive FAQ page
│   │   │   ├── how-it-works/   # Architecture & Technology explanation
│   │   │   ├── guides/         # Step-by-step PDF tutorials
│   │   │   ├── business/       # Corporate & Enterprise solutions
│   │   │   ├── education/      # Students & Educators solutions
│   │   │   ├── security/       # Security & Privacy architecture
│   │   │   ├── cookies/        # Cookie policy & storage protocol
│   │   │   ├── disclaimer/     # Legal disclaimer & service warranty
│   │   │   ├── terms/          # Terms of Service
│   │   │   └── terms-of-service/ # Terms of Service alias
│   │   │
│   │   └── (root routes)       # Standard root paths (/about-us, /faq, etc.)
│   │
│   ├── components/             # Reusable, Pure React UI & Engine Components
│   │   ├── MergePdfTool.tsx    # PDF Merge engine with drag-and-drop & sorting
│   │   ├── SplitPdfTool.tsx    # PDF Split engine (Range, Extract, All to ZIP)
│   │   ├── CompressPdfTool.tsx # PDF Compression engine with stream deduplication
│   │   ├── JpgToPdfTool.tsx    # Image to PDF converter with orientation/margin
│   │   ├── ContactForm.tsx     # Interactive contact form with mailto fallback
│   │   ├── Header.tsx          # Responsive navigation header & language selector
│   │   ├── Footer.tsx          # 4-column comprehensive navigation footer
│   │   └── AdPlaceholder.tsx   # Zero-CLS Google AdSense placeholders
│   │
│   ├── lib/
│   │   ├── constants.ts        # Supported languages (en, es, fr, de, pt, ru, ja, zh, ar, it)
│   │   └── metadata.ts         # Centralized Type-Safe SEO Metadata Engine
│   │
│   └── data/
│       └── i18n/               # Translation JSON files for all 10 languages
│           ├── en.json, es.json, fr.json, de.json, pt.json,
│           └── ru.json, ja.json, zh.json, ar.json, it.json
│
├── next.config.js              # Output: 'export' for static HTML generation
├── tailwind.config.js          # Tailwind styling configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 🛠️ How to Add or Scale Features

### 1. Adding a New Tool
1. Create your client-side React component in `src/components/YourTool.tsx` (using `'use client'` and importing `pdf-lib` dynamically).
2. Create the localized route in `src/app/[lang]/your-tool/page.tsx` and export `generateMetadata` using `constructPageMetadata({ pageKey: 'your-tool', lang, path: 'your-tool' })`.
3. Create the root route in `src/app/your-tool/page.tsx`.
4. Add translations in `src/data/i18n/*.json` under `pages["your-tool"]`.
5. Link it in `src/components/Header.tsx` and `src/components/Footer.tsx`.

### 2. Updating Metadata & SEO
All SEO metadata is centralized in `src/lib/metadata.ts`. Updating text in `src/data/i18n/*.json` automatically updates:
- `<title>`
- `<meta name="description">`
- `<meta name="keywords">`
- `<link rel="canonical">`
- `<link rel="alternate" hreflang="...">` across all 10 languages
- OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Cards

### 3. Build & Static Export
```bash
# Development mode
npm run dev

# Build production static export (outputs to /out)
npm run build
```

---

## 🔒 Privacy & Compliance Architecture
- **Zero Server Uploads**: Processing uses HTML5 File API and WebAssembly.
- **Client-Side ZIP Generation**: Multi-page splitting is packaged via `jszip` in browser memory.
- **GDPR & CCPA Compliant**: Zero personal data collection, zero tracking cookies.
