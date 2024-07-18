import EmotionForm from "@/components/EmotionForm";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import useSWR from "swr";
import ErrorMessage from "@/components/ErrorMessage";

export default function EmotionEntry({
  theme,
  onAddEmotionDetails,
  emotionEntries,
  handleToolTip,
  useExampleData,
  locale,
}) {
  useEffect(() => {
    handleToolTip({
      text: " Enter further details about your emotion experience with the emotion form. Here, you can fine-tune your initial selection by switching the emotion if needed, specifying a subemotion, and gauging the intensity of your emotion on a scale from 0 to 100. Classify the emotion as unpleasant, neutral, or pleasant, and optionally provide input on triggers and notes to enhance your emotional insight and reflection.",
    });
  }, []);

  const router = useRouter();
  const { slug } = router.query;

  const newestDbEntryID = emotionEntries?.length
    ? emotionEntries[emotionEntries.length - 1]?._id
    : null;

  const newestEntryInDemoMode = emotionEntries?.length
    ? emotionEntries[emotionEntries.length - 1]?.id
    : null;

  const {
    data: correspondingDbEmotionEntry,
    isLoading,
    error,
  } = useSWR(!useExampleData && `/api/emotionEntries/${newestDbEntryID}`);

  if (isLoading) return <Loader itemText={"Is Loading"} />;

  if (error) return <ErrorMessage errorMessage={error.message} />;

  if (!router.query) {
    return null;
  }

  const correspondingEntry = useExampleData
    ? emotionEntries.find((entry) => entry.id === newestEntryInDemoMode)
    : correspondingDbEmotionEntry;

  return (
    <>
      <Head>
        <title>Record your emotion</title>
      </Head>
      <EmotionForm
        emotion={slug}
        theme={theme}
        onSubmit={onAddEmotionDetails}
        correspondingEntry={correspondingEntry}
        id={useExampleData ? newestEntryInDemoMode : newestDbEntryID}
        locale={locale}
      />
    </>
  );
}
