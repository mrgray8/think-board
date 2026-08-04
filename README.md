# Think Board

A modern, responsive note-taking application built with **React, TypeScript, and Vite**.

Think Board allows users to create, view, edit, delete, search, and organize their notes through a clean and responsive interface.

## Features

### Core Features

- Display all notes
- Create new notes
- Edit existing notes
- View note details
- Delete notes with confirmation
- Loading and error state management
- Fully responsive design for mobile, tablet, and desktop

### Extra Features

- Search notes by title and content
- Sort notes by:
  - Newest
  - Oldest
  - Title A–Z
  - Title Z–A
- Toast notifications for success and error states
- Skeleton loading UI
- Empty states
- Clear search functionality
- Micro-interactions and hover states
- Refresh notes from the API
- Responsive navigation and search experience

## Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **React Router**
- **Axios**
- **Tailwind CSS**
- **React Icons**
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
│   ├── notes/
│   │   ├── NoteCard.tsx
│   │   └── NoteCardSkeleton.tsx
│   └── ui/
│       ├── Toast.tsx
│       └── ToastContainer.tsx
│
├── context/
│   ├── toastContext.ts
│   └── ToastProvider.tsx
│
├── hooks/
│   └── useToast.ts
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
│   ├── note.ts
│   └── toast.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

## API

Think Board communicates with a REST API for note management.

The frontend uses Axios and provides API operations for:

```text
GET     /notes
GET     /notes/:id
POST    /notes
PUT     /notes/:id
DELETE  /notes/:id
```

The API base URL is configured in:

```text
src/api/axios.ts
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

Build the application:

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

The layout, search experience, navigation, note cards, forms, and controls adapt to different screen sizes.

## Project Goals

This project was built as a frontend mini-project with a focus on:

- Component-based architecture
- Type-safe development with TypeScript
- API integration
- React state management
- Responsive UI design
- User experience
- Error and loading handling
- Maintainable project structure

## Current Status

**Status: Completed**

Implemented functionality includes the required note management features as well as additional UX improvements such as search, sorting, toast notifications, skeleton loading, confirmation dialogs, empty states, and responsive UI.

---

Built with determination using React + TypeScript.
