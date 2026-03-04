
import React from 'react';
import { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Simple redirect behavior or minimal landing
  React.useEffect(() => {
    onNavigate('fsra-demo');
  }, [onNavigate]);

  return null;
};

export default HomePage;
