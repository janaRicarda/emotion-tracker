import { emotionData } from "@/lib/data";
import { useRouter } from "next/router";

export default function EmotionDetails() {
  const router = useRouter();
  if (!router.query) {
    return null;
  }
  const { slug } = router.query;
  const emotion = emotionData.find((emotion) => emotion.slug === slug);

  return <></>;
}
