import React, { createContext, useContext, useState } from 'react';

interface ObjectNamesContextType {
  objectNames: { object1: string; object2: string };
  setObjectNames: (names: { object1: string; object2: string }) => void;
}

const ObjectNamesContext = createContext<ObjectNamesContextType | undefined>(undefined);

export const ObjectNamesProvider = ({ children }: { children: React.ReactNode }) => {
  const [objectNames, setObjectNames] = useState<{ object1: string; object2: string }>({
    object1: 'DefaultObject1',
    object2: 'DefaultObject2',
  });

  return (
    <ObjectNamesContext.Provider value={{ objectNames, setObjectNames }}>
      {children}
    </ObjectNamesContext.Provider>
  );
};

export const useObjectNames = (): ObjectNamesContextType => {
  const context = useContext(ObjectNamesContext);
  if (!context) {
    throw new Error('useObjectNames must be used within an ObjectNamesProvider');
  }
  return context;
};
