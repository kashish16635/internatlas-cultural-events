# InternAtlas: Cultural Events & College Fests Module (Full Stack)

Built for **InternAtlas** (`internatlas.in`) — Next-Gen Student Discovery Platform.

This module provides a complete full-stack experience for students across India to discover, filter, inspect, and register for premier collegiate cultural competitions and festivals (IIT Bombay Mood Indigo, BITS Pilani Oasis, IIT Delhi Rendezvous, Hindu College Mecca, and more).

---

## 🎨 Architecture & Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend** | React 19 + Vite | Fast, modern client with Lucide-React icons |
| **Styling** | Custom Design System (Vanilla CSS) | Dark obsidian theme, glassmorphism, responsive grid, festive neon accents |
| **Backend** | Node.js + Express.js | REST API server with CORS and error handling |
| **Data Store** | JSON Database | Pre-seeded with 8 marquee Indian college cultural events and registration records |

---

## 🚀 Key Features

1. **6 Core Cultural Categories:**
   - 💃 **Dance & Choreo:** Western Hip Hop, Urban Choreography, Folk & Classical
   - 🎸 **Music & Bands:** Livewire Battle of the Bands, Acoustica, Classical Solo Vocals
   - 🎭 **Drama & Theatre:** National Nukkad Natak (Street Play), Stage Play, Mono-Acting
   - 👗 **Fashion & Glam:** Campus Vogue Runway, Indo-Western styling
   - 🎨 **Fine Arts & Design:** 24-Hour Digital & Live Art Marathons, Photography
   - 🎤 **Literary & Stand-Up:** National Slam Poetry, Comedy Face-offs, Debates

2. **Smart Filters & Real-Time Search:**
   - Instant search across event titles, colleges, and cities.
   - Filters for City (Mumbai, Delhi NCR, Goa, Pilani, Kanpur, etc.).
   - Mode filter (On-Campus Offline vs Hybrid vs Virtual).
   - Fee filter (Free registration vs Paid pass).
   - Sort by: Featured, Highest Prize Pool, Closing Soon, Popularity.

3. **Interactive Event Details & Rulebook Modal:**
   - Tabbed view: Overview & Venue, Official Rules & Eligibility, Rounds & Evaluation Timeline, Student Coordinators contact.

4. **Multi-Step Registration & Digital Pass:**
   - Supports both **Solo** and **Team/Society Crew** formats (dynamic team member inputs).
   - Instant generation of verified digital ticket with unique **Registration ID** and print/save pass action.

5. **Host an Event Form:**
   - College societies can list new cultural competitions with custom prizes, deadlines, rules, and coordinator contacts, which immediately publish to the live feed.

6. **Local Bookmarks:**
   - Bookmark events with one click, persisted in browser `localStorage`.

---

## 💻 How to Run Locally

### 1. Start the Backend API (Port 5000):
```bash
cd server
npm start
```
*API runs at `http://localhost:5000`*

### 2. Start the Frontend Client (Port 5173):
```bash
cd client
npm run dev
```
*Open `http://localhost:5173` in your browser.*

---

## 📡 REST API Endpoints

- `GET /api/health` - Server health status
- `GET /api/stats` - Total events, prize pool, colleges, registrations
- `GET /api/categories` - Categories with live event count
- `GET /api/events` - Query params: `category`, `city`, `mode`, `fee`, `search`, `sortBy`
- `GET /api/events/:id` - Complete event details
- `POST /api/events/:id/register` - Register participant (solo or team)
- `POST /api/events` - Host/publish a new cultural event
