import {
  StyledTitle,
  StyledFlexColumnWrapper,
  StyledStandardLink,
  StyledButton,
  StyledWrapper,
} from "@/SharedStyledComponents";
import styled, { css } from "styled-components";
import FilterEmotionEntries from "@/components/FilterEmotionEntries";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useState, useCallback, useEffect, useRef } from "react";
import HeartOutlineIcon from "../public/heart-outline.svg";
import CalendarIcon from "/public/calendar.svg";
import EmotionRecordsList from "../components/EmotionRecordsList";
import SmallFilterPanel from "@/components/SmallFilterPanel";
import Icon from "@mdi/react";
import { mdiChartLine, mdiChartBar, mdiFormatListBulleted } from "@mdi/js";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import {
  chartPresets,
  doTensionChartData,
  countEmotions,
} from "@/utils/chartUtils";

const EmotionChart = dynamic(() => import("../components/EmotionChart"), {
  ssr: false,
  loading: () => <Loader itemText="... loading" />,
});

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
  max-width: 500px;
  display: grid;
  grid-template-rows: ${({ $show }) => ($show ? "1fr" : "0fr")};
  ${transition}
  background-color: var(--section-background-contrast);
  z-index: 2;
`;

const ControllOverflow = styled.div`
  overflow: hidden;
`;

const ControlPadding = styled.div`
  margin-top: 5rem;
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
  width: 90vw;
  margin: 0.5rem;
  border-top: 1px solid black;
  background-color: var(--main-bright);
  position: fixed;
  top: ${({ $isScrollDown }) => ($isScrollDown ? "121px" : "166px")};
  ${transition}
  z-index: 1;
`;

const StyledTextMessage = styled.article`
  margin-top: 8rem;
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

const StyledHeartSymbol = styled(HeartOutlineIcon)`
  width: 1.4rem;
  display: inline;
  position: relative;
  fill: var(--main-dark);
  top: 5px;
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 1.5rem;
  display: inline;
  vertical-align: bottom;
  fill: var(--main-dark);
`;

const StyledDateIndicator = styled.article`
  margin: 2rem auto 1rem;
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

const ChartWrapper = styled.div`
  display: grid;
  width: 80vw;
  min-height: 340px;
  max-height: fit-content;
  margin-top: 8rem;
  border: 1px solid var(--main-dark);
  border-radius: 6px;
  grid-template-columns: 1fr 15fr;
  /* background-color: #8e60d0; */
`;

const ChartPlaceholder = styled.div`
  min-width: 300px;
  align-items: center;
`;

const StyledGraphButton = styled(StyledButton)`
  width: 5rem;
  padding: 0.3rem;
  border-style: none;
  margin: 1rem 1rem 0 1rem;
`;

const ToggleContainer = styled(StyledWrapper)`
  padding: 0.3rem;
  margin: 1rem 1rem 0 1rem;
  gap: 0.2rem;
  background-color: var(--button-background);
  border-radius: 6px;
`;
const SwitchSizer = styled.span`
  transform: scale(0.6);
`;

const StyledGraphButtonsWrapper = styled(StyledFlexColumnWrapper)`
  align-items: center;
`;

const GraphToggleWrapper = styled.div`
  display: flex;
  flex-flow: row;
  position: absolute;
  top: 130px;
  right: 10vw;
  height: 2rem;
  gap: 0.5rem;
  margin: 5rem 0 0;
  align-items: flex-end;
