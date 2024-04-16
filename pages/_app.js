import useLocalStorageState from "use-local-storage-state";
import GlobalStyle from "../styles";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [tensionEntry, setTensionEntry] = useLocalStorageState("tensionEntry", {
    defaultValue: [],
  });

  function handleAddTensionEntry(data) {
    const timeStamp = getCurrentTimeAndDate();
    const newEntry = { ...data, id: uid(), date: timeStamp };
    setTensionEntry(
      tensionEntry.length === 0 ? [newEntry] : [newEntry, ...tensionEntry]
    );
  }
  return (
    <>
      <GlobalStyle />
      <Component
        tensionEntry={tensionEntry}
        onAddTensionEntry={handleAddTensionEntry}
        {...pageProps}
      />
    </>
  );
}
