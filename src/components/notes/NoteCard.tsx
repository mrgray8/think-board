import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import type { Note } from "../../types/note";

interface NoteCardProps {
  note: Note;
}

function NoteCard({ note }: NoteCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
      {" "}
      <div className="flex-1">
        <h2 className="line-clamp-2 text-lg font-semibold text-slate-900">
          {note.title}
        </h2>

        <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">
          {note.content}
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-400">
          {new Date(note.updatedAt).toLocaleDateString()}
        </span>

        <Link
          to={`/notes/${note.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 group-hover:text-slate-950"
        >
          View note
          <FiArrowRight
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}

export default NoteCard;
