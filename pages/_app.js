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
    setEmotionEntries([newEntry, ...emotionEntries]);
  }
  // function handleAddEmotionDetail(data) {
  //   const newEntry = { ...data, subemotion: subemotion.value };
  // }

  function handleDetailSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    handleAddEmotionEntry(data);
    const formElements = event.target.elements;
    console.log(formElements.subemotion.value);
  }
  return (
    <>
      <GlobalStyle />
      <Component
        handleDetailSubmit={handleDetailSubmit}
        emotionEntries={emotionEntries}
        onAddEmotionEntry={handleAddEmotionEntry}
        {...pageProps}
      />
    </>
  );
}
