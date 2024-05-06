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

const StyledConfirmOrCancelButton = styled.button`
  color: white;
  background-color: ${({ $color }) => $color};
  border: none;
  width: 14rem;
  height: 4rem;
  border-radius: 6px;
  padding: 0.5rem;
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
const StyledStandardLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  border-radius: 8px;
`;

const StyledLink = styled(Link)`
  position: fixed;
  top: 50%;
`;

//headlines
const StyledTitle = styled.h1`
  text-align: center;
  font-weight: 600;
  width: 100%;
  position: fixed;
  top: 100px;
  z-index: 1;
  padding: 1rem;
  background-color: var(--main-bright);
`;

//simple
const StyledCenteredTitle = styled.h1`
  text-align: center;
  margin: 1.5rem;
  font-size: 2rem;
`;

//lists

const StyledBasicList = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  justify-content: center;
`;
const StyledListItem = styled.li`
  border: 1px solid #030352;
  padding: 0.5rem;
  border-radius: 5px;
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

const StyledConfirmButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const StyledFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export {
  StyledConfirmOrCancelButton,
  StyledConfirmButtonWrapper,
  StyledButton,
  StyledBackButton,
  StyledWrapper,
  StyledButtonWrapper,
  StyledFlexWrapper,
  StyledTitle,
  StyledCenteredTitle,
  StyledLink,
  StyledStandardLink,
};
