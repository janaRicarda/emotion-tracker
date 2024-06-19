import { StyledTitle, StyledStandardLink } from "@/SharedStyledComponents";
import styled, { css } from "styled-components";
import FilterEmotionEntries from "@/components/FilterEmotionEntries";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useState, useCallback, useEffect, useRef } from "react";
import CalendarIcon from "/public/icons/calendar.svg";
import EmotionRecordsList from "../components/EmotionRecordsList";
import SmallFilterPanel from "@/components/SmallFilterPanel";
import ChartContainer from "@/components/ChartContainer";
import Icon from "@mdi/react";
import { mdiChartLine, mdiFormatListBulleted } from "@mdi/js";
import { breakpoints } from "@/utils/breakpoints";
import Head from "next/head";
import HighlightIcon from "../public/icons/highlight-icon.svg";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

// used for all transitions
const transition = css`
  transition: all 300ms ease;
`;

const GridWrapper = styled.section`
  box-shadow: ${({ $show }) => ($show ? "var(--box-shadow-filter)" : null)};
  position: fixed;
  padding: ${({ $show }) => ($show ? "1rem" : "0")};
  border-radius: 1rem;
  top: 200px;
  margin-top: 1rem;
  max-width: 500px;
  display: grid;
  grid-template-rows: ${({ $show }) => ($show ? "1fr" : "0fr")};
  ${transition}
  background-color: var(--section-background-contrast);
  z-index: 2;
  @media ${breakpoints.mobileLandscape} {
    top: 200px;
  }
  @media ${breakpoints.tablet} {
    display: block;
    box-shadow: none;
    padding: 1rem;
    top: 270px;
    left: 3rem;
    width: 25%;
  }
  @media ${breakpoints.laptop} {
    display: block;
    box-shadow: none;
    padding: 1rem;
    left: 5rem;
    width: 30%;
  }
`;

const ControllOverflow = styled.div`
  overflow: hidden;
`;

const StyledHeading = styled(StyledTitle)`
  width: 100%;
  padding: 1rem 0;
  position: fixed;
  top: ${({ $isScrollDown }) => ($isScrollDown ? "65px" : "110px")};
  ${transition}
  background-color: var(--main-bright);
  z-index: 1;
`;

const Background = styled.div`
  inset: 0;
  position: absolute;
  background: transparent;
  display: ${({ $show }) => ($show ? "block" : "none")};
  z-index: 2;
`;

const AnimatedPanel = styled.div`
  width: 92vw;
  margin: 0 0.5rem;
  border-top: 1px solid var(--main-dark);
  background-color: var(--main-bright);
  position: fixed;
  top: ${({ $isScrollDown }) => ($isScrollDown ? "121px" : "164px")};
  ${transition}
  z-index: 1;
`;

const StyledTextMessage = styled.article`
  text-align: center;
  line-height: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(StyledStandardLink)`
  padding: 0.5rem;
  background-color: var(--button-background);
  color: var(--contrast-text);
`;

const StyledHighlightIcon = styled(HighlightIcon)`
  width: 2rem;
  height: 2rem;
  display: inline;
  position: relative;
  top: 5px;
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 1.5rem;
  display: inline;
  vertical-align: bottom;
  fill: var(--main-dark);
`;

const StyledDateIndicator = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;

const StyledDateSpan = styled.span`
  background-color: var(--button-background);
  border-radius: 50px;
  padding: 0 0.5rem;
