# HireMitra - Career Support & Job Switch Platform

> **Build Your Profile. Crack Your Interview. Make Your Next Career Move.**

HireMitra is a comprehensive, production-ready career-support platform designed to help freshers launch their software careers and experienced professionals (3-10+ years) make successful, high-impact job switches.

---

## 🌟 Key Features

### For Freshers
- **ATS-Friendly Resume Engineering:** Handcrafted for high parse rates and recruiter visibility.
- **Real-World Project Assistance:** End-to-end guidance in building production-grade projects.
- **GitHub & Portfolio Guidance:** Structure repos, commit history, and technical writeups.
- **Tech Stack Mastery:** Java, Spring Boot, React.js, SQL, Microservices, and role-specific preparation.
- **Communication & HR Mock Rounds:** Build confidence for screening and behavioral interviews.
- **Job Application & Referral Assistance:** Strategic application guidance and professional network referral support where available.

### For Experienced Professionals (3-10+ Years)
- **Profile & Resume Audit:** Highlighting measurable business impact, metrics, and leadership.
- **System Design & Deep Tech Prep:** Low-Level & High-Level design interview readiness.
- **Scenario & Managerial Round Coaching:** Conflict resolution, project ownership, leadership paradigms.
- **Job Switch Strategy:** Identifying target companies, compensation benchmarking, and notice period management.
- **Salary Negotiation Guidance:** Maximize offers with data-driven negotiation playbooks.
- **Referral Assistance:** Network connections across Capgemini, Accenture, Deloitte, Tech Mahindra, TCS, Infosys, Wipro, Cognizant, and product startups.

### For Admins
- Secure JWT-based Admin Portal.
- Real-time candidate pipeline tracking with status workflows (*New, Under Review, Contacted, Preparation, Referral Requested, Referral Assisted, Completed*).
- Candidate detail viewer, resume downloader, and internal recruitment notes.
- In-depth search, filtering by experience and service type, and CSV export.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React, Axios, React Router v6
- **Backend:** Node.js, Express.js, Multer, Helmet, CORS, Express-Rate-Limit, JSON Web Tokens (JWT), BcryptJS
- **Database:** MySQL 8.0+
- **ORM:** Prisma ORM
- **Deployment Targets:** Vercel (Frontend), Railway / Render (Backend), Cloud MySQL (Aiven / PlanetScale / Railway MySQL)

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js (v18+)
- MySQL Server (Running on localhost:3306)
- Git

### 2. Backend Setup
```bash
cd backend
npm install
# Copy .env.example to .env and configure your database URL
cp .env.example .env
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will be accessible at `http://localhost:5173` and backend at `http://localhost:5000`.

---

## 🔒 Default Admin Credentials (Seed)
- **URL:** `http://localhost:5173/admin`
- **Email:** `admin@hiremitra.com`
- **Password:** `Admin@HireMitra2025`

---

## ⚖️ Business Disclaimer
*Referral assistance may be available based on role, eligibility, openings, and network availability. Referral assistance does not guarantee interview selection or employment. Final hiring decisions are made solely by the respective employer. HireMitra does not claim official partnerships with any named third-party companies.*

