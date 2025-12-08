"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GroupOverview from "./GroupOverview";
import PerformanceMetrics from "./PerformanceMetrics";
import SubscriberTable from "./SubscriberTable";
import AnalyticsCharts from "./AnalyticsCharts";
import ReviewsSection from "./ReviewsSection";
import DashboardControls from "./DashboardControls";
import SubscriptionPaymentSettings from "./SubscriptionPaymentSettings"; // ⬅️ NEW

export default function FullDashboard() {
  const router = useRouter();

  const [isAuthorized, setIsAuthorized] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("groupToken");

    if (!token) {
      setIsAuthorized(false);
      return;
    }

    setIsAuthorized(true);

    const fetchProfile = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        const res = await fetch(`${apiBaseUrl}/api/groups/group-profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch profile");
          return;
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  if (isAuthorized === null) {
    return <div className="p-20">Loading...</div>;
  }

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          You need to log in to view your dashboard
        </h2>
        <p className="text-gray-600 mb-6">Please sign in to continue.</p>

        <button
          onClick={() => router.push("/group-login")}
          className="px-6 py-3 bg-rose-400 text-white font-semibold shadow hover:bg-rose-500 transition"
        >
          Login
        </button>
      </div>
    );
  }

  if (loadingProfile || !profile) {
    return <div className="p-20">Loading dashboard...</div>;
  }

  return (
    <div className="p-20 bg-[#f9f9f9] min-h-screen space-y-8">
      <GroupOverview profile={profile} />
      <SubscriptionPaymentSettings profile={profile} />

      <PerformanceMetrics profile={profile} />
      <SubscriberTable profile={profile} />
      <AnalyticsCharts profile={profile} />
      <ReviewsSection profile={profile} />
      {/* <DashboardControls profile={profile} /> */}

      {/* ⬇️ New Subscription & Payment Settings section */}
    </div>
  );
}
