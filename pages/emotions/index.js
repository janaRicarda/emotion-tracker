import EmotionList from "@/components/EmotionList";
import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8.5px;
  &:hover {
    background-color: lightskyblue;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default function EmotionListPage() {
  return (
    <StyledWrapper>
      <EmotionList title="The seven basic emotions"/>
      <StyledLink href="./">Back to tension entry</StyledLink>
    </StyledWrapper>
  );
}
