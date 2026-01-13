'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import GroupHeader from './GroupHeader';
import GroupAbout from './GroupAbout';
import GroupInfoCards from './GroupInfoCards';
import EditGroupModal from './EditGroupModal';
import { getStatusDisplay } from './groupHelpers';

export default function GroupOverview({ profile }) {
    const router = useRouter();
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const [group, setGroup] = useState(profile);
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => setGroup(profile), [profile]);

    const statusDisplay = getStatusDisplay(group?.groupStatus);
    const logoSrc = group?.logoUrl ? `${apiBase}${group.logoUrl}` : '';
    const bannerSrc = group?.bannerUrl ? `${apiBase}${group.bannerUrl}` : '';

    const handleLogout = () => {
        localStorage.removeItem('groupToken');
        router.push('/group-login');
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-3 mb-3 overflow-hidden font-rhm">
                <div className="p-4 md:p-5 border-b border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <GroupHeader
                            bannerSrc={bannerSrc}
                            logoSrc={logoSrc}
                            statusDisplay={statusDisplay}
                            onEdit={() => setOpenEdit(true)}
                            onLogout={handleLogout}
                        />
                        <GroupAbout group={group} statusDisplay={statusDisplay} />
                    </div>
                </div>

                <GroupInfoCards group={group} />
            </div>

            <EditGroupModal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                initialGroup={group}
                onSaved={(updated) => setGroup(updated)}
                apiBase={apiBase}
            />
        </>
    );
}
