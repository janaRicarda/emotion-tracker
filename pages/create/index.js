import EmotionList from "@/components/EmotionList.js";
import styled from "styled-components";
import Link from "next/link.js";
import { useRouter } from "next/router";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8.5px;
  text-align: center;
  &:hover {
    background-color: lightskyblue;
  }
`;

export default function CreateIndexPage() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <StyledWrapper>
      <EmotionList
        title="Which of the 7 basic emotions comes closest to your actual felt emotion?"
        page="create"
        id={id}
      />
      <StyledLink href="./">Back to tension entry</StyledLink>
    </StyledWrapper>
  );
}
