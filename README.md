# 🧠 PuzzleVerse – Daily Logic Puzzle Engine

PuzzleVerse is a fully-featured **daily logic puzzle web application** built using modern frontend technologies.  
It generates a deterministic puzzle every day, tracks user streaks, calculates performance-based scores, and supports both Google authentication and guest mode.

This project demonstrates advanced frontend architecture, client-side persistence, authentication, gamification systems, and performance optimization.

---

## ✨ Core Features

### 🔐 Authentication
- Google Login (Firebase Authentication)
- Continue as Guest mode
- Persistent login session
- User-specific daily progress storage

---

### 🧩 Puzzle Engine

Supports **5 Dynamic Puzzle Types:**
- Number Grid
- Missing Number
- Odd One Out
- Word Scramble
- Logic Truth Evaluation

Features:
- Date-based deterministic seed generation
- Validator engine per puzzle type
- Client-side solution verification
- No server dependency for puzzle validation

---

### 📅 Daily Reset Mechanism
- Puzzle changes automatically based on current date
- Development date override support
- User progress resets daily
- Streak logic preserved across sessions

---

### 🔥 Streak System
- Tracks consecutive completed days
- Resets if a day is missed
- Stored using IndexedDB
- User-specific streak tracking

---

### 🎯 Scoring Algorithm

Score is calculated **only on first correct submission**

Factors:
- Time taken
- Number of attempts
- Hints used

Designed to encourage:
- Skill
- Speed
- Consistency

---

### 💡 Hint System
- Maximum 3 hints per puzzle
- Puzzle-type specific hints
- Stored per user per day
- Fully client-side implementation

---

### 💾 Client-Side Storage
Uses IndexedDB for:
- Progress
- Hint usage
- Streak data

Fully offline-capable architecture.

---

### 🎨 UI & UX
- Framer Motion animations
- Smooth puzzle transitions
- Responsive (mobile-first) design
- Animated feedback system
- Clean, modern interface

---

### ⚡ Performance Optimization
- Lazy-loaded components
- Code splitting
- Memoization
- Efficient state management

---

### 📦 Testing
Tested with:
- Vitest
- React Testing Library

High coverage across:
- Puzzle engine
- Hint system
- Score engine
- Daily logic
- Storage layer

---

## 🛠 Tech Stack

- React
- Vite
- Firebase Authentication
- IndexedDB
- Framer Motion
- Tailwind CSS (optional styling layer)
- Vitest
- Modular Puzzle Engine Architecture

---

## 🧱 Architecture Highlights

- Deterministic daily puzzle generation using seeded randomness
- Fully client-managed scoring and validation
- Per-user, per-day storage keys
- Clean separation of:
  - Puzzle logic layer
  - Storage layer
  - UI layer
  - Engagement systems

---

## 🎯 Why This Project Is Strong

This project demonstrates:

- Advanced frontend architecture
- Scalable puzzle engine design
- Gamification systems
- Authentication integration
- Client-side database usage
- Performance optimization
- Production-ready structure


## 👨‍💻 Author

Built with ❤️ by Atharva
