import {
  StyledTitle,
  StyledFlexColumnWrapper,
  StyledStandardLink,
} from "@/SharedStyledComponents";
import styled from "styled-components";
import FilterEmotionEntries from "@/components/FilterEmotionEntries";
import { useState, useCallback } from "react";
import HeartOutlineIcon from "../public/heart-outline.svg";
import CalendarIcon from "/public/calendar.svg";
import EmotionRecordsList from "../components/EmotionRecordsList";
import Tooltip from "@/components/Tooltip";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const StyledTopSection = styled(StyledFlexColumnWrapper)`
  position: sticky;
  top: 99px;
  background-color: var(--main-bright);
  z-index: 1;
`;

const StyledTextMessage = styled.p`
  margin-top: 4rem;
  text-align: center;
  line-height: 3;
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
  top: 5px;
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 1.5rem;
  display: inline;
  vertical-align: bottom;
  fill: var(--main-dark);
`;

const StyledDateIndicator = styled.p`
  text-align: center;
  margin: 2rem auto 1rem;
`;

const StyledParagraph = styled.p`
  text-align: center;
  padding: 0.5rem;
`;

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
  handleToggleTooltip,
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

  const router = useRouter();
  const { locales } = router;

  const handleChangeLocale = (newLocale) => {
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  const { t: translate } = useTranslation("emotion-records");

  // handler-functions used in a useEffect after passed to FilterEmotionEntries are wrapped into useCallback hook here

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
      <StyledParagraph>
        Your Selection:<br></br>
        {getFormattedDate(selectedTime.from)}
        {selectedTime.to &&
          selectedTime.from.toString() !== selectedTime.to.toString() &&
          " - " + getFormattedDate(selectedTime.to)}
      </StyledParagraph>
    );
  }

  return (
    <>
      {locales.map((loc) => (
        <button key={loc} onClick={() => handleChangeLocale(loc)}>
          {loc === "en" ? "English" : "Deutsch"}
        </button>
      ))}
      <Tooltip onClick={handleToggleTooltip}>
        {translate("emotionRecordsTooltip")}
      </Tooltip>
      <StyledFlexColumnWrapper>
        <StyledTopSection>
          <StyledTitle>{translate("emotionRecordsTitle")}</StyledTitle>
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
        </StyledTopSection>
        {buttonState.datePicker ? (
          selectedTime ? (
            <DisplayDate />
          ) : (
            <StyledDateIndicator>
              {translate("clickCalendar")} <StyledCalendarIcon />{" "}
              {translate("selectDate")}
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
                {translate("emotionRecordsNoEntriesText")}
                <br></br>
                <StyledLink href="./">
                  {translate("addEntryButtonText")}
                </StyledLink>
              </StyledTextMessage>
            ) : (
              <StyledTextMessage>{translate("sorry")}</StyledTextMessage>
            )
          ) : (
            <StyledTextMessage>{translate("sorry")}</StyledTextMessage>
          ))}

        {shownEntries.length !== 0 && (
          <>
            <EmotionRecordsList
              onDeleteEmotionEntry={onDeleteEmotionEntry}
              toggleHighlight={toggleHighlight}
              shownEntries={shownEntries}
              filteredEntries={filteredEntries}
            />
          </>
        )}
      </StyledFlexColumnWrapper>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, "emotion-records")),
      // Will be passed to the page component as props
    },
  };
}
