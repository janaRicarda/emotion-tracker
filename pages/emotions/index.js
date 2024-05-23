import EmotionList from "@/components/EmotionList";
import {
  StyledFlexColumnWrapper,
  StyledFixedTitle,
} from "@/SharedStyledComponents";
import styled from "styled-components";

const StyledListWrapper = styled(StyledFlexColumnWrapper)`
  overscroll-bahavior: none;
`;

export default function EmotionListPage() {
  return (
    <>
      <StyledFixedTitle>The 7 basic emotions</StyledFixedTitle>
      <StyledListWrapper>
        <EmotionList />
      </StyledListWrapper>
    </>
  );
}
