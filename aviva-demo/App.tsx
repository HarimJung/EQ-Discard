
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AvivaProgressionCheckPage from './pages/AvivaProgressionCheckPage';
import { Page } from './types';

const App: React.FC = () => {
  // Single page app for Aviva Demo
  const currentPage: Page = 'aviva-progression-check';

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header currentPage={currentPage} onNavigate={() => { }} />
      <main className="flex-grow">
        <AvivaProgressionCheckPage />
      </main>
      <Footer />
    </div>
  );
};

export default App;
