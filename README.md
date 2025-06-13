# Blog CMS – Universal Astro Blog Template

A highly-configurable, multi-niche blog starter built with **Astro**, **TypeScript** and **Tailwind CSS**.  
Use it to launch a technology, lifestyle, finance, food, travel – or completely custom – blog in minutes with **zero hard-coding**.

---

## 1  Prerequisites

| Tool | Version |
|------|---------|
| Node | 18 or newer |
| npm  | 9 or newer |

> ⚠️ **Linux permissions** – this repository was initialised with a system-wide Node installation.  
> When you run `npm install` you may hit `EACCES` errors. If so, simply prepend **`sudo`** to any `npm` command.

---

## 2  Installation

```bash
# Clone the repo
$ git clone https://github.com/your-org/blog_cms.git && cd blog_cms

# Install dependencies (use sudo on Linux if you get EACCES)
$ sudo npm install
```

---

## 3  Running the Development Server

```bash
# Start Astro in dev-watch mode
$ npm run dev
```

Browse to **<http://localhost:4321>**.

---

## 4  Building & Previewing Production

```bash
# Generate static production build
$ npm run build

# Preview the build locally
$ npm run preview
```

Deploy the generated **`dist/`** directory to Vercel, Netlify, Cloudflare Pages, GitHub Pages or any static host.

---

## 5  Customising Your Blog

1. **Choose a niche** – copy a preset from `src/config/templates/` to `src/config/current-config.ts`.
2. **Edit branding and social links** – update site title, description, logos, theme colours, and all social media links inside `src/config/current-config.ts`.
   - **Social links are now managed exclusively via the top-level `BLOG_CONFIG.social` array**. Add, remove, or modify your social profiles there. Do not use `navigation.social` or any other location for social links.
3. **Write posts** – place markdown/MDX files in `src/content/posts/`.  
   Front-matter controls category, tags, `featured` flag, hero images, etc.

Hot-reload means you will see changes instantly.

---

## 6  Project Structure (Top-Level)

```
├── public/                # Static assets (images, icons, fonts…)
├── src/
│   ├── components/        # .astro components
│   ├── config/            # Typed configuration system
│   ├── content/           # Your blog posts (MDX)
│   ├── lib/               # Reusable TS utilities (SEO, images…)
│   ├── pages/             # Route definitions
│   └── types/             # Shared TS types
└── tailwind.config.mjs    # Tailwind design tokens
```

A deeper technical breakdown lives in **`technical_implementation.md`**.

---

## 7  Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Static production build |
| `npm run preview` | Preview production build locally |
| `npm run optimize-images` | Pre-optimise images for best Lighthouse scores |

---

## 8  Support & Contributing

• Open an Issue or Discussion on GitHub.  
• PRs are welcome – please follow conventional commits and include tests where practical.

---

#### License

MIT © Your Name
