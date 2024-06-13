import Profile from "../components/Profile";
import { useEffect } from "react";
import Head from "next/head";

export default function ProfilePage({ theme, switchTheme, handleToolTip }) {
  useEffect(() => {
    handleToolTip(false);
  });
  return (
    <>
      <Head>
        <title>Profile Page</title>
      </Head>
      <Profile theme={theme} switchTheme={switchTheme} />
    </>
  );
}
