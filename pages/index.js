import styled from "styled-components";
import { useEffect, useState } from "react";
import { StyledStandardLink, StyledTitle } from "@/SharedStyledComponents";
import ToggleSwitch from "@/components/ToggleSwitch";
import {
  getAveragePerDay,
  getTimeSinceLastEntry,
  calculateTensionChartData,
  getFilteredEntriesV2,
  getNewestEmotion,
  compareHightToLow,
} from "@/utils/dataAndChartUtils";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Head from "next/head";
import ArrowBack from "./../public/icons/arrow-left.svg";
import { shortEmotionDescriptions } from "@/lib/db";
import DashboardChart from "@/components/DashboardChart";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ProgressBar = styled.div`
  width: 42%;
  max-width: 200px;
  height: 0.8rem;
  border: 1px solid var(--contrast-text);
  position: relative;
  display: inline-block;
  margin: 0 0.5rem 0 0;
  border-radius: 6px;

  &::after {
    content: "";
    position: absolute;
    top: 20%;
    height: 60%;
    width: ${({ $progress, $showDetails }) =>
      $showDetails ? `${$progress}%` : "0"};
    background: var(--main-bright);
    border-radius: 6px;
    transition: width 400ms;
    transition-delay: ${({ $showDetails }) => ($showDetails ? "500ms" : "0ms")};
  }
`;

const DashboardTitle = styled(StyledTitle)`
  margin-top: -1.5rem;
`;

const DashboardSection = styled.section`
  display: grid;
  grid-template-columns: 6fr 6fr;
  grid-template-rows: 3.8fr 3.8fr ${({ $gridFactor }) => `${$gridFactor}fr`};
  color: var(--main-dark);
  gap: ${({ $gap }) => `${$gap}rem`};
  width: 90vw;
  min-width: ${({ $dashboardWidth }) => `${$dashboardWidth}px`};
  height: ${({ $dashboardHeight }) => `${$dashboardHeight}px`};
  max-width: 1200px;
  max-height: 1200px;
  margin: 0;
  align-items: center;
  border-radius: 18px;
  justify-content: center;
`;
const GridElement = styled.div`
  display: flex;
  color: var(--main-dark);
  flex-direction: column;
  border-radius: 18px;
  padding: 0.5rem;
  min-height: 110px;
  height: 100%;
  width: 100%;
  align-content: center;
  align-items: center;
  background-color: var(--section-background);
  box-shadow: var(--box-shadow);
  border: var(--circle-border);
`;
const ChartElement = styled.div`
  grid-column: 1 / 3;
  border-radius: 18px;
  padding: 0;
  min-height: 170px;
  height: 100%;
  align-content: center;
  align-items: center;
  background-color: var(--section-background);
  box-shadow: var(--box-shadow);
  border: var(--circle-border);
`;
const ElementText = styled.p`
  color: var(--main-dark);
  font-size: ${({ $fontSize }) => `${$fontSize}rem`};
  line-height: ${({ $lineHeight }) => `${$lineHeight}rem`};
  text-align: left;
  padding: 0.5rem 0.42rem;
  margin: 0.1rem;
  border-radius: 12px;
`;

const EmotionText = styled(ElementText)`
  color: var(--text-on-bright);
  padding: 0.42rem;
  margin: -5px 0.5rem 0.5rem;
  background: ${({ $color }) =>
    $color ? $color : "var(--section-background)"};
  width: 92%;
`;
const BoldText = styled.span`
  font-weight: 600;
`;

const StyledForwardArrow = styled(ArrowBack)`
  width: 1rem;
  transform: rotate(180deg);
  fill: var(--main-dark);
`;

const ArrowWrapper = styled.div`
  display: flex;
  padding: 0.4rem 0;
`;

const ChartLinkWrapper = styled.section`
  margin-top: -2.5rem;
  position: relative;
  left: 5%;
  width: 280px;
  display: flex;
  z-index: 1;
`;

const DashboardLink = styled(StyledStandardLink)`
  width: 100%;
  height: 100%;
  align-self: center;
  padding: 0;
`;

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem;
  margin: 0 0 0.8rem;
  gap: 0.1rem;
  background-color: var(--main-bright);
  border-radius: 6px;
  position: fixed;
  top: 70px;
  z-index: 2;
`;

const SwitchSizer = styled.span`
  transform: scale(0.6);
