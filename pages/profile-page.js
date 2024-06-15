import Profile from "../components/Profile";
import { useEffect } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";

export default function ProfilePage({
  emotionEntries,
  theme,
  switchTheme,
  customTheme,
  handleToolTip,
}) {
  const { data: session } = useSession();
  useEffect(() => {
    handleToolTip(false);
  });

  const {
    data: currentUser,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/user/${session.user.email}`);

  if (isLoading) return <Loader itemText={"Is Loading"} />;

  if (error) return <ErrorMessage errorMessage={error.message} />;

  async function createUser() {
    if (currentUser.length === 0) {
      const data = {
        name: session.user.name,
        email: session.user.email,
        theme: "default",
      };
      const response = await fetch("/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
  }
  createUser();
  //if (!isLoading && currentUser.length == 0) createUser();
  console.log(currentUser);
  const currentOwner = emotionEntries[0].owner;
  const currentUserLoggedin = session.user.email;

  //function to render the users Initials
  const userName = session.user.name;

  function getInitials(string) {
    const names = string.split(" ");
    const firstName = names[0];
    const lastName = names[names.length - 1];
    let initials = firstName[0] + lastName[0];
    return initials.toUpperCase();
  }

  const userNameInitials = getInitials(userName);

  return (
    <>
      <Head>
        <title>Profile Page</title>
      </Head>
      <Profile
        theme={theme}
        customTheme={customTheme}
        switchTheme={switchTheme}
        userName={userName}
        userNameInitials={userNameInitials}
        /*   user={currentUser} */
      />
    </>
  );
}
