'use client';

import { Download, UploadCloud, Settings, Link } from 'lucide-react';

export default function DashboardControls() {
  return (
    <div className="bg-white p-4 border border-1 border-gray-200 mb-12">
      <h3 className="text-md font-bold text-black mb-4">⚙️ Group Controls</h3>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Update Logo */}
        <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
          <UploadCloud className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Update Logo</span>
        </button>

        {/* Update Platform Links */}
        <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
          <Settings className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Update Telegram / Discord</span>
        </button>

        {/* Withdraw Funds */}
        <button className="flex items-center gap-2 border border-green-500 text-green-700 px-4 py-2 rounded-md hover:bg-green-50">
          <Download className="w-4 h-4" />
          <span className="text-sm font-semibold">Withdraw Funds</span>
        </button>

        {/* Download CSV */}
        <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
          <Download className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Export Subscriber CSV</span>
        </button>

        {/* Invite Link */}
        <button className="flex items-center gap-2 border border-blue-500 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-50">
          <Link className="w-4 h-4" />
          <span className="text-sm font-semibold">Copy Referral Link</span>
        </button>
      </div>
    </div>
  );
}
