import { emotionData as libEmotionData } from "@/lib/db";
import { useRouter } from "next/router";
import EmotionDetails from "@/components/EmotionDetail";
import Head from "next/head";
import { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function EmotionDetailsPage({ theme, handleToolTip }) {
  const { t: translate } = useTranslation("emotions");

  const emotionData = translate("emotionData", { returnObjects: true });

  useEffect(() => {
    handleToolTip(false);
  });

  const router = useRouter();
  if (!router.query) {
    return null;
  }
  const { slug } = router.query;
  const emotion = emotionData.find((emotion) => emotion.slug === slug);
  const emotionIndex = emotionData.findIndex(
    (emotion) => emotion.slug === slug
  );

  const prevEmotionIndex =
    emotionIndex === 0 ? emotionData.length - 1 : emotionIndex - 1;
  const prevEmotion = emotionData[prevEmotionIndex];
  const nextEmotionIndex =
    emotionIndex === emotionData.length - 1 ? 0 : emotionIndex + 1;
  const nextEmotion = emotionData[nextEmotionIndex];

  if (!emotion) return <h1>emotion not found</h1>;
  return (
    <>
      <Head>
        <title>{emotion.name}</title>
      </Head>
      <EmotionDetails
        theme={theme}
        name={emotion.name}
        description={emotion.description}
        emotionfunction={emotion.emotionfunction}
        indications={emotion.indications}
        subemotions={emotion.subemotions}
        color={emotion.color}
        prevEmotion={prevEmotion}
        nextEmotion={nextEmotion}
        slug={emotion.slug}
      />
    </>
  );
}

export async function getStaticProps({ params, locale }) {
  const emotion = libEmotionData.find(
    (emotion) => emotion.slug === params.slug
  );
  const emotionIndex = libEmotionData.findIndex(
    (emotion) => emotion.slug === params.slug
  );

  const prevEmotionIndex =
    emotionIndex === 0 ? libEmotionData.length - 1 : emotionIndex - 1;
  const prevEmotion = libEmotionData[prevEmotionIndex];
  const nextEmotionIndex =
    emotionIndex === libEmotionData.length - 1 ? 0 : emotionIndex + 1;
  const nextEmotion = libEmotionData[nextEmotionIndex];

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
  const paths = libEmotionData.map((emotion) => ({
    params: { slug: emotion.slug },
  }));

  return {
    paths,
    fallback: true, // Set to 'true' or 'blocking' if you want to generate paths on-demand
  };
}
