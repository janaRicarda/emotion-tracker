import {
  StyledButton,
  StyledFlexColumnWrapper,
  StyledStandardLink,
  StyledWrapper,
} from "@/SharedStyledComponents";
import styled from "styled-components";
import { useRouter } from "next/router";

const Wrapper = styled(StyledFlexColumnWrapper)`
  margin-top: 4rem;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const StyledLink = styled(StyledStandardLink)`
  width: 8rem;
  padding: 0.5rem;
  background-color: var(--button-background);
`;

const StyledBackButton = styled(StyledButton)`
  width: 8rem;
  border: none;
  padding: 0.5rem;
  height: auto;
`;

export default function Custom404() {
  const router = useRouter();

  return (
    <Wrapper>
      <h2>404</h2>
      <h2>Sorry, this page doesn&apos;t exist </h2>
      <LinkWrapper>
        <StyledLink href={"/"}>Homepage</StyledLink>
        <StyledBackButton onClick={() => router.back()}>
          Previous Page
        </StyledBackButton>
      </LinkWrapper>
    </Wrapper>
  );
}
