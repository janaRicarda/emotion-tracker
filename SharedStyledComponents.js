import styled from "styled-components";
import Link from "next/link";

//buttons
const StyledButton = styled.button`
  background-color: var(--button-background);
  color: var(--main-dark);
  width: 6rem;
  border: 1px solid black;
  border-radius: 6px;
  margin: 1rem;
  padding: 1rem;
`;

const StyledBackButton = styled.input`
  background-color: transparent;
  text-decoration: none;
  color: var(--main-dark);
  margin: 1rem;
  padding: 1rem;
  border-radius: 8.5px;
  border: 1px solid black;
  text-align: center;
  background-color: var(--button-background);
`;

//links
const StyledAddDetailsLink = styled(Link)`
  text-decoration: none;
  color: var(--main-dark);
  margin: 1rem;
  padding: 1rem;
  border-radius: 8.5px;
  text-align: center;
  background-color: ${({ $actionButton }) =>
    $actionButton ? "var(--button-background)" : "white"};
  border: ${({ $actionButton }) =>
    $actionButton ? "1px solid black" : "none"};
`;

//headlines
const StyledTitle = styled.h1`
  width: 100%;
  text-align: center;
  font-weight: 500;
  position: fixed;
  top: 100px;
  z-index: 1;
  padding: 1rem;
  background-color: var(--main-bright);
`;

//wrapper
const StyledWrapper = styled.div`
  display: flex;
  width: inherit;
  justify-content: space-between;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  width: inherit;
  justify-content: center;
`;

const StyledFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export {
  StyledButton,
  StyledBackButton,
  StyledAddDetailsLink,
  StyledWrapper,
  StyledButtonWrapper,
  StyledFlexWrapper,
  StyledTitle,
};
