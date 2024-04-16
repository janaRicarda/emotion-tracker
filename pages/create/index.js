import EmotionList from "@/components/EmotionList";
import styled from "styled-components";
import { StyledLink } from "../index.js";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default function EmotionListEntryForm({ title }) {
  return (
    <StyledWrapper>
      <EmotionList title="Which of the 7 basic emotions comes closest to your actual felt emotion?" />
      <StyledLink href="./">Back to tension entry</StyledLink>
    </StyledWrapper>
  );
}
