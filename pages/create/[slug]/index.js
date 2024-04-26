import EmotionForm from "@/components/EmotionForm";
// import { emotionData } from "@/lib/db";
import { useRouter } from "next/router";

export default function EmotionEntry({
  onAddEmotionDetails,
  emotionEntries,
  sliderValues,
  setSliderValues,
}) {
  const router = useRouter();
  if (!router.query) {
    return null;
  }

  const { slug, id } = router.query;

  // const emotion = emotionData.find((emotion) => emotion.slug === slug);
  // if (!emotion) return <h1>emotionForm not found</h1>;

  return (
    <EmotionForm
      onSubmit={onAddEmotionDetails}
      emotionEntries={emotionEntries}
      // name={emotion.name}
      // color={emotion.color}
      id={id}
      slug={slug}
      // sliderValues={sliderValues}
      // setSliderValues={setSliderValues}
      // subemotions={emotion.subemotions}
    />
  );
}
