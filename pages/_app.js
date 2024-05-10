import useLocalStorageState from "use-local-storage-state";
import GlobalStyle from "../styles";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";
import styled, { ThemeProvider } from "styled-components";
import { useState } from "react";
import { lightTheme, darkTheme } from "@/components/Theme";
import Moon from "../public/moon.svg";
import Sun from "../public/sun.svg";
import generateExampleData from "@/utils/exampleData";

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
  const data = generateExampleData();

  const [emotionEntries, setEmotionEntries] = useLocalStorageState(
    "emotionEntries",
    {
      defaultValue: [...data],
    }
  );

  function toggleTheme() {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  function handleAddEmotionEntry(data, id) {
    const timeAndDate = getCurrentTimeAndDate();

    // const time = new Date();
    // const lastWeek = new Date(time.getTime() - 7 * 24 * 60 * 60 * 1000); gives milliseconds format
    // new Date(lastWeek.toDateString()) gives date fromat with hrs set to 00:00, makes comparison do days possible
    // ISO date as a Date object is best comparable; it give formatting options as shown above

    const newEntry = {
      ...data,
      id,
      date: timeAndDate,
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
          toggleHighlight={toggleHighlight}
          {...pageProps}
        />
      </Layout>
    </ThemeProvider>
  );
}
