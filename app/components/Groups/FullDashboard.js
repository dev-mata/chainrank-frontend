// components/FullDashboard.js
import GroupOverview from './GroupOverview';
import PerformanceMetrics from './PerformanceMetrics';
import SubscriberTable from './SubscriberTable';
import AnalyticsCharts from './AnalyticsCharts';
import ReviewsSection from './ReviewsSection';
import DashboardControls from './DashboardControls';
import Header from '../Header';

export default function FullDashboard() {
  return (
    <div className="p-20 bg-[#f9f9f9] min-h-screen">
      {/* <Header /> */}
      <GroupOverview />
      <PerformanceMetrics />
      <SubscriberTable />
      <AnalyticsCharts />
      <ReviewsSection />
      <DashboardControls />
    </div>
  );
}
