# ◈ Taiwan Monitor

**Taiwan Monitor** is a high-fidelity, real-time geopolitical intelligence dashboard designed specifically to track the **2026 Taiwan Strait Crisis**. It provides a comprehensive view of kinetic, diplomatic, and economic developments through automated OSINT aggregation, AI-assisted analysis, and high-performance geospatial visualization.

Built on the **Pharos Engine**, it transforms fragmented signals into a unified operating picture for analysts, journalists, and regional observers.

---

## ◈ Core Capabilities

### 1. Real-time OSINT Dashboard
- **Signal Feed**: Automated tracking of military movements, official government statements, and field reports from verified ground sources.
- **Verification Pipeline**: Integrated verification status for social media signals to combat misinformation.

### 2. Multi-Perspective Monitoring
- **Narrative Contrasts**: Compare and contrast reporting across **40+ sources** spanning:
    - **Western Wire**: Reuters, Associated Press, BBC, Financial Times.
    - **Defense & Intelligence**: Janes Defense, USNI, Naval News, Breaking Defense.
    - **Taiwan/ROC Local**: Focus Taiwan, Taipei Times, Liberty Times.
    - **Chinese State**: Xinhua, Global Times, South China Morning Post.
    - **Strategic Think Tanks**: ASPI, CSIS, War on the Rocks, AEI.

### 3. Kinetic Map Analysis
- **Dynamic Visualization**: High-performance rendering of the Taiwan Strait using Deck.gl.
- **Tactical Overlays**: Real-time tracking of:
    - PLA Blockade Zones & Exclusion Corridors.
    - Ballistic Missile Tracks (DF-15, DF-17 Hypersonic).
    - Allied Asset Concentrations (US CSG-5, CSG-7, JSDF).
    - Target impacts and damage assessments.

### 4. Economic & Supply Chain Monitoring
- **Semiconductor Shock**: Real-time tracking of TSMC (TSM) and broader tech equities sensitivity.
- **Maritime Logistics**: Monitoring of shipping disruptions in the Taiwan Strait and South China Sea.
- **Currency Volatility**: Tracking USD/TWD and regional FX pairs affected by the escalation.

---

## ◈ Local Setup Tutorial

Follow these steps to get the Taiwan Monitor running on your local machine for development or testing.

### 1. Prerequisites
- **Node.js**: version 22.x or higher.
- **Docker**: Required for the PostgreSQL + pgvector database.
- **Git**: To clone and manage the repository.

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/hartescout/taiwan-monitor.git
cd taiwan-monitor

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a local environment file:
```bash
cp .env.local.example .env.local
```
*Note: The default configuration is already set to target the `taiwan-2026` conflict ID and local Docker database.*

### 4. Database Setup
Ensure Docker is running, then launch the database container:
```bash
# Start the PostgreSQL + pgvector container
npm run docker:up

# IMPORTANT: Enable the vector extension (Run once after container is created)
docker exec taiwan-monitor-postgres-1 psql -U pharos -d pharos -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

### 5. Initialize & Seed
Prepare the database schema and load the initial Taiwan Crisis scenario:
```bash
# Push the schema to the database
npm run db:push

# Load actors, events, map data, and OSINT feeds
npm run db:seed
```

### 6. Start the App
```bash
# Run the development server
npm run dev
```
The dashboard will be available at **[http://localhost:3000](http://localhost:3000)**.

---

## ◈ Technical Architecture

- **Framework**: Next.js 15 (App Router / Turbopack).
- **Styling**: Vanilla CSS + Tailwind CSS (Adaptive Dashboard System).
- **State Management**: Redux Toolkit (Geospatial & Workspace state).
- **Visualization**: Deck.gl / MapLibre GL for high-fidelity geospatial rendering.
- **ORM**: Prisma with PostgreSQL (pgvector for intelligence embeddings).
- **API**: RESTful internal API for event and actor management.

---

## ◈ Troubleshooting

### Port Conflicts
- **Next.js**: Runs on port **3000**.
- **PostgreSQL**: Runs on port **5434** (to avoid conflict with standard local Postgres).

### Database Connection Issues
If you get `P1001: Can't reach database server`, ensure:
1. Docker is running.
2. You have run `npm run docker:up`.
3. Your `.env` or `.env.local` contains: `DATABASE_URL="postgresql://pharos:pharos@localhost:5434/pharos"`

### Missing "vector" type
If `db:push` fails with `type "vector" does not exist`, ensure you ran the `CREATE EXTENSION` command listed in Step 4.

---

## ◈ License & Attribution

This project is licensed under the **AGPL-3.0-only**.

Developed for the **THOR Collective** & **hartescout**.

### Original Credits
This dashboard is a specialized fork of the **Pharos Intelligence Engine** originally developed by **Julius Olsson** ([@Juliusolsson05](https://github.com/Juliusolsson05)). While the data, OSINT sources, and geographic focus have been re-engineered for the Taiwan Strait Crisis, the underlying architecture and visualization systems are based on his original work.
