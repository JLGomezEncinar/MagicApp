import { createContext, useContext, useState } from 'react';

const ParamsContext = createContext(null);

export const ParamsProvider = ({ children }) => {
  const [params, setParams] = useState({});
  return (
    <ParamsContext.Provider value={{ params, setParams }}>
      {children}
    </ParamsContext.Provider>
  );
};
export const useParams = () => useContext(ParamsContext);