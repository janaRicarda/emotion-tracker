import styled, { css } from "styled-components";
import { StyledTitle, StyledStandardLink } from "@/SharedStyledComponents";
import Head from "next/head";
import { useState, useCallback, useEffect } from "react";
import HighlightIcon from "../public/icons/highlight-icon.svg";
import CalendarIcon from "/public/icons/calendar.svg";
import ChartContainer from "@/components/ChartContainer";
import EmotionRecordsList from "../components/EmotionRecordsList";
import Export from "@/components/Export";
import FilterEmotionEntries from "@/components/FilterEmotionEntries";
import SmallFilterPanel from "@/components/SmallFilterPanel";
import ToggleSwitch from "@/components/ToggleSwitch";
import Icon from "@mdi/react";
import { mdiChartLine, mdiFormatListBulleted } from "@mdi/js";
import { breakpoints } from "@/utils/breakpoints";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

// used for all transitions
const transition = css`
  transition: all 300ms ease;
`;

// const StyledCalendarIcon = styled(CalendarIcon)`
//   width: 1.5rem;
//   display: inline;
//   vertical-align: bottom;
// `;

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
    top: 16rem;
    left: 3rem;
    width: 25%;
  }
  @media ${breakpoints.laptop} {
    display: block;
    box-shadow: none;
    padding: 1rem;
    left: 11%;
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
  top: ${({ $isScrollDown }) => ($isScrollDown ? "65px" : "99px")};
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
  width: 100vw;
  margin: 0 0.5rem;
  background-color: var(--main-bright);
  display: flex;
  justify-content: center;
  position: fixed;
  top: ${({ $isScrollDown }) => ($isScrollDown ? "121px" : "163px")};
  ${transition}
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 4vw;
    width: 92vw;
    height: 1px;
    background-color: var(--main-dark);
    z-index: 2;
  }
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
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 1.5rem;
  margin: 1rem;
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
  align-items: center;
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
  dashboardState,
  onHandleDashboardReset,
}) {
  const [isLoading, setIsLoading] = useState(true);
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

  const [showFilter, setShowFilter] = useState(false);
  const [chartIsShown, setChartIsShown] = useState(false);
  const [chartRefForDownload, setChartRefForDownload] = useState(null);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  useEffect(() => {
    handleToolTip({
      text: "Navigate through your emotion records list, a comprehensive compilation of all your added emotion entries. You can easily search for specific entries, edit or delete them, and even highlight important moments. Also, you can search through your entries or filter them by the following options: today, last week, or last month. Above the list to the right is a switch to display the data as chart instead of the list.",
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
    console.log(selectedTime);
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

  function handleChart() {
    setChartIsShown(!chartIsShown);
  }

  //showing emotion chosen on dashboard
  const {
    dashboardId,
    dashboardDate,
    dashboardTimeStamp,
    showChartForDashboardLink,
  } = dashboardState;

  function setDashBoardTimeForFilter() {
    const correctedStartDate = new Date(dashboardTimeStamp);
    correctedStartDate.setHours(0, 0);
    const selectedStartDate = correctedStartDate.getTime();
    const newSelectedTime = {
      from: new Date(selectedStartDate),
      to: undefined,
    };
    setSelectedTime(newSelectedTime);
  }

  useEffect(() => {
    dashboardTimeStamp && setDashBoardTimeForFilter();
    dashboardTimeStamp &&
      setButtonState({
        datePicker: true,
        label: `Custom`,
        icon: <StyledCalendarIcon />,
        setShow: true,
      });
  }, []);

  useEffect(() => {
    showChartForDashboardLink === true ? setChartIsShown(!chartIsShown) : null;
  }, [showChartForDashboardLink]);

  //reset data for standard use of records
  useEffect(() => {
    // Function to call when user starts navigating to another page
    function handleRouteChange() {
      onHandleDashboardReset();
    }
    // Listening to route change events
    router.events.on("routeChangeStart", handleRouteChange);
    // Removing the event listener when the component unmounts
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  function handleChartRef(ref) {
    setChartRefForDownload(ref);
  }

  if (isLoading) return <Loader itemText={"Records loading..."} />;

  return (
    <>
      <Head>
        <title>Emotion Records</title>
      </Head>
      <Background $show={showFilter} onClick={() => setShowFilter(false)} />
      <StyledHeading $isScrollDown={isScrollDown}>
        Recorded Emotions
      </StyledHeading>
      <GridWrapper $show={showFilter}>
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
            dashboardTimeStamp={dashboardTimeStamp}
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
                You haven&apos;t highlighted any Entries yet. Click the{" "}
                <StyledHighlightIcon /> on a Entry to highlight it.
              </StyledTextMessage>
            ) : buttonState.todayButton ? (
              <StyledTextMessage>
                You haven&apos;t made any Entries today.<br></br>
                <StyledLink href="./">add Entry &rarr;</StyledLink>
              </StyledTextMessage>
            ) : buttonState.datePicker && !selectedTime ? (
              <StyledDateIndicator>
                Click the calendar <StyledCalendarIcon /> and select a date
              </StyledDateIndicator>
            ) : (
              <StyledTextMessage>sorry, nothing found</StyledTextMessage>
            )
          ) : (
            <StyledTextMessage>sorry, nothing found</StyledTextMessage>
          ))}
        {shownEntries.length !== 0 && (
          <StyledWrapper>
            <p>Results: {shownEntries.length}</p>
            <GraphToggleWrapper>
              <Export
                chartRefForDownload={chartRefForDownload}
                chartIsShown={chartIsShown}
                exportData={shownEntries}
                buttonState={buttonState}
                selectedCustomDate={selectedTime}
              />
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
            locale={locale}
            buttonState={buttonState}
            onDeleteEmotionEntry={onDeleteEmotionEntry}
            toggleHighlight={toggleHighlight}
            shownEntries={shownEntries}
            filteredEntries={filteredEntries}
            useExampleData={useExampleData}
            dashboardState={dashboardState}
          />
        )}
        {chartIsShown && (
          <ChartContainer
            handleChartRef={handleChartRef}
            shownEntries={shownEntries}
            theme={theme}
            locale={locale}
          />
        )}
      </StyledListContainer>
    </>
  );
}
