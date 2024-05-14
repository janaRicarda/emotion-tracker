import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, switchTheme }) {
  return (
    <>
      <Header switchTheme={switchTheme} />
      {children}
      <Footer />
    </>
  );
}
