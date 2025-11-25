'use client';
import { useState, useEffect } from "react";
import { Menu } from 'lucide-react';
import GroupList from "./GroupList";

export default function DashboardLayout() {
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [pendingGroups, setPendingGroups] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        // Replace with API calls
        setJoinedGroups([
            { id: 1, name: "React Devs", members: 150 },
            { id: 2, name: "Cycling Club", members: 45 },
        ]);
        setPendingGroups([
            { id: 3, name: "Yoga Enthusiasts", members: 20 },
        ]);
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 bg-white shadow-md w-64 p-4 transform md:translate-x-0 transition-transform duration-300 ease-in-out z-20
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                <h2 className="text-xl font-bold mb-6">Dashboard Menu</h2>
                <nav className="flex flex-col gap-3">
                    <a href="#" className="hover:text-blue-600">My Groups</a>
                    <a href="#" className="hover:text-blue-600">Profile</a>
                    <a href="#" className="hover:text-blue-600">Settings</a>
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col md:ml-64 p-4 md:p-8">
                {/* Mobile menu button */}
                <button
                    className="md:hidden mb-4 p-2 bg-white rounded shadow"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <Menu className="w-6 h-6" />
                </button>

                <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Joined Groups</h2>
                    <GroupList groups={joinedGroups} type="joined" />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4">Pending Invitations</h2>
                    <GroupList groups={pendingGroups} type="pending" />
                </section>
            </div>
        </div>
    );
}
