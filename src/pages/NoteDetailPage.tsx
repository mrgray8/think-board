import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiEdit2, FiTrash2 } from "react-icons/fi";
import { deleteNote, getNoteById } from "../api/notesApi";
import type { Note } from "../types/note";
import Header from "../components/layout/Header";

function NoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    async function loadNote(noteId: string) {
      try {
        setError(null);

        const data = await getNoteById(noteId);

        if (!data.success) {
          throw new Error("Failed to fetch note.");
        }

        setNote(data.response);
      } catch {
        setError("Unable to load this note.");
      } finally {
        setIsLoading(false);
      }
    }

    loadNote(id);
  }, [id]);

  async function handleDelete() {
    if (!id || !note) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);

      await deleteNote(id);

      navigate("/");
    } catch {
      setError("Unable to delete this note.");
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />

        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">Loading note...</p>
        </main>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />

        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <FiArrowLeft aria-hidden="true" />
            Back to notes
          </Link>

          <div className="rounded-2xl border border-red-200 bg-white p-6">
            <h1 className="text-lg font-semibold text-slate-900">
              Something went wrong
            </h1>

            <p className="mt-2 text-sm text-red-600">
              {error ?? "Note not found."}
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <FiArrowLeft aria-hidden="true" />
          Back to notes
        </Link>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {note.title}
            </h1>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                to={`/notes/${note.id}/edit`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <FiEdit2 aria-hidden="true" />
                <span className="hidden sm:inline">Edit</span>
              </Link>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiTrash2 aria-hidden="true" />
                <span className="hidden sm:inline">
                  {isDeleting ? "Deleting..." : "Delete"}
                </span>
              </button>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
            <span>Created: {new Date(note.createdAt).toLocaleString()}</span>

            <span>Updated: {new Date(note.updatedAt).toLocaleString()}</span>
          </div>

          <div className="whitespace-pre-wrap text-base leading-7 text-slate-700">
            {note.content}
          </div>
        </article>
      </main>
    </div>
  );
}

export default NoteDetailPage;
