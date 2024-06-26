import EmotionList from "@/components/EmotionList";
import { useEffect } from "react";
import {
  StyledFixedTitle,
  StyledEmotionListWrapper,
} from "@/SharedStyledComponents";
import Head from "next/head";

export default function EmotionListPage({ handleToolTip }) {
  useEffect(() => {
    handleToolTip({
      text: "  Explore the list of seven fundamental emotions, each offering a unique pathway to understanding and expressing your inner feelings. Whether you are experiencing joy, sadness, anger, fear, surprise, disgust, or anticipation, delve deeper into the complexities of your emotional landscape by selecting the emotion that resonates with you most. Each emotion serves as a gateway to further exploration, providing insight and clarity into your state of being.",
    });
  }, []);


  return (
    <>
      <Head>
        <title>The 7 basic emotions</title>
      </Head>
      <StyledFixedTitle>The 7 basic emotions</StyledFixedTitle>
      <StyledEmotionListWrapper>
        <EmotionList />
      </StyledEmotionListWrapper>
    </>
  );
}
