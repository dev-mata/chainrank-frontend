export default function TallyStats() {
  const stats = [
    { value: '9,034', label: 'Communities' },
    { value: '21,034', label: 'Memberships Sold' },
  ];

  return (
    <div className="bg-green-50 py-8 px-4 flex items-center justify-center gap-8 text-center">
      {stats.map((stat, index) => (
        <div key={index}>
          <div className="text-4xl font-bold text-gray-700 tracking-wide">
            {stat.value}
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-1 align-middle"></span>
          </div>
          <p className="text-sm text-gray-700 mt-2 font-rhm font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
