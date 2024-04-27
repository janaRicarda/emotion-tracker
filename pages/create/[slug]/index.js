import EmotionForm from "@/components/EmotionForm";
import { useRouter } from "next/router";

export default function EmotionEntry({ onAddEmotionDetails, emotionEntries }) {
  const router = useRouter();
  if (!router.query) {
    return null;
  }

  const { slug, id } = router.query;

  return (
    <EmotionForm
      onSubmit={onAddEmotionDetails}
      emotionEntries={emotionEntries}
      id={id}
      slug={slug}
    />
  );
}
