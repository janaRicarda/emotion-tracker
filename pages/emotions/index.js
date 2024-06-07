import EmotionList from "@/components/EmotionList";
import { useEffect } from "react";
import {
  StyledFixedTitle,
  StyledEmotionListWrapper,
} from "@/SharedStyledComponents";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

export default function EmotionListPage({ handleToolTip }) {
  const { t: translate } = useTranslation(["emotion-list"]);

  useEffect(() => {
    handleToolTip({
      text: `${translate("emotionListTooltip")}`,
    });
  }, [translate]);

  return (
    <>
      <Head>
        <title>The 7 basic emotions</title>
      </Head>
      <StyledFixedTitle>{translate("emotionListTitle")}</StyledFixedTitle>
      <StyledEmotionListWrapper>
        <EmotionList />
      </StyledEmotionListWrapper>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "emotion-list",
        "common",
        "navigation",
      ])),
    },
  };
}
