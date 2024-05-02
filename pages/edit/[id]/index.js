import EmotionForm from "@/components/EmotionForm";
import { useRouter } from "next/router";

export default function EditPage({ emotionEntries, onAddEmotionDetails }) {
  const router = useRouter();

  const { id } = router.query;

  const correspondingEntry = emotionEntries.find((entry) => entry.id === id);
  if (!correspondingEntry) return <h2>Page not found!</h2>;
  return (
    <EmotionForm
      onSubmit={onAddEmotionDetails}
      correspondingEntry={correspondingEntry}
      id={id}
      editMode
    />
  );
}
