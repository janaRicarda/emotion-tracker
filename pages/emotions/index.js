import EmotionList from "@/components/EmotionList";
import { StyledFlexColumnWrapper } from "@/SharedStyledComponents";

export default function EmotionListPage() {
  return (
    <StyledFlexColumnWrapper>
      <EmotionList title="The seven basic emotions" />
    </StyledFlexColumnWrapper>
  );
}
