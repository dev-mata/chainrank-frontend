import FullDashboard from "../components/Groups/FullDashboard";
import MobileTabsWrapper from "../components/Groups/MobileTabsWrapper";


export default function DashboardPage() {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <FullDashboard />
      </div>

      {/* Mobile Tabs Layout */}
      <div className="block md:hidden">
        <MobileTabsWrapper />
      </div>
    </>
  );
}
