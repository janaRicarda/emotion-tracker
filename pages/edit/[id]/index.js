import EmotionForm from "@/components/EmotionForm";
import { useRouter, useEffect } from "next/router";

export default function EditPage({
  theme,
  emotionEntries,
  onAddEmotionDetails,
  handleToolTip,
}) {
  const router = useRouter();

  const { id } = router.query;
  useEffect(() => {
    handleToolTip({
      text: "  Refine your emotion entry with the editing form. Adjust your initial selection by switching the emotion if necessary, selecting a subemotion, and updating the intensity of your emotion on a scale from 0 to 100. Re-classify the emotion as unpleasant, neutral, or pleasant, and optionally revise any triggers or notes to further enrich your emotional record.",
    });
  }, []);

  const correspondingEntry = emotionEntries.find((entry) => entry.id === id);
  if (!correspondingEntry) return <h2>Page not found!</h2>;

  return (
    <>
      <EmotionForm
        theme={theme}
        onSubmit={onAddEmotionDetails}
        correspondingEntry={correspondingEntry}
        id={id}
        editMode
      />
    </>
  );
}
