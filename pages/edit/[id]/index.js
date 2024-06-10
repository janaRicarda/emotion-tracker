import EmotionForm from "@/components/EmotionForm";
import { useRouter } from "next/router";
import { useEffect, useTransition } from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";

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