`;

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
  handleToolTip,
  isScrollDown,
  theme,
}) {
  const [searchTerm, setSearchTerm] = useState();
  const [filteredEntries, setFilteredEntries] = useState(emotionEntries);
  const [shownEntries, setShownEntries] = useState(emotionEntries);
  const [selectedTime, setSelectedTime] = useState();
  const [buttonState, setButtonState] = useState({
    todayButton: true,
    name: "todayButton",
    label: "Today",
    singleComparison: true,
    daysAgo: 0,
  });

  //logic for Graph

  const [chartState, setChartState] = useState({
    chartIsShown: false,
    scatter: true,
    type: "scatter",
    listIsShown: true,
    chartData: chartPresets.initialPreset,
  });

  const { chartIsShown, type, scatter, listIsShown, chartData } = chartState;
  const { title, xValues, yValues, xTitle, yTitle } = chartData;

  function handleChart() {
    setChartState({
      ...chartState,
      chartIsShown: !chartIsShown,
      listIsShown: !listIsShown,
    });
  }

  function handleChartType() {
    setChartState({
      ...chartState,
      type: type === "scatter" ? "bar" : type === "bar" ? "scatter" : "scatter",
      scatter: !scatter,
    });
  }

  function handleTensionChart(entries) {
    setChartState({
      ...chartState,
      chartData: {
        ...chartPresets.tension,
        xValues: doTensionChartData(entries).xValues,
        yValues: doTensionChartData(entries).yValues,
      },
    });
  }

  function handleEmotionChart() {
    const countResult = countEmotions(shownEntries);

    const emotions = countResult.map((element) => element.emotion);
    const counts = countResult.map((element) => element.count);
    setChartState({
      ...chartState,
      chartData: {
        ...chartPresets.emotions,
        xValues: emotions,
        yValues: counts,
      },
    });
  }

  useEffect(() => {
    setChartState({
      ...chartState,
      chartData: {
        ...chartPresets.tension,
        xValues: doTensionChartData(shownEntries).xValues,
        yValues: doTensionChartData(shownEntries).yValues,
      },
    });
  }, []);

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    handleToolTip({
      text: "Navigate through your emotion records list, a comprehensive compilation of all your added emotion entries. You can easily search for specific entries, edit or delete them, and even highlight important moments. Also, you can search through your entries or filter them by the following options: today, last week, or last month.",
    });
  }, []);

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
      <StyledParagraph aria-label="Selected Date">
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

  return (
    <>
      <Background $show={showFilter} onClick={() => setShowFilter(false)} />
      <StyledHeading $isScrollDown={isScrollDown}>
        Recorded Emotions
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

      {chartIsShown && (
        <ChartWrapper>
          <StyledGraphButtonsWrapper>
            <ToggleContainer>
              <Icon path={mdiChartLine} size={1} />
              <SwitchSizer>
                <ToggleSwitch
                  handleSwitch={handleChartType}
                  isChecked={!scatter}
                  // text={"Switch type"}
                />
              </SwitchSizer>
              <Icon path={mdiChartBar} size={1} />
            </ToggleContainer>
            <StyledGraphButton type="button" onClick={handleTensionChart}>
              Tension
            </StyledGraphButton>
            <StyledGraphButton
              type="button"
              onClick={() =>
                setChartState({
                  ...chartState,
                  yTitle: "intensity",
                  Title: "Intensity Chart",
                })
              }
            >
              Intensity
            </StyledGraphButton>
            <StyledGraphButton type="button" onClick={handleEmotionChart}>
              Emotions
            </StyledGraphButton>
          </StyledGraphButtonsWrapper>
          <ChartPlaceholder>
            {chartState.chartIsShown === true ? (
              <EmotionChart
                theme={theme}
                type={type}
                xValues={xValues}
                yValues={yValues}
                xTitle={xTitle}
                yTitle={yTitle}
                title={title}
              />
            ) : null}
          </ChartPlaceholder>
        </ChartWrapper>
      )}

      {buttonState.datePicker ? (
        selectedTime ? (
          <DisplayDate textAlign="center" />
        ) : (
          <StyledDateIndicator>
            Click the calendar <StyledCalendarIcon /> and select a date
          </StyledDateIndicator>
        )
      ) : null}
      {shownEntries.length === 0 &&
        (filteredEntries.length === 0 ? (
          buttonState.highlightedButton ? (
            <StyledTextMessage>
              You haven&apos;t highlighted any Entries yet. Click the{" "}
              <StyledHeartSymbol /> on a Entry to highlight it.
            </StyledTextMessage>
          ) : buttonState.todayButton ? (
            <StyledTextMessage>
              You haven&apos;t made any Entries today.<br></br>
              <StyledLink href="./">add Entry &rarr;</StyledLink>
            </StyledTextMessage>
          ) : (
            <StyledTextMessage>sorry, nothing found</StyledTextMessage>
          )
        ) : (
          <StyledTextMessage>sorry, nothing found</StyledTextMessage>
        ))}
      <GraphToggleWrapper>
        <Icon path={mdiFormatListBulleted} size={1} />
        <SwitchSizer>
          <ToggleSwitch
            handleSwitch={handleChart}
            isChecked={chartIsShown}
            // text={"Show chart"}
          />
        </SwitchSizer>
        <Icon path={mdiChartLine} size={1} />
      </GraphToggleWrapper>
      {shownEntries.length !== 0 && listIsShown && (
        <ControlPadding>
          <EmotionRecordsList
            onDeleteEmotionEntry={onDeleteEmotionEntry}
            toggleHighlight={toggleHighlight}
            shownEntries={shownEntries}
            filteredEntries={filteredEntries}
          />
        </ControlPadding>
      )}
    </>
  );
}
