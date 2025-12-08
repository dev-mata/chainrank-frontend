'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import StepIndicator from './StepIndicator';
import GroupInfoStep from './GroupInfoStep';
import PasswordStep from './PasswordStep';
import ImageUploadStep from './ImageUploadStep';

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
        subCategory: '',
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

    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        hasUpperCase: false,
        hasSymbol: false,
        hasNumber: false,
    });

    const checkPasswordRequirements = (password) => {
        setPasswordRequirements({
            minLength: password.length >= 6,
            hasUpperCase: /[A-Z]/.test(password),
            hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            hasNumber: /[0-9]/.test(password),
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));

        if (name === 'password') {
            checkPasswordRequirements(value);
        }

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const isPasswordStrong = () => {
        return Object.values(passwordRequirements).every((req) => req === true);
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
            if (!form.subCategory) newErrors.subCategory = 'Sub Category is required';

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
            formData.append('subCategory', form.subCategory);
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
            router.push('/group-login');
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
            <div className="px-4 py-6 lg:p-10 max-w-2xl mx-auto bg-white">
                <h1 className="text-2xl font-bold text-black">Register Your Group</h1>
                <p className="text-black font-rhm">
                    Register your group now and start boosting your community!
                </p>
            </div>

            {/* Progress Steps */}
            <div className="max-w-2xl mx-auto px-4 mb-8">
                <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
            </div>

            {/* Form Container */}
            <form className="space-y-5 p-4 lg:p-10 max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg">
                {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                        {errors.general}
                    </div>
                )}

                {currentStep === 1 && (
                    <GroupInfoStep form={form} errors={errors} onChange={handleChange} />
                )}

                {currentStep === 2 && (
                    <PasswordStep
                        form={form}
                        errors={errors}
                        onChange={handleChange}
                        passwordRequirements={passwordRequirements}
                    />
                )}

                {currentStep === 3 && (
                    <ImageUploadStep
                        errors={errors}
                        logoPreview={logoPreview}
                        bannerPreview={bannerPreview}
                        onLogoUpload={handleLogoUpload}
                        onBannerUpload={handleBannerUpload}
                    />
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
