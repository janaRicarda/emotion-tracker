import useLocalStorageState from "use-local-storage-state";
import GlobalStyle from "../styles";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "@/components/Theme";
import generateExampleData from "@/utils/exampleData";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  const defaultTheme = lightTheme || darkTheme;
  const [theme, setTheme] = useState(defaultTheme);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollDown, setIsScrollDown] = useState(false);

  const [emotionEntries, setEmotionEntries] = useLocalStorageState(
    "emotionEntries",
    {
      defaultValue: [],
    }
  );

  const initialData = generateExampleData();
  // use-effect with empty dependency-array so generateExampleData is only called when localStorageState of emotionEntries is empty AND there is a hard reload of the page
  useEffect(() => {
    const storageState = localStorage.getItem("emotionEntries");

    // note: the length of an existing but empty localStorageState is equal to 2 and not 0
    if (storageState.length === 2) {
      setEmotionEntries(initialData);
    }
  }, []);

  // detect scroll-direction
  useEffect(() => {
    function handleScroll() {
      const currentScroll = document.documentElement.scrollTop;
      if (currentScroll < scrollPosition) {
        setIsScrollDown(false);
      } else if (currentScroll > scrollPosition) {
        setIsScrollDown(true);
      }
      setScrollPosition(document.documentElement.scrollTop);
    }

    window.addEventListener("scroll", handleScroll);
  });

  const [backupEntries, setBackupEntries] = useLocalStorageState(
    "backupEntries",
    {
      defaultValue: [],
    }
  );

  function toggleTheme() {
    theme === defaultTheme ? setTheme(darkTheme) : setTheme(lightTheme);
  }

  function switchTheme(customTheme) {
    setTheme(customTheme);
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
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout
        isScrollDown={isScrollDown}
        theme={theme}
        toggleTheme={toggleTheme}
        switchTheme={switchTheme}
        scrollPosition={scrollPosition}
      >
        <Component
          isScrollDown={isScrollDown}
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
