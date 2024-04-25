import useLocalStorageState from "use-local-storage-state";
import GlobalStyle from "../styles";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [sliderValues, setSliderValues] = useState({
    tensionValue: 0,
    intensityValue: 0,
    categoryValue: 50,
  });

  // const [tension, setTension] = useState("0");
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
    console.log(emotionEntries);
  }

  function handleAddEmotionDetails(data, id) {
    setEmotionEntries(
      emotionEntries.map((entry) =>
        entry.id === id ? { ...entry, ...data } : entry
      )
    );
  }

  return (
    <>
      <GlobalStyle />
      <Component
        onAddEmotionDetails={handleAddEmotionDetails}
        emotionEntries={emotionEntries}
        onAddEmotionEntry={handleAddEmotionEntry}
        sliderValues={sliderValues}
        setSliderValues={setSliderValues}
        {...pageProps}
      />
    </>
  );
}
