import { emotionData } from "@/lib/data";
import { useRouter } from "next/router";
import EmotionDetails from "@/components/EmotionDetail";

export default function EmotionDetailsPage() {
  console.log(emotionData);
  const router = useRouter();
  if (!router.query) {
    return null;
  }
  const { slug, name, description } = router.query;
  const emotion = emotionData.find((emotion) => emotion.slug === slug);

  return (
    <>
      <EmotionDetails
        name={name}
        description={emotion.description}
        emotionfunction={emotion.emotionfunction}
        indications={emotion.indications}
        subemotions={emotion.subemotions}
        color={emotion.color}
      />
    </>
  );
}
