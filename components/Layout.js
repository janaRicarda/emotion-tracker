import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, theme, switchTheme }) {
  return (
    <>
      <Header switchTheme={switchTheme} />
      {children}
      <Footer />
    </>
  );
}
