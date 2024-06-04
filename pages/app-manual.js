import Manual from "@/components/Manual";
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
