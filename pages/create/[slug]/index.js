import EmotionForm from "@/components/EmotionForm";
import { emotionData } from "@/lib/db";
import { useRouter } from "next/router";

export default function EmotionEntry({ handleDetailSubmit }) {
  const router = useRouter();
  if (!router.query) {
    return null;
  }
  const { slug } = router.query;
  const emotion = emotionData.find((emotion) => emotion.slug === slug);
  if (!emotion) return <h1>emotionForm not found</h1>;

  return (
    <EmotionForm
      handleDetailSubmit={handleDetailSubmit}
      name={emotion.name}
      color={emotion.color}
    />
  );
}
