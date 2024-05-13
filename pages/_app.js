import useLocalStorageState from "use-local-storage-state";
import GlobalStyle from "../styles";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";
import styled, { ThemeProvider } from "styled-components";
import { useState } from "react";
import {
  lightTheme,
  darkTheme,
  /*  warmTheme,
  coldTheme,
  neutralTheme,
  highContrastTheme, */
} from "@/components/Theme";
import Moon from "../public/moon.svg";
import Sun from "../public/sun.svg";

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
  const defaultTheme = lightTheme || darkTheme;
  // const customTheme = [warmTheme, coldTheme, neutralTheme, highContrastTheme];
  // const [theme, setTheme] = useState("light");
  //const [theme, setTheme] = useState(lightTheme);
  const [theme, setTheme] = useState(defaultTheme);
  const [emotionEntries, setEmotionEntries] = useLocalStorageState(
    "emotionEntries",
    {
      defaultValue: [],
    }
  );

  function toggleTheme() {
    // theme === "light" ? setTheme("dark") : setTheme("light");
    //theme === lightTheme ? setTheme(darkTheme) : setTheme(lightTheme);
    theme === defaultTheme ? setTheme(darkTheme) : setTheme(lightTheme);
  }

  function switchWarmTheme() {
    setTheme(warmTheme);
  }
  function switchTheme(customTheme) {
    setTheme(customTheme);
  }
  // const newTheme = [warmTheme, coldTheme, neutralTheme, highContrastTheme];

  function handleAddEmotionEntry(data, id) {
    const timeAndDate = getCurrentTimeAndDate();

    const newEntry = {
      ...data,
      id,
      date: timeAndDate,
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
      <StyledToggleTheme type="button" onClick={toggleTheme}>
        {theme === lightTheme ? <StyledMoon /> : <StyledSun />}
      </StyledToggleTheme>
      <GlobalStyle />
      <Layout switchTheme={switchTheme}>
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
