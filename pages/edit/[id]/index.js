import EmotionForm from "@/components/EmotionForm";
import { useRouter } from "next/router";

export default function EditPage({ emotionEntries }) {
  const router = useRouter();

  const { id } = router.query;

  return (
    <EmotionForm
      onSubmit={() => console.log("test")}
      emotionEntries={emotionEntries}
      id={id}
      isEdit
    />
  );
}
