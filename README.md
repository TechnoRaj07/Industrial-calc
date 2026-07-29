# IndustrialCalc 🚀

> **VisionOS-Inspired Industrial & Chemical Process Engineering Calculator Suite**

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![ISO 9001](https://img.shields.io/badge/ISO-9001_Verified-emerald?style=for-the-badge)](https://iso.org)

**IndustrialCalc** is a full-stack web platform delivering **50 specialized calculation engines** for Food Processing, Dairy Technology, Biotechnology, Chemical Engineering, Water Analysis, Quality Control, Utilities, and Environmental Engineering. Designed with an ultra-sleek **Apple VisionOS / Windows 11 Acrylic glassmorphic interface**, automated lead capture, and multi-format report export (**PDF**, **DOCX**, **PNG**) with dynamic **QR code verification stamps**.

---

## ✨ Features & Architecture

### 💎 VisionOS Glassmorphic Design System
- **Light Mode**: White to light pink to soft blue background gradient (`#FFFFFF` → `#FFF8FB` → `#F7F7FF`) with semi-transparent frosted white glass (`rgba(255, 255, 255, 0.65)`), 24px backdrop blurs, and faint white borders.
- **Dark Mode**: Deep black (`#050505` to `#0D2415`) with glowing neon green (`#00FF99`) and cyan (`#00E5FF`) accents.
- **Spatial Computing Visuals**: Radial cursor glow tracking, moving aurora gradient blobs, floating glass cards, and smooth page transitions.

### 🧪 50 Industrial Calculator Engines
- **General Chemistry & Process**: Molarity ($M$), Normality ($N$), Molality ($m$), Mole calculation, Equivalent Weight, Density ($\rho$), Specific Gravity (SG), Degree Brix (°Bx), Dilution ($C_1 V_1 = C_2 V_2$), Solution Preparation, Percentage, Ratio, Batch Scaling, Yield, Recovery, Moisture (wet/dry basis), Loss on Drying (LOD), Solid:Solvent Ratio, ppm/ppb conversions, Concentration Factor (CF), Extraction Efficiency, Resin Loading, Bed Volume (BV), Column Flow Rate / Linear Velocity, Residence Time ($\tau$), Vacuum Pressure conversion, Distillation Recovery, Filtration Flux (LMH), Drying Rate, Moisture Removal, Process Efficiency, and Overall Material Balance.
- **Modern Industrial & Environmental**: Pasteurization Holding Time & $F_0$ Lethality, Heat Exchanger Efficiency & LMTD, Reynolds Number ($Re$), Pressure Drop ($\Delta P$), Pump Brake Horsepower (BHP), Pipe Flow Velocity, Steam Requirement (kg/h), Boiler Efficiency, Cooling Load (TR / kW), CIP Chemical Requirement, COD Reduction, BOD Removal, Wastewater Loading, Fermentation Yield ($Y_{p/s}$), Microbial Growth Rate ($\mu$), OEE (Overall Equipment Effectiveness), and Carbon Footprint ($CO_2e$) Estimator.

### 📄 Authenticated Report Generation
- **Lead Capture Modal**: Captures user name, email, mobile, and role (across 24 industrial roles).
- **PDF Engine (`pdf-lib`)**: Exports branded A4 PDF calculation reports stamped with verification QR codes.
- **DOCX Generator (`docx`)**: Exports structured Word documents.
- **PNG Card Snapshot (`html2canvas`)**: Exports instant client-side summary images.
- **QR Code Verification**: Cryptographically stamped verification portal at `/verify?code=...`.

### 🛡️ Full Admin Dashboard (`/admin`)
- **Site & Theme Customizer**: Manage Logo, Favicon, Website Name, Hero headline, Subtext, Buttons, Hero Images/Videos, AI graphics, GIFs, Lottie animations, Colors, Gradients, Typography, Card blur, Button shapes, Contact emails/phones, Headquarters address, and Homepage section toggles.
- **Report Logs**: Search, filter, inspect, delete, and export CSV reports.
- **Blog CMS**: Full Blog article manager with cover image insertion section and rich formatting.
- **Media Library**: Upload manager for images, videos, and JSON animations.
- **Inquiries Inbox**: Manage and reply to contact messages.
- **Security Logs & User Directory**: IP action telemetry and user lead directory with CSV export.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, GSAP, Lucide Icons, Recharts.
- **Backend & Database**: Node.js, Express, Mongoose / MongoDB Atlas, JWT auth.
- **Reporting**: `pdf-lib`, `docx`, `html2canvas`, `qrcode`.

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/TechnoRaj07/Industrial-calc.git
cd Industrial-calc
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Admin Dashboard Access
- Admin Portal: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Default Email**: `admin@industrialcalc.app` (or `admin`)
- **Default Password**: `Admin@2026` (or `admin`)

---

## 📜 License
Licensed under the MIT License.
