import EmotionForm from "@/components/EmotionForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import dbConnect from "@/db/connect";
import EmotionEntries from "@/db/models/emotionEntries";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function EditPage({
  theme,
  emotionEntries,
  onAddEmotionDetails,
  handleToolTip,
  useExampleData,
}) {
  const router = useRouter();
  const { id } = router.query;

  const { t: translate } = useTranslation(["emotions"]);

  useEffect(() => {
    handleToolTip({
      text: `${translate("editEmotionEntryTooltip")}`,
    });
  }, [translate]);

  const correspondingEntry = useExampleData
    ? emotionEntries.find((entry) => entry.id === id)
    : emotionEntries.find((entry) => entry._id === id);

  if (!correspondingEntry) return <h2>Page not found!</h2>;

  return (
    <>
      <Head>
        <title>Edit</title>
      </Head>
      <EmotionForm
        theme={theme}
        onSubmit={onAddEmotionDetails}
        correspondingEntry={correspondingEntry}
        id={id}
        editMode
      />
    </>
  );
}

async function fetchEmotionEntries() {
  await dbConnect();
  const emotionEntries = await EmotionEntries.find({});
  return emotionEntries;
}

export async function getStaticPaths() {
  const emotionEntries = await fetchEmotionEntries();

  const paths = emotionEntries.reduce((allPaths, entry) => {
    // Überprüfen, ob das locales-Attribut definiert ist
    if (entry.locales && Array.isArray(entry.locales)) {
      // Für jede Locale einen Pfad hinzufügen
      entry.locales.forEach((locale) => {
        allPaths.push({
          params: { id: entry._id.toString() },
          locale: locale,
        });
      });
    }
    return allPaths;
  }, []);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const emotionEntries = await fetchEmotionEntries();
  const correspondingEntry = emotionEntries.find(
    (entry) => entry._id.toString() === params.id
  );

  if (!correspondingEntry) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "emotions",
        "common",
        "navigation",
      ])),
      emotionEntries: JSON.parse(JSON.stringify(emotionEntries)), // Send all entries to props
      correspondingEntry: JSON.parse(JSON.stringify(correspondingEntry)), // Add correspondingEntry to props
    },
  };
}
