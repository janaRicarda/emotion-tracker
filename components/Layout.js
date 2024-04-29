import Header from "./Header";
import Navigation from "./Navigation";

export default function Layout({ children, theme }) {
  return (
    <>
      <Header theme={theme} />
      {children}

      <Navigation />
    </>
  );
}
