import EmotionForm from "@/components/EmotionForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function EmotionEntry({
  theme,
  onAddEmotionDetails,
  emotionEntries,
  handleToolTip,
  useExampleData,
}) {
  useEffect(() => {
    handleToolTip({
      text: " Enter further details about your emotion experience with the emotion form. Here, you can fine-tune your initial selection by switching the emotion if needed, specifying a subemotion, and gauging the intensity of your emotion on a scale from 0 to 100. Classify the emotion as unpleasant, neutral, or pleasant, and optionally provide input on triggers and notes to enhance your emotional insight and reflection.",
    });
  }, []);

  const router = useRouter();
  const { id } = router.query;
  const { slug } = router.query;

  const { data: correspondingDbEmotionEntry, isLoading } = useSWR(
    !useExampleData && `/api/emotionEntries/${id}`
  );

  if (isLoading) return <h2>Is Loading...</h2>;

  if (!router.query) {
    return null;
  }

  const correspondingEntry = useExampleData
    ? emotionEntries.find((entry) => entry.id === id)
    : correspondingDbEmotionEntry;

  return (
    <>
      <EmotionForm
        slug={slug}
        theme={theme}
        onSubmit={onAddEmotionDetails}
        correspondingEntry={correspondingEntry}
        id={id}
      />
    </>
  );
}
