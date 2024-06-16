import Profile from "../components/Profile";
import { useEffect } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import {
  lightTheme,
  darkTheme,
  warmTheme,
  coldTheme,
  neutralTheme,
  highContrastTheme,
} from "../components/Theme";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";

export default function ProfilePage({
  theme,
  switchTheme,
  customTheme,
  handleToolTip,
}) {
  const { data: session, status } = useSession();

  useEffect(() => {
    handleToolTip(false);
  });

  useEffect(() => {
    async function createUser() {
      const data = {
        name: session.user.name,
        email: session.user.email,
        theme: "light",
      };

      try {
        const response = await fetch(`/api/user/${session.user.email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } catch {
        console.error(error);
      }
    }
    createUser();
  }, [session.user.email, session.user.name]);

  const {
    data: currentUser,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/user/${session.user.email}`);

  if (isLoading) return <Loader itemText={"Is Loading"} />;

  if (error) return <ErrorMessage errorMessage={error.message} />;

  const colorSchemes = {
    lightTheme,
    darkTheme,
    warmTheme,
    coldTheme,
    neutralTheme,
    highContrastTheme,
  };

  async function handleEditTheme(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);

    const response = await fetch(`/api/user/${session.user.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      mutate();
    }
    const { theme: updatedTheme } = userData;
    const selectedTheme = colorSchemes[updatedTheme];
    console.log("theme aus usedata", selectedTheme);
    const userTheme = currentUser.theme;
    const usersPreferredTheme = colorSchemes[userTheme];
    console.log("theme von gefetchtem user", usersPreferredTheme);

    switchTheme(selectedTheme);
    mutate();
  }

  //switchTheme(usersPreferredTheme);
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

  const userEmail = session.user.email;

  if (status !== "authenticated") {
    return <h2>Access denied! You have to be logged in, to see this page</h2>;
  }
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
        userEmail={userEmail}
        handleEditTheme={handleEditTheme}
      />
    </>
  );
}
