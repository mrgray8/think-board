function NoteCardSkeleton() {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex-1">
        <div className="h-6 w-3/4 animate-pulse rounded-lg bg-slate-200" />

        <div className="mt-4 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />

        <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
      </div>
    </article>
  );
}

export default NoteCardSkeleton;
