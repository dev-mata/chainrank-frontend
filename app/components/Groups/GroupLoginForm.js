'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '../Logo';
import SocialSection from '../SocialSection';

export default function GroupLoginForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');

        if (!email.trim() || !password.trim()) {
            setEmailError(!email.trim());
            setApiError('Please fill in all fields');
            return;
        }

        setLoading(true);


        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            const res = await fetch(`${apiBaseUrl}/api/groups/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setApiError(data.error || 'Login failed');
                return;
            }

            // Save token to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('groupToken', data.token);
            }

            // Redirect to group dashboard
            router.push('/group-dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setApiError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="min-h-screen bg-slate-50 text-black">
            <div className="mx-auto flex min-h-screen w-full max-w-8xl items-stretch">
                {/* Left: Marketing / Image */}
                <div className="relative hidden w-1/2 overflow-hidden lg:block">
                    {/* Image placeholder (swap later) */}
                    {/* <div className="absolute inset-0 bg-gradient-to-br from-[#E31950] to-rose-700" /> */}
                    {/* Optional: replace this div with an <Image/> later */}
                    <img src="/grp-bg.jpeg" className="absolute inset-0 h-full w-full object-cover" alt="" />

                    {/* Overlay content */}
                    <div className="relative z-10 flex h-full flex-col justify-end p-12 text-white font-rhm">
                        <div className="max-w-md">
                            <div className="text-4xl font-bold leading-tight">
                                Welcome back to <span className="underline decoration-white/40">Your Brand</span>
                            </div>
                            <p className="mt-4 text-white/90">
                                Sign in to manage your groups, members, and payments—fast and securely.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2">
                    <div className="w-full max-w-md">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="mb-6 flex justify-center">
                                <Logo />
                            </div>

                            <h1 className="text-center text-2xl font-semibold text-slate-900">
                                Sign in to your account
                            </h1>
                            <p className="mt-2 text-center text-sm text-slate-600">
                                Welcome back — please enter your details.
                            </p>
                        </div>

                        {/* Card container for your form */}
                        <div className=" bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
                            {/* Put your existing <form> here */}


                            <form className="space-y-3" onSubmit={handleSubmit}>
                                {/* API error */}
                                {apiError && (
                                    <div className="mb-2 bg-red-100 text-red-700 text-sm px-3 py-2 font-rhm">
                                        {apiError}
                                    </div>
                                )}

                                {/* Email Field */}
                                <div>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`mt-1   block w-full px-4 py-3 border  focus:outline-none placeholder-gray-400 font-rhm ${emailError ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setEmailError(false);
                                        }}
                                        placeholder="joe@domain.com"
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            className="block w-full px-4 py-3 border border-gray-300 text-rose-700 focus:outline-none"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-300"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    <div className="flex justify-end items-center">
                                        <a
                                            href="#"
                                            className="text-sm text-gray-900 hover:text-black mt-2 font-rhm justify-end"
                                        >
                                            <span>Forgot Password?</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 mt-10">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full border border-1 font-rhm bg-rose-300 text-black font-semibold text-sm px-4 py-3 shadow-[5px_5px_0px_rgba(0,0,0,1)] disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Logging in...' : 'Login'}
                                    </button>

                                    <a
                                        href="/group-register"
                                        className="w-full text-center border border-1 font-rhm bg-white text-black font-semibold text-sm px-4 py-3 shadow-[5px_5px_0px_rgba(0,0,0,1)]"
                                    >
                                        Register as a Group
                                    </a>
                                </div>
                            </form>

                        </div>

                        {/* Footer links (optional) */}
                        <div className="mt-6 text-center text-sm text-slate-600">
                            Don’t have an account?{" "}
                            <a href="/group-register" className="font-medium text-[#E31950] hover:underline">
                                Register
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
