import styled from "styled-components";
import Login from "./Login";
import { useRouter } from "next/router";

const StyledFooter = styled.footer`
  width: 100vw;
  //height: 2rem;
  margin-top: auto;
  align-content: flex-end;
  padding: 0.5rem;
  //font-size: 0.8rem;
  font-size: 0.5rem;
  text-align: center;
  background-color: var(--main-bright);
  border-top: 1px solid var(--main-dark);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Footer({ handleDemoModeOff }) {
  const router = useRouter();
  const createPath =
    (router.pathname === "/create" || router.pathname === "/create/[slug]") &&
    true;
  return (
    <StyledFooter>
      <p>© {new Date().getFullYear()} What a feeling</p>
      <Login disable={createPath} handleDemoModeOff={handleDemoModeOff} />
    </StyledFooter>
  );
}
