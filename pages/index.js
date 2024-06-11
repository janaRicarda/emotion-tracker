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
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";
import { breakpoints } from "@/utils/breakpoints";
import Head from "next/head";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useSession } from "next-auth/react";

const TensionChart = dynamic(() => import("../components/TensionChart"), {
  ssr: false,
  loading: () => <Loader itemText="... loading" />,
});

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

const ToggleSwitchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  position: relative;
  top: 0px;
  left: 100px;
  transform: scale(0.7);
  padding: 0.1rem;
`;

const StyledInfoIcon = styled.span`
  background-color: var(--button-background);
  color: var(--contrast-text);
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 0.1rem;
  line-height: 1.5rem;
  text-align: center;
`;

const StyledInfoBox = styled.div`
  display: ${({ $show }) => ($show ? "block" : "none")};
  position: absolute;
  left: -6rem;
  top: 3rem;
  border: 1px solid white;
  border-radius: 6px;
  padding: 0.5rem;
  background-color: var(--button-background);
  color: var(--contrast-text);

  & > span {
    display: block;
  }

  & > :nth-child(2) {
    margin-top: 1rem;
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

const StyledGraphButton = styled(StyledButton)`
  width: fit-content;
  padding: 0.5rem;
  border-style: none;
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
  toggleExampleData,
  useExampleData,
}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [id, setId] = useState();
  const [tension, setTension] = useState(0);
  const [chartIsShown, setChartIsShown] = useState(false);
  const [showInfoBox, setShowInfoBox] = useState(false);
  console.log(emotionEntries);

  const newestDbEntryID = emotionEntries?.length
    ? emotionEntries[emotionEntries.length - 1]?._id
    : null;

  const { data: session } = useSession();

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

  //logic for Graph
  const currentShortDate = new Date().toISOString().slice(0, 10);
  function compare(a, b) {
    if (a.isoDate < b.isoDate) {
      return -1;
    }
    if (a.isoDate > b.isoDate) {
      return 1;
    }
    return 0;
  }
  const filteredData = emotionEntries
    ? emotionEntries
        .filter((entry) => currentShortDate === entry.isoDate?.slice(0, 10))
        .sort(compare)
    : [];
  const xValues = filteredData.map((entry) => entry.timeAndDate.slice(-5));
  const yValues = filteredData.map((entry) => entry.tensionLevel);
  function handleChart() {
    setChartIsShown(!chartIsShown);
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <StyledFlexColumnWrapper>
        {session && (
          <ToggleSwitchWrapper>
            <StyledInfoIcon
              onClick={() => {
                setShowInfoBox(!showInfoBox);
              }}
            >
              &#8505;
            </StyledInfoIcon>
            <StyledInfoBox
              onClick={() => {
                setShowInfoBox(false);
              }}
              $show={showInfoBox}
            >
              <span>
                OFF: Displayed Data is real and comes from your own database.
              </span>
              <span> ON: Data is generated locally and fictional.</span>
            </StyledInfoBox>
            <ToggleSwitch
              handleSwitch={toggleExampleData}
              isChecked={useExampleData}
              text={"Use Example data"}
            />
          </ToggleSwitchWrapper>
        )}

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
        <TensionChart
          emotionEntries={emotionEntries}
          theme={theme}
          xValues={xValues}
          yValues={yValues}
          title="Daily Tension Graph"
        />
        <StyledGraphButton type="button" onClick={handleChart}>
          {chartIsShown === true ? "Hide chart" : "Show chart"}
        </StyledGraphButton>
      </StyledFlexColumnWrapper>
    </>
  );
}
