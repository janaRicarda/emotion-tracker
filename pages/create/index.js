import EmotionList from "@/components/EmotionList.js";
import { useRouter } from "next/router";
import {
  StyledFlexColumnWrapper,
  StyledFixedTitle,
} from "@/SharedStyledComponents";

export default function CreateIndexPage({ onAddEmotionDetails }) {
  const router = useRouter();
  const id = router.query.id;

  return (
    <>
      <StyledFixedTitle>Choose one of the emotions</StyledFixedTitle>
      <StyledFlexColumnWrapper>
        <EmotionList
          createMode
          id={id}
          onAddEmotionDetails={onAddEmotionDetails}
        />
      </StyledFlexColumnWrapper>
    </>
  );
}
