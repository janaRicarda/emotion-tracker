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
      <StyledFlexColumnWrapper>
        <EmotionList
          form
          title="Which of the 7 basic emotions comes closest to your actual felt emotion?"
          createMode
          id={id}
          onAddEmotionDetails={onAddEmotionDetails}
        />
        <Tooltip onToggleTooltip={handleToggleTooltip}>
          {isTooltipOpen && (
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum.
            </p>
          )}
        </Tooltip>
      </StyledFlexColumnWrapper>
    </>
  );
}
