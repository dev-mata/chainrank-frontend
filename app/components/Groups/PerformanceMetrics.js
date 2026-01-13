'use client';

export default function PerformanceMetrics() {
  const metrics = [
    { label: 'Subscribers', value: '245' },
    { label: 'Monthly Revenue', value: '$2,450' },
    { label: 'Rating', value: '⭐ 4.8 (89)' },
    { label: 'Impressions', value: '6,120' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="border border-gray-200 p-3 text-center rounded-md">
            <p className="text-xs text-gray-500 font-rhm">{m.label}</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
