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
      text: `${translate("emotionListTooltip")}`,
    });
  }, [translate]);

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
      ...(await serverSideTranslations(locale, ["emotionList", "common"])),
    },
  };
}
