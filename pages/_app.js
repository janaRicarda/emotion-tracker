import useLocalStorageState from "use-local-storage-state";
import GlobalStyle from "../styles";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { lightTheme, darkTheme } from "@/components/Theme";
import generateExampleData from "@/utils/exampleData";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  const defaultTheme = lightTheme || darkTheme;

  const [theme, setTheme] = useState(defaultTheme);

  const data = generateExampleData();

  const [emotionEntries, setEmotionEntries] = useLocalStorageState(
    "emotionEntries",
    {
      defaultValue: [...data],
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
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout theme={theme} toggleTheme={toggleTheme} switchTheme={switchTheme}>
        <Component
          onAddEmotionDetails={handleAddEmotionDetails}
          emotionEntries={emotionEntries}
          onAddEmotionEntry={handleAddEmotionEntry}
          onDeleteEmotionEntry={handleDeleteEmotionEntry}
          toggleHighlight={toggleHighlight}
          {...pageProps}
        />
      </Layout>
    </ThemeProvider>
  );
}
