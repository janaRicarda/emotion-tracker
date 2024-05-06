import EmotionRecordsList from "@/components/EmotionRecordsList";
import { StyledFlexWrapper, StyledTitle } from "@/SharedStyledComponents";

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
}) {
  return (
    <StyledFlexWrapper>
      <StyledTitle>Recorded Emotions</StyledTitle>
      <EmotionRecordsList
        onDeleteEmotionEntry={onDeleteEmotionEntry}
        emotionEntries={emotionEntries}
      />
    </StyledFlexWrapper>
  );
}
