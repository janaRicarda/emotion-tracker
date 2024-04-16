import Link from "next/link";
import styled from "styled-components";

const StyledH1 = styled.h1`
  text-align: center;
`;

const StyledForm = styled.form`
  border-radius: 10px;
  margin: 1rem;
  padding: 1rem;
  background-color: ${({ $color }) => $color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;
const StyledWrapper = styled.div`
  display: flex;
  width: inherit;
  justify-content: space-between;
`;

const StyledSpan = styled.span`
  font-size: 0.8rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8.5px;
  &:hover {
    background-color: ${({ $color }) => $color};
  }
`;
const StyledSelect = styled.select`
  border-radius: 6px;
  padding: 0.3rem 0;
`;

const StyledTextarea = styled.textarea`
  border: 1px solid black;
  border-radius: 6px;
`;

const StyledSubmitButton = styled.button`
  background-color: white;
  border: 1px solid black;
  border-radius: 6px;
  padding: 0.5rem;
  &:hover {
    background-color: darkslateblue;
    color: ${({ $color }) => $color};
  }
`;

export default function EmotionForm({ name, color }) {
  return (
    <>
      <StyledH1>Record your {name}</StyledH1>
      <StyledForm $color={color}>
        <label htmlFor="date">Date and time:</label>
        <input type="date" id="date" name="date"></input>
        <label htmlFor="subemotion">Select Subemotion: </label>
        <StyledSelect id="subemotion" name="subemotion" required>
          <option value="joy">Joy</option>
          <option value="surprise">Surprise</option>
          <option value="fear">Fear</option>
          <option value="sadness">Sadness</option>
          <option value="contempt">Contempt</option>
          <option value="disgust">Disgust</option>
          <option value="anger">Anger</option>
        </StyledSelect>
        <label htmlFor="intensity"> Emotion Intensity: </label>
        <input
          type="range"
          id="intensity"
          name="intensity"
          defaultValue={0}
          max={100}
          required
        ></input>
        <StyledWrapper>
          <StyledSpan>0</StyledSpan>
          <StyledSpan>100</StyledSpan>
        </StyledWrapper>
        <label htmlFor="category"> Association Category: </label>
        <input
          type="range"
          id="category"
          name="category"
          defaultValue={0}
          max={100}
          required
        ></input>
        <StyledWrapper>
          <StyledSpan>0</StyledSpan>
          <StyledSpan>100</StyledSpan>
        </StyledWrapper>
        <label htmlFor="trigger"></label>
        Trigger:
        <StyledTextarea id="trigger" name="trigger"></StyledTextarea>
        <label htmlFor="notes">Notes: </label>
        <StyledTextarea id="notes" name="notes"></StyledTextarea>
        <StyledSubmitButton type="submit" $color={color}>
          Submit
        </StyledSubmitButton>
      </StyledForm>
      <StyledLink href="/" $color={color}>
        ← Back to Tension Entry
      </StyledLink>
    </>
  );
}
