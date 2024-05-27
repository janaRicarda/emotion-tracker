import EmotionList from "@/components/EmotionList";
import { StyledFlexColumnWrapper } from "@/SharedStyledComponents";
import Tooltip from "@/components/Tooltip";

export default function EmotionListPage({ handleToggleTooltip }) {
  return (
    <>
      <Tooltip onClick={handleToggleTooltip}>
        Explore the list of seven fundamental emotions, each offering a unique
        pathway to understanding and expressing your inner feelings. Whether you
        are experiencing enjoyment, surprise, fear, sadness, contempt, disgust
        or anger, delve deeper into the complexities of your emotional landscape
        by selecting the emotion that resonates with you most. Each emotion
        serves as a gateway to further exploration, providing insight and
        clarity into your state of being.
      </Tooltip>
      <StyledFlexColumnWrapper>
        <EmotionList title="The seven basic emotions" />
      </StyledFlexColumnWrapper>
    </>
  );
}
