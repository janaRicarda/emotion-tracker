import Profile from "../components/Profile";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";

export default function ProfilePage({ theme, customTheme, handleToolTip }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    handleToolTip(false);
  });

  const {
    data: currentUser,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/user/${session.user.email}`);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    async function createUser() {
      const data = {
        name: session.user.name,
        email: session.user.email,
        theme: "lightTheme",
        lastPreferredTheme: mediaQuery.matches ? "darkTheme" : "lightTheme",
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
  }, [session.user.email, session.user.name, error, currentUser]);

  if (isLoading) return <Loader itemText={"Is Loading"} />;

  if (error) return <ErrorMessage errorMessage={error.message} />;

  async function handleEditTheme(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const choosenTheme = Object.fromEntries(formData);

    const data = { ...choosenTheme, lastPreferredTheme: choosenTheme.theme };

    const response = await fetch(`/api/user/${session.user.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      mutate();
    }
  }

  //function to render the users Initials
  const userName = session.user.name;

  function getInitials(string) {
    const userName = string.split(" ");
    if (userName.length > 1) {
      const firstName = userName[0];
      const lastName = userName[userName.length - 1];
      const initials = firstName[0] + lastName[0];
      return initials.toUpperCase();
    }
    if (userName.length < 2) {
      const name = userName[0];
      const initial = name[0];
      return initial.toUpperCase();
    }
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
        userName={userName}
        userNameInitials={userNameInitials}
        userEmail={userEmail}
        handleEditTheme={handleEditTheme}
        currentUser={currentUser}
      />
    </>
  );
}
