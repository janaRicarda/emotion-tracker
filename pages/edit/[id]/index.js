import EmotionForm from "@/components/EmotionForm";
import { useRouter } from "next/router";

export default function EditPage({ emotionEntries, onEditEmotionEntry }) {
  const router = useRouter();

  const { id } = router.query;

  return (
    <EmotionForm
      onSubmit={onEditEmotionEntry}
      emotionEntries={emotionEntries}
      id={id}
      editMode
    />
  );
}
