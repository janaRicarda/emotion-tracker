import EmotionList from "@/components/EmotionList.js";
import { useRouter } from "next/router";
import {
  StyledFlexColumnWrapper,
  StyledFixedTitle,
} from "@/SharedStyledComponents";
import Tooltip from "@/components/Tooltip";

export default function CreateIndexPage({
  onAddEmotionDetails,
  handleToggleTooltip,
}) {
  const router = useRouter();
  const id = router.query.id;

  return (
    <>
      <Tooltip onClick={handleToggleTooltip}>
        Select the emotion that best represents how you are feeling right now.
        Use the provided visual cues, brief descriptions, and examples to guide
        your choice.
      </Tooltip>
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
