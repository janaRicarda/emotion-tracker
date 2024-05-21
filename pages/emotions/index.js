import EmotionList from "@/components/EmotionList";
import { StyledFlexColumnWrapper } from "@/SharedStyledComponents";
import Tooltip from "@/components/Tooltip";
import { useState } from "react";

export default function EmotionListPage() {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  function handleToggleTooltip() {
    setIsTooltipOpen(!isTooltipOpen);
  }
  return (
    <>
      <Tooltip onToggleTooltip={handleToggleTooltip} show={isTooltipOpen}>
        <>
          Explore the list of seven fundamental emotions, each offering a unique
          pathway to understanding and expressing your inner feelings. Whether
          you are experiencing joy, sadness, anger, fear, surprise, disgust, or
          anticipation, delve deeper into the complexities of your emotional
          landscape by selecting the emotion that resonates with you most. Each
          emotion serves as a gateway to further exploration, providing insight
          and clarity into your state of being.
        </>
      </Tooltip>
      <StyledFlexColumnWrapper>
        <EmotionList title="The seven basic emotions" />
      </StyledFlexColumnWrapper>
    </>
  );
}
