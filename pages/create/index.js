import EmotionList from "@/components/EmotionList.js";
import { useRouter } from "next/router";
import { StyledFlexColumnWrapper } from "@/SharedStyledComponents";

export default function CreateIndexPage({ onAddEmotionDetails }) {
  const router = useRouter();
  const id = router.query.id;

  return (
    <StyledFlexColumnWrapper>
      <EmotionList
        form
        title="Which of the 7 basic emotions comes closest to your actual felt emotion?"
        createMode
        id={id}
        onAddEmotionDetails={onAddEmotionDetails}
      />
    </StyledFlexColumnWrapper>
  );
}
