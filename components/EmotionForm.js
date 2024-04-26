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
  editMode,
  onSubmit,
  id,
  slug,
  emotionEntries,
}) {
  const [formValues, setFormValues] = useState({
    emotionValue: "",
    colorValue: "",
    subemotions: [],
    tensionValue: 0,
    intensityValue: 0,
    categoryValue: 50,
  });

  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSubmit(data, id);
    router.push("/emotion-records");
  }

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
  } = correspondingEntry;

  const correspondingEmotion = emotion
    ? emotionData.find((emotionObject) => emotionObject.slug === emotion)
    : { name: "emotion", color: "lightgray", subemotions: [] };

  // console.log("emotion:" + emotion);
  // const correspondingEmotion = emotionData.find(
  //   (emotionObject) => emotionObject.slug === emotion
  // );

  const { subemotions, name, color } = correspondingEmotion;
  // console.log("CorrespondingEmotion:", correspondingEmotion);
  // console.log("Corresponding Entry:", correspondingEntry);
  useEffect(
    () =>
      setFormValues({
        emotionValue: emotion,
        subemotions: subemotions,
        colorValue: color,
        tensionValue: tensionLevel,
        intensityValue: intensity,
        categoryValue: category,
      }),
    []
  );

  // function handleSubemotions(data) {
  //   const test = emotionData.find((object) => object.slug === data);
  //   const currentSubemotions = test.subemotions;
  //   setFormValues({ ...formValues, subemotions: currentSubemotions });
  // }

  function handleColorAndSubemotions(data) {
    const test = emotionData.find((object) => object.slug === data);
    const currentColor = test.color;
    const currentSubemotions = test.subemotions;

    setFormValues({
      ...formValues,
      colorValue: currentColor,
      subemotions: currentSubemotions,
    });
  }

  console.log(formValues);
  return (
    <>
      {editMode ? (
        <StyledH1>Edit your emotion entry</StyledH1>
      ) : (
        <StyledH1>Record your {name}</StyledH1>
      )}
      <StyledForm $color={formValues.colorValue} onSubmit={handleSubmit}>
        <p aria-label="Date and time">Date: {date}</p>

        {editMode ? (
          <>
            <TensionLabelEdit htmlFor="tension-level">
              Choose a tension level between 0 and 100:
            </TensionLabelEdit>
            <StyledInput
              aria-label="Adjust tension level between 0 and 100"
              id="tension-level"
              name="tensionLevel"
              type="range"
              value={formValues.tensionValue}
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
              <StyledSpan>{formValues.tensionValue}</StyledSpan>
              <StyledSpan>100</StyledSpan>
            </StyledWrapper>
          </>
        ) : (
          <p aria-label="Tension level">Tension-Level: {tensionLevel}%</p>
        )}

        {editMode ? (
          <>
            <label htmlFor="emotion">Select an emotion:</label>
            <StyledSelect
              value={formValues.emotion}
              id="emotion"
              name="emotion"
              onChange={(event) => {
                handleColorAndSubemotions(event.target.value.toLowerCase());
              }}
            >
              <option value={""}>--select a emotion--</option>
              <option value={""}>--none--</option>
              {emotionData.map((emo) => (
                <option key={emo.name} value={emo.name}>
                  {emo.name}
                </option>
              ))}
            </StyledSelect>
          </>
        ) : (
          <EmotionLabel htmlFor="emotion">
            Emotion:
            <StyledTextInput
              type="text"
              id="emotion"
              name="emotion"
              readOnly={editMode ? false : true}
              // value={editMode ? emotion : name}
              value={emotion}
              // onChange={(event) => {
              // const newColor = handleColor(event.target.value.toLowerCase);
              // setFormValues({ ...formValues, colorValue: newColor });
              // }}
            />
          </EmotionLabel>
        )}

        <label htmlFor="subemotion">* Select Subemotion:</label>
        <StyledSelect
          value={editMode ? subemotion : ""}
          id="subemotion"
          name="subemotion"
          required
        >
          <option value={""}>--select a subemotion--</option>
          <option value={""}>--none--</option>
          {formValues.subemotions.map((sub) => (
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
          value={formValues.intensityValue}
          max={100}
          required
          onChange={(event) =>
            setFormValues({
              ...formValues,
              intensityValue: event.target.value,
            })
          }
        />
        <StyledWrapper>
          <StyledSpan>0</StyledSpan>
          <StyledSpan>{formValues.intensityValue}</StyledSpan>
          <StyledSpan>100</StyledSpan>
        </StyledWrapper>
        <label htmlFor="category">* Association Category:</label>
        <input
          type="range"
          id="category"
          name="category"
          defaultValue={editMode ? category : 0}
          max={100}
          required
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
          defaultValue={editMode ? trigger : ""}
        ></StyledTextarea>
        <label htmlFor="notes">Notes: </label>
        <StyledTextarea
          id="notes"
          name="notes"
          defaultValue={editMode ? notes : ""}
        ></StyledTextarea>
        <StyledSubmitButton type="submit" $color={color}>
          Submit
        </StyledSubmitButton>
      </StyledForm>
      <StyledLink href="/" $color={color}>
        ← Back to Tension Entry
      </StyledLink>
      <StyledLink href="../emotion-records" $color={color}>
        ← Back to emotion records
      </StyledLink>
    </>
  );
}
