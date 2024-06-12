import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import Circle from "../public/icons/circle.svg";
import ConfirmMessage from "./ConfirmMessage";
import {
  StyledInput,
  StyledWrapper,
  StyledTitle,
  StyledForm,
  StyledSelect,
  StyledSubmitButton,
} from "@/SharedStyledComponents";
import { darkTheme } from "./Theme";
import { useTranslation } from "next-i18next";

const StyledEmotionForm = styled(StyledForm)`
  border-radius: 10px;
  margin: 1rem;
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
  border: 1px solid var(--text-on-bright);
  background: var(--contrast-bright);
  padding: 0.2rem;
  border-radius: 50%;
  margin-left: 0.5rem;
  right: 0;
  bottom: calc(50% - 0.85rem);
`;

export default function EmotionForm({
  theme,
  slug,
  editMode,
  onSubmit,
  id,
  correspondingEntry,
}) {
  const router = useRouter();

  const { t: translate } = useTranslation("emotions");

  const emotionData = translate("emotionData", { returnObjects: true });

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

    const foundEmotion = emotion
      ? emotionData.find((emotionObject) => emotionObject.name === emotion)
      : inCaseOfNoEmotion;

    const { color, subemotions } = foundEmotion || inCaseOfNoEmotion;

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
    <StyledEmotionForm
      $color={
        theme === darkTheme ? "var(--section-background)" : `${colorValue}`
      }
      $text={theme === darkTheme ? `${colorValue}` : "var(--contrast-text)"}
      onSubmit={handleSubmit}
    >
      <StyledTitle>
        {editMode
          ? emotionValue
            ? `${translate("editYour")} ${emotionValue}`
            : `Edit your Emotion-Entry`
          : emotionValue
          ? `${translate("recordYour")} ${emotionValue}`
          : `Record your Emotion-Entry`}
      </StyledTitle>
      <p aria-label="Date and time">
        {editMode ? `${translate("entryFrom")}: ` : `${translate("date")}: `}
        {timeAndDate}
      </p>
      <TensionLabelEdit htmlFor="tension-level">
        {translate("chooseIntensity")}
      </TensionLabelEdit>
      <StyledEmotionInput
        aria-label="Adjust tension level between 0 and 100"
        id="tension-level"
        name="tensionLevel"
        type="range"
        $inputColor={
          theme === darkTheme ? `${colorValue}` : `var(--text-on-bright)`
        }
        $inputCircle={
          theme === darkTheme ? `${colorValue}` : `var(--text-on-dark)`
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
      <label htmlFor="emotion">{translate("selectEmotion")}</label>
      <StyledSelect
        id="emotion"
        name="emotion"
        value={emotionValue}
        onChange={(event) => {
          handleChangeEmotion(event.target.value);
        }}
      >
        <option value={""}>{translate("inputSelectEmotion")}</option>
        {emotionData.map((emotion) => (
          <option key={emotion.name} value={emotion.name}>
            {emotion.name}
          </option>
        ))}
      </StyledSelect>
      <label htmlFor="subemotion">{translate("selectSubemotion")}</label>
      <StyledSelect
        disabled={emotionValue ? false : true}
        value={selectedSubemotionValue}
        id="subemotion"
        name="subemotion"
        onChange={(event) =>
          setFormValues({
            ...formValues,
            selectedSubemotionValue: event.target.value,
          })
        }
      >
        <option value={""}>{translate("inputSelectSubemotion")}</option>
        {subemotionOptions.map((subemotion) => (
          <option key={subemotion} value={subemotion}>
            {subemotion}
          </option>
        ))}
      </StyledSelect>
      <StyledLabel htmlFor="intensity">
        {translate("emotionIntensity")}
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
        value={intensityValue}
        $value={intensityValue}
        $inputColor={
          theme === darkTheme ? `${colorValue}` : `var(--text-on-bright)`
        }
        $inputCircle={
          theme === darkTheme ? `${colorValue}` : `var(--text-on-dark)`
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
        {translate("associationCategory")}
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
        value={categoryValue}
        $value={categoryValue}
        $inputColor={
          theme === darkTheme ? `${colorValue}` : `var(--text-on-bright)`
        }
        $inputCircle={
          theme === darkTheme ? `${colorValue}` : `var(--text-on-dark)`
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
          {emotionValue
            ? toggleCategory
              ? `${translate("unpleasant")}`
              : ""
            : ""}
        </StyledSpan>
        <StyledSpan>
          {emotionValue
            ? toggleCategory
              ? `${translate("neutral")}`
              : "Disabled"
            : "Disabled"}
        </StyledSpan>
        <StyledSpan>
          {emotionValue
            ? toggleCategory
              ? `${translate("pleasant")}`
              : ""
            : ""}
        </StyledSpan>
      </StyledWrapper>
      <label htmlFor="trigger">{translate("trigger")}</label>
      <StyledTextarea
        id="trigger"
        name="trigger"
        defaultValue={triggerValue}
      ></StyledTextarea>
      <label htmlFor="notes">{translate("notes")}</label>
      <StyledTextarea
        id="notes"
        name="notes"
        defaultValue={notesValue}
      ></StyledTextarea>
      <StyledSubmitButton
        type="submit"
        $submit={theme === darkTheme ? `var(--${slug})` : `var(--text-on-dark)`}
        $submitBackground={
          theme === darkTheme ? `black` : `var(--text-on-bright)`
        }
      >
        {translate("submitChanges")}
      </StyledSubmitButton>
      {showConfirmMessage && (
        <ConfirmMessage
          toggleMessage={() => setShowConfirmMessage(false)}
          confirmFunction={() => {
            router.push("/emotion-records");
          }}
          cancelButtonText={translate("keepEditing")}
          confirmButtonText={translate("goToEmotionRecords")}
          cancelButtonColor={"var(--red)"}
          confirmButtonColor={"var(--green)"}
        >
          {translate("successConfirmation")}
        </ConfirmMessage>
      )}
    </StyledEmotionForm>
  );
}
