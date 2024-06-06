import {
  StyledFlexColumnWrapper,
  StyledWrapper,
  StyledButton,
} from "@/SharedStyledComponents";
import styled from "styled-components";
import { useRouter } from "next/router";

const StyledMessageWrapper = styled(StyledFlexColumnWrapper)`
  height: fit-content;
  background-color: var(--section-background);
  border-radius: 6px;
  border: 1px solid var(--main-dark);
  & > * {
    margin: 1rem 0;
  }
`;

const StyledErrorButtonBox = styled(StyledWrapper)`
  justify-content: space-evenly;
`;
const StyledErrorButton = styled(StyledButton)`
  width: 8rem;
`;

export default function ErrorMessage({ errorMessage }) {
  const router = useRouter();

  return (
    <StyledMessageWrapper>
      <h2>Sorry there was an error!</h2>
      <b>You got redirected.</b>
      <p>Error message:</p>
      <p>{errorMessage}</p>
      <StyledErrorButtonBox>
        <StyledErrorButton onClick={() => router.back()}>
          Try again
        </StyledErrorButton>
        <StyledErrorButton onClick={() => router.push("/")}>
          Homepage
        </StyledErrorButton>
      </StyledErrorButtonBox>
    </StyledMessageWrapper>
  );
}