`;

const StyledListContainer = styled.div`
  width: 80vw;
  margin-top: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${breakpoints.tablet} {
    margin-left: 35%;
  }
  @media ${breakpoints.laptop} {
    margin-left: 40%;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 575px;
`;

const GraphToggleWrapper = styled.div`
  display: flex;
  padding: 0.3rem;

  & > label {
    transform: scale(0.6);
  }
`;

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
  handleToolTip,
  isScrollDown,
  theme,
  locale,
  useExampleData,
}) {
  const { t: translate } = useTranslation(["emotion-records"]);

  const [searchTerm, setSearchTerm] = useState();
  const [filteredEntries, setFilteredEntries] = useState(emotionEntries);
  const [shownEntries, setShownEntries] = useState(emotionEntries);
  const [selectedTime, setSelectedTime] = useState();
  const [buttonState, setButtonState] = useState({
    todayButton: true,
    name: "todayButton",
    label: `${translate("filterButtonToday")}`,
    singleComparison: true,
    daysAgo: 0,
  });

  const [showFilter, setShowFilter] = useState(false);
  const [chartIsShown, setChartIsShown] = useState(false);

  useEffect(() => {
    handleToolTip({
      text: `${translate("emotionRecordsTooltip")}`,
    });
  }, [translate]);

  useEffect(() => {
    setShowFilter(false);
  }, [buttonState]);

  const handleSetFilterEntries = useCallback((filteredObject) => {
    setFilteredEntries(filteredObject);
  }, []);

  const handleSetShownEntries = useCallback((entriesObjectAfterSearch) => {
    setShownEntries(entriesObjectAfterSearch);
  }, []);

  function handleSetButtonState(buttonObject) {
    setButtonState(buttonObject);
  }

  function handleSetSelectedTime(time) {
    setSelectedTime(time);
  }

  function handleSearch(input) {
    setSearchTerm(input);
  }

  function getFormattedDate(selectedDate) {
    const date = new Intl.DateTimeFormat(`de`, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(selectedDate);

    return date;
  }

  function DisplayDate() {
    return (
      <StyledParagraph aria-label={translate("selectedDate")}>
        <StyledDateSpan>
          {getFormattedDate(selectedTime.from)}
          {selectedTime.to &&
            selectedTime.from.toString() !== selectedTime.to.toString() &&
            " - " + getFormattedDate(selectedTime.to)}
        </StyledDateSpan>
      </StyledParagraph>
    );
  }

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === "Escape") {
        setShowFilter(false);
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
  });

  function closeOnKey(event) {
    if (event.code === "Enter") {
      setShowFilter(false);
    }
  }

  function handleChart() {
    setChartIsShown(!chartIsShown);
  }

  return (
    <>
      <Head>
        <title>Emotion Records</title>
      </Head>
      <Background $show={showFilter} onClick={() => setShowFilter(false)} />
      <StyledHeading $isScrollDown={isScrollDown}>
        {translate("emotionRecordsTitle")}
      </StyledHeading>
      <GridWrapper onKeyDown={closeOnKey} $show={showFilter}>
        <ControllOverflow>
          <FilterEmotionEntries
            emotionEntries={emotionEntries}
            filteredEntries={filteredEntries}
            buttonState={buttonState}
            searchTerm={searchTerm}
            selectedTime={selectedTime}
            onSearch={handleSearch}
            changeShownEntries={handleSetShownEntries}
            changeButtonState={handleSetButtonState}
            changeFilterEntries={handleSetFilterEntries}
            changeSelectedTime={handleSetSelectedTime}
            DisplayDate={DisplayDate}
          />
        </ControllOverflow>
      </GridWrapper>
      <AnimatedPanel
        onClick={() => setShowFilter(!showFilter)}
        $isScrollDown={isScrollDown}
      >
        <SmallFilterPanel
          buttonState={buttonState}
          searchTerm={searchTerm}
          DisplayDate={DisplayDate}
          selectedTime={selectedTime}
        />
      </AnimatedPanel>
      <StyledListContainer>
        {shownEntries.length === 0 &&
          (filteredEntries.length === 0 ? (
            buttonState.highlightedButton ? (
              <StyledTextMessage>
                {translate("noEntriesHighlighted")} <StyledHighlightIcon />{" "}
                {translate("toHighlightEntry")}
              </StyledTextMessage>
            ) : buttonState.todayButton ? (
              <StyledTextMessage>
                {translate("noEntriesMadeToday")}
                <br></br>
                <StyledLink href="./">{translate("addEntry")}</StyledLink>
              </StyledTextMessage>
            ) : buttonState.datePicker && !selectedTime ? (
              <StyledDateIndicator>
                {translate("clickTheCalendar")} <StyledCalendarIcon />{" "}
                {translate("selectADate")}
              </StyledDateIndicator>
            ) : (
              <StyledTextMessage>{translate("nothingFound")}</StyledTextMessage>
            )
          ) : (
            <StyledTextMessage>{translate("nothingFound")}</StyledTextMessage>
          ))}

        {shownEntries.length !== 0 && (
          <StyledWrapper>
            <p>
              {translate("results")} {shownEntries.length}
            </p>
            <GraphToggleWrapper>
              <Icon path={mdiFormatListBulleted} size={1} />
              <ToggleSwitch
                handleSwitch={handleChart}
                isChecked={chartIsShown}
                useButtonColor={true}
              />
              <Icon path={mdiChartLine} size={1} />
            </GraphToggleWrapper>
          </StyledWrapper>
        )}

        {shownEntries.length !== 0 && !chartIsShown && (
          <EmotionRecordsList
            onDeleteEmotionEntry={onDeleteEmotionEntry}
            toggleHighlight={toggleHighlight}
            shownEntries={shownEntries}
            filteredEntries={filteredEntries}
            useExampleData={useExampleData}
            locale={locale}
          />
        )}
        {chartIsShown && (
          <ChartContainer
            shownEntries={shownEntries}
            theme={theme}
            locale={locale}
          />
        )}
      </StyledListContainer>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["emotion-records", "common"])),
    },
  };
}
