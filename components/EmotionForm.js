import styled from "styled-components";
import { useRouter } from "next/router";
import { emotionData } from "@/lib/db";
import { useState } from "react";
import Circle from "../public/circle.svg";
import ConfirmMessage from "./ConfirmMessage";
import {
  StyledInput,
  StyledWrapper,
  StyledFixedTitle,
  StyledForm,
  StyledSelect,
  StyledSubmitButton,
} from "@/SharedStyledComponents";
import { darkTheme } from "./Theme";

const StyledEmotionForm = styled(StyledForm)`
  border-radius: 10px;
  margin: 1rem;
  margin-top: 4rem;
  padding: 1rem;
  background: ${({ $color }) => $color};
  color: ${({ $text }) => $text};
  gap: 1rem;
`;

const TensionLabelEdit = styled.label`
  padding: 0;
  text-align: left;
`;

const StyledSpan = styled.span`
  font-size: 0.8rem;
`;

const StyledEmotionInput = styled(StyledInput)`
  background-color: var(--main-bright);
  border: 2px solid var(--text-on-bright);
  background: linear-gradient(
    to right,
    ${({ $inputColor }) => $inputColor} 0%,
    ${({ $inputColor }) => $inputColor} ${({ $value }) => $value}%,
    var(--contrast-bright) ${({ $value }) => $value}%,
    var(--contrast-bright) 100%
  );
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 2px solid var(--text-on-bright);
    background-image: radial-gradient(
      circle,
      var(--text-on-bright) 40%,
      ${({ $inputCircle }) => $inputCircle} 45%
    );
  }
  &::-moz-range-thumb {
    -webkit-appearance: none;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 2px solid var(--text-on-bright);
    background-image: radial-gradient(
      circle,
      var(--text-on-bright) 40%,
      ${({ $inputCircle }) => $inputCircle} 45%
    );
  }
`;

const StyledTextarea = styled.textarea`
  border: 2px solid var(--text-on-bright);
  border-radius: 6px;
`;

const StyledLabel = styled.label`
  position: relative;
`;

const ToggleSwitch = styled(Circle)`
  width: 1.7rem;
  position: absolute;
  display: inline;
  fill: ${({ $color }) => ($color ? "var(--disabled)" : "var(--enabled)")};
  border: 1px solid black;
  background: var(--contrast-bright);
  padding: 0.2rem;
  border-radius: 50%;
  margin-left: 0.5rem;
  right: 0;
  bottom: calc(50% - 0.85rem);
`;

export default function EmotionForm({
  slug,
  theme,
  editMode,
  onSubmit,
  id,
  correspondingEntry,
}) {
  const router = useRouter();

  const {
    timeAndDate,
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
      intensityValue: intensity ? intensity : "0",
      categoryValue: category ? category : "50",
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
      <StyledFixedTitle
        $color={theme === darkTheme ? `var(--${slug})` : `var(--main-dark)`}
      >
        {editMode
          ? emotionValue
            ? `Edit your ${emotionValue}`
            : `Edit your Emotion-Entry`
          : emotionValue
          ? `Record your ${emotionValue}`
          : `Record your Emotion-Entry`}
      </StyledFixedTitle>
      <StyledEmotionForm
        $color={
          theme === darkTheme ? `var(--section-background)` : `var(--${slug})`
        }
        $text={theme === darkTheme ? `var(--${slug})` : `var(--text-on-bright)`}
        onSubmit={handleSubmit}
      >
        <p aria-label="Date and time">
          {editMode ? `Entry from:` : "Date: "} {timeAndDate}
        </p>
        <TensionLabelEdit htmlFor="tension-level">
          Choose a tension level between 0 and 100:
        </TensionLabelEdit>
        <StyledEmotionInput
          aria-label="Adjust tension level between 0 and 100"
          id="tension-level"
          name="tensionLevel"
          type="range"
          $color={colorValue}
          $inputColor={
            theme === darkTheme ? `var(--${slug})` : `var(--text-on-bright)`
          }
          $inputCircle={
            theme === darkTheme ? `var(--${slug})` : `var(--text-on-dark)`
          }
          value={tensionValue}
          $value={tensionValue}
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
        <StyledEmotionInput
          disabled={emotionValue ? (toggleIntensity ? false : true) : true}
          type="range"
          id="intensity"
          name="intensity"
          $color={colorValue}
          value={intensityValue}
          $value={intensityValue}
          $inputColor={
            theme === darkTheme ? `var(--${slug})` : `var(--text-on-bright)`
          }
          $inputCircle={
            theme === darkTheme ? `var(--${slug})` : `var(--text-on-dark)`
          }
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
        <StyledEmotionInput
          disabled={emotionValue ? (toggleCategory ? false : true) : true}
          type="range"
          id="category"
          name="category"
          $color={colorValue}
          value={categoryValue}
          $value={categoryValue}
          $inputColor={
            theme === darkTheme ? `var(--${slug})` : `var(--text-on-bright)`
          }
          $inputCircle={
            theme === darkTheme ? `var(--${slug})` : `var(--text-on-dark)`
          }
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

        <StyledSubmitButton
          type="submit"
          $submit={
            theme === darkTheme ? `var(--${slug})` : `var(--text-on-dark)`
          }
          $submitBackground={
            theme === darkTheme ? `black` : `var(--text-on-bright)`
          }
        >
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
            cancelButtonColor={"var(--red)"}
            confirmButtonColor={"var(--green)"}
          >
            Your changes were saved successfully!
          </ConfirmMessage>
        )}
      </StyledEmotionForm>
    </>
  );
}
