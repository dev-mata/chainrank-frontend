import { Check } from 'lucide-react';

export default function StepIndicator({ currentStep, totalSteps }) {
    return (
        <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center relative flex-1">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${currentStep > step
                                    ? 'bg-green-500 text-white'
                                    : currentStep === step
                                        ? 'bg-rose-500 text-white'
                                        : 'bg-gray-200 text-gray-500'
                                }`}
                        >
                            {currentStep > step ? <Check className="w-5 h-5" /> : step}
                        </div>
                        <span
                            className={`mt-2 text-xs font-rhm ${currentStep >= step ? 'text-black' : 'text-gray-400'
                                }`}
                        >
                            {step === 1 && 'Group Info'}
                            {step === 2 && 'Password'}
                            {step === 3 && 'Images'}
                        </span>
                    </div>
                    {step < totalSteps && (
                        <div
                            className={`flex-1 h-1 mx-2 transition-all ${currentStep > step ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
