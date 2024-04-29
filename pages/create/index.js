import EmotionList from "@/components/EmotionList.js";
import styled from "styled-components";
import { useRouter } from "next/router";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default function CreateIndexPage({ onAddEmotionDetails }) {
  const router = useRouter();
  const id = router.query.id;

  return (
    <StyledWrapper>
      <EmotionList
        form
        title="Which of the 7 basic emotions comes closest to your actual felt emotion?"
        createMode
        id={id}
        onAddEmotionDetails={onAddEmotionDetails}
      />
    </StyledWrapper>
  );
}
