export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotesResponse {
  success: boolean;
  response: Note[];
  status: number;
}

export interface NoteResponse {
  success: boolean;
  response: Note;
  status: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
}

export interface UpdateNotePayload {
  title: string;
  content: string;
}

export type NoteSortOption = "newest" | "oldest" | "title-asc" | "title-desc";
