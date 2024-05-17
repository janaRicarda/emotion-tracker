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
  font-size: 1rem;
  margin: 1rem;
  position: fixed;
  top: 0.7rem;
  right: 4rem;
  z-index: 3;
`;

const StyledMoon = styled(Moon)`
  width: 1.5rem;
  height: 1.5rem;
  fill: var(--main-dark);
`;

const StyledSun = styled(Sun)`
  width: 1.5rem;
  height.1.5rem;
  fill: var(--main-dark);
`;

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
      {theme === lightTheme || theme === darkTheme ? (
        <StyledToggleTheme type="button" onClick={toggleTheme}>
          {theme === lightTheme ? <StyledMoon /> : <StyledSun />}
        </StyledToggleTheme>
      ) : null}

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
