import styled from "styled-components";
import { useEffect } from "react";
import { StyledTitle } from "@/SharedStyledComponents";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Dashboard from "@/components/Dashboard";

const DashboardTitle = styled(StyledTitle)`
  margin-top: -1.5rem;
`;

export default function HomePage({
  handleToolTip,
  emotionEntries,
  theme,
  locale,
  onHandleGridEmotion,
  onHandleChartLink,
  demoMode,
  handleChartRef,
}) {
  const { data: session } = useSession();

  useEffect(() => {
    handleToolTip({
      text: "This is your dashboard. You can use it to get an overview about what the app can do for you and what you did with it recently.",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Dashboard
        emotionEntries={emotionEntries}
        theme={theme}
        locale={locale}
        onHandleGridEmotion={onHandleGridEmotion}
        onHandleChartLink={onHandleChartLink}
        demoMode={demoMode}
        handleChartRef={handleChartRef}
      />
      <DashboardTitle>
        Hi {session ? session.user.name : "demo user"}
      </DashboardTitle>
    </>
  );
}
