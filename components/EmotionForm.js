import styled from "styled-components";
import { useRouter } from "next/router";
import { emotionData } from "@/lib/db";
import { useState } from "react";
import Circle from "../public/circle.svg";
import ConfirmMessage from "./ConfirmMessage";
import {
  StyledInput,
  StyledWrapper,
  StyledBasicTitle,
  StyledButton,
  StyledForm,
} from "@/SharedStyledComponents";

const StyledEmotionFormTitle = styled(StyledBasicTitle)`
  width: 100vw;
  top: 120px;
  left: 0;
  background: linear-gradient(transparent, var(--main-bright) 20%);
`;

const StyledEmotionForm = styled(StyledForm)`
  border-radius: 10px;
  margin: 1rem;
  margin-top: 50px;
  padding: 1rem;
  background-color: ${({ $color }) => $color};
  gap: 1rem;
`;

const TensionLabelEdit = styled.label`
  padding: 0;
  text-align: left;
`;

const StyledSpan = styled.span`
  font-size: 0.8rem;
`;

const StyledSelect = styled.select`
  border-radius: 6px;
  padding: 0.3rem 0;
`;

const StyledTextarea = styled.textarea`
  border: 1px solid black;
  border-radius: 6px;
`;

const StyledSubmitButton = styled(StyledButton)`
  background-color: white;
  padding: 0.5rem;
  margin: 0;
  width: inherit;
  &:hover {
    background-color: darkslateblue;
    color: ${({ $color }) => $color};
  }
`;

const StyledLabel = styled.label`
  position: relative;
`;

const ToggleSwitch = styled(Circle)`
  width: 1.7rem;
  position: absolute;
  display: inline;
  fill: ${({ $color }) => ($color ? "#00b400" : "#cc0100")};
  margin-left: 0.5rem;
  bottom: calc(50% - 0.85rem);
`;

export default function EmotionForm({
  editMode,
  onSubmit,
  id,
  correspondingEntry,
}) {
  const router = useRouter();

  const {
    date,
    emotion,
    tensionLevel,
    subemotion,
    intensity,
    category,
    trigger,
    notes,
  } = correspondingEntry;

  const [formValues, setFormValues] = useState(() => {
    const inCaseOfNoEmotion = {
      color: "lightgray",
      subemotions: [],
    };
    const { color, subemotions } = emotion
      ? emotionData.find((emotionObject) => emotionObject.name === emotion)
      : inCaseOfNoEmotion;
    return {
      tensionValue: tensionLevel,
      emotionValue: emotion,
      selectedSubemotionValue: subemotion,
      intensityValue: intensity ? intensity : 0,
      categoryValue: category,
      triggerValue: trigger,
      notesValue: notes,
      subemotionOptions: subemotions,
      colorValue: color,
    };
  });

  // for enable/disable intensity/category inputs
  const [toggleRangeInputs, setTogggleRangeInputs] = useState({
    toggleIntensity: true,
    toggleCategory: true,
  });
  const { toggleIntensity, toggleCategory } = toggleRangeInputs;

  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const {
    tensionValue,
    emotionValue,
    selectedSubemotionValue,
    intensityValue,
    categoryValue,
    triggerValue,
    notesValue,
    subemotionOptions,
    colorValue,
  } = formValues;

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const updatedIntensity = toggleIntensity ? intensityValue : "";
    const updatedCategory = toggleCategory ? categoryValue : "";

    const updatedData = {
      ...data,
      intensity: updatedIntensity,
      category: updatedCategory,
    };
    onSubmit(updatedData, id);
    setShowConfirmMessage(true);
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

  return (
    <>
      <StyledEmotionFormTitle>
        {editMode
          ? emotionValue
            ? `Edit your ${emotionValue}`
            : `Edit your Emotion-Entry`
          : emotionValue
          ? `Record your ${emotionValue}`
          : `Record your Emotion-Entry`}
      </StyledEmotionFormTitle>
      <StyledEmotionForm $color={colorValue} onSubmit={handleSubmit}>
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
          <option value={""}>--select emotion--</option>
          {emotionData.map((emotion) => (
            <option key={emotion.name} value={emotion.name}>
              {emotion.name}
            </option>
          ))}
        </StyledSelect>
        <label htmlFor="subemotion">Select Subemotion:</label>
        <StyledSelect
          disabled={emotionValue ? false : true}
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
          <option value={""}>--select subemotion--</option>
          {subemotionOptions.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </StyledSelect>
        <StyledLabel htmlFor="intensity">
          Emotion Intensity:{" "}
          {emotionValue && (
            <ToggleSwitch
              aria-label="Switch intensity input on and off"
              $color={toggleIntensity}
              onClick={() =>
                setTogggleRangeInputs({
                  ...toggleRangeInputs,
                  toggleIntensity: !toggleIntensity,
                })
              }
            >
              {emotionValue ? (toggleIntensity ? "O" : "O") : "O"}
            </ToggleSwitch>
          )}
        </StyledLabel>
        <input
          disabled={emotionValue ? (toggleIntensity ? false : true) : true}
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
          <StyledSpan>
            {emotionValue ? (toggleIntensity ? 0 : "") : ""}
          </StyledSpan>
          <StyledSpan>
            {emotionValue
              ? toggleIntensity
                ? intensityValue
                : "Disabled"
              : "Disabled"}
          </StyledSpan>
          <StyledSpan>
            {emotionValue ? (toggleIntensity ? 100 : "") : ""}
          </StyledSpan>
        </StyledWrapper>
        <StyledLabel htmlFor="category">
          Association Category:{" "}
          {emotionValue && (
            <ToggleSwitch
              aria-label="Switch association category input on and off"
              $color={toggleCategory}
              onClick={() =>
                setTogggleRangeInputs({
                  ...toggleRangeInputs,
                  toggleCategory: !toggleCategory,
                })
              }
            >
              {emotionValue
                ? toggleCategory
                  ? "Disable"
                  : "Enable"
                : "Disabled"}
            </ToggleSwitch>
          )}
        </StyledLabel>
        <input
          disabled={emotionValue ? (toggleCategory ? false : true) : true}
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
          <StyledSpan>
            {emotionValue ? (toggleCategory ? "unpleasant" : "") : ""}
          </StyledSpan>
          <StyledSpan>
            {emotionValue
              ? toggleCategory
                ? "neutral"
                : "Disabled"
              : "Disabled"}
          </StyledSpan>
          <StyledSpan>
            {emotionValue ? (toggleCategory ? "pleasant" : "") : ""}
          </StyledSpan>
        </StyledWrapper>
        <label htmlFor="trigger">Trigger:</label>
        <StyledTextarea
          id="trigger"
          name="trigger"
          defaultValue={triggerValue}
        ></StyledTextarea>
        <label htmlFor="notes">Notes: </label>
        <StyledTextarea
          id="notes"
          name="notes"
          defaultValue={notesValue}
        ></StyledTextarea>

        <StyledSubmitButton type="submit" $color={colorValue}>
          Submit
        </StyledSubmitButton>
        {showConfirmMessage && (
          <ConfirmMessage
            toggleMessage={() => setShowConfirmMessage(false)}
            confirmFunction={() => {
              router.push("/emotion-records");
            }}
            cancelButtonText={"Keep editing"}
            confirmButtonText={"Go to emotion records"}
            cancelButtonColor={"#cc0100"}
            confirmButtonColor={"#00b400"}
          >
            Your changes were saved successfully!
          </ConfirmMessage>
        )}
      </StyledEmotionForm>
    </>
  );
}
