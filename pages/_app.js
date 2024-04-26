import useLocalStorageState from "use-local-storage-state";
import GlobalStyle from "../styles";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { lightTheme, darkTheme } from "@/components/Theme";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  const [emotionEntries, setEmotionEntries] = useLocalStorageState(
    "emotionEntries",
    {
      defaultValue: [],
    }
  );

  function toggleTheme() {
    theme === light ? setTheme("dark") : setTheme("light");
  }

  function handleAddEmotionEntry(data, id) {
    const timeStamp = getCurrentTimeAndDate();

    const newEntry = { ...data, id, date: timeStamp };
    setEmotionEntries([newEntry, ...emotionEntries]);
  }

  function handleAddEmotionDetails(data, id) {
    setEmotionEntries(
      emotionEntries.map((entry) =>
        entry.id === id ? { ...entry, ...data } : entry
      )
    );
  }

  function handleDeleteEmotionEntry(id) {
    setEmotionEntries(emotionEntries.filter((entry) => entry.id !== id));
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <button type="button" onClick={toggleTheme}>
        {theme === "light" ? "☾" : "☀"}
      </button>
      <GlobalStyle />
      <Component
        onAddEmotionDetails={handleAddEmotionDetails}
        emotionEntries={emotionEntries}
        onAddEmotionEntry={handleAddEmotionEntry}
        onDeleteEmotionEntry={handleDeleteEmotionEntry}
        {...pageProps}
      />
    </ThemeProvider>
  );
}
