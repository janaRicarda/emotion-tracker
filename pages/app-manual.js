import Manual from "@/components/Manual";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import Head from "next/head";

export default function ManualPage({ handleToolTip }) {
  useEffect(() => {
    handleToolTip(false);
  });
  return (
    <>
      <Head>
        <title>Manual</title>
      </Head>
      <Manual />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "app-manual",
        "common",
        "navigation",
      ])),
    },
  };
}
