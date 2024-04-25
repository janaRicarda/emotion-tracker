import { emotionData } from "@/lib/db";
import { useRouter } from "next/router";
import EmotionDetails from "@/components/EmotionDetail";

export default function EmotionDetailsPage() {
  const router = useRouter();
  if (!router.query) {
    return null;
  }
  const { slug } = router.query;
  const emotion = emotionData.find((emotion) => emotion.slug === slug);
  const emotionIndex = emotionData.findIndex(
    (emotion) => emotion.slug === slug
  );

  const prevEmotionIndex =
    emotionIndex === 0 ? emotionData.length - 1 : emotionIndex - 1;
  const prevEmotion = emotionData[prevEmotionIndex];
  const nextEmotionIndex =
    emotionIndex === emotionData.length - 1 ? 0 : emotionIndex + 1;
  const nextEmotion = emotionData[nextEmotionIndex];

  if (!emotion) return <h1>emotion not found</h1>;
  return (
    <EmotionDetails
      name={emotion.name}
      description={emotion.description}
      emotionfunction={emotion.emotionfunction}
      indications={emotion.indications}
      subemotions={emotion.subemotions}
      color={emotion.color}
      prevEmotion={prevEmotion}
      nextEmotion={nextEmotion}
    />
  );
}
