import React from 'react';
import { ServiceProblem } from '../types';
import { PROBLEM_TYPES } from '../constants';

interface ProblemSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const ProblemSelector: React.FC<ProblemSelectorProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold leading-tight tracking-tight text-text-primary-light dark:text-text-primary-dark mb-3">
        ¿Cuál es el problema?
      </h2>
      <div className="flex flex-wrap gap-2">
        {PROBLEM_TYPES.map((type) => {
          const isSelected = selectedId === type.id;
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`
                flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 text-sm font-medium transition-all duration-200
                ${
                  isSelected
                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                    : 'bg-card-light dark:bg-card-dark text-text-secondary-light dark:text-text-secondary-dark border border-border-light dark:border-border-dark hover:border-primary/50 hover:text-primary dark:hover:text-primary'
                }
              `}
            >
              {type.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProblemSelector;