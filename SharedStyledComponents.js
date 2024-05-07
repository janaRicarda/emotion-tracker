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

// const StyledMenuButton = styled(Menu)`
//   width: 3rem;
//   fill: var(--main-dark);

//   background: transparent;
//   color: var(--main-dark);
//   border-style: none;
//   margin: 1rem;
//   position: absolute;
//   top: 0;
//   right: 0;
// `;
// const StyledCloseButton = styled(Close)`
//   width: 2rem;
//   fill: var(--main-dark);
//   background: var(--button-background);
//   color: var(--main-dark);
//   border-style: none;
//   margin: 1rem;
//   position: absolute;
//   top: 0.5rem;
//   right: 0;
//   z-index: 2;
// `;

const StyledSubmitButton = styled.button`
  background-color: white;
  color: #030352;
  border: 1px solid black;
  border-radius: 6px;
  padding: 0.5rem;
  &:hover {
    background-color: darkslateblue;
    color: ${({ $color }) => $color};
  }
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

const StyledRecordsList = styled.ul`
  list-style: none;
  padding: 3.5rem 0;
  margin: 0 auto 1rem;
  text-align: left;
`;

const StyledRecordListItem = styled.li`
  margin: 0.5rem auto;
  border: 1px solid var(--main-dark);
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 0 3px 0;
  width: 80vw;
  cursor: pointer;
  &:hover {
    background-color: var(--button-background);
  }
`;

const StyledListItem = styled.li`
  border: 1px solid #030352;
  padding: 0.5rem;
  border-radius: 5px;
`;

//wrapper
const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
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

//form, inputs
const StyledInput = styled.input`
  width: 100%;
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
  StyledInput,
};
