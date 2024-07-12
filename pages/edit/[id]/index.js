import EmotionForm from "@/components/EmotionForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

export default function EditPage({
  theme,
  emotionEntries,
  onAddEmotionDetails,
  handleToolTip,
  useExampleData,
  locale,
}) {
  const router = useRouter();

  const { id, emotion } = router.query;

  useEffect(() => {
    handleToolTip({
      text: "  Refine your emotion entry with the editing form. Adjust your initial selection by switching the emotion if necessary, selecting a subemotion, and updating the intensity of your emotion on a scale from 0 to 100. Re-classify the emotion as unpleasant, neutral, or pleasant, and optionally revise any triggers or notes to further enrich your emotional record.",
    });
  }, []);

  const correspondingEntry = useExampleData
    ? emotionEntries.find((entry) => entry.id === id)
    : emotionEntries.find((entry) => entry._id === id);

  if (!correspondingEntry) return <h2>Page not found!</h2>;

  const emotionToLowerCase = emotion.toLowerCase();

  return (
    <>
      <Head>
        <title>Edit</title>
      </Head>
      <EmotionForm
        emotion={emotionToLowerCase}
        theme={theme}
        locale={locale}
        onSubmit={onAddEmotionDetails}
        correspondingEntry={correspondingEntry}
        id={id}
        editMode
      />
    </>
  );
}
