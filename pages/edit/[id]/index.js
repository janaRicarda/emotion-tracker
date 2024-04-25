import EmotionForm from "@/components/EmotionForm";
import { useRouter } from "next/router";

export default function Edit() {
  const router = useRouter();

  const { id } = router;

  return (
    <p>{id}</p>
    //   <EmotionForm />
  );
}
