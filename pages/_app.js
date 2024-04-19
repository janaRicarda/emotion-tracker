import useLocalStorageState from "use-local-storage-state";
import GlobalStyle from "../styles";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [emotionEntries, setEmotionEntries] = useLocalStorageState(
    "emotionEntries",
    {
      defaultValue: [],
    }
  );

  const router = useRouter();

  function handleAddEmotionEntry(data, id) {
    const timeStamp = getCurrentTimeAndDate();

    const newEntry = { ...data, id, date: timeStamp };
    setEmotionEntries([newEntry, ...emotionEntries]);
  }

  function handleAddEmotionDetails(data, id) {
    setEmotionEntries(
      emotionEntries.map((entry) =>
        entry.id === id ? { ...entry, ...data, date: entry.date } : entry
      )
    );
    router.push("/emotion-records");
  }

  return (
    <>
      <GlobalStyle />
      <Component
        onAddEmotionDetails={handleAddEmotionDetails}
        emotionEntries={emotionEntries}
        onAddEmotionEntry={handleAddEmotionEntry}
        {...pageProps}
      />
    </>
  );
}
