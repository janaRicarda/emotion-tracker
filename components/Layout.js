import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, theme, toggleTheme, switchTheme }) {
  return (
    <>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        switchTheme={switchTheme}
      />
      {children}
      <Footer />
    </>
  );
}
