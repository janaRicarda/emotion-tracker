import styled from "styled-components";
import { useEffect, useState } from "react";
import { uid } from "uid";
import {
  StyledWrapper,
  StyledButton,
  StyledStandardLink,
  StyledInput,
  StyledForm,
  StyledFlexColumnWrapper,
} from "@/SharedStyledComponents";

import { breakpoints } from "@/utils/breakpoints";
import Head from "next/head";

const StyledTensionForm = styled(StyledForm)`
  margin: 1rem;
  padding: 1rem;
  align-items: center;
  width: 80vw;
  background: var(--section-background);
  border-radius: 6px;
  @media ${breakpoints.mobileLandscape} {
    height: 60vh;
    padding: 1rem;
    margin-top: 0;
  }
  @media ${breakpoints.tablet} {
    width: 60vw;
  }
  @media ${breakpoints.laptop} {
    width: 40vw;
  }
`;

const StyledTensionLabel = styled.label`
  padding: 1rem 1rem 2rem;
  text-align: center;
`;

const StyledSpan = styled.span`
  padding: 0.6rem 0 0;
  font-size: 1.2rem;
`;

const StyledTensionDisplay = styled.p`
  font-size: 1.2rem;
  margin: 0 0 1rem;
`;

const StyledMessage = styled.p`
  align-self: center;
  text-align: center;
  font-weight: 600;
  margin: 1rem auto;
`;

const StyledButtonWrapper = styled(StyledWrapper)`
  justify-content: center;
`;

const SaveButton = styled(StyledButton)`
  border: none;
`;

const StyledBackButton = styled.input`
  width: 10rem;
  text-decoration: none;
  color: var(--contrast-text);
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  border-style: none;
  text-align: center;
  background-color: var(--button-background);
`;
const StyledAddDetailsLink = styled(StyledStandardLink)`
  color: var(--contrast-text);
  width: 10rem;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: var(--button-background);
`;

export default function HomePage({
  onAddEmotionEntry,
  handleToolTip,
  emotionEntries,
  theme,
  useExampleData,
}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [id, setId] = useState();
  const [tension, setTension] = useState(0);
  const [chartIsShown, setChartIsShown] = useState(false);

  const newestDbEntryID = emotionEntries?.length
    ? emotionEntries[emotionEntries.length - 1]?._id
    : null;

  //const newestDbEntryID = emotionEntries[emotionEntries.length - 1]?._id;

  useEffect(() => {
    handleToolTip({
      text: "On this page, you can indicate your level of tension on a range scale from 0 to 100. Afterward, simply press the Save-button to record your input.",
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newId = uid();

    onAddEmotionEntry(data, newId);
    setId(newId);
    setIsFormSubmitted(!isFormSubmitted);
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <StyledFlexColumnWrapper>
        <StyledTensionForm onSubmit={handleSubmit}>
          <StyledTensionLabel htmlFor="tension-level">
            On a scale from 0 to 100, how tense do you feel in this moment?
          </StyledTensionLabel>
          <StyledInput
            aria-label="Adjust tension level between 0 and 100"
            id="tension-level"
            name="tensionLevel"
            type="range"
            value={tension}
            $value={tension}
            max={100}
            onChange={(event) => setTension(event.target.value)}
          />
          <StyledWrapper>
            <StyledSpan>0</StyledSpan>
            <StyledSpan>100</StyledSpan>
          </StyledWrapper>

          {!isFormSubmitted && (
            <>
              <StyledTensionDisplay>{tension}</StyledTensionDisplay>
              <SaveButton type="submit">Save</SaveButton>
            </>
          )}

          {isFormSubmitted && (
            <>
              <StyledMessage>Your entry was successfully saved!</StyledMessage>
              <StyledButtonWrapper>
                <StyledBackButton
                  type="reset"
                  value={"Done"}
                  onClick={() => {
                    setIsFormSubmitted(!isFormSubmitted);
                    setTension("0");
                  }}
                />

                <StyledAddDetailsLink
                  href={{
                    pathname: "/create",
                    query: { id: useExampleData ? id : newestDbEntryID },
                  }}
                  forwardedAs={`/create`}
                >
                  Add more details
                </StyledAddDetailsLink>
              </StyledButtonWrapper>
            </>
          )}
        </StyledTensionForm>
      </StyledFlexColumnWrapper>
    </>
  );
}
