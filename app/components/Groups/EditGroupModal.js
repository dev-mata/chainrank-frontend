'use client';

import { useEffect, useMemo, useState } from 'react';
import { Loader2, Save, X } from 'lucide-react';
import { buildChangedPayload, isValidUrlOrEmpty, normalizeInitial } from './groupHelpers';

function FieldLabel({ children }) {
    return <p className="text-xs font-medium text-gray-600 mb-1">{children}</p>;
}

function TextInput({ value, onChange, placeholder, type = 'text' }) {
    return (
        <input
            type={type}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
    );
}

function TextArea({ value, onChange, placeholder }) {
    return (
        <textarea
            className="w-full min-h-[120px] rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
    );
}

export default function EditGroupModal({ open, onClose, initialGroup, onSaved, apiBase }) {
    const [form, setForm] = useState(normalizeInitial(initialGroup));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const initial = useMemo(() => normalizeInitial(initialGroup), [initialGroup]);

    useEffect(() => {
        if (!open) return;
        setForm(normalizeInitial(initialGroup));
        setSaving(false);
        setError('');
        setSuccess('');
    }, [open, initialGroup]);

    const handleSave = async () => {
        try {
            setError('');
            setSuccess('');

            if (!form.groupName.trim()) return setError('Group name is required.');
            if (!isValidUrlOrEmpty(form.telegramLink)) return setError('Telegram link must be a valid URL.');
            if (!isValidUrlOrEmpty(form.discordLink)) return setError('Discord link must be a valid URL.');

            const payload = buildChangedPayload(form, initial);
            if (Object.keys(payload).length === 0) {
                setSuccess('No changes to save.');
                return;
            }

            const token = localStorage.getItem('groupToken');
            if (!token) return setError('Missing group token. Please login again.');

            setSaving(true);

            // IMPORTANT: change "/group" if your backend path differs
            const res = await fetch(`${apiBase}/api/groups/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) {
                setSaving(false);
                return setError(data?.message || data?.error || 'Failed to update group.');
            }

            setSaving(false);
            setSuccess('Saved successfully.');
            if (data?.group) onSaved(data.group);

            setTimeout(() => onClose(), 450);
        } catch (e) {
            setSaving(false);
            setError(e?.message || 'Something went wrong.');
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <button onClick={onClose} className="absolute inset-0 bg-black/40" aria-label="Close" />

            <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                    <div>
                        <p className="text-sm font-semibold text-gray-900">Edit group info</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Update your public profile details. Only changed fields will be saved.
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Close">
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
                    )}
                    {success && (
                        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <FieldLabel>Group name</FieldLabel>
                            <TextInput value={form.groupName} onChange={(v) => setForm((s) => ({ ...s, groupName: v }))} />
                        </div>

                        <div>
                            <FieldLabel>Price (monthly)</FieldLabel>
                            <TextInput type="number" value={form.price} onChange={(v) => setForm((s) => ({ ...s, price: v }))} />
                        </div>

                        <div>
                            <FieldLabel>Category</FieldLabel>
                            <TextInput value={form.category} onChange={(v) => setForm((s) => ({ ...s, category: v }))} />
                        </div>

                        <div>
                            <FieldLabel>Sub-category</FieldLabel>
                            <TextInput value={form.subCategory} onChange={(v) => setForm((s) => ({ ...s, subCategory: v }))} />
                        </div>

                        <div>
                            <FieldLabel>Telegram link</FieldLabel>
                            <TextInput value={form.telegramLink} onChange={(v) => setForm((s) => ({ ...s, telegramLink: v }))} />
                        </div>

                        <div>
                            <FieldLabel>Discord link</FieldLabel>
                            <TextInput value={form.discordLink} onChange={(v) => setForm((s) => ({ ...s, discordLink: v }))} />
                        </div>
                    </div>

                    <div>
                        <FieldLabel>Description</FieldLabel>
                        <TextArea value={form.description} onChange={(v) => setForm((s) => ({ ...s, description: v }))} />
                    </div>
                </div>

                <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200 bg-gray-50">
                    <button onClick={onClose} className="text-sm font-medium text-gray-700 hover:text-gray-900" disabled={saving}>
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="inline-flex items-center gap-2 rounded-lg bg-gray-900 text-white px-4 py-2 text-sm font-semibold hover:bg-gray-800 disabled:opacity-60"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Saving...' : 'Save changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}
