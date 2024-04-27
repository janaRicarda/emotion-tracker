import useLocalStorageState from "use-local-storage-state";
import GlobalStyle from "../styles";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";

export default function App({ Component, pageProps }) {
  const [emotionEntries, setEmotionEntries] = useLocalStorageState(
    "emotionEntries",
    {
      defaultValue: [],
    }
  );

  function handleAddEmotionEntry(data, id) {
    const timeStamp = getCurrentTimeAndDate();

    const newEntry = {
      ...data,
      id,
      date: timeStamp,
      emotion: "",
      subemotion: "",
      intensity: "",
      category: "",
      trigger: "",
      notes: "",
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

  console.log(emotionEntries[0]);

  return (
    <>
      <GlobalStyle />
      <Component
        onAddEmotionEntry={handleAddEmotionEntry}
        onAddEmotionDetails={handleAddEmotionDetails}
        emotionEntries={emotionEntries}
        {...pageProps}
      />
    </>
  );
}
