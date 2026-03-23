# InfiniteScrolls 🏨

A Next.js application that demonstrates infinite scrolling using the Intersection Observer API, powered by a mock REST API via `json-server`.

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- JSON Server (mock backend)

---

## 📦 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or above)
- npm

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/anbalaganashok2455/InfiniteScrolls.git
cd InfiniteScrolls
```

### 2. Install Dependencies

```bash
npm install
```

---

## 🗄️ Running the Mock API Server

This project uses `json-server` to serve hotel data from a local JSON file.

### Start the JSON Server

```bash
npx json-server --watch hotel_2000.json --port 3001
```

The API will be available at:

```
http://localhost:3001/hotels
```

> ⚠️ Make sure `hotel_2000.json` is present in the root of the project before starting the server.

---

## 💻 Running the Next.js App

Open a **new terminal** (keep the JSON server running) and run:

### Development Mode

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

---

## 🔄 Running Both Together (Quick Start)

Open **two terminals** and run:

| Terminal 1 (API Server)                                      | Terminal 2 (Next.js App) |
| ------------------------------------------------------------ | ------------------------ |
| `npx json-server --watch hotel_2000.json --port 3001`        | `npm run dev`            |

---



## ⚙️ How It Works

1. The app fetches hotels from `json-server` in pages of **20 items** at a time.
2. An **Intersection Observer** watches a sentinel `div` at the bottom of the list.
3. When the sentinel comes into view, the next page is fetched automatically.
4. Fetching stops when all hotels have been loaded.

---

## 📝 Notes

- The JSON server must be running on port `3001` before starting the Next.js app.
- Duplicate entries are automatically filtered using hotel `id`.
