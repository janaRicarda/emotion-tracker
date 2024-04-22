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

const EmotionLabel = styled.label`
  display: flex;
  gap: 0.3rem;
`;

const StyledTextInput = styled.input`
  padding: 0 1rem 0 0;
  border: none;
  background-color: transparent;
  line-height: 1rem;
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

export default function EmotionForm({
  name,
  color,
  onAddEmotionDetails,
  id,
  slug,
  emotionEntries,
  subemotions,
}) {
  const correspondingEntry = emotionEntries.find((entry) => entry.id === id);

  const correspondingId = id;

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onAddEmotionDetails(data, correspondingId);
  }

  return (
    <>
      <StyledH1>Record your {name}</StyledH1>
      <StyledForm $color={color} onSubmit={handleSubmit}>
        <p aria-labelledby="Date and time">Date: {correspondingEntry.date}</p>
        <p aria-labelledby="Tension level">
          Tension-Level: {correspondingEntry.tensionLevel}%
        </p>

        <EmotionLabel htmlFor="emotion">
          Emotion:
          <StyledTextInput
            type="text"
            id="emotion"
            name="emotion"
            readOnly
            value={name}
          />
        </EmotionLabel>

        <label htmlFor="subemotion">* Select Subemotion:</label>
        <StyledSelect
          defaultValue={slug}
          id="subemotion"
          name="subemotion"
          required
        >
          <option value={""}>--select a subemotion--</option>
          <option value={""}>--none--</option>
          {subemotions.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </StyledSelect>
        <label htmlFor="intensity">* Emotion Intensity:</label>
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
        <label htmlFor="category">* Association Category:</label>
        <input
          type="range"
          id="category"
          name="category"
          defaultValue={0}
          max={100}
          required
        ></input>
        <StyledWrapper>
          <StyledSpan>unpleasant</StyledSpan>
          <StyledSpan>neutral</StyledSpan>
          <StyledSpan>pleasant</StyledSpan>
        </StyledWrapper>
        <label htmlFor="trigger">Trigger:</label>
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
