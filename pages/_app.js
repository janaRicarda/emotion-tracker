import useLocalStorageState from "use-local-storage-state";
import GlobalStyle from "../styles";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";
import styled, { ThemeProvider } from "styled-components";
import { useState } from "react";
import { lightTheme, darkTheme } from "@/components/Theme";

import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  const [emotionEntries, setEmotionEntries] = useLocalStorageState(
    "emotionEntries",
    {
      defaultValue: [],
    }
  );

  function toggleTheme() {
    theme === "light" ? setTheme("dark") : setTheme("light");
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
  const StyledToggleTheme = styled.button`
    border-radius: 50%;
    border: 1px solid var(--main-dark);
    background-color: transparent;
    color: var(--main-dark);
    font-size: 1rem;
    margin: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
  `;

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <StyledToggleTheme type="button" onClick={toggleTheme}>
        {theme === "light" ? "☾" : "☀"}
      </StyledToggleTheme>
      <GlobalStyle />
      <Layout>
        <Component
          onAddEmotionDetails={handleAddEmotionDetails}
          emotionEntries={emotionEntries}
          onAddEmotionEntry={handleAddEmotionEntry}
          onDeleteEmotionEntry={handleDeleteEmotionEntry}
          {...pageProps}
        />
      </Layout>
    </ThemeProvider>
  );
}
