import styled from "styled-components";
import Login from "./Login";
import { useRouter } from "next/router";

const StyledFooter = styled.footer`
  width: 100vw;
  margin-top: auto;
  align-content: flex-end;
  padding: 0.5rem;
  font-size: 0.7rem;
  text-align: center;
  background-color: var(--main-bright);
  border-top: 1px solid var(--main-dark);
  display: flex;
  justify-content: space-between;
`;

export default function Footer({ handleDemoModeOff, demoMode }) {
  const router = useRouter();
  const createPath =
    (router.pathname === "/create" || router.pathname === "/create/[slug]") &&
    true;
  return (
    <StyledFooter $demoMode={demoMode}>
      <p>© {new Date().getFullYear()} What a feeling</p>
      <Login disable={createPath} handleDemoModeOff={handleDemoModeOff} />
    </StyledFooter>
  );
}
