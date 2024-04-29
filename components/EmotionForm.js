import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { emotionData } from "@/lib/db";
import { useEffect, useState } from "react";

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

const TensionLabelEdit = styled.label`
  padding: 0;
  text-align: left;
`;

const StyledInput = styled.input`
  width: 100%;
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
  width: 100%;
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
    background-color: ${({ $backgroundColor }) => $backgroundColor};
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
  editMode,
  onSubmit,
  id,
  emotionEntries,
}) {
  // for controlled-inputs
  const [formValues, setFormValues] = useState({
    emotionValue: "",
    colorValue: "",
    subemotionOptions: [],
    selectedSubemotionValue: "",
    tensionValue: 0,
    intensityValue: 0,
    categoryValue: 50,
  });

  // UseEffect used in order to have "formValues" useState at top of function because variables are intialized after that
  // "formValues" could be set to same values as in useEffect when moved to bottom of function
  useEffect(
    () =>
      setFormValues({
        emotionValue: name,
        subemotionOptions: subemotions,
        selectedSubemotionValue: subemotion,
        colorValue: color,
        tensionValue: tensionLevel,
        intensityValue: intensity ? intensity : 0,
        categoryValue: category,
      }),
    []
  );

  const {
    emotionValue,
    colorValue,
    subemotionOptions,
    selectedSubemotionValue,
    tensionValue,
    intensityValue,
    categoryValue,
  } = formValues;

  const correspondingEntry = emotionEntries.find((entry) => entry.id === id);

  const {
    emotion,
    tensionLevel,
    subemotion,
    intensity,
    category,
    trigger,
    notes,
    date,
  } = { ...correspondingEntry };

  const inCaseOfNoEmotion = {
    name: "emotion",
    color: "lightgray",
    subemotions: [],
  };

  const correspondingEmotion = emotion
    ? emotionData.find((emotionObject) => emotionObject.name === emotion)
    : inCaseOfNoEmotion;

  const { subemotions, name, color } = correspondingEmotion;

  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSubmit(data, id);
    router.push("/emotion-records");
  }

  function handleChangeEmotion(choosenEmotion) {
    const selectedEmotion = emotionData.find(
      (emotion) => emotion.name === choosenEmotion
    );

    const updatedValues = selectedEmotion
      ? {
          emotionValue: selectedEmotion.name,
          colorValue: selectedEmotion.color,
          subemotionOptions: selectedEmotion.subemotions,
        }
      : {
          emotionValue: "",
          colorValue: "lightgray",
          subemotionOptions: [],
        };

    setFormValues({
      ...formValues,
      ...updatedValues,
    });
  }

  console.log(formValues);

  return (
    <>
      <StyledH1>
        {editMode
          ? emotionValue
            ? `Edit your ${emotionValue}`
            : `Edit your Emotion-Entry`
          : emotionValue
          ? `Record your ${emotionValue}`
          : `Record your Emotion-Entry`}
      </StyledH1>
      <StyledForm $color={colorValue} onSubmit={handleSubmit}>
        <p aria-label="Date and time">
          {editMode ? `Entry from:` : "Date: "} {date}
        </p>
        <TensionLabelEdit htmlFor="tension-level">
          Choose a tension level between 0 and 100:
        </TensionLabelEdit>
        <StyledInput
          aria-label="Adjust tension level between 0 and 100"
          id="tension-level"
          name="tensionLevel"
          type="range"
          value={tensionValue}
          max={100}
          onChange={(event) =>
            setFormValues({
              ...formValues,
              tensionValue: event.target.value,
            })
          }
        />
        <StyledWrapper>
          <StyledSpan>0</StyledSpan>
          <StyledSpan>{tensionValue}</StyledSpan>
          <StyledSpan>100</StyledSpan>
        </StyledWrapper>
        <label htmlFor="emotion">Select an emotion:</label>
        <StyledSelect
          id="emotion"
          name="emotion"
          value={`${emotionValue}`}
          onChange={(event) => {
            handleChangeEmotion(event.target.value);
          }}
        >
          <option value={""}>--select a emotion--</option>
          {emotionData.map((emotion) => (
            <option key={emotion.name} value={emotion.name}>
              {emotion.name}
            </option>
          ))}
        </StyledSelect>
        <label htmlFor="subemotion">Select Subemotion:</label>
        <StyledSelect
          value={`${selectedSubemotionValue}`}
          id="subemotion"
          name="subemotion"
          onChange={(event) =>
            setFormValues({
              ...formValues,
              selectedSubemotionValue: event.target.value,
            })
          }
        >
          <option value={""}>--choose a subemotion--</option>
          {subemotionOptions.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </StyledSelect>
        <label htmlFor="intensity">Emotion Intensity:</label>
        <input
          type="range"
          id="intensity"
          name="intensity"
          value={intensityValue}
          max={100}
          onChange={(event) =>
            setFormValues({
              ...formValues,
              intensityValue: event.target.value,
            })
          }
        />
        <StyledWrapper>
          <StyledSpan>0</StyledSpan>
          <StyledSpan>{intensityValue}</StyledSpan>
          <StyledSpan>100</StyledSpan>
        </StyledWrapper>
        <label htmlFor="category">Association Category:</label>
        <input
          type="range"
          id="category"
          name="category"
          value={categoryValue}
          max={100}
          onChange={(event) =>
            setFormValues({
              ...formValues,
              categoryValue: event.target.value,
            })
          }
        />
        <StyledWrapper>
          <StyledSpan>unpleasant</StyledSpan>
          <StyledSpan>neutral</StyledSpan>
          <StyledSpan>pleasant</StyledSpan>
        </StyledWrapper>
        <label htmlFor="trigger">Trigger:</label>
        <StyledTextarea
          id="trigger"
          name="trigger"
          defaultValue={trigger}
        ></StyledTextarea>
        <label htmlFor="notes">Notes: </label>
        <StyledTextarea
          id="notes"
          name="notes"
          defaultValue={notes}
        ></StyledTextarea>
        <StyledSubmitButton type="submit" $color={colorValue}>
          Submit
        </StyledSubmitButton>
      </StyledForm>
      <StyledLink href="/" $backgroundColor={colorValue}>
        ← Back to Tension Entry
      </StyledLink>
      <StyledLink href="../emotion-records" $backgroundColor={colorValue}>
        ← Back to emotion records
      </StyledLink>
    </>
  );
}
