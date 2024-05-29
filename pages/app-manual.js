import Manual from "@/components/Manual";
import { useEffect } from "react";

export default function ManualPage({ handleToolTip }) {
  useEffect(() => {
    handleToolTip(false);
  });
  return <Manual />;
}
