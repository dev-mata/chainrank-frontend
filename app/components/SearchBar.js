'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SearchBar({ communities }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredCommunities, setFilteredCommunities] = useState([]);
  const searchRef = useRef(null);
  
  // Base URL for logo images
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter communities based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCommunities([]);
      setShowResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = communities.filter((community) => {
      return (
        community.groupName?.toLowerCase().includes(query) ||
        community.category?.toLowerCase().includes(query) ||
        community.subCategory?.toLowerCase().includes(query) ||
        community.description?.toLowerCase().includes(query) ||
        community.country?.toLowerCase().includes(query)
      );
    });

    setFilteredCommunities(results);
    setShowResults(true);
  }, [searchQuery, communities]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
  };

  const handleResultClick = () => {
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto px-4 font-rhm mt-6">
      <div className="bg-white border border-gray-300 rounded-md px-4 py-3 shadow-md flex items-center justify-between">
        <input
          type="text"
          placeholder="Search for communities in trading, sports etc"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setShowResults(true)}
          className="w-full outline-none bg-transparent text-gray-800 text-xs font-mono placeholder:text-gray-400"
        />
        {searchQuery ? (
          <X
            className="w-5 h-5 text-gray-600 ml-2 cursor-pointer hover:text-gray-800"
            onClick={handleClearSearch}
          />
        ) : (
          <Search className="w-5 h-5 text-gray-600 ml-2" />
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
          {filteredCommunities.length > 0 ? (
            <div className="py-2">
              {filteredCommunities.map((community) => {
                const logoSrc = community.logoUrl
                  ? (community.logoUrl.startsWith('http')
                      ? community.logoUrl
                      : `${baseUrl}${community.logoUrl}`)
                  : '/fallback-logo.jpg';
                
                return (
                <Link
                  key={community._id}
                  href={`/community/${community._id}`}
                  onClick={handleResultClick}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  {/* Community Logo */}
                  <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={logoSrc}
                      alt={community.groupName}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>

                  {/* Community Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {community.groupName}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {community.category} • {community.subCategory}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      ${community.price}/month
                    </p>
                  </div>
                </Link>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No communities found</p>
              <p className="text-xs text-gray-400 mt-1">
                Try searching with different keywords
              </p>
            </div>
          )}
        </div>
      )}

      {/* Subtle shadow layer below */}
      <div className="absolute bottom-0 left-1 right-1 h-1 rounded-b-md z-[-1]"></div>
    </div>
  );
}