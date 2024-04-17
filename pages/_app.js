import useLocalStorageState from "use-local-storage-state";
import GlobalStyle from "../styles";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [emotionEntries, setEmotionEntries] = useLocalStorageState(
    "emotionEntries",
    {
      defaultValue: [],
    }
  );

  function handleAddEmotionEntry(data) {
    const timeStamp = getCurrentTimeAndDate();
    const newEntry = { ...data, id: uid(), date: timeStamp };
    setEmotionEntries(
      emotionEntries.length === 0 ? [newEntry] : [newEntry, ...emotionEntries]
    );
  }
  return (
    <>
      <GlobalStyle />
      <Component
        emotionEntries={emotionEntries}
        onAddEmotionEntry={handleAddEmotionEntry}
        {...pageProps}
      />
    </>
  );
}
