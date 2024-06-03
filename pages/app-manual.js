import Manual from "@/components/Manual";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function ManualPage() {
  return <Manual />;
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, "manual")),
      // Will be passed to the page component as props
    },
  };
}
