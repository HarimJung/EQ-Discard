import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#002E72] py-16 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-8 w-full">
        <div className="flex flex-col items-start space-y-5">
          <img
            src="/equite-logo.png"
            alt="Équité Association"
            className="h-20 w-auto opacity-100 object-contain brightness-0 invert"
          />
          <p className="text-white text-xl font-medium tracking-wide">
            Defending against insurance crime.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
