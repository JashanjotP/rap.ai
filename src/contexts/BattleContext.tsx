// context/BattleContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface BattleRound {
  round: number;
  object1: string;
  object2: string;
}

interface BattleContextType {
  battleData: BattleRound[] | null;
  setBattleData: (data: BattleRound[]) => void; // This is the setter function
}

const BattleContext = createContext<BattleContextType | undefined>(undefined);

export const BattleProvider = ({ children }: { children: React.ReactNode }) => {
  const [battleData, setBattleData] = useState<BattleRound[] | null>(null);

  return (
    <BattleContext.Provider value={{ battleData, setBattleData }}>
      {children}
    </BattleContext.Provider>
  );
};

export const useBattle = (): BattleContextType => {
  const context = useContext(BattleContext);
  if (!context) {
    throw new Error('useBattle must be used within a BattleProvider');
  }
  return context;
};
