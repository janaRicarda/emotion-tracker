import EmotionList from "@/components/EmotionList";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default function EmotionListPage({ onAddEmotionDetails }) {
  return (
    <StyledWrapper>
      <EmotionList
        title="The seven basic emotions"
        onAddEmotionDetails={onAddEmotionDetails}
      />
    </StyledWrapper>
  );
}
