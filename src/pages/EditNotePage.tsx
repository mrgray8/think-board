import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { getNoteById, updateNote } from "../api/notesApi";
import Header from "../components/layout/Header";
import toast from "react-hot-toast";

function EditNotePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const noteId = id;
    let isMounted = true;

    async function loadNote() {
      try {
        const data = await getNoteById(noteId);

        if (!data.success) {
          throw new Error("Failed to fetch note.");
        }

        if (!isMounted) {
          return;
        }

        setTitle(data.response.title);
        setContent(data.response.content);
      } catch {
        if (isMounted) {
          setError("Unable to load note.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadNote();

    return () => {
      isMounted = false;
    };
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!id) {
      setError("Note ID is missing.");
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      setError("Title and content are required.");
      toast.error("Title and content are required.");
      return;
    }

    if (trimmedContent.length < 10) {
      setError("Content must be at least 10 characters.");
      toast.error("Content must be at least 10 characters.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const data = await updateNote(id, {
        title: trimmedTitle,
        content: trimmedContent,
      });

      if (!data.success) {
        throw new Error("Failed to update note.");
      }

      toast.success("Note updated successfully!");
      navigate(`/notes/${data.response.id}`);

      navigate(`/notes/${data.response.id}`);
    } catch {
      setError("Unable to update note. Please try again.");
      toast.error("Unable to update note. Please try again.");
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />

        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">Loading note...</p>
        </main>
      </div>
    );
  }

  if (error && !title && !content) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />

        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </p>

          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <FiArrowLeft aria-hidden="true" />
            Back to notes
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to={`/notes/${id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <FiArrowLeft aria-hidden="true" />
          Back to note
        </Link>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Edit note
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Update your note and save your changes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter note title..."
                disabled={isSubmitting}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Content
              </label>

              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Write your note..."
                rows={10}
                disabled={isSubmitting}
                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
              <Link
                to={`/notes/${id}`}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiSave aria-hidden="true" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default EditNotePage;
