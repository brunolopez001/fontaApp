import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border-light dark:border-border-dark bg-card-light/90 dark:bg-card-dark/90 px-4 backdrop-blur-md transition-colors">
      <button 
        className="flex size-10 items-center justify-center rounded-full text-text-primary-light dark:text-text-primary-dark hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all"
        aria-label="Go back"
      >
        <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
      </button>
      <h1 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
        Solicitar Servicio
      </h1>
      <div className="size-10"></div>
    </header>
  );
};

export default Header;