import { useState, useEffect, createContext } from 'react';

const WindowWidthContext = createContext();

const WindowWidthProvider = ({children})=>{

  const [isSmallerDevice, setIsSmallerDevice] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallerDevice(width < 500);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <WindowWidthContext.Provider value={{isSmallerDevice}}>
    {children}
  </WindowWidthContext.Provider>
}
export {WindowWidthContext , WindowWidthProvider};

