# 🧠 Featured Projects

## 1. Crypto Arbitrage Bot

**Tech Stack:** Golang · Node.js · React.js · GCP Compute Engine · GCP SQL

### Problem

Crypto exchanges often have small but exploitable price differences (spreads) across markets. Manually tracking and executing trades fast enough to profit from these inefficiencies is impossible for humans.

### Solution

Built a fully automated arbitrage bot using **Golang** for low-latency performance.  
A lightweight **Node.js** + **React.js** backoffice allowed users to set parameters such as:

- Target spread threshold
- Max amount to trade per cycle
- Total USD allocation

The bot continuously polled **Binance** and **Buda** spot prices in microseconds. When the spread exceeded the defined threshold, it instantly executed a buy/sell pair to capture the profit.

The system was hosted on **Google Cloud Platform (GCP)** using:

- **Compute Engine** for the bot workers
- **SQL** for parameter storage and logs
- **Pub/Sub** to trigger asynchronous trading tasks

### Impact

- Consistently detected profitable spreads in volatile markets
- Executed hundreds of micro-trades daily
- Demonstrated high-performance concurrency handling in Go

### Architecture (text)

```
[React.js Dashboard] --> [Node.js API Gateway] --> [GCP SQL]
                                       \
                                        -> [Golang Worker Pool] --> [Binance API]
                                                             --> [Buda API]
                                                             --> [Trade Executor]
```

---

## 2. Ztudia (2024)

**Tech Stack:** Wasp · Prisma · PostgreSQL · Fly.io · GPT-3.5 / GPT-4o

### Problem

Students often lack adaptive learning tools that focus on what _they personally_ need to master for their exams. Existing systems don’t generate personalized exercises tied to conceptual understanding.

### Solution

Created **Ztudia**, an experimental AI-powered learning platform designed to generate personalized exercises per topic/subtopic.  
Built with the **Wasp** full-stack framework (leveraging React + Node + Prisma) to rapidly prototype and deploy a structured course system:

- Courses defined by atomic **topics** and **subtopics**
- Each with **detailed descriptions** and **custom exercises** generated dynamically
- Exercises validated with **2–3 post-generation checks** for factual and pedagogical accuracy

Hosted on **Fly.io** for fast global deployment and scalability.  
Used **GPT-3.5/4o** to create new problems and explanations, pre-generating them as students advanced to minimize latency.

### Impact

- Enabled adaptive question generation with real-time feedback
- Served as an early prototype for mastery-based AI tutoring
- Provided technical foundation for the upcoming **Preu.Arbor.School** project

### Next Evolution: Arbor School

Currently reimagined (work in progress, not yet released - just preview for now in the website) as **preu.arbor.school**, applying insights from _The Math Academy Way_ and modern **learning sciences**:

- Knowledge Graph as the heart of the system
- Mastery-based progression (90% threshold)
- Incorporates **spaced repetition**, **interleaving**, and **non-interference** principles

### Architecture (text)

```
[Fly.io Hosting]
   ├── [Wasp Backend] --> [Prisma ORM] --> [PostgreSQL DB]
   ├── [React Frontend] --> [Course Viewer + Exercise Builder]
   └── [GPT-4o API Integration] --> [Validation Pipeline (3 layers)]
```

---

## 3. TradesILike (TIL)

**Tech Stack:** Node.js · React.js · MongoDB (Atlas, TimeSeries) · GCP Cloud Functions · GCP Kubernetes

### Problem

Investing education is often theoretical and risk-free “paper trading” lacks realism.  
Learners needed a way to **simulate real portfolios** against live data and compare their decisions to others — without financial risk.

### Solution

Built **TradesILike.com (TIL)** — a financial simulation platform where users create portfolios and compete in real-time.  
The app fetched data for **2000+ assets every 5 seconds** via **GCP Cloud Functions**, storing both prices and portfolio states in **MongoDB TimeSeries collections**.

Frontend built in **React.js** visualized:

- Portfolio performance over time
- Per-stock returns and key metrics
- Leaderboards comparing users’ simulated portfolios

Backend handled authentication, trade validation, and data sync via **Node.js** services hosted in **GCP Kubernetes**.

### Impact

- Helped users learn portfolio management by doing
- Fostered competitive, gamified financial learning
- Handled real-time data ingestion at scale efficiently

### Architecture (text)

```
[React.js Frontend] --> [Node.js API] --> [MongoDB Atlas (TimeSeries)]
                            \
                             --> [GCP Cloud Functions] --> [Realtime Price Feeds]
                             --> [GCP Kubernetes Cluster] --> [Background Jobs + Leaderboards]
```
