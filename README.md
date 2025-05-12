# HostPilot

**HostPilot** is your AI‑powered control center for short‑term rental management. It automates guest messaging, cleaning‑crew notifications, dynamic pricing via PriceLabs, and post‑stay invoicing through the Fakturowania.pl API.

---

## 🚀 Features

* **Automated Guest Messaging**: AI agent handles FAQs with your brand voice.
* **Cleaner Alerts**: Real‑time notifications when a booking falls within 72 hours of check‑in.
* **Dynamic Pricing**: Seamless PriceLabs integration for optimized rates.
* **Invoicing Workflow**: n8n‑driven post‑stay invoice creation in Fakturowania.

---

## 🛠️ Tech Stack

| Layer             | Technology                               |
| ----------------- | ---------------------------------------- |
| Core API          | Next.js API Routes (TypeScript)          |
| Hosting           | Vercel                                   |
| Database          | Supabase (PostgreSQL)                    |
| AI Messaging      | OpenAI Assistants API + LangChain (Node) |
| Visual Automation | n8n Cloud                                |
| Local Containers  | Docker Desktop (WSL 2 backend)           |
| Dev Environment   | WSL 2 + Ubuntu, VS Code Remote‑WSL, pnpm |

---

## 📥 Getting Started

### Prerequisites

* **Windows 11 Home** with **WSL 2** + Ubuntu (`wsl --install`)
* **Docker Desktop** (enable WSL 2 integration)
* **VS Code** with *Remote – WSL* extension
* **nvm** + **Node.js LTS**, **pnpm**
* **Git** and a **GitHub** (or GitLab/Bitbucket) account

### Initialize GitHub Repository

If you haven’t created the remote repo yet, set it up and push your initial commit:

```bash
git init
git add README.md
git commit -m "chore: initial commit"
git branch -M main
git remote add origin https://github.com/Elzoidbergo/HostPilot.git
git push -u origin main
```

### Clone & Install

```bash
git clone https://github.com/Elzoidbergo/HostPilot.git
cd HostPilot
pnpm install
```

### Environment Variables

Create a `.env` file in the project root:

```dotenv
# Lodgify API
LODGIFY_KEY=your_lodgify_api_key

# OpenAI
OPENAI_KEY=your_openai_api_key

# Supabase
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key

# Fakturowania.pl
FAKT_TOKEN=your_fakturowania_api_token

# n8n Webhook URL
N8N_WEBHOOK_INVOICE=https://xyz.n8n.cloud/webhook/lodgify-completed
```

### Run Locally

```bash
pnpm dev
```

Open your browser at `http://localhost:3000` for API route testing.

---

## 🔄 Invoicing Workflow (n8n)

1. **Webhook Trigger**: `POST /lodgify/completed` on n8n.
2. **Fetch Booking**: GET Lodgify reservation details.
3. **Create Invoice**: POST to Fakturowania API with booking data.
4. **Log**: Store invoice ID in Supabase for auditing.

---

## 📦 Deployment

1. Push your changes to GitHub.
2. Vercel auto‑deploys `main` branch to production.
3. n8n Cloud runs workflows continuously—no extra ops required.

---

## 🎯 Next Steps

* Scaffold initial API route for guest messaging.
* Build n8n invoice workflow and test with a sample booking.
* Connect PriceLabs via Lodgify Marketplace settings.

---

> Built for high‑agency hosts who demand automation without complexity.
