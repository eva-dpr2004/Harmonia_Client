import React, { createContext, useState } from 'react';

export const AnimalContext = createContext();

export const AnimalProvider = ({ children }) => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  return (
    <AnimalContext.Provider value={{ selectedAnimal, setSelectedAnimal }}>
      {children}
    </AnimalContext.Provider>
  );
};