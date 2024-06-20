import Profile from "../components/Profile";
import { useEffect } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function ProfilePage({ theme, customTheme, handleToolTip }) {
  const { data: session, status } = useSession();

  const router = useRouter();

  const { pathname, asPath, query, locale } = router;

  const { t: translate } = useTranslation(["emotions", "common"]);

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
    async function createUser() {
      const data = {
        name: session.user.name,
        email: session.user.email,
        theme: "lightTheme",
        lastPreferredTheme: "lightTheme",
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
  }, [session.user.email, session.user.name, error]);

  if (isLoading) return <Loader itemText={translate("isLoading")} />;

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
    const names = string.split(" ");
    const firstName = names[0];
    const lastName = names[names.length - 1];
    let initials = firstName[0] + lastName[0];
    return initials.toUpperCase();
  }

  const userNameInitials = getInitials(userName);

  const userEmail = session.user.email;

  if (status !== "authenticated") {
    return <h2>{translate("accessDenied")}</h2>;
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["emotions", "common"])),
    },
  };
}
