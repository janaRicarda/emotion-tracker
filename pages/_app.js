import { useSessionStorage } from "usehooks-ts";
import useLocalStorageState from "use-local-storage-state";
import GlobalStyle from "../styles";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "@/components/Theme";
import generateExampleData from "@/utils/exampleData";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";
import Layout from "@/components/Layout";
import useSWR, { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const defaultTheme = lightTheme || darkTheme;
  const [theme, setTheme] = useState(defaultTheme);
  const [toolTip, setToolTip] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollDown, setIsScrollDown] = useState(false);

  const [useExampleData, setUseExampleDate] = useSessionStorage(
    "useExampleData",
    false
  );
  const [emotionEntries, setEmotionEntries] = useLocalStorageState(
    "emotionEntries",
    {
      defaultValue: [],
    }
  );

  const [demoMode, setDemoMode] = useState(false);

  // use-effect for mediaquery
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const userPrefersDark = mediaQuery.matches;

    if (userPrefersDark) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }

    const handleChange = (event) => {
      setTheme(event.matches ? darkTheme : lightTheme);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (session) {
      setUseExampleDate(false);
    }
  }, [session]);

  const initialData = generateExampleData();
  // use-effect with empty dependency-array so generateExampleData is only called when localStorageState of emotionEntries is empty AND there is a hard reload of the page
  useEffect(() => {
    const storageState = localStorage.getItem("emotionEntries");

    // note: the length of an existing but empty localStorageState is equal to 2 and not 0
    if (storageState.length === 2) {
      setEmotionEntries(initialData);
    }
  }, []);

  // sets new generated Data when toggleSwitch is moved to use ExampleData
  useEffect(() => {
    if (useExampleData) {
      setEmotionEntries(initialData);
    }
  }, [useExampleData]);

  const [backupEntries, setBackupEntries] = useLocalStorageState(
    "backupEntries",
    {
      defaultValue: [],
    }
  );

  useEffect(() => {
    function handleScroll() {
      const pageHeight = document.documentElement.offsetHeight;
      const windowHeight = window.innerHeight;

      // stops resizing of elements and prevents resizing-loops when there is not enough space on the page
      const enoughSpace = pageHeight - windowHeight > 400;
      const currentScroll = document.documentElement.scrollTop;

      if (!enoughSpace) {
        setIsScrollDown(false);
        return;
      }
      if (currentScroll < scrollPosition) {
        setIsScrollDown(false);
      } else if (currentScroll > scrollPosition) {
        setIsScrollDown(true);
      }
      setScrollPosition(document.documentElement.scrollTop);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  function handleUseExampleData() {
    setUseExampleDate(!useExampleData);
  }

  // function for StartModal

  function handleDemoMode() {
    setDemoMode(true);
    setUseExampleDate(true);
  }

  const {
    data: dbEmotionEntries,
    isLoading,
    error,
    mutate,
  } = useSWR("/api/emotionEntries", fetcher);

  if (isLoading) return <h1>Loading...</h1>;

  function toggleTheme() {
    theme === defaultTheme ? setTheme(darkTheme) : setTheme(lightTheme);
  }

  function switchTheme(customTheme) {
    setTheme(customTheme);
  }

  function handleToolTip(toolTipData) {
    setToolTip(toolTipData);
  }

  async function handleAddEmotionEntry(data, id) {
    const timeAndDate = getCurrentTimeAndDate();

    const newEntry = {
      tensionLevel: Number(data.tensionLevel),
      id,
      timeAndDate,
      isoDate: new Date().toISOString(),
    };

    if (useExampleData) {
      setEmotionEntries([newEntry, ...emotionEntries]);
    } else {
      try {
        const response = await fetch("/api/emotionEntries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEntry),
        });

        if (response.ok) {
          mutate();
        }

        if (!response.ok) {
          console.error("Server declined: Adding item failed");
        }
      } catch (error) {
        console.error(
          "Your request got rejected before reaching the Server:",
          error
        );
      }
    }
  }

  async function handleAddEmotionDetails(data, id) {
    if (useExampleData) {
      setEmotionEntries(
        emotionEntries.map((entry) =>
          entry.id === id ? { ...entry, ...data } : entry
        )
      );
    } else {
      try {
        const response = await fetch(`/api/emotionEntries/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          mutate();
        }
        if (!response.ok) {
          console.error("Server declined: Updating the item failed");
        }
      } catch (error) {
        console.error(
          "Your request got rejected before reaching the Server:",
          error
        );
      }
    }
  }

  async function toggleHighlight(id) {
    if (useExampleData) {
      setEmotionEntries(
        emotionEntries.map((entry) =>
          entry.id === id
            ? { ...entry, isHighlighted: !entry.isHighlighted }
            : entry
        )
      );
    } else {
      try {
        const entryToChange = dbEmotionEntries.find(
          (entry) => entry._id === id
        );

        const updatedEntry = {
          ...entryToChange,
          isHighlighted: !entryToChange.isHighlighted,
        };

        const response = await fetch(`/api/emotionEntries/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEntry),
        });

        if (response.ok) {
          mutate();
        }
        if (!response.ok) {
          console.error("Server declined: Highlighting item failed");
        }
      } catch (error) {
        console.error(
          "Your request got rejected before reaching the Server:",
          error
        );
      }
    }
  }

  async function handleDeleteEmotionEntry(id) {
    if (useExampleData) {
      setEmotionEntries(emotionEntries.filter((entry) => entry.id !== id));
    } else {
      try {
        const response = await fetch(`/api/emotionEntries/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          mutate();
        }
        if (!response.ok) {
          console.error("Server declined: Deleting item failed");
        }
      } catch (error) {
        console.error(
          "Your request got rejected before reaching the Server:",
          error
        );
      }
    }
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
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <SWRConfig value={{ fetcher }}>
          <GlobalStyle />
          <Layout
            demoMode={demoMode}
            handleDemoMode={handleDemoMode}
            toolTip={toolTip}
            theme={theme}
            isScrollDown={isScrollDown}
            scrollPosition={scrollPosition}
            toggleTheme={toggleTheme}
            switchTheme={switchTheme}
          >
            <Component
              isScrollDown={isScrollDown}
              handleToolTip={handleToolTip}
              theme={theme}
              onAddEmotionDetails={handleAddEmotionDetails}
              emotionEntries={
                useExampleData ? emotionEntries : dbEmotionEntries
              }
              onAddEmotionEntry={handleAddEmotionEntry}
              onDeleteEmotionEntry={handleDeleteEmotionEntry}
              onReplaceUserData={handleReplaceAndBackup}
              onDeleteAll={handleDeleteAll}
              onRestore={restoreFromBackup}
              backupEntries={backupEntries}
              toggleHighlight={toggleHighlight}
              toggleExampleData={handleUseExampleData}
              useExampleData={useExampleData}
              demoMode={demoMode}
              {...pageProps}
            />
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </SessionProvider>
  );
}
