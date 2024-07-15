import EmotionList from "@/components/EmotionList.js";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  StyledFixedTitle,
  StyledEmotionListWrapper,
} from "@/SharedStyledComponents";
import Head from "next/head";

export default function CreateIndexPage({ handleToolTip }) {

  useEffect(() => {
    handleToolTip({
      text: "  Select the emotion that best represents how you are feeling right now. Use the provided visual cues, brief descriptions, and examples to guide your choice.",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Choose emotions</title>
      </Head>
      <StyledFixedTitle>Choose one of the emotions</StyledFixedTitle>
      <StyledEmotionListWrapper>
        <EmotionList createMode />
      </StyledEmotionListWrapper>
    </>
  );
}
