import EmotionList from "@/components/EmotionList";
import styled from "styled-components";
import { StyledLink } from "../index.js";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default function HomePage() {
  return (
    <StyledWrapper>
      <EmotionList />
      <StyledLink href="./">Back to tension entry</StyledLink>
    </StyledWrapper>
  );
}
