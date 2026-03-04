
import React from 'react';
import TableauEmbed from '../components/TableauEmbed';

const AvivaProgressionCheckPage: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}


            {/* Main Dashboard Container */}
            <section className="bg-[#F1F5F9] border-t border-gray-200">
                <div className="max-w-[1400px] mx-auto py-8">
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
                        {/* Dashboard Controls/Status Bar */}
                        <div className="bg-white px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                <span className="text-xs font-bold text-[#002E72] tracking-wide uppercase">System Operational &bull; Data Feed: Aviva Progression Check</span>
                            </div>
                            <div className="flex items-center space-x-2 text-[11px] text-gray-400 font-medium">
                                <span>FULLSCREEN MODE AVAILABLE</span>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                            </div>
                        </div>

                        {/* The actual Tableau Embed */}
                        <div className="p-0 sm:p-4 bg-gray-50 flex justify-center overflow-x-auto">
                            <TableauEmbed sourceUrl="https://public.tableau.com/views/AvivaJAN/AvivaChecking_IgnoredValueClaims" />
                        </div>
                    </div>
                </div>
            </section>




        </div>
    );
};

export default AvivaProgressionCheckPage;
