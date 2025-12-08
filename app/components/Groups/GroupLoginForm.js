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
        <div className="h-screen bg-[#E31950] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center justify-center text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <Logo />
                    </div>

                    <div className="text-3xl font-bold text-white">Let's Sign you in</div>
                    <div className="font-rhm mt-2 text-gray-100">
                        Welcome back! You have been missed
                    </div>
                </div>

                <form className="space-y-3" onSubmit={handleSubmit}>
                    {/* API error */}
                    {apiError && (
                        <div className="mb-2 rounded bg-red-100 text-red-700 text-sm px-3 py-2">
                            {apiError}
                        </div>
                    )}

                    {/* Email Field */}
                    <div>
                        <input
                            type="email"
                            id="email"
                            className={`mt-1 block w-full px-4 py-3 rounded-md border text-white focus:outline-none placeholder-gray-200 ${emailError ? 'border-red-500' : 'border-gray-100'
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
                                className="block w-full px-4 py-3 rounded-md border border-gray-300 text-white focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-100"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <div className="flex justify-end items-center">
                            <a
                                href="#"
                                className="text-sm text-gray-100 hover:text-black mt-2 font-rhm justify-end"
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

                <hr className="border-gray-200 mt-8" />

                <SocialSection isLogoVisible={false} className="mt-8" />
            </div>
        </div>
    );
}
