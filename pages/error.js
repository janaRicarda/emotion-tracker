import { useRouter } from "next/router";
import ErrorMessage from "@/components/ErrorMessage";

export default function Error() {
  const router = useRouter();
  const errorMessage = router.query.text;
  return <ErrorMessage errorMessage={errorMessage} />;
}
