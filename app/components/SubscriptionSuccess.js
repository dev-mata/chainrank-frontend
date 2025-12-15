'use client';
import Image from 'next/image';

export default function SubscriptionSuccess() {
    return (
        <div className="h-screen bg-[#e5004d] flex flex-col items-center justify-center text-white px-4 text-center">
            <Image
                src="/icons/success-avatar.png"
                alt="Success Avatar"
                width={80}
                height={80}
                className="rounded-full mb-6"
            />

            <h2 className="text-lg font-semibold">Success!</h2>

            <h1 className="text-2xl font-bold mt-2 leading-tight">
                You have <br />
                successfully <br />
                subscribe the <br />
                channel!
            </h1>

            <p className="text-sm mt-4 text-white/80">
                The channel administrator will connect with <br /> you shortly. Have a blast!
            </p>

            <a href="#" className="text-sm mt-8 underline text-white/90 hover:text-white">
                How it works?
            </a>
        </div>
    );
}
