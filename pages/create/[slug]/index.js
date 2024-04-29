import EmotionForm from "@/components/EmotionForm";
import { useRouter } from "next/router";

export default function EmotionEntry({ onAddEmotionDetails, emotionEntries }) {
  const router = useRouter();
  if (!router.query) {
    return null;
  }

  const { id } = router.query;
  const correspondingEntry = emotionEntries.find((entry) => entry.id === id);
  if (!correspondingEntry) return <h2>Page not found!</h2>;

  return (
    <EmotionForm
      onSubmit={onAddEmotionDetails}
      correspondingEntry={correspondingEntry}
      id={id}
    />
  );
}
