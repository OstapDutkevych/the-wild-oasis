import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocalStorageState } from '@hooks/useLocalStorageState.js';
import Spinner from '@ui/Spinner.jsx';
import styled from 'styled-components';

const FullPage = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-0);
`;

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode',
  );

  const [isFakeLoading, setIsFakeLoading] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    if (isFakeLoading) return;
    setIsFakeLoading(true);
    setIsDarkMode((mode) => !mode); // міняємо тему одразу
    setTimeout(() => setIsFakeLoading(false), 500);
  }

  return (
    <DarkModeContext.Provider
      value={{ isDarkMode, toggleDarkMode, isFakeLoading }}
    >
      {isFakeLoading && (
        <FullPage>
          <Spinner />
        </FullPage>
      )}
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error(
      'Dark mode context was used outside of DarkModeProver',
    );

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { DarkModeProvider, useDarkMode };
