import EmotionList from "@/components/EmotionList";
import styled from "styled-components";
import { StyledLink } from "../index.js";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default function EmotionListPage() {
  return (
    <StyledWrapper>
      <EmotionList title="The seven basic emotions" page="emotions" />
      <StyledLink href="./">Back to tension entry</StyledLink>
    </StyledWrapper>
  );
}
