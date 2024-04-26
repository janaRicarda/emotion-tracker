import EmotionForm from "@/components/EmotionForm";
import { useRouter } from "next/router";

export default function EditPage({ emotionEntries, onAddEmotionDetails }) {
  const router = useRouter();

  const { id } = router.query;

  return (
    <EmotionForm
      onSubmit={onAddEmotionDetails}
      emotionEntries={emotionEntries}
      id={id}
      editMode
    />
  );
}
