import { StyledFlexColumnWrapper } from "@/SharedStyledComponents";
import styled from "styled-components";

const StyledConfirmText = styled.p`
  padding: 1rem 2rem;
  text-align: center;
  color: var(--main-dark);
`;

const StyledLoadingSpinner = styled.div`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  border: 6px solid var(--button-background);
  border-left-color: var(--section-background);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1.5s linear infinite;
`;

export default function Loader({ itemText }) {
  return (
    <>
      <StyledFlexColumnWrapper>
        <StyledLoadingSpinner />
        <StyledConfirmText>
          <b>{itemText}</b>
        </StyledConfirmText>
      </StyledFlexColumnWrapper>
    </>
  );
}
