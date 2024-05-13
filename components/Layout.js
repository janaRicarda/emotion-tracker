import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  // function switchTheme() {
  //   setNewTheme(warmTheme);
  // }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
