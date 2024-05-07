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

//headlines
const StyledBasicTitle = styled.h1`
  text-align: center;
  position: fixed;
  z-index: 1;
  font-weight: 600;
`;

const StyledTitle = styled(StyledBasicTitle)`
  width: 100%;
  top: 100px;
  padding: 1rem;
  background-color: var(--main-bright);
`;

// löschen
// const StyledCenteredTitle = styled.h1`
//   text-align: center;
//   margin: 1.5rem;
//   font-size: 2rem;
// `;

//links
const StyledStandardLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  border-radius: 8px;
`;

const StyledFixedLink = styled(Link)`
  position: fixed;
  top: 50%;
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

const StyledFlexColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

//form, inputs
const StyledInput = styled.input`
  width: 100%;
`;

export {
  StyledButton,
  StyledWrapper,
  StyledButtonWrapper,
  StyledFlexColumnWrapper,
  StyledTitle,
  StyledBasicTitle,
  StyledFixedLink,
  StyledStandardLink,
  StyledInput,
};
