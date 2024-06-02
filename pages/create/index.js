import EmotionList from "@/components/EmotionList.js";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { StyledFixedTitle } from "@/SharedStyledComponents";
import styled from "styled-components";

export default function CreateIndexPage({
  onAddEmotionDetails,
  handleToolTip,
}) {
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    handleToolTip({
      text: "  Select the emotion that best represents how you are feeling right now. Use the provided visual cues, brief descriptions, and examples to guide your choice.",
    });
  }, []);

  return (
    <>
      <StyledFixedTitle>Choose one of the emotions</StyledFixedTitle>

      <EmotionList
        createMode
        id={id}
        onAddEmotionDetails={onAddEmotionDetails}
      />
    </>
  );
}
