import {
  StyledStandardLink,
  StyledFlexColumnWrapper,
} from "@/SharedStyledComponents";
import styled from "styled-components";

const StyledConfirmText = styled.p`
  padding: 1rem 2rem;
  text-align: center;
  color: var(--main-dark);
`;

const StyledMessageWrapper = styled(StyledFlexColumnWrapper)`
  height: fit-content;
  background-color: var(--section-background);
  border-radius: 6px;
  border: 1px solid var(--main-dark);
`;

const StyledBackLink = styled(StyledStandardLink)`
  background-color: var(--button-background);
  color: var(--contrast-text);
  width: 6rem;
  margin: 1rem;
  padding: 1rem;
`;

export default function ErrorMessage({ itemText }) {
  return (
    <StyledMessageWrapper>
      <StyledConfirmText>
        <b>{itemText}</b>
      </StyledConfirmText>
      <StyledBackLink href="/">Back to main</StyledBackLink>
    </StyledMessageWrapper>
  );
}
