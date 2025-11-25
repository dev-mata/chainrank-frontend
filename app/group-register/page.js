'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

export default function RegisterGroupPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const [form, setForm] = useState({
        groupName: '',
        email: '',
        mobileNumber: '',
        country: '',
        description: '',
        price: '',
        category: '',
        telegramLink: '',
        discordLink: '',
        password: '',
        confirmPassword: '',
        logo: null,
        bannerImage: null,
    });

    const [logoPreview, setLogoPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Password requirements state
    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        hasUpperCase: false,
        hasSymbol: false,
        hasNumber: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        // Real-time password validation
        if (name === 'password') {
            checkPasswordRequirements(value);
        }

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const checkPasswordRequirements = (password) => {
        setPasswordRequirements({
            minLength: password.length >= 6,
            hasUpperCase: /[A-Z]/.test(password),
            hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            hasNumber: /[0-9]/.test(password),
        });
    };

    const isPasswordStrong = () => {
        return Object.values(passwordRequirements).every(req => req === true);
    };

    const validateImage = (file) => {
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        const maxSize = 2 * 1024 * 1024; // 2MB

        if (!validTypes.includes(file.type)) {
            return 'Only PNG and JPEG images are allowed';
        }

        if (file.size > maxSize) {
            return 'Image size must be less than 2MB';
        }

        return null;
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const error = validateImage(file);
            if (error) {
                setErrors((prev) => ({ ...prev, logo: error }));
                return;
            }
            setForm((prev) => ({ ...prev, logo: file }));
            setLogoPreview(URL.createObjectURL(file));
            setErrors((prev) => ({ ...prev, logo: '' }));
        }
    };

    const handleBannerUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const error = validateImage(file);
            if (error) {
                setErrors((prev) => ({ ...prev, bannerImage: error }));
                return;
            }
            setForm((prev) => ({ ...prev, bannerImage: file }));
            setBannerPreview(URL.createObjectURL(file));
            setErrors((prev) => ({ ...prev, bannerImage: '' }));
        }
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!form.groupName.trim()) newErrors.groupName = 'Group name is required';
            if (!form.email.trim()) newErrors.email = 'Email is required';
            if (!form.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
            if (!form.country.trim()) newErrors.country = 'Country is required';
            if (!form.description.trim()) newErrors.description = 'Description is required';
            if (!form.price || form.price <= 0) newErrors.price = 'Valid price is required';
            if (!form.category) newErrors.category = 'Category is required';
        }

        if (step === 2) {
            if (!form.password) {
                newErrors.password = 'Password is required';
            } else if (!isPasswordStrong()) {
                newErrors.password = 'Please meet all password requirements';
            }
            if (!form.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (form.password !== form.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
        }
    };

    const handlePrevious = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            const formData = new FormData();

            formData.append('groupName', form.groupName);
            formData.append('email', form.email);
            formData.append('mobileNumber', form.mobileNumber);
            formData.append('country', form.country);
            formData.append('description', form.description);
            formData.append('price', form.price);
            formData.append('category', form.category);
            formData.append('telegramLink', form.telegramLink);
            formData.append('discordLink', form.discordLink);
            formData.append('password', form.password);

            if (form.logo) {
                formData.append('logo', form.logo);
            }
            if (form.bannerImage) {
                formData.append('bannerImage', form.bannerImage);
            }

            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            const response = await fetch(`${apiBaseUrl}/api/groups/register`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 409) {
                    setErrors({ general: data.error });
                } else {
                    setErrors({ general: data.error || 'Registration failed' });
                }
                return;
            }

            alert('Group registered successfully!');
            router.push('/connect-payments');
        } catch (error) {
            console.error('Registration error:', error);
            setErrors({ general: 'Network error. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header />

            {/* Header Section */}
            <div className='px-4 py-6 lg:p-10 max-w-2xl mx-auto bg-white'>
                <h1 className="text-2xl font-bold text-black">Register Your Group</h1>
                <p className='text-black font-rhm'>Register your group now and start boosting your community!</p>
            </div>

            {/* Progress Steps */}
            <div className="max-w-2xl mx-auto px-4 mb-8">
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
                                <span className={`mt-2 text-xs font-rhm ${currentStep >= step ? 'text-black' : 'text-gray-400'}`}>
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
            </div>

            {/* Form Container */}
            <form className="space-y-5 p-4 lg:p-10 max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg">
                {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                        {errors.general}
                    </div>
                )}

                {/* Step 1: Group Information */}
                {currentStep === 1 && (
                    <div className="space-y-5">
                        <h2 className="text-xl font-bold text-black mb-4">Group Information</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 font-rhm">Group Name *</label>
                            <input
                                name="groupName"
                                value={form.groupName}
                                onChange={handleChange}
                                className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${errors.groupName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                type="text"
                                placeholder="e.g. Astro Trading"
                            />
                            {errors.groupName && <p className="mt-1 text-sm text-red-600">{errors.groupName}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 font-rhm">Official Email *</label>
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                type="email"
                                placeholder="group@domain.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 font-rhm">Mobile Number *</label>
                            <input
                                name="mobileNumber"
                                value={form.mobileNumber}
                                onChange={handleChange}
                                className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                type="tel"
                                placeholder="+1 234 567 8900"
                            />
                            {errors.mobileNumber && <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 font-rhm">Country *</label>
                            <input
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${errors.country ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                type="text"
                                placeholder="e.g. United States"
                            />
                            {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 font-rhm">Description *</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${errors.description ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                rows={3}
                                placeholder="Describe your group..."
                            ></textarea>
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 font-rhm">Price (monthly) in USD$ *</label>
                            <input
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${errors.price ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="10.00"
                            />
                            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 font-rhm">Category *</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className={`mt-1 block w-full border px-2 py-3 text-black font-rhm text-sm ${errors.category ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <option value="">Select category</option>
                                <option value="Crypto">Crypto</option>
                                <option value="Stocks">Stocks</option>
                                <option value="Real Estate">Real Estate</option>
                                <option value="Sports Betting">Sports Betting</option>
                                <option value="Amazon FBA">Amazon FBA</option>
                            </select>
                            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 font-rhm">Telegram Link</label>
                            <input
                                name="telegramLink"
                                value={form.telegramLink}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 p-2 text-black placeholder-gray-400"
                                type="url"
                                placeholder="https://t.me/yourgroup"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 font-rhm">Discord Link</label>
                            <input
                                name="discordLink"
                                value={form.discordLink}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 p-2 text-black placeholder-gray-400"
                                type="url"
                                placeholder="https://discord.gg/yourgroup"
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Password Setup */}
                {currentStep === 2 && (
                    <div className="space-y-5">
                        <h2 className="text-xl font-bold text-black mb-4">Set Your Password</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 font-rhm">Password *</label>
                            <input
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                type="password"
                                placeholder="Enter a strong password"
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 font-rhm">Confirm Password *</label>
                            <input
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                type="password"
                                placeholder="Re-enter your password"
                            />
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                        </div>

                        {/* Password Requirements Checklist */}
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                            <p className="text-sm font-semibold text-gray-800 mb-3">Password Requirements:</p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-sm">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${passwordRequirements.minLength ? 'bg-green-500' : 'bg-gray-300'
                                        }`}>
                                        {passwordRequirements.minLength ? (
                                            <Check className="w-3 h-3 text-white" />
                                        ) : (
                                            <X className="w-3 h-3 text-gray-500" />
                                        )}
                                    </div>
                                    <span className={passwordRequirements.minLength ? 'text-green-700' : 'text-gray-600'}>
                                        At least 6 characters long
                                    </span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${passwordRequirements.hasUpperCase ? 'bg-green-500' : 'bg-gray-300'
                                        }`}>
                                        {passwordRequirements.hasUpperCase ? (
                                            <Check className="w-3 h-3 text-white" />
                                        ) : (
                                            <X className="w-3 h-3 text-gray-500" />
                                        )}
                                    </div>
                                    <span className={passwordRequirements.hasUpperCase ? 'text-green-700' : 'text-gray-600'}>
                                        Include at least one capital letter
                                    </span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${passwordRequirements.hasNumber ? 'bg-green-500' : 'bg-gray-300'
                                        }`}>
                                        {passwordRequirements.hasNumber ? (
                                            <Check className="w-3 h-3 text-white" />
                                        ) : (
                                            <X className="w-3 h-3 text-gray-500" />
                                        )}
                                    </div>
                                    <span className={passwordRequirements.hasNumber ? 'text-green-700' : 'text-gray-600'}>
                                        Include at least one number
                                    </span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${passwordRequirements.hasSymbol ? 'bg-green-500' : 'bg-gray-300'
                                        }`}>
                                        {passwordRequirements.hasSymbol ? (
                                            <Check className="w-3 h-3 text-white" />
                                        ) : (
                                            <X className="w-3 h-3 text-gray-500" />
                                        )}
                                    </div>
                                    <span className={passwordRequirements.hasSymbol ? 'text-green-700' : 'text-gray-600'}>
                                        Include at least one symbol (!@#$%^&*...)
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Password Match Indicator */}
                        {form.confirmPassword && (
                            <div className={`p-3 rounded border ${form.password === form.confirmPassword
                                ? 'bg-green-50 border-green-200 text-green-700'
                                : 'bg-red-50 border-red-200 text-red-700'
                                }`}>
                                <div className="flex items-center gap-2">
                                    {form.password === form.confirmPassword ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span className="text-sm font-medium">Passwords match!</span>
                                        </>
                                    ) : (
                                        <>
                                            <X className="w-4 h-4" />
                                            <span className="text-sm font-medium">Passwords do not match</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 3: Upload Images */}
                {currentStep === 3 && (
                    <div className="space-y-5">
                        <h2 className="text-xl font-bold text-black mb-4">Upload Images</h2>

                        {/* Logo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 font-rhm mb-2">Upload Logo</label>
                            <div
                                className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-rose-400 transition"
                                onClick={() => document.getElementById('logo-upload').click()}
                            >
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l3-3m-3 3l-3-3m6-7h.01M6 8h.01"></path>
                                    </svg>
                                    <p className="text-rose-600 font-medium">Tap to upload logo</p>
                                    <p className="text-xs text-gray-400">PNG or JPEG (max. 2MB)</p>
                                </div>
                            </div>

                            <input
                                id="logo-upload"
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={handleLogoUpload}
                                className="hidden"
                            />

                            {errors.logo && <p className="mt-2 text-sm text-red-600">{errors.logo}</p>}

                            {logoPreview && (
                                <div className="mt-4 text-center">
                                    <Image
                                        src={logoPreview}
                                        alt="Logo Preview"
                                        width={80}
                                        height={80}
                                        className="mx-auto rounded-full object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Banner Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 font-rhm mb-2">Upload Banner Image</label>
                            <div
                                className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-rose-400 transition"
                                onClick={() => document.getElementById('banner-upload').click()}
                            >
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l3-3m-3 3l-3-3m6-7h.01M6 8h.01"></path>
                                    </svg>
                                    <p className="text-rose-600 font-medium">Tap to upload banner</p>
                                    <p className="text-xs text-gray-400">PNG or JPEG (max. 2MB, recommended 1200x400px)</p>
                                </div>
                            </div>

                            <input
                                id="banner-upload"
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={handleBannerUpload}
                                className="hidden"
                            />

                            {errors.bannerImage && <p className="mt-2 text-sm text-red-600">{errors.bannerImage}</p>}

                            {bannerPreview && (
                                <div className="mt-4">
                                    <Image
                                        src={bannerPreview}
                                        alt="Banner Preview"
                                        width={600}
                                        height={200}
                                        className="mx-auto rounded-md object-cover w-full h-48"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                            <p className="text-sm text-gray-600">
                                <strong>Note:</strong> Images are optional but highly recommended to make your group stand out!
                            </p>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            onClick={handlePrevious}
                            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium font-rhm rounded hover:bg-gray-50 transition"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </button>
                    )}

                    {currentStep < totalSteps ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="flex items-center gap-2 ml-auto px-6 py-3 bg-rose-400 text-white font-medium font-rhm rounded hover:bg-rose-500 transition shadow-md"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="ml-auto px-8 py-3 bg-rose-400 text-white font-semibold font-rhm rounded shadow-[5px_5px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-500 transition"
                        >
                            {isSubmitting ? 'Registering...' : 'Complete Registration'}
                        </button>
                    )}
                </div>
            </form>
        </>
    );
}