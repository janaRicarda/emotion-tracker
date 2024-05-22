import EmotionForm from "@/components/EmotionForm";
import { useRouter } from "next/router";
import Tooltip from "@/components/Tooltip";

export default function EditPage({
  emotionEntries,
  onAddEmotionDetails,
  handleToggleTooltip,
}) {
  const router = useRouter();

  const { id } = router.query;

  const correspondingEntry = emotionEntries.find((entry) => entry.id === id);
  if (!correspondingEntry) return <h2>Page not found!</h2>;
  return (
    <>
      <Tooltip onClick={handleToggleTooltip}>
        Refine your emotion entry with the editing form. Adjust your initial
        selection by switching the emotion if necessary, selecting a subemotion,
        and updating the intensity of your emotion on a scale from 0 to 100.
        Re-classify the emotion as unpleasant, neutral, or pleasant, and
        optionally revise any triggers or notes to further enrich your emotional
        record.
      </Tooltip>
      <EmotionForm
        onSubmit={onAddEmotionDetails}
        correspondingEntry={correspondingEntry}
        id={id}
        editMode
      />
    </>
  );
}
