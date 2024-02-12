import React, { createContext, useState, useContext } from 'react';

// Step 1: Create the Context
const TOTPContext = createContext();

// Step 2: Create a Context Provider
export const TOTPContextProvider = ({ children }) => {
  const [totpURLs, setTotpURLs] = useState([]);

  return (
    <TOTPContext.Provider value={{ totpURLs, setTotpURLs }}>
      {children}
    </TOTPContext.Provider>
  );
};


export default TOTPContext;
// Step 3: Create a custom hook to use the context
// export const useTotpURLs = () => {
//   const context = useContext(TOTPContext);
//   if (!context) {
//     throw new Error('useTotpURLs must be used within a TotpURLsProvider');
//   }
//   return context;
// };
