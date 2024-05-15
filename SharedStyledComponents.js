import styled from "styled-components";
import Link from "next/link";

//buttons
const StyledButton = styled.button`
  background-color: var(--button-background);
  color: var(--text-on-bright);
  width: 6rem;
  border: 1px solid var(--main-dark);
  border-radius: 6px;
  margin: 1rem;
  padding: 1rem;
`;

const StyledSubmitButton = styled(StyledButton)`
  background-color: var(--main-dark);
  color: var(--text-on-bright);
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

//links
const StyledStandardLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  border-radius: 6px;
  color: var(--text);
`;

const StyledFixedLink = styled(Link)`
  position: fixed;
  top: 50%;
`;

//lists
const StyledList = styled.ul`
  list-style: none;
`;

const StyledListItem = styled.li`
  border: 1px solid var(--main-dark);
  padding: 0.5rem;
  border-radius: 6px;
`;

//wrapper
const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StyledFlexColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

//form, inputs
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--main-dark);
`;

const StyledInput = styled.input`
  width: 100%;
  height: 0.5rem;
  -webkit-appearance: none;
  border: 1px solid var(--main-dark);
  border-radius: 12px;
  background: transparent;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    border: 1px solid var(--main-dark);
    background-color: var(--button-background);
  }
`;

const StyledSelect = styled.select`
  border-radius: 6px;
  padding: 0.3rem 0;
`;

export {
  StyledButton,
  StyledWrapper,
  StyledFlexColumnWrapper,
  StyledTitle,
  StyledBasicTitle,
  StyledFixedLink,
  StyledStandardLink,
  StyledList,
  StyledInput,
  StyledForm,
  StyledSelect,
  StyledListItem,
};
