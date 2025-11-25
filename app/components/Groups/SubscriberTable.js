'use client';

export default function SubscriberTable() {
  const subscribers = [
    { name: '@traderx', joined: '1 hr ago', status: 'Paid' },
    { name: '@moonqueen', joined: '3 days ago', status: 'Free Trial' },
    { name: '@crypto_g', joined: '7 days ago', status: 'Expired' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'text-green-600';
      case 'Free Trial':
        return 'text-yellow-600';
      case 'Expired':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white p-4 border border-1 border-gray-200 mb-6">
      <h3 className="text-md font-bold text-black mb-4">Recent Subscribers</h3>

      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-500 border-b border-gray-200">
            <th className="py-2">Username</th>
            <th className="py-2">Joined</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody className="text-black font-rhm">
          {subscribers.map((sub, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="py-2">{sub.name}</td>
              <td className="py-2">{sub.joined}</td>
              <td className={`py-2 font-medium ${getStatusColor(sub.status)}`}>
                {sub.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
