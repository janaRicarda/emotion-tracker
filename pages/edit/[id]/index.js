import EmotionForm from "@/components/EmotionForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

async function fetchEmotionEntries() {
  return [
    { id: "1", _id: "1", emotion: "joy" },
    { id: "2", _id: "2", emotion: "sadness" },
  ];
}

export default function EditPage({
  theme,
  emotionEntries,
  onAddEmotionDetails,
  handleToolTip,
  useExampleData,
}) {
  const router = useRouter();
  const { t: translate } = useTranslation(["emotions"]);

  const { id } = router.query;
  useEffect(() => {
    handleToolTip({
      text: `${translate("editEmotionEntryTooltip")}`,
    });
  }, [translate]);

  const correspondingEntry = useExampleData
    ? emotionEntries.find((entry) => entry.id === id)
    : emotionEntries.find((entry) => entry._id === id);

  // console.log("ID from router query:", id);
  // console.log("Emotion Entries:", emotionEntries);
  // console.log("Corresponding Entry:", correspondingEntry);

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

export async function getStaticProps({ locale, params }) {
  const emotionEntries = await fetchEmotionEntries();
  return {
    props: {
      emotionEntries,
      ...(await serverSideTranslations(locale, [
        "emotions",
        "common",
        "navigation",
      ])),
    },
  };
}

export async function getStaticPaths() {
  const emotionEntries = await fetchEmotionEntries();
  const paths = emotionEntries.map((entry) => ({
    params: { id: entry.id },
  }));

  return {
    paths,
    fallback: true, // Set to true if you want to enable ISR (Incremental Static Regeneration)
  };
}