`;

export default function HomePage({
  handleToolTip,
  emotionEntries,
  theme,
  onHandleGridEmotion,
  onHandleChartLink,
  demoMode,
  handleChartRef,
}) {
  const router = useRouter();

  const { pathname, asPath, query, locale } = router;

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const { data: session } = useSession();

  //make dashboard responsive
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function updateWidth() {
    setWindowWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const dashboardWidth = Math.min(
    1080,
    Math.max(344, Math.round(windowWidth / 2))
  );
  const gridFactor = 1.9 + windowWidth / 100;
  const dashboardHeight = Math.round(dashboardWidth * 1.3 + gridFactor * 6);
  const fontSize = Math.min(1.24, Math.max(0.8, windowWidth / 1000));

  //for ProgressBar
  const showDetails = true;

  //dashboard logic
  const dashboardEntries = emotionEntries.toSorted(compareHightToLow);
  const averageEntriesPerDay = getAveragePerDay(dashboardEntries);
  const timeSinceLastEntry = getTimeSinceLastEntry(dashboardEntries);
  const { emotion, intensity, slug, id, _id } =
    getNewestEmotion(dashboardEntries);

  function handleGridEmotion(id) {
    router.push("/emotion-records");
    onHandleGridEmotion(id);
  }

  function handleChartLink() {
    router.push("/emotion-records");
    onHandleChartLink();
  }

  //chart logic
  const today = new Date().toISOString();
  const filteredEntries = getFilteredEntriesV2(today, emotionEntries);
  const xValues = calculateTensionChartData(filteredEntries).xValues;
  const yValues = calculateTensionChartData(filteredEntries).yValues;

  const { t: translate } = useTranslation(["common", "navigation"]);

  useEffect(() => {
    handleToolTip({
      text: `${translate("toolTipText")}`,
    });
  }, [translate]);

  function handleChangeLanguage() {
    const newLocale = locale === "en" ? "de" : "en";
    router.push({ pathname, query }, asPath, { locale: newLocale });
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <ToggleContainer>
        en
        <SwitchSizer>
          <ToggleSwitch
            handleSwitch={handleChangeLanguage}
            useButtonColor={true}
          />
        </SwitchSizer>
        de
      </ToggleContainer>
      <DashboardTitle>
        {translate("hello")} {session ? session.user.name : "demo user"}
      </DashboardTitle>
      <DashboardSection
        $dashboardWidth={dashboardWidth}
        $dashboardHeight={dashboardHeight}
        $gap={fontSize * 0.25}
        $gridFactor={gridFactor}
      >
        <GridElement>
          <DashboardLink href="/app-manual">
            <ElementText $fontSize={fontSize} $lineHeight={fontSize * 1.3}>
              {translate("trackFeelings")}
              <br></br>
              {translate("youCanLookAtThe")}
              <ArrowWrapper>
                {" "}
                <StyledForwardArrow />
                <BoldText $fontSize={fontSize} $lineHeight={fontSize * 1.3}>
                  {" "}
                  {translate("manual")}
                </BoldText>
              </ArrowWrapper>
            </ElementText>
          </DashboardLink>
        </GridElement>
        <GridElement>
          <DashboardLink href="/add-entry">
            <ElementText $fontSize={fontSize} $lineHeight={fontSize * 1.3}>
              <BoldText>{translate("lastEntry")}</BoldText> <br></br>{" "}
              {timeSinceLastEntry} {translate("hoursAgo")}
              <br></br>
              <BoldText>{translate("yourAverage")}</BoldText>
              <br></br>
              {averageEntriesPerDay} {translate("entriesPerDay")}
              <ArrowWrapper>
                <StyledForwardArrow />
                <BoldText>{translate("addEntry")}</BoldText>
              </ArrowWrapper>
            </ElementText>
            <ElementText
              $fontSize={fontSize}
              $lineHeight={fontSize * 0.5}
            ></ElementText>
          </DashboardLink>
        </GridElement>

        <GridElement onClick={() => handleGridEmotion(demoMode ? id : _id)}>
          <ElementText $fontSize={fontSize} $lineHeight={fontSize * 1.3}>
            {translate("lastRecordedEmotion")}
          </ElementText>
          <EmotionText
            $fontSize={fontSize}
            $lineHeight={fontSize * 1.3}
            $color={`var(--${slug})`}
          >
            <BoldText>{emotion}</BoldText>
            <br></br>
            {translate("intensity")}{" "}
            <ProgressBar $showDetails={showDetails} $progress={intensity} />
            {intensity} %
          </EmotionText>
        </GridElement>
        <GridElement>
          <DashboardLink href={`/emotions/${slug}`}>
            <ElementText
              $fontSize={fontSize * 0.98}
              $lineHeight={fontSize * 1.33}
            >
              <BoldText>{emotion}</BoldText>
              <br></br> {shortEmotionDescriptions[emotion]}
              <ArrowWrapper>
                {" "}
                <StyledForwardArrow />
                <BoldText>
                  {translate("moreAbout")}
                  {slug}{" "}
                </BoldText>
              </ArrowWrapper>
            </ElementText>
          </DashboardLink>
        </GridElement>
        <ChartElement>
          <DashboardChart
            theme={theme}
            width={Math.max(290, Math.round(36 + windowWidth / 1.6))}
            heightFactor={0.46}
            shownEntries={emotionEntries}
            xValues={xValues}
            yValues={yValues}
            autosize={false}
            showSwitches={false}
            locale={locale}
            handleChartRef={handleChartRef}
          />
          <ChartLinkWrapper onClick={handleChartLink}>
            <ElementText
              $fontSize={fontSize * 0.98}
              $lineHeight={fontSize * 1.33}
            >
              <ArrowWrapper>
                <StyledForwardArrow />
                <BoldText>{translate("moreCharts")}</BoldText>
              </ArrowWrapper>
            </ElementText>
          </ChartLinkWrapper>
        </ChartElement>
      </DashboardSection>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  };
}
