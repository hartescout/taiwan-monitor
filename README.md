# ◈ Taiwan Monitor

**Taiwan Monitor** is a real-time geopolitical intelligence dashboard designed to track the 2026 Taiwan Strait Crisis. It provides a comprehensive, multi-perspective view of kinetic, diplomatic, and economic developments through automated OSINT aggregation and expert analysis.

Built on the **Pharos Engine**, it transforms raw signals into actionable intelligence via a modern, high-fidelity interface.

---

## ◈ Core Capabilities

- **Real-time OSINT Dashboard**: Automated tracking of military movements, official statements, and field reports.
- **Multi-Perspective Monitoring**: Contrast narratives between Western, Taiwanese, Chinese, and regional Asian sources.
- **Kinetic Map Analysis**: Visual representation of blockade zones, missile tracks, and naval concentrations in the Taiwan Strait.
- **Economic Impact Tracker**: Real-time monitoring of semiconductor supply chain health, shipping disruptions, and regional market volatility.
- **Daily Intelligence Briefs**: Synthesized daily reports summarizing executive developments and strategic outlooks.

## ◈ Data & Sources

Taiwan Monitor aggregates 40+ high-fidelity sources including:
- **Defense/Intel**: Janes Defense, USNI, Naval News, Breaking Defense.
- **Regional**: Focus Taiwan, Taipei Times, Global Times, SCMP, NHK.
- **OSINT Analysts**: Combined feeds from verified maritime and aviation tracking accounts.

---

## ◈ Quick Start

### 1. Prerequisites
- **Node.js 22.x**
- **Docker** (for local PostgreSQL database)

### 2. Setup
```bash
# Install dependencies
npm install

# Setup environment
cp .env.local.example .env.local

# Start the database
npm run docker:up

# Initialize schema and seed Taiwan 2026 data
npm run db:push
npm run db:seed
```

### 3. Launch
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

---

## ◈ Technical Architecture

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Redux Toolkit.
- **Visualization**: Deck.gl / MapLibre for high-performance geospatial rendering.
- **Database**: PostgreSQL with Prisma ORM and pgvector for RAG capabilities.
- **Intelligence**: Integrated with Pharos Doctrine for autonomous fulfillment protocols.

---

## ◈ License

This project is licensed under the **AGPL-3.0-only**.

Developed for the **THOR Collective** & **hartescout**.
