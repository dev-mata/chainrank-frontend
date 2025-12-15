"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Logo from "../Logo";
import SocialSection from "../SocialSection";
import { useRouter } from "next/navigation";


export default function CreateAccountForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    return regex.test(password);
  };
  const validateInput = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(form.password)) {
      newErrors.password =
        "Password must be at least 6 chars, include upper & lowercase letters, a number and a symbol";
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm your password";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateInput();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setErrors({ api: data.message || "Registration failed" });
      } else {
        router.push("/login");
      }
    } catch (error) {
      setErrors({ api: "Network error. Try again." });
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <div className="text-3xl font-bold">Create an Account</div>
          <div className="font-rhm mt-2 text-gray-500">
            Join us! Let’s get started
          </div>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            name="email"
            className={`block w-full px-4 py-3 rounded-md border text-black focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"
              }`}
            value={form.email}
            onChange={handleChange}
            placeholder="joe@domain.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={`block w-full px-4 py-3 rounded-md border text-black focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"
                }`}
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              className={`block w-full px-4 py-3 rounded-md border text-black focus:outline-none ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}

          {errors.api && (
            <p className="text-red-600 font-semibold text-sm">{errors.api}</p>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-10">
            <button
              type="submit"
              disabled={loading}
              className={`w-full border border-1 font-rhm bg-rose-300 text-black font-semibold text-sm px-4 py-3 shadow-[5px_5px_0px_rgba(0,0,0,1)] ${loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            <a
              href="/login"
              className="w-full text-center border border-1 font-rhm bg-white text-black font-semibold text-sm px-4 py-3 shadow-[5px_5px_0px_rgba(0,0,0,1)]"
            >
              Login
            </a>
          </div>
        </form>

        <hr className="border-gray-200 mt-8 px-6" />
        <SocialSection isLogoVisible={false} className="mt-8" />
      </div>
    </div>
  );
}
