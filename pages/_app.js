import useLocalStorageState from "use-local-storage-state";
import GlobalStyle from "../styles";
import styled, { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "@/components/Theme";
import Moon from "../public/moon.svg";
import Sun from "../public/sun.svg";
import generateExampleData from "@/utils/exampleData";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";
import Layout from "@/components/Layout";

const StyledToggleTheme = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid var(--main-dark);
  background-color: transparent;
  color: var(--main-dark);
  font-size: 1rem;
  margin: 1rem;
  position: fixed;
  top: 0.7rem;
  right: 4rem;

  z-index: 3;
`;

const StyledMoon = styled(Moon)`
  fill: var(--main-dark);
`;

const StyledSun = styled(Sun)`
  fill: var(--main-dark);
`;

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  const initialData = generateExampleData();

  // erase empty dependency array to let app evaluate on every re-render instead of hard-reload
  // without dependency-array: clicking "reset" on dev-controls calls generateExampleData
  // with empty dependency-array: generateExampleData is only called when localStorageState of emotionEntries is empty AND there is a hard reload of the page
  useEffect(() => {
    const storageState = localStorage.getItem("emotionEntries");

    // note: the length of an existing but empty localStorageState is equal to 2 and not 0
    if (storageState.length === 2) {
      setEmotionEntries(initialData);
    }
  }, []);

  const [emotionEntries, setEmotionEntries] = useLocalStorageState(
    "emotionEntries",
    {
      defaultValue: [],
    }
  );

  const [backupEntries, setBackupEntries] = useLocalStorageState(
    "backupEntries",
    {
      defaultValue: [],
    }
  );

  function toggleTheme() {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  function handleAddEmotionEntry(data, id) {
    const timeAndDate = getCurrentTimeAndDate();

    const newEntry = {
      ...data,
      id,
      timeAndDate,
      isoDate: new Date().toISOString(),
    };
    setEmotionEntries([newEntry, ...emotionEntries]);
  }

  function handleAddEmotionDetails(data, id) {
    setEmotionEntries(
      emotionEntries.map((entry) =>
        entry.id === id ? { ...entry, ...data } : entry
      )
    );
  }

  function toggleHighlight(id) {
    setEmotionEntries(
      emotionEntries.map((entry) =>
        entry.id === id
          ? { ...entry, isHighlighted: !entry.isHighlighted }
          : entry
      )
    );
  }

  function handleDeleteEmotionEntry(id) {
    setEmotionEntries(emotionEntries.filter((entry) => entry.id !== id));
  }

  function handleDeleteAll() {
    setEmotionEntries([]);
  }

  function handleReplaceAndBackup(generatedData) {
    setBackupEntries(emotionEntries);
    setEmotionEntries(generatedData);
  }
  function restoreFromBackup() {
    setEmotionEntries(backupEntries);
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <StyledToggleTheme type="button" onClick={toggleTheme}>
        {theme === "light" ? <StyledMoon /> : <StyledSun />}
      </StyledToggleTheme>
      <GlobalStyle />
      <Layout>
        <Component
          onAddEmotionDetails={handleAddEmotionDetails}
          emotionEntries={emotionEntries}
          onAddEmotionEntry={handleAddEmotionEntry}
          onDeleteEmotionEntry={handleDeleteEmotionEntry}
          onReplaceUserData={handleReplaceAndBackup}
          onDeleteAll={handleDeleteAll}
          onRestore={restoreFromBackup}
          backupEntries={backupEntries}
          toggleHighlight={toggleHighlight}
          {...pageProps}
        />
      </Layout>
    </ThemeProvider>
  );
}
