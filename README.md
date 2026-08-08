# Think Board

A modern, responsive note-taking application built with **React, TypeScript, and Vite**.

Think Board allows users to create, view, edit, delete, search, and organize their notes through a clean and responsive interface.

## Features

### Core Features

- Display all notes
- Create new notes with title and content
- Edit existing notes
- View note details
- Delete notes with confirmation
- Loading and error state management
- Fully responsive design for mobile, tablet, and desktop

### Extra Features

- Search notes by title and content
- Sort notes by:
  - Newest first
  - Oldest first
  - Title A–Z
  - Title Z–A
- Toast notifications for successful and failed operations
- Skeleton loading UI
- Empty states
- Clear search functionality
- Micro-interactions and hover states
- Refresh notes from the API
- Responsive navigation and search experience

## Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **React Router**
- **Axios**
- **Tailwind CSS**
- **React Icons**
- **React Hot Toast**
- **ESLint**

## Project Structure

```text
src/
├── api/
│   ├── axios.ts
│   └── notesApi.ts
│
├── components/
│   ├── layout/
│   │   └── Header.tsx
│   │
│   └── notes/
│       ├── NoteCard.tsx
│       └── NoteCardSkeleton.tsx
│
├── pages/
│   ├── HomePage.tsx
│   ├── CreateNotePage.tsx
│   ├── EditNotePage.tsx
│   └── NoteDetailPage.tsx
│
├── routes/
│   └── AppRouter.tsx
│
├── types/
│   └── note.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

## API

Think Board communicates with a REST API for note management.

The frontend uses **Axios** to communicate with the API and provides the following operations:

```text
GET     /notes
GET     /notes/:id
POST    /notes
PUT     /notes/:id
DELETE  /notes/:id
```

The Axios configuration is located at:

```text
src/api/axios.ts
```

API-specific functions are implemented in:

```text
src/api/notesApi.ts
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mrgray8/think-board.git
cd think-board
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available through the local Vite development server.

## Quality Checks

Run ESLint:

```bash
npm run lint
```

Build the application for production:

```bash
npm run build
```

The project currently passes both **ESLint** and the **TypeScript/Vite production build** successfully.

## Responsive Design

Think Board is designed to work across:

- Mobile
- Tablet
- Laptop
- Desktop

The layout, navigation, search experience, note cards, forms, and controls adapt to different screen sizes.

## User Experience

The interface focuses on providing a simple and intuitive note-taking experience through:

- Clear empty states
- Loading feedback
- Skeleton loading
- Success and error toast notifications
- Delete confirmation
- Search and sorting controls
- Responsive layouts
- Hover and active interactions
- Disabled states during asynchronous operations
- Clear navigation between pages

## Project Goals

This project was built as a frontend mini-project with a focus on:

- Component-based architecture
- Type-safe development with TypeScript
- REST API integration
- React state management
- Responsive UI design
- User experience
- Loading and error handling
- Maintainable project structure
- Clean and reusable components

## Current Status

**Status: Completed**

Think Board includes all required note-management functionality along with additional UX improvements.

### Requirements Checklist

#### Core Features

- [x] Display notes
- [x] Create notes
- [x] Edit notes
- [x] Delete notes
- [x] View note details
- [x] Loading and error states
- [x] Responsive design

#### Bonus Features

- [x] Toast notifications
- [x] Delete confirmation
- [x] Search
- [x] Sorting
- [x] Skeleton loading
- [x] Empty states and UX improvements

---

Built with determination using React + TypeScript.
