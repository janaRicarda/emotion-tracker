import EmotionForm from "@/components/EmotionForm";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import useSWR from "swr";
import { emotionData } from "@/lib/db";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ErrorMessage from "@/components/ErrorMessage";
import { useTranslation } from "next-i18next";

export default function EmotionEntry({
  theme,
  onAddEmotionDetails,
  emotionEntries,
  handleToolTip,
  useExampleData,
}) {
  const { t: translate } = useTranslation(["emotions"]);

  const router = useRouter();
  const { id, slug } = router.query;

  useEffect(() => {
    handleToolTip({
      text: `${translate("furtherDetailsToCreateEmotionTooltip")}`,
    });
  }, [translate]);

  const {
    data: correspondingDbEmotionEntry,
    isLoading,
    error,
  } = useSWR(!useExampleData && `/api/emotionEntries/${id}`);

  if (isLoading) return <Loader itemText={translate("isLoading")} />;

  if (error) return <ErrorMessage errorMessage={error.message} />;

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
