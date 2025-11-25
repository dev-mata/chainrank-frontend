'use client';
import React from 'react';
import GroupLandingStat from '../components/Groups/GroupLandingStat';
import Header from '../components/Header';
import GroupLandingFAQ from '../components/Groups/GroupLandingFAQ';
import GroupLandingHero from '../components/Groups/GroupLandingHero';
import Footer from '../components/Footer';
import GroupLandingFeatures from '../components/Groups/GroupLandingFeatures';

function GroupLanding() {
    return (
        <div>
            <Header />
            <GroupLandingHero />
            <GroupLandingFeatures />
            <GroupLandingStat />
            <GroupLandingFAQ />
            <Footer />
        </div>
    );
}

export default GroupLanding;