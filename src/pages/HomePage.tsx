import { useEffect, useMemo, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { getNotes } from "../api/notesApi";
import Header from "../components/layout/Header";
import NoteCard from "../components/notes/NoteCard";
import type { Note } from "../types/note";
import NoteCardSkeleton from "../components/notes/NoteCardSkeleton";
import type { NoteSortOption } from "../types/note";
import { Link } from "react-router-dom";
import { FiFileText, FiPlus, FiSearch } from "react-icons/fi";

function HomePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<NoteSortOption>("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadNotes() {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getNotes();

      if (!data.success) {
        throw new Error("Failed to fetch notes.");
      }

      setNotes(data.response);
    } catch {
      setError("Unable to load notes.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchNotes() {
      try {
        const data = await getNotes();

        if (!data.success) {
          throw new Error("Failed to fetch notes.");
        }

        if (isMounted) {
          setNotes(data.response);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setError("Unable to load notes.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchNotes();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredNotes = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = normalizedQuery
      ? notes.filter((note) => {
          const title = note.title.toLowerCase();
          const content = note.content.toLowerCase();

          return (
            title.includes(normalizedQuery) || content.includes(normalizedQuery)
          );
        })
      : [...notes];

    filtered.sort((a, b) => {
      switch (sortOption) {
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

        case "title-asc":
          return a.title.localeCompare(b.title);

        case "title-desc":
          return b.title.localeCompare(a.title);

        case "newest":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return filtered;
  }, [notes, searchQuery, sortOption]);

  if (isLoading && notes.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <section>
            <div className="mb-6">
              <div className="h-8 w-32 animate-pulse rounded-lg bg-slate-200" />

              <div className="mt-2 h-4 w-20 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <NoteCardSkeleton key={index} />
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (error && notes.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-white p-6">
            <h1 className="text-lg font-semibold text-slate-900">
              Something went wrong
            </h1>

            <p className="mt-2 text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={loadNotes}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <FiRefreshCw aria-hidden="true" />
              Try again
            </button>
          </div>
        </main>
      </div>
    );
  }

  const hasSearchQuery = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {" "}
        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                {" "}
                Your Notes
              </h1>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {hasSearchQuery
                  ? filteredNotes.length > 0
                    ? `${filteredNotes.length} ${
                        filteredNotes.length === 1 ? "note" : "notes"
                      } found for "${searchQuery.trim()}".`
                    : `No notes matched "${searchQuery.trim()}". Try another keyword.`
                  : notes.length > 0
                    ? `${notes.length} ${
                        notes.length === 1 ? "note" : "notes"
                      } on your board.`
                    : "Start building your personal board by creating your first note."}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="sr-only" htmlFor="sort-notes">
                Sort notes
              </label>

              <select
                id="sort-notes"
                value={sortOption}
                onChange={(event) =>
                  setSortOption(event.target.value as NoteSortOption)
                }
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title-asc">Title A–Z</option>
                <option value="title-desc">Title Z–A</option>
              </select>

              <button
                type="button"
                onClick={loadNotes}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
              >
                <FiRefreshCw
                  aria-hidden="true"
                  className={isLoading ? "animate-spin" : ""}
                />
                {isLoading ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-5 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-red-600">{error}</p>

              <button
                type="button"
                onClick={loadNotes}
                disabled={isLoading}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiRefreshCw
                  aria-hidden="true"
                  className={isLoading ? "animate-spin" : ""}
                />
                Try again
              </button>
            </div>
          )}

          {filteredNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                {hasSearchQuery ? (
                  <FiSearch aria-hidden="true" className="text-xl" />
                ) : (
                  <FiFileText aria-hidden="true" className="text-xl" />
                )}
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-900">
                {hasSearchQuery ? "No notes found" : "No notes yet"}
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {hasSearchQuery
                  ? "We couldn't find any notes matching your search. Try another keyword."
                  : "Start building your personal board by creating your first note."}
              </p>

              {hasSearchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
                >
                  Clear search
                </button>
              ) : (
                <Link
                  to="/notes/new"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
                >
                  <FiPlus aria-hidden="true" />
                  Create your first note
                </Link>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default HomePage;
