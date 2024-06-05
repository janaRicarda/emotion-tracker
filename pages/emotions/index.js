import EmotionList from "@/components/EmotionList";
import { useEffect } from "react";
import {
  StyledFlexColumnWrapper,
  StyledFixedTitle,
} from "@/SharedStyledComponents";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function EmotionListPage({ handleToolTip }) {
  const { t: translate } = useTranslation(["emotionList"]);

  useEffect(() => {
    handleToolTip({
      text: "  Explore the list of seven fundamental emotions, each offering a unique pathway to understanding and expressing your inner feelings. Whether you are experiencing joy, sadness, anger, fear, surprise, disgust, or anticipation, delve deeper into the complexities of your emotional landscape by selecting the emotion that resonates with you most. Each emotion serves as a gateway to further exploration, providing insight and clarity into your state of being.",
    });
  }, []);

  return (
    <>
      <StyledFixedTitle>{translate("emotionListTitle")}</StyledFixedTitle>
      <StyledFlexColumnWrapper>
        <EmotionList />
      </StyledFlexColumnWrapper>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["emotionsList", "common"])),
    },
  };
}
