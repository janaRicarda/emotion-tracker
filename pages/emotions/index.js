import EmotionList from "@/components/EmotionList";
import {
  StyledFlexColumnWrapper,
  StyledFixedTitle,
} from "@/SharedStyledComponents";

export default function EmotionListPage() {
  return (
    <>
      <StyledFixedTitle>The 7 basic emotions</StyledFixedTitle>
      <StyledFlexColumnWrapper>
        <EmotionList />
      </StyledFlexColumnWrapper>
    </>
  );
}
