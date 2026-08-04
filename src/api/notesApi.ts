import api from "./axios";
import type {
  CreateNotePayload,
  NoteResponse,
  NotesResponse,
  UpdateNotePayload,
} from "../types/note";

export async function getNotes(): Promise<NotesResponse> {
  const response = await api.get<NotesResponse>("/notes");

  return response.data;
}

export async function getNoteById(id: string): Promise<NoteResponse> {
  const response = await api.get<NoteResponse>(`/notes/${id}`);

  return response.data;
}

export async function createNote(
  payload: CreateNotePayload,
): Promise<NoteResponse> {
  const response = await api.post<NoteResponse>("/notes", payload);

  return response.data;
}

export async function updateNote(
  id: string,
  payload: UpdateNotePayload,
): Promise<NoteResponse> {
  const response = await api.put<NoteResponse>(`/notes/${id}`, payload);

  return response.data;
}

export async function deleteNote(id: string): Promise<void> {
  await api.delete(`/notes/${id}`);
}
