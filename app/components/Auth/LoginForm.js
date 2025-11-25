"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Logo from "../Logo";
import SocialSection from "../SocialSection";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!email.trim() || !password.trim()) {
      setEmailError(!email.trim());
      setApiError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.message || "Login failed");
      } else {
        // --- Store token in localStorage ---
        // If it's a JWT, you can decode its payload to check expiry
        localStorage.setItem("authToken", data.token);

        // Optional: store expiry if backend sends it separately
        if (data.expiresAt) {
          localStorage.setItem("authTokenExpiry", data.expiresAt);
        }

        router.push("/dashboard");
      }
    } catch (err) {
      setApiError("Network error. Try again.");
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
          <div className="text-3xl font-bold">Let's Sign you in</div>
          <div className="font-rhm mt-2 text-gray-500">
            Welcome back! You have been missed
          </div>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              id="email"
              className={`mt-1 block w-full px-4 py-3 rounded-md border text-black focus:outline-none ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
                setApiError("");
              }}
              placeholder="joe@domain.com"
              required
            />
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="block w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex justify-end items-center">
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-black mt-2 font-rhm justify-end"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          {apiError && (
            <p className="text-red-600 text-sm font-semibold">{apiError}</p>
          )}

          <div className="flex flex-col gap-3 mt-10">
            <button
              type="submit"
              disabled={loading}
              className={`w-full border border-1 font-rhm bg-rose-300 text-black font-semibold text-sm px-4 py-3 shadow-[5px_5px_0px_rgba(0,0,0,1)] ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <a
              href="/register"
              className="w-full text-center border border-1 font-rhm bg-white text-black font-semibold text-sm px-4 py-3 shadow-[5px_5px_0px_rgba(0,0,0,1)]"
            >
              Create Account
            </a>
          </div>
        </form>

        <hr className="border-gray-200 mt-8" />
        <SocialSection isLogoVisible={false} className="mt-8" />
      </div>
    </div>
  );
}
