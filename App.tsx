
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';



import DiscardAlertPage from './pages/FSRADemoPage';
import CherryPickingPage from './pages/CherryPickingPage';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('fsra-demo');

  const renderPage = () => {
    switch (currentPage) {
      case 'cherry-picking':
        return <CherryPickingPage />;
      case 'fsra-demo':
      default:
        return <DiscardAlertPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
