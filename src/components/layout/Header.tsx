import { FiPlus, FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

function Header({ searchQuery = "", onSearchChange }: HeaderProps) {
  const isSearchEnabled = Boolean(onSearchChange);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="shrink-0 text-xl font-bold tracking-tight text-slate-900"
        >
          Think Board
        </Link>

        {isSearchEnabled && (
          <div className="order-3 w-full md:order-none md:mx-auto md:w-full md:max-w-md">
            <label className="relative block w-full">
              <FiSearch
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => onSearchChange?.(event.target.value)}
                placeholder="Search notes..."
                aria-label="Search notes"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange?.("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                >
                  <FiX aria-hidden="true" />
                </button>
              )}
            </label>
          </div>
        )}

        <Link
          to="/notes/new"
          className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 active:scale-[0.98]"
        >
          <FiPlus aria-hidden="true" />
          <span className="hidden sm:inline">New Note</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
