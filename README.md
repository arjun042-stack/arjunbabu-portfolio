# Arjunbabu Saila — Engineering Portfolio

A clean, modern, corporate-grade portfolio website designed for technical recruiters, hiring managers, and interviewers. Engineered with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Architecture & Highlights

- **Visual Direction**: "Premium Software Engineer Portfolio + Subtle Technology Aesthetic".
- **Dark Corporate Theme**: High-contrast, near-black slate backgrounds (`#090c12`), crisp off-white typography, and a single deep/electric blue accent (`#2563eb`).
- **Interactive Developer Terminal**: Embedded terminal card showcasing technical focus, core stack, and operational status with quick command filters and clipboard copy.
- **SIEM Telemetry & AI SOC Widget**: Interactive preview for the featured *CyberShield SIEM AI Assistant* project demonstrating Wazuh log ingestion, MITRE ATT&CK correlation, and Gemini AI threat synthesis.
- **Categorized Skills Matrix**: 7 professional categories with real-time recruiter search filtering.
- **Strict Content Fidelity**: Accurate industrial training at Singareni Collieries (SCCL), verified education at CMR College of Engineering and Technology & Singareni Collieries Polytechnic, and legitimate certifications (Deloitte, Tata Forage, Cisco).
- **SEO & Accessibility**: Complete Open Graph, Twitter cards, JSON-LD Schema (`Person`), semantic HTML, visible focus rings, and `prefers-reduced-motion` compliance.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `v18.x` or later (tested on Node `v24.x`)
- npm or pnpm / yarn

### 1. Installation
Clone or navigate to the project directory:
```bash
cd arjunbabu-portfolio
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Test
```bash
npm run build
npm run start
```

---

## ⚙️ Configuration Guide

All portfolio content is decoupled from UI components and stored in modular files inside `src/data/`:

```
src/data/
├── profile.ts        # Name, titles, contact info, social URLs, and terminal data
├── projects.ts       # Featured projects, descriptions, tags, repository/demo URLs
├── skills.ts         # 7 technical skill categories and competencies
├── certifications.ts # Deloitte, Tata Forage, and Cisco credentials & URLs
├── experience.ts     # Singareni Collieries (SCCL) industrial training
├── education.ts      # CMR College of Engineering and Technology & SCPC
└── hackathons.ts     # HackWithHyderabad, Agentathon, and Nextpreneur
```

### How to Configure LinkedIn URL
Open `src/data/profile.ts` and update line 47:
```typescript
linkedInUrl: "https://www.linkedin.com/in/YOUR_ACTUAL_USERNAME",
isLinkedInConfigured: true,
```

### How to Configure GitHub URL
Open `src/data/profile.ts` and update line 48:
```typescript
githubUrl: "https://github.com/YOUR_ACTUAL_USERNAME",
isGitHubConfigured: true,
```

### How to Add / Replace the Resume PDF
1. Place your actual resume PDF in the `public/` directory with the name `Arjunbabu_Saila_Resume.pdf`:
   ```bash
   public/Arjunbabu_Saila_Resume.pdf
   ```
2. If you want to use a different filename or host it externally, update `src/data/profile.ts`:
   ```typescript
   resumeUrl: "/Arjunbabu_Saila_Resume.pdf", // or "https://your-domain.com/resume.pdf"
   ```

### How to Configure Project Repositories & Live Demos
Open `src/data/projects.ts` and update the `githubUrl` and `demoUrl` fields for each project:
```typescript
{
  id: "cybershield-siem",
  githubUrl: "https://github.com/YOUR_USERNAME/cybershield-siem-ai",
  demoUrl: "https://your-live-demo.vercel.app",
  ...
}
```

### How to Configure Certification Links
Open `src/data/certifications.ts` and set your verified credential links:
```typescript
{
  id: "cisco-jr-analyst",
  credentialUrl: "https://www.credly.com/your-badge-url",
  isConfigured: true,
  ...
}
```

### How to Connect the Contact Form
The contact form submission logic is cleanly isolated in `src/components/Contact.tsx`.
You can connect it to:
1. **Formspree / Formspark**:
   ```typescript
   const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(formData),
   });
   ```
2. **Resend / SendGrid** via a Next.js App Router Route Handler (`src/app/api/contact/route.ts`).

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)
1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Arjunbabu Saila portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```
2. Sign in to [Vercel](https://vercel.com).
3. Click **"Add New"** > **"Project"** and import your repository.
4. Next.js will be automatically detected. Click **Deploy**.

### Deploy to Netlify
1. Connect your repository to [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `.next`

---

## 📄 License
MIT License. Created for Arjunbabu Saila.
