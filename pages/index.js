import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 2rem auto;
  justify-content: center;
  align-items: center;
`;

const StyledLabel = styled.label`
  padding: 2rem;
  text-align: center;
`;

const StyledInput = styled.input`
  width: inherit;
`;

const StyledWrapper = styled.div`
  display: flex;
  width: inherit;
  justify-content: space-between;
`;

const StyledSpan = styled.span`
  font-size: 0.8rem;
`;

const StyledButton = styled.button`
  width: 3rem;
`;

export default function HomePage({ onAddEmotionEntry }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onAddEmotionEntry(data);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor="tension-level">
        On a scale from 0 to 100, how tense do you feel in this moment?
      </StyledLabel>
      <StyledInput
        id="tension-level"
        name="tensionLevel"
        type="range"
        defaultValue={0}
        max={100}
      />
      <StyledWrapper>
        <StyledSpan>0</StyledSpan>
        <StyledSpan>100</StyledSpan>
      </StyledWrapper>
      <StyledButton type="submit">Save</StyledButton>
    </StyledForm>
  );
}
