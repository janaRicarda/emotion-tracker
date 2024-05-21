import EmotionList from "@/components/EmotionList.js";
import { useRouter } from "next/router";
import { StyledFlexColumnWrapper } from "@/SharedStyledComponents";
import Tooltip from "@/components/Tooltip";
import { useState } from "react";

export default function CreateIndexPage({ onAddEmotionDetails }) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const router = useRouter();
  const id = router.query.id;

  function handleToggleTooltip() {
    setIsTooltipOpen(!isTooltipOpen);
  }

  return (
    <>
      <Tooltip onToggleTooltip={handleToggleTooltip} show={isTooltipOpen}>
        <>
          Select the emotion that best represents how you are feeling right now.
          Use the provided visual cues, brief descriptions, and examples to
          guide your choice.
        </>
      </Tooltip>
      <StyledFlexColumnWrapper>
        <EmotionList
          form
          title="Which of the 7 basic emotions comes closest to your actual felt emotion?"
          createMode
          id={id}
          onAddEmotionDetails={onAddEmotionDetails}
        />
      </StyledFlexColumnWrapper>
    </>
  );
}
