import Image from "next/image";
import Header from "../components/Header";
import FilterMenu from "../components/FilterMenu";
import Footer from "../components/Footer";
import ChainRankChart from "../components/ChainRankChart";
import TrialCard from "../components/TrialCard";
import TrendingSlider from "../components/TrendingSlider";
import Explore from "../components/Explore";
import SellPromo from "../components/SellPromo";
import RecentReviews from "../components/RecentReviews";
import MySubscriptionsList from "../components/User/MySubscriptionsList";


export default function Home() {
    return (
        <>
            {/* Mobile View */}
            <div className="">
                <Header />
                <FilterMenu />


                {/* <TrendingSlider pageTitle="My Groups in Chainrank" /> */}
                <MySubscriptionsList />


                <ChainRankChart pageTitle="Trending" />
                <div className="my-12"></div>

                <TrialCard />
                <div className="my-12"></div>

                <Explore />
                <div className="my-12"></div>


                <SellPromo />
                <RecentReviews />

                <Footer />

            </div>

            {/* <div className="hidden md:flex items-center justify-center h-screen text-center px-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Mobile Only</h1>
                    <p className="text-gray-600 mt-2">This app is designed for mobile devices. Please open it on your phone.</p>
                </div>
            </div> */}
        </>
    );
}
