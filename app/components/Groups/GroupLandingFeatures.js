import { Zap, Globe, Chrome } from 'lucide-react'; // Using lucide icons for this example

export default function GroupLandingFeatures() {
    const features = [
        {
            title: 'Speed up your transactions',
            description:
                'Process payments seamlessly in real-time, with optimized throughput to ensure lightning-fast transactions.',
            icon: <Zap className="w-6 h-6 text-[#E8144E]" />,
        },
        {
            title: 'International Reach',
            description:
                'Click the blue button on LinkedIn or XING to see enriched data about the person, including verified contact info.',
            icon: <Globe className="w-6 h-6 text-[#E8144E]" />,
        },
        {
            title: 'Click Add to Chrome',
            description:
                'It really is as simple as that. When you click “Add to CRM” profile will be synced to your CRM.',
            icon: <Chrome className="w-6 h-6 text-[#E8144E]" />,
        },
    ];

    return (
        <section className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-br from-white via-white to-[#FDE8EE] border-solid border-1 border-gray-200 p-6 text-left hover:shadow-md transition duration-200"
                    >
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-50  mb-4">
                            {feature.icon}
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600 font-rhm">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
