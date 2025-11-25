
import { useState } from 'react';
import { Search, Menu, User } from 'lucide-react';
import Logo from '../Logo';

export default function GroupBoardHeader({ onSearch, searchQuery }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Optional: trigger search on submit if you want special behavior
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-2 md:gap-3">


          <div className="flex items-center">
            <span className="text-base md:text-lg font-bold tracking-tight text-rose-500">
              <Logo />
            </span>
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md hidden sm:block">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div
              className={`
                flex items-center gap-2
                px-3 py-1.5
                border rounded-full
                bg-white
                text-sm
                transition-all duration-200
                ${isSearchFocused
                  ? 'border-rose-400 shadow-[0_0_0_1px_rgba(244,63,94,0.4)]'
                  : 'border-gray-300'
                }
              `}
            >
              <Search className="w-4 h-4 text-gray-500" />

              <input
                type="text"
                placeholder="Search groups..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="
                  flex-1 bg-transparent outline-none
                  text-sm text-gray-800 font-rhm
                  placeholder:text-gray-400
                "
              />
            </div>
          </form>
        </div>

        {/* Right: Nav + CTAs */}
        <div className="flex items-center gap-2 md:gap-3">
          <nav className="hidden md:flex items-center gap-3 text-sm font-rhm">
            <a
              href="/api"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Browse
            </a>
            <a
              href="/login"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Sign in
            </a>
          </nav>

          <button
            type="button"
            className="
              hidden sm:inline-flex items-center
              border border-black
              bg-rose-300 text-black
              font-rhm font-semibold text-xs md:text-sm
              px-3 md:px-4 py-1.5
              shadow-[3px_3px_0px_rgba(0,0,0,1)]
              hover:bg-rose-400
              hover:shadow-[5px_5px_0px_rgba(0,0,0,1)]
              transition-all duration-200
            "
          >
            Start selling
          </button>

          <button
            type="button"
            className="
              inline-flex items-center justify-center
              w-9 h-9
              border border-gray-300 rounded-full
              bg-white
              hover:bg-rose-50 hover:border-gray-400
              transition-colors
            "
          >
            <User size={18} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile search under header */}
      <div className="sm:hidden border-t border-gray-200 px-4 pb-3 pt-2">
        <form onSubmit={handleSearchSubmit} className="w-full">
          <div
            className={`
              flex items-center gap-2
              px-3 py-1.5
              border rounded-full
              bg-white
              text-sm
              transition-all duration-200
              ${isSearchFocused
                ? 'border-rose-400 shadow-[0_0_0_1px_rgba(244,63,94,0.4)]'
                : 'border-gray-300'
              }
            `}
          >
            <Search className="w-4 h-4 text-gray-500" />

            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="
                flex-1 bg-transparent outline-none
                text-sm text-gray-800 font-rhm
                placeholder:text-gray-400
              "
            />
          </div>
        </form>
      </div>
    </header>
  );
}
