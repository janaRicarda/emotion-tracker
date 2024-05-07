import EmotionRecordsList from "@/components/EmotionRecordsList";
import { StyledFlexColumnWrapper, StyledTitle } from "@/SharedStyledComponents";

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
}) {
  return (
    <StyledFlexColumnWrapper>
      <StyledTitle>Recorded Emotions</StyledTitle>
      <EmotionRecordsList
        onDeleteEmotionEntry={onDeleteEmotionEntry}
        emotionEntries={emotionEntries}
      />
    </StyledFlexColumnWrapper>
  );
}
