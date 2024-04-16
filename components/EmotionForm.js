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

export default function EmotionForm({ name, color }) {
  return (
    <>
      <StyledH1>Record your {name}</StyledH1>
      <StyledForm $color={color}>
        <label htmlFor="date">Date and time:</label>
        <input type="date" id="date" name="date"></input>

        <label htmlFor="subemotion">Select Subemotion: </label>
        <select id="subemotion" name="subemotion" required>
          <option value="joy">Joy</option>
          <option value="surprise">Surprise</option>
          <option value="fear">Fear</option>
          <option value="sadness">Sadness</option>
          <option value="contempt">Contempt</option>
          <option value="disgust">Disgust</option>
          <option value="anger">Anger</option>
        </select>

        <label htmlFor="intensity"> Emotion Intensity: </label>
        <input type="range" id="intensity" name="intensity" required></input>

        <label htmlFor="category"> Association Category: </label>
        <input type="range" id="category" name="category" required></input>

        <label htmlFor="trigger">Trigger: </label>
        <textarea id="trigger" name="trigger"></textarea>

        <label htmlFor="notes">Notes: </label>
        <textarea id="notes" name="notes"></textarea>

        <button type="submit">Submit</button>
      </StyledForm>
      <StyledLink href="/" $color={color}>
        ← Back to Tension Entry
      </StyledLink>
    </>
  );
}
