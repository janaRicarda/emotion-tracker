import styled from "styled-components";
import Link from "next/link";
import Menu1 from "./../public/menu1.svg";

const StyledMenuButton = styled(Menu1)`
  width: 3rem;
  fill: var(--main-dark);
  background: var(--main-bright);
  color: var(--main-dark);
  border-style: none;
  margin: 1rem;
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledArticle = styled.article`
  width: 100%;
  background-color: var(--main-dark);
  position: fixed;
  top: 5.5rem;

  display: flex;
  flex-direction: column;
  border: 1px solid var(--main-dark);
`;

const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: var(--main-dark);
  background-color: var(--button-background);
  padding: 0.5rem;
  font-size: 1.4rem;
  font-weight: 500;
  text-align: end;
`;

export default function Navigation({ handleToggleMenu, setOpenFalse, isOpen }) {
  return (
    <>
      <StyledMenuButton
        type="button"
        onClick={handleToggleMenu}
      ></StyledMenuButton>
      {isOpen && (
        <StyledArticle>
          <StyledLink onClick={setOpenFalse} href="/emotions">
            7 basic emotions
          </StyledLink>
          <StyledLink onClick={setOpenFalse} href="/">
            add entry
          </StyledLink>
          <StyledLink onClick={setOpenFalse} href="/emotion-records">
            emotion records
          </StyledLink>
        </StyledArticle>
      )}
    </>
  );
}
