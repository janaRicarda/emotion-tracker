import {
  lightTheme,
  darkTheme,
  warmTheme,
  coldTheme,
  neutralTheme,
  highContrastTheme,
} from "@/components/Theme";
import { useSession } from "next-auth/react";
import useSWR from "swr";

function ThemeInfo() {
  const { data: session } = useSession();
  const { data: currentUser } = useSWR(`/api/user/${session.user.email}`);
}

const colorSchemes = {
  lightTheme,
  darkTheme,
  warmTheme,
  coldTheme,
  neutralTheme,
  highContrastTheme,
};
const userTheme = currentUser.theme;
const usersPreferredTheme = colorSchemes[userTheme];
export { colorSchemes };
