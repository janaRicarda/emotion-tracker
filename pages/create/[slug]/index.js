import EmotionForm from "@/components/EmotionForm";
import { useRouter } from "next/router";
import Tooltip from "@/components/Tooltip";

export default function EmotionEntry({
  theme,
  onAddEmotionDetails,
  emotionEntries,
  handleToggleTooltip,
}) {
  const router = useRouter();
  if (!router.query) {
    return null;
  }
  const { slug } = router.query;

  const { id } = router.query;
  const correspondingEntry = emotionEntries.find((entry) => entry.id === id);
  if (!correspondingEntry) return <h2>Page not found!</h2>;

  return (
    <>
      <Tooltip onClick={handleToggleTooltip}>
        Enter further details about your emotion experience with the emotion
        form. Here, you can fine-tune your initial selection by switching the
        emotion if needed, specifying a subemotion, and gauging the intensity of
        your emotion on a scale from 0 to 100. Classify the emotion as
        unpleasant, neutral, or pleasant, and optionally provide input on
        triggers and notes to enhance your emotional insight and reflection.
      </Tooltip>
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
