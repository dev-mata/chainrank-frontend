'use client';

import { useState, useEffect } from 'react';
import Header from "./components/Header";
import FilterMenu from "./components/FilterMenu";
import SearchBar from "./components/SearchBar";
import TrialCard from "./components/TrialCard";

import TallyStats from "./components/TallyStats";
import LiveSubscriptions from "./components/LiveSubscriptions";
import TrendingSlider from "./components/TrendingSlider";
import ChartTabs from "./components/ChartTabs";
import NewlyAddedSlider from "./components/NewlyAddedSlider";
import SellPromo from "./components/SellPromo";
import Explore from "./components/Explore";
import RecentReviews from "./components/RecentReviews";
import SocialSection from "./components/SocialSection";
import ArticleList from "./components/ArticleList";
import Footer from "./components/Footer";

export default function Home() {
  const [trendingGroups, setTrendingGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [featuredGroup, setFeaturedGroup] = useState(null);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [featuredError, setFeaturedError] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setFeaturedLoading(true);

        const [trendingRes, featuredRes] = await Promise.all([
          fetch(`${baseUrl}/api/public/public-groups`),
          fetch(`${baseUrl}/api/featured/top`)
        ]);

        if (!trendingRes.ok) {
          throw new Error('Failed to fetch trending groups');
        }

        if (!featuredRes.ok) {
          throw new Error('Failed to fetch featured group');
        }

        const trendingJson = await trendingRes.json();
        const featuredJson = await featuredRes.json();

        setTrendingGroups(trendingJson.data || []);
        setFeaturedGroup(featuredJson?.data?.groupId || null);

        setError(null);
        setFeaturedError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch trending groups');
        setFeaturedError('Failed to load featured group');
      } finally {
        setLoading(false);

        
        setFeaturedLoading(false);
      }
    };

    if (baseUrl) {
      fetchData();
    }
  }, [baseUrl]);

  return (
    <>
      <Header />
      <FilterMenu />

      <div className="flex text-center justify-center py-16 px-4">
        <h3 className="text-4xl font-semibold text-black max-w-3xl">
          A marketplace for great communities all over the world
        </h3>
      </div>

      <div className="flex text-center justify-center px-4">
        <p className="text-gray-700 font-rhm font-medium max-w-2xl">
          The #1 marketplace for finding and joining the best paid groups in any industry. New groups are added everyday, and we rank them based on result.
        </p>
      </div>

      <SearchBar communities={trendingGroups} />

      <div className="my-12">
        {featuredLoading && (
          <p className="text-center text-gray-500">Loading featured group...</p>
        )}

        {featuredError && (
          <p className="text-center text-red-500">{featuredError}</p>
        )}

        {!featuredLoading && !featuredError && featuredGroup && (
          <TrialCard group={featuredGroup} />
        )}
      </div>

      {/* rest of page stays the same */}
      <TallyStats />
      <LiveSubscriptions />
      <TrendingSlider
        pageTitle="Trending Groups"
        communities={trendingGroups}
        loading={loading}
        error={error}
      />
      {/* ...etc */}
      <ChartTabs />
      <NewlyAddedSlider />
      <Explore />
      <SellPromo />
      <RecentReviews />
      <SocialSection />
      <ArticleList />
      <Footer />
    </>
  );
}
