import EmotionForm from "@/components/EmotionForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import useSWR from "swr";
import { emotionData } from "@/lib/db";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function EmotionEntry({
  theme,
  onAddEmotionDetails,
  emotionEntries,
  handleToolTip,
  useExampleData,
}) {
  useEffect(() => {
    handleToolTip({
      text: " Enter further details about your emotion experience with the emotion form. Here, you can fine-tune your initial selection by switching the emotion if needed, specifying a subemotion, and gauging the intensity of your emotion on a scale from 0 to 100. Classify the emotion as unpleasant, neutral, or pleasant, and optionally provide input on triggers and notes to enhance your emotional insight and reflection.",
    });
  }, []);

  const router = useRouter();
  const { id } = router.query;
  const { slug } = router.query;

  const { data: correspondingDbEmotionEntry, isLoading } = useSWR(
    !useExampleData && `/api/emotionEntries/${id}`
  );

  if (isLoading) return <h2>Is Loading...</h2>;

  if (!router.query) {
    return null;
  }

  const correspondingEntry = useExampleData
    ? emotionEntries.find((entry) => entry.id === id)
    : correspondingDbEmotionEntry;

  return (
    <>
      <Head>
        <title>Record your emotion</title>
      </Head>
      <EmotionForm
        slug={slug}
        theme={theme}
        onSubmit={onAddEmotionDetails}
        correspondingEntry={correspondingEntry}
        id={id}
      />
    </>
  );
}

export async function getStaticProps({ params, locale }) {
  const emotion = emotionData.find((emotion) => emotion.slug === params.slug);
  const emotionIndex = emotionData.findIndex(
    (emotion) => emotion.slug === params.slug
  );

  const prevEmotionIndex =
    emotionIndex === 0 ? emotionData.length - 1 : emotionIndex - 1;
  const prevEmotion = emotionData[prevEmotionIndex];
  const nextEmotionIndex =
    emotionIndex === emotionData.length - 1 ? 0 : emotionIndex + 1;
  const nextEmotion = emotionData[nextEmotionIndex];

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "emotions",
        "common",
        "navigation",
      ])),
      emotion,
      prevEmotion,
      nextEmotion,
    },
  };
}

export async function getStaticPaths() {
  const paths = emotionData.map((emotion) => ({
    params: { slug: emotion.slug },
  }));

  return {
    paths,
    fallback: true, // Set to 'true' or 'blocking' if you want to generate paths on-demand
  };
}
