'use client';

export default function PerformanceMetrics() {
  const metrics = [
    { label: 'Subscribers', value: '245' },
    { label: 'Monthly Revenue', value: '$2,450' },
    { label: 'Rating', value: '⭐ 4.8 (89)' },
    { label: 'Impressions', value: '6,120' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-white p-4 border border-1 border-gray-200 text-center"
        >
          <p className="text-sm text-gray-500 font-rhm">{metric.label}</p>
          <p className="text-xl font-bold text-black mt-1">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}
