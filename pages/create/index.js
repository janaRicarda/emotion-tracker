import EmotionList from "@/components/EmotionList.js";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  StyledFixedTitle,
  StyledEmotionListWrapper,
} from "@/SharedStyledComponents";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function CreateIndexPage({
  onAddEmotionDetails,
  handleToolTip,
}) {
  const { t: translate } = useTranslation(["emotions"]);

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    handleToolTip({
      text: `${translate("createEmotionTooltip")}`,
    });
  }, [translate]);

  return (
    <>
      <Head>
        <title>Choose emotions</title>
      </Head>
      <StyledFixedTitle>{translate("createEmotionTitle")}</StyledFixedTitle>
      <StyledEmotionListWrapper>
        <EmotionList
          createMode
          id={id}
          onAddEmotionDetails={onAddEmotionDetails}
        />
      </StyledEmotionListWrapper>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "emotions",
        "common",
        "navigation",
      ])),
    },
  };
}
