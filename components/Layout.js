import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, theme }) {
  return (
    <>
      <Header theme={theme} />
      {children}

      <Footer />
    </>
  );
}
