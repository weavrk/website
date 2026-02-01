import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

interface CellNumbersContextType {
  showCellNumbers: boolean;
  setShowCellNumbers: Dispatch<SetStateAction<boolean>>;
  toggleCellNumbers: () => void;
}

const CellNumbersContext = createContext<CellNumbersContextType | undefined>(undefined);

export const useCellNumbers = () => {
  const context = useContext(CellNumbersContext);
  if (context === undefined) {
    throw new Error('useCellNumbers must be used within a CellNumbersProvider');
  }
  return context;
};

interface CellNumbersProviderProps {
  children: React.ReactNode;
}

export const CellNumbersProvider: React.FC<CellNumbersProviderProps> = ({ children }) => {
  const [showCellNumbers, setShowCellNumbers] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('weavrk_show_cell_numbers');
    if (saved !== null) {
      setShowCellNumbers(JSON.parse(saved));
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('weavrk_show_cell_numbers', JSON.stringify(showCellNumbers));
  }, [showCellNumbers]);

  const toggleCellNumbers = () => {
    setShowCellNumbers(prev => !prev);
  };

  const value = {
    showCellNumbers,
    setShowCellNumbers,
    toggleCellNumbers,
  };

  return (
    <CellNumbersContext.Provider value={value}>
      {children}
    </CellNumbersContext.Provider>
  );
};
