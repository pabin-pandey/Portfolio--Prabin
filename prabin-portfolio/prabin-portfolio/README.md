# Prabin Pandey — Portfolio

A professional portfolio built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.  
Features a full visual admin panel for editing all content without code.

---

## File Tree

```
prabin-portfolio/
├── .env.local                 # Environment variables
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── public/
│   ├── content/
│   │   └── content.json       # Optional: pre-populated content
│   ├── resume/                # Place resume PDF here
│   ├── sitemap.xml
│   └── robots.txt
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx          # Root layout + JSON-LD
    │   ├── providers.tsx       # Client providers wrapper
    │   ├── page.tsx            # Home page
    │   ├── about/page.tsx
    │   ├── projects/
    │   │   ├── page.tsx        # Projects listing (filter + search)
    │   │   └── [id]/page.tsx   # Project case study
    │   ├── blog/
    │   │   ├── page.tsx        # Blog listing
    │   │   └── [slug]/page.tsx # Blog post detail
    │   ├── contact/page.tsx
    │   └── admin/page.tsx      # Visual editor
    ├── components/
    │   ├── icons.tsx
    │   ├── navbar.tsx
    │   ├── footer.tsx
    │   └── ui.tsx              # Section wrappers, AnimatedDiv, Counter
    ├── hooks/
    │   └── use-in-view.ts
    ├── lib/
    │   ├── content-provider.tsx
    │   ├── default-content.ts
    │   ├── theme-provider.tsx
    │   └── utils.ts
    └── types/
        └── content.ts
```

---

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local
# Edit .env.local to set your admin passcode

# 3. Run development server
npm run dev
# → Open http://localhost:3000

# 4. Build for production
npm run build
npm start
```

---

## Admin Panel

Navigate to `/admin` and enter your passcode (set in `.env.local`).

**Features:**
- Edit all site content visually (no coding required)
- CRUD for: Projects, Blog Posts, Testimonials, Education, Experience, Skills
- Reorder items with up/down arrows
- Embed editor for Power BI and Tableau dashboards (with instructions)
- Save Draft → persists to localStorage
- Export → downloads `content.json`
- Import → upload a `content.json` to overwrite
- Reset → restores DEFAULT_CONTENT

**Content Loading Priority:**
1. localStorage draft (if exists)
2. `public/content/content.json` (if valid)
3. Built-in DEFAULT_CONTENT

---

## Vercel Deployment

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USER/prabin-portfolio.git
git push -u origin main

# 2. Deploy on Vercel
# - Go to https://vercel.com/new
# - Import your GitHub repo
# - Framework: Next.js (auto-detected)
# - Add environment variable:
#     NEXT_PUBLIC_ADMIN_PASSCODE = your_secure_passcode
# - Deploy

# 3. Connect www.prabin.com
# - In Vercel → Project Settings → Domains
# - Add: www.prabin.com
# - At your domain registrar, add:
#     CNAME  www  →  cname.vercel-dns.com
# - For apex (prabin.com), add:
#     A  @  →  76.76.21.21
# - Wait for DNS propagation (usually <1 hour)
```

---

## Resume

Place your resume PDF at:
```
public/resume/Prabin_Pandey_Resume.pdf
```

Or change the path in Admin → Resume tab.

---

## Content.json Workflow

For production without localStorage:
1. Go to `/admin`
2. Edit all content
3. Click **Export** to download `content.json`
4. Place it in `public/content/content.json`
5. Commit and redeploy

This way the site loads content from the JSON file on first visit.
