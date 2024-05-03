import styled from "styled-components";
import Link from "next/link";
import Menu from "./../public/menu.svg";
import Close from "./../public/close.svg";

const StyledMenuButton = styled(Menu)`
  width: 3rem;
  fill: var(--main-dark);

  background: transparent;
  color: var(--main-dark);
  border-style: none;
  margin: 1rem;
  position: absolute;
  top: 0;
  right: 0;
`;
const StyledCloseButton = styled(Close)`
  width: 2rem;
  fill: var(--main-dark);
  background: var(--button-background);
  color: var(--main-dark);
  border-style: none;
  margin: 1rem;
  position: absolute;
  top: 0.5rem;
  right: 0;
  z-index: 2;
`;

const StyledArticle = styled.article`
  width: 100vw;
  height: 100vh;
  background-color: var(--button-background);
  padding: 3rem 1rem;
  position: fixed;
  top: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: var(--main-dark);
  background-color: var(--button-background);
  padding: 0.8rem;
  font-size: 1.4rem;
  font-weight: 500;

  text-align: center;
`;

export default function Navigation({ handleToggleMenu, isOpen }) {
  return (
    <>
      {isOpen ? (
        <StyledCloseButton type="button" onClick={handleToggleMenu} />
      ) : (
        <StyledMenuButton type="button" onClick={handleToggleMenu} />
      )}

      {isOpen && (
        <StyledArticle>
          <StyledLink onClick={handleToggleMenu} href="/emotions">
            7 basic emotions
          </StyledLink>
          <StyledLink onClick={handleToggleMenu} href="/">
            add entry
          </StyledLink>
          <StyledLink onClick={handleToggleMenu} href="/emotion-records">
            emotion records
          </StyledLink>
        </StyledArticle>
      )}
    </>
  );
}
