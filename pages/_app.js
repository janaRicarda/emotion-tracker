import { useSessionStorage } from "usehooks-ts";
import useLocalStorageState from "use-local-storage-state";
import GlobalStyle from "../styles";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "@/components/Theme";
import { generateCompleteData } from "@/components/DataGenerator";
import Layout from "@/components/Layout";
import useSWR, { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

const fetcher = async (url) => {
  const response = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  return response.json();
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  // locale for testing, will be replaced w/ locale from translation branch soon
  const locale = "en";

  const defaultTheme = lightTheme || darkTheme;
  const [theme, setTheme] = useState(defaultTheme);
  const [toolTip, setToolTip] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const initialDashboardState = {
    dashboardId: null,
    showChartForDashboardLink: false,
  };
  const [dashboardState, setDashboardState] = useState(initialDashboardState);

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

  const initialData = generateCompleteData(40);

  // use-effect with empty dependency-array so generateCompleteData is only called when localStorageState of emotionEntries is empty AND there is a hard reload of the page
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

  function handleDemoMode() {
    setDemoMode(true);
    setUseExampleDate(true);
    router.push("/home");
  }

  function handleDemoModeOff() {
    setDemoMode(false);
    setUseExampleDate(false);
    router.push("/");
  }

  const {
    data: dbEmotionEntries,
    isLoading: emotionEntriesAreLoading,
    error: errorFetchingEmotionEntries,
    mutate,
  } = useSWR(!demoMode && "/api/emotionEntries/", fetcher);

  function toggleTheme() {
    theme === defaultTheme ? setTheme(darkTheme) : setTheme(lightTheme);
  }

  function handleToolTip(toolTipData) {
    setToolTip(toolTipData);
  }

  function handleError(error) {
    router.push(
      {
        pathname: "/error",
        query: { text: error, currentURL: router.pathname },
      },
      "/error"
    );
  }

  async function handleAddEmotionEntry(data, id) {
    const timeStamp = Date.now();

    const newEntry = {
      tensionLevel: Number(data.tensionLevel),
      id,
      timeStamp,
      isoDate: new Date(timeStamp).toISOString(),
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
        handleError(error.message);
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
        handleError(error.message);
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
          alert("Server declined: Highlighting item failed");
        }
      } catch (error) {
        console.error(
          "Your request got rejected before reaching the Server:",
          error.message
        );
        handleError(error.message);
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
        handleError(error.message);
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

  function handleTheme(theme) {
    setTheme(theme);
  }

  function handleDashboard(id) {
    setDashboardState({
      ...dashboardState,
      dashboardId: id,
    });
  }

  function deliverChartVisibility() {
    setDashboardState({ ...dashboardState, showChartForDashboardLink: true });
  }

  function handleDashboardReset() {
    setDashboardState(initialDashboardState);
  }

  // console.log(process.env.VERCEL_ENV === "preview");
  // console.log(process.env.NODE_ENV);

  return (
    <SessionProvider session={demoMode ? null : session}>
      <ThemeProvider theme={theme}>
        <SWRConfig value={{ fetcher }}>
          <GlobalStyle />
          <Layout
            demoMode={demoMode}
            handleDemoMode={handleDemoMode}
            handleDemoModeOff={handleDemoModeOff}
            toolTip={toolTip}
            theme={theme}
            isScrollDown={isScrollDown}
            scrollPosition={scrollPosition}
            toggleTheme={toggleTheme}
            emotionEntriesAreLoading={emotionEntriesAreLoading}
            errorFetchingEmotionEntries={errorFetchingEmotionEntries}
            handleTheme={handleTheme}
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
              useExampleData={useExampleData}
              demoMode={demoMode}
              scrollPosition={scrollPosition}
              toggleTheme={toggleTheme}
              handleTheme={handleTheme}
              locale={locale}
              onHandleDashboardEmotion={handleDashboard}
              onHandleChartLink={deliverChartVisibility}
              handleDemoMode={handleDemoMode}
              dashboardState={dashboardState}
              onHandleDashboardReset={handleDashboardReset}
              {...pageProps}
            />
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </SessionProvider>
  );
}
