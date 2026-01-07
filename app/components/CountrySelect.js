"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import countries from "@/countries.json"; // adjust path if needed

export default function CountrySelect({
    value,                 // ISO code e.g. "AE"
    onChange,              // (code) => void
    placeholder = "Select country",
    label = "Country",
    required = false,
    disabled = false,
    preferred = ["AE", "US", "GB", "SA"],
    className = "",
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);

    const wrapRef = useRef(null);
    const searchRef = useRef(null);

    const selected = useMemo(
        () => countries.find((c) => c.code === value) || null,
        [value]
    );

    const preferredList = useMemo(() => {
        const set = new Set(preferred);
        return countries.filter((c) => set.has(c.code));
    }, [preferred]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const base = q
            ? countries.filter(
                (c) =>
                    c.name.toLowerCase().includes(q) ||
                    c.code.toLowerCase().includes(q)
            )
            : countries;

        return base;
    }, [query]);

    // Close on outside click
    useEffect(() => {
        const onDown = (e) => {
            if (!wrapRef.current) return;
            if (!wrapRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, []);

    // Focus search when opened
    useEffect(() => {
        if (open) {
            setQuery("");
            setActiveIndex(0);
            setTimeout(() => searchRef.current?.focus(), 0);
        }
    }, [open]);

    const openDropdown = () => {
        if (disabled) return;
        setOpen(true);
    };

    const selectCountry = (code) => {
        onChange?.(code);
        setOpen(false);
    };

    const onKeyDown = (e) => {
        if (!open) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openDropdown();
            }
            return;
        }

        if (e.key === "Escape") {
            setOpen(false);
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        }

        if (e.key === "Enter") {
            e.preventDefault();
            const item = filtered[activeIndex];
            if (item) selectCountry(item.code);
        }
    };

    return (
        <div ref={wrapRef} className={`relative ${className}`}>
            <label className="block text-[11px] md:text-xs font-rhm text-gray-700 mb-1">
                {label} {required ? <span className="text-rose-700">*</span> : null}
            </label>

            {/* Trigger */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => (open ? setOpen(false) : openDropdown())}
                onKeyDown={onKeyDown}
                className={`w-full p-2 text-sm border border-gray-300 bg-gray-50 font-rhm text-left
          focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-300
          ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className={selected ? "text-gray-900" : "text-gray-400"}>
                    {selected ? `${selected.name} (${selected.code})` : placeholder}
                </span>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-2 w-full border border-gray-200 bg-white shadow-lg">
                    {/* Search input */}
                    <div className="p-2 border-b border-gray-100">
                        <input
                            ref={searchRef}
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setActiveIndex(0);
                            }}
                            onKeyDown={onKeyDown}
                            placeholder="Search country..."
                            className="w-full p-2 text-sm border border-gray-200 bg-gray-50 font-rhm focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-300"
                        />
                    </div>

                    <div className="max-h-56 overflow-auto">
                        {/* Preferred section (only when not searching) */}
                        {query.trim() === "" && preferredList.length > 0 && (
                            <>
                                <div className="px-3 py-2 text-[11px] text-gray-500 font-rhm">
                                    Suggested
                                </div>
                                {preferredList.map((c) => (
                                    <button
                                        key={`pref-${c.code}`}
                                        type="button"
                                        onClick={() => selectCountry(c.code)}
                                        className={`w-full px-3 py-2 text-left text-sm font-rhm hover:bg-gray-50
                      ${value === c.code ? "bg-rose-50" : ""}`}
                                    >
                                        {c.name} <span className="text-gray-400">({c.code})</span>
                                    </button>
                                ))}
                                <div className="my-1 border-t border-gray-100" />
                            </>
                        )}

                        {/* Filtered list */}
                        {filtered.length === 0 ? (
                            <div className="px-3 py-3 text-sm text-gray-500 font-rhm">
                                No countries found.
                            </div>
                        ) : (
                            filtered.map((c, idx) => (
                                <button
                                    key={c.code}
                                    type="button"
                                    onClick={() => selectCountry(c.code)}
                                    onMouseEnter={() => setActiveIndex(idx)}
                                    className={`w-full px-3 py-2 text-left text-sm font-rhm hover:bg-gray-50
                    ${idx === activeIndex ? "bg-gray-50" : ""}
                    ${value === c.code ? "bg-rose-50" : ""}`}
                                    role="option"
                                    aria-selected={value === c.code}
                                >
                                    {c.name} <span className="text-gray-400">({c.code})</span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
