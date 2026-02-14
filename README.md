🧠 PuzzleVerse – Daily Logic Puzzle Engine
PuzzleVerse is a fully-featured daily puzzle web application built with React and modern web technologies.
It delivers a new deterministic puzzle every day, tracks user streaks, calculates performance-based scores, and supports both Google authentication and guest mode.

This project demonstrates advanced frontend architecture, client-side persistence, authentication, and gamified engagement systems.

✨ Core Features

🔐 Authentication
Google Login (Firebase)
Continue as Guest mode
Persistent login session
User-specific daily progress storage

🧩 Puzzle Engine

5 Dynamic Puzzle Types:
Number Grid
Missing Number
Odd One Out
Word Scramble
Logic Truth Evaluation

Date-based deterministic seed generation
Validator engine per puzzle type
Client-side solution verification

📅 Daily Reset Mechanism
Puzzle changes automatically based on date
Supports development date override
User progress resets per day
Streak logic preserved across sessions

🔥 Streak System
Tracks consecutive completed days
Resets if a day is missed
Stored using IndexedDB
User-specific streak tracking

🎯 Scoring Algorithm
Score calculated only on first correct submission:

Factors:
Time taken
Number of attempts
Hints used
Encourages skill, speed, and consistency.

💡 Hint System

Max 3 hints per puzzle
Puzzle-type specific hints
Stored per user per day
No server dependency

💾 Client-Side Storage

IndexedDB for:
Progress
Hints
Streak data
Fully offline-capable architecture

🎨 UI & UX

Framer Motion animations
Smooth puzzle transitions
Responsive design (mobile-first)
Animated feedback
Clean modern interface

⚡ Performance Optimization

Lazy-loaded components
Code splitting
Memoization
Efficient state management

📦 Testing

Vitest + React Testing Library
High coverage across:
Puzzle engine
Hint system
Score engine
Daily logic
Storage layer

🛠 Tech Stack

React
Vite
Firebase Authentication
IndexedDB
Framer Motion
Vitest
Tailwind CSS (optional styling layer)
Modular Puzzle Engine Architecture

🧱 Architecture Highlights

Deterministic daily puzzle generation using seeded randomness
Fully client-managed scoring and validation
Per-user per-day storage keys
Clean separation of:
Puzzle logic
Storage layer
UI layer

Engagement systems

🎯 Why This Project Is Strong

This project demonstrates:

Advanced frontend architecture
Scalable puzzle engine design
Gamification systems
Authentication integration
Client-side database usage
Performance optimization
Production-ready structure