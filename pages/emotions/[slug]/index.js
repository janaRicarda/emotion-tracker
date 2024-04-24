import { emotionData } from "@/lib/db";
import { useRouter } from "next/router";
import EmotionDetails from "@/components/EmotionDetail";
import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8.5px;
  &:hover {
    background-color: ${({ $color }) => $color};
  }
`;

export default function EmotionDetailsPage() {
  const router = useRouter();
  if (!router.query) {
    return null;
  }
  const { slug } = router.query;
  const emotion = emotionData.find((emotion) => emotion.slug === slug);
  const emotionIndex = emotionData.findIndex(
    (emotion) => emotion.slug === slug
  );

  let prevEmotion = emotionData[emotionIndex - 1];
  emotionIndex === 0 ? (prevEmotion = emotionData[6]) : prevEmotion;
  let nextEmotion = emotionData[emotionIndex + 1];
  emotionIndex === 6 ? (nextEmotion = emotionData[0]) : nextEmotion;

  if (!emotion) return <h1>emotion not found</h1>;
  return (
    <>
      <EmotionDetails
        name={emotion.name}
        description={emotion.description}
        emotionfunction={emotion.emotionfunction}
        indications={emotion.indications}
        subemotions={emotion.subemotions}
        color={emotion.color}
        prevEmotion={prevEmotion}
        nextEmotion={nextEmotion}
      />
      <StyledLink $color={emotion.color} href="/emotions">
        ← back to list{" "}
      </StyledLink>
    </>
  );
}
